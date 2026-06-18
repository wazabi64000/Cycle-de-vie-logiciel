# Cursus CDA — Concepteur Développeur d'Applications

LMS pédagogique complet pour former un apprenant de niveau débutant au niveau développeur professionnel.

## Vue d'ensemble

| Propriété | Valeur |
|-----------|--------|
| **Modules** | 22 |
| **Durée estimée** | 800h+ |
| **Niveau final** | Développeur professionnel |
| **Certification** | Titre professionnel CDA (RNCP) |

## Roadmap du cursus

```
Phase 1 — Fondations métier
├── 00 Découverte du métier
├── 01 Analyse et conception
└── 02 Gestion de projet

Phase 2 — Outils et versioning
└── 03 Git, GitHub, GitLab

Phase 3 — Développement web
├── 04 HTML5 et CSS3
├── 05 JavaScript ES2024
└── 06 Bases de données

Phase 4 — Backend
├── 07 Backend PHP (Laravel)
└── 08 Backend Node.js (Express)

Phase 5 — Frontend et mobile
├── 09 React
├── 10 Flutter
└── 11 React Native

Phase 6 — Qualité et sécurité
├── 12 Tests (Jest, Playwright)
└── 13 Sécurité (OWASP)

Phase 7 — DevOps et déploiement
├── 14 DevOps (Docker, Linux)
├── 15 CI/CD (GitHub Actions)
├── 16 Monitoring (Grafana, Sentry)
├── 17 OSINT défensif
└── 18 Déploiement

Phase 8 — Professionnalisation
├── 19 Projet professionnel (Marketplace)
├── 20 Entrepreneuriat développeur
└── 21 Préparation titre CDA
```

## Structure standard d'un module

Chaque module suit **exactement** la même structure :

```
module/
├── README.md          → Objectifs, prérequis, chapitres, livrables
├── cours.html         → Cours complet (7 sections pédagogiques)
├── quiz.json          → 20+ questions (QCM, vrai/faux, ouvertes)
├── exercices.json     → 5+ exercices (débutant → expert)
├── tp.json            → 3 travaux pratiques (cas réels)
├── correction.json    → Corrections détaillées
├── ressources.json    → Documentation, vidéos, outils
└── evaluation.json    → Grille d'évaluation et badges
```

## Structure pédagogique d'un cours (cours.html)

1. **Introduction** — Pourquoi, où, quels problèmes
2. **Théorie simplifiée** — Définition simple, métier, technique, cas d'usage
3. **Visualisation** — Diagrammes, schémas, workflows
4. **Démonstration** — Mauvaise pratique vs bonne pratique
5. **Exemples** — 3 simples, 3 intermédiaires, 3 avancés, 1 professionnel
6. **Exercices** — Référence vers exercices.json
7. **TP** — Référence vers tp.json

## Progression de l'apprenant

```
Module → Cours → Exercices → TP → Quiz (≥70%) → Évaluation → Badge → Module suivant
```

## Modules

| # | Module | Durée | Niveau |
|---|--------|-------|--------|
| 00 | [Découverte du métier](00-introduction-metier/) | 20h | Débutant |
| 01 | [Analyse et conception](01-analyse-conception/) | 60h | Débutant-Inter |
| 02 | [Gestion de projet](02-gestion-projet/) | 40h | Débutant-Inter |
| 03 | [Git, GitHub, GitLab](03-git-github/) | 30h | Débutant-Avancé |
| 04 | [HTML5 et CSS3](04-html-css/) | 50h | Débutant-Avancé |
| 05 | [JavaScript ES2024](05-javascript/) | 60h | Débutant-Avancé |
| 06 | [Bases de données](06-bases-donnees/) | 40h | Intermédiaire |
| 07 | [Backend PHP](07-backend-php/) | 50h | Inter-Avancé |
| 08 | [Backend Node.js](08-backend-nodejs/) | 50h | Inter-Avancé |
| 09 | [React](09-react/) | 50h | Inter-Avancé |
| 10 | [Flutter](10-flutter/) | 40h | Intermédiaire |
| 11 | [React Native](11-react-native/) | 40h | Inter-Avancé |
| 12 | [Tests](12-tests/) | 35h | Inter-Avancé |
| 13 | [Sécurité](13-securite/) | 35h | Inter-Expert |
| 14 | [DevOps](14-devops/) | 40h | Inter-Avancé |
| 15 | [CI/CD](15-cicd/) | 25h | Inter-Avancé |
| 16 | [Monitoring](16-monitoring/) | 25h | Inter-Avancé |
| 17 | [OSINT défensif](17-osint/) | 20h | Intermédiaire |
| 18 | [Déploiement](18-deploiement/) | 30h | Inter-Avancé |
| 19 | [Projet professionnel](19-projet-professionnel/) | 120h | Avancé-Expert |
| 20 | [Entrepreneuriat dev](20-entrepreneuriat-dev/) | 20h | Tous |
| 21 | [Préparation titre CDA](21-preparation-titre-cda/) | 30h | Expert |

## Génération

```bash
node scripts/generate-cours-cda.mjs
```

Régénère l'intégralité de la structure pédagogique.
