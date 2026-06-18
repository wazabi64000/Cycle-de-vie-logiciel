# Architecture pédagogique et technique — LMS CDA

## Phase 1 : Architecture pédagogique ✅

Cette phase définit la structure du contenu pédagogique dans `cours-cda/`.

## Phase 2 : Plateforme WazabyCode LMS ✅

Application frontend avec système de progression, gamification et persistance hybride.

```bash
cd lms && npm install && npm start
# → http://localhost:3000/dashboard.html
```

### Fonctionnalités implémentées

| Système | Fichiers |
|---------|----------|
| Persistance hybride | `lms/public/js/core/storage.js` |
| Moteur de progression | `lms/public/js/core/progress-engine.js` |
| Recommandations | `lms/public/js/core/recommendation-engine.js` |
| Dashboard apprenant | `lms/public/dashboard.html` |
| Certificats | `lms/public/certificate.html` |
| Fin de parcours | `lms/public/completion.html` |

## Phase 3 : Backend PostgreSQL (à venir)

### Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | HTML5, CSS3, JavaScript ES2024 |
| Backend | Node.js, Express |
| Base de données | PostgreSQL |
| Architecture | Clean Architecture, Modular Architecture |
| Conteneurisation | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Tests | Jest, Supertest, Playwright |
| Déploiement | VPS Ubuntu, Nginx, SSL Let's Encrypt |

### Arborescence projet LMS (Phase 2)

```
Cycle-de-vie-logiciel/
│
├── cours-cda/                    # Contenu pédagogique (Phase 1)
│   ├── index.json
│   ├── 00-introduction-metier/
│   ├── 01-analyse-conception/
│   └── ... (22 modules)
│
├── lms/                          # Application LMS (Phase 2)
│   ├── src/
│   │   ├── domain/               # Entités et règles métier
│   │   │   ├── entities/
│   │   │   │   ├── User.js
│   │   │   │   ├── Module.js
│   │   │   │   ├── Chapter.js
│   │   │   │   ├── Lesson.js
│   │   │   │   ├── Quiz.js
│   │   │   │   ├── Exercise.js
│   │   │   │   ├── Progress.js
│   │   │   │   ├── Badge.js
│   │   │   │   └── Certificate.js
│   │   │   └── repositories/     # Interfaces (ports)
│   │   │
│   │   ├── application/          # Cas d'usage
│   │   │   ├── auth/
│   │   │   ├── modules/
│   │   │   ├── progress/
│   │   │   ├── quiz/
│   │   │   ├── exercises/
│   │   │   └── certificates/
│   │   │
│   │   ├── infrastructure/       # Implémentations
│   │   │   ├── database/
│   │   │   │   ├── migrations/
│   │   │   │   ├── seeds/
│   │   │   │   └── repositories/
│   │   │   ├── http/
│   │   │   │   ├── routes/
│   │   │   │   ├── controllers/
│   │   │   │   └── middleware/
│   │   │   └── services/
│   │   │
│   │   └── presentation/         # Frontend
│   │       ├── public/
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── assets/
│   │       ├── pages/
│   │       │   ├── index.html
│   │       │   ├── login.html
│   │       │   ├── dashboard-learner.html
│   │       │   ├── dashboard-admin.html
│   │       │   ├── module.html
│   │       │   ├── quiz.html
│   │       │   └── certificate.html
│   │       └── components/
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── docker/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   │
│   ├── .github/
│   │   └── workflows/
│   │       ├── ci.yml
│   │       └── deploy.yml
│   │
│   ├── package.json
│   └── server.js
│
├── scripts/
│   └── generate-cours-cda.mjs
│
├── ARCHITECTURE.md
└── README.md
```

## Schéma PostgreSQL (Phase 2)

