/** Analyse forces / axes d'amélioration + badges */

import { pedagogyStorage } from './pedagogy-storage.js';
import { PEDAGOGY_BADGES, getModuleTag } from '../config/pedagogy-badges.js';
import { getFormationModules } from '../config/academy/index.js';
import { FORMATIONS } from '../config/academy/catalog.js';

const TAG_LABELS = {
  analyse: 'Analyse',
  conception: 'Conception / UML',
  architecture: 'Architecture',
  database: 'SQL / BDD',
  frontend: 'Frontend',
  backend: 'Backend',
  tests: 'Tests & QA',
  security: 'Sécurité',
  devops: 'DevOps',
  network: 'Réseaux',
  linux: 'Linux',
  cloud: 'Cloud',
  general: 'Général',
};

export function computeTagScores() {
  const state = pedagogyStorage.getState();
  const tagScores = {};

  for (const f of FORMATIONS) {
    const modules = getFormationModules(f.id);
    for (const mod of modules) {
      const tag = getModuleTag(mod.id);
      for (const level of ['debutant', 'intermediaire', 'professionnel']) {
        const key = `${f.id}::${mod.id}::${level}`;
        const result = state.quizzes[key];
        if (!result) continue;
        if (!tagScores[tag]) tagScores[tag] = { earned: 0, total: 0, count: 0 };
        tagScores[tag].earned += result.score;
        tagScores[tag].total += result.total;
        tagScores[tag].count++;
      }
    }
  }

  const rates = {};
  for (const [tag, data] of Object.entries(tagScores)) {
    rates[tag] = data.total ? data.earned / data.total : 0;
  }
  return rates;
}

export function getStrengthsAndWeaknesses() {
  const rates = computeTagScores();
  const entries = Object.entries(rates).map(([tag, rate]) => ({
    tag,
    label: TAG_LABELS[tag] ?? tag,
    rate,
    pct: Math.round(rate * 100),
  }));

  if (!entries.length) {
    return {
      strengths: [],
      weaknesses: [],
      message: 'Complétez des quiz pour voir votre analyse.',
    };
  }

  const strengths = entries.filter((e) => e.rate >= 0.7).sort((a, b) => b.rate - a.rate);
  const weaknesses = entries.filter((e) => e.rate < 0.6 && e.rate > 0).sort((a, b) => a.rate - b.rate);
  const untested = Object.keys(TAG_LABELS)
    .filter((t) => t !== 'general' && !(t in rates))
    .map((t) => TAG_LABELS[t]);

  return { strengths, weaknesses, untested, all: entries };
}

export function checkAndAwardBadges(formationId, moduleId, level, passed) {
  if (!passed) return [];
  const tag = getModuleTag(moduleId);
  const rates = computeTagScores();
  const awarded = [];

  for (const badge of PEDAGOGY_BADGES) {
    if (badge.tag !== tag && badge.tag !== 'cda') continue;
    const rate = rates[badge.tag] ?? (passed ? 1 : 0);
    if (rate >= badge.minScore) {
      pedagogyStorage.addBadge(badge.id);
      awarded.push(badge);
    }
  }

  if (formationId === 'cda' && passed) {
    const cdaQuizzes = Object.keys(pedagogyStorage.getState().quizzes).filter((k) => k.startsWith('cda::'));
    if (cdaQuizzes.length >= 5) {
      pedagogyStorage.addBadge('cda-ready');
      awarded.push(PEDAGOGY_BADGES.find((b) => b.id === 'cda-ready'));
    }
  }

  return awarded.filter(Boolean);
}

export function getEarnedBadges() {
  const ids = pedagogyStorage.getBadges();
  return ids.map((id) => PEDAGOGY_BADGES.find((b) => b.id === id)).filter(Boolean);
}

export function getPedagogyStats() {
  const state = pedagogyStorage.getState();
  const quizCount = Object.keys(state.quizzes).length;
  const exerciseCount = Object.keys(state.exercises).filter((k) => state.exercises[k].completed).length;
  const passed = Object.values(state.quizzes).filter((q) => q.passed).length;
  return { quizCount, exerciseCount, passed, badges: state.badges.length };
}
