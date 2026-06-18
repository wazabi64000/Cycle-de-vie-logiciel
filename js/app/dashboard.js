import { progressEngine } from '../core/progress-engine.js';
import { generateRecommendations } from '../core/recommendation-engine.js';
import { getLevelForScore, getLevelProgress } from '../config/levels.js';
import { SCORE_CATEGORIES, CATEGORY_KEYS } from '../config/score-categories.js';
import { BADGES } from '../config/badges.js';
import { getMaturityStage } from '../config/maturity.js';
import { eventBus, Events } from '../core/event-bus.js';
import { storage } from '../core/storage.js';
import {
  createProgressRing,
  animateCounter,
  animateProgressBar,
  showBadgeToast,
  staggerIn,
} from '../ui/animations.js';
import { renderProjectChecklist } from '../ui/checklist.js';
import { href, moduleUrl } from '../core/paths.js';
import { loadModulesCatalog } from '../core/modules-loader.js';
import { learningProgressService } from '../core/learning-progress-service.js';
import {
  showResumeModal,
  renderResumeBar,
  renderLearningHistory,
  renderLearningStats,
} from '../ui/memory-ui.js';

let modulesData = [];

async function loadModules() {
  modulesData = await loadModulesCatalog();
  return modulesData;
}

function renderHeader(state) {
  const level = getLevelForScore(state.globalScore);
  const levelBadge = document.getElementById('level-badge');
  if (levelBadge) {
    levelBadge.innerHTML = `${level.icon} ${level.name}`;
    levelBadge.style.borderColor = level.color;
  }
}

function renderProgressCards(state) {
  const global = progressEngine.getGlobalProgress();

  createProgressRing(document.getElementById('ring-global'), global, {
    size: 140,
    color: 'var(--accent)',
    label: 'Progression globale',
  });

  createProgressRing(document.getElementById('ring-courses'), state.courseProgress, {
    size: 120,
    color: '#3b82f6',
    label: 'Progression des cours',
  });

  createProgressRing(document.getElementById('ring-project'), state.projectProgress, {
    size: 120,
    color: '#22c55e',
    label: 'Progression du projet',
  });

  animateCounter(document.getElementById('score-value'), state.globalScore);
  animateCounter(document.getElementById('time-spent'), state.timeSpent || 0);

  const level = getLevelForScore(state.globalScore);
  const levelPct = getLevelProgress(state.globalScore);
  animateProgressBar(document.getElementById('level-bar'), levelPct);
  document.getElementById('level-label').textContent = `${level.name} — ${levelPct}% vers le niveau suivant`;
}

function renderCategoryScores(state) {
  const container = document.getElementById('category-scores');
  container.innerHTML = CATEGORY_KEYS.map((key) => {
    const cat = SCORE_CATEGORIES[key];
    const score = state.categoryScores[key] ?? 0;
    const pct = Math.round((score / cat.max) * 100);
    return `
      <div class="category-card" style="--cat-color: ${cat.color}">
        <div class="category-header">
          <span>${cat.label}</span>
          <strong>${score}/${cat.max}</strong>
        </div>
        <div class="progress-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" data-target="${pct}" style="width:0;background:${cat.color}"></div>
        </div>
      </div>`;
  }).join('');

  container.querySelectorAll('.progress-fill').forEach((bar) => {
    animateProgressBar(bar, Number(bar.dataset.target));
  });
}

function renderMaturity(state) {
  const stage = getMaturityStage(state.project.progress);
  const el = document.getElementById('maturity-banner');
  el.className = `maturity-banner maturity-${stage.id}`;
  el.innerHTML = `
    <span class="maturity-icon">📊</span>
    <div>
      <strong>Stade : ${stage.label}</strong>
      <p>${stage.message}</p>
      <div class="progress-track">
        <div class="progress-fill" id="maturity-bar" style="width:0;background:var(--accent)"></div>
      </div>
    </div>`;
  animateProgressBar(document.getElementById('maturity-bar'), state.project.progress);
}

function renderRecommendations(state) {
  const recs = generateRecommendations(state);
  const container = document.getElementById('recommendations');
  container.innerHTML = recs.length
    ? recs
        .map(
          (r) => `
      <article class="rec-card rec-${r.type}">
        <span class="rec-icon">${r.icon}</span>
        <div>
          <strong>${r.title}</strong>
          <p>${r.message}</p>
          ${r.action ? `<a href="${r.action.href}" class="rec-action">${r.action.label} →</a>` : ''}
        </div>
      </article>`
        )
        .join('')
    : '<p class="empty-state">Aucune recommandation — vous êtes sur la bonne voie !</p>';
}

