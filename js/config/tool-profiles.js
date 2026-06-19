/**
 * Profils enrichis — guide d'aide à la décision
 * Fusionnés avec TOOLS_REGISTRY via getEnrichedTool()
 */

export const PRICING_TYPES = {
  gratuit: { label: 'Gratuit', badge: 'pricing-gratuit', emoji: '🟢' },
  freemium: { label: 'Freemium', badge: 'pricing-freemium', emoji: '🟡' },
  payant: { label: 'Payant', badge: 'pricing-payant', emoji: '🔴' },
  'open-source': { label: 'Open Source', badge: 'pricing-oss', emoji: '🔵' },
};

const CATEGORY_HINTS = [
  [/jira|trello|clickup|linear|asana/i, 'Gestion de projet'],
  [/notion|confluence|wiki/i, 'Documentation'],
  [/miro|excalidraw|draw|figma|penpot|lucid/i, 'Design & schémas'],
  [/react|vue|angular|svelte|vite|webpack/i, 'Frontend'],
  [/laravel|symfony|express|nestjs|node|php|spring/i, 'Backend'],
  [/postgres|mysql|mongo|redis|sql|dbeaver|pgadmin/i, 'Base de données'],
  [/jest|vitest|playwright|cypress|supertest|testrail|k6|jmeter/i, 'Tests & qualité'],
  [/docker|kubernetes|helm|podman|devops/i, 'DevOps'],
  [/github actions|gitlab|jenkins|cicd|argocd/i, 'CI/CD'],
  [/nginx|caddy|terraform|ansible|aws|azure|gcp|cloudflare|hetzner|ovh/i, 'Infrastructure'],
  [/grafana|prometheus|sentry|loki|datadog|monitoring/i, 'Monitoring'],
  [/owasp|zap|burp|snyk|security/i, 'Sécurité'],
  [/vercel|netlify|render|railway|deploy/i, 'Déploiement'],
  [/postman|swagger|insomnia/i, 'API'],
  [/lighthouse|gtmetrix|webpagetest/i, 'Performance'],
];

function inferCategory(name) {
  for (const [re, cat] of CATEGORY_HINTS) {
    if (re.test(name)) return cat;
  }
  return 'Outil développement';
}

