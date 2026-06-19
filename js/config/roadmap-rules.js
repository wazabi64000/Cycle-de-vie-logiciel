/** Règles de recommandations automatiques */

export const ROADMAP_RULES = [
  {
    id: 'frontend-without-ux',
    message: 'Attention : le maquettage semble avoir été ignoré avant le développement frontend.',
    severity: 'warning',
    check(engine) {
      const ux = engine.getThemeCheckedCount('maquettage-ux');
      const fe = engine.getThemeCheckedCount('dev-frontend');
      return fe >= 2 && ux === 0;
    },
  },
  {
    id: 'backend-without-db',
    message: 'Le backend avance sans schéma de base de données validé — risque de dette technique.',
    severity: 'warning',
    check(engine) {
      const db = engine.getThemeCheckedCount('bases-donnees');
      const be = engine.getThemeCheckedCount('dev-backend');
      return be >= 2 && db === 0;
    },
  },
  {
    id: 'deploy-without-tests',
    message: 'Déploiement en cours sans tests automatisés suffisants.',
    severity: 'danger',
    check(engine) {
      const tests = engine.getThemeCheckedCount('tests');
      const deploy = engine.getThemeCheckedCount('deploiement');
      return deploy >= 1 && tests < 2;
    },
  },
  {
    id: 'prod-without-monitoring',
    message: 'Application déployée sans monitoring configuré — incidents difficiles à détecter.',
    severity: 'warning',
    check(engine) {
      const mon = engine.getThemeCheckedCount('monitoring');
      const deploy = engine.getThemeCheckedCount('deploiement');
      return deploy >= 2 && mon === 0;
    },
  },
  {
    id: 'cicd-without-devops',
    message: 'Pipeline CI/CD sans conteneurisation — environnements potentiellement divergents.',
    severity: 'info',
    check(engine) {
      const cicd = engine.getThemeCheckedCount('cicd');
      const devops = engine.getThemeCheckedCount('devops');
      return cicd >= 2 && devops === 0;
    },
  },
  {
    id: 'conception-skipped',
    message: 'Développement lancé sans conception documentée — risque de refonte.',
    severity: 'warning',
    check(engine) {
      const conc = engine.getThemeCheckedCount('conception');
      const fe = engine.getThemeCheckedCount('dev-frontend');
      const be = engine.getThemeCheckedCount('dev-backend');
      return (fe >= 1 || be >= 1) && conc === 0;
    },
  },
  {
    id: 'security-last',
    message: 'Étapes avancées cochées sans audit sécurité de base.',
    severity: 'info',
    check(engine) {
      const sec = engine.getThemeCheckedCount('securite');
      const adv = engine.getThemeCheckedCount('deploiement') + engine.getThemeCheckedCount('cicd');
      return adv >= 2 && sec === 0;
    },
  },
];

export function evaluateRules(engine) {
  return ROADMAP_RULES.filter((rule) => {
    try {
      return rule.check(engine);
    } catch {
      return false;
    }
  });
}
