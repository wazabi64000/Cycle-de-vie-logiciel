/** Niveaux WazabyCode Roadmap — score / 1000 */
export const LEVELS = [
  { id: 1, name: 'Débutant', min: 0, max: 124, color: '#94a3b8', icon: '🌱' },
  { id: 2, name: 'Junior', min: 125, max: 249, color: '#22c55e', icon: '💻' },
  { id: 3, name: 'Intermédiaire', min: 250, max: 374, color: '#3b82f6', icon: '⚡' },
  { id: 4, name: 'Confirmé', min: 375, max: 499, color: '#8b5cf6', icon: '🎯' },
  { id: 5, name: 'Senior', min: 500, max: 624, color: '#f59e0b', icon: '🚀' },
  { id: 6, name: 'Lead', min: 625, max: 749, color: '#ef4444', icon: '👥' },
  { id: 7, name: 'Architecte', min: 750, max: 899, color: '#ec4899', icon: '🏗️' },
  { id: 8, name: 'Expert WazabyCode', min: 900, max: 1000, color: '#eab308', icon: '👑' },
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