export const TOOL_PROFILES = {
  jira: {
    category: 'Gestion de projet',
    description: 'Outil utilisé pour gérer les tâches, les sprints et les équipes Agile.',
    pricingType: 'freemium',
    pricingDetails: ['✅ Gratuit jusqu\'à 10 utilisateurs (plan Free)', '💰 Versions Standard, Premium et Enterprise', '⚠ Vérifier les tarifs sur atlassian.com'],
    popularite: 5,
    enterpriseAdoption: 'Très utilisé en entreprise',
    complexity: 'Élevée',
    scores: { debutant: 2, entreprise: 5, personnel: 2 },
    purpose: ['Backlog produit', 'User Stories', 'Suivi des bugs', 'Sprints Scrum', 'Releases'],
    whenToUse: ['Équipe de plusieurs développeurs', 'Projet complexe', 'Méthode Scrum formalisée'],
    whenToAvoid: ['Petit projet personnel', 'Prototype rapide — Trello suffit souvent'],
    pros: ['Standard du marché', 'Puissant et extensible', 'Intégrations Atlassian'],
    cons: ['Complexe pour débuter', 'Configuration longue', 'Interface dense'],
    alternatives: ['Trello', 'ClickUp', 'Linear', 'GitHub Projects'],
    example: { title: 'Marketplace', content: 'Sprint : inscription, auth, paiement. Tickets Jira To Do → Done.' },
    screenshot: 'assets/tools/jira.svg',
    tutorial: 'https://www.atlassian.com/agile/tutorials',
  },
  trello: {
    category: 'Gestion de projet',
    description: 'Tableaux Kanban visuels pour organiser tâches et idées.',
    pricingType: 'freemium',
    pricingDetails: ['✅ Plan Free pour usage personnel', '💰 Business Class pour équipes', '⚠ Vérifier trello.com'],
    popularite: 4,
    enterpriseAdoption: 'Populaire PME et freelances',
    complexity: 'Faible',
    scores: { debutant: 5, entreprise: 3, personnel: 5 },
    purpose: ['Kanban', 'To-do', 'Suivi simple'],
    whenToUse: ['Petite équipe', 'Projet perso', 'Simplicité immédiate'],
    whenToAvoid: ['Gros backlog complexe', 'Reporting avancé — préférer Jira'],
    pros: ['Prise en main 5 min', 'Intuitif', 'Gratuit en basique'],
    cons: ['Limité gros projets', 'Peu de Scrum natif'],
    alternatives: ['Notion', 'Jira', 'ClickUp'],
    example: { title: 'Site vitrine', content: 'Colonnes : À faire | En cours | Terminé.' },
    screenshot: 'assets/tools/trello.svg',
    tutorial: 'https://trello.com/guide',
  },
  notion: {
    category: 'Documentation & productivité',
    description: 'Docs, wikis, bases de données et gestion légère de projet.',
    pricingType: 'freemium',
    pricingDetails: ['✅ Free usage personnel', '💰 Plus / Business / Enterprise', '⚠ notion.so/pricing'],
    popularite: 5,
    enterpriseAdoption: 'Startups et équipes produit',
    complexity: 'Moyenne',
    scores: { debutant: 4, entreprise: 4, personnel: 5 },
    purpose: ['Documentation', 'Specs', 'Wiki', 'Bases légères'],
    whenToUse: ['Centraliser docs + tâches', 'Petite équipe', 'Projet solo'],
    whenToAvoid: ['Vrai workflow Agile sprints', '→ Jira + Confluence'],
    pros: ['Flexible', 'Templates', 'Collaboration temps réel'],
    cons: ['Risque de désordre', 'Pas un tracker dev pur'],
    alternatives: ['Confluence', 'ClickUp', 'Coda'],
    example: { title: 'Dossier CDA', content: 'Pages Analyse, UML, Stack, Journal.' },
    screenshot: 'assets/tools/notion.svg',
    tutorial: 'https://www.notion.com/help/guides',
  },
  docker: {
    category: 'DevOps & conteneurisation',
    description: 'Conteneurisation reproductible pour dev, test et production.',
    pricingType: 'freemium',
    pricingDetails: ['✅ Desktop gratuit perso/éducation', '💰 Business grandes orgs', '🔵 Moteur open source'],
    popularite: 5,
    enterpriseAdoption: 'Standard industrie',
    complexity: 'Moyenne',
    scores: { debutant: 3, entreprise: 5, personnel: 4 },
    purpose: ['Conteneurs', 'Docker Compose', 'Images CI/CD'],
    whenToUse: ['Multi-services', 'CI/CD', 'Environnements reproductibles'],
    whenToAvoid: ['Site statique simple', 'Premier projet sans serveur'],
    pros: ['Standard de facto', 'Écosystème images', 'Compose simple'],
    cons: ['Courbe initiale', 'Debug conteneurs'],
    alternatives: ['Podman', 'Railway'],
    example: { title: 'Stack full', content: 'compose : api + postgres + redis.' },
    screenshot: 'assets/tools/docker.svg',
    tutorial: 'https://docs.docker.com/get-started/',
  },
  react: {
    category: 'Frontend',
    description: 'Bibliothèque UI composable pour SPA et dashboards.',
    pricingType: 'open-source',
    pricingDetails: ['🔵 MIT open source', '✅ Gratuit'],
    popularite: 5,
    enterpriseAdoption: 'Meta, Netflix, Airbnb…',
    complexity: 'Moyenne',
    scores: { debutant: 3, entreprise: 5, personnel: 4 },
    purpose: ['SPA', 'Composants', 'Écosystème Next.js'],
    whenToUse: ['UI interactive', 'Équipe JS/TS', 'Écosystème mature'],
    whenToAvoid: ['Site 100 % statique', '→ HTML/CSS'],
    pros: ['Communauté énorme', 'react.dev', 'Embauche'],
    cons: ['Choix architecture', 'Boilerplate'],
    alternatives: ['Vue.js', 'Angular', 'Svelte'],
    example: { title: 'Dashboard', content: 'Sidebar, DataTable, Charts.' },
    screenshot: 'assets/tools/react.svg',
    tutorial: 'https://react.dev/learn',
  },
  postgresql: {
    category: 'Base de données',
    description: 'SGBD relationnel open source robuste (JSON, full-text, extensions).',
    pricingType: 'open-source',
    pricingDetails: ['🔵 Open source', '✅ Self-hosted gratuit', '💰 RDS, Supabase, Neon…'],
    popularite: 5,
    enterpriseAdoption: 'Standard apps web',
    complexity: 'Moyenne',
    scores: { debutant: 3, entreprise: 5, personnel: 4 },
    purpose: ['Relations', 'ACID', 'JSONB', 'SQL'],
    whenToUse: ['Intégrité données', 'Requêtes complexes'],
    whenToAvoid: ['Schema-less pur', '→ MongoDB'],
    pros: ['Gratuit puissant', 'SQL standard', 'Extensions'],
    cons: ['Scale horizontal', 'Ops prod'],
    alternatives: ['MySQL', 'MongoDB', 'SQLite'],
    example: { title: 'E-commerce', content: 'users, orders, products + FK.' },
    screenshot: 'assets/tools/postgresql.svg',
    tutorial: 'https://www.postgresql.org/docs/current/tutorial.html',
  },
  playwright: {
    category: 'Tests E2E',
    description: 'Tests end-to-end multi-navigateurs par Microsoft.',
    pricingType: 'open-source',
    pricingDetails: ['🔵 Apache 2.0', '✅ Gratuit', '💰 Cloud optionnel'],
    popularite: 5,
    enterpriseAdoption: 'Adoption croissante',
    complexity: 'Moyenne',
    scores: { debutant: 3, entreprise: 5, personnel: 4 },
    purpose: ['E2E', 'Multi-browser', 'Traces debug'],
    whenToUse: ['Parcours critiques CI', 'Remplacer Selenium'],
    whenToAvoid: ['Sans UI', '→ Jest unitaire'],
    pros: ['Auto-wait', 'Traces', 'Multi-langage'],
    cons: ['Setup', 'Lent vs unitaires'],
    alternatives: ['Cypress', 'Selenium'],
    example: { title: 'Checkout', content: 'login → panier → paiement en CI.' },
    screenshot: 'assets/tools/playwright.svg',
    tutorial: 'https://playwright.dev/docs/intro',
  },
  jest: {
    category: 'Tests unitaires',
    description: 'Framework tests JS : mocks, snapshots, couverture.',
    pricingType: 'open-source',
    pricingDetails: ['🔵 Open source', '✅ Gratuit'],
    popularite: 5,
    enterpriseAdoption: 'Standard React historique',
    complexity: 'Faible',
    scores: { debutant: 4, entreprise: 5, personnel: 4 },
    purpose: ['Unitaires', 'Composants React', 'Couverture'],
    whenToUse: ['Node/React', 'CI couverture'],
    whenToAvoid: ['Vite pur', '→ Vitest'],
    pros: ['Zero config', 'Mature'],
    cons: ['Lent vs Vitest', 'ESM config'],
    alternatives: ['Vitest', 'Mocha'],
    example: { title: 'Service panier', content: 'addItem, totalPrice mocks.' },
    screenshot: 'assets/tools/default.svg',
    tutorial: 'https://jestjs.io/docs/getting-started',
  },
  'github-actions': {
    category: 'CI/CD',
    description: 'Workflows automatisés dans GitHub : lint, tests, deploy.',
    pricingType: 'freemium',
    pricingDetails: ['✅ 2000 min/mois free private', '✅ Public illimité', '💰 Minutes sup. facturées'],
    popularite: 5,
    enterpriseAdoption: 'Dominant sur GitHub',
    complexity: 'Moyenne',
    scores: { debutant: 3, entreprise: 5, personnel: 5 },
    purpose: ['CI/CD', 'Tests auto', 'Deploy'],
    whenToUse: ['Code sur GitHub', 'Sans Jenkins'],
    whenToAvoid: ['GitLab only', '→ GitLab CI'],
    pros: ['Intégré GitHub', 'Marketplace actions'],
    cons: ['Lock-in', 'Coût minutes'],
    alternatives: ['GitLab CI', 'Jenkins'],
    example: { title: 'Pipeline', content: 'Push → Lint → Test → Deploy.' },
    screenshot: 'assets/tools/github-actions.svg',
    tutorial: 'https://docs.github.com/en/actions/learn-github-actions',
  },
  aws: {
    category: 'Cloud',
    description: 'Cloud Amazon : compute, stockage, BDD, réseau, IA.',
    pricingType: 'payant',
    pricingDetails: ['💰 Pay-as-you-go', '✅ Free Tier 12 mois', '⚠ Surveiller la facture'],
    popularite: 5,
    enterpriseAdoption: 'Leader cloud entreprise',
    complexity: 'Élevée',
    scores: { debutant: 1, entreprise: 5, personnel: 2 },
    purpose: ['Scale', 'EC2, S3, RDS, Lambda'],
    whenToUse: ['Prod scalable', 'Équipe ops'],
    whenToAvoid: ['Premier projet solo', '→ VPS / Vercel'],
    pros: ['Complet', 'Certifications'],
    cons: ['Complexité', 'Coûts'],
    alternatives: ['Azure', 'GCP', 'Hetzner'],
    example: { title: 'Prod', content: 'ECS + RDS + S3 + CloudFront.' },
    screenshot: 'assets/tools/aws.svg',
    tutorial: 'https://aws.amazon.com/getting-started/',
  },
  figma: {
    category: 'Design UI/UX',
    description: 'Design collaboratif : maquettes, prototypes, design systems.',
    pricingType: 'freemium',
    pricingDetails: ['✅ Starter 3 projets free', '💰 Pro / Organization', '⚠ figma.com/pricing'],
    popularite: 5,
    enterpriseAdoption: 'Standard design produit',
    complexity: 'Faible',
    scores: { debutant: 5, entreprise: 5, personnel: 4 },
    purpose: ['Maquettes', 'Prototypes', 'Design system'],
    whenToUse: ['UI soignée', 'Collab design-dev'],
    whenToAvoid: ['Backend only', '→ Penpot OSS'],
    pros: ['Temps réel', 'Plugins', 'Standard'],
    cons: ['Payant équipes', 'Pas OSS'],
    alternatives: ['Penpot', 'Sketch'],
    example: { title: 'App mobile', content: 'Onboarding, liste, panier, paiement.' },
    screenshot: 'assets/tools/figma.svg',
    tutorial: 'https://help.figma.com/',
  },
  grafana: {
    category: 'Monitoring',
    description: 'Dashboards métriques, logs et alerting.',
    pricingType: 'open-source',
    pricingDetails: ['🔵 OSS gratuit', '💰 Grafana Cloud', '✅ Self-hosted'],
    popularite: 5,
    enterpriseAdoption: 'Standard observabilité',
    complexity: 'Moyenne',
    scores: { debutant: 2, entreprise: 5, personnel: 3 },
    purpose: ['Dashboards', 'Alertes', 'Prometheus/Loki'],
    whenToUse: ['Prod', 'Métriques collectées'],
    whenToAvoid: ['Projet local sans prod'],
    pros: ['OSS puissant', 'Datasources'],
    cons: ['Config longue', 'Stack multi-outils'],
    alternatives: ['Datadog', 'New Relic'],
    example: { title: 'API prod', content: 'latence p95, erreurs 5xx, CPU.' },
    screenshot: 'assets/tools/grafana.svg',
    tutorial: 'https://grafana.com/tutorials/',
  },
};

