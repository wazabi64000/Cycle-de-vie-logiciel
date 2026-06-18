import { progressEngine } from '../core/progress-engine.js';
import { storage } from '../core/storage.js';
import { getLevelForScore } from '../config/levels.js';
import { SCORE_CATEGORIES, CATEGORY_KEYS } from '../config/score-categories.js';
import { BADGES } from '../config/badges.js';
import { animateCounter } from '../ui/animations.js';
import confetti from '../ui/confetti.js';
import { modulesIndexUrl, href } from '../core/paths.js';

async function init() {
  const res = await fetch(modulesIndexUrl());
  const data = await res.json();
  const slugs = data.modules.map((m) => m.slug);
  const saved = storage.loadProgress();
  progressEngine.init(slugs, saved?.learner?.name);

  const state = progressEngine.getState();

  if (!progressEngine.isCursusComplete() && state.courseProgress < 90) {
    document.getElementById('completion-locked').hidden = false;
    document.getElementById('completion-content').hidden = true;
    return;
  }

  document.getElementById('completion-locked').hidden = true;
  document.getElementById('completion-content').hidden = false;

  const level = getLevelForScore(state.globalScore);
  document.getElementById('final-name').textContent = state.learner.name;
  document.getElementById('final-level').textContent = `${level.icon} ${level.name}`;

  animateCounter(document.getElementById('final-score'), state.globalScore, 2000);

  const skillsEl = document.getElementById('validated-skills');
  skillsEl.innerHTML = CATEGORY_KEYS
    .filter((k) => state.categoryScores[k] >= 70)
    .map((k) => `<li>${SCORE_CATEGORIES[k].label} — ${state.categoryScores[k]}/100</li>`)
    .join('') || '<li>Compétences en cours de validation</li>';

  const badgesEl = document.getElementById('final-badges');
  badgesEl.innerHTML = state.badges
    .map((b) => {
      const meta = BADGES.find((x) => x.id === b.id);
      return meta ? `<span class="final-badge">${meta.icon} ${meta.name}</span>` : '';
    })
    .join('');

  storage.saveProgress(state);
  storage.setLastVisit();
  storage.setLevel(level.id);

  confetti();

  document.getElementById('view-certificate')?.addEventListener('click', () => {
    window.location.href = href('certificate.html');
  });
}

document.addEventListener('DOMContentLoaded', init);
