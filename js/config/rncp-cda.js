/** Référentiel officiel — Titre professionnel CDA (RNCP37873) */

export const RNCP_META = {
  code: 'RNCP37873',
  intitule: "Concepteur développeur d'applications",
  rome: 'M1805 — Études et développement informatique',
  enregistrement: '18-12-2023 → 18-12-2028',
  source: 'France Compétences / travail-emploi.gouv.fr',
  ancienCode: 'RNCP31678',
};

export const RNCP_CONTEXTE = {
  objectifs: `Le concepteur développeur d'applications conçoit et développe des applications sécurisées (logiciels d'entreprise, applications mobiles et tablettes, sites Web). Il respecte la réglementation, identifie les besoins en éco-conception et applique les procédures qualité. Il contribue à la réussite du projet (satisfaction utilisateurs, gestion de projet, qualité, coût, délai). La sécurité est une préoccupation constante.`,
  anglais: 'Expression écrite, compréhension écrite et orale : niveau B1 (CECRL). Expression orale : niveau A2.',
  accessibilite: 'RGPD, RGAA — interfaces accessibles, y compris pour les personnes en situation de handicap.',
  securite: 'Recommandations ANSSI — architecture multicouche, composants sécurisés, confidentialité des données.',
};

export const RNCP_BLOCS = [
  {
    id: 'BC01',
    code: 'RNCP37873BC01',
    titre: 'Développer une application sécurisée',
    dureeEpreuve: '01 h 20 min',
    competences: [
      'Installer et configurer son environnement de travail en fonction du projet',
      'Développer des interfaces utilisateur',
      'Développer des composants métier',
      "Contribuer à la gestion d'un projet informatique",
    ],
    evaluation: {
      presentation: '00 h 20 min — Dossier de projet + diaporama, présentation au jury',
      entretien: '00 h 30 min — Questions sur le dossier et compétences non couvertes',
      questionnaire: '00 h 30 min — QCM français + questions ouvertes en anglais (doc technique EN)',
    },
    modulesWazaby: ['00-introduction-metier', '02-gestion-projet', '03-git-github', '04-html-css', '05-javascript', '07-backend-php', '08-backend-nodejs', '09-react', '10-flutter', '11-react-native'],
  },
  {
    id: 'BC02',
    code: 'RNCP37873BC02',
    titre: 'Concevoir et développer une application sécurisée organisée en couches',
    dureeEpreuve: '01 h 30 min',
    competences: [
      'Analyser les besoins et maquetter une application',
      "Définir l'architecture logicielle d'une application",
      'Concevoir et mettre en place une base de données relationnelle',
      "Développer des composants d'accès aux données SQL et NoSQL",
    ],
    evaluation: {
      presentation: '00 h 30 min',
      entretien: '00 h 30 min',
      questionnaire: '00 h 30 min — Documentation technique en anglais',
    },
    modulesWazaby: ['01-analyse-conception', '06-bases-donnees', '07-backend-php', '08-backend-nodejs', '19-projet-professionnel'],
  },
  {
    id: 'BC03',
    code: 'RNCP37873BC03',
    titre: "Préparer le déploiement d'une application sécurisée",
    dureeEpreuve: '01 h 10 min',
    competences: [
      "Préparer et exécuter les plans de tests d'une application",
      "Préparer et documenter le déploiement d'une application",
      'Contribuer à la mise en production dans une démarche DevOps',
    ],
    evaluation: {
      presentation: '00 h 20 min',
      entretien: '00 h 20 min',
      questionnaire: '00 h 30 min',
    },
    modulesWazaby: ['12-tests', '13-securite', '14-devops', '15-cicd', '16-monitoring', '17-osint', '18-deploiement'],
  },
];

export const RNCP_EPREUVE_GLOBALE = {
  dureeTotale: '02 h 15 min',
  entretienFinal: '00 h 20 min — Échange sur le dossier professionnel',
  note: 'Chaque bloc (CCP) peut être obtenu par capitalisation. Le titre complet regroupe les 3 blocs.',
};

export const RNCP_ACTIVITES = [
  'Interlocuteur privilégié du client — analyse du cahier des charges et identification des fonctionnalités',
  'Conception sécurisée (ANSSI), architecture multicouche, dossier de conception',
  'Développement UI, traitements métier, modèle de données, accès sécurisés aux données',
  'Plan de tests, documentation de déploiement, mise en production DevOps',
  'RGPD, RGAA, veille technique et résolution de problèmes (y compris en production)',
  'Communication en équipe : chef de projet, architecte, RSSI, DBA, Ops, testeurs…',
];

export const RNCP_SECTEURS = [
  'ESN (prestations en régie ou au forfait)',
  'Éditeurs de solutions logicielles',
  'Services informatiques en entreprise (privé / public)',
  'Indépendant / informaticien d\'études',
];

export const RNCP_METIERS = [
  'Concepteur développeur / concepteur d\'applications',
  'Développeur front end, back end, full stack, mobile, web',
  'Ingénieur d\'études et développement',
  'Analyste programmeur informatique',
];

export const RNCP_VOIES_ACCES = [
  'Parcours de formation (élève, étudiant, continue)',
  'Contrat d\'apprentissage ou de professionnalisation',
  'Candidature individuelle ou VAE (validation des acquis)',
];
