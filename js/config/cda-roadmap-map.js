/** Mode CDA — mapping thèmes roadmap ↔ RNCP37873 */

import { RNCP_BLOCS, RNCP_CONTEXTE, RNCP_META } from './rncp-cda.js';

export const CDA_THEME_MAP = {
  'analyse-besoins': {
    blocs: ['BC01', 'BC02'],
    competences: ['Analyser les besoins', 'Contribuer à la gestion de projet'],
    livrables: ['Cahier des charges', 'User stories', 'Backlog priorisé'],
    vigilance: ['Justifier le MVP', 'Critères d\'acceptation clairs pour le jury'],
  },
  conception: {
    blocs: ['BC02'],
    competences: ['Définir l\'architecture logicielle', 'Analyser les besoins et maquetter'],
    livrables: ['Dossier de conception', 'Diagrammes UML', 'ADR'],
    vigilance: ['Architecture multicouche ANSSI', 'Schémas lisibles au jury'],
  },
  'choix-stack': {
    blocs: ['BC01', 'BC02'],
    competences: ['Installer l\'environnement', 'Architecture logicielle'],
    livrables: ['Matrice de décision stack', 'POC si doute'],
    vigilance: ['Justifier le choix technologique à l\'oral'],
  },
  'bases-donnees': {
    blocs: ['BC02'],
    competences: ['Concevoir BDD relationnelle', 'Composants d\'accès aux données'],
    livrables: ['MCD/MLD', 'Migrations', 'Requêtes documentées'],
    vigilance: ['Normalisation et contraintes', 'Sécurité des accès SQL'],
  },
  'maquettage-ux': {
    blocs: ['BC02'],
    competences: ['Maquetter une application', 'Développer des interfaces utilisateur'],
    livrables: ['Wireframes', 'Maquettes', 'Prototype'],
    vigilance: ['RGAA dès la conception', 'Parcours utilisateur explicite'],
  },
  'dev-frontend': {
    blocs: ['BC01'],
    competences: ['Développer des interfaces utilisateur'],
    livrables: ['UI responsive', 'Composants réutilisables'],
    vigilance: ['Accessibilité WCAG', 'Séparation présentation / logique'],
  },
  'dev-backend': {
    blocs: ['BC01', 'BC02'],
    competences: ['Développer des composants métier', 'Accès aux données'],
    livrables: ['API REST', 'Services métier', 'Documentation API'],
    vigilance: ['Validation entrées', 'Gestion erreurs centralisée'],
  },
  'auth-securite': {
    blocs: ['BC01', 'BC02', 'BC03'],
    competences: ['Application sécurisée', 'Composants sécurisés'],
    livrables: ['Auth JWT/session', 'RBAC', 'Politique sécurité'],
    vigilance: ['OWASP Top 10', 'Hash mots de passe', 'Principe moindre privilège'],
  },
  tests: {
    blocs: ['BC03'],
    competences: ['Plans de tests'],
    livrables: ['Tests unitaires', 'Tests E2E', 'Rapport couverture'],
    vigilance: ['Couverture > 70 %', 'Scénarios critiques documentés'],
  },
  qa: {
    blocs: ['BC03'],
    competences: ['Plans de tests'],
    livrables: ['Plan QA', 'Rapport bugs', 'UAT signée'],
    vigilance: ['Recette client formalisée', 'Zero bug bloquant'],
  },
  performance: {
    blocs: ['BC03'],
    competences: ['Application performante'],
    livrables: ['Rapport Lighthouse', 'Optimisations documentées'],
    vigilance: ['Web Vitals', 'Mesures avant/après'],
  },
  'stress-test': {
    blocs: ['BC03'],
    competences: ['Préparer le déploiement'],
    livrables: ['Rapport charge', 'Limites système'],
    vigilance: ['Scénarios réalistes', 'Métriques p95/p99'],
  },
  securite: {
    blocs: ['BC03'],
    competences: ['Application sécurisée'],
    livrables: ['Rapport audit OWASP', 'Correctifs appliqués'],
    vigilance: ['Scan ZAP', 'Headers sécurité', 'RGPD'],
  },
  devops: {
    blocs: ['BC03'],
    competences: ['Mise en production DevOps'],
    livrables: ['Dockerfile', 'docker-compose', 'Runbook'],
    vigilance: ['Reproductibilité environnements', 'Secrets hors code'],
  },
  cicd: {
    blocs: ['BC03'],
    competences: ['DevOps', 'Déploiement documenté'],
    livrables: ['Pipeline CI/CD', 'Deploy staging/prod'],
    vigilance: ['Tests dans la CI', 'Rollback testé'],
  },
  infrastructure: {
    blocs: ['BC03'],
    competences: ['Préparer le déploiement'],
    livrables: ['Infra documentée', 'Nginx/reverse proxy'],
    vigilance: ['SSH sécurisé', 'Firewall', 'IaC versionnée'],
  },
  deploiement: {
    blocs: ['BC03'],
    competences: ['Documenter le déploiement', 'Mise en production'],
    livrables: ['Guide deploy', 'SSL', 'Health checks'],
    vigilance: ['Variables env prod', 'Checklist post-deploy'],
  },
  monitoring: {
    blocs: ['BC03'],
    competences: ['Mise en production'],
    livrables: ['Dashboards', 'Alertes', 'Runbooks'],
    vigilance: ['Observabilité dès J1 prod', 'SLI/SLO si possible'],
  },
  maintenance: {
    blocs: ['BC01', 'BC03'],
    competences: ['Veille', 'Documentation'],
    livrables: ['Backups', 'Changelog', 'PRA'],
    vigilance: ['Restauration testée', 'Dependabot actif'],
  },
};

export function getCdaInfoForTheme(themeId) {
  return CDA_THEME_MAP[themeId] ?? null;
}

export function renderCdaPanel(themeId) {
  const info = getCdaInfoForTheme(themeId);
  if (!info) return '';

  const blocsDetail = info.blocs
    .map((id) => RNCP_BLOCS.find((b) => b.id === id))
    .filter(Boolean);

  return `
    <section class="theme-card cda-panel">
      <div class="cda-panel-header">
        <span class="cda-badge">Mode CDA</span>
        <span class="cda-code">${RNCP_META.code} — ${RNCP_META.intitule}</span>
      </div>
      <p class="cda-context">${RNCP_CONTEXTE.securite}</p>
      ${blocsDetail.map((b) => `
        <div class="cda-bloc">
          <h3>${b.id} — ${b.titre}</h3>
          <p class="text-muted">Épreuve : ${b.dureeEpreuve}</p>
        </div>`).join('')}
      <div class="cda-grid">
        <div>
          <h4>Compétences RNCP</h4>
          <ul>${info.competences.map((c) => `<li>${c}</li>`).join('')}</ul>
        </div>
        <div>
          <h4>Livrables attendus</h4>
          <ul>${info.livrables.map((l) => `<li>${l}</li>`).join('')}</ul>
        </div>
        <div>
          <h4>Points de vigilance (examen)</h4>
          <ul class="cda-vigilance">${info.vigilance.map((v) => `<li>${v}</li>`).join('')}</ul>
        </div>
      </div>
    </section>`;
}
