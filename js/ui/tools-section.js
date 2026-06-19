/** Section Outils recommandés — cartes premium, filtres, comparateur */

import { resolveOrStubTool } from '../config/tools-registry.js';
import {
  getPricingBadge,
  renderStars,
  renderScoreStars,
  matchesToolFilter,
  searchToolMatch,
} from '../config/tool-profiles.js';
import { openToolDiscoverModal, openToolCompareModal } from './knowledge-modal.js';

const FILTERS = [
  { id: 'all', label: 'Tous' },
  { id: 'gratuit', label: 'Gratuits' },
  { id: 'freemium', label: 'Freemium' },
  { id: 'payant', label: 'Payants' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'debutants', label: 'Débutants' },
  { id: 'professionnels', label: 'Professionnels' },
];

function renderPremiumCard(tool, compareIds) {
  const pricing = getPricingBadge(tool.pricingType);
  const inCompare = compareIds.includes(tool.id);
  return `
    <article class="tool-premium-card" data-tool-id="${tool.id}">
      <div class="tool-premium-top">
        <div class="tool-premium-logo" aria-hidden="true">
          <img src="${tool.screenshot}" alt="" loading="lazy" onerror="this.src='assets/tools/default.svg'">
        </div>
        <div class="tool-premium-meta">
          <h3 class="tool-premium-name">${tool.name}</h3>
          <span class="tool-premium-category">${tool.category}</span>
        </div>
      </div>
      <p class="tool-premium-desc">${tool.description}</p>
      <div class="tool-premium-badges">
        <span class="pricing-badge ${pricing.badge}">${pricing.emoji} ${pricing.label}</span>
        <span class="tool-popularity" title="Popularité">${renderStars(tool.popularite)}</span>
      </div>
      <p class="tool-premium-adoption">${tool.enterpriseAdoption}</p>
      <p class="tool-premium-level">Niveau : <strong>${tool.recommendedLevel ?? 'Intermédiaire'}</strong></p>
      <div class="tool-premium-actions">
        <button type="button" class="btn btn-primary btn-discover" data-tool-id="${tool.id}">Découvrir</button>
        <button type="button" class="btn btn-ghost btn-compare-toggle${inCompare ? ' active' : ''}" data-tool-id="${tool.id}" title="Comparer (max 2)">
          ${inCompare ? '✓ Comparer' : 'Comparer'}
        </button>
      </div>
    </article>`;
}

export function initToolsSection(container, toolNames) {
  const tools = toolNames.map((n) => resolveOrStubTool(n));
  const unique = [...new Map(tools.map((t) => [t.id, t])).values()];

  let filter = 'all';
  let search = '';
  let compareIds = [];

  function filteredTools() {
    return unique.filter((t) => matchesToolFilter(t, filter) && (!search || searchToolMatch(t, search)));
  }

  function render() {
    const list = filteredTools();
    container.innerHTML = `
      <div class="tools-section-header">
        <p class="text-muted">Guide d'aide à la décision — comprenez chaque outil avant de choisir.</p>
        <div class="tools-toolbar">
          <input type="search" class="tools-search" placeholder="Rechercher : Docker, React, Jest…" value="${search}" aria-label="Rechercher un outil">
          <div class="tools-filters" role="group" aria-label="Filtrer les outils">
            ${FILTERS.map((f) => `
              <button type="button" class="tools-filter-btn${filter === f.id ? ' active' : ''}" data-filter="${f.id}">${f.label}</button>
            `).join('')}
          </div>
        </div>
        ${compareIds.length ? `
          <div class="tools-compare-bar">
            <span>${compareIds.length}/2 sélectionné(s) pour comparaison</span>
            <button type="button" class="btn btn-primary btn-run-compare"${compareIds.length < 2 ? ' disabled' : ''}>Comparer</button>
            <button type="button" class="btn btn-ghost btn-clear-compare">Effacer</button>
          </div>` : ''}
      </div>
      <div class="tools-premium-grid">
        ${list.length ? list.map((t) => renderPremiumCard(t, compareIds)).join('') : '<p class="tools-empty">Aucun outil ne correspond à votre recherche.</p>'}
      </div>`;

    bindEvents();
  }

  function bindEvents() {
    container.querySelector('.tools-search')?.addEventListener('input', (e) => {
      search = e.target.value.trim();
      render();
      const input = container.querySelector('.tools-search');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });

    container.querySelectorAll('.tools-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.filter;
        render();
      });
    });

    container.querySelectorAll('.btn-discover').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tool = unique.find((t) => t.id === btn.dataset.toolId);
        if (tool) openToolDiscoverModal(tool);
      });
    });

    container.querySelectorAll('.btn-compare-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.toolId;
        if (compareIds.includes(id)) {
          compareIds = compareIds.filter((x) => x !== id);
        } else if (compareIds.length < 2) {
          compareIds = [...compareIds, id];
        } else {
          compareIds = [compareIds[1], id];
        }
        render();
      });
    });

    container.querySelector('.btn-run-compare')?.addEventListener('click', () => {
      if (compareIds.length === 2) {
        const a = unique.find((t) => t.id === compareIds[0]);
        const b = unique.find((t) => t.id === compareIds[1]);
        if (a && b) openToolCompareModal(a, b);
      }
    });

    container.querySelector('.btn-clear-compare')?.addEventListener('click', () => {
      compareIds = [];
      render();
    });
  }

  render();
}

export { renderScoreStars, getPricingBadge, renderStars };
