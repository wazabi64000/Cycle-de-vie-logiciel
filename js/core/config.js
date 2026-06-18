/**
 * WazabyCode — Configuration centrale
 * @module core/config
 */

export const APP = {
  name: 'WazabyCode',
  version: '1.0.0',
  storageKey: 'wazabycode_progress',
  sessionKey: 'wazabycode_session',
  cookiePrefix: 'wazaby_',
  cookieMaxAge: 30 * 24 * 60 * 60, // 30 jours
};

export const SCORE = {
  maxTotal: 1000,
  categories: {
    analyse:      { label: 'Analyse',       max: 100, modules: ['01-analyse-conception'] },
    conception:   { label: 'Conception',    max: 100, modules: ['01-analyse-conception', '02-gestion-projet'] },
    frontend:     { label: 'Frontend',      max: 100, modules: ['04-html-css', '05-javascript', '09-react'] },
    backend:      { label: 'Backend',       max: 100, modules: ['07-backend-php', '08-backend-nodejs'] },
    database:     { label: 'Base de données', max: 100, modules: ['06-bases-donnees'] },
    tests:        { label: 'Tests',         max: 100, modules: ['12-tests'] },
    securite:     { label: 'Sécurité',      max: 100, modules: ['13-securite'] },
    devops:       { label: 'DevOps',        max: 100, modules: ['14-devops'] },
    cicd:         { label: 'CI/CD',         max: 100, modules: ['15-cicd'] },
    deploiement:  { label: 'Déploiement',   max: 100, modules: ['16-monitoring', '18-deploiement'] },
  },
};

export const LEVELS = [
  { id: 1, name: 'Explorateur',           min: 0,   max: 100,  color: '#94a3b8' },
  { id: 2, name: 'Apprenti Développeur',  min: 101, max: 250,  color: '#22c55e' },
  { id: 3, name: 'Développeur Junior',    min: 251, max: 450,  color: '#3b82f6' },
  { id: 4, name: 'Développeur Confirmé',  min: 451, max: 650,  color: '#8b5cf6' },
  { id: 5, name: 'Développeur Fullstack', min: 651, max: 800,  color: '#f59e0b' },
  { id: 6, name: 'Architecte Logiciel',   min: 801, max: 950,  color: '#ef4444' },
  { id: 7, name: 'Expert WazabyCode',     min: 951, max: 1000, color: '#ec4899' },
];

export const MATURITY_STAGES = [
  { min: 0,  max: 15,  label: 'Idée',          message: 'Votre projet est au stade Idée. Formalisez votre concept.' },
  { min: 16, max: 30,  label: 'Analyse',       message: 'Votre projet est au stade Analyse. Recueillez les besoins.' },
  { min: 31, max: 45,  label: 'Conception',    message: 'Votre projet est au stade Conception. Modélisez votre solution.' },
  { min: 46, max: 60,  label: 'Prototype',     message: 'Votre projet est au stade Prototype. Développez une première version.' },
  { min: 61, max: 75,  label: 'MVP',           message: 'Votre projet est actuellement au stade MVP.' },
  { min: 76, max: 90,  label: 'Production',    message: 'Votre projet est prêt pour une mise en production.' },
  { min: 91, max: 100, label: 'Professionnel', message: 'Votre projet a atteint un niveau professionnel.' },
];

export const CERTIFICATE_THRESHOLDS = {
  cursusProgress: 90,
  quizScore: 80,
  projectProgress: 80,
};

export const CHECKLIST_TEMPLATES = {
  pedagogique: [
    { id: 'cours_lu', label: 'Cours lu', weight: 25 },
    { id: 'video_visionnee', label: 'Vidéo visionnée', weight: 15 },
    { id: 'quiz_reussi', label: 'Quiz réussi (≥ 70 %)', weight: 30 },
    { id: 'exercice_termine', label: 'Exercice terminé', weight: 30 },
  ],
  technique: [
    { id: 'fonctionnalite_developpee', label: 'Fonctionnalité développée', weight: 40 },
    { id: 'code_teste', label: 'Code testé', weight: 30 },
    { id: 'documentation_creee', label: 'Documentation créée', weight: 30 },
  ],
  projet: [
    { id: 'architecture_terminee', label: 'Architecture terminée', weight: 20 },
    { id: 'base_donnees_validee', label: 'Base de données validée', weight: 20 },
    { id: 'api_fonctionnelle', label: 'API fonctionnelle', weight: 30 },
    { id: 'deploiement_termine', label: 'Déploiement terminé', weight: 30 },
  ],
};

export const PROJECT_CHECKLIST = [
  { id: 'idee', label: 'Idée formalisée', category: 'analyse', weight: 5 },
  { id: 'cdc', label: 'Cahier des charges rédigé', category: 'analyse', weight: 10 },
  { id: 'uml', label: 'Diagrammes UML créés', category: 'conception', weight: 10 },
  { id: 'mcd', label: 'Modèle de données validé', category: 'conception', weight: 10 },
  { id: 'maquettes', label: 'Maquettes UI/UX', category: 'conception', weight: 5 },
  { id: 'frontend_base', label: 'Frontend de base', category: 'frontend', weight: 10 },
  { id: 'frontend_avance', label: 'Frontend avancé', category: 'frontend', weight: 5 },
  { id: 'api_rest', label: 'API REST fonctionnelle', category: 'backend', weight: 10 },
  { id: 'auth', label: 'Authentification implémentée', category: 'backend', weight: 5 },
  { id: 'bdd', label: 'Base de données en production', category: 'database', weight: 10 },
  { id: 'tests_unitaires', label: 'Tests unitaires (≥ 80 %)', category: 'tests', weight: 10 },
  { id: 'tests_e2e', label: 'Tests E2E', category: 'tests', weight: 5 },
  { id: 'securite_owasp', label: 'Audit OWASP passé', category: 'securite', weight: 10 },
  { id: 'docker', label: 'Docker configuré', category: 'devops', weight: 5 },
  { id: 'cicd', label: 'Pipeline CI/CD actif', category: 'cicd', weight: 10 },
  { id: 'deploy_prod', label: 'Déploiement production', category: 'deploiement', weight: 10 },
  { id: 'monitoring', label: 'Monitoring actif', category: 'deploiement', weight: 5 },
  { id: 'documentation', label: 'Documentation complète', category: 'deploiement', weight: 5 },
];
