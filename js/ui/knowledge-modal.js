/** Modales — détails checklist et fiches technologiques */

import { getPricingBadge, renderStars, renderScoreStars } from '../config/tool-profiles.js';
import { renderToolLinkButtons } from '../config/tools-registry.js';

let activeModal = null;
let keydownHandler = null;

function closeModal() {
  if (!activeModal) return;
  activeModal.classList.remove('visible');
  const node = activeModal;
  setTimeout(() => node.remove(), 280);
  activeModal = null;
  document.body.classList.remove('modal-open');
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
}

function bindModalClose(overlay) {
  overlay.querySelector('.km-close')?.addEventListener('click', closeModal);
  overlay.querySelector('.km-btn-close')?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

function bindEscape() {
  if (keydownHandler) return;
  keydownHandler = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', keydownHandler);
}

function listItems(items) {
  if (!items?.length) return '';
  return `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
}

function depthBlock(depthLevels, label) {
  if (!depthLevels) return '';
  return `
    <section class="km-section">
      <h3>Niveaux d'approfondissement</h3>
      <div class="km-depth-grid">
        <div class="km-depth"><span class="km-depth-tag debutant">Débutant</span><p>${depthLevels.debutant}</p></div>
        <div class="km-depth"><span class="km-depth-tag intermediaire">Intermédiaire</span><p>${depthLevels.intermediaire}</p></div>
        <div class="km-depth"><span class="km-depth-tag professionnel">Professionnel</span><p>${depthLevels.professionnel}</p></div>
      </div>
    </section>`;
}

export function openChecklistModal(knowledge, weight) {
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'km-overlay';
  overlay.innerHTML = `
    <div class="km-modal" role="dialog" aria-modal="true" aria-labelledby="km-title">
      <button type="button" class="km-close" aria-label="Fermer">×</button>
      <header class="km-header">
        <h2 id="km-title">${knowledge.label}</h2>
        ${weight ? `<span class="km-weight">+${weight} pts</span>` : ''}
      </header>
      <div class="km-body">
        ${knowledge.image ? `<figure class="km-figure"><img src="${knowledge.image}" alt="" loading="lazy"></figure>` : ''}
        <section class="km-section">
          <h3>Définition</h3>
          <p>${knowledge.definition}</p>
        </section>
        <section class="km-section">
          <h3>Pourquoi c'est important</h3>
          ${listItems(Array.isArray(knowledge.why) ? knowledge.why : [knowledge.why])}
        </section>
        <section class="km-section">
          <h3>Exemple concret — ${knowledge.example?.title ?? 'Cas d\'usage'}</h3>
          <pre class="km-diagram">${knowledge.example?.diagram ?? ''}</pre>
        </section>
        ${knowledge.tools?.length ? `<section class="km-section"><h3>Outils recommandés</h3>${listItems(knowledge.tools)}</section>` : ''}
        <section class="km-section">
          <h3>Bonnes pratiques</h3>
          ${listItems(knowledge.bestPractices)}
        </section>
        <section class="km-section">
          <h3>Erreurs fréquentes</h3>
          ${listItems(knowledge.commonMistakes)}
        </section>
        ${depthBlock(knowledge.depthLevels)}
      </div>
      <footer class="km-footer">
        <button type="button" class="btn btn-primary km-btn-close">Fermer</button>
      </footer>
    </div>`;

  document.body.appendChild(overlay);
  document.body.classList.add('modal-open');
  bindModalClose(overlay);
  bindEscape();

  requestAnimationFrame(() => overlay.classList.add('visible'));
  activeModal = overlay;
}

export function openToolDiscoverModal(tool) {
  closeModal();
  if (!tool) return;

  const pricing = getPricingBadge(tool.pricingType);
  const links = renderToolLinkButtons(tool);

  const overlay = document.createElement('div');
  overlay.className = 'km-overlay';
  overlay.innerHTML = `
    <div class="km-modal km-modal-tool km-modal-discover" role="dialog" aria-modal="true" aria-labelledby="km-tool-title">
      <button type="button" class="km-close" aria-label="Fermer">×</button>
      <header class="km-header km-tool-header-rich">
        <div class="km-tool-header-row">
          <img class="km-tool-logo" src="${tool.screenshot}" alt="" loading="lazy" onerror="this.src='assets/tools/default.svg'">
          <div>
            <h2 id="km-tool-title">${tool.name}</h2>
            <span class="tool-premium-category">${tool.category}</span>
            <div class="km-tool-header-badges">
              <span class="pricing-badge ${pricing.badge}">${pricing.emoji} ${pricing.label}</span>
              <span class="tool-popularity">${renderStars(tool.popularite)}</span>
              <span class="km-level-badge">${tool.recommendedLevel ?? 'Intermédiaire'}</span>
            </div>
          </div>
        </div>
      </header>
      <div class="km-body">
        <section class="km-section">
          <h3>À quoi sert cet outil ?</h3>
          <p>${tool.description}</p>
          ${listItems(tool.purpose)}
        </section>
        <section class="km-section km-scores">
          <h3>Score de recommandation</h3>
          ${renderScoreStars(tool.scores)}
        </section>
        <section class="km-section">
          <h3>Quand utiliser cet outil ?</h3>
          ${listItems(tool.whenToUse)}
        </section>
        <section class="km-section">
          <h3>Quand éviter cet outil ?</h3>
          ${listItems(tool.whenToAvoid)}
        </section>
        <section class="km-section">
          <h3>Tarification</h3>
          <ul class="km-pricing-list">
            ${(tool.pricingDetails ?? []).map((p) => `<li>${p}</li>`).join('')}
          </ul>
        </section>
        <div class="km-two-col">
          <section class="km-section">
            <h3>Avantages</h3>
            ${listItems(tool.pros)}
          </section>
          <section class="km-section">
            <h3>Inconvénients</h3>
            ${listItems(tool.cons)}
          </section>
        </div>
        ${tool.alternatives?.length ? `<section class="km-section"><h3>Alternatives</h3>${listItems(tool.alternatives)}</section>` : ''}
        ${tool.example ? `
        <section class="km-section">
          <h3>Exemple concret — ${tool.example.title}</h3>
          <p>${tool.example.content}</p>
        </section>` : ''}
        <figure class="km-figure km-tool-screenshot">
          <img src="${tool.screenshot}" alt="Aperçu ${tool.name}" loading="lazy" onerror="this.src='assets/tools/default.svg'">
        </figure>
        <section class="km-section km-tool-links">
          <h3>Ressources</h3>
          <div class="km-resource-buttons">
            ${links.filter((l) => l.url).map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost ${l.cls}">${l.label}</a>`).join('')}
            ${!links.filter((l) => l.url).length ? '<p class="text-muted">Consultez la documentation du thème pour ce outil.</p>' : ''}
          </div>
        </section>
      </div>
      <footer class="km-footer">
        <button type="button" class="btn btn-primary km-btn-close">Fermer</button>
      </footer>
    </div>`;

  document.body.appendChild(overlay);
  document.body.classList.add('modal-open');
  bindModalClose(overlay);
  bindEscape();
  requestAnimationFrame(() => overlay.classList.add('visible'));
  activeModal = overlay;
}

function compareCell(label, a, b) {
  return `<tr><th>${label}</th><td>${a ?? '—'}</td><td>${b ?? '—'}</td></tr>`;
}

export function openToolCompareModal(toolA, toolB) {
  closeModal();
  if (!toolA || !toolB) return;

  const pa = getPricingBadge(toolA.pricingType);
  const pb = getPricingBadge(toolB.pricingType);

  const overlay = document.createElement('div');
  overlay.className = 'km-overlay';
  overlay.innerHTML = `
    <div class="km-modal km-modal-compare" role="dialog" aria-modal="true">
      <button type="button" class="km-close" aria-label="Fermer">×</button>
      <header class="km-header">
        <h2>${toolA.name} <span class="compare-vs">VS</span> ${toolB.name}</h2>
      </header>
      <div class="km-body">
        <table class="compare-table">
          <thead>
            <tr><th>Critère</th><th>${toolA.name}</th><th>${toolB.name}</th></tr>
          </thead>
          <tbody>
            ${compareCell('Prix', `${pa.emoji} ${pa.label}`, `${pb.emoji} ${pb.label}`)}
            ${compareCell('Complexité', toolA.complexity, toolB.complexity)}
            ${compareCell('Entreprise', renderStars(toolA.scores?.entreprise ?? 0), renderStars(toolB.scores?.entreprise ?? 0))}
            ${compareCell('Freelance / perso', renderStars(toolA.scores?.personnel ?? 0), renderStars(toolB.scores?.personnel ?? 0))}
            ${compareCell('Équipe dev', renderStars(toolA.scores?.debutant ?? 0), renderStars(toolB.scores?.debutant ?? 0))}
            ${compareCell('Open Source', toolA.pricingType === 'open-source' ? '✅ Oui' : '❌ Non', toolB.pricingType === 'open-source' ? '✅ Oui' : '❌ Non')}
            ${compareCell('Popularité', renderStars(toolA.popularite), renderStars(toolB.popularite))}
            ${compareCell('Niveau recommandé', toolA.recommendedLevel, toolB.recommendedLevel)}
            ${compareCell('Adoption entreprise', toolA.enterpriseAdoption, toolB.enterpriseAdoption)}
          </tbody>
        </table>
      </div>
      <footer class="km-footer km-footer-split">
        <button type="button" class="btn btn-ghost btn-discover-inline" data-tool="${toolA.id}">Découvrir ${toolA.name}</button>
        <button type="button" class="btn btn-ghost btn-discover-inline" data-tool="${toolB.id}">Découvrir ${toolB.name}</button>
        <button type="button" class="btn btn-primary km-btn-close">Fermer</button>
      </footer>
    </div>`;

  document.body.appendChild(overlay);
  document.body.classList.add('modal-open');
  bindModalClose(overlay);
  bindEscape();

  overlay.querySelectorAll('.btn-discover-inline').forEach((btn) => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.tool === toolA.id ? toolA : toolB;
      openToolDiscoverModal(t);
    });
  });

  requestAnimationFrame(() => overlay.classList.add('visible'));
  activeModal = overlay;
}

/** @deprecated use openToolDiscoverModal */
export function openToolModal(tool) {
  openToolDiscoverModal(tool);
}

export { closeModal };
