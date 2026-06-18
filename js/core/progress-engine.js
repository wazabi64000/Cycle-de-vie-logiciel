import { SCORE_CATEGORIES, CATEGORY_KEYS } from '../config/score-categories.js';
import { getLevelForScore, MAX_SCORE } from '../config/levels.js';
import {
  CHECKLIST_PEDAGOGIQUE,
  CHECKLIST_TECHNIQUE,
  CHECKLIST_PROJET,
  createEmptyChecklist,
  checklistProgress,
} from '../config/checklists.js';
import { getMaturityStage } from '../config/maturity.js';
import { BADGES } from '../config/badges.js';
import { storage } from './storage.js';
import { eventBus, Events } from './event-bus.js';

function createEmptyModuleState() {
  return {
    pedagogique: createEmptyChecklist(CHECKLIST_PEDAGOGIQUE),
    technique: createEmptyChecklist(CHECKLIST_TECHNIQUE),
    quizScore: 0,
    chapterProgress: {},
    timeSpent: 0,
  };
}

function createInitialState(learnerName = 'Apprenant') {
  return {
    learner: { name: learnerName, email: '' },
    globalScore: 0,
    categoryScores: Object.fromEntries(CATEGORY_KEYS.map((k) => [k, 0])),
    courseProgress: 0,
    projectProgress: 0,
    modules: {},
    project: {
      checklists: createEmptyChecklist(CHECKLIST_PROJET),
      progress: 0,
      maturity: 'idee',
    },
    badges: [],
    skills: [],
    timeSpent: 0,
    certificates: [],
    lastUpdated: null,
  };
}

class ProgressEngine {
  constructor() {
    this._state = null;
    this._moduleSlugs = [];
  }

  init(moduleSlugs = [], learnerName) {
    this._moduleSlugs = moduleSlugs;
    const saved = storage.loadProgress();
    this._state = saved ?? createInitialState(learnerName);

    moduleSlugs.forEach((slug) => {
      if (!this._state.modules[slug]) {
        this._state.modules[slug] = createEmptyModuleState();
      }
    });

    this.recalculate();
    storage.initCookies();
    storage.startSession();
    return this._state;
  }

  getState() {
    return this._state;
  }

  setLearnerName(name) {
    this._state.learner.name = name;
    this._persist();
  }

  toggleChecklist(moduleSlug, type, itemId, checked) {
    const mod = this._state.modules[moduleSlug];
    if (!mod || !mod[type]) return;

    mod[type][itemId] = checked;
    eventBus.emit(Events.CHECKLIST_CHANGED, { moduleSlug, type, itemId, checked });
    this.recalculate();
  }

  toggleProjectChecklist(itemId, checked) {
    this._state.project.checklists[itemId] = checked;
    eventBus.emit(Events.CHECKLIST_CHANGED, { type: 'projet', itemId, checked });
    this.recalculate();
  }

  setQuizScore(moduleSlug, score) {
    const mod = this._state.modules[moduleSlug];
    if (!mod) return;
    mod.quizScore = Math.min(100, Math.max(0, score));
    if (score >= 70) mod.pedagogique.quizReussi = true;
    eventBus.emit(Events.QUIZ_COMPLETED, { moduleSlug, score: mod.quizScore });
    this.recalculate();
  }

  setChapterProgress(moduleSlug, chapterId, completed = true) {
    const mod = this._state.modules[moduleSlug];
    if (!mod) return;
    if (!mod.chapterProgress) mod.chapterProgress = {};
    mod.chapterProgress[chapterId] = completed;
    this._persist();
  }

  addTimeSpent(minutes, moduleSlug = null) {
    this._state.timeSpent += minutes;
    if (moduleSlug && this._state.modules[moduleSlug]) {
      this._state.modules[moduleSlug].timeSpent += minutes;
    }
    this._persist();
  }

  recalculate() {
    const prevLevel = getLevelForScore(this._state.globalScore);
    this._computeCategoryScores();
    this._computeCourseProgress();
    this._computeProjectProgress();
    this._state.globalScore = Math.min(
      MAX_SCORE,
      CATEGORY_KEYS.reduce((sum, k) => sum + this._state.categoryScores[k], 0)
    );
    this._state.project.maturity = getMaturityStage(this._state.project.progress).id;
    this._checkBadges();
    this._checkCertificate();
    this._persist();

    const newLevel = getLevelForScore(this._state.globalScore);
    if (newLevel.id > prevLevel.id) {
      storage.setLevel(newLevel.id);
      eventBus.emit(Events.LEVEL_UP, newLevel);
    }

    eventBus.emit(Events.PROGRESS_UPDATED, this._state);
  }

