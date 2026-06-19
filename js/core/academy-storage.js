/** Persistance multi-formations — localStorage */
import { roadmapStorage } from './roadmap-storage.js';

const LS_KEY = 'wazabycode_academy';
const LEGACY_KEY = 'wazabycode_roadmap';

function emptyFormationState() {
  return {
    checklists: {},
    lastModule: null,
    lastModuleTitle: null,
    startedAt: new Date().toISOString(),
    lastUpdated: null,
  };
}

function emptyAcademyState() {
  return {
    version: 1,
    activeFormation: 'cda',
    formations: {
      cda: emptyFormationState(),
      dwwm: emptyFormationState(),
      cyber: emptyFormationState(),
      reseaux: emptyFormationState(),
      linux: emptyFormationState(),
      devops: emptyFormationState(),
      cloud: emptyFormationState(),
    },
    badges: {},
  };
}

function migrateLegacy(state) {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return state;
    const legacy = JSON.parse(raw);
    const cda = state.formations.cda;
    if (legacy.checklists && Object.keys(cda.checklists).length === 0) {
      cda.checklists = { ...legacy.checklists };
      cda.lastModule = legacy.lastTheme ?? cda.lastModule;
      cda.lastModuleTitle = legacy.lastThemeTitle ?? cda.lastModuleTitle;
      if (legacy.startedAt) cda.startedAt = legacy.startedAt;
    }
    const cdaMode = localStorage.getItem('wazabycode_cda_mode');
    if (cdaMode) state.modeEnabled = { ...(state.modeEnabled ?? {}), cda: cdaMode === '1' };
  } catch { /* ignore */ }
  return state;
}

export const academyStorage = {
  load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) return migrateLegacy({ ...emptyAcademyState(), ...JSON.parse(raw) });
    } catch { /* ignore */ }
    return migrateLegacy(emptyAcademyState());
  },

  save(state) {
    state.lastUpdated = new Date().toISOString();
    localStorage.setItem(LS_KEY, JSON.stringify(state));
    syncLegacyCda(state.formations.cda);
  },

  init() {
    let state = this.load();
    if (!localStorage.getItem(LS_KEY)) this.save(state);
    const theme = roadmapStorage.getTheme();
    document.documentElement.dataset.theme = theme;
    return state;
  },

  getFormationState(formationId, state) {
    if (!state.formations[formationId]) {
      state.formations[formationId] = emptyFormationState();
    }
    return state.formations[formationId];
  },

  clearFormation(formationId) {
    const state = this.load();
    state.formations[formationId] = emptyFormationState();
    this.save(state);
    return state;
  },

  clearAll() {
    localStorage.removeItem(LS_KEY);
    return this.init();
  },

  isModeEnabled(formationId) {
    const state = this.load();
    return !!state.modeEnabled?.[formationId];
  },

  setModeEnabled(formationId, on) {
    const state = this.load();
    state.modeEnabled = { ...(state.modeEnabled ?? {}), [formationId]: on };
    this.save(state);
    if (formationId === 'cda') {
      localStorage.setItem('wazabycode_cda_mode', on ? '1' : '0');
    }
    return on;
  },

  toggleTheme: () => roadmapStorage.toggleTheme(),
  getTheme: () => roadmapStorage.getTheme(),
};

function syncLegacyCda(cdaState) {
  if (!cdaState) return;
  try {
    localStorage.setItem(LEGACY_KEY, JSON.stringify({
      checklists: cdaState.checklists,
      lastTheme: cdaState.lastModule,
      lastThemeTitle: cdaState.lastModuleTitle,
      startedAt: cdaState.startedAt,
      lastUpdated: cdaState.lastUpdated,
    }));
  } catch { /* ignore */ }
}
