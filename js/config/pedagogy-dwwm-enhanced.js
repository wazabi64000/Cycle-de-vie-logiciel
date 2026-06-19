/** Quiz & exercices enrichis pour modules DWWM étendus */

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

function ex(id, level, title, prompt, scenario, solution) {
  return { id, level, title, prompt, scenario, solution };
}

export const DWWM_EXTENDED_MODULE_IDS = new Set([
  'analyse-besoin', 'personas', 'benchmark', 'maquettage', 'architecture-web',
  'serveurs-web', 'serveurs-javascript', 'serveurs-php-avances', 'sgbd-relationnels',
  'nosql', 'authentification', 'tests-web', 'qa-assurance', 'securite-web', 'seo',
  'performance-web', 'devops-debutant', 'cicd', 'hebergement', 'monitoring', 'projet-fil-rouge',
]);

/** Quiz thématiques générés depuis topics/tools du module */
export function getDwwmEnhancedQuiz(mod) {
  const topics = mod.topics ?? [{ title: mod.title, body: mod.why }];
  const tools = mod.tools ?? ['Documentation officielle'];
  const levels = [
    { key: 'debutant', label: 'Débutant', ti: 0 },
    { key: 'intermediaire', label: 'Intermédiaire', ti: Math.min(1, topics.length - 1) },
    { key: 'professionnel', label: 'Professionnel', ti: Math.min(2, topics.length - 1) },
  ];
  const out = {};
  for (const { key, label, ti } of levels) {
    const t = topics[ti] ?? topics[0];
    const tool = tools[ti] ?? tools[0];
    const p = key.slice(0, 1);
    out[key] = [
      qSingle(`${p}1`, `[${label}] ${t.title} — quelle affirmation est correcte ?`, [
        'Ce sujet est hors périmètre DWWM',
        t.body.slice(0, 80) + (t.body.length > 80 ? '…' : ''),
        'Aucune documentation n\'existe',
        'Ignorer les bonnes pratiques',
      ], 'B', t.body),
      qSingle(`${p}2`, `Quel outil est recommandé pour « ${mod.title} » ?`, [tool, 'Aucun outil', 'Paint', 'Bloc-notes seul'], 'A', `${tool} fait partie des outils recommandés du module.`),
      qBool(`${p}3`, `Le module « ${mod.title} » contribue à un parcours web professionnel.`, true, mod.why),
      qSingle(`${p}4`, `Bonnes pratiques — niveau ${label} :`, [
        'Cocher sans pratiquer',
        'Documenter, pratiquer et valider',
        'Sauter les tests',
        'Déployer sans analyse',
      ], 'B', 'La pratique et la documentation consolident la compétence DWWM.'),
      qSingle(`${p}5`, `Erreur fréquente sur « ${t.title} » :`, [
        'Tout documenter',
        'Confondre besoin et solution technique',
        'Tester régulièrement',
        'Demander validation client',
      ], 'B', 'Rester centré sur le besoin utilisateur avant la solution.'),
    ];
  }
  return out;
}

export function getDwwmEnhancedExercises(mod) {
  const topics = mod.topics ?? [{ title: mod.title, body: mod.why }];
  const levels = [
    { key: 'debutant', label: 'Débutant', ti: 0 },
    { key: 'intermediaire', label: 'Intermédiaire', ti: Math.min(1, topics.length - 1) },
    { key: 'professionnel', label: 'Professionnel', ti: Math.min(2, topics.length - 1) },
  ];
  const out = {};
  for (const { key, label, ti } of levels) {
    const t = topics[ti] ?? topics[0];
    out[key] = [ex(
      `ex-${key.slice(0, 1)}1`,
      key,
      `${mod.title} — ${t.title}`,
      mod.why,
      t.body.slice(0, 150),
      {
        correction: `Appliquer « ${t.title} » sur un cas concret niveau ${label.toLowerCase()} lié à ${mod.title}.`,
        explanation: t.body,
        why: mod.why,
        mistakes: ['Réponse trop vague', 'Oublier le contexte utilisateur', 'Ignorer les outils recommandés'],
        pro: `Livrable documenté + validation pair/client. Outils : ${(mod.tools ?? []).slice(0, 3).join(', ')}.`,
      },
    )];
  }
  return out;
}

