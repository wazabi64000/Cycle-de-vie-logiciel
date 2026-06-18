/** Niveaux WazabyCode — 7 paliers de 0 à 1000 points */
export const LEVELS = [
  { id: 1, name: 'Explorateur', min: 0, max: 100, color: '#94a3b8', icon: '🧭' },
  { id: 2, name: 'Apprenti Développeur', min: 101, max: 250, color: '#22c55e', icon: '🌱' },
  { id: 3, name: 'Développeur Junior', min: 251, max: 450, color: '#3b82f6', icon: '💻' },
  { id: 4, name: 'Développeur Confirmé', min: 451, max: 650, color: '#8b5cf6', icon: '⚡' },
  { id: 5, name: 'Développeur Fullstack', min: 651, max: 800, color: '#f59e0b', icon: '🚀' },
  { id: 6, name: 'Architecte Logiciel', min: 801, max: 950, color: '#ef4444', icon: '🏗️' },
  { id: 7, name: 'Expert WazabyCode', min: 951, max: 1000, color: '#eab308', icon: '👑' },
];

export const MAX_SCORE = 1000;

export function getLevelForScore(score) {
  const s = Math.min(Math.max(0, score), MAX_SCORE);
  return LEVELS.find((l) => s >= l.min && s <= l.max) ?? LEVELS[0];
}

export function getLevelProgress(score) {
  const level = getLevelForScore(score);
  const range = level.max - level.min;
  const inLevel = score - level.min;
  return range > 0 ? Math.round((inLevel / range) * 100) : 100;
}