  _computeCategoryScores() {
    CATEGORY_KEYS.forEach((catKey) => {
      const cat = SCORE_CATEGORIES[catKey];
      const moduleScores = cat.modules.map((slug) => this._moduleScore(slug));
      const avg = moduleScores.length
        ? moduleScores.reduce((a, b) => a + b, 0) / moduleScores.length
        : 0;
      this._state.categoryScores[catKey] = Math.round((avg / 100) * cat.max);
    });
  }

  _moduleScore(slug) {
    const mod = this._state.modules[slug];
    if (!mod) return 0;
    const ped = checklistProgress(CHECKLIST_PEDAGOGIQUE, mod.pedagogique);
    const tech = checklistProgress(CHECKLIST_TECHNIQUE, mod.technique);
    const quiz = mod.quizScore;
    return Math.round(ped * 0.4 + tech * 0.3 + quiz * 0.3);
  }

  _computeCourseProgress() {
    if (!this._moduleSlugs.length) {
      this._state.courseProgress = 0;
      return;
    }
    const scores = this._moduleSlugs.map((s) => this._moduleScore(s));
    this._state.courseProgress = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
  }

  _computeProjectProgress() {
    this._state.project.progress = checklistProgress(
      CHECKLIST_PROJET,
      this._state.project.checklists
    );
    const projectModule = this._moduleScore('19-projet-professionnel');
    this._state.projectProgress = Math.round(
      this._state.project.progress * 0.6 + projectModule * 0.4
    );
  }

  _checkBadges() {
    const earned = new Set(this._state.badges.map((b) => b.id));
    const newlyUnlocked = [];

    BADGES.forEach((badge) => {
      if (earned.has(badge.id)) return;

      let unlock = false;

      if (badge.category && badge.threshold) {
        unlock = this._state.categoryScores[badge.category] >= badge.threshold;
      }
      if (badge.requires) {
        unlock = badge.requires.every((id) => earned.has(id));
      }
      if (badge.projectMaturity) {
        const stage = getMaturityStage(this._state.project.progress);
        const order = ['idee', 'analyse', 'conception', 'prototype', 'mvp', 'production', 'professionnel'];
        unlock = order.indexOf(stage.id) >= order.indexOf(badge.projectMaturity);
      }

      if (unlock) {
        const entry = { id: badge.id, earnedAt: new Date().toISOString() };
        this._state.badges.push(entry);
        earned.add(badge.id);
        newlyUnlocked.push({ ...badge, ...entry });
      }
    });

    newlyUnlocked.forEach((b) => eventBus.emit(Events.BADGE_UNLOCKED, b));
  }

  _checkCertificate() {
    const { courseProgress, projectProgress } = this._state;
    const avgQuiz = this._averageQuizScore();
    const eligible =
      courseProgress >= 90 && avgQuiz >= 80 && projectProgress >= 80;

    if (!eligible) return;

    const hasCert = this._state.certificates.some((c) => c.type === 'cursus');
    if (hasCert) return;

    const cert = {
      id: `cert-${Date.now()}`,
      type: 'cursus',
      name: this._state.learner.name,
      date: new Date().toISOString(),
      level: getLevelForScore(this._state.globalScore).name,
      score: this._state.globalScore,
      issuedAt: new Date().toISOString(),
    };

    this._state.certificates.push(cert);

    const gradBadge = BADGES.find((b) => b.id === 'graduate');
    if (gradBadge && !this._state.badges.some((b) => b.id === 'graduate')) {
      this._state.badges.push({ id: 'graduate', earnedAt: cert.issuedAt });
      eventBus.emit(Events.BADGE_UNLOCKED, { ...gradBadge, earnedAt: cert.issuedAt });
    }

    eventBus.emit(Events.CERTIFICATE_EARNED, cert);
  }

  _averageQuizScore() {
    const mods = Object.values(this._state.modules);
    const withQuiz = mods.filter((m) => m.quizScore > 0);
    if (!withQuiz.length) return 0;
    return Math.round(withQuiz.reduce((s, m) => s + m.quizScore, 0) / withQuiz.length);
  }

  getGlobalProgress() {
    return Math.round(
      (this._state.courseProgress + this._state.projectProgress) / 2
    );
  }

  isCursusComplete() {
    return this.getGlobalProgress() >= 90 && this._state.certificates.some((c) => c.type === 'cursus');
  }

  _persist() {
    const sessionMins = storage.getSessionDuration();
    if (sessionMins > 0) {
      this._state.timeSpent = (this._state.timeSpent || 0);
    }
    storage.saveProgress(this._state);
    storage.setLevel(getLevelForScore(this._state.globalScore).id);
  }
}

export const progressEngine = new ProgressEngine();
