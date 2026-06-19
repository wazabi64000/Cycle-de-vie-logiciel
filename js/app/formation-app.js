/**
 * WazabyCode Academy — app formation (multi-parcours)
 */
import {
  getFormation,
  getFormationModules,
  FORMATIONS,
  ACADEMY_META,
  CHECKLIST_LEVELS,
  NETWORK_TYPES,
} from '../config/academy/index.js';
import { academyEngine } from '../core/academy-engine.js';
import { academyStorage } from '../core/academy-storage.js';
import { searchFormationModules } from '../core/academy-search.js';
import { getChecklistKnowledge } from '../config/checklist-knowledge.js';
import { openChecklistModal } from '../ui/knowledge-modal.js';
import { initToolsSection } from '../ui/tools-section.js';
import { evaluateRules } from '../config/roadmap-rules.js';
import { renderFormationModePanel, getFormationMode } from '../config/academy/modes.js';
import { initQuizSection } from '../ui/quiz-section.js';
import { initExerciseSection } from '../ui/exercise-section.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let activeSlug = null;
let activeFormationId = 'cda';
let modeEnabled = false;

function parseHash() {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash) return { formationId: null, moduleSlug: null };
  const parts = hash.split('/');
  const ids = FORMATIONS.map((f) => f.id);
  if (ids.includes(parts[0])) {
    return { formationId: parts[0], moduleSlug: parts[1] || null };
  }
  return { formationId: 'cda', moduleSlug: hash };
}

function buildHash(formationId, moduleSlug) {
  return `#${formationId}/${moduleSlug}`;
}

function currentFormation() {
  return getFormation(activeFormationId);
}

function modules() {
  return academyEngine.getModules();
}

function isModeOn() {
  return modeEnabled;
}

function setMode(on) {
  modeEnabled = on;
  academyStorage.setModeEnabled(activeFormationId, on);
}

function renderNetworkTypesSection() {
  return `
    <section class="theme-card network-types-section">
      <h2>Types de réseaux — fiches détaillées</h2>
      <div class="network-types-grid">
        ${NETWORK_TYPES.map((t) => `
          <article class="network-type-card">
            <h3>${t.abbr} — ${t.name}</h3>
            <p><strong>Définition :</strong> ${t.definition}</p>
            <pre class="km-diagram">${t.schema}</pre>
            <p><strong>Cas d'usage :</strong> ${t.useCases.join(', ')}</p>
            <p><strong>Avantages :</strong> ${t.pros.join(' · ')}</p>
            <p><strong>Inconvénients :</strong> ${t.cons.join(' · ')}</p>
            <p><strong>Exemple :</strong> ${t.example}</p>
            <ul>${t.checklist.map((c) => `<li>${c}</li>`).join('')}</ul>
          </article>`).join('')}
      </div>
    </section>`;
}

function renderRecommendations() {
  if (activeFormationId !== 'cda') return '';
  const rules = evaluateRules(academyEngine);
  if (!rules.length) return '';
  return `
    <section class="recommendations-panel" aria-live="polite">
      <h2>Recommandations</h2>
      ${rules.map((r) => `<div class="recommendation recommendation-${r.severity}">${r.message}</div>`).join('')}
    </section>`;
}

export function renderSidebar(container) {
  const formation = currentFormation();
  const mods = modules();
  const score = academyEngine.getScore();
  const level = academyEngine.getLevel();
  const globalPct = academyEngine.getGlobalProgress();

  container.innerHTML = `
    <div class="sidebar-brand">
      <a href="index.html" class="sidebar-logo">Wazaby<span>Code</span></a>
      <p class="sidebar-tagline">${ACADEMY_META.name}</p>
    </div>
    <div class="sidebar-formation-pick">
      <a href="formations.html" class="sidebar-formations-link">🎓 Formations</a>
      <span class="sidebar-formation-active" style="--f-color:${formation.color}">${formation.icon} ${formation.fullTitle}</span>
    </div>
    <div class="sidebar-score">
      <div class="sidebar-score-row">
        <span class="sidebar-score-value">${score}</span>
        <span class="sidebar-score-max">/ 1000</span>
      </div>
      <div class="sidebar-level">${level.icon} ${level.name}</div>
      <div class="progress-track sidebar-progress"><div class="progress-fill" style="width:${globalPct}%"></div></div>
      <span class="sidebar-pct">${globalPct} % · ${formation.title}</span>
    </div>
    <nav class="sidebar-nav" aria-label="Modules">
      ${mods.map((m) => {
        const pct = academyEngine.getModuleProgress(m.id);
        return `
        <a href="${buildHash(activeFormationId, m.slug)}" class="sidebar-link${activeSlug === m.slug ? ' active' : ''}" data-slug="${m.slug}">
          <span class="sidebar-link-icon">${m.icon}</span>
          <span class="sidebar-link-text">
            <span class="sidebar-link-title">${m.num}. ${m.title}</span>
            <span class="sidebar-link-pct">${pct} %</span>
          </span>
        </a>`;
      }).join('')}
    </nav>
    <div class="sidebar-footer">
      <a href="formations.html" class="sidebar-footer-link">Changer de formation</a>
      <a href="mes-resultats.html" class="sidebar-footer-link">📊 Mes résultats</a>
      <a href="index.html" class="sidebar-footer-link">Accueil</a>
      ${activeFormationId === 'cda' ? '<a href="certification-rncp.html" class="sidebar-footer-link">RNCP CDA</a>' : ''}
      <button type="button" id="sidebar-reset" class="sidebar-footer-link btn-link">Recommencer</button>
    </div>`;

  $$('.sidebar-link', container).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.slug);
    });
  });

  $('#sidebar-reset', container)?.addEventListener('click', () => {
    if (confirm(`Effacer la progression ${formation.title} ?`)) {
      academyEngine.reset();
      navigateTo(mods[0].slug);
      renderSidebar(container);
    }
  });
}

