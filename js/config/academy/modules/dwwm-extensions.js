/** Modules DWWM étendus — additif uniquement (modules 11–31) */

import { mod } from '../helpers.js';

export const DWWM_EXTENDED_MODULES = [
  mod(11, 'analyse-besoin', 'Analyse du besoin', '📋',
    ['analyse', 'cahier des charges', 'user story', 'besoin', 'fonctionnel'],
    'Comprendre le besoin avant de coder évite les refontes coûteuses et aligne l\'équipe sur la valeur métier.',
    [
      { title: 'Recueil du besoin', body: 'Entretiens, questionnaires, observation terrain, ateliers discovery avec le commanditaire et les utilisateurs.' },
      { title: 'Cahier des charges', body: 'Contexte, périmètre, contraintes, planning, critères d\'acceptation, livrables attendus.' },
      { title: 'User Stories', body: 'Format « En tant que… je veux… afin de… » — backlog Agile priorisé (MoSCoW, RICE).' },
      { title: 'Cas d\'utilisation', body: 'Acteurs, scénarios nominal/alternatif, pré/postconditions — UML ou texte structuré.' },
      { title: 'Analyse fonctionnelle', body: 'Quoi faire sans imposer le comment — règles métier, flux, exceptions.' },
      { title: 'Analyse technique', body: 'Contraintes NFR : perf, sécu, hébergement, intégrations, volumétrie.' },
    ],
    ['Jira', 'Notion', 'Miro'],
    {
      debutant: ['Besoin principal identifié', 'Acteurs listés', '3 user stories rédigées', 'Problème vs solution distingués'],
      intermediaire: ['Cahier des charges structuré', 'Cas d\'utilisation principaux', 'Critères d\'acceptation testables', 'Backlog priorisé'],
      professionnel: ['Analyse fonctionnelle validée client', 'Contraintes NFR documentées', 'Périmètre MVP défini', 'Workshop discovery réalisé'],
    }),

  mod(12, 'personas', 'Personas', '👤',
    ['persona', 'utilisateur', 'ux', 'empathie', 'cible'],
    'Les personas humanisent les utilisateurs cibles et guident les décisions produit, UX et priorisation.',
    [
      { title: 'Qu\'est-ce qu\'un persona', body: 'Profil utilisateur fictif mais réaliste, basé sur des données (interviews, analytics), pas sur des stéréotypes.' },
      { title: 'Pourquoi créer des personas', body: 'Aligner l\'équipe, prioriser les features, tester des parcours, éviter le « utilisateur générique ».' },
      { title: 'Exemples réels', body: 'E-commerce : acheteur pressé, comparateur, fidèle. SaaS B2B : admin IT, manager, utilisateur final.' },
      { title: 'Fiches personas', body: 'Nom, photo, âge, métier, objectifs, frustrations, comportements numériques, citation, scénarios d\'usage.' },
    ],
    ['Miro', 'Figma', 'Notion'],
    {
      debutant: ['Définition persona comprise', '2 personas esquissés', 'Objectifs et frustrations renseignés'],
      intermediaire: ['Personas basés sur données réelles', 'Scénarios d\'usage par persona', 'Personas partagés avec l\'équipe'],
      professionnel: ['Personas validés en atelier', 'Lien personas ↔ user stories', 'Mise à jour personas post-retours utilisateurs'],
    }),

  mod(13, 'benchmark', 'Benchmark', '📊',
    ['benchmark', 'concurrence', 'marché', 'ux', 'analyse'],
    'Le benchmark éclaire les choix fonctionnels, UX et positionnement en comparant l\'existant sur le marché.',
    [
      { title: 'Analyse concurrentielle', body: 'Identifier 3–5 concurrents directs/indirects, forces, faiblesses, différenciation.' },
      { title: 'Étude du marché', body: 'Taille, tendances, réglementation, opportunités — SWOT ou matrice concurrentielle.' },
      { title: 'Analyse UX', body: 'Heuristiques Nielsen, parcours utilisateur, points de friction, bonnes pratiques à reprendre.' },
      { title: 'Analyse fonctionnelle', body: 'Matrice features : qui propose quoi (auth, paiement, recherche, mobile…).' },
    ],
    ['SimilarWeb', 'Google Trends', 'BuiltWith'],
    {
      debutant: ['3 concurrents identifiés', 'Tableau comparatif basique', 'Forces/faiblesses notées'],
      intermediaire: ['Analyse UX sur 2 parcours', 'Matrice fonctionnelle', 'Tendances marché documentées'],
      professionnel: ['Benchmark présenté au client', 'Recommandations actionnables', 'Veille concurrentielle planifiée'],
    }),

  mod(14, 'maquettage', 'Maquettage', '🎨',
    ['wireframe', 'prototype', 'figma', 'ux', 'maquette'],
    'Du wireframe à la maquette haute fidélité, le maquettage matérialise l\'expérience avant le développement.',
    [
      { title: 'Wireframe', body: 'Schéma basse fidélité — structure, zones, navigation, sans couleurs finales.' },
      { title: 'Prototype', body: 'Interactions cliquables — flux, modales, états hover/error/loading.' },
      { title: 'Maquette haute fidélité', body: 'Design final : typo, couleurs, espacements, composants UI cohérents.' },
      { title: 'Parcours utilisateur', body: 'User journey map — étapes, émotions, points de contact, opportunités d\'amélioration.' },
    ],
    ['Figma', 'Penpot', 'Excalidraw'],
    {
      debutant: ['Wireframe page d\'accueil', 'Navigation principale définie', 'Prototype basique 2 écrans'],
      intermediaire: ['Maquette mobile + desktop', 'Design system couleurs/typo', 'Parcours utilisateur cartographié'],
      professionnel: ['Prototype testé utilisateurs', 'Handoff dev (specs, assets)', 'Accessibilité couleurs vérifiée'],
    }),

  mod(15, 'architecture-web', 'Architecture Web', '🏗️',
    ['architecture', 'frontend', 'backend', 'api', 'bdd'],
    'Une architecture web claire sépare les responsabilités et facilite évolution, tests et déploiement.',
    [
      { title: 'Frontend', body: 'HTML/CSS/JS ou framework — présentation, interactions, appels API, état client.' },
      { title: 'Backend', body: 'Logique métier, validation, auth, orchestration — PHP, Node, etc.' },
      { title: 'API', body: 'Contrat REST/GraphQL entre front et back — ressources, verbes HTTP, versioning.' },
      { title: 'Base de données', body: 'Persistance relationnelle ou NoSQL — schéma, migrations, intégrité.' },
    ],
    ['Draw.io', 'Excalidraw', 'Notion'],
    {
      debutant: ['Schéma 3 tiers compris', 'Rôles front/back identifiés', 'Flux requête/réponse dessiné'],
      intermediaire: ['Diagramme architecture projet', 'Choix stack justifié', 'Séparation MVC/MVP expliquée'],
      professionnel: ['ADR (Architecture Decision Record)', 'Schéma déploiement', 'Points de scalabilité identifiés'],
    }),

  mod(16, 'serveurs-web', 'Serveurs Web', '🌐',
    ['apache', 'nginx', 'caddy', 'http', 'virtual host'],
    'Apache, Nginx et Caddy servent les applications web — choix selon perf, simplicité et SSL.',
    [
      { title: 'Apache', body: 'Présentation, installation (apt), cas d\'usage LAMP, .htaccess, modules, Virtual Hosts.' },
      { title: 'Nginx', body: 'Présentation, installation, reverse proxy, load balancing, cache statique, config server/location.' },
      { title: 'Caddy', body: 'Présentation, SSL automatique Let\'s Encrypt, config Caddyfile, cas d\'usage moderne.' },
    ],
    ['Nginx', 'Apache', 'Caddy'],
    {
      debutant: ['HTTP vs HTTPS compris', 'Virtual host configuré (local)', 'Page statique servie'],
      intermediaire: ['Reverse proxy Nginx vers app', 'Logs access/error consultés', 'SSL configuré'],
      professionnel: ['Load balancing basique', 'Comparatif Apache/Nginx/Caddy documenté', 'Durcissement headers sécurité'],
    }),

  mod(17, 'serveurs-javascript', 'Serveurs JavaScript', '⚡',
    ['nodejs', 'express', 'nestjs', 'api', 'javascript'],
    'Node.js exécute JavaScript côté serveur — Express pour l\'API légère, NestJS pour l\'architecture enterprise.',
    [
      { title: 'Node.js', body: 'Présentation, event loop, npm, modules CommonJS/ESM, cas d\'usage I/O, CLI, API.' },
      { title: 'Express.js', body: 'Routes, middlewares, req/res, gestion erreurs, API REST, static files.' },
      { title: 'NestJS', body: 'Architecture modulaire, controllers, providers, injection de dépendances, guards, pipes.' },
    ],
    ['Node.js', 'Express', 'NestJS'],
    {
      debutant: ['Serveur Node « Hello World »', 'Route GET/POST Express', 'package.json et npm scripts'],
      intermediaire: ['API REST CRUD Express', 'Middleware auth basique', 'Structure modules NestJS'],
      professionnel: ['Validation entrées + gestion erreurs', 'Tests API Supertest', 'Comparatif Express vs NestJS justifié'],
    }),

  mod(18, 'serveurs-php-avances', 'Serveurs PHP', '🐘',
    ['laravel', 'symfony', 'php', 'mvc', 'api'],
    'Au-delà du PHP natif, Laravel et Symfony structurent les applications web professionnelles en France.',
    [
      { title: 'PHP natif', body: 'Présentation, includes, routing manuel, PDO — quand rester en natif (petits projets, legacy).' },
      { title: 'Laravel', body: 'MVC, Eloquent ORM, migrations, Blade, API Resources, Sanctum/Passport auth.' },
      { title: 'Symfony', body: 'Architecture bundles, services, Doctrine ORM, API Platform, composants réutilisables.' },
    ],
    ['Laravel', 'Symfony', 'PHP.net'],
    {
      debutant: ['Différence natif vs framework', 'Route Laravel ou Symfony', 'Modèle Eloquent/Entity basique'],
      intermediaire: ['CRUD complet framework', 'Migration BDD versionnée', 'API REST exposée'],
      professionnel: ['Auth sécurisée implémentée', 'Services/DI compris', 'Choix Laravel vs Symfony argumenté'],
    }),

  mod(19, 'sgbd-relationnels', 'Bases de données relationnelles', '🗄️',
    ['postgresql', 'mysql', 'mariadb', 'sqlite', 'sql'],
    'PostgreSQL, MySQL, MariaDB et SQLite — choisir le SGBD adapté au projet sans confondre usages.',
    [
      { title: 'PostgreSQL', body: 'Robuste, JSONB, extensions, ACID, idéal apps web modernes et données complexes.' },
      { title: 'MySQL', body: 'Très répandu, LAMP, hébergement mutualisé, performances lecture, écosystème large.' },
      { title: 'MariaDB', body: 'Fork MySQL open source, compatible, choix hébergeurs européens.' },
      { title: 'SQLite', body: 'Fichier embarqué, zéro config, mobile, prototypes, tests — pas pour forte concurrence écriture.' },
    ],
    ['PostgreSQL', 'MySQL', 'DBeaver'],
    {
      debutant: ['Différences SGBD listées', 'Connexion à 2 SGBD testée', 'Schéma simple créé'],
      intermediaire: ['Choix SGBD justifié pour projet', 'Migrations appliquées', 'Index et contraintes FK'],
      professionnel: ['Comparatif perf/coût documenté', 'Backup/restauration testée', 'Stratégie réplication ou HA esquissée'],
    }),

  mod(20, 'nosql', 'NoSQL', '🍃',
    ['mongodb', 'redis', 'nosql', 'cache', 'document'],
    'MongoDB et Redis complètent le relationnel — savoir quand les utiliser et quand les éviter.',
    [
      { title: 'MongoDB', body: 'Documents JSON, schéma flexible, agrégations — catalogues, logs, contenu variable.' },
      { title: 'Redis', body: 'Clé-valeur en mémoire — cache, sessions, rate limiting, pub/sub, classements.' },
      { title: 'Quand utiliser', body: 'Données non tabulaires, scale horizontal document, cache haute perf.' },
      { title: 'Quand éviter', body: 'Transactions complexes multi-tables, reporting SQL, équipe sans expérience ops NoSQL.' },
    ],
    ['MongoDB', 'Redis', 'PostgreSQL'],
    {
      debutant: ['SQL vs NoSQL distingués', 'Document MongoDB inséré/lu', 'Set/Get Redis testé'],
      intermediaire: ['Cache Redis sur API', 'Modèle document justifié', 'TTL et invalidation cache'],
      professionnel: ['Architecture polyglotte documentée', 'Persistance Redis configurée si besoin', 'Trade-offs expliqués au client'],
    }),

  mod(21, 'authentification', 'Authentification', '🔐',
    ['auth', 'jwt', 'oauth', 'session', 'cookie'],
    'Sessions, JWT, OAuth2 et OpenID Connect — sécuriser l\'accès sans exposer les utilisateurs.',
    [
      { title: 'Sessions & cookies', body: 'Session serveur, cookie HttpOnly/Secure/SameSite, expiration, CSRF protection.' },
      { title: 'JWT', body: 'Token stateless, header Authorization Bearer, refresh tokens, expiration courte.' },
      { title: 'OAuth2', body: 'Délégation d\'accès — authorization code flow, client credentials, scopes.' },
      { title: 'OpenID Connect', body: 'Identité sur OAuth2 — id_token, login social (Google, GitHub).' },
    ],
    ['OAuth2', 'JWT', 'Postman'],
    {
      debutant: ['Login/logout session fonctionnel', 'Cookie sécurisé configuré', 'Mot de passe hashé (bcrypt/argon2)'],
      intermediaire: ['JWT émis et vérifié', 'Refresh token implémenté', 'OAuth2 login social testé'],
      professionnel: ['OWASP auth appliquée', 'Rotation secrets', 'Audit flux auth documenté'],
    }),

  mod(22, 'tests-web', 'Tests', '🧪',
    ['tests', 'jest', 'playwright', 'postman', 'qa'],
    'Pyramide de tests — unitaires, API, E2E et charge — pour livrer du web fiable.',
    [
      { title: 'Tests unitaires', body: 'Jest, Vitest, PHPUnit — isoler une fonction/composant avec mocks.' },
      { title: 'Tests API', body: 'Postman, Insomnia, Supertest — endpoints, codes HTTP, payloads, auth.' },
      { title: 'Tests E2E', body: 'Playwright, Cypress — parcours utilisateur complets dans le navigateur.' },
      { title: 'Tests de charge', body: 'K6, JMeter — montée en charge, p95, seuils, goulots.' },
    ],
    ['Jest', 'Playwright', 'Postman', 'K6'],
    {
      debutant: ['5 tests unitaires écrits', 'Collection Postman API', '1 scénario E2E basique'],
      intermediaire: ['Couverture > 60 % module critique', 'CI exécute tests', 'Test charge smoke K6'],
      professionnel: ['Pyramide tests documentée', 'E2E parcours critiques', 'Flaky tests éliminés'],
    }),

  mod(23, 'qa-assurance', 'QA', '✅',
    ['qa', 'qualité', 'regression', 'uat', 'recette'],
    'L\'assurance qualité structure la validation avant mise en production et limite les régressions.',
    [
      { title: 'Assurance qualité', body: 'Processus, rôles, critères de sortie, traçabilité bugs, Definition of Done.' },
      { title: 'Régression', body: 'Rejouer tests existants après changement — suite automatisée + checklist manuelle.' },
      { title: 'Smoke test', body: 'Vérification rapide post-deploy — login, page clé, API health.' },
      { title: 'UAT', body: 'User Acceptance Testing — validation métier par le client sur environnement staging.' },
    ],
    ['Jira', 'Postman', 'Playwright'],
    {
      debutant: ['Checklist recette rédigée', 'Bug report structuré', 'Smoke test post-deploy'],
      intermediaire: ['Plan de tests régression', 'UAT planifiée avec client', 'Critères sortie release définis'],
      professionnel: ['Métriques qualité suivies', 'Zero bug bloquant en prod', 'Amélioration continue QA'],
    }),

  mod(24, 'securite-web', 'Sécurité Web', '🛡️',
    ['securite', 'owasp', 'xss', 'csrf', 'injection'],
    'OWASP Top 10, XSS, CSRF, injection SQL — sécuriser le web dès la conception.',
    [
      { title: 'OWASP Top 10', body: 'Broken Access Control, Cryptographic Failures, Injection, SSRF, etc. — priorités 2021+.' },
      { title: 'XSS & CSRF', body: 'Échappement sorties, CSP, tokens CSRF, SameSite cookies.' },
      { title: 'SQL Injection', body: 'Requêtes préparées, ORM, validation entrées, moindre privilège BDD.' },
      { title: 'Authentification sécurisée', body: 'Hash mots de passe, rate limiting, MFA, gestion sessions.' },
    ],
    ['OWASP ZAP', 'Lighthouse', 'Postman'],
    {
      debutant: ['OWASP Top 10 parcouru', 'Requêtes préparées partout', 'Headers sécurité basiques'],
      intermediaire: ['Scan ZAP sans alerte critique', 'CSRF protégé', 'Validation serveur systématique'],
      professionnel: ['Threat modeling léger', 'Plan correction vulnérabilités', 'Audit sécurité documenté'],
    }),

  mod(25, 'seo', 'SEO', '🔍',
    ['seo', 'meta', 'sitemap', 'lighthouse', 'referencement'],
    'Référencement naturel — balises, structure, performance et indexation pour être visible.',
    [
      { title: 'Balises Meta', body: 'title, description, Open Graph, canonical, hreflang si multilingue.' },
      { title: 'Sitemap & robots.txt', body: 'sitemap.xml, priorité pages, disallow zones admin, Search Console.' },
      { title: 'Performance SEO', body: 'Core Web Vitals, mobile-first, contenu structuré (H1–H6), données structurées JSON-LD.' },
    ],
    ['Lighthouse', 'Google Search Console', 'MDN HTML'],
    {
      debutant: ['Title/description uniques', 'H1 par page', 'robots.txt et sitemap.xml'],
      intermediaire: ['Search Console configurée', 'Audit Lighthouse SEO > 90', 'URLs propres et canonical'],
      professionnel: ['Stratégie mots-clés', 'Schema.org implémenté', 'Suivi positions et corrections'],
    }),

  mod(26, 'performance-web', 'Performance Web', '⚡',
    ['performance', 'lcp', 'lazy loading', 'cache', 'web vitals'],
    'Core Web Vitals et optimisations — images, lazy loading, cache — pour une expérience fluide.',
    [
      { title: 'Core Web Vitals', body: 'LCP, INP, CLS — seuils Google, mesure field vs lab.' },
      { title: 'Optimisation images', body: 'WebP/AVIF, srcset, dimensions explicites, compression.' },
      { title: 'Lazy Loading', body: 'loading="lazy", Intersection Observer, code splitting JS.' },
      { title: 'Cache', body: 'Cache-Control, CDN, service worker, cache API Redis.' },
    ],
    ['Lighthouse', 'Chrome DevTools', 'Vercel'],
    {
      debutant: ['Images compressées', 'Lazy load images below fold', 'Audit Lighthouse perf'],
      intermediaire: ['LCP < 2.5s cible', 'Bundle JS analysé', 'Cache headers configurés'],
      professionnel: ['Budget perf défini en CI', 'CDN ou cache edge', 'Monitoring Web Vitals prod'],
    }),

  mod(27, 'devops-debutant', 'DevOps débutant', '🐳',
    ['docker', 'devops', 'compose', 'env', 'logs'],
    'Docker, variables d\'environnement et logs — environnements reproductibles pour le web.',
    [
      { title: 'Docker', body: 'Images, conteneurs, Dockerfile, volumes, réseaux — isoler app + BDD.' },
      { title: 'Docker Compose', body: 'multi-services : web, db, redis — docker-compose up pour dev local.' },
      { title: 'Variables d\'environnement', body: '.env, secrets hors Git, 12-factor app, config par environnement.' },
      { title: 'Logs', body: 'stdout/stderr, agrégation, niveaux log, corrélation requêtes.' },
    ],
    ['Docker', 'GitHub', 'Notion'],
    {
      debutant: ['Dockerfile fonctionnel', 'docker-compose up local', '.env.example sans secrets'],
      intermediaire: ['App containerisée + BDD', 'Volumes persistants', 'Logs consultables'],
      professionnel: ['Multi-stage build', 'Healthchecks', 'Documentation run local en 1 commande'],
    }),

  mod(28, 'cicd', 'CI/CD', '🔄',
    ['cicd', 'github actions', 'pipeline', 'deploy', 'automated'],
    'GitHub Actions automatise build, tests et déploiement à chaque changement de code.',
    [
      { title: 'GitHub Actions', body: 'Workflows YAML, triggers push/PR, jobs, steps, secrets, artifacts.' },
      { title: 'Build', body: 'Install deps, lint, compile, build assets — échouer tôt si erreur.' },
      { title: 'Tests automatisés', body: 'Unit + API + E2E dans le pipeline — gate avant merge.' },
      { title: 'Déploiement automatique', body: 'Deploy staging on merge main, prod manual approval, rollback.' },
    ],
    ['GitHub Actions', 'Docker', 'Vercel'],
    {
      debutant: ['Workflow CI basique (lint/test)', 'Pipeline sur push', 'Badge status README'],
      intermediaire: ['Tests bloquent merge', 'Deploy staging auto', 'Secrets GitHub configurés'],
      professionnel: ['Pipeline complet build→test→deploy', 'Rollback documenté', 'Review required + branch protection'],
    }),

  mod(29, 'hebergement', 'Hébergement', '☁️',
    ['hebergement', 'vps', 'cloud', 'aws', 'mutualise'],
    'VPS, mutualisé ou cloud — choisir l\'hébergement selon budget, compétences et scalabilité.',
    [
      { title: 'VPS', body: 'Ubuntu/Debian, root, Nginx, SSL, coût fixe, admin sys requise.' },
      { title: 'Mutualisé', body: 'Avantages : simple, pas cher. Inconvénients : limites, voisins, moins de contrôle.' },
      { title: 'Cloud', body: 'AWS, Azure, GCP — elasticité, pay-as-you-go, IAM, responsabilité partagée.' },
    ],
    ['AWS', 'OVH', 'Vercel'],
    {
      debutant: ['Différences hébergements listées', 'Site déployé (PaaS ou mutualisé)', 'HTTPS actif'],
      intermediaire: ['VPS provisionné', 'DNS configuré', 'Backup hébergement planifié'],
      professionnel: ['Comparatif coût/ops documenté', 'Architecture cloud esquissée', 'Plan disaster recovery'],
    }),

  mod(30, 'monitoring', 'Monitoring', '📈',
    ['monitoring', 'logs', 'sentry', 'grafana', 'prometheus'],
    'Logs, erreurs et métriques — observer la production pour réagir avant les utilisateurs.',
    [
      { title: 'Logs', body: 'Centralisation, niveaux, rotation, corrélation request-id, ELK/Loki.' },
      { title: 'Sentry', body: 'Error tracking front/back, releases, breadcrumbs, alertes Slack/email.' },
      { title: 'Grafana & Prometheus', body: 'Métriques HTTP, CPU, RAM, dashboards, alerting rules.' },
    ],
    ['Sentry', 'Grafana', 'Prometheus'],
    {
      debutant: ['Logs applicatifs structurés', 'Sentry ou équivalent configuré', 'Alerte email erreur 500'],
      intermediaire: ['Dashboard uptime/latence', 'Health endpoint /health', 'Runbook incident basique'],
      professionnel: ['SLI/SLO définis', 'Alerting sans fatigue', 'Post-mortem après incident'],
    }),

  mod(31, 'projet-fil-rouge', 'Projet fil rouge', '🎯',
    ['projet', 'fil rouge', 'marketplace', 'e-learning', 'portfolio'],
    'Projet DWWM complet — de l\'analyse au monitoring — pour valoriser le titre en portfolio.',
    [
      { title: 'Cas projet', body: 'Marketplace, gestion de rendez-vous ou plateforme e-learning — périmètre MVP réaliste.' },
      { title: 'Parcours complet', body: 'Analyse → Personas → Benchmark → Maquettes → Front → Back → BDD → Tests → Sécurité → Deploy → Monitoring.' },
      { title: 'Livrables titre', body: 'Dossier projet, code GitHub, site en ligne, présentation oral, documentation technique.' },
    ],
    ['GitHub', 'Figma', 'Docker', 'Playwright'],
    {
      debutant: ['Sujet projet choisi et validé', 'Repo GitHub créé', 'Analyse + 2 personas rédigés'],
      intermediaire: ['Maquettes + MVP front/back', 'BDD + API CRUD', 'Tests + déploiement staging'],
      professionnel: ['Projet en ligne HTTPS', 'Dossier complet DWWM', 'Présentation 20 min préparée', 'Monitoring actif'],
    }),
];
