/** Définitions des checklists par type */
export const CHECKLIST_PEDAGOGIQUE = [
  { id: 'coursLu', label: 'Cours lu', weight: 25 },
  { id: 'videoVisee', label: 'Vidéo visionnée', weight: 15 },
  { id: 'quizReussi', label: 'Quiz réussi (≥ 70 %)', weight: 30 },
  { id: 'exerciceTermine', label: 'Exercice terminé', weight: 30 },
];

export const CHECKLIST_TECHNIQUE = [
  { id: 'fonctionnaliteDeveloppee', label: 'Fonctionnalité développée', weight: 40 },
  { id: 'codeTeste', label: 'Code testé', weight: 30 },
  { id: 'documentationCreee', label: 'Documentation créée', weight: 30 },
];

export const CHECKLIST_PROJET = [
  { id: 'architectureTerminee', label: 'Architecture terminée', weight: 15, maturity: 30 },
  { id: 'baseDonneesValidee', label: 'Base de données validée', weight: 15, maturity: 45 },
  { id: 'apiFonctionnelle', label: 'API fonctionnelle', weight: 20, maturity: 60 },
  { id: 'frontendIntegre', label: 'Frontend intégré', weight: 15, maturity: 75 },
  { id: 'testsValides', label: 'Tests validés (≥ 80 %)', weight: 15, maturity: 85 },
  { id: 'deploiementTermine', label: 'Déploiement terminé', weight: 20, maturity: 100 },
];

export function createEmptyChecklist(items) {
  return Object.fromEntries(items.map((item) => [item.id, false]));
}

export function checklistProgress(items, state) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  const done = items.reduce((sum, item) => sum + (state[item.id] ? item.weight : 0), 0);
  return total > 0 ? Math.round((done / total) * 100) : 0;
}
