import { ROADMAP_THEMES, ROADMAP_META, CHECKLIST_LEVELS } from '../config/roadmap-themes.js';
import { roadmapEngine } from '../core/roadmap-engine.js';
import { searchRoadmap } from '../core/roadmap-search.js';
import { roadmapStorage } from '../core/roadmap-storage.js';
import { getLevelProgress } from '../config/levels.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let activeSlug = null;

export function renderSidebar(container) {
  const score = roadmapEngine.getScore();
  const level = roadmapEngine.getLevel();
  const globalPct = roadmapEngine.getGlobalProgress();

  container.innerHTML = `
    <div class="sidebar-brand">
      <a href="index.html" class="sidebar-logo">Wazaby<span>Code</span></a>
      <p class="sidebar-tagline">${ROADMAP_META.tagline}</p>
    </div>
    <div class="sidebar-score">
      <div class="sidebar-score-row">
        <span class="sidebar-score-value">${score}</span>
        <span class="sidebar-score-max">/ 1000</span>
      </div>
      <div class="sidebar-level">${level.icon} ${level.name}</div>
      <div class="progress-track sidebar-progress"><div class="progress-fill" style="width:${globalPct}%"></div></div>
      <span class="sidebar-pct">${globalPct} % global</span>
    </div>
    <nav class="sidebar-nav" aria-label="Thèmes roadmap">
      ${ROADMAP_THEMES.map((t) => {
        const pct = roadmapEngine.getThemeProgress(t.id);
        return `
        <a href="#${t.slug}" class="sidebar-link${activeSlug === t.slug ? ' active' : ''}" data-slug="${t.slug}">
          <span class="sidebar-link-icon">${t.icon}</span>
          <span class="sidebar-link-text">
            <span class="sidebar-link-title">${t.num}. ${t.title}</span>
            <span class="sidebar-link-pct">${pct} %</span>
          </span>
        </a>`;
      }).join('')}
    </nav>
    <div class="sidebar-footer">
      <a href="index.html" class="sidebar-footer-link">Accueil</a>
      <button type="button" id="sidebar-reset" class="sidebar-footer-link btn-link">Recommencer</button>
    </div>`;

  $$('.sidebar-link', container).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.slug);
    });
  });

  $('#sidebar-reset', container)?.addEventListener('click', () => {
    if (confirm('Effacer toute la progression ? Cette action est irréversible.')) {
      roadmapEngine.reset();
      navigateTo(ROADMAP_THEMES[0].slug);
      renderSidebar(container);
    }
  });
}

export function renderTopbar(container) {
  container.innerHTML = `
    <button type="button" class="sidebar-toggle" id="sidebar-toggle" aria-label="Menu">☰</button>
    <div class="search-wrap">
      <input type="search" id="global-search" class="search-input" placeholder="Rechercher : Docker, Jest, OWASP, CI/CD…" autocomplete="off">
      <div id="search-dropdown" class="search-dropdown" hidden></div>
    </div>
    <button type="button" id="theme-toggle" class="btn-icon" aria-label="Thème">🌓</button>`;

  $('#theme-toggle', container)?.addEventListener('click', () => roadmapStorage.toggleTheme());

  const input = $('#global-search', container);
  const dropdown = $('#search-dropdown', container);
  input?.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) {
      dropdown.hidden = true;
      return;
    }
    const results = searchRoadmap(q);
    if (!results.length) {
      dropdown.innerHTML = '<p class="search-empty">Aucun résultat</p>';
    } else {
      dropdown.innerHTML = results
        .map(
          (r) => `
        <button type="button" class="search-result" data-slug="${r.themeId}">
          <strong>${r.title}</strong>
          <span>${r.snippet}</span>
        </button>`
        )
        .join('');
      $$('.search-result', dropdown).forEach((btn) => {
        btn.addEventListener('click', () => {
          navigateTo(btn.dataset.slug);
          input.value = '';
          dropdown.hidden = true;
        });
      });
    }
    dropdown.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) dropdown.hidden = true;
  });

  $('#sidebar-toggle', container)?.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });
}

function renderChecklistGroup(theme, levelId, levelLabel, color) {
  const items = theme.checklists[levelId];
  return `
    <div class="checklist-group">
      <h3 class="checklist-level-title" style="--cl-color:${color}">${levelLabel}</h3>
      ${items
        .map(
          (item) => `
        <label class="roadmap-check${roadmapEngine.isChecked(theme.id, levelId, item.id) ? ' checked' : ''}">
          <input type="checkbox" data-theme="${theme.id}" data-level="${levelId}" data-item="${item.id}"
            ${roadmapEngine.isChecked(theme.id, levelId, item.id) ? 'checked' : ''}>
          <span class="roadmap-check-box"></span>
          <span>${item.label}</span>
        </label>`
        )
        .join('')}
    </div>`;
}

