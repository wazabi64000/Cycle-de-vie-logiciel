/** Générateur et overrides de quiz — 15 questions / module (5×3 niveaux) */

import {
  DWWM_EXTENDED_MODULE_IDS,
  DWWM_QUIZ_OVERRIDES,
  getDwwmEnhancedQuiz,
} from './pedagogy-dwwm-enhanced.js';

function qSingle(id, question, options, correctLetter, explanation) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  return {
    id,
    type: 'single',
    question,
    options: options.map((text, i) => ({ id: letters[i], text })),
    correct: [correctLetter],
    correctLetter,
    explanation,
  };
}

function qMulti(id, question, options, correctLetters, explanation) {
  return {
    id,
    type: 'multiple',
    question,
    options: options.map((text, i) => ({ id: ['A', 'B', 'C', 'D', 'E'][i], text })),
    correct: correctLetters,
    explanation,
  };
}

function qBool(id, question, correct, explanation) {
  return { id, type: 'boolean', question, correct, explanation };
}

function qOrder(id, question, items, explanation) {
  return {
    id,
    type: 'order',
    question,
    items,
    correctOrder: items.map((_, i) => i),
    explanation,
  };
}

function qMatch(id, question, pairs, explanation) {
  return { id, type: 'match', question, pairs, explanation };
}

