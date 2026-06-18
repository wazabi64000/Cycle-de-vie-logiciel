/** Indice de maturité du projet */
export const MATURITY_STAGES = [
  { id: 'idee', label: 'Idée', min: 0, max: 15, message: 'Votre projet est au stade Idée. Formalisez votre concept.' },
  { id: 'analyse', label: 'Analyse', min: 16, max: 30, message: 'Votre projet est au stade Analyse. Recueillez le besoin client.' },
  { id: 'conception', label: 'Conception', min: 31, max: 45, message: 'Votre projet est au stade Conception. Modélisez votre solution.' },
  { id: 'prototype', label: 'Prototype', min: 46, max: 60, message: 'Votre projet est au stade Prototype. Développez une première version.' },
  { id: 'mvp', label: 'MVP', min: 61, max: 75, message: 'Votre projet est actuellement au stade MVP.' },
  { id: 'production', label: 'Production', min: 76, max: 90, message: 'Votre projet est prêt pour une mise en production.' },
  { id: 'professionnel', label: 'Professionnel', min: 91, max: 100, message: 'Votre projet a atteint un niveau professionnel.' },
];

export function getMaturityStage(progress) {
  const p = Math.min(100, Math.max(0, progress));
  return MATURITY_STAGES.find((s) => p >= s.min && p <= s.max) ?? MATURITY_STAGES[0];
}
