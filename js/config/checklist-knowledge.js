/** Base de connaissances — détails par item checklist */

import { buildDwwmChecklistKnowledge, DWWM_MODULE_PEDAGOGY } from './academy/dwwm-module-pedagogy.js';

const IMAGE_BASE = 'assets/examples/';

const KNOWLEDGE_OVERRIDES = {
  'conception::debutant::Schéma général dessiné': {
    definition: 'Représentation visuelle de l\'ensemble du système permettant de comprendre rapidement les composants principaux et leurs interactions.',
    why: ['Aligner l\'équipe sur une vision commune', 'Détecter les incohérences avant le code', 'Anticiper les problèmes d\'architecture'],
    example: { title: 'Marketplace de colis', diagram: 'Utilisateur\n↓\nFrontend React\n↓\nAPI Node.js\n↓\nPostgreSQL' },
    tools: ['Excalidraw', 'Draw.io', 'Miro'],
    bestPractices: ['Rester simple', 'Montrer uniquement les composants importants', 'Éviter les schémas surchargés'],
    commonMistakes: ['Trop de détails techniques', 'Absence de flux de données', 'Composants non nommés'],
    depthLevels: {
      debutant: 'Simple dessin papier ou whiteboard photo',
      intermediaire: 'Diagramme Draw.io avec légende',
      professionnel: 'Diagramme d\'architecture C4 (niveau 1-2) documenté et versionné',
    },
    image: `${IMAGE_BASE}architecture.svg`,
    weight: 5,
  },
  'conception::intermediaire::Architecture en couches définie': {
    definition: 'Organisation du code en couches distinctes (présentation, métier, données) avec des responsabilités claires et des dépendances unidirectionnelles.',
    why: ['Faciliter les tests et la maintenance', 'Permettre le remplacement d\'une couche sans impact global', 'Répondre aux exigences CDA (architecture multicouche ANSSI)'],
    example: { title: 'API e-commerce', diagram: 'Controller → Service → Repository → PostgreSQL' },
    tools: ['Draw.io', 'PlantUML', 'Lucidchart'],
    bestPractices: ['Couche métier sans dépendance UI', 'Interfaces pour les repositories', 'Documenter les flux entre couches'],
    commonMistakes: ['Couplage fort controller/BDD', 'Logique métier dans les vues', 'Couches « fantômes » non respectées'],
    depthLevels: {
      debutant: '3 blocs nommés (front / back / BDD)',
      intermediaire: 'Diagramme couches + règles de dépendance',
      professionnel: 'ADR + diagrammes C4 + conventions d\'équipe',
    },
    image: `${IMAGE_BASE}architecture.svg`,
    weight: 20,
  },
  'bases-donnees::debutant::Schéma de base créé': {
    definition: 'Modèle relationnel initial décrivant les entités, attributs et relations nécessaires au MVP.',
    why: ['Éviter les migrations chaotiques', 'Garantir l\'intégrité des données', 'Base solide pour les requêtes métier'],
    example: { title: 'Blog', diagram: 'users ──< articles ──< comments' },
    tools: ['PostgreSQL', 'DBeaver', 'Draw.io'],
    bestPractices: ['Nommer clairement tables et colonnes', 'Clés primaires sur chaque table', 'Documenter le MCD'],
    commonMistakes: ['Pas de contraintes FK', 'Types inadaptés', 'Schéma non normalisé'],
    depthLevels: {
      debutant: 'Tables principales sur papier ou outil simple',
      intermediaire: 'MCD/MLD + migrations versionnées',
      professionnel: 'Schéma normalisé, indexés, avec stratégie backup',
    },
    image: `${IMAGE_BASE}database.svg`,
    weight: 15,
  },
  'cicd::professionnel::Pipeline complet opérationnel': {
    definition: 'Chaîne automatisée depuis le commit jusqu\'au déploiement : lint, tests, build, deploy avec contrôles qualité.',
    why: ['Réduire les erreurs humaines', 'Livrer plus souvent et plus sûrement', 'Traçabilité des releases'],
    example: { title: 'GitHub Actions', diagram: 'Push → Lint → Tests → Build → Deploy staging → Deploy prod' },
    tools: ['GitHub Actions', 'GitLab CI', 'Docker'],
    bestPractices: ['Branches protégées', 'Secrets en vault CI', 'Rollback testé'],
    commonMistakes: ['Pipeline sans tests', 'Deploy prod sans validation staging', 'Secrets en clair'],
    depthLevels: {
      debutant: 'Workflow CI basique (tests au push)',
      intermediaire: 'Build + deploy staging automatique',
      professionnel: 'Pipeline complet avec gates, notifications et rollback',
    },
    image: `${IMAGE_BASE}ci-cd.svg`,
    weight: 25,
  },
  'monitoring::intermediaire::Dashboard Grafana': {
    definition: 'Tableau de bord visualisant métriques système et applicatives (CPU, latence, erreurs, KPIs métier).',
    why: ['Détecter les incidents avant les utilisateurs', 'Corréler métriques et logs', 'Piloter la capacité'],
    example: { title: 'Stack observabilité', diagram: 'App → Prometheus → Grafana\nApp → Loki → Grafana' },
    tools: ['Grafana', 'Prometheus', 'Sentry'],
    bestPractices: ['SLI/SLO définis', 'Alertes actionnables', 'Runbooks liés aux alertes'],
    commonMistakes: ['Trop d\'alertes bruit', 'Pas de rétention métriques', 'Dashboards non maintenus'],
    depthLevels: {
      debutant: 'Uptime + logs centralisés',
      intermediaire: 'Dashboard Grafana + alertes email/Slack',
      professionnel: 'SLI/SLO, runbooks, post-mortems',
    },
    image: `${IMAGE_BASE}architecture.svg`,
    weight: 20,
  },
  'devops::debutant::Dockerfile créé': {
    definition: 'Fichier décrivant comment construire une image Docker reproductible pour l\'application.',
    why: ['Environnements identiques dev/staging/prod', 'Onboarding rapide', 'Base pour CI/CD'],
    example: { title: 'Node API', diagram: 'FROM node:20-alpine\nCOPY . .\nRUN npm ci\nCMD ["node","server.js"]' },
    tools: ['Docker', 'Docker Compose'],
    bestPractices: ['Multi-stage builds', 'Utilisateur non-root', '.dockerignore'],
    commonMistakes: ['Image trop lourde', 'Secrets dans l\'image', 'Pas de healthcheck'],
    depthLevels: {
      debutant: 'Dockerfile minimal fonctionnel',
      intermediaire: 'Multi-stage + compose dev',
      professionnel: 'Images scannées, optimisées, documentées',
    },
    image: `${IMAGE_BASE}docker.svg`,
    weight: 12,
  },
  'conception::intermediaire::Diagrammes UML réalisés': {
    definition: 'Modèles UML (cas d\'utilisation, classes, séquences) formalisant le comportement et la structure.',
    why: ['Communiquer avec le métier', 'Réduire les ambiguïtés', 'Préparer le développement'],
    example: { title: 'Commande en ligne', diagram: 'Client → UC Commander → UC Payer → UC Livrer' },
    tools: ['Draw.io', 'PlantUML', 'Lucidchart'],
    bestPractices: ['Un diagramme = un objectif', 'Légendes et glossaire', 'Versionner avec le code'],
    commonMistakes: ['UML surchargé', 'Diagrammes obsolètes', 'Pas de lien avec les US'],
    depthLevels: {
      debutant: 'Cas d\'utilisation principaux',
      intermediaire: 'Classes + séquences sur flux critiques',
      professionnel: 'Dossier UML complet aligné sur l\'architecture',
    },
    image: `${IMAGE_BASE}uml.svg`,
    weight: 10,
  },
};