```sql
-- Utilisateurs
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20) DEFAULT 'learner', -- learner, admin, instructor
    first_name  VARCHAR(100),
    last_name   VARCHAR(100),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Modules
CREATE TABLE modules (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(100) UNIQUE NOT NULL,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    duration    VARCHAR(50),
    level       VARCHAR(50),
    order_index INTEGER NOT NULL,
    is_active   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Chapitres
CREATE TABLE chapters (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   UUID REFERENCES modules(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    content     TEXT,
    order_index INTEGER NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Leçons
CREATE TABLE lessons (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id  UUID REFERENCES chapters(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    content     TEXT,
    type        VARCHAR(50), -- theory, demo, example
    order_index INTEGER NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz
CREATE TABLE quizzes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   UUID REFERENCES modules(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    seuil       INTEGER DEFAULT 70,
    duree_min   INTEGER DEFAULT 30,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_questions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id     UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    type        VARCHAR(20), -- qcm, vrai_faux, ouverte
    question    TEXT NOT NULL,
    options     JSONB,
    reponse     VARCHAR(255),
    explication TEXT,
    points      INTEGER DEFAULT 1,
    order_index INTEGER NOT NULL
);

-- Exercices
CREATE TABLE exercises (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   UUID REFERENCES modules(id) ON DELETE CASCADE,
    niveau      VARCHAR(20), -- debutant, intermediaire, avance, expert
    titre       VARCHAR(255) NOT NULL,
    enonce      TEXT NOT NULL,
    duree_est   VARCHAR(50),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Travaux pratiques
CREATE TABLE tps (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   UUID REFERENCES modules(id) ON DELETE CASCADE,
    titre       VARCHAR(255) NOT NULL,
    description TEXT,
    niveau      VARCHAR(20),
    duree       VARCHAR(50),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Progression
CREATE TABLE user_progress (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id   UUID REFERENCES modules(id) ON DELETE CASCADE,
    chapter_id  UUID REFERENCES chapters(id),
    status      VARCHAR(20) DEFAULT 'not_started', -- not_started, in_progress, completed
    score       INTEGER,
    completed_at TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, module_id, chapter_id)
);

-- Résultats quiz
CREATE TABLE quiz_results (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    quiz_id     UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    score       INTEGER NOT NULL,
    reponses    JSONB,
    passed      BOOLEAN,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE badges (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug        VARCHAR(100) UNIQUE NOT NULL,
    nom         VARCHAR(255) NOT NULL,
    description TEXT,
    icon        VARCHAR(100),
    condition   TEXT
);

CREATE TABLE user_badges (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id    UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- Certificats
CREATE TABLE certificates (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id   UUID REFERENCES modules(id),
    type        VARCHAR(50), -- module, cursus
    code        VARCHAR(50) UNIQUE NOT NULL,
    issued_at   TIMESTAMPTZ DEFAULT NOW()
);
```

## API REST (Phase 2)

### Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion (JWT) |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/logout` | Déconnexion |

### Modules et contenu

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/modules` | Liste des modules |
| GET | `/api/modules/:slug` | Détail d'un module |
| GET | `/api/modules/:slug/chapters` | Chapitres d'un module |
| GET | `/api/modules/:slug/quiz` | Quiz d'un module |
| GET | `/api/modules/:slug/exercises` | Exercices d'un module |
| GET | `/api/modules/:slug/tps` | TP d'un module |

### Progression

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/progress` | Progression de l'apprenant |
| PUT | `/api/progress/:moduleId` | Mettre à jour la progression |
| POST | `/api/quiz/:id/submit` | Soumettre un quiz |
| GET | `/api/badges` | Badges de l'apprenant |
| GET | `/api/certificates` | Certificats obtenus |

### Administration

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/stats` | Statistiques globales |
| GET | `/api/admin/users` | Liste des apprenants |
| GET | `/api/admin/users/:id/progress` | Progression d'un apprenant |
| POST | `/api/admin/modules` | Créer un module |
| PUT | `/api/admin/modules/:id` | Modifier un module |

## Systèmes fonctionnels

| # | Système | Description | Phase |
|---|---------|-------------|-------|
| 1 | Modules | 22 modules structurés | 1 ✅ |
| 2 | Chapitres | 10+ par module | 1 ✅ |
| 3 | Leçons | Contenu dans cours.html | 1 ✅ |
| 4 | Quiz | 20+ questions par module | 1 ✅ |
| 5 | Exercices | 5+ par module, 4 niveaux | 1 ✅ |
| 6 | TP | 3 cas réels par module | 1 ✅ |
| 7 | Corrections | Corrections détaillées | 1 ✅ |
| 8 | Progression | Suivi avancement apprenant | 2 |
| 9 | Badges | Gamification | 2 |
| 10 | Évaluation | Grilles et certificats | 1 ✅ / 2 |

## Pipeline CI/CD (Phase 2)

```
Push
  ↓
Lint (ESLint)
  ↓
Tests unitaires (Jest)
  ↓
Tests API (Supertest)
  ↓
Tests E2E (Playwright)
  ↓
Build (Docker)
  ↓
Deploy (VPS Ubuntu + Nginx + SSL)
```

## Prochaines étapes

1. **Phase 2** — Implémenter le backend Express + PostgreSQL
2. **Phase 3** — Frontend LMS (dashboard apprenant + admin)
3. **Phase 4** — Import automatique du contenu `cours-cda/` en BDD
4. **Phase 5** — Docker, CI/CD, déploiement VPS
5. **Phase 6** — Enrichissement du contenu pédagogique module par module