function renderBadges(state) {
  const earned = new Set(state.badges.map((b) => b.id));
  const container = document.getElementById('badges-grid');
  container.innerHTML = BADGES.map((badge) => {
    const entry = state.badges.find((b) => b.id === badge.id);
    const unlocked = earned.has(badge.id);
    const date = entry ? new Date(entry.earnedAt).toLocaleDateString('fr-FR') : '';
    return `
      <div class="badge-card ${unlocked ? 'unlocked' : 'locked'}" title="${badge.description}">
        <span class="badge-icon">${badge.icon}</span>
        <span class="badge-name">${badge.name}</span>
        ${unlocked ? `<span class="badge-date">${date}</span>` : '<span class="badge-lock">🔒</span>'}
      </div>`;
  }).join('');
}

function renderModulesList(state) {
  const container = document.getElementById('modules-list');
  if (!container) return;

  if (!modulesData.length) {
    container.innerHTML = `
      <p class="empty-state">Impossible de charger les modules. Rechargez la page.</p>`;
    return;
  }

  container.innerHTML = modulesData
    .map((mod) => {
      const modState = state.modules[mod.slug];
      const ped = modState?.pedagogique ?? {};
      const done = Object.values(ped).filter(Boolean).length;
      const total = 4;
      const pct = Math.round((done / total) * 100);
      return `
      <a href="${moduleUrl(mod.slug)}" class="module-row">
        <span class="module-id">${mod.id}</span>
        <div class="module-info">
          <strong>${mod.titre}</strong>
          <div class="progress-track small">
            <div class="progress-fill" data-target="${pct}" style="width:0"></div>
          </div>
        </div>
        <span class="module-pct">${pct}%</span>
      </a>`;
    })
    .join('');

  container.querySelectorAll('.progress-fill').forEach((bar, i) => {
    setTimeout(() => animateProgressBar(bar, Number(bar.dataset.target), 600), i * 40);
  });
}

function renderProjectChecklistSection(state) {
  renderProjectChecklist(document.getElementById('project-checklist'), state);
}

function renderMemorySections(state) {
  const global = progressEngine.getGlobalProgress();
  renderResumeBar(document.getElementById('resume-bar-section'), global);
  renderLearningStats(document.getElementById('learning-stats'), state);
  renderLearningHistory(document.getElementById('learning-history'));
}

function refreshDashboard() {
  const state = progressEngine.getState();
  renderHeader(state);
  renderMemorySections(state);
  renderProgressCards(state);
  renderCategoryScores(state);
  renderMaturity(state);
  renderRecommendations(state);
  renderBadges(state);
  renderModulesList(state);
  renderProjectChecklistSection(state);

  if (progressEngine.isCursusComplete()) {
    window.location.href = href('completion.html');
  }
}

async function init() {
  try {
    const modules = await loadModules();
    const slugs = modules.map((m) => m.slug);

  const nameInput = document.getElementById('name-input');
  const saved = storage.loadProgress();
  progressEngine.init(slugs, saved?.learner?.name);

  if (nameInput) {
    nameInput.value = progressEngine.getState().learner.name;
    nameInput.addEventListener('change', () => {
      progressEngine.setLearnerName(nameInput.value || 'Apprenant');
      refreshDashboard();
    });
  }

  eventBus.on(Events.PROGRESS_UPDATED, refreshDashboard);
  eventBus.on(Events.LEARNING_SAVED, refreshDashboard);
  eventBus.on(Events.BADGE_UNLOCKED, showBadgeToast);
  eventBus.on(Events.LEVEL_UP, (level) => showBadgeToast({ icon: level.icon, name: level.name, description: 'Nouveau niveau atteint !' }));

  refreshDashboard();
  learningProgressService.updateStatistics(progressEngine.getState());

  showResumeModal({ globalProgress: progressEngine.getGlobalProgress() });

  staggerIn(document.querySelectorAll('.dashboard-card'));
  } catch (err) {
    console.error('Dashboard init:', err);
    const list = document.getElementById('modules-list');
    if (list) {
      list.innerHTML = `<p class="empty-state">Erreur de chargement. <a href="${href('index.html')}">Retour accueil</a></p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