function defaultProfile(name, base) {
  const oss = !!base.github && !/atlassian|mongodb\.com|docker\.com\/$|aws|figma|sentry\.io/i.test(base.website ?? '');
  const pricingType = oss ? 'open-source' : (base.github ? 'open-source' : 'freemium');
  return {
    category: inferCategory(name),
    description: base.description ?? `Outil « ${name} » utilisé dans le cycle de vie logiciel.`,
    pricingType,
    pricingDetails: ['⚠ Vérifier la tarification sur le site officiel'],
    popularite: 3,
    enterpriseAdoption: 'Usage variable selon contexte',
    complexity: 'Moyenne',
    scores: { debutant: 3, entreprise: 3, personnel: 3 },
    purpose: base.useCases ?? ['Usage professionnel courant'],
    whenToUse: [`Projet nécessitant ${name}`, 'Équipe familiarisée avec l\'outil'],
    whenToAvoid: ['Besoin plus simple — comparer les alternatives'],
    pros: ['Référence dans sa catégorie', 'Documentation officielle disponible'],
    cons: ['Profil détaillé à compléter', 'Évaluer selon votre contexte'],
    alternatives: base.alternatives ?? [],
    example: null,
    screenshot: 'assets/tools/default.svg',
    tutorial: base.documentation ?? base.website ?? null,
  };
}