const THEME_CONTEXT = {
  'analyse-besoins': { image: null, tools: ['Jira', 'Notion', 'Miro'] },
  conception: { image: `${IMAGE_BASE}architecture.svg`, tools: ['Draw.io', 'Excalidraw'] },
  'choix-stack': { image: null, tools: ['StackShare', 'npm trends'] },
  'bases-donnees': { image: `${IMAGE_BASE}database.svg`, tools: ['PostgreSQL', 'DBeaver'] },
  'maquettage-ux': { image: null, tools: ['Figma', 'Penpot'] },
  'dev-frontend': { image: null, tools: ['React', 'Lighthouse'] },
  'dev-backend': { image: null, tools: ['Node.js', 'Postman'] },
  'auth-securite': { image: null, tools: ['OWASP', 'Keycloak'] },
  tests: { image: null, tools: ['Jest', 'Playwright'] },
  qa: { image: null, tools: ['TestRail'] },
  performance: { image: null, tools: ['Lighthouse', 'Redis'] },
  'stress-test': { image: null, tools: ['K6'] },
  securite: { image: null, tools: ['OWASP ZAP'] },
  devops: { image: `${IMAGE_BASE}docker.svg`, tools: ['Docker', 'Kubernetes'] },
  cicd: { image: `${IMAGE_BASE}ci-cd.svg`, tools: ['GitHub Actions'] },
  infrastructure: { image: null, tools: ['Nginx', 'AWS'] },
  deploiement: { image: null, tools: ['Vercel', 'Render'] },
  monitoring: { image: `${IMAGE_BASE}architecture.svg`, tools: ['Grafana', 'Prometheus'] },
  maintenance: { image: null, tools: ['Dependabot'] },
};