export function renderTopbar(container) {
  const formation = currentFormation();
  const mode = getFormationMode(formation.modeKey);
  const modeOn = isModeOn();

  container.innerHTML = `
    <button type="button" class="sidebar-toggle" id="sidebar-toggle" aria-label="Menu">☰</button>
    <div class="search-wrap">
      <input type="search" id="global-search" class="search-input" placeholder="Rechercher dans ${formation.title}…" autocomplete="off">
      <div id="search-dropdown" class="search-dropdown" hidden></div>
    </div>
    <button type="button" id="mode-toggle" class="btn-cda${modeOn ? ' active' : ''}" title="${mode?.label ?? 'Mode formation'}">${mode?.label ?? 'Mode'}</button>
    <button type="button" id="theme-toggle" class="btn-icon" aria-label="Thème">🌓</button>`;

  $('#theme-toggle', container)?.addEventListener('click', () => academyStorage.toggleTheme());
  $('#mode-toggle', container)?.addEventListener('click', () => {
    setMode(!isModeOn());
    $('#mode-toggle', container)?.classList.toggle('active', isModeOn());
    const content = $('#roadmap-content');
    if (content && activeSlug) renderModule(content, activeSlug);
  });

  const input = $('#global-search', container);
  const dropdown = $('#search-dropdown', container);
  input?.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { dropdown.hidden = true; return; }
    const results = searchFormationModules(modules(), q);
    dropdown.innerHTML = results.length
      ? results.map((r) => `
        <button type="button" class="search-result" data-slug="${r.slug}">
          <span class="search-result-type">Module</span>
          <strong>${r.title}</strong><span>${r.snippet}</span>
        </button>`).join('')
      : '<p class="search-empty">Aucun résultat</p>';
    $$('.search-result', dropdown).forEach((btn) => {
      btn.addEventListener('click', () => {
        navigateTo(btn.dataset.slug);
        input.value = '';
        dropdown.hidden = true;
      });
    });
    dropdown.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) dropdown.hidden = true;
  });

  $('#sidebar-toggle', container)?.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-open');
  });
}

function renderChecklistGroup(mod, levelId, levelLabel, color) {
  const items = mod.checklists[levelId];
  return `
    <div class="checklist-group">
      <h3 class="checklist-level-title" style="--cl-color:${color}">${levelLabel}</h3>
      ${items.map((item) => {
        const weight = item.weight ?? academyEngine.getItemWeight(mod.id, levelId, item.id);
        const checked = academyEngine.isChecked(mod.id, levelId, item.id);
        return `
        <div class="roadmap-check-row${checked ? ' checked' : ''}">
          <label class="roadmap-check${checked ? ' checked' : ''}">
            <input type="checkbox" data-theme="${mod.id}" data-level="${levelId}" data-item="${item.id}" ${checked ? 'checked' : ''}>
            <span class="roadmap-check-box"></span>
            <span>${item.label}</span>
          </label>
          <span class="check-weight">${Math.round(weight)} pts</span>
          <button type="button" class="btn-details" data-theme="${mod.id}" data-level="${levelId}" data-item="${item.id}" data-label="${item.label.replace(/"/g, '&quot;')}">Détails</button>
        </div>`;
      }).join('')}
    </div>`;
}