/** Overrides quiz détaillés (modules clés) */
export const DWWM_QUIZ_OVERRIDES = {
  'dwwm::analyse-besoin': {
    debutant: [
      qSingle('d1', 'Qu\'est-ce qu\'une User Story ?', ['Un bug', 'Un besoin utilisateur formulé', 'Un diagramme UML seul', 'Une table SQL'], 'B', 'User Story : « En tant que… je veux… afin de… ».'),
      qBool('d2', 'Le cahier des charges décrit le contexte et le périmètre.', true, 'Il cadre le projet avant le développement.'),
      qSingle('d3', 'Un cas d\'utilisation décrit…', ['Une couleur CSS', 'Un scénario acteur/système', 'Un serveur Nginx', 'Un index BDD'], 'B', 'Cas d\'utilisation = interactions acteurs et système.'),
      qSingle('d4', 'Recueil du besoin inclut…', ['Uniquement le code', 'Entretiens et ateliers', 'Deploy prod', 'Cache Redis'], 'B', 'Interviews, workshops, observation terrain.'),
      qBool('d5', 'Analyser avant de coder limite les refontes.', true, 'Alignement early = moins de rework.'),
    ],
    intermediaire: [
      qSingle('i1', 'MoSCoW sert à…', ['Compiler PHP', 'Prioriser le backlog', 'Chiffrer SSL', 'Indexer SEO'], 'B', 'Must / Should / Could / Won\'t.'),
      qMulti('i2', 'Éléments d\'analyse fonctionnelle :', ['Règles métier', 'Logo seul', 'Flux et exceptions', 'Couleur bouton'], ['A', 'C'], 'Règles métier et flux sans imposer la technique.'),
      qSingle('i3', 'Critère d\'acceptation doit être…', ['Secret', 'Testable', 'Optionnel', 'Post-prod only'], 'B', 'Given/When/Then vérifiable.'),
      qOrder('i4', 'Ordre projet web :', ['Analyse', 'Conception', 'Développement', 'Tests'], 'Analyse et conception précèdent le code.'),
      qBool('i5', 'L\'analyse technique couvre perf et sécurité.', true, 'NFR : performance, hébergement, intégrations.'),
    ],
    professionnel: [
      qMatch('p1', 'Associez :', [{ left: 'MVP', right: 'Version minimale viable' }, { left: 'CDC', right: 'Cahier des charges' }], 'MVP valide ; CDC cadre le projet.'),
      qMulti('p2', 'Artefacts analyse DWWM :', ['Personas', 'User stories', 'Dockerfile prod seul', 'Backlog'], ['A', 'B', 'D'], 'Personas, US et backlog documentent l\'analyse.'),
      qSingle('p3', 'Workshop discovery sert à…', ['Deploy', 'Aligner vision client/équipe', 'Compiler Sass', 'Ping DNS'], 'B', 'Réduit ambiguïtés métier.'),
      qBool('p4', 'Validation client avant dev intensif est recommandée.', true, 'Signature = moins de litiges.'),
      qSingle('p5', 'RICE score évalue…', ['Couleur UI', 'Priorité features', 'Version PHP', 'Font-size'], 'B', 'Reach, Impact, Confidence, Effort.'),
    ],
  },
  'dwwm::tests-web': {
    debutant: [
      qSingle('d1', 'Jest sert aux tests…', ['E2E navigateur', 'Unitaires JS', 'Load K6', 'DNS'], 'B', 'Jest/Vitest = tests unitaires JavaScript.'),
      qSingle('d2', 'Postman teste…', ['CSS Grid', 'API HTTP', 'Images WebP', 'Apache vhost'], 'B', 'Postman/Insomnia = client et tests API.'),
      qBool('d3', 'Playwright simule un utilisateur réel (E2E).', true, 'E2E = parcours complet navigateur.'),
      qSingle('d4', 'PHPUnit teste du code…', ['PHP', 'Python', 'Rust', 'HTML'], 'A', 'PHPUnit = runner tests PHP.'),
      qBool('d5', 'Tests manuels seuls suffisent en prod critique.', false, 'Automatisation = moins de régressions.'),
    ],
    intermediaire: [
      qMulti('i1', 'Pyramide de tests :', ['Beaucoup unitaires', 'Zero test', 'Quelques E2E', 'Tests API'], ['A', 'C', 'D'], 'Base unitaires, milieu API, sommet E2E.'),
      qSingle('i2', 'Supertest teste…', ['API Node/Express', 'Imprimante', 'FTP', 'SMTP'], 'A', 'Supertest appelle endpoints HTTP en test.'),
      qSingle('i3', 'K6 sert aux tests de…', ['Charge', 'Couleur', 'SEO meta', 'Git merge'], 'A', 'K6/JMeter = load/stress testing.'),
      qBool('i4', 'CI doit lancer les tests à chaque push.', true, 'Feedback rapide sur régressions.'),
      qSingle('i5', 'Test flaky =', ['Stable', 'Intermittent non fiable', 'Toujours vert', 'Documenté'], 'B', 'Flaky tests = fausse confiance.'),
    ],
    professionnel: [
      qSingle('p1', 'TDD signifie…', ['Test Driven Development', 'Total Docker Deploy', 'Type Data Design', 'Team DevOps Daily'], 'A', 'Red-Green-Refactor.'),
      qOrder('p2', 'Pipeline test typique :', ['Lint', 'Unitaires', 'API', 'E2E'], 'Qualité code puis tests croissants.'),
      qMulti('p3', 'Bonnes pratiques tests web :', ['Tests indépendants', 'Données aléatoires non reproductibles', 'Nommage explicite', 'Couverture seule sans assertions'], ['A', 'C'], 'Isolés, nommés, assertions métier.'),
      qBool('p4', 'Cypress et Playwright sont des outils E2E.', true, 'Alternatives populaires E2E frontend.'),
      qSingle('p5', 'Couverture 100 % garantit…', ['Zero bug logique', 'Rien sur bugs métier', 'Perf parfaite', 'SEO top'], 'B', 'Couverture ≠ absence bugs fonctionnels.'),
    ],
  },
  'dwwm::projet-fil-rouge': {
    debutant: [
      qSingle('d1', 'Un projet fil rouge DWWM doit…', ['Ignorer l\'analyse', 'Parcourir analyse à déploiement', 'Sans Git', 'Sans tests'], 'B', 'Parcours complet titre professionnel.'),
      qBool('d2', 'Le repo GitHub est un livrable attendu.', true, 'Historique commits = preuve travail.'),
      qSingle('d3', 'Exemples de sujets :', ['Marketplace', 'Recette cuisine', 'Météo seule', 'Sans BDD'], 'A', 'Marketplace, RDV, e-learning — périmètre MVP.'),
      qSingle('d4', 'Première étape recommandée :', ['Deploy prod', 'Analyse du besoin', 'Achat domaine', 'Load test'], 'B', 'Analyse → personas → benchmark → maquettes.'),
      qBool('d5', 'HTTPS en production est attendu.', true, 'Site en ligne sécurisé = critère titre.'),
    ],
    intermediaire: [
      qOrder('i1', 'Ordre fil rouge :', ['Personas', 'Maquettes', 'Frontend', 'Backend'], 'Personas après analyse, avant dev.'),
      qMulti('i2', 'Livrables intermédiaires :', ['API CRUD', 'Maquettes Figma', 'Sans documentation', 'Tests basiques'], ['A', 'B', 'D'], 'Maquettes, API, tests documentent progression.'),
      qSingle('i3', 'Staging sert à…', ['Prod directe', 'Valider avant prod', 'Supprimer backups', 'Ignorer QA'], 'B', 'Environnement de recette client.'),
      qBool('i4', 'Monitoring post-deploy est une bonne pratique.', true, 'Sentry/logs = réaction incidents.'),
      qSingle('i5', 'Présentation oral DWWM dure environ…', ['2 min', '15–20 min', '3 h', '0 min'], 'B', 'Pitch structuré démo + choix techniques.'),
    ],
    professionnel: [
      qMatch('p1', 'Associez étape/livrable :', [{ left: 'Sécurité', right: 'OWASP appliqué' }, { left: 'Deploy', right: 'Site HTTPS en ligne' }], 'Sécurité et deploy = étapes finales critiques.'),
      qMulti('p2', 'Dossier projet complet :', ['Contexte', 'Architecture', 'Code seul sans doc', 'Retour expérience'], ['A', 'B', 'D'], 'Contexte, archi, REX attendus.'),
      qSingle('p3', 'Portfolio valorise…', ['Code + site live + doc', 'Rien', 'Copier-coller', 'Sans Git'], 'A', 'GitHub + URL + README professionnel.'),
      qBool('p4', 'Le fil rouge relie tous les modules DWWM.', true, 'Vision parcours intégré.'),
      qSingle('p5', 'Definition of Done projet =', ['Code merge sans test', 'Recette client + prod stable', 'Deploy vendredi sans rollback', 'Skip sécurité'], 'B', 'Recette signée et prod stable.'),
    ],
  },
};