export function renderTheme(container, slug) {
  const theme = ROADMAP_THEMES.find((t) => t.slug === slug);
  if (!theme) return;

  activeSlug = slug;
  roadmapEngine.setLastTheme(theme);

  const pct = roadmapEngine.getThemeProgress(theme.id);
  const score = roadmapEngine.getScore();
  const level = roadmapEngine.getLevel();
  const levelPct = getLevelProgress(score);

  container.innerHTML = `
    <header class="theme-header">
      <span class="theme-icon">${theme.icon}</span>
      <div>
        <p class="theme-num">Thème ${theme.num} / ${ROADMAP_THEMES.length}</p>
        <h1>${theme.title}</h1>
      </div>
      <div class="theme-header-stats">
        <div class="theme-stat"><strong>${pct}%</strong><span>Thème</span></div>
        <div class="theme-stat"><strong>${score}</strong><span>/ 1000</span></div>
        <div class="theme-stat"><strong>${level.icon}</strong><span>${level.name}</span></div>
      </div>
    </header>

    <div class="progress-track theme-progress"><div class="progress-fill" style="width:${pct}%"></div></div>

    <section class="theme-card">
      <h2>Pourquoi cette étape ?</h2>
      <p>${theme.why}</p>
    </section>

    ${theme.topics
      .map(
        (topic) => `
      <section class="theme-card">
        <h2>${topic.title}</h2>
        <p>${topic.body}</p>
      </section>`
      )
      .join('')}

    <section class="theme-card">
      <h2>Outils recommandés</h2>
      <div class="tool-chips">
        ${theme.tools.map((t) => `<span class="tool-chip">${t}</span>`).join('')}
      </div>
    </section>

    <section class="theme-card checklists-section">
      <h2>Checklists</h2>
      <p class="text-muted">Cochez au fur et à mesure — sauvegarde automatique.</p>
      ${CHECKLIST_LEVELS.map((l) => renderChecklistGroup(theme, l.id, l.label, l.color)).join('')}
    </section>

    <nav class="theme-nav">
      ${theme.num > 1 ? `<a href="#${ROADMAP_THEMES[theme.num - 2].slug}" class="btn btn-ghost theme-nav-prev" data-slug="${ROADMAP_THEMES[theme.num - 2].slug}">← Précédent</a>` : '<span></span>'}
      ${theme.num < ROADMAP_THEMES.length ? `<a href="#${ROADMAP_THEMES[theme.num].slug}" class="btn btn-primary theme-nav-next" data-slug="${ROADMAP_THEMES[theme.num].slug}">Suivant →</a>` : `<a href="completion.html" class="btn btn-primary">Terminer le parcours →</a>`}
    </nav>`;

  $$('input[type="checkbox"]', container).forEach((cb) => {
    cb.addEventListener('change', () => {
      roadmapEngine.toggle(cb.dataset.theme, cb.dataset.level, cb.dataset.item, cb.checked);
      cb.closest('.roadmap-check')?.classList.toggle('checked', cb.checked);
      updateProgressUI();
      if (roadmapEngine.isComplete()) {
        setTimeout(() => { window.location.href = 'completion.html'; }, 800);
      }
    });
  });

  $$('[data-slug]', container).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.slug);
    });
  });
}

function updateProgressUI() {
  const sidebar = $('#sidebar');
  if (sidebar) renderSidebar(sidebar);
  const stats = $('.theme-header-stats');
  if (stats && activeSlug) {
    const theme = ROADMAP_THEMES.find((t) => t.slug === activeSlug);
    if (theme) {
      const pct = roadmapEngine.getThemeProgress(theme.id);
      $('.theme-progress .progress-fill')?.style.setProperty('width', `${pct}%`);
      const firstStat = $('.theme-stat strong', stats);
      if (firstStat) firstStat.textContent = `${pct}%`;
    }
  }
}

export function navigateTo(slug) {
  const theme = ROADMAP_THEMES.find((t) => t.slug === slug);
  if (!theme) return;
  activeSlug = slug;
  window.location.hash = slug;
  const content = $('#roadmap-content');
  if (content) renderTheme(content, slug);
  const sidebar = $('#sidebar');
  if (sidebar) {
    $$('.sidebar-link', sidebar).forEach((l) => l.classList.toggle('active', l.dataset.slug === slug));
  }
  document.body.classList.remove('sidebar-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function showResumeModal() {
  if (sessionStorage.getItem('wazabycode_resume_dismissed') === '1') return;
  const state = roadmapEngine.getState();
  if (!state.lastTheme || !roadmapEngine.hasProgress()) return;

  const pct = roadmapEngine.getGlobalProgress();
  const title = state.lastThemeTitle || state.lastTheme;

  const modal = document.createElement('div');
  modal.className = 'resume-overlay visible';
  modal.innerHTML = `
    <div class="resume-modal">
      <div class="resume-icon">👋</div>
      <h2>Bienvenue sur WazabyCode</h2>
      <p>Vous vous êtes arrêté à :</p>
      <p class="resume-theme"><strong>${title}</strong></p>
      <p>Progression actuelle : <strong>${pct} %</strong></p>
      <div class="resume-actions">
        <button type="button" class="btn btn-primary" id="resume-continue">Reprendre</button>
        <button type="button" class="btn btn-ghost" id="resume-restart">Recommencer</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  $('#resume-continue', modal)?.addEventListener('click', () => {
    sessionStorage.setItem('wazabycode_resume_dismissed', '1');
    modal.remove();
    navigateTo(state.lastTheme);
  });
  $('#resume-restart', modal)?.addEventListener('click', () => {
    if (confirm('Effacer toute la progression ?')) {
      roadmapEngine.reset();
      sessionStorage.setItem('wazabycode_resume_dismissed', '1');
      modal.remove();
      navigateTo(ROADMAP_THEMES[0].slug);
      renderSidebar($('#sidebar'));
    }
  });
}

export function initRoadmapApp() {
  renderSidebar($('#sidebar'));
  renderTopbar($('#topbar'));

  const hash = window.location.hash.replace('#', '');
  const slug = hash && ROADMAP_THEMES.some((t) => t.slug === hash)
    ? hash
    : roadmapEngine.getState().lastTheme || ROADMAP_THEMES[0].slug;

  renderTheme($('#roadmap-content'), slug);
  activeSlug = slug;
  if (!hash) window.location.hash = slug;

  window.addEventListener('hashchange', () => {
    const s = window.location.hash.replace('#', '');
    if (s && s !== activeSlug) navigateTo(s);
  });

  showResumeModal();
}
