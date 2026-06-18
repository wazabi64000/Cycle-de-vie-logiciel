/** Badges WazabyCode — gamification professionnelle */
export const BADGES = [
  { id: 'analyste', name: 'Analyste', icon: '📊', description: 'Maîtrise de l\'analyse et du recueil du besoin', category: 'analyse', threshold: 70 },
  { id: 'architecte', name: 'Architecte', icon: '🏛️', description: 'Conception UML et architecture validée', category: 'conception', threshold: 70 },
  { id: 'frontend', name: 'Développeur Frontend', icon: '🎨', description: 'Interfaces modernes et accessibles', category: 'frontend', threshold: 70 },
  { id: 'backend', name: 'Développeur Backend', icon: '⚙️', description: 'APIs robustes et logique métier', category: 'backend', threshold: 70 },
  { id: 'sql', name: 'Expert SQL', icon: '🗄️', description: 'Modélisation et requêtes avancées', category: 'database', threshold: 70 },
  { id: 'qa', name: 'Testeur QA', icon: '✅', description: 'Couverture de tests professionnelle', category: 'tests', threshold: 70 },
  { id: 'devops', name: 'DevOps', icon: '🐳', description: 'Docker, Linux et infrastructure', category: 'devops', threshold: 70 },
  { id: 'security', name: 'Expert Sécurité', icon: '🔒', description: 'OWASP et sécurité applicative', category: 'security', threshold: 70 },
  { id: 'deployer', name: 'Déployeur', icon: '🌐', description: 'Mise en production réussie', category: 'deployment', threshold: 70 },
  { id: 'fullstack', name: 'Fullstack', icon: '🚀', description: 'Frontend + Backend + BDD maîtrisés', category: null, threshold: null, requires: ['frontend', 'backend', 'sql'] },
  { id: 'cicd-master', name: 'Maître CI/CD', icon: '🔄', description: 'Pipelines automatisés opérationnels', category: 'cicd', threshold: 70 },
  { id: 'project-mvp', name: 'MVP Atteint', icon: '🎯', description: 'Projet au stade MVP ou supérieur', category: null, projectMaturity: 'mvp' },
  { id: 'graduate', name: 'Diplômé WazabyCode', icon: '🎓', description: 'Parcours terminé avec certification', category: null, certificate: true },
];
