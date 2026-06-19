/** Exercices pratiques — solutions masquées */

import {
  DWWM_EXTENDED_MODULE_IDS,
  DWWM_EXERCISE_OVERRIDES,
  getDwwmEnhancedExercises,
} from './pedagogy-dwwm-enhanced.js';

function ex(id, level, title, prompt, scenario, solution) {
  return { id, level, title, prompt, scenario, solution };
}

const EXERCISE_OVERRIDES = {
  'cda::analyse-besoins': {
    debutant: [ex('ex-d1', 'debutant', 'Marketplace transport', 'Une entreprise souhaite créer une marketplace de transport de colis entre particuliers.', 'Identifiez les acteurs et le problème principal.', {
      correction: 'Acteurs : expéditeur, transporteur, admin. Problème : mettre en relation et sécuriser paiement/tracking.',
      explanation: 'Une marketplace a au minimum deux côtés (offre/demande) et un opérateur.',
      why: 'Clarifier acteurs évite des US floues.',
      mistakes: ['Oublier l\'admin', 'Confondre besoin métier et solution technique'],
      pro: 'Rédiger 3 personas + parcours expéditeur/transporteur + MVP limité à un corridor géographique.',
    })],
    intermediaire: [ex('ex-i1', 'intermediaire', 'User Stories CRM', 'Projet CRM B2B pour équipe commerciale.', 'Rédigez 3 user stories avec critères d\'acceptation.', {
      correction: 'US1 : En tant que commercial je veux voir mes leads pour prioriser. CA : liste filtrée par statut, tri date.',
      explanation: 'Format En tant que / je veux / afin de + critères testables.',
      why: 'Les CA servent aux tests et à la recette.',
      mistakes: ['US trop techniques', 'CA non testables'],
      pro: 'Backlog MoSCoW + wireframe liste leads + définition Done.',
    })],
    professionnel: [ex('ex-p1', 'professionnel', 'Cahier des charges ERP', 'PME souhaite un ERP stock/commandes.', 'Listez sections du cahier des charges et 2 contraintes non fonctionnelles.', {
      correction: 'Sections : contexte, périmètre, fonctionnel, NFR, planning, risques. NFR : RGPD, dispo 99.5%, 50 users concurrents.',
      explanation: 'Un CDC structure l\'accord client et guide la conception.',
      why: 'NFR oubliés = incidents prod (perf, sécu).',
      mistakes: ['CDC sans périmètre MVP', 'Pas de critères mesurables'],
      pro: 'Workshop RACI + matrice risques + validation signée.',
    })],
  },
  'cda::bases-donnees': {
    debutant: [ex('ex-d1', 'debutant', 'Bibliothèque', 'Concevoir le modèle d\'une bibliothèque municipale.', 'Identifiez tables, relations, clés primaires.', {
      correction: 'Tables : members(id PK), books(id PK), loans(id PK, member_id FK, book_id FK, due_date).',
      explanation: 'members ↔ loans ↔ books en relation N-N via loans.',
      why: 'La table loans porte les attributs de la relation (dates).',
      mistakes: ['Dupliquer member dans books', 'Pas de PK'],
      pro: 'MCD + MLD 3NF + index sur member_id, book_id.',
    })],
    intermediaire: [ex('ex-i1', 'intermediaire', 'Marketplace SaaS', 'SaaS multi-tenant commandes en ligne.', 'Proposez schéma orders/order_items/products avec contraintes.', {
      correction: 'products(tenant_id, id), orders(tenant_id, id, user_id, status), order_items(order_id, product_id, qty, price).',
      explanation: 'tenant_id isole les clients SaaS ; order_items = ligne de commande.',
      why: 'Multi-tenant dès la conception évite refonte.',
      mistakes: ['Pas de tenant_id', 'Prix sans historisation'],
      pro: 'RLS PostgreSQL par tenant + migrations versionnées.',
    })],
    professionnel: [ex('ex-p1', 'professionnel', 'Optimisation requêtes', 'API lente sur liste commandes.', 'Analysez causes N+1 et proposez correctifs.', {
      correction: 'N+1 : boucle charge items par order. Fix : JOIN ou eager load, index (user_id, created_at).',
      explanation: 'EXPLAIN ANALYZE révèle seq scan et requêtes répétées.',
      why: 'Index + requête unique = latence divisée.',
      mistakes: ['SELECT * partout', 'Pas d\'index FK'],
      pro: 'Pagination cursor-based + cache Redis + monitoring p95.',
    })],
  },
  'cda::tests': {
    debutant: [ex('ex-d1', 'debutant', 'API Auth', 'API REST login/register.', 'Listez 5 tests à mettre en place.', {
      correction: 'Login OK, login mauvais MDP, register valide, email dupliqué, token JWT expiré.',
      explanation: 'Couvrir happy path + erreurs auth.',
      why: 'L\'auth est critique — tests prioritaires.',
      mistakes: ['Tester uniquement login OK', 'Pas de test sécurité'],
      pro: 'Suite Supertest + E2E Playwright login flow.',
    })],
    intermediaire: [ex('ex-i1', 'intermediaire', 'E-commerce checkout', 'Parcours panier → paiement.', 'Définissez scénarios E2E Playwright.', {
      correction: 'Scénarios : ajout panier, quantité 0 rejetée, checkout invité, paiement mock success/fail.',
      explanation: 'E2E valide l\'intégration front/back/paiement.',
      why: 'Checkout = flux revenue-critical.',
      mistakes: ['E2E flaky sans wait', 'Données prod en test'],
      pro: 'Fixtures test + parallel shards + trace Playwright.',
    })],
    professionnel: [ex('ex-p1', 'professionnel', 'Stratégie QA ERP', 'ERP avec 200 écrans.', 'Proposez pyramide tests + critères sortie release.', {
      correction: '70% unit métier, 20% API/intégration, 10% E2E parcours critiques. Sortie : 0 bug bloquant, couverture >70%, UAT signée.',
      explanation: 'Pyramide évite maintenance E2E ingérable.',
      why: 'Critères sortie objectivent la release.',
      mistakes: ['100% E2E', 'Pas de critères mesurables'],
      pro: 'Contract tests + smoke CI + regression sélective.',
    })],
  },
};

