import { ROADMAP_THEMES, getAllChecklistItems } from '../config/roadmap-themes.js';
import { getLevelForScore, MAX_SCORE } from '../config/levels.js';
import { roadmapStorage } from './roadmap-storage.js';

class RoadmapEngine {
  constructor() {
    this._state = roadmapStorage.init();
  }

  getState() {
    return this._state;
  }

  reset() {
    roadmapStorage.clear();
    this._state = roadmapStorage.init();
    return this._state;
  }

  key(themeId, level, itemId) {
    return `${themeId}::${level}::${itemId}`;
  }

  isChecked(themeId, level, itemId) {
    return !!this._state.checklists[this.key(themeId, level, itemId)];
  }

  toggle(themeId, level, itemId, checked) {
    const k = this.key(themeId, level, itemId);
    if (checked) this._state.checklists[k] = true;
    else delete this._state.checklists[k];
    roadmapStorage.save(this._state);
  }

  setLastTheme(theme) {
    this._state.lastTheme = theme?.slug ?? null;
    this._state.lastThemeTitle = theme?.title ?? null;
    roadmapStorage.save(this._state);
  }

  getThemeCheckedCount(themeId) {
    const theme = ROADMAP_THEMES.find((t) => t.id === themeId);
    if (!theme) return 0;
    let count = 0;
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of theme.checklists[level]) {
        if (this.isChecked(themeId, level, item.id)) count++;
      }
    }
    return count;
  }

  getThemeProgress(themeId) {
    const theme = ROADMAP_THEMES.find((t) => t.id === themeId);
    if (!theme) return 0;
    let done = 0;
    let total = 0;
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of theme.checklists[level]) {
        total++;
        if (this.isChecked(themeId, level, item.id)) done++;
      }
    }
    return total ? Math.round((done / total) * 100) : 0;
  }

  getGlobalProgress() {
    const all = getAllChecklistItems();
    if (!all.length) return 0;
    const done = all.filter((i) => this.isChecked(i.themeId, i.level, i.itemId)).length;
    return Math.round((done / all.length) * 100);
  }

  getWeightedScore() {
    const all = getAllChecklistItems();
    let earned = 0;
    let max = 0;
    for (const item of all) {
      max += item.weight;
      if (this.isChecked(item.themeId, item.level, item.itemId)) {
        earned += item.weight;
      }
    }
    if (!max) return 0;
    return Math.round((earned / max) * MAX_SCORE);
  }

  getScore() {
    return this.getWeightedScore();
  }

  getLevel() {
    return getLevelForScore(this.getScore());
  }

  isComplete() {
    return this.getGlobalProgress() >= 100;
  }

  hasProgress() {
    return Object.keys(this._state.checklists).length > 0 || this._state.lastTheme;
  }

  getItemWeight(themeId, level, itemId) {
    const theme = ROADMAP_THEMES.find((t) => t.id === themeId);
    if (!theme) return 0;
    const item = theme.checklists[level]?.find((i) => i.id === itemId);
    return item?.weight ?? 0;
  }
}

export const roadmapEngine = new RoadmapEngine();