export function renderStars(n, max = 5) {
  const filled = Math.round(Math.min(max, Math.max(0, n)));
  return '★'.repeat(filled) + '☆'.repeat(max - filled);
}

export function renderScoreStars(scores) {
  if (!scores) return '';
  return `
    <div class="tool-score-row"><span>Débutant</span><span class="tool-stars">${renderStars(scores.debutant)}</span></div>
    <div class="tool-score-row"><span>Entreprise</span><span class="tool-stars">${renderStars(scores.entreprise)}</span></div>
    <div class="tool-score-row"><span>Projet perso</span><span class="tool-stars">${renderStars(scores.personnel)}</span></div>`;
}

export function getPricingBadge(pricingType) {
  return PRICING_TYPES[pricingType] ?? PRICING_TYPES.freemium;
}

export function enrichTool(id, base) {
  if (!base) return null;
  const profile = TOOL_PROFILES[id] ?? defaultProfile(base.name, base);
  return {
    id,
    ...base,
    ...profile,
    alternatives: profile.alternatives?.length ? profile.alternatives : (base.alternatives ?? []),
    keywords: base.keywords ?? [],
  };
}

export function matchesToolFilter(tool, filter) {
  if (!filter || filter === 'all') return true;
  if (filter === 'gratuit') return tool.pricingType === 'gratuit';
  if (filter === 'freemium') return tool.pricingType === 'freemium';
  if (filter === 'payant') return tool.pricingType === 'payant';
  if (filter === 'open-source') return tool.pricingType === 'open-source';
  if (filter === 'debutants') return tool.recommendedLevel === 'Débutant';
  if (filter === 'professionnels') {
    return ['Intermédiaire', 'Avancé', 'Professionnel'].includes(tool.recommendedLevel);
  }
  return true;
}

export function searchToolMatch(tool, query) {
  const q = query.toLowerCase();
  const hay = [
    tool.name, tool.category, tool.description, tool.enterpriseAdoption,
    ...(tool.keywords ?? []), ...(tool.alternatives ?? []),
  ].join(' ').toLowerCase();
  return hay.includes(q);
}