function genericExercise(mod, level, levelLabel) {
  const scenario = mod.topics?.[0]?.body?.slice(0, 120) ?? mod.why.slice(0, 120);
  return ex(
    `ex-${level.slice(0, 1)}1`,
    level,
    `Pratique — ${mod.title}`,
    mod.why,
    scenario,
    {
      correction: `Appliquer les concepts du module « ${mod.title} » sur un cas ${levelLabel.toLowerCase()}.`,
      explanation: `Reliez la théorie (${mod.topics?.[0]?.title ?? mod.title}) à un livrable concret.`,
      why: 'La pratique ancre la compétence mieux que la lecture seule.',
      mistakes: ['Réponse trop vague', 'Ignorer les contraintes du contexte'],
      pro: `Documentez votre réponse, faites-la valider par un pair, comparez avec les outils : ${(mod.tools ?? []).slice(0, 2).join(', ')}.`,
    }
  );
}

export function getModuleExercises(formationId, mod) {
  const key = `${formationId}::${mod.id}`;
  const dwwmOverride = DWWM_EXERCISE_OVERRIDES[key];
  if (dwwmOverride) return dwwmOverride;
  const override = EXERCISE_OVERRIDES[key];
  if (override) return override;
  if (formationId === 'dwwm' && DWWM_EXTENDED_MODULE_IDS.has(mod.id)) {
    return getDwwmEnhancedExercises(mod);
  }

  return {
    debutant: [genericExercise(mod, 'debutant', 'Débutant')],
    intermediaire: [genericExercise(mod, 'intermediaire', 'Intermédiaire')],
    professionnel: [genericExercise(mod, 'professionnel', 'Professionnel')],
  };
}
