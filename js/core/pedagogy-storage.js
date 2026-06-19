/**
 * Persistance pédagogique — clé séparée, n'affecte PAS checklists/score existants
 */
const LS_KEY = 'wazabycode_pedagogy';

function emptyState() {
  return {
    version: 1,
    quizzes: {},
    exercises: {},
    solutionsViewed: {},
    badges: [],
  };
}

function pedagogyKey(formationId, moduleId, level, suffix = '') {
  return `${formationId}::${moduleId}::${level}${suffix ? `::${suffix}` : ''}`;
}

export const pedagogyStorage = {
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return { ...emptyState(), ...JSON.parse(raw) };
    } catch { /* ignore */ }
    return emptyState();
  },

  save(state) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  },

  getState() {
    return this.load();
  },

  saveQuizResult(formationId, moduleId, level, result) {
    const state = this.load();
    const key = pedagogyKey(formationId, moduleId, level);
    state.quizzes[key] = {
      score: result.score,
      total: result.total,
      passed: result.passed,
      completedAt: new Date().toISOString(),
    };
    this.save(state);
    return state;
  },

  getQuizResult(formationId, moduleId, level) {
    return this.load().quizzes[pedagogyKey(formationId, moduleId, level)] ?? null;
  },

  markExerciseDone(formationId, moduleId, level, exerciseId) {
    const state = this.load();
    const key = pedagogyKey(formationId, moduleId, level, exerciseId);
    state.exercises[key] = { completed: true, completedAt: new Date().toISOString() };
    this.save(state);
    return state;
  },

  isExerciseDone(formationId, moduleId, level, exerciseId) {
    return !!this.load().exercises[pedagogyKey(formationId, moduleId, level, exerciseId)]?.completed;
  },

  markSolutionViewed(formationId, moduleId, level, exerciseId) {
    const state = this.load();
    const key = pedagogyKey(formationId, moduleId, level, exerciseId);
    state.solutionsViewed[key] = true;
    this.save(state);
  },

  wasSolutionViewed(formationId, moduleId, level, exerciseId) {
    return !!this.load().solutionsViewed[pedagogyKey(formationId, moduleId, level, exerciseId)];
  },

  addBadge(badgeId) {
    const state = this.load();
    if (!state.badges.includes(badgeId)) {
      state.badges.push(badgeId);
      this.save(state);
    }
    return state;
  },

  getBadges() {
    return this.load().badges;
  },
};
