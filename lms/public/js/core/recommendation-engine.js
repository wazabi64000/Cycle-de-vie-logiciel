import { SCORE_CATEGORIES } from '../config/score-categories.js';
import { getMaturityStage } from '../config/maturity.js';

/** Moteur de recommandations intelligentes */
export function generateRecommendations(state) {
  const recs = [];
  const { categoryScores, project, courseProgress, modules } = state;

  if ((categoryScores.tests ?? 0) < 50) {
    recs.push({
      type: 'warning',
      priority: 'high',
      icon: '⚠️',
      title: 'Tests insuffisants',
      message:
        'Votre projet présente un risque élevé de régression. Finalisez les tests avant le déploiement.',
      action: { label: 'Module Tests', href: 'module.html?slug=12-tests' },
    });
  }

  if ((categoryScores.security ?? 0) < 50) {
    recs.push({
      type: 'warning',
      priority: 'high',
      icon: '🔒',
      title: 'Sécurité à renforcer',
      message:
        'Votre application nécessite un audit de sécurité avant mise en production.',
      action: { label: 'Module Sécurité', href: 'module.html?slug=13-securite' },
    });
  }

  if ((categoryScores.cicd ?? 0) < 30) {
    recs.push({
      type: 'info',
      priority: 'medium',
      icon: '🔄',
      title: 'CI/CD absent',
      message: 'Automatisez vos déploiements afin de réduire les erreurs humaines.',
      action: { label: 'Module CI/CD', href: 'module.html?slug=15-cicd' },
    });
  }

  if ((categoryScores.deployment ?? 0) < 40 && project.progress >= 60) {
    recs.push({
      type: 'info',
      priority: 'medium',
      icon: '🌐',
      title: 'Déploiement en attente',
      message: 'Votre MVP est prêt. Passez à la mise en production.',
      action: { label: 'Module Déploiement', href: 'module.html?slug=18-deploiement' },
    });
  }

  if (courseProgress < 30) {
    recs.push({
      type: 'tip',
      priority: 'low',
      icon: '📚',
      title: 'Continuez vos cours',
      message: 'Complétez les modules fondamentaux pour débloquer le score maximum.',
      action: { label: 'Tableau de bord', href: 'dashboard.html' },
    });
  }

  const weakCategories = Object.entries(categoryScores)
    .filter(([, score]) => score < 40)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2);

  weakCategories.forEach(([key, score]) => {
    const cat = SCORE_CATEGORIES[key];
    if (!cat) return;
    const already = recs.some((r) => r.title.includes(cat.label));
    if (already) return;
    recs.push({
      type: 'tip',
      priority: 'low',
      icon: '📈',
      title: `Renforcer : ${cat.label}`,
      message: `Score actuel : ${score}/100. Concentrez-vous sur les modules associés.`,
      action: cat.modules[0]
        ? { label: cat.label, href: `module.html?slug=${cat.modules[0]}` }
        : null,
    });
  });

  const maturity = getMaturityStage(project.progress);
  if (maturity.id === 'mvp' || maturity.id === 'production') {
    recs.unshift({
      type: 'success',
      priority: 'low',
      icon: '🎯',
      title: 'Bonne progression projet',
      message: maturity.message,
      action: null,
    });
  }

  const incompleteModules = Object.entries(modules)
    .filter(([, m]) => {
      const ped = Object.values(m.pedagogique || {}).filter(Boolean).length;
      return ped < 2;
    })
    .slice(0, 1);

  if (incompleteModules.length && courseProgress > 10) {
    const [slug] = incompleteModules[0];
    recs.push({
      type: 'tip',
      priority: 'medium',
      icon: '▶️',
      title: 'Module en cours',
      message: `Reprenez le module « ${slug.replace(/^\d+-/, '').replace(/-/g, ' ')} ».`,
      action: { label: 'Continuer', href: `module.html?slug=${slug}` },
    });
  }

  return recs.sort((a, b) => {
    const p = { high: 0, medium: 1, low: 2 };
    return (p[a.priority] ?? 2) - (p[b.priority] ?? 2);
  });
}
