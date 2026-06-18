import { MODULES_CATALOG } from '../config/modules-catalog.js';
import { moduleUrl, courseUrl, href } from '../core/paths.js';
import { learningProgressService } from '../core/learning-progress-service.js';
import { showResumeModal } from '../ui/memory-ui.js';

function renderHomeModules() {
  const container = document.getElementById('home-modules-list');
  if (!container) return;

  container.innerHTML = MODULES_CATALOG.map(
    (mod) => `
    <a href="${moduleUrl(mod.slug)}" class="module-row home-module-row">
      <span class="module-id">${mod.id}</span>
      <div class="module-info">
        <strong>${mod.titre}</strong>
        <span class="module-meta">${mod.duree} · ${mod.niveau} · ${mod.chapitres} chapitres</span>
      </div>
      <span class="module-pct">→</span>
    </a>`
  ).join('');
}

function renderHomeGrid() {
  const grid = document.getElementById('home-modules-grid');
  if (!grid) return;

  grid.innerHTML = MODULES_CATALOG.slice(0, 6).map(
    (mod) => `
    <a href="${courseUrl(mod.slug)}" class="home-module-card">
      <span class="home-module-num">Module ${mod.id}</span>
      <strong>${mod.titre}</strong>
      <span>${mod.duree}</span>
    </a>`
  ).join('');
}

renderHomeModules();
renderHomeGrid();

if (window.location.hash === '#guide') {
  document.querySelector(`.nav-link[href="${href('index.html#guide')}"]`)?.classList.add('active');
  document.querySelector(`.nav-link[href="${href('index.html')}"]`)?.classList.remove('active');
}

if (learningProgressService.hasResumePoint()) {
  const pos = learningProgressService.getLastPosition();
  showResumeModal({ globalProgress: pos.globalProgress || pos.progress || 0 });
}
