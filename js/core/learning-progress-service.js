import { LocalStorageAdapter } from './adapters/local-storage-adapter.js';
import { eventBus, Events } from './event-bus.js';
import { getMaturityStage } from '../config/maturity.js';
import { href, moduleUrl } from './paths.js';

const KEYS = {
  lastPosition: 'last_position',
  learningData: 'learning_data',
};

function emptyLastPosition() {
  return {
    moduleId: '',
    moduleName: '',
    chapterId: '',
    chapterName: '',
    lessonId: '',
    lessonName: '',
    scrollPosition: 0,
    lastVisit: '',
    globalProgress: 0,
  };
}

function emptyLearningData() {
  return {
    quiz: {
      quizId: '',
      moduleId: '',
      answeredQuestions: {},
      currentScore: 0,
      timeSpent: 0,
    },
    exercises: {},
    project: {
      currentPhase: 'idee',
      checklists: {},
      score: 0,
      maturity: 'idee',
    },
    history: [],
    statistics: {
      totalTimeMinutes: 0,
      consecutiveDays: 0,
      lastActiveDate: '',
      activeDates: [],
      modulesCompleted: [],
      modulesStarted: [],
      chaptersCompleted: [],
      quizzesPassed: 0,
      globalScore: 0,
      globalProgress: 0,
    },
  };
}

/**
 * LearningProgressService — couche d'abstraction mémoire apprenant.
 * Remplacer l'adaptateur sans toucher au reste de l'application.
 */
class LearningProgressService {
  constructor(adapter = new LocalStorageAdapter()) {
    this._adapter = adapter;
    this._saveTimer = null;
    this._scrollTimer = null;
    this._sessionStart = Date.now();
  }

  /** @param {import('./adapters/local-storage-adapter.js').LocalStorageAdapter} adapter */
  setAdapter(adapter) {
    this._adapter = adapter;
  }

  getLastPosition() {
    return this._adapter.get(KEYS.lastPosition) ?? emptyLastPosition();
  }

  saveLastPosition(data) {
    const merged = {
      ...emptyLastPosition(),
      ...this.getLastPosition(),
      ...data,
      lastVisit: new Date().toISOString(),
    };
    this._adapter.set(KEYS.lastPosition, merged);
    eventBus.emit(Events.LEARNING_SAVED, { type: 'position', data: merged });
    return merged;
  }

  getLearningData() {
    return this._adapter.get(KEYS.learningData) ?? emptyLearningData();
  }

  saveLearningData(data) {
    const current = this.getLearningData();
    const merged = { ...current, ...data };
    this._adapter.set(KEYS.learningData, merged);
    eventBus.emit(Events.LEARNING_SAVED, { type: 'data', data: merged });
    return merged;
  }

  hasResumePoint() {
    const pos = this.getLastPosition();
    return Boolean(pos.moduleId && pos.lastVisit);
  }

  updatePosition(partial) {
    return this.saveLastPosition(partial);
  }

  saveQuizState({ quizId, moduleId, answeredQuestions, currentScore, timeSpent }) {
    const data = this.getLearningData();
    data.quiz = {
      quizId: quizId ?? data.quiz.quizId,
      moduleId: moduleId ?? data.quiz.moduleId,
      answeredQuestions: answeredQuestions ?? data.quiz.answeredQuestions,
      currentScore: currentScore ?? data.quiz.currentScore,
      timeSpent: (data.quiz.timeSpent || 0) + (timeSpent || 0),
    };
    this.saveLearningData(data);
    this._debouncedSave();
  }

  saveExerciseState(exerciseId, { status, answers }) {
    const data = this.getLearningData();
    data.exercises[exerciseId] = { status, answers, updatedAt: new Date().toISOString() };
    this.saveLearningData(data);
    this._debouncedSave();
  }

  syncProjectFromProgress(progressState) {
    const data = this.getLearningData();
    data.project = {
      currentPhase: progressState.project?.maturity ?? 'idee',
      checklists: { ...progressState.project?.checklists },
      score: progressState.projectProgress ?? 0,
      maturity: getMaturityStage(progressState.project?.progress ?? 0).label,
    };
    this.saveLearningData(data);
  }

  addHistoryEntry(entry) {
    const data = this.getLearningData();
    data.history.unshift({
      id: `hist-${Date.now()}`,
      date: new Date().toISOString(),
      ...entry,
    });
    data.history = data.history.slice(0, 100);
    this.saveLearningData(data);
  }