const LEVEL_DEPTH = {
  debutant: 'Première version simple, manuelle ou sur papier',
  intermediaire: 'Outil dédié, documenté et partagé avec l\'équipe',
  professionnel: 'Standard d\'équipe, versionné, validé et maintenu',
};

function knowledgeKey(themeId, level, label) {
  return `${themeId}::${level}::${label}`;
}

export function getItemWeight(themeId, level, label) {
  const key = knowledgeKey(themeId, level, label);
  return KNOWLEDGE_OVERRIDES[key]?.weight ?? null;
}

export function getChecklistKnowledge(themeId, level, label, themeWhy = '', mod = null) {
  const key = knowledgeKey(themeId, level, label);
  if (KNOWLEDGE_OVERRIDES[key]) {
    return { ...KNOWLEDGE_OVERRIDES[key], label, themeId, level };
  }

  if (DWWM_MODULE_PEDAGOGY[themeId] || mod?.pedagogy) {
    const dwwm = buildDwwmChecklistKnowledge(themeId, level, label, themeWhy, mod);
    if (dwwm) return dwwm;
  }

  const ctx = THEME_CONTEXT[themeId] ?? {};
  const levelLabel = level === 'debutant' ? 'Débutant' : level === 'intermediaire' ? 'Intermédiaire' : 'Professionnel';

  return {
    label,
    themeId,
    level,
    definition: `Livrable « ${label} » dans le cadre du thème. Il matérialise une étape concrète du cycle de vie logiciel.`,
    why: [
      'Structurer l\'avancement du projet',
      'Réduire les oublis avant la mise en production',
      themeWhy ? themeWhy.slice(0, 120) + (themeWhy.length > 120 ? '…' : '') : 'Aligner l\'équipe sur les bonnes pratiques',
    ],
    example: {
      title: 'Projet type',
      diagram: `Équipe\n↓\n${label}\n↓\nLivraison incrémentale`,
    },
    tools: ctx.tools ?? [],
    bestPractices: ['Documenter la décision', 'Valider avec un pair ou le client', 'Itérer plutôt que viser la perfection'],
    commonMistakes: ['Cocher sans avoir réalisé', 'Pas de preuve ou artefact', 'Ignorer les prérequis des étapes précédentes'],
    depthLevels: {
      debutant: LEVEL_DEPTH.debutant,
      intermediaire: LEVEL_DEPTH.intermediaire,
      professionnel: LEVEL_DEPTH.professionnel,
    },
    image: ctx.image ?? null,
    weight: null,
  };
}

export function getAllKnowledgeWeights() {
  const map = new Map();
  for (const [key, val] of Object.entries(KNOWLEDGE_OVERRIDES)) {
    if (val.weight) map.set(key, val.weight);
  }
  return map;
}