export const DWWM_EXERCISE_OVERRIDES = {
  'dwwm::analyse-besoin': {
    debutant: [ex('ex-d1', 'debutant', 'Site vitrine artisan', 'Un artisan veut un site pour présenter ses services.', 'Identifiez acteurs, besoin principal, 2 user stories.', {
      correction: 'Acteurs : artisan, visiteur. US : visiteur consulte services ; artisan reçoit demandes contact.',
      explanation: 'Distinguer besoin (visibilité) vs solution (WordPress, etc.).',
      why: 'Base analyse DWWM avant maquette.',
      mistakes: ['US techniques', 'Oublier visiteur'],
      pro: 'Persona visiteur + parcours contact + critères acceptation.',
    })],
    intermediaire: [ex('ex-i1', 'intermediaire', 'App réservation', 'Salon de coiffure — prise de RDV en ligne.', 'Rédigez 3 US + 1 cas d\'utilisation « Prendre RDV ».', {
      correction: 'US client : réserver créneau. US coiffeur : voir planning. CU : client choisit service, date, reçoit confirmation.',
      explanation: 'CU détaille scénario nominal/alternatif (créneau indispo).',
      why: 'Lien US ↔ CU pour conception.',
      mistakes: ['CU sans acteurs', 'CA non testables'],
      pro: 'Backlog MoSCoW + wireframe flow RDV.',
    })],
    professionnel: [ex('ex-p1', 'professionnel', 'Marketplace locale', 'Mise en relation producteurs/consommateurs.', 'Sections cahier des charges + 2 NFR.', {
      correction: 'Sections : contexte, périmètre MVP, fonctionnel, NFR, planning. NFR : RGPD, 100 users concurrents, dispo 99%.',
      explanation: 'CDC structure accord client.',
      why: 'NFR oubliés = incidents prod.',
      mistakes: ['Sans périmètre MVP', 'NFR flous'],
      pro: 'Workshop validation + matrice risques.',
    })],
  },
  'dwwm::projet-fil-rouge': {
    debutant: [ex('ex-d1', 'debutant', 'Choix sujet', 'Projet fil rouge DWWM — 3 mois.', 'Choisissez sujet, acteurs, périmètre MVP.', {
      correction: 'Ex : plateforme e-learning — acteurs apprenant/formateur. MVP : catalogue + inscription + 1 cours.',
      explanation: 'MVP réaliste pour titre.',
      why: 'Périmètre maîtrisable = livrable à temps.',
      mistakes: ['Trop ambitieux', 'Sans acteurs'],
      pro: 'Fiche projet 1 page + repo GitHub + kanban.',
    })],
    intermediaire: [ex('ex-i1', 'intermediaire', 'MVP technique', 'Fil rouge — phase développement.', 'Listez stack, schéma BDD, 3 endpoints API.', {
      correction: 'Stack : React/Vanilla + Node/PHP + PostgreSQL. Tables users, courses, enrollments. API : GET /courses, POST /auth/login, POST /enrollments.',
      explanation: 'Architecture 3 tiers cohérente.',
      why: 'Schéma early = moins refonte.',
      mistakes: ['API sans auth', 'BDD non normalisée'],
      pro: 'OpenAPI spec + migrations + tests Postman.',
    })],
    professionnel: [ex('ex-p1', 'professionnel', 'Soutenance titre', 'Présentation jury DWWM.', 'Plan présentation 20 min + démo + Q&R technique.', {
      correction: 'Plan : contexte 3min, démo 8min, archi 4min, tests/sécu 3min, REUX 2min. Démo parcours critique happy path.',
      explanation: 'Structure rassure jury.',
      why: 'Démo live > slides seules.',
      mistakes: ['Sans backup vidéo démo', 'Ignorer questions sécu'],
      pro: 'README pro + URL prod + monitoring Sentry.',
    })],
  },
};
