import { progressEngine } from '../core/progress-engine.js';
import { storage } from '../core/storage.js';
import { getLevelForScore } from '../config/levels.js';
import { animateCounter } from '../ui/animations.js';
import { initLayout } from '../ui/layout.js';

async function init() {
  initLayout({ page: 'certificate' });
  const res = await fetch('/cours-cda/index.json');
  const data = await res.json();
  const slugs = data.modules.map((m) => m.slug);
  const saved = storage.loadProgress();
  progressEngine.init(slugs, saved?.learner?.name);

  const state = progressEngine.getState();
  const cert = state.certificates.find((c) => c.type === 'cursus');

  if (!cert) {
    document.getElementById('cert-locked').hidden = false;
    document.getElementById('cert-content').hidden = true;
    return;
  }

  document.getElementById('cert-locked').hidden = true;
  document.getElementById('cert-content').hidden = false;

  const level = getLevelForScore(cert.score);
  document.getElementById('cert-name').textContent = cert.name;
  document.getElementById('cert-date').textContent = new Date(cert.date).toLocaleDateString('fr-FR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  document.getElementById('cert-level').textContent = cert.level;
  document.getElementById('cert-score').textContent = `${cert.score} / 1000`;
  document.getElementById('cert-id').textContent = cert.id;

  animateCounter(document.getElementById('cert-score-animated'), cert.score, 1500);
}

document.addEventListener('DOMContentLoaded', init);
