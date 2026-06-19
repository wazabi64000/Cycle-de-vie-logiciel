/** WazabyCode Project Roadmap — 19 thèmes du cycle de vie logiciel */

import { getItemWeight } from './checklist-knowledge.js';

function cl(items) {
  return items.map((label, i) => ({ id: `item-${i + 1}`, label, weight: null }));
}

const LEVEL_DEFAULT_WEIGHT = { debutant: 4, intermediaire: 6, professionnel: 8 };

function assignChecklistWeights(themes) {
  for (const theme of themes) {
    for (const [level, items] of Object.entries(theme.checklists)) {
      for (const item of items) {
        const override = getItemWeight(theme.id, level, item.label);
        item.weight = override ?? LEVEL_DEFAULT_WEIGHT[level] ?? 5;
      }
    }
  }
  let total = 0;
  for (const theme of themes) {
    for (const level of Object.keys(theme.checklists)) {
      for (const item of theme.checklists[level]) total += item.weight;
    }
  }
  const factor = 1000 / total;
  for (const theme of themes) {
    for (const level of Object.keys(theme.checklists)) {
      for (const item of theme.checklists[level]) {
        item.weight = Math.round(item.weight * factor * 10) / 10;
      }
    }
  }
}

function theme(num, slug, title, icon, keywords, why, topics, tools, checklists) {
  return {
    num,
    id: slug,
    slug,
    title,
    icon,
    keywords,
    why,
    topics,
    tools,
    checklists: {
      debutant: cl(checklists.debutant),
      intermediaire: cl(checklists.intermediaire),
      professionnel: cl(checklists.professionnel),
    },
  };
}

export const ROADMAP_META = {
  name: 'WazabyCode',
  tagline: 'Le guide du développeur moderne',
  subtitle: 'Project Roadmap — Cycle de vie complet d\'une application',
  lifecycle: [
    'Idée', 'Analyse', 'Conception', 'Stack', 'BDD', 'UX', 'Frontend', 'Backend',
    'Auth', 'Tests', 'QA', 'Performance', 'Stress', 'Sécurité', 'DevOps', 'CI/CD',
    'Infra', 'Déploiement', 'Monitoring', 'Maintenance', 'Production',
  ],
};