const QUIZ_OVERRIDES = {
  'cda::analyse-besoins': {
    debutant: [
      qSingle('d1', 'Qu\'est-ce qu\'une User Story ?', ['Un bug', 'Un besoin utilisateur formulé', 'Un diagramme UML', 'Une base de données'], 'B', 'Une User Story exprime un besoin au format « En tant que… je veux… afin de… ».'),
      qBool('d2', 'Le MVP contient toutes les fonctionnalités imaginées.', false, 'Le MVP (Minimum Viable Product) ne contient que le minimum pour valider le produit.'),
      qSingle('d3', 'Quel outil est souvent utilisé pour le backlog Agile ?', ['PostgreSQL', 'Jira', 'Docker', 'Nginx'], 'B', 'Jira, Trello ou Linear servent à prioriser le backlog.'),
      qSingle('d4', 'Qui est un persona ?', ['Un développeur', 'Un utilisateur type fictif', 'Un serveur', 'Un test'], 'B', 'Un persona représente un profil utilisateur cible.'),
      qBool('d5', 'Analyser avant de coder réduit les refontes.', true, 'L\'analyse aligne l\'équipe et le client sur le périmètre.'),
    ],
    intermediaire: [
      qSingle('i1', 'MoSCoW sert à…', ['Tester', 'Prioriser', 'Déployer', 'Chiffrer'], 'B', 'Must/Should/Could/Won\'t — technique de priorisation.'),
      qMulti('i2', 'Éléments d\'un bon cahier des charges :', ['Contexte', 'Couleur du logo seule', 'Contraintes', 'Critères d\'acceptation'], ['A', 'C', 'D'], 'Contexte, contraintes et critères d\'acceptation sont essentiels.'),
      qSingle('i3', 'Critère d\'acceptation :', ['Optionnel', 'Testable et mesurable', 'Secret', 'Post-prod only'], 'B', 'Un critère doit être vérifiable (Given/When/Then).'),
      qSingle('i4', 'Backlog produit contient…', ['Uniquement bugs', 'User stories priorisées', 'Code source', 'Logs'], 'B', 'Le backlog liste les items de valeur priorisés.'),
      qOrder('i5', 'Ordre logique projet :', ['Idée', 'Analyse', 'Conception', 'Développement'], 'On analyse et conçoit avant de développer.'),
    ],
    professionnel: [
      qSingle('p1', 'RICE score évalue…', ['Couleur UI', 'Priorité (Reach/Impact/Confidence/Effort)', 'SQL', 'SSL'], 'B', 'RICE quantifie la priorisation des features.'),
      qMatch('p2', 'Associez :', [{ left: 'MVP', right: 'Version minimale viable' }, { left: 'US', right: 'User Story' }], 'MVP valide le marché ; US capture un besoin.'),
      qSingle('p3', 'Workshop discovery avec client sert à…', ['Deploy', 'Aligner vision et contraintes', 'Compiler PHP', 'Indexer BDD'], 'B', 'Les ateliers réduisent les ambiguïtés métier.'),
      qMulti('p4', 'Artefacts analyse :', ['Personas', 'User journeys', 'Dockerfile prod', 'Backlog'], ['A', 'B', 'D'], 'Personas, parcours et backlog documentent l\'analyse.'),
      qBool('p5', 'Le cahier des charges doit être validé avant développement intensif.', true, 'Validation client = moins de rework.'),
    ],
  },
  'cda::tests': {
    debutant: [
      qSingle('d1', 'Quel outil est principalement utilisé pour les tests E2E ?', ['PostgreSQL', 'Playwright', 'Redis', 'Docker'], 'B', 'Playwright simule un utilisateur dans le navigateur (E2E).'),
      qSingle('d2', 'Test unitaire teste…', ['Toute l\'app d\'un coup', 'Une unité isolée', 'Le réseau', 'Le design'], 'B', 'Unitaire = fonction/composant isolé avec mocks.'),
      qBool('d3', 'Jest peut exécuter des tests unitaires JavaScript.', true, 'Jest et Vitest sont des runners unitaires populaires.'),
      qSingle('d4', 'Couverture de code mesure…', ['La vitesse', 'Le % de code exécuté par les tests', 'Le prix AWS', 'La RAM'], 'B', 'Couverture indique les lignes/branches testées.'),
      qBool('d5', 'Les tests manuels suffisent en production critique.', false, 'L\'automatisation réduit les régressions.'),
    ],
    intermediaire: [
      qSingle('i1', 'Supertest sert à tester…', ['CSS', 'API HTTP', 'Images', 'DNS'], 'B', 'Supertest appelle des endpoints Express/Node en test.'),
      qMulti('i2', 'Pyramide de tests :', ['Beaucoup unitaires', '0 tests', 'Quelques E2E', 'Tests API'], ['A', 'C', 'D'], 'Base large unitaires, sommet E2E, milieu intégration/API.'),
      qSingle('i3', 'Mock permet de…', ['Déployer', 'Simuler une dépendance', 'Chiffrer', 'Router IP'], 'B', 'Les mocks isolent l\'unité testée.'),
      qSingle('i4', 'Test E2E parcours critique =', ['Test CSS couleur', 'Login → action → résultat', 'Ping serveur', 'Backup'], 'B', 'E2E valide un flux utilisateur complet.'),
      qBool('i5', 'CI doit exécuter les tests à chaque push.', true, 'CI détecte les régressions tôt.'),
    ],
    professionnel: [
      qSingle('p1', 'TDD signifie…', ['Test Driven Development', 'Total Docker Deploy', 'Type Data Design', 'Team DevOps Daily'], 'A', 'TDD : écrire le test avant le code (Red-Green-Refactor).'),
      qMulti('p2', 'Bonnes pratiques tests :', ['Tests indépendants', 'Données aléatoires non reproductibles', 'Nommage explicite', 'Flaky tests acceptés'], ['A', 'C'], 'Tests isolés, nommés, reproductibles.'),
      qSingle('p3', 'Couverture 100 % garantit…', ['Rien sur les bugs logiques', 'Zero bug', 'Perf parfaite', 'Sécurité totale'], 'A', '100 % couverture ≠ absence de bugs métier.'),
      qOrder('p4', 'Pipeline test :', ['Lint', 'Unitaires', 'API', 'E2E'], 'Ordre typique : qualité code → unit → intégration → E2E.'),
      qBool('p5', 'Playwright supporte Chromium, Firefox et WebKit.', true, 'Multi-navigateurs natif avec Playwright.'),
    ],
  },
  'cda::bases-donnees': {
    debutant: [
      qSingle('d1', 'Clé primaire sert à…', ['Décorer', 'Identifier uniquement chaque ligne', 'Cacher données', 'Compresser'], 'B', 'PK = identifiant unique par enregistrement.'),
      qSingle('d2', 'PostgreSQL est…', ['Un framework JS', 'Un SGBD relationnel', 'Un CDN', 'Un OS'], 'B', 'PostgreSQL = base SQL open source robuste.'),
      qBool('d3', 'Une FK (clé étrangère) lie deux tables.', true, 'FK garantit l\'intégrité référentielle.'),
      qSingle('d4', 'SQL signifie…', ['Structured Query Language', 'Simple Quick Load', 'Secure Queue Link', 'System Quality Log'], 'A', 'SQL = langage de requêtes relationnelles.'),
      qBool('d5', 'NoSQL remplace toujours SQL.', false, 'Choix selon modèle de données et besoins.'),
    ],
    intermediaire: [
      qSingle('i1', 'Normalisation vise à…', ['Dupliquer', 'Réduire redondance', 'Supprimer index', 'Ignorer contraintes'], 'B', 'Normalisation limite anomalies insertion/update.'),
      qMulti('i2', 'ACID :', ['Atomicité', 'Cohérence', 'Instagram', 'Durabilité'], ['A', 'B', 'D'], 'Atomicité, Cohérence, Isolation, Durabilité.'),
      qSingle('i3', 'Index accélère…', ['INSERT only', 'Lecture/recherche', 'Shutdown', 'CSS'], 'B', 'Index = structure pour requêtes rapides (coût écriture).'),
      qSingle('i4', 'Migration versionnée permet…', ['Perdre données', 'Évoluer schéma traçable', 'Supprimer prod', 'Oublier SQL'], 'B', 'Flyway/Liquibase/Prisma migrations.'),
      qBool('i5', 'Redis est une base clé-valeur en mémoire.', true, 'Redis = cache/sessions/ranking.'),
    ],
    professionnel: [
      qSingle('p1', 'N+1 query problem…', ['Performance OK', 'Requêtes multiples en boucle', 'Backup auto', 'SSL'], 'B', 'N+1 = 1 requête + N requêtes liées — anti-pattern.'),
      qMatch('p2', 'Associez :', [{ left: 'MCD', right: 'Modèle conceptuel' }, { left: 'MLD', right: 'Modèle logique' }], 'MCD métier → MLD implémentation.'),
      qMulti('p3', 'Stratégie backup BDD :', ['Quotidien', 'Jamais tester restauration', 'Rétention définie', 'Test restauration'], ['A', 'C', 'D'], 'Backup + test restauration obligatoires.'),
      qSingle('p4', 'JSONB PostgreSQL permet…', ['Que du texte', 'Documents JSON indexables', 'Remplacer Git', 'DNS'], 'B', 'JSONB = flexibilité NoSQL dans PostgreSQL.'),
      qBool('p5', 'Transaction garantit tout ou rien (atomicité).', true, 'COMMIT/ROLLBACK en cas d\'erreur.'),
    ],
  },
};

