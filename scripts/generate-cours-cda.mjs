#!/usr/bin/env node
/**
 * Générateur de l'architecture pédagogique CDA — Phase 1
 * Crée les 22 modules avec structure standard et contenu initial.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { generateCoursHtml } from './cours-html.mjs';

const ROOT = join(import.meta.dirname, '..', 'cours-cda');

const MODULES = [
  {
    id: '00',
    slug: '00-introduction-metier',
    title: 'Découverte du métier',
    subtitle: 'Comprendre l\'écosystème du développement logiciel',
    duration: '20h',
    level: 'Débutant',
    prerequisites: ['Aucun prérequis technique'],
    objectives: [
      'Identifier les rôles clés d\'une équipe de développement',
      'Distinguer frontend, backend, fullstack, DevOps et QA',
      'Comprendre le cycle de vie d\'un logiciel',
      'Rédiger une fiche métier et une roadmap personnelle',
      'Définir des objectifs professionnels réalistes',
    ],
    chapters: [
      'Qu\'est-ce que le développement logiciel ?',
      'Le développeur frontend',
      'Le développeur backend',
      'Le développeur fullstack',
      'Le DevOps engineer',
      'Le QA / testeur',
      'L\'architecte logiciel',
      'Le Product Owner et le Scrum Master',
      'Le chef de projet IT',
      'Construire sa roadmap de carrière',
    ],
    intro: {
      why: 'Avant d\'apprendre à coder, il faut comprendre le métier, ses acteurs et ses enjeux. Sans cette vision, on risque de devenir un exécutant technique sans perspective de carrière.',
      where: 'Dans toute entreprise qui produit du logiciel : startups, ESN, grands groupes, administrations, freelancing.',
      problems: 'Évite le syndrome du « je sais coder mais je ne sais pas où aller », les choix de spécialisation hasardeux et la méconnaissance des attentes du marché.',
    },
    tps: [
      { id: 'tp-01', title: 'Fiche métier', level: 'Débutant', duration: '2h', description: 'Rédiger une fiche métier complète pour le rôle de votre choix (frontend, backend, DevOps...).' },
      { id: 'tp-02', title: 'Roadmap personnelle', level: 'Intermédiaire', duration: '3h', description: 'Créer une roadmap de compétences sur 12 mois avec jalons mensuels.' },
      { id: 'tp-03', title: 'Objectifs professionnels', level: 'Avancé', duration: '2h', description: 'Définir 3 objectifs SMART et un plan d\'action pour les atteindre.' },
    ],
  },
  {
    id: '01',
    slug: '01-analyse-conception',
    title: 'Analyse et conception',
    subtitle: 'Le module le plus important — 80 % des problèmes viennent d\'une mauvaise conception',
    duration: '60h',
    level: 'Débutant à Intermédiaire',
    prerequisites: ['Module 00'],
    objectives: [
      'Recueillir et formaliser un besoin client',
      'Rédiger un cahier des charges structuré',
      'Rédiger des User Stories au format standard',
      'Modéliser avec UML (cas d\'utilisation, classe, séquence, activité, état)',
      'Concevoir une base de données (MERISE : MCD, MLD, MPD)',
      'Réaliser des maquettes avec Figma ou Penpot',
    ],
    chapters: [
      'Recueil du besoin : client, utilisateur, problème, solution',
      'Le cahier des charges',
      'Les User Stories',
      'UML — Diagrammes de cas d\'utilisation',
      'UML — Diagrammes de classes',
      'UML — Diagrammes de séquence',
      'UML — Diagrammes d\'activité et d\'état',
      'MERISE et modélisation de données',
      'Du MCD au MPD',
      'Maquettage UI/UX avec Figma',
    ],
    intro: {
      why: 'Une bonne conception évite des mois de développement inutile. C\'est la fondation de tout projet logiciel professionnel.',
      where: 'En amont de tout projet : avant le premier commit, avant la première ligne de code.',
      problems: 'Résout les allers-retours infinis avec le client, les fonctionnalités oubliées, les incohérences de données et les dettes techniques structurelles.',
    },
    tps: [
      { id: 'tp-01', title: 'Cahier des charges complet', level: 'Intermédiaire', duration: '6h', description: 'Rédiger le CDC d\'une application de gestion de tâches.' },
      { id: 'tp-02', title: 'Modélisation UML + MERISE', level: 'Avancé', duration: '8h', description: 'Modéliser un système de réservation en ligne (UML + MCD/MLD/MPD).' },
      { id: 'tp-03', title: 'Maquettes Figma', level: 'Intermédiaire', duration: '5h', description: 'Créer les maquettes desktop et mobile d\'une marketplace.' },
    ],
  },
  {
    id: '02',
    slug: '02-gestion-projet',
    title: 'Gestion de projet',
    subtitle: 'Cycle en V, Agile, Scrum, Kanban et estimation',
    duration: '40h',
    level: 'Débutant à Intermédiaire',
    prerequisites: ['Module 01'],
    objectives: [
      'Comprendre le cycle en V et ses phases',
      'Appliquer Scrum, Kanban et Lean',
      'Utiliser Jira pour gérer Epics, Stories, Tasks et Bugs',
      'Estimer avec Planning Poker, Story Points et T-Shirt Size',
      'Répartir un budget temps réaliste sur un projet de 100h',
    ],
    chapters: [
      'Introduction à la gestion de projet IT',
      'Le cycle en V',
      'Les méthodes Agile',
      'Scrum en profondeur',
      'Kanban et flux continu',
      'Lean et élimination des gaspillages',
      'Jira : Epics, Stories, Tasks, Bugs',
      'Estimation : Planning Poker et Story Points',
      'Répartition temps réel d\'un projet',
      'Rétrospective et amélioration continue',
    ],
    intro: {
      why: 'Un développeur professionnel travaille en équipe sur des projets contraints par le temps et le budget.',
      where: 'Dans toute équipe de développement, du startup de 3 personnes au grand compte.',
      problems: 'Évite les dépassements de délais, les priorités floues et la surcharge des développeurs.',
    },
    tps: [
      { id: 'tp-01', title: 'Backlog Scrum', level: 'Débutant', duration: '3h', description: 'Créer un backlog complet avec Epics et User Stories pour un projet e-commerce.' },
      { id: 'tp-02', title: 'Tableau Kanban', level: 'Intermédiaire', duration: '2h', description: 'Configurer un flux Kanban avec WIP limits et métriques.' },
      { id: 'tp-03', title: 'Planning 100h', level: 'Avancé', duration: '4h', description: 'Répartir 100h sur analyse, conception, dev, tests, doc et déploiement.' },
    ],
  },
  {
    id: '03',
    slug: '03-git-github',
    title: 'Git, GitHub et GitLab',
    subtitle: 'Versionning, branching et collaboration en équipe',
    duration: '30h',
    level: 'Débutant à Avancé',
    prerequisites: ['Module 00'],
    objectives: [
      'Comprendre pourquoi Git existe et quels problèmes il résout',
      'Maîtriser les commandes Git essentielles',
      'Appliquer Git Flow, GitHub Flow et Trunk Based Development',
      'Créer et gérer des Pull Requests et Merge Requests',
      'Effectuer des code reviews et résoudre les conflits',
    ],
    chapters: [
      'Pourquoi Git ? Histoire et problèmes résolus',
      'Installation et configuration',
      'Commits, branches et merges',
      'Git Flow',
      'GitHub Flow',
      'Trunk Based Development',
      'Pull Requests et code review',
      'Résolution de conflits',
      'GitLab CI et intégration',
      'Bonnes pratiques en équipe',
    ],
    intro: {
      why: 'Git est le standard universel de gestion de versions. Aucune entreprise ne recrute sans cette compétence.',
      where: 'À chaque ligne de code écrite, dans chaque pipeline CI/CD, sur chaque Pull Request.',
      problems: 'Résout la perte de code, les versions concurrentes, le travail en parallèle et la traçabilité des modifications.',
    },
    tps: [
      { id: 'tp-01', title: 'Workflow collaboratif', level: 'Intermédiaire', duration: '4h', description: 'Simuler un projet à 3 développeurs avec branches, PR et reviews.' },
      { id: 'tp-02', title: 'Résolution de conflits', level: 'Avancé', duration: '3h', description: 'Résoudre 5 scénarios de conflits Git complexes.' },
      { id: 'tp-03', title: 'Git Flow complet', level: 'Expert', duration: '5h', description: 'Mettre en place Git Flow sur un projet avec releases et hotfixes.' },
    ],
  },
  {
    id: '04',
    slug: '04-html-css',
    title: 'HTML5 et CSS3',
    subtitle: 'Structure sémantique, accessibilité, responsive et animations',
    duration: '50h',
    level: 'Débutant à Avancé',
    prerequisites: ['Module 00'],
    objectives: [
      'Structurer une page avec header, main, aside, footer',
      'Appliquer les normes WCAG et ARIA pour l\'accessibilité',
      'Optimiser le SEO technique',
      'Créer des layouts responsive (Mobile First)',
      'Maîtriser Flexbox et CSS Grid',
      'Réaliser des animations avec transitions et keyframes',
    ],
    chapters: [
      'Introduction au HTML5 sémantique',
      'Structure : header, main, aside, footer',
      'Formulaires et validation HTML5',
      'Accessibilité WCAG et ARIA',
      'SEO technique',
      'CSS fondamentaux et cascade',
      'Flexbox — cours complet',
      'CSS Grid — cours complet',
      'Responsive et Mobile First',
      'Animations, transitions et keyframes',
    ],
    intro: {
      why: 'HTML et CSS sont la base de tout le web. Aucune application web ne peut exister sans eux.',
      where: 'Dans chaque page web, chaque email, chaque interface utilisateur.',
      problems: 'Résout la structuration du contenu, l\'affichage multi-écrans et l\'accessibilité pour tous les utilisateurs.',
    },
    tps: [
      { id: 'tp-01', title: 'Landing page accessible', level: 'Débutant', duration: '4h', description: 'Créer une landing page responsive et accessible WCAG AA.' },
      { id: 'tp-02', title: 'Dashboard CSS Grid', level: 'Intermédiaire', duration: '6h', description: 'Construire un dashboard admin avec Grid et Flexbox.' },
      { id: 'tp-03', title: 'Portfolio animé', level: 'Avancé', duration: '8h', description: 'Portfolio personnel avec animations CSS avancées.' },
    ],
  },
  {
    id: '05',
    slug: '05-javascript',
    title: 'JavaScript ES2024',
    subtitle: 'Fondamentaux, programmation avancée et architecture',
    duration: '60h',
    level: 'Débutant à Avancé',
    prerequisites: ['Module 04'],
    objectives: [
      'Maîtriser variables, conditions, boucles et fonctions',
      'Comprendre closures, promises et async/await',
      'Utiliser les modules ES6+',
      'Appliquer les patterns MVC, Services et Repositories',
      'Manipuler le DOM et les événements',
    ],
    chapters: [
      'Variables, types et opérateurs',
      'Conditions et boucles',
      'Fonctions et portée',
      'Objets, tableaux et destructuring',
      'Closures et scope',
      'Promises et async/await',
      'Modules ES6+',
      'DOM et événements',
      'Fetch API et consommation REST',
      'Architecture MVC, Services et Repositories',
    ],
    intro: {
      why: 'JavaScript est le langage le plus utilisé au monde. Il anime le web, le mobile et le backend.',
      where: 'Frontend (React, Vue), backend (Node.js), mobile (React Native), desktop (Electron).',
      problems: 'Résout l\'interactivité web, la communication client-serveur et la logique métier côté client.',
    },
    tps: [
      { id: 'tp-01', title: 'Todo List vanilla JS', level: 'Débutant', duration: '4h', description: 'Application Todo avec localStorage et architecture MVC.' },
      { id: 'tp-02', title: 'API Client', level: 'Intermédiaire', duration: '6h', description: 'Client REST consommant une API publique avec gestion d\'erreurs.' },
      { id: 'tp-03', title: 'Mini-framework MVC', level: 'Avancé', duration: '10h', description: 'Implémenter un mini-framework MVC from scratch.' },
    ],
  },
  {
    id: '06',
    slug: '06-bases-donnees',
    title: 'Bases de données',
    subtitle: 'Modélisation, SQL, PostgreSQL et optimisation',
    duration: '40h',
    level: 'Intermédiaire',
    prerequisites: ['Module 01', 'Module 05'],
    objectives: [
      'Concevoir un schéma relationnel normalisé',
      'Écrire des requêtes SQL complexes (jointures, sous-requêtes)',
      'Utiliser PostgreSQL en production',
      'Gérer les transactions et l\'intégrité référentielle',
      'Optimiser avec index et EXPLAIN ANALYZE',
    ],
    chapters: [
      'Introduction aux bases de données relationnelles',
      'Modélisation et normalisation',
      'SQL : CRUD et filtres',
      'Jointures et agrégations',
      'Sous-requêtes et CTE',
      'Transactions et ACID',
      'PostgreSQL : types, extensions, JSONB',
      'Index et optimisation',
      'Migrations et versioning de schéma',
      'NoSQL : introduction et cas d\'usage',
    ],
    intro: {
      why: 'Les données sont le cœur de toute application. Sans base de données, pas de persistance, pas de métier.',
      where: 'Backend, analytics, data engineering, administration système.',
      problems: 'Résout le stockage structuré, les requêtes complexes et la cohérence des données.',
    },
    tps: [
      { id: 'tp-01', title: 'Schéma e-commerce', level: 'Intermédiaire', duration: '5h', description: 'Concevoir et implémenter le schéma PostgreSQL d\'un e-commerce.' },
      { id: 'tp-02', title: 'Requêtes analytiques', level: 'Avancé', duration: '4h', description: 'Écrire 15 requêtes SQL analytiques sur un jeu de données réel.' },
      { id: 'tp-03', title: 'Optimisation performance', level: 'Expert', duration: '6h', description: 'Diagnostiquer et optimiser des requêtes lentes avec EXPLAIN.' },
    ],
  },
  {
    id: '07',
    slug: '07-backend-php',
    title: 'Backend PHP moderne',
    subtitle: 'PHP 8+, architecture MVC et Laravel',
    duration: '50h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 05', 'Module 06'],
    objectives: [
      'Programmer en PHP 8+ avec typage strict',
      'Appliquer l\'architecture MVC, Services, Repository et DTO',
      'Créer des middlewares et gérer l\'authentification',
      'Développer une API REST avec Laravel',
      'Réaliser un projet complet Laravel',
    ],
    chapters: [
      'PHP 8+ : syntaxe moderne et typage',
      'POO avancée en PHP',
      'Architecture MVC',
      'Services et Repository pattern',
      'DTO et validation',
      'Middleware et pipeline HTTP',
      'Introduction à Laravel',
      'Eloquent ORM et migrations',
      'API REST avec Laravel',
      'Projet Laravel complet',
    ],
    intro: {
      why: 'PHP alimente 77 % du web (WordPress, Symfony, Laravel). Compétence indispensable sur le marché français.',
      where: 'CMS, e-commerce, APIs REST, applications métier.',
      problems: 'Résout la logique serveur, la persistance et l\'exposition d\'APIs.',
    },
    tps: [
      { id: 'tp-01', title: 'API REST PHP vanilla', level: 'Intermédiaire', duration: '6h', description: 'API REST avec architecture MVC sans framework.' },
      { id: 'tp-02', title: 'CRUD Laravel', level: 'Intermédiaire', duration: '8h', description: 'Application CRUD complète avec Laravel et Eloquent.' },
      { id: 'tp-03', title: 'Système d\'authentification', level: 'Avancé', duration: '10h', description: 'Auth complète : register, login, JWT, RBAC avec Laravel.' },
    ],
  },
  {
    id: '08',
    slug: '08-backend-nodejs',
    title: 'Backend Node.js',
    subtitle: 'Express, authentification JWT et PostgreSQL',
    duration: '50h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 05', 'Module 06'],
    objectives: [
      'Créer une API REST avec Express',
      'Structurer en Routes, Controllers, Services, Repositories',
      'Implémenter JWT, Refresh Token et RBAC',
      'Interagir avec PostgreSQL (jointures, transactions, index)',
      'Optimiser les performances backend',
    ],
    chapters: [
      'Node.js et l\'écosystème npm',
      'Express : routes et middleware',
      'Architecture en couches',
      'Controllers et Services',
      'Repository pattern avec PostgreSQL',
      'Authentification JWT',
      'Refresh Token et sessions',
      'RBAC et autorisation',
      'Validation et gestion d\'erreurs',
      'Optimisation et bonnes pratiques',
    ],
    intro: {
      why: 'Node.js permet d\'utiliser JavaScript côté serveur, unifiant la stack technique fullstack.',
      where: 'APIs REST, microservices, temps réel (WebSocket), serverless.',
      problems: 'Résout la logique serveur JavaScript, la scalabilité I/O et le développement fullstack unifié.',
    },
    tps: [
      { id: 'tp-01', title: 'API REST Express', level: 'Intermédiaire', duration: '6h', description: 'API CRUD complète avec architecture en couches.' },
      { id: 'tp-02', title: 'Authentification JWT', level: 'Avancé', duration: '8h', description: 'Système auth complet : JWT, refresh, RBAC.' },
      { id: 'tp-03', title: 'API marketplace', level: 'Expert', duration: '15h', description: 'API REST marketplace avec paiement simulé et messagerie.' },
    ],
  },
  {
    id: '09',
    slug: '09-react',
    title: 'React',
    subtitle: 'Hooks, routing, state management et architecture',
    duration: '50h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 04', 'Module 05'],
    objectives: [
      'Maîtriser useState, useEffect, useMemo, useCallback',
      'Configurer React Router pour le routing',
      'Gérer l\'état avec Context, Redux et Zustand',
      'Structurer une application React scalable',
      'Tester des composants React',
    ],
    chapters: [
      'Introduction à React et JSX',
      'Composants et props',
      'useState et gestion d\'état local',
      'useEffect et effets de bord',
      'useMemo, useCallback et performance',
      'React Router v6',
      'Context API',
      'Redux Toolkit',
      'Zustand et alternatives',
      'Architecture et bonnes pratiques React',
    ],
    intro: {
      why: 'React est la bibliothèque frontend la plus demandée. Utilisée par Meta, Netflix, Airbnb.',
      where: 'SPAs, dashboards, applications web complexes, React Native.',
      problems: 'Résout la complexité des interfaces interactives et la gestion d\'état à grande échelle.',
    },
    tps: [
      { id: 'tp-01', title: 'Dashboard React', level: 'Intermédiaire', duration: '8h', description: 'Dashboard admin avec graphiques et tableaux de données.' },
      { id: 'tp-02', title: 'E-commerce frontend', level: 'Avancé', duration: '12h', description: 'Frontend e-commerce avec panier, auth et Redux.' },
      { id: 'tp-03', title: 'App multi-pages', level: 'Avancé', duration: '10h', description: 'Application complète avec routing, auth et API.' },
    ],
  },
  {
    id: '10',
    slug: '10-flutter',
    title: 'Flutter',
    subtitle: 'Développement mobile cross-platform',
    duration: '40h',
    level: 'Intermédiaire',
    prerequisites: ['Module 05'],
    objectives: [
      'Comprendre le modèle Widget de Flutter',
      'Gérer l\'état (setState, Provider, Riverpod)',
      'Implémenter la navigation multi-écrans',
      'Consommer des APIs REST',
      'Publier sur Android et iOS',
    ],
    chapters: [
      'Introduction à Flutter et Dart',
      'Widgets Stateless et Stateful',
      'Layouts et responsive',
      'State management',
      'Navigation et routing',
      'Consommation d\'API',
      'Stockage local',
      'Tests Flutter',
      'Publication Android',
      'Publication iOS',
    ],
    intro: {
      why: 'Flutter permet de développer pour Android et iOS avec une seule codebase.',
      where: 'Applications mobiles, desktop, web embarqué.',
      problems: 'Résout le coût du développement multi-plateforme et les performances natives.',
    },
    tps: [
      { id: 'tp-01', title: 'App météo', level: 'Débutant', duration: '5h', description: 'Application météo consommant une API publique.' },
      { id: 'tp-02', title: 'Todo mobile', level: 'Intermédiaire', duration: '6h', description: 'Todo list avec stockage local et navigation.' },
      { id: 'tp-03', title: 'App e-commerce mobile', level: 'Avancé', duration: '12h', description: 'Application e-commerce complète avec auth et panier.' },
    ],
  },
  {
    id: '11',
    slug: '11-react-native',
    title: 'React Native',
    subtitle: 'Mobile cross-platform avec React',
    duration: '40h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 05', 'Module 09'],
    objectives: [
      'Développer des applications mobiles avec React Native',
      'Configurer la navigation (React Navigation)',
      'Gérer l\'état avec Redux',
      'Consommer des APIs et gérer les notifications',
      'Publier sur les stores',
    ],
    chapters: [
      'Introduction à React Native',
      'Composants natifs vs web',
      'Styles et Flexbox mobile',
      'React Navigation',
      'Redux en mobile',
      'Consommation d\'API',
      'Notifications push',
      'Caméra et permissions',
      'Performance mobile',
      'Publication App Store et Play Store',
    ],
    intro: {
      why: 'React Native réutilise les compétences React pour le mobile, réduisant le temps d\'apprentissage.',
      where: 'Applications mobiles iOS et Android, apps métier.',
      problems: 'Résout le développement mobile rapide pour les équipes React existantes.',
    },
    tps: [
      { id: 'tp-01', title: 'App de notes', level: 'Intermédiaire', duration: '6h', description: 'Application de prise de notes avec stockage local.' },
      { id: 'tp-02', title: 'Chat mobile', level: 'Avancé', duration: '10h', description: 'Application de chat avec WebSocket et notifications.' },
      { id: 'tp-03', title: 'Clone Instagram simplifié', level: 'Expert', duration: '15h', description: 'Feed, stories et profil utilisateur.' },
    ],
  },
  {
    id: '12',
    slug: '12-tests',
    title: 'Tests logiciels',
    subtitle: 'Unitaires, API, E2E et couverture 80 %',
    duration: '35h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 05', 'Module 08'],
    objectives: [
      'Écrire des tests unitaires avec Jest et Vitest',
      'Tester des APIs avec Supertest',
      'Automatiser des tests E2E avec Playwright et Cypress',
      'Atteindre 80 % de couverture de code minimum',
      'Intégrer les tests dans le workflow de développement',
    ],
    chapters: [
      'Pourquoi tester ? Pyramide des tests',
      'Tests unitaires avec Jest',
      'Tests unitaires avec Vitest',
      'Mocks, stubs et spies',
      'Tests d\'intégration API avec Supertest',
      'Tests E2E avec Playwright',
      'Tests E2E avec Cypress',
      'Couverture de code et métriques',
      'TDD : Test-Driven Development',
      'Tests dans la CI/CD',
    ],
    intro: {
      why: 'Les tests sont souvent absents des formations mais indispensables en entreprise. Ils garantissent la qualité et la maintenabilité.',
      where: 'À chaque commit, dans chaque pipeline CI, avant chaque déploiement.',
      problems: 'Résout les régressions, la peur de refactorer et les bugs en production.',
    },
    tps: [
      { id: 'tp-01', title: 'Suite de tests unitaires', level: 'Intermédiaire', duration: '5h', description: '80 % de couverture sur une API Express existante.' },
      { id: 'tp-02', title: 'Tests API Supertest', level: 'Intermédiaire', duration: '4h', description: 'Tests d\'intégration complets pour une API REST.' },
      { id: 'tp-03', title: 'Tests E2E Playwright', level: 'Avancé', duration: '8h', description: 'Scénarios E2E pour un parcours utilisateur complet.' },
    ],
  },
  {
    id: '13',
    slug: '13-securite',
    title: 'Sécurité applicative',
    subtitle: 'OWASP Top 10, authentification et sécurité API',
    duration: '35h',
    level: 'Intermédiaire à Expert',
    prerequisites: ['Module 08', 'Module 06'],
    objectives: [
      'Maîtriser l\'OWASP Top 10 en détail',
      'Implémenter JWT, sessions, OAuth et 2FA',
      'Sécuriser une API (rate limit, helmet, validation)',
      'Prévenir les injections SQL et l\'escalade de privilèges',
      'Gérer les secrets de manière sécurisée',
    ],
    chapters: [
      'Introduction à la cybersécurité applicative',
      'OWASP Top 10 — vue d\'ensemble',
      'Injection et XSS',
      'Authentification cassée et gestion de session',
      'JWT, OAuth 2.0 et 2FA',
      'Sécurité API : rate limiting et helmet',
      'Validation et sanitization',
      'Injection SQL et ORM sécurisé',
      'Gestion des secrets et variables d\'environnement',
      'Audit de sécurité et pentest défensif',
    ],
    intro: {
      why: 'Une faille de sécurité peut détruire une entreprise. Le RGPD impose des obligations strictes.',
      where: 'Chaque ligne de code, chaque endpoint API, chaque formulaire.',
      problems: 'Résout les fuites de données, les accès non autorisés et les vulnérabilités OWASP.',
    },
    tps: [
      { id: 'tp-01', title: 'Audit OWASP', level: 'Avancé', duration: '6h', description: 'Auditer une application vulnérable et corriger les 10 failles OWASP.' },
      { id: 'tp-02', title: 'Auth sécurisée', level: 'Avancé', duration: '8h', description: 'Implémenter auth JWT + 2FA + rate limiting.' },
      { id: 'tp-03', title: 'API sécurisée', level: 'Expert', duration: '10h', description: 'Sécuriser une API complète : helmet, CORS, validation, RBAC.' },
    ],
  },
  {
    id: '14',
    slug: '14-devops',
    title: 'DevOps',
    subtitle: 'Linux, Docker, Nginx et reverse proxy',
    duration: '40h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 03', 'Module 08'],
    objectives: [
      'Maîtriser les commandes Linux essentielles',
      'Containeriser avec Docker (images, volumes, networks)',
      'Orchestrer avec Docker Compose',
      'Configurer Nginx et Traefik comme reverse proxy',
      'Automatiser le déploiement d\'infrastructure',
    ],
    chapters: [
      'Introduction au DevOps',
      'Linux : commandes essentielles',
      'Gestion des processus et services',
      'Docker : images et conteneurs',
      'Docker : volumes et networks',
      'Docker Compose multi-services',
      'Nginx : configuration et reverse proxy',
      'Traefik et routage dynamique',
      'Monitoring de base',
      'Infrastructure as Code — introduction',
    ],
    intro: {
      why: 'DevOps comble le fossé entre développement et exploitation. Compétence très recherchée.',
      where: 'Infrastructure cloud, déploiement, monitoring, automatisation.',
      problems: 'Résout les déploiements manuels, les environnements « ça marche chez moi » et la scalabilité.',
    },
    tps: [
      { id: 'tp-01', title: 'Stack Docker Compose', level: 'Intermédiaire', duration: '5h', description: 'Déployer une app fullstack avec PostgreSQL, API et frontend.' },
      { id: 'tp-02', title: 'Reverse proxy Nginx', level: 'Avancé', duration: '4h', description: 'Configurer Nginx avec SSL, cache et load balancing.' },
      { id: 'tp-03', title: 'Infrastructure complète', level: 'Expert', duration: '10h', description: 'Stack production : Docker, Nginx, PostgreSQL, monitoring.' },
    ],
  },
  {
    id: '15',
    slug: '15-cicd',
    title: 'CI/CD',
    subtitle: 'GitHub Actions et pipelines automatisés',
    duration: '25h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 03', 'Module 12', 'Module 14'],
    objectives: [
      'Comprendre les principes CI/CD',
      'Créer des pipelines GitHub Actions complets',
      'Automatiser lint, tests, build et deploy',
      'Gérer les environnements (dev, staging, prod)',
      'Implémenter le déploiement continu',
    ],
    chapters: [
      'Introduction CI/CD',
      'GitHub Actions : concepts',
      'Workflow : lint et formatage',
      'Workflow : tests automatisés',
      'Workflow : build et artifacts',
      'Workflow : déploiement',
      'Environnements et secrets',
      'Matrix builds et parallélisation',
      'Notifications et monitoring CI',
      'Bonnes pratiques CI/CD',
    ],
    intro: {
      why: 'La CI/CD automatise la qualité et le déploiement. Standard dans toute entreprise moderne.',
      where: 'À chaque push, merge request, release.',
      problems: 'Résout les déploiements manuels error-prone et les régressions non détectées.',
    },
    tps: [
      { id: 'tp-01', title: 'Pipeline lint + test', level: 'Intermédiaire', duration: '3h', description: 'Pipeline GitHub Actions avec ESLint et Jest.' },
      { id: 'tp-02', title: 'Pipeline complet', level: 'Avancé', duration: '6h', description: 'Push → Lint → Tests → Build → Deploy sur VPS.' },
      { id: 'tp-03', title: 'Multi-environnements', level: 'Expert', duration: '8h', description: 'CI/CD avec dev, staging et production automatisés.' },
    ],
  },
  {
    id: '16',
    slug: '16-monitoring',
    title: 'Monitoring et observabilité',
    subtitle: 'Logs, métriques, alertes et gestion d\'erreurs',
    duration: '25h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 14', 'Module 15'],
    objectives: [
      'Configurer des logs structurés avec Winston et Pino',
      'Mettre en place Grafana et Prometheus',
      'Configurer des alertes proactives',
      'Intégrer Sentry pour le suivi d\'erreurs',
      'Construire des dashboards de monitoring',
    ],
    chapters: [
      'Introduction à l\'observabilité',
      'Logs structurés avec Winston',
      'Logs haute performance avec Pino',
      'Métriques avec Prometheus',
      'Dashboards Grafana',
      'Alertes et seuils',
      'Sentry : suivi d\'erreurs',
      'Tracing distribué — introduction',
      'SLI, SLO et SLA',
      'Incident response',
    ],
    intro: {
      why: 'On ne peut pas améliorer ce qu\'on ne mesure pas. Le monitoring est vital en production.',
      where: 'Serveurs de production, APIs, applications critiques.',
      problems: 'Résout la détection proactive des pannes, le debugging en production et la conformité SLA.',
    },
    tps: [
      { id: 'tp-01', title: 'Stack de logs', level: 'Intermédiaire', duration: '4h', description: 'Configurer Pino + agrégation de logs.' },
      { id: 'tp-02', title: 'Dashboard Grafana', level: 'Avancé', duration: '5h', description: 'Dashboard Prometheus/Grafana pour une API Node.js.' },
      { id: 'tp-03', title: 'Alerting complet', level: 'Expert', duration: '6h', description: 'Alertes Sentry + Prometheus avec notifications Slack.' },
    ],
  },
  {
    id: '17',
    slug: '17-osint',
    title: 'OSINT défensif',
    subtitle: 'Recherche d\'informations et sécurité défensive',
    duration: '20h',
    level: 'Intermédiaire',
    prerequisites: ['Module 13'],
    objectives: [
      'Comprendre l\'OSINT dans une démarche défensive',
      'Utiliser Whois, DNS et énumération de sous-domaines',
      'Analyser l\'exposition avec Shodan',
      'Vérifier les security headers et fuites de données',
      'Produire un rapport d\'exposition',
    ],
    chapters: [
      'Introduction à l\'OSINT défensif',
      'Cadre légal et éthique',
      'Whois et registres DNS',
      'Énumération de sous-domaines',
      'Shodan et exposition des services',
      'Security Headers analysis',
      'Leak checkers et fuites de credentials',
      'Reconnaissance passive',
      'Rapport d\'audit OSINT',
      'Durcissement post-audit',
    ],
    intro: {
      why: 'Connaître son exposition permet de la réduire avant qu\'un attaquant ne l\'exploite.',
      where: 'Audits de sécurité, bug bounty, conformité, SOC.',
      problems: 'Résout la méconnaissance de sa surface d\'attaque et les fuites de données non détectées.',
    },
    tps: [
      { id: 'tp-01', title: 'Audit DNS', level: 'Intermédiaire', duration: '3h', description: 'Cartographier l\'infrastructure DNS d\'un domaine.' },
      { id: 'tp-02', title: 'Rapport Shodan', level: 'Avancé', duration: '4h', description: 'Analyser l\'exposition d\'un serveur avec Shodan.' },
      { id: 'tp-03', title: 'Audit OSINT complet', level: 'Expert', duration: '6h', description: 'Rapport d\'exposition complet avec recommandations.' },
    ],
  },
  {
    id: '18',
    slug: '18-deploiement',
    title: 'Déploiement',
    subtitle: 'Front, backend, VPS, SSL et automatisation',
    duration: '30h',
    level: 'Intermédiaire à Avancé',
    prerequisites: ['Module 14', 'Module 15'],
    objectives: [
      'Déployer un frontend sur Vercel, Netlify ou Cloudflare',
      'Déployer un backend sur VPS, Railway ou Render',
      'Configurer un serveur Linux (Ubuntu/Debian)',
      'Installer et renouveler SSL avec Let\'s Encrypt',
      'Automatiser le déploiement avec Coolify',
    ],
    chapters: [
      'Stratégies de déploiement',
      'Déploiement frontend : Vercel',
      'Déploiement frontend : Netlify et Cloudflare',
      'Déploiement backend : Railway et Render',
      'VPS : configuration Ubuntu',
      'Nginx et reverse proxy en production',
      'SSL avec Let\'s Encrypt',
      'Coolify : PaaS self-hosted',
      'Blue-green et rolling deployment',
      'Rollback et disaster recovery',
    ],
    intro: {
      why: 'Un logiciel non déployé n\'a aucune valeur. Le déploiement est l\'étape finale du cycle de vie.',
      where: 'Mise en production, staging, preview deployments.',
      problems: 'Résout la mise à disposition du logiciel aux utilisateurs finaux.',
    },
    tps: [
      { id: 'tp-01', title: 'Deploy frontend Vercel', level: 'Débutant', duration: '2h', description: 'Déployer une SPA React sur Vercel avec domaine custom.' },
      { id: 'tp-02', title: 'VPS complet', level: 'Avancé', duration: '8h', description: 'Configurer un VPS Ubuntu avec Nginx, SSL et API Node.js.' },
      { id: 'tp-03', title: 'Stack Coolify', level: 'Expert', duration: '6h', description: 'Déployer une stack fullstack avec Coolify et CI/CD.' },
    ],
  },
  {
    id: '19',
    slug: '19-projet-professionnel',
    title: 'Projet professionnel',
    subtitle: 'Marketplace type Elkoli — projet fil rouge complet',
    duration: '120h',
    level: 'Avancé à Expert',
    prerequisites: ['Modules 01 à 18'],
    objectives: [
      'Concevoir et développer une marketplace complète',
      'Implémenter auth, messagerie, paiement, notifications',
      'Créer dashboard utilisateur et administration',
      'Atteindre 80 % de couverture de tests',
      'Déployer avec CI/CD, Docker et sécurité OWASP',
    ],
    chapters: [
      'Cahier des charges marketplace',
      'Architecture technique',
      'Modélisation base de données',
      'API REST — authentification',
      'API REST — annonces et recherche',
      'API REST — messagerie temps réel',
      'API REST — paiement et notation',
      'Frontend React — catalogue et recherche',
      'Frontend React — dashboard et admin',
      'Tests, CI/CD, déploiement et documentation',
    ],
    intro: {
      why: 'Le projet professionnel valide l\'ensemble des compétences CDA dans un contexte réel.',
      where: 'Portfolio professionnel, soutenance titre, premier emploi.',
      problems: 'Prouve la capacité à mener un projet de A à Z en conditions professionnelles.',
    },
    tps: [
      { id: 'tp-01', title: 'Phase 1 — Conception', level: 'Avancé', duration: '20h', description: 'CDC, UML, MERISE, maquettes Figma de la marketplace.' },
      { id: 'tp-02', title: 'Phase 2 — Backend API', level: 'Expert', duration: '40h', description: 'API REST complète : auth, CRUD, messagerie, paiement, tests.' },
      { id: 'tp-03', title: 'Phase 3 — Frontend + Deploy', level: 'Expert', duration: '60h', description: 'Frontend React, tests E2E, CI/CD, Docker, déploiement production.' },
    ],
  },
  {
    id: '20',
    slug: '20-entrepreneuriat-dev',
    title: 'Entrepreneuriat développeur',
    subtitle: 'Créer et monétiser ses projets numériques',
    duration: '20h',
    level: 'Tous niveaux',
    prerequisites: ['Module 00'],
    objectives: [
      'Comprendre les modèles économiques du numérique',
      'Identifier une opportunité et valider un MVP',
      'Créer un business plan simplifié',
      'Connaître le statut auto-entrepreneur et SASU',
      'Monétiser via SaaS, freelance ou produits digitaux',
    ],
    chapters: [
      'L\'écosystème entrepreneurial tech',
      'Identifier une opportunité',
      'Validation et MVP',
      'Business model canvas',
      'Statuts juridiques (auto-entrepreneur, SASU, EURL)',
      'Freelancing et portage salarial',
      'SaaS et abonnements',
      'Marketing digital pour développeurs',
      'Pitch et recherche de financement',
      'Gestion financière simplifiée',
    ],
    intro: {
      why: 'Le développeur peut aussi être créateur d\'entreprise. L\'entrepreneuriat ouvre des perspectives uniques.',
      where: 'Freelance, startup, side project, SaaS.',
      problems: 'Résout la dépendance au salariat et permet de monétiser directement ses compétences.',
    },
    tps: [
      { id: 'tp-01', title: 'Business Model Canvas', level: 'Débutant', duration: '3h', description: 'Remplir un BMC pour un projet SaaS.' },
      { id: 'tp-02', title: 'MVP en 1 semaine', level: 'Intermédiaire', duration: '10h', description: 'Construire et lancer un MVP minimal.' },
      { id: 'tp-03', title: 'Pitch deck', level: 'Avancé', duration: '4h', description: 'Créer un pitch deck de 10 slides pour investisseurs.' },
    ],
  },
  {
    id: '21',
    slug: '21-preparation-titre-cda',
    title: 'Préparation au titre CDA',
    subtitle: 'Soutenance, portfolio et certification',
    duration: '30h',
    level: 'Expert',
    prerequisites: ['Module 19'],
    objectives: [
      'Préparer le dossier professionnel CDA',
      'Structurer la soutenance technique',
      'Présenter le projet professionnel',
      'Répondre aux questions du jury',
      'Constituer un portfolio professionnel',
    ],
    chapters: [
      'Le titre CDA : compétences évaluées',
      'Le dossier professionnel',
      'La soutenance : structure et timing',
      'Présentation du projet technique',
      'Démonstration live',
      'Questions fréquentes du jury',
      'Portfolio GitHub professionnel',
      'CV développeur efficace',
      'Simulation de soutenance',
      'Après le titre : insertion professionnelle',
    ],
    intro: {
      why: 'Le titre professionnel CDA est la certification qui valide 12 à 18 mois de formation intensive.',
      where: 'Soutenance devant jury, recherche d\'emploi, évolution de carrière.',
      problems: 'Structure la préparation pour maximiser les chances de réussite à l\'examen.',
    },
    tps: [
      { id: 'tp-01', title: 'Dossier professionnel', level: 'Avancé', duration: '8h', description: 'Rédiger le dossier professionnel complet.' },
      { id: 'tp-02', title: 'Simulation soutenance', level: 'Expert', duration: '4h', description: 'Simulation complète de soutenance avec feedback.' },
      { id: 'tp-03', title: 'Portfolio final', level: 'Avancé', duration: '6h', description: 'Portfolio GitHub, CV et profil LinkedIn optimisés.' },
    ],
  },
];

// ─── Générateurs de contenu ───────────────────────────────────────────────

function generateReadme(mod) {
  return `# Module ${mod.id} — ${mod.title}

> ${mod.subtitle}

## Informations

| Propriété | Valeur |
|-----------|--------|
| **Durée** | ${mod.duration} |
| **Niveau** | ${mod.level} |
| **Prérequis** | ${mod.prerequisites.join(', ')} |

## Objectifs pédagogiques

${mod.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}

## Chapitres (${mod.chapters.length})

${mod.chapters.map((c, i) => `${i + 1}. ${c}`).join('\n')}

## Structure du module

\`\`\`
${mod.slug}/
├── README.md          ← Ce fichier
├── cours.html         ← Cours complet (théorie + visualisations)
├── quiz.json          ← ${mod.chapters.length * 2}+ questions
├── exercices.json     ← Exercices par niveau
├── tp.json            ← Travaux pratiques
├── correction.json    ← Corrections détaillées
├── ressources.json    ← Ressources complémentaires
└── evaluation.json    ← Grille d'évaluation
\`\`\`

## Progression recommandée

1. Lire \`cours.html\` intégralement
2. Réaliser les exercices (débutant → expert)
3. Compléter les TP
4. Passer le quiz (seuil : 70 %)
5. Consulter les corrections si besoin
6. Évaluation finale

## Livrables attendus

${mod.tps.map(tp => `- **${tp.title}** (${tp.level}, ${tp.duration})`).join('\n')}
`;
}

function generateQuiz(mod) {
  const questions = [];
  const types = ['qcm', 'qcm', 'qcm', 'vrai_faux', 'ouverte'];

  mod.chapters.forEach((ch, ci) => {
    for (let q = 0; q < 2; q++) {
      const type = types[q % types.length];
      const id = `q-${String(ci * 2 + q + 1).padStart(2, '0')}`;
      questions.push({
        id,
        chapitre: ci + 1,
        type,
        question: type === 'vrai_faux'
          ? `Vrai ou Faux : Le chapitre « ${ch} » est un concept fondamental de ${mod.title}.`
          : `Question ${ci * 2 + q + 1} — ${ch} : Quelle affirmation est correcte ?`,
        options: type === 'qcm' ? [
          { id: 'a', text: `Réponse correcte liée à « ${ch} »` },
          { id: 'b', text: 'Réponse incorrecte — distracteur 1' },
          { id: 'c', text: 'Réponse incorrecte — distracteur 2' },
          { id: 'd', text: 'Réponse incorrecte — distracteur 3' },
        ] : type === 'vrai_faux' ? [
          { id: 'vrai', text: 'Vrai' },
          { id: 'faux', text: 'Faux' },
        ] : undefined,
        reponse: type === 'qcm' ? 'a' : type === 'vrai_faux' ? 'vrai' : null,
        explication: `Ce concept est détaillé dans le chapitre ${ci + 1} — ${ch}.`,
        points: type === 'ouverte' ? 3 : 1,
      });
    }
  });

  return {
    module: mod.slug,
    titre: mod.title,
    seuil_reussite: 70,
    duree_minutes: 30,
    nombre_questions: questions.length,
    questions,
  };
}

function generateExercices(mod) {
  const levels = ['debutant', 'intermediaire', 'avance', 'expert'];
  const levelLabels = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé', expert: 'Expert' };
  const exercices = [];

  levels.forEach((level, li) => {
    const count = level === 'expert' ? 1 : 2;
    for (let i = 0; i < count; i++) {
      exercices.push({
        id: `exo-${level}-${i + 1}`,
        niveau: level,
        titre: `Exercice ${levelLabels[level]} ${i + 1} — ${mod.title}`,
        enonce: `Mettre en pratique les concepts de ${mod.chapters[li % mod.chapters.length]} au niveau ${levelLabels[level]}.`,
        objectifs: [`Comprendre ${mod.chapters[li % mod.chapters.length]}`, `Appliquer en autonomie`],
        duree_estimee: `${(li + 1) * 30}min`,
        livrables: ['Code source ou document selon l\'exercice', 'Capture d\'écran du résultat'],
        indices: li > 0 ? [`Revoir le chapitre ${li + 1}`, 'Consulter les ressources.json'] : [],
      });
    }
  });

  return { module: mod.slug, exercices };
}

function generateTp(mod) {
  return {
    module: mod.slug,
    travaux_pratiques: mod.tps.map(tp => ({
      ...tp,
      objectifs: mod.objectives.slice(0, 3),
      etapes: [
        'Lire le chapitre théorique correspondant',
        'Analyser le cas réel proposé',
        'Implémenter la solution',
        'Tester et valider',
        'Documenter le résultat',
      ],
      criteres_evaluation: [
        'Fonctionnalité complète',
        'Qualité du code / document',
        'Respect des bonnes pratiques',
        'Documentation',
      ],
    })),
  };
}

function generateCorrections(mod) {
  const corrections = [];

  ['debutant', 'intermediaire', 'avance', 'expert'].forEach(level => {
    corrections.push({
      type: 'exercice',
      id: `exo-${level}-1`,
      correction: `Solution détaillée de l'exercice ${level} — à compléter lors de la rédaction.`,
      explications: [`Approche recommandée pour ${mod.title}`, 'Points d\'attention courants'],
    });
  });

  mod.tps.forEach(tp => {
    corrections.push({
      type: 'tp',
      id: tp.id,
      correction: `Correction complète du TP « ${tp.title} ».`,
      fichiers: [`solutions/${tp.id}/`],
      explications: ['Architecture de la solution', 'Choix techniques justifiés', 'Améliorations possibles'],
    });
  });

  return { module: mod.slug, corrections };
}

function generateRessources(mod) {
  return {
    module: mod.slug,
    documentation: [
      { titre: `Documentation officielle — ${mod.title}`, url: '#', type: 'officielle' },
      { titre: 'MDN Web Docs', url: 'https://developer.mozilla.org/fr/', type: 'reference' },
    ],
    videos: [
      { titre: `Introduction à ${mod.title}`, url: '#', duree: '15min', source: 'YouTube' },
    ],
    livres: [
      { titre: `Livre de référence — ${mod.title}`, auteur: 'À définir', isbn: null },
    ],
    outils: [
      { nom: 'VS Code', url: 'https://code.visualstudio.com/', usage: 'Éditeur de code' },
      { nom: 'Git', url: 'https://git-scm.com/', usage: 'Versionning' },
    ],
    communautes: [
      { nom: 'Stack Overflow', url: 'https://stackoverflow.com/', type: 'forum' },
      { nom: 'Dev.to', url: 'https://dev.to/', type: 'blog' },
    ],
  };
}

function generateEvaluation(mod) {
  return {
    module: mod.slug,
    titre: `Évaluation — ${mod.title}`,
    seuil_validation: 70,
    ponderation: {
      quiz: 30,
      exercices: 30,
      tp: 40,
    },
    grille: [
      { critere: 'Compréhension théorique', poids: 25, indicateurs: ['Réponses quiz > 70%', 'Capacité à expliquer les concepts'] },
      { critere: 'Mise en pratique', poids: 35, indicateurs: ['Exercices complétés', 'Qualité des livrables'] },
      { critere: 'Travaux pratiques', poids: 30, indicateurs: ['TP fonctionnels', 'Respect des critères', 'Documentation'] },
      { critere: 'Autonomie', poids: 10, indicateurs: ['Recherche de solutions', 'Gestion du temps'] },
    ],
    badges: [
      { id: `badge-${mod.id}-completion`, nom: `${mod.title} — Complété`, condition: 'Module terminé à 100%' },
      { id: `badge-${mod.id}-excellence`, nom: `${mod.title} — Excellence`, condition: 'Score global > 90%' },
    ],
    certification: {
      eligible: true,
      nom: `Certificat Module ${mod.id} — ${mod.title}`,
      seuil: 70,
    },
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎓 Génération de l\'architecture pédagogique CDA...\n');

  for (const mod of MODULES) {
    const dir = join(ROOT, mod.slug);
    await mkdir(dir, { recursive: true });

    const files = {
      'README.md': generateReadme(mod),
      'cours.html': generateCoursHtml(mod),
      'quiz.json': JSON.stringify(generateQuiz(mod), null, 2),
      'exercices.json': JSON.stringify(generateExercices(mod), null, 2),
      'tp.json': JSON.stringify(generateTp(mod), null, 2),
      'correction.json': JSON.stringify(generateCorrections(mod), null, 2),
      'ressources.json': JSON.stringify(generateRessources(mod), null, 2),
      'evaluation.json': JSON.stringify(generateEvaluation(mod), null, 2),
    };

    for (const [name, content] of Object.entries(files)) {
      await writeFile(join(dir, name), content, 'utf-8');
    }

    console.log(`  ✅ ${mod.slug}/ (${mod.chapters.length} chapitres, ${Object.keys(files).length} fichiers)`);
  }

  // Index global
  const index = {
    titre: 'Cursus CDA — Concepteur Développeur d\'Applications',
    version: '1.0.0',
    date_creation: new Date().toISOString().split('T')[0],
    nombre_modules: MODULES.length,
    duree_totale_estimee: '800h+',
    modules: MODULES.map(m => ({
      id: m.id,
      slug: m.slug,
      titre: m.title,
      duree: m.duration,
      niveau: m.level,
      chapitres: m.chapters.length,
      prerequis: m.prerequisites,
    })),
  };

  await writeFile(join(ROOT, 'index.json'), JSON.stringify(index, null, 2), 'utf-8');
  console.log(`\n📋 index.json généré`);

  const catalogJs = `/** Catalogue modules — généré depuis cours-cda/index.json */\nexport const MODULES_CATALOG = ${JSON.stringify(index.modules, null, 2)};\nexport const MODULES_META = ${JSON.stringify({ titre: index.titre, nombre_modules: index.nombre_modules, duree_totale_estimee: index.duree_totale_estimee }, null, 2)};\n`;
  await writeFile(join(dirname(ROOT), 'js', 'config', 'modules-catalog.js'), catalogJs, 'utf-8');
  console.log(`📦 modules-catalog.js généré`);
  console.log(`\n🎉 ${MODULES.length} modules créés dans cours-cda/`);
}

main().catch(console.error);
