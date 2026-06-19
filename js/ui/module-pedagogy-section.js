/** Section pédagogie enrichie — ressources, BP, erreurs, cas réels par niveau */

import { CHECKLIST_LEVELS } from '../config/academy/helpers.js';

function renderLevelBlock(levelId, levelLabel, color, data) {
  if (!data) return '';
  return `
    <div class="pedagogy-level-block" style="--pl-color:${color}">
      <h3 class="pedagogy-level-title">${levelLabel}</h3>
      <div class="pedagogy-level-grid">
        <div class="pedagogy-col">
          <h4>Bonnes pratiques</h4>
          <ul>${(data.bestPractices ?? []).map((b) => `<li>${b}</li>`).join('')}</ul>
        </div>
        <div class="pedagogy-col pedagogy-col-warn">
          <h4>Erreurs fréquentes</h4>
          <ul>${(data.commonMistakes ?? []).map((m) => `<li>${m}</li>`).join('')}</ul>
        </div>
        <div class="pedagogy-col pedagogy-col-case">
          <h4>Cas réels</h4>
          ${(data.realCases ?? []).map((c) => `
            <article class="pedagogy-case">
              <strong>${c.title}</strong>
              <p>${c.summary}</p>
            </article>`).join('')}
        </div>
      </div>
    </div>`;
}

export function renderModulePedagogySection(mod) {
  const p = mod.pedagogy;
  if (!p) return '';

  const resources = p.resources ?? [];
  return `
    <section class="theme-card module-pedagogy-section">
      <h2>Ressources & liens officiels</h2>
      <div class="pedagogy-resources">
        ${resources.map((r) => `
          <a href="${r.url}" target="_blank" rel="noopener noreferrer"
             class="pedagogy-resource pedagogy-resource-${r.type ?? 'link'}">
            <span class="pedagogy-resource-type">${r.type === 'tool' ? '🛠' : '📚'}</span>
            <span>${r.label}</span>
          </a>`).join('')}
      </div>
    </section>
    <section class="theme-card module-pedagogy-levels">
      <h2>Par niveau — bonnes pratiques & cas réels</h2>
      <p class="text-muted">Débutant · Intermédiaire · Professionnel</p>
      ${CHECKLIST_LEVELS.map((l) => renderLevelBlock(l.id, l.label, l.color, p.levels?.[l.id])).join('')}
    </section>`;
}
