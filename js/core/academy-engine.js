import { getFormationModules, getAllModuleItems } from '../config/academy/index.js';
import { getFormation } from '../config/academy/catalog.js';
import { getLevelForScore, MAX_SCORE } from '../config/levels.js';
import { academyStorage } from './academy-storage.js';

class AcademyEngine {
  constructor() {
    this._state = academyStorage.init();
    this._formationId = 'cda';
    this._modules = getFormationModules('cda');
  }

  setFormation(formationId) {
    this._formationId = formationId;
    this._modules = getFormationModules(formationId);
    this._state.activeFormation = formationId;
    academyStorage.save(this._state);
  }

  getFormationId() {
    return this._formationId;
  }

  getModules() {
    return this._modules;
  }

  getFormationState() {
    return academyStorage.getFormationState(this._formationId, this._state);
  }

  getState() {
    return this._state;
  }

  reset() {
    this._state = academyStorage.clearFormation(this._formationId);
    return this._state;
  }

  key(moduleId, level, itemId) {
    return `${moduleId}::${level}::${itemId}`;
  }

  isChecked(moduleId, level, itemId) {
    const fs = this.getFormationState();
    return !!fs.checklists[this.key(moduleId, level, itemId)];
  }

  toggle(moduleId, level, itemId, checked) {
    const fs = this.getFormationState();
    const k = this.key(moduleId, level, itemId);
    if (checked) fs.checklists[k] = true;
    else delete fs.checklists[k];
    academyStorage.save(this._state);
  }

  setLastModule(mod) {
    const fs = this.getFormationState();
    fs.lastModule = mod?.slug ?? null;
    fs.lastModuleTitle = mod?.title ?? null;
    academyStorage.save(this._state);
  }

  setLastTheme(mod) {
    this.setLastModule(mod);
  }

  getThemeCheckedCount(moduleId) {
    return this.getModuleCheckedCount(moduleId);
  }

  getModuleCheckedCount(moduleId) {
    const mod = this._modules.find((m) => m.id === moduleId);
    if (!mod) return 0;
    let count = 0;
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of mod.checklists[level]) {
        if (this.isChecked(moduleId, level, item.id)) count++;
      }
    }
    return count;
  }

  getThemeProgress(moduleId) {
    return this.getModuleProgress(moduleId);
  }

  getModuleProgress(moduleId) {
    const mod = this._modules.find((m) => m.id === moduleId);
    if (!mod) return 0;
    let done = 0;
    let total = 0;
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of mod.checklists[level]) {
        total++;
        if (this.isChecked(moduleId, level, item.id)) done++;
      }
    }
    return total ? Math.round((done / total) * 100) : 0;
  }

  getGlobalProgress() {
    const all = getAllModuleItems(this._modules);
    if (!all.length) return 0;
    const done = all.filter((i) => this.isChecked(i.moduleId, i.level, i.itemId)).length;
    return Math.round((done / all.length) * 100);
  }

  getWeightedScore() {
    const formation = getFormation(this._formationId);
    let all = getAllModuleItems(this._modules);
    if (formation?.legacyModuleIds?.length) {
      const legacy = new Set(formation.legacyModuleIds);
      all = all.filter((i) => legacy.has(i.moduleId));
    }
    let earned = 0;
    let max = 0;
    for (const item of all) {
      max += item.weight;
      if (this.isChecked(item.moduleId, item.level, item.itemId)) earned += item.weight;
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
    const fs = this.getFormationState();
    return Object.keys(fs.checklists).length > 0 || fs.lastModule;
  }

  getItemWeight(moduleId, level, itemId) {
    const mod = this._modules.find((m) => m.id === moduleId);
    if (!mod) return 0;
    const item = mod.checklists[level]?.find((i) => i.id === itemId);
    return item?.weight ?? 0;
  }
}

export const academyEngine = new AcademyEngine();