function bindChecklistEvents(container, mod) {
  $$('input[type="checkbox"]', container).forEach((cb) => {
    cb.addEventListener('change', () => {
      academyEngine.toggle(cb.dataset.theme, cb.dataset.level, cb.dataset.item, cb.checked);
      const row = cb.closest('.roadmap-check-row');
      row?.classList.toggle('checked', cb.checked);
      row?.querySelector('.roadmap-check')?.classList.toggle('checked', cb.checked);
      updateProgressUI();
      refreshRecommendations(container);
      if (academyEngine.isComplete()) {
        setTimeout(() => { window.location.href = `completion.html?formation=${activeFormationId}`; }, 800);
      }
    });
  });

  $$('.btn-details', container).forEach((btn) => {
    btn.addEventListener('click', () => {
      const knowledge = getChecklistKnowledge(btn.dataset.theme, btn.dataset.level, btn.dataset.label, mod.why);
      const item = mod.checklists[btn.dataset.level]?.find((i) => i.id === btn.dataset.item);
      openChecklistModal(knowledge, item?.weight);
    });
  });
}

function refreshRecommendations(container) {
  const html = renderRecommendations();
  const existing = $('.recommendations-panel', container);
  if (existing) existing.outerHTML = html || '';
  else if (html) $('.theme-header', container)?.insertAdjacentHTML('afterend', html);
}

export function renderModule(container, slug) {
  const mod = modules().find((m) => m.slug === slug);
  if (!mod) return;

  activeSlug = slug;
  academyEngine.setLastModule(mod);

  const formation = currentFormation();
  const mods = modules();
  const pct = academyEngine.getModuleProgress(mod.id);
  const score = academyEngine.getScore();
  const level = academyEngine.getLevel();

  container.innerHTML = `
    <header class="theme-header">
      <span class="theme-icon">${mod.icon}</span>
      <div>
        <p class="theme-num">${formation.icon} ${formation.title} · Module ${mod.num} / ${mods.length}</p>
        <h1>${mod.title}</h1>
      </div>
      <div class="theme-header-stats">
        <div class="theme-stat"><strong>${pct}%</strong><span>Module</span></div>
        <div class="theme-stat"><strong>${score}</strong><span>/ 1000</span></div>
        <div class="theme-stat"><strong>${level.icon}</strong><span>${level.name}</span></div>
      </div>
    </header>
    ${renderRecommendations()}
    <div class="progress-track theme-progress"><div class="progress-fill" style="width:${pct}%"></div></div>
    ${isModeOn() ? renderFormationModePanel(formation.modeKey, mod.id) : ''}
    <section class="theme-card"><h2>Pourquoi ce module ?</h2><p>${mod.why}</p></section>
    ${mod.topics.map((topic) => `
      <section class="theme-card">
        <h2>${topic.title}</h2>
        <p>${topic.body}</p>
      </section>`).join('')}
    ${mod.id === 'types-reseaux' ? renderNetworkTypesSection() : ''}
    <section class="theme-card tools-section-card">
      <h2>Outils recommandés</h2>
      <div id="theme-tools-root"></div>
    </section>
    <section class="theme-card checklists-section">
      <h2>Checklists</h2>
      <p class="text-muted">Débutant · Intermédiaire · Professionnel — sauvegarde automatique.</p>
      ${CHECKLIST_LEVELS.map((l) => renderChecklistGroup(mod, l.id, l.label, l.color)).join('')}
    </section>
    <div id="quiz-mount"></div>
    <div id="exercise-mount"></div>
    <nav class="theme-nav">
      ${mod.num > 1 ? `<a href="${buildHash(activeFormationId, mods[mod.num - 2].slug)}" class="btn btn-ghost" data-slug="${mods[mod.num - 2].slug}">← Précédent</a>` : '<span></span>'}
      ${mod.num < mods.length
    ? `<a href="${buildHash(activeFormationId, mods[mod.num].slug)}" class="btn btn-primary" data-slug="${mods[mod.num].slug}">Suivant →</a>`
    : `<a href="completion.html?formation=${activeFormationId}" class="btn btn-primary">Terminer →</a>`}
    </nav>`;

  bindChecklistEvents(container, mod);
  const toolsRoot = $('#theme-tools-root', container);
  if (toolsRoot) initToolsSection(toolsRoot, mod.tools);
  initQuizSection($('#quiz-mount', container), activeFormationId, mod);
  initExerciseSection($('#exercise-mount', container), activeFormationId, mod);

  $$('[data-slug]', container).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.dataset.slug);
    });
  });
}

