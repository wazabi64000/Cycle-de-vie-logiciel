/** Persistance roadmap — localStorage, sessionStorage, cookies */
const LS_KEY = 'wazabycode_roadmap';
const SS_LAST = 'wazabycode_roadmap_last';
const COOKIE_THEME = 'wb_theme';
const COOKIE_VISIT = 'wb_last_visit';

function setCookie(name, value, days = 30) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${days * 86400};SameSite=Lax`;
}

function getCookie(name) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function emptyState() {
  return {
    checklists: {},
    lastTheme: null,
    lastThemeTitle: null,
    startedAt: new Date().toISOString(),
    lastUpdated: null,
  };
}

export const roadmapStorage = {
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? { ...emptyState(), ...JSON.parse(raw) } : null;
    } catch {
      return null;
    }
  },

  save(state) {
    state.lastUpdated = new Date().toISOString();
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    sessionStorage.setItem(SS_LAST, state.lastTheme || '');
    setCookie(COOKIE_VISIT, state.lastUpdated);
  },

  init() {
    let state = this.load();
    if (!state) {
      state = emptyState();
      this.save(state);
    }
    const theme = this.getTheme();
    document.documentElement.dataset.theme = theme;
    return state;
  },

  clear() {
    localStorage.removeItem(LS_KEY);
    sessionStorage.removeItem(SS_LAST);
  },

  getTheme() {
    return getCookie(COOKIE_THEME) || 'light';
  },

  setTheme(theme) {
    setCookie(COOKIE_THEME, theme);
    document.documentElement.dataset.theme = theme;
  },

  toggleTheme() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  },

  getLastVisit() {
    return getCookie(COOKIE_VISIT);
  },
};
