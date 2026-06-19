/** Modes spécifiques par formation — compétences, livrables, vigilance */

import { renderCdaPanel } from '../cda-roadmap-map.js';

export const FORMATION_MODES = {
  cda: { label: 'Mode CDA', badge: 'RNCP37873' },
  dwwm: {
    label: 'Mode DWWM',
    badge: 'RNCP37674',
    intro: 'Titre Développeur Web et Web Mobile — sites vitrines, apps web, intégration, accessibilité.',
    competences: ['Intégrer une maquette', 'Dynamiser une interface', 'Mettre en place BDD', 'Accès sécurisé BDD', 'Composants métier côté serveur'],
    livrables: ['Maquettes intégrées', 'Site responsive', 'Application CRUD', 'Documentation technique'],
    vigilance: ['RGAA niveau AA visé', 'Sécurisation formulaires', 'Validation côté serveur', 'Git obligatoire'],
  },
  cyber: {
    label: 'Mode Cybersécurité',
    badge: 'Initiation',
    intro: 'Sensibilisation et pratiques défensives — CIA, OWASP, durcissement, réponse incident.',
    competences: ['Identifier menaces', 'Bonnes pratiques auth', 'OWASP Top 10', 'Durcir poste/serveur'],
    livrables: ['Audit basique', 'Politique mots de passe', 'Rapport scan ZAP', 'Plan sensibilisation'],
    vigilance: ['Usage éthique OSINT', 'Autorisation avant pentest', 'RGPD', 'Signalement incidents'],
  },
  reseaux: {
    label: 'Mode Réseaux',
    badge: 'Infrastructure',
    intro: 'Architectures réseau — OSI, TCP/IP, VLAN, types LAN/WAN/VPN.',
    competences: ['Plan adressage IP', 'Configurer VLAN', 'Dépanner connectivité', 'Schémas réseau'],
    livrables: ['Schéma réseau', 'Plan IPAM', 'Fiches types réseau', 'Checklist dépannage'],
    vigilance: ['Pas de scan sans autorisation', 'Documenter changements', 'Backup configs'],
  },
  linux: {
    label: 'Mode Linux',
    badge: 'Administration',
    intro: 'Administration GNU/Linux — utilisateurs, services, sécurité, Bash.',
    competences: ['Permissions', 'systemd', 'SSH sécurisé', 'Scripts Bash'],
    livrables: ['Serveur durci', 'Runbook', 'Scripts maintenance', 'Logs centralisés'],
    vigilance: ['Pas de root direct prod', 'Tester en staging', 'Backups avant changement'],
  },
  devops: {
    label: 'Mode DevOps',
    badge: 'Pipeline',
    intro: 'Git, CI/CD, conteneurs, observabilité, IaC.',
    competences: ['Pipeline CI/CD', 'Conteneurisation', 'Monitoring', 'Automatisation infra'],
    livrables: ['Dockerfile + compose', 'Pipeline CI', 'Dashboard Grafana', 'IaC'],
    vigilance: ['Secrets hors Git', 'Rollback testé', 'Staging avant prod'],
  },
  cloud: {
    label: 'Mode Cloud',
    badge: 'Multi-provider',
    intro: 'AWS, Azure, GCP — responsabilité partagée, coûts, sécurité.',
    competences: ['Provisionner ressources', 'IAM least privilege', 'Estimer coûts', 'Architecture résiliente'],
    livrables: ['Diagramme architecture', 'Compte sécurisé', 'Stratégie backup', 'Alertes billing'],
    vigilance: ['Free tier limits', 'Billing alerts', 'Régions EU', 'Cleanup ressources'],
  },
};

export function getFormationMode(modeKey) {
  return FORMATION_MODES[modeKey] ?? null;
}

export function renderFormationModePanel(modeKey, moduleId) {
  if (modeKey === 'cda' && moduleId) return renderCdaPanel(moduleId);
  const mode = FORMATION_MODES[modeKey];
  if (!mode?.competences) return '';
  return `
    <section class="theme-card cda-panel formation-mode-panel">
      <div class="cda-panel-header">
        <span class="cda-badge">${mode.label}</span>
        <span class="cda-code">${mode.badge}</span>
      </div>
      <p class="cda-context">${mode.intro}</p>
      <div class="cda-grid">
        <div><h4>Compétences visées</h4><ul>${mode.competences.map((c) => `<li>${c}</li>`).join('')}</ul></div>
        <div><h4>Livrables attendus</h4><ul>${mode.livrables.map((l) => `<li>${l}</li>`).join('')}</ul></div>
        <div><h4>Points de vigilance</h4><ul class="cda-vigilance">${mode.vigilance.map((v) => `<li>${v}</li>`).join('')}</ul></div>
      </div>
    </section>`;
}