export const ROADMAP_THEMES = [
  theme(1, 'analyse-besoins', 'Analyse des besoins', '📋',
    ['analyse', 'besoin', 'cahier des charges', 'user stories', 'personas', 'mvp', 'jira', 'trello', 'notion', 'clickup', 'miro', 'priorisation'],
    'Analyser avant de coder évite les refontes coûteuses, les fonctionnalités inutiles et les décalages avec le client. C\'est la fondation de tout projet réussi.',
    [
      { title: 'Recueil du besoin', body: 'Entretiens, questionnaires, observation terrain. Comprendre le problème métier avant la solution technique.' },
      { title: 'Cahier des charges & User Stories', body: 'Rédiger des US au format « En tant que… je veux… afin de… ». Définir le MVP et prioriser (MoSCoW, RICE).' },
      { title: 'Personas & parcours', body: 'Identifier les utilisateurs cibles, leurs contraintes et leurs objectifs.' },
    ],
    ['Jira', 'Trello', 'Notion', 'ClickUp', 'Miro'],
    {
      debutant: ['Besoin identifié', 'Utilisateur cible identifié', 'Problème métier formulé'],
      intermediaire: ['MVP défini', 'User stories rédigées', 'Priorisation documentée'],
      professionnel: ['Cahier des charges validé', 'Personas créés', 'Backlog structuré', 'Critères d\'acceptation définis'],
    }),

  theme(2, 'conception', 'Conception', '🏗️',
    ['conception', 'uml', 'cas d\'utilisation', 'diagramme de classes', 'sequence', 'architecture', 'draw.io', 'excalidraw', 'lucidchart'],
    'La conception traduit le besoin en structure technique. Elle aligne l\'équipe et réduit les ambiguïtés avant le développement.',
    [
      { title: 'UML essentiel', body: 'Cas d\'utilisation, classes, séquences, activités. Modéliser les flux métier et les interactions.' },
      { title: 'Architecture applicative', body: 'Couches (présentation, métier, données), patterns MVC/MVVM, microservices vs monolithe.' },
      { title: 'Documentation', body: 'Dossier de conception, flux documentés, décisions d\'architecture (ADR).' },
    ],
    ['Draw.io', 'Excalidraw', 'Lucidchart', 'PlantUML'],
    {
      debutant: ['Schéma général dessiné', 'Acteurs identifiés', 'Flux principal documenté'],
      intermediaire: ['Diagrammes UML réalisés', 'Architecture en couches définie', 'Modèle de données esquissé'],
      professionnel: ['Dossier de conception complet', 'Flux alternatifs documentés', 'Architecture validée par l\'équipe', 'ADR rédigées'],
    }),

  theme(3, 'choix-stack', 'Choix de la stack', '⚙️',
    ['stack', 'react', 'vue', 'angular', 'svelte', 'php', 'laravel', 'symfony', 'node', 'express', 'nestjs', 'spring', 'flutter', 'react native', 'electron'],
    'Le choix technologique impacte performance, coût, recrutement et maintenabilité. Il doit être justifié par le contexte projet.',
    [
      { title: 'Frontend', body: 'HTML/CSS/JS vanilla, React, Vue, Angular, Svelte — critères : SEO, interactivité, équipe, écosystème.' },
      { title: 'Backend', body: 'PHP/Laravel/Symfony, Node/Express/NestJS, Java Spring — critères : charge, intégrations, compétences.' },
      { title: 'Mobile & Desktop', body: 'Flutter, React Native, Kotlin/Swift natif. Electron, .NET, JavaFX pour desktop.' },
    ],
    ['Can I Use', 'npm trends', 'StackShare', 'Benchmarks'],
    {
      debutant: ['Stack frontend choisie', 'Stack backend choisie', 'Base de données choisie'],
      intermediaire: ['Comparatif documenté', 'Contraintes techniques listées', 'POC réalisé si doute'],
      professionnel: ['Justification écrite et validée', 'Matrice de décision archivée', 'Stack alignée avec l\'équipe et le client'],
    }),

  theme(4, 'bases-donnees', 'Bases de données', '🗄️',
    ['postgresql', 'mysql', 'mariadb', 'mongodb', 'redis', 'sql', 'nosql', 'index', 'transaction', 'normalisation', 'schema'],
    'Les données sont le cœur de l\'application. Un schéma mal conçu génère dette technique et problèmes de performance.',
    [
      { title: 'SQL relationnel', body: 'PostgreSQL, MySQL, MariaDB — relations, clés, contraintes, index, transactions ACID.' },
      { title: 'NoSQL', body: 'MongoDB (documents), Redis (cache/sessions). Quand choisir SQL vs NoSQL.' },
      { title: 'Modélisation', body: 'Normalisation, MCD/MLD, migrations versionnées, sauvegardes.' },
    ],
    ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'DBeaver', 'pgAdmin'],
    {
      debutant: ['Schéma de base créé', 'Tables principales définies', 'Relations identifiées'],
      intermediaire: ['Index ajoutés', 'Contraintes définies', 'Migrations versionnées'],
      professionnel: ['Schéma normalisé et documenté', 'Stratégie de backup définie', 'Requêtes critiques optimisées'],
    }),

  theme(5, 'maquettage-ux', 'Maquettage et UX', '🎨',
    ['ux', 'ui', 'wireframe', 'figma', 'penpot', 'design system', 'accessibilite', 'rgaa', 'parcours utilisateur', 'responsive'],
    'Une bonne UX réduit le taux d\'abandon, les tickets support et les retours en développement.',
    [
      { title: 'Wireframes & maquettes', body: 'Low-fi puis high-fi. Parcours utilisateur, états vides, erreurs, chargement.' },
      { title: 'Design System', body: 'Couleurs, typo, composants réutilisables, cohérence multi-plateformes.' },
      { title: 'Accessibilité', body: 'RGAA/WCAG, contrastes, navigation clavier, lecteurs d\'écran.' },
    ],
    ['Figma', 'Penpot', 'Whimsical', 'Stark (contraste)'],
    {
      debutant: ['Wireframes réalisés', 'Parcours principal défini', 'Responsive envisagé'],
      intermediaire: ['Maquettes haute fidélité', 'Design system esquissé', 'Tests utilisateurs planifiés'],
      professionnel: ['Maquettes validées client', 'Accessibilité intégrée dès la conception', 'Prototype interactif livré'],
    }),

  theme(6, 'dev-frontend', 'Développement Frontend', '💻',
    ['frontend', 'html', 'css', 'javascript', 'responsive', 'seo', 'accessibilite', 'performance', 'spa'],
    'Le frontend est la vitrine de l\'application. Qualité, performance et accessibilité conditionnent l\'adoption.',
    [
      { title: 'Architecture frontend', body: 'Composants, état, routing, séparation des responsabilités.' },
      { title: 'Responsive & mobile-first', body: 'Breakpoints, flex/grid, images adaptatives, touch targets.' },
      { title: 'SEO & performance', body: 'Meta tags, sémantique HTML, lazy loading, bundle splitting.' },
    ],
    ['Vite', 'Webpack', 'Lighthouse', 'Browser DevTools'],
    {
      debutant: ['Structure HTML sémantique', 'CSS responsive de base', 'Navigation fonctionnelle'],
      intermediaire: ['Responsive validé multi-écrans', 'Accessibilité de base vérifiée', 'SEO meta configurés'],
      professionnel: ['Performance Lighthouse > 90', 'Accessibilité WCAG AA', 'Code review frontend effectuée'],
    }),

  theme(7, 'dev-backend', 'Développement Backend', '⚙️',
    ['backend', 'api', 'rest', 'middleware', 'validation', 'logs', 'express', 'laravel', 'nestjs'],
    'Le backend porte la logique métier, la persistance et la sécurité des échanges.',
    [
      { title: 'API REST', body: 'Ressources, verbes HTTP, codes statut, versioning, documentation OpenAPI/Swagger.' },
      { title: 'Middleware & validation', body: 'Parsing, validation entrées, gestion erreurs centralisée, logs structurés.' },
      { title: 'Bonnes pratiques', body: 'Séparation controller/service/repository, injection de dépendances, config par environnement.' },
    ],
    ['Postman', 'Swagger', 'Insomnia', 'Winston/Pino'],
    {
      debutant: ['API REST créée', 'Endpoints CRUD principaux', 'Réponses JSON cohérentes'],
      intermediaire: ['Validation implémentée', 'Gestion erreurs centralisée', 'Logs configurés'],
      professionnel: ['Documentation API à jour', 'Tests API automatisés', 'Architecture en couches respectée'],
    }),

  theme(8, 'auth-securite', 'Authentification et autorisations', '🔐',
    ['auth', 'jwt', 'oauth', 'session', 'rbac', 'permissions', 'roles', '2fa'],
    'L\'authentification protège les données. Les autorisations garantissent que chaque utilisateur accède uniquement à ce qui lui est permis.',
    [
      { title: 'Mécanismes', body: 'JWT stateless, sessions serveur, OAuth2/OIDC (Google, GitHub), refresh tokens.' },
      { title: 'RBAC', body: 'Rôles (admin, user, guest), permissions granulaires, principe du moindre privilège.' },
      { title: 'Sécurisation', body: 'Hash mots de passe (bcrypt/argon2), rate limiting login, CSRF, cookies HttpOnly.' },
    ],
    ['Passport.js', 'Keycloak', 'Auth0', 'OWASP Auth Cheatsheet'],
    {
      debutant: ['Login/logout fonctionnel', 'Mots de passe hashés', 'Routes protégées'],
      intermediaire: ['Rôles définis', 'Permissions testées', 'Tokens sécurisés'],
      professionnel: ['RBAC complet documenté', 'OAuth configuré si besoin', 'Audit auth effectué'],
    }),

  theme(9, 'tests', 'Tests', '🧪',
    ['tests', 'jest', 'vitest', 'supertest', 'postman', 'playwright', 'cypress', 'unitaire', 'e2e', 'integration'],
    'Les tests réduisent les régressions et documentent le comportement attendu. Ils sont indispensables avant la mise en production.',
    [
      { title: 'Tests unitaires', body: 'Jest, Vitest — fonctions isolées, mocks, couverture cible > 70 %.' },
      { title: 'Tests API', body: 'Supertest, Postman/Newman — endpoints, statuts, payloads.' },
      { title: 'Tests E2E', body: 'Playwright, Cypress — parcours critiques utilisateur. Mobile : Flutter Test, Detox.' },
    ],
    ['Jest', 'Vitest', 'Playwright', 'Cypress', 'Supertest'],
    {
      debutant: ['Premiers tests unitaires écrits', 'Tests manuels documentés', 'Scénarios critiques listés'],
      intermediaire: ['Tests unitaires sur le métier', 'Tests API automatisés', 'Tests E2E parcours principal'],
      professionnel: ['Couverture > 70 %', 'CI exécute les tests', 'Tests E2E sur tous les flux critiques'],
    }),

  theme(10, 'qa', 'QA — Assurance qualité', '✅',
    ['qa', 'smoke test', 'regression', 'uat', 'exploratoire', 'bug', 'qualite'],
    'La QA valide que l\'application répond aux attentes métier au-delà des tests automatisés.',
    [
      { title: 'Types de tests QA', body: 'Smoke (sanity), fonctionnel, régression, UAT (recette client), exploratoire.' },
      { title: 'Processus', body: 'Plan de test, jeux de données, rapport de bugs, cycle correction/re-test.' },
      { title: 'Critères de sortie', body: 'Zero bug bloquant, bugs majeurs < seuil, UAT signée.' },
    ],
    ['TestRail', 'Zephyr', 'Linear', 'GitHub Issues'],
    {
      debutant: ['Plan de test rédigé', 'Smoke test effectué', 'Bugs documentés'],
      intermediaire: ['Tests fonctionnels complets', 'Régression avant release', 'UAT planifiée'],
      professionnel: ['QA sign-off obtenu', 'Bugs bloquants corrigés', 'Rapport QA archivé'],
    }),

  theme(11, 'performance', 'Performance', '⚡',
    ['performance', 'lighthouse', 'web vitals', 'lcp', 'fid', 'cls', 'optimisation', 'cache'],
    'La performance impacte SEO, conversion et coûts serveur. Mesurer avant d\'optimiser.',
    [
      { title: 'Web Vitals', body: 'LCP, FID/INP, CLS — objectifs Google Core Web Vitals.' },
      { title: 'Frontend', body: 'Lazy loading, compression, CDN, tree shaking, images WebP/AVIF.' },
      { title: 'Backend', body: 'Cache Redis, requêtes N+1, index BDD, pagination, connection pooling.' },
    ],
    ['Lighthouse', 'WebPageTest', 'Chrome DevTools', 'GTmetrix'],
    {
      debutant: ['Lighthouse exécuté', 'Goulots identifiés', 'Images optimisées'],
      intermediaire: ['Score Lighthouse > 80', 'Cache configuré', 'Requêtes lentes corrigées'],
      professionnel: ['Web Vitals verts en prod', 'Budget performance défini', 'Monitoring perf actif'],
    }),

  theme(12, 'stress-test', 'Stress Test', '📈',
    ['stress', 'k6', 'jmeter', 'gatling', 'charge', 'load test', 'scalabilite'],
    'Le stress test révèle les limites du système avant que les utilisateurs ne les découvrent en production.',
    [
      { title: 'Scénarios de charge', body: '100, 1000, 10 000 utilisateurs simultanés — montée en charge progressive.' },
      { title: 'Métriques', body: 'Latence p95/p99, taux d\'erreur, throughput, saturation CPU/RAM.' },
      { title: 'Actions', body: 'Auto-scaling, cache, queue, optimisation requêtes, CDN.' },
    ],
    ['K6', 'JMeter', 'Gatling', 'Artillery'],
    {
      debutant: ['Test charge basique effectué', 'Point de rupture identifié', 'Logs analysés'],
      intermediaire: ['Scénarios 100 et 1000 users', 'Métriques documentées', 'Goulots corrigés'],
      professionnel: ['Test 10 000 users réalisé', 'Plan de scalabilité rédigé', 'Limites documentées pour l\'équipe Ops'],
    }),

  theme(13, 'securite', 'Sécurité', '🛡️',
    ['securite', 'owasp', 'xss', 'csrf', 'sql injection', 'ssrf', 'zap', 'burp', 'audit'],
    'La sécurité n\'est pas une étape finale — elle traverse tout le cycle. OWASP Top 10 est la référence minimale.',
    [
      { title: 'OWASP Top 10', body: 'Injection SQL, XSS, CSRF, Broken Access Control, SSRF, misconfiguration, etc.' },
      { title: 'Audit', body: 'OWASP ZAP, Burp Suite, revue de code, pentest si données sensibles.' },
      { title: 'Durcissement', body: 'HTTPS, headers sécurité (CSP, HSTS), secrets en vault, RGPD.' },
    ],
    ['OWASP ZAP', 'Burp Suite', 'Snyk', 'npm audit'],
    {
      debutant: ['HTTPS activé', 'Dépendances à jour', 'Entrées utilisateur filtrées'],
      intermediaire: ['Scan OWASP ZAP effectué', 'Headers sécurité configurés', 'Secrets hors du code'],
      professionnel: ['Audit sécurité complet', 'Vulnérabilités corrigées', 'Politique sécurité documentée'],
    }),

  theme(14, 'devops', 'DevOps', '🐳',
    ['devops', 'docker', 'docker compose', 'kubernetes', 'k8s', 'helm', 'conteneur'],
    'DevOps rend les environnements reproductibles et réduit les écarts « ça marche chez moi ».',
    [
      { title: 'Conteneurisation', body: 'Dockerfile, images, volumes, networks, multi-stage builds.' },
      { title: 'Orchestration', body: 'Docker Compose (dev/staging), Kubernetes + Helm (prod scale).' },
      { title: 'Infrastructure as Code', body: 'Reproductibilité, versioning infra, documentation.' },
    ],
    ['Docker', 'Docker Compose', 'Kubernetes', 'Helm', 'Podman'],
    {
      debutant: ['Dockerfile créé', 'App lance en conteneur', 'docker-compose.yml de dev'],
      intermediaire: ['Environnement reproductible', 'Variables d\'env documentées', 'Images optimisées'],
      professionnel: ['K8s ou Compose prod', 'Helm charts si K8s', 'Runbook Ops rédigé'],
    }),

  theme(15, 'cicd', 'CI/CD', '🔄',
    ['cicd', 'ci', 'cd', 'github actions', 'gitlab ci', 'jenkins', 'pipeline', 'deploy'],
    'CI/CD automatise tests et déploiements — moins d\'erreurs humaines, livraisons plus fréquentes.',
    [
      { title: 'Pipeline type', body: 'Git Push → Lint → Tests → Build → Deploy staging → Deploy prod.' },
      { title: 'Outils', body: 'GitHub Actions, GitLab CI, Jenkins, CircleCI.' },
      { title: 'Bonnes pratiques', body: 'Branches protégées, review obligatoire, rollback plan, secrets CI.' },
    ],
    ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD'],
    {
      debutant: ['Repo Git structuré', 'Premier workflow CI', 'Tests lancés automatiquement'],
      intermediaire: ['Pipeline build + test', 'Deploy staging auto', 'Notifications échec'],
      professionnel: ['Pipeline complet opérationnel', 'Deploy prod contrôlé', 'Rollback testé'],
    }),

  theme(16, 'infrastructure', 'Infrastructure', '🖥️',
    ['infrastructure', 'vps', 'aws', 'azure', 'gcp', 'linux', 'nginx', 'reverse proxy', 'dns'],
    'L\'infrastructure héberge l\'application. Choix cloud vs VPS selon budget, compétences et scalabilité.',
    [
      { title: 'Hébergement', body: 'VPS (OVH, Hetzner), AWS, Azure, GCP — critères coût/compétences/scale.' },
      { title: 'Serveur Linux', body: 'Utilisateur non-root, firewall (ufw), SSH clés, mises à jour auto.' },
      { title: 'Reverse proxy', body: 'Nginx/Caddy — SSL termination, load balancing, cache statique.' },
    ],
    ['Nginx', 'Caddy', 'Terraform', 'Ansible', 'Cloudflare'],
    {
      debutant: ['Serveur provisionné', 'SSH sécurisé', 'Domaine acheté'],
      intermediaire: ['Nginx configuré', 'DNS pointé', 'Firewall actif'],
      professionnel: ['Infra documentée', 'IaC versionnée', 'Haute dispo si requis'],
    }),

  theme(17, 'deploiement', 'Déploiement', '🚀',
    ['deploiement', 'vercel', 'netlify', 'render', 'railway', 'vps', 'ssl', 'production'],
    'Le déploiement met l\'application en mains des utilisateurs. SSL et monitoring dès le jour 1.',
    [
      { title: 'Plateformes', body: 'Vercel/Netlify (frontend), Render/Railway (fullstack), VPS (contrôle total).' },
      { title: 'Checklist prod', body: 'Variables env, SSL/TLS, domaine, redirections, robots.txt, sitemap.' },
      { title: 'Stratégies', body: 'Blue/green, canary, rolling update selon criticité.' },
    ],
    ['Vercel', 'Netlify', 'Render', 'Railway', 'Let\'s Encrypt'],
    {
      debutant: ['Application déployée', 'URL publique accessible', 'SSL configuré'],
      intermediaire: ['Env prod séparée', 'Health check endpoint', 'Rollback possible'],
      professionnel: ['Deploy documenté', 'Zero-downtime si critique', 'Post-deploy checklist validée'],
    }),

  theme(18, 'monitoring', 'Monitoring', '📊',
    ['monitoring', 'grafana', 'prometheus', 'loki', 'sentry', 'alertes', 'observabilite', 'apm'],
    'On ne peut améliorer que ce que l\'on mesure. Le monitoring détecte les incidents avant les utilisateurs.',
    [
      { title: 'Métriques', body: 'Prometheus + Grafana — CPU, RAM, latence, erreurs, business KPIs.' },
      { title: 'Logs', body: 'Loki, ELK — centralisation, recherche, corrélation.' },
      { title: 'Erreurs app', body: 'Sentry, Bugsnag — stack traces, alertes, release tracking.' },
    ],
    ['Grafana', 'Prometheus', 'Loki', 'Sentry', 'Datadog'],
    {
      debutant: ['Logs centralisés', 'Uptime monitoring', 'Alertes email basiques'],
      intermediaire: ['Dashboard Grafana', 'Sentry configuré', 'Alertes Slack/email'],
      professionnel: ['SLI/SLO définis', 'Runbooks incidents', 'Post-mortem process en place'],
    }),

  theme(19, 'maintenance', 'Maintenance', '🔧',
    ['maintenance', 'backup', 'sauvegarde', 'mise a jour', 'correctif', 'patch', 'documentation'],
    'La maintenance garantit la pérennité : sauvegardes, mises à jour sécurité, documentation et transfert de connaissances.',
    [
      { title: 'Sauvegardes', body: 'BDD quotidienne, rétention 30j, tests de restauration mensuels.' },
      { title: 'Mises à jour', body: 'Dépendances, OS, runtime — politique de patch, fenêtres maintenance.' },
      { title: 'Documentation', body: 'README ops, architecture, contacts, procédures incident.' },
    ],
    ['Cron', 'Restic', 'Dependabot', 'Renovate'],
    {
      debutant: ['Backups configurés', 'README à jour', 'Issues triées'],
      intermediaire: ['Restauration testée', 'Dependabot actif', 'Changelog tenu'],
      professionnel: ['SLA maintenance défini', 'Documentation complète', 'Plan de reprise d\'activité (PRA)'],
    }),
];

export function getThemeBySlug(slug) {
  return ROADMAP_THEMES.find((t) => t.slug === slug) ?? null;
}

export function getAllChecklistItems() {
  const items = [];
  for (const theme of ROADMAP_THEMES) {
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of theme.checklists[level]) {
        items.push({
          themeId: theme.id,
          level,
          itemId: item.id,
          label: item.label,
          weight: item.weight ?? 0,
        });
      }
    }
  }
  return items;
}

assignChecklistWeights(ROADMAP_THEMES);

export const CHECKLIST_LEVELS = [
  { id: 'debutant', label: 'Débutant', color: '#22c55e' },
  { id: 'intermediaire', label: 'Intermédiaire', color: '#3b82f6' },
  { id: 'professionnel', label: 'Professionnel', color: '#8b5cf6' },
];