function updateProgressUI() {
  renderSidebar($('#sidebar'));
  const stats = $('.theme-header-stats');
  if (stats && activeSlug) {
    const mod = modules().find((m) => m.slug === activeSlug);
    if (mod) {
      const pct = academyEngine.getModuleProgress(mod.id);
      $('.theme-progress .progress-fill')?.style.setProperty('width', `${pct}%`);
      const firstStat = $('.theme-stat strong', stats);
      if (firstStat) firstStat.textContent = `${pct}%`;
      const scoreStat = $$('.theme-stat strong', stats)[1];
      if (scoreStat) scoreStat.textContent = String(academyEngine.getScore());
    }
  }
}

export function navigateTo(slug) {
  const mod = modules().find((m) => m.slug === slug);
  if (!mod) return;
  activeSlug = slug;
  window.location.hash = `${activeFormationId}/${slug}`;
  renderModule($('#roadmap-content'), slug);
  $$('.sidebar-link', $('#sidebar')).forEach((l) => l.classList.toggle('active', l.dataset.slug === slug));
  document.body.classList.remove('sidebar-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function switchFormation(formationId) {
  if (!getFormation(formationId)) return;
  activeFormationId = formationId;
  academyEngine.setFormation(formationId);
  modeEnabled = academyStorage.isModeEnabled(formationId);
  const mods = modules();
  const fs = academyEngine.getFormationState();
  const slug = fs.lastModule && mods.some((m) => m.slug === fs.lastModule) ? fs.lastModule : mods[0]?.slug;
  if (slug) {
    activeSlug = slug;
    window.location.hash = `${formationId}/${slug}`;
    renderSidebar($('#sidebar'));
    renderTopbar($('#topbar'));
    renderModule($('#roadmap-content'), slug);
  }
}

function showResumeModal() {
  if (sessionStorage.getItem('wazabycode_resume_dismissed') === '1') return;
  const fs = academyEngine.getFormationState();
  if (!fs.lastModule || !academyEngine.hasProgress()) return;

  const formation = currentFormation();
  const modal = document.createElement('div');
  modal.className = 'resume-overlay visible';
  modal.innerHTML = `
    <div class="resume-modal">
      <div class="resume-icon">${formation.icon}</div>
      <h2>Bienvenue — ${formation.fullTitle}</h2>
      <p>Reprendre : <strong>${fs.lastModuleTitle || fs.lastModule}</strong></p>
      <p>Progression : <strong>${academyEngine.getGlobalProgress()} %</strong> · Score : <strong>${academyEngine.getScore()} / 1000</strong></p>
      <div class="resume-actions">
        <button type="button" class="btn btn-primary" id="resume-continue">Reprendre</button>
        <button type="button" class="btn btn-ghost" id="resume-restart">Recommencer</button>
      </div>
    </div>`;
  document.body.appendChild(modal);

  $('#resume-continue', modal)?.addEventListener('click', () => {
    sessionStorage.setItem('wazabycode_resume_dismissed', '1');
    modal.remove();
    navigateTo(fs.lastModule);
  });
  $('#resume-restart', modal)?.addEventListener('click', () => {
    if (confirm('Effacer la progression de cette formation ?')) {
      academyEngine.reset();
      sessionStorage.setItem('wazabycode_resume_dismissed', '1');
      modal.remove();
      navigateTo(modules()[0].slug);
      renderSidebar($('#sidebar'));
    }
  });
}

export function initFormationApp() {
  const parsed = parseHash();
  const params = new URLSearchParams(window.location.search);
  activeFormationId = parsed.formationId || params.get('formation') || academyEngine.getState().activeFormation || 'cda';

  if (!getFormation(activeFormationId)) activeFormationId = 'cda';
  academyEngine.setFormation(activeFormationId);
  modeEnabled = academyStorage.isModeEnabled(activeFormationId);

  renderSidebar($('#sidebar'));
  renderTopbar($('#topbar'));

  const mods = modules();
  const fs = academyEngine.getFormationState();
  let slug = parsed.moduleSlug;
  if (slug && !mods.some((m) => m.slug === slug)) slug = null;
  slug = slug || fs.lastModule || mods[0]?.slug;

  if (slug) {
    activeSlug = slug;
    renderModule($('#roadmap-content'), slug);
    if (!window.location.hash) window.location.hash = `${activeFormationId}/${slug}`;
  }

  window.addEventListener('hashchange', () => {
    const p = parseHash();
    if (p.formationId && p.formationId !== activeFormationId) {
      switchFormation(p.formationId);
      if (p.moduleSlug) navigateTo(p.moduleSlug);
      return;
    }
    if (p.moduleSlug && p.moduleSlug !== activeSlug) navigateTo(p.moduleSlug);
  });

  showResumeModal();
}

export function initRoadmapApp() {
  initFormationApp();
}
