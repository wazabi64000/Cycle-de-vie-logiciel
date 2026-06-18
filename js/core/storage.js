/** Persistance hybride — localStorage, sessionStorage, cookies */
const LS_KEY = 'wazabycode_progress';
const SS_KEYS = {
  currentModule: 'wazabycode_current_module',
  quizInProgress: 'wazabycode_quiz_progress',
  tempScore: 'wazabycode_temp_score',
  formState: 'wazabycode_form_state',
  sessionStart: 'wazabycode_session_start',
};

const COOKIE_KEYS = {
  lastVisit: 'wb_last_visit',
  level: 'wb_level',
  theme: 'wb_theme',
  displayPrefs: 'wb_display_prefs',
};

const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 jours

function setCookie(name, value, days = 30) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export const storage = {
  // ─── LocalStorage (persistance longue durée) ───
  loadProgress() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveProgress(data) {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  },

  clearProgress() {
    localStorage.removeItem(LS_KEY);
  },

  // ─── SessionStorage (session en cours) ───
  setCurrentModule(moduleId) {
    sessionStorage.setItem(SS_KEYS.currentModule, moduleId);
  },

  getCurrentModule() {
    return sessionStorage.getItem(SS_KEYS.currentModule);
  },

  setQuizProgress(data) {
    sessionStorage.setItem(SS_KEYS.quizInProgress, JSON.stringify(data));
  },

  getQuizProgress() {
    try {
      const raw = sessionStorage.getItem(SS_KEYS.quizInProgress);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  clearQuizProgress() {
    sessionStorage.removeItem(SS_KEYS.quizInProgress);
  },

  setTempScore(score) {
    sessionStorage.setItem(SS_KEYS.tempScore, String(score));
  },

  getTempScore() {
    return Number(sessionStorage.getItem(SS_KEYS.tempScore) || 0);
  },

  setFormState(formId, state) {
    const all = this.getFormStates();
    all[formId] = state;
    sessionStorage.setItem(SS_KEYS.formState, JSON.stringify(all));
  },

  getFormStates() {
    try {
      const raw = sessionStorage.getItem(SS_KEYS.formState);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  startSession() {
    sessionStorage.setItem(SS_KEYS.sessionStart, Date.now().toString());
  },

  getSessionDuration() {
    const start = Number(sessionStorage.getItem(SS_KEYS.sessionStart) || Date.now());
    return Math.round((Date.now() - start) / 60000);
  },

  // ─── Cookies (préférences, 30 jours) ───
  setLastVisit() {
    setCookie(COOKIE_KEYS.lastVisit, new Date().toISOString());
  },

  getLastVisit() {
    return getCookie(COOKIE_KEYS.lastVisit);
  },

  setLevel(levelId) {
    setCookie(COOKIE_KEYS.level, String(levelId));
  },

  getLevel() {
    return Number(getCookie(COOKIE_KEYS.level) || 1);
  },

  setTheme(theme) {
    setCookie(COOKIE_KEYS.theme, theme);
    document.documentElement.dataset.theme = theme;
  },

  getTheme() {
    return getCookie(COOKIE_KEYS.theme) || 'light';
  },

  setDisplayPrefs(prefs) {
    setCookie(COOKIE_KEYS.displayPrefs, JSON.stringify(prefs));
  },

  getDisplayPrefs() {
    try {
      const raw = getCookie(COOKIE_KEYS.displayPrefs);
      return raw ? JSON.parse(raw) : { animations: true, compact: false };
    } catch {
      return { animations: true, compact: false };
    }
  },

  initCookies() {
    this.setLastVisit();
    const theme = this.getTheme();
    document.documentElement.dataset.theme = theme;
  },
};