function genericQuizForModule(mod, level, levelLabel) {
  const tool = mod.tools?.[0] ?? 'un outil adapté';
  const topic = mod.topics?.[0]?.title ?? mod.title;
  const prefix = level.slice(0, 1);
  return [
    qSingle(`${prefix}1`, `[${levelLabel}] Quel est l'objectif principal du module « ${mod.title} » ?`, [
      'Ignorer le sujet', mod.why.slice(0, 60) + '…', 'Supprimer les tests', 'Déployer sans analyse',
    ], 'B', mod.why),
    qSingle(`${prefix}2`, `Quel outil est recommandé dans ce module ?`, [tool, 'Aucun', 'Uniquement Excel', 'Paint'], 'A', `${tool} figure parmi les outils recommandés.`),
    qBool(`${prefix}3`, `Le module « ${mod.title} » fait partie du cycle de vie logiciel.`, true, 'Chaque module couvre une étape essentielle.'),
    qSingle(`${prefix}4`, `Sujet abordé :`, [topic, 'Recettes cuisine', 'Météo', 'Sport'], 'A', `Ce module traite : ${topic}.`),
    qSingle(`${prefix}5`, `Niveau ${levelLabel} — bonne pratique :`, [
      'Cocher sans comprendre', 'Documenter et pratiquer', 'Tout ignorer', 'Skipper l\'étape',
    ], 'B', 'La pratique et la documentation consolident la compétence.'),
  ];
}

export function getModuleQuiz(formationId, mod) {
  const key = `${formationId}::${mod.id}`;
  const dwwmOverride = DWWM_QUIZ_OVERRIDES[key];
  if (dwwmOverride) return dwwmOverride;
  const override = QUIZ_OVERRIDES[key];
  if (override) return override;
  if (formationId === 'dwwm' && DWWM_EXTENDED_MODULE_IDS.has(mod.id)) {
    return getDwwmEnhancedQuiz(mod);
  }

  return {
    debutant: genericQuizForModule(mod, 'debutant', 'Débutant'),
    intermediaire: genericQuizForModule(mod, 'intermediaire', 'Intermédiaire'),
    professionnel: genericQuizForModule(mod, 'professionnel', 'Professionnel'),
  };
}

export const PASS_THRESHOLD = 0.6;

export function gradeAnswer(question, userAnswer) {
  switch (question.type) {
    case 'single':
      return userAnswer === question.correctLetter || userAnswer === question.correct?.[0];
    case 'multiple': {
      const u = [...(userAnswer ?? [])].sort().join(',');
      const c = [...question.correct].sort().join(',');
      return u === c;
    }
    case 'boolean':
      return userAnswer === question.correct;
    case 'order': {
      const u = JSON.stringify(userAnswer ?? []);
      const c = JSON.stringify(question.correctOrder);
      return u === c;
    }
    case 'match':
      return userAnswer === 'correct';
    default:
      return false;
  }
}
