/** Badges pédagogiques — débloqués par quiz/exercices (additif) */

export const PEDAGOGY_BADGES = [
  { id: 'analyste-fonctionnel', name: 'Analyste Fonctionnel', icon: '📋', tag: 'analyse', minScore: 0.7 },
  { id: 'architecte-junior', name: 'Architecte Junior', icon: '🏗️', tag: 'architecture', minScore: 0.7 },
  { id: 'expert-uml', name: 'Expert UML', icon: '📐', tag: 'conception', minScore: 0.7 },
  { id: 'expert-sql', name: 'Expert SQL', icon: '🗄️', tag: 'database', minScore: 0.7 },
  { id: 'dev-frontend', name: 'Développeur Frontend', icon: '💻', tag: 'frontend', minScore: 0.7 },
  { id: 'dev-backend', name: 'Développeur Backend', icon: '⚙️', tag: 'backend', minScore: 0.7 },
  { id: 'testeur-qa', name: 'Testeur QA', icon: '🧪', tag: 'tests', minScore: 0.7 },
  { id: 'securite-junior', name: 'Sécurité Junior', icon: '🛡️', tag: 'security', minScore: 0.7 },
  { id: 'devops-junior', name: 'DevOps Junior', icon: '🐳', tag: 'devops', minScore: 0.7 },
  { id: 'reseaux-junior', name: 'Réseaux Junior', icon: '🌐', tag: 'network', minScore: 0.7 },
  { id: 'linux-junior', name: 'Linux Junior', icon: '🐧', tag: 'linux', minScore: 0.7 },
  { id: 'cloud-junior', name: 'Cloud Junior', icon: '☁️', tag: 'cloud', minScore: 0.7 },
  { id: 'cda-ready', name: 'Prêt CDA', icon: '🎓', tag: 'cda', minScore: 0.8 },
];

/** Tags par moduleId pour analyse forces/faiblesses */
export const MODULE_PEDAGOGY_TAGS = {
  'analyse-besoins': 'analyse',
  conception: 'conception',
  'choix-stack': 'architecture',
  'bases-donnees': 'database',
  'maquettage-ux': 'frontend',
  'dev-frontend': 'frontend',
  'dev-backend': 'backend',
  'auth-securite': 'security',
  tests: 'tests',
  qa: 'tests',
  securite: 'security',
  devops: 'devops',
  cicd: 'devops',
  'intro-cyber': 'security',
  'tcp-ip': 'network',
  'fs-linux': 'linux',
  'docker-devops': 'devops',
  'aws-cloud': 'cloud',
  'html-fondamentaux': 'frontend',
  'sql-fondamentaux': 'database',
  'analyse-besoin': 'analyse',
  personas: 'analyse',
  benchmark: 'analyse',
  maquettage: 'frontend',
  'architecture-web': 'architecture',
  'serveurs-web': 'devops',
  'serveurs-javascript': 'backend',
  'serveurs-php-avances': 'backend',
  'sgbd-relationnels': 'database',
  nosql: 'database',
  authentification: 'security',
  'tests-web': 'tests',
  'qa-assurance': 'tests',
  'securite-web': 'security',
  seo: 'frontend',
  'performance-web': 'frontend',
  'devops-debutant': 'devops',
  cicd: 'devops',
  hebergement: 'cloud',
  monitoring: 'devops',
  'projet-fil-rouge': 'general',
};

export function getModuleTag(moduleId) {
  return MODULE_PEDAGOGY_TAGS[moduleId] ?? 'general';
}

export function getBadgeById(id) {
  return PEDAGOGY_BADGES.find((b) => b.id === id) ?? null;
}
