/**
 * Catalogue modules — 100 % embarqué, sans fetch ni serveur
 */
import { MODULES_CATALOG } from '../config/modules-catalog.js';

export function getModules() {
  return MODULES_CATALOG;
}

/** @returns {Promise<typeof MODULES_CATALOG>} */
export function loadModulesCatalog() {
  return Promise.resolve(MODULES_CATALOG);
}

export function getModuleBySlug(slug) {
  return MODULES_CATALOG.find((m) => m.slug === slug) ?? null;
}

export function getModuleChapters(slug) {
  const mod = getModuleBySlug(slug);
  if (mod?.chapters?.length) return mod.chapters;
  const n = mod?.chapitres ?? 10;
  return Array.from({ length: n }, (_, i) => ({
    id: `chapitre-${i + 1}`,
    name: `Chapitre ${i + 1}`,
    index: i + 1,
  }));
}
