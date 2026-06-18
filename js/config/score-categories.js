/** Répartition du score global — 1000 points (10 × 100) */
export const SCORE_CATEGORIES = {
  analyse: { label: 'Analyse', max: 100, color: '#6366f1', modules: ['00-introduction-metier', '01-analyse-conception', '02-gestion-projet'] },
  conception: { label: 'Conception', max: 100, color: '#8b5cf6', modules: ['01-analyse-conception'] },
  frontend: { label: 'Frontend', max: 100, color: '#3b82f6', modules: ['04-html-css', '05-javascript', '09-react'] },
  backend: { label: 'Backend', max: 100, color: '#0ea5e9', modules: ['07-backend-php', '08-backend-nodejs'] },
  database: { label: 'Base de données', max: 100, color: '#14b8a6', modules: ['06-bases-donnees'] },
  tests: { label: 'Tests', max: 100, color: '#22c55e', modules: ['12-tests'] },
  security: { label: 'Sécurité', max: 100, color: '#ef4444', modules: ['13-securite', '17-osint'] },
  devops: { label: 'DevOps', max: 100, color: '#f97316', modules: ['14-devops'] },
  cicd: { label: 'CI/CD', max: 100, color: '#eab308', modules: ['15-cicd', '16-monitoring'] },
  deployment: { label: 'Déploiement', max: 100, color: '#ec4899', modules: ['18-deploiement'] },
};

export const CATEGORY_KEYS = Object.keys(SCORE_CATEGORIES);
