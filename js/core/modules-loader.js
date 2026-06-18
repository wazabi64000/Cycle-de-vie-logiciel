/**
 * Chargement du catalogue modules — embarqué (fiable) + fetch optionnel
 */
import { MODULES_CATALOG } from '../config/modules-catalog.js';
import { modulesIndexUrl } from './paths.js';

/** @returns {Promise<typeof MODULES_CATALOG>} */
export async function loadModulesCatalog() {
  try {
    const url = new URL(modulesIndexUrl(), window.location.href).href;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.modules) && data.modules.length > 0) {
        return data.modules;
      }
    }
  } catch {
    /* réseau ou CORS — fallback embarqué */
  }
  return MODULES_CATALOG;
}

export function getEmbeddedModules() {
  return MODULES_CATALOG;
}
