/** Point d'entrée academy — modules par formation */

import { ROADMAP_THEMES } from '../roadmap-themes.js';
import { getFormation, FORMATIONS, ACADEMY_META } from './catalog.js';
import { CHECKLIST_LEVELS, getAllModuleItems } from './helpers.js';
import { DWWM_MODULES } from './modules/dwwm.js';
import { CYBER_MODULES } from './modules/cyber.js';
import { RESEAU_MODULES, NETWORK_TYPES } from './modules/reseaux.js';
import { LINUX_MODULES } from './modules/linux.js';
import { DEVOPS_MODULES } from './modules/devops.js';
import { CLOUD_MODULES } from './modules/cloud.js';

const MODULE_MAP = {
  cda: ROADMAP_THEMES,
  dwwm: DWWM_MODULES,
  cyber: CYBER_MODULES,
  reseaux: RESEAU_MODULES,
  linux: LINUX_MODULES,
  devops: DEVOPS_MODULES,
  cloud: CLOUD_MODULES,
};

export function getFormationModules(formationId) {
  const f = getFormation(formationId);
  if (!f) return [];
  return MODULE_MAP[f.id] ?? [];
}

export function getModuleBySlug(formationId, slug) {
  return getFormationModules(formationId).find((m) => m.slug === slug) ?? null;
}

export {
  getFormation,
  FORMATIONS,
  ACADEMY_META,
  CHECKLIST_LEVELS,
  getAllModuleItems,
  NETWORK_TYPES,
  MODULE_MAP,
};