  updateStatistics(progressState) {
    const data = this.getLearningData();
    const today = new Date().toISOString().split('T')[0];
    const dates = new Set(data.statistics.activeDates || []);
    dates.add(today);

    const sortedDates = [...dates].sort();
    let consecutive = 1;
    for (let i = sortedDates.length - 1; i > 0; i--) {
      const diff = (new Date(sortedDates[i]) - new Date(sortedDates[i - 1])) / 86400000;
      if (diff === 1) consecutive++;
      else break;
    }

    const modulesStarted = [];
    const modulesCompleted = [];
    const chaptersCompleted = new Set(data.statistics.chaptersCompleted || []);
    let quizzesPassed = 0;

    Object.entries(progressState.modules || {}).forEach(([slug, mod]) => {
      const score = this._moduleProgress(mod);
      if (score > 0) modulesStarted.push(slug);
      if (score >= 90) modulesCompleted.push(slug);
      if (mod.quizScore >= 70) quizzesPassed++;
      Object.entries(mod.chapterProgress || {}).forEach(([chId, done]) => {
        if (done) chaptersCompleted.add(`${slug}:${chId}`);
      });
    });

    data.statistics = {
      totalTimeMinutes: progressState.timeSpent || 0,
      consecutiveDays: consecutive,
      lastActiveDate: today,
      activeDates: sortedDates,
      modulesCompleted,
      modulesStarted,
      chaptersCompleted: [...chaptersCompleted],
      quizzesPassed,
      globalScore: progressState.globalScore || 0,
      globalProgress: Math.round(
        ((progressState.courseProgress || 0) + (progressState.projectProgress || 0)) / 2
      ),
    };

    this.saveLearningData(data);
    return data.statistics;
  }

  _moduleProgress(mod) {
    if (!mod) return 0;
    const ped = Object.values(mod.pedagogique || {}).filter(Boolean).length;
    const tech = Object.values(mod.technique || {}).filter(Boolean).length;
    return Math.round(((ped + tech) / 7) * 70 + (mod.quizScore || 0) * 0.3);
  }

  recordChapterComplete(moduleId, moduleName, chapterId, chapterName) {
    this.addHistoryEntry({
      type: 'chapter_completed',
      moduleId,
      moduleName,
      chapterId,
      chapterName,
    });
  }

  recordModuleStarted(moduleId, moduleName) {
    const data = this.getLearningData();
    const already = data.history.some(
      (h) => h.type === 'module_started' && h.moduleId === moduleId
    );
    if (!already) {
      this.addHistoryEntry({ type: 'module_started', moduleId, moduleName });
    }
  }

  getResumeUrl() {
    const pos = this.getLastPosition();
    if (!pos.moduleId) return href('dashboard.html');
    const params = { resume: '1' };
    if (pos.chapterId) params.chapter = pos.chapterId;
    if (pos.lessonId) params.lesson = pos.lessonId;
    return moduleUrl(pos.moduleId, params);
  }

  formatRelativeTime(isoDate) {
    if (!isoDate) return '';
    const diff = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "à l'instant";
    if (mins < 60) return `il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'il y a 1 jour';
    if (days < 30) return `il y a ${days} jours`;
    const months = Math.floor(days / 30);
    return months === 1 ? 'il y a 1 mois' : `il y a ${months} mois`;
  }

  formatDaysAgo(isoDate) {
    if (!isoDate) return '';
    const days = Math.floor((Date.now() - new Date(isoDate).getTime()) / 86400000);
    if (days === 0) return "aujourd'hui";
    if (days === 1) return '1 jour';
    return `${days} jours`;
  }

  _debouncedSave() {
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => {
      eventBus.emit(Events.LEARNING_SAVED, { type: 'auto' });
    }, 300);
  }

  saveScrollPosition(scrollPosition, context = {}) {
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(() => {
      this.updatePosition({ scrollPosition, ...context });
    }, 500);
  }

  /** Sauvegarde silencieuse avant fermeture */
  flushSession(moduleId, moduleName, progressState) {
    const sessionMins = Math.round((Date.now() - this._sessionStart) / 60000);
    if (sessionMins > 0 && moduleId) {
      const data = this.getLearningData();
      data.statistics.totalTimeMinutes = (progressState?.timeSpent || 0) + sessionMins;
      this.saveLearningData(data);
    }
    this.syncProjectFromProgress(progressState || {});
    this.updateStatistics(progressState || {});
  }

  registerAutoSave(handlers = {}) {
    const save = () => {
      if (handlers.getContext) {
        const ctx = handlers.getContext();
        if (ctx) this.updatePosition(ctx);
      }
      if (handlers.getProgressState) {
        const state = handlers.getProgressState();
        this.syncProjectFromProgress(state);
        this.updateStatistics(state);
      }
    };

    window.addEventListener('beforeunload', save);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') save();
    });

    eventBus.on(Events.CHECKLIST_CHANGED, save);
    eventBus.on(Events.PROGRESS_UPDATED, (state) => {
      this.syncProjectFromProgress(state);
      this.updateStatistics(state);
    });

    return () => {
      window.removeEventListener('beforeunload', save);
    };
  }

  clearResumePoint() {
    this._adapter.set(KEYS.lastPosition, emptyLastPosition());
  }
}

export const learningProgressService = new LearningProgressService();
