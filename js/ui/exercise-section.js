/** UI Exercices pratiques — solution masquée */

import { CHECKLIST_LEVELS } from '../config/academy/helpers.js';
import { getModuleExercises } from '../config/pedagogy-exercises.js';
import { pedagogyStorage } from '../core/pedagogy-storage.js';

function renderSolutionBlock(ex, formationId, mod, level) {
  const s = ex.solution;
  return `
    <div class="exercise-solution" hidden>
      <h4>Correction</h4>
      <p>${s.correction}</p>
      <h4>Explication</h4>
      <p>${s.explanation}</p>
      <h4>Pourquoi cette solution est pertinente</h4>
      <p>${s.why}</p>
      <h4>Erreurs fréquentes</h4>
      <ul>${(s.mistakes ?? []).map((m) => `<li>${m}</li>`).join('')}</ul>
      <h4>Version professionnelle</h4>
      <p>${s.pro}</p>
    </div>`;
}

function renderExercise(ex, formationId, mod, level) {
  const done = pedagogyStorage.isExerciseDone(formationId, mod.id, level, ex.id);
  return `
    <article class="exercise-card${done ? ' completed' : ''}" data-ex-id="${ex.id}" data-level="${level}">
      <h4>${ex.title}</h4>
      ${ex.scenario ? `<p class="exercise-scenario"><strong>Cas :</strong> ${ex.scenario}</p>` : ''}
      <p class="exercise-prompt">${ex.prompt}</p>
      <textarea class="exercise-textarea" rows="4" placeholder="Votre réponse…"></textarea>
      <div class="exercise-actions">
        <button type="button" class="btn btn-primary btn-exercise-done">Marquer comme réalisé</button>
        <button type="button" class="btn btn-ghost btn-exercise-solution">▼ Voir la solution</button>
      </div>
      ${done ? '<p class="exercise-done-badge">✓ Exercice réalisé</p>' : ''}
      ${renderSolutionBlock(ex, formationId, mod, level)}
    </article>`;
}

export function initExerciseSection(container, formationId, mod) {
  if (!container) return;
  const exercises = getModuleExercises(formationId, mod);

  container.innerHTML = `
    <section class="theme-card pedagogy-section">
      <h2>Exercices pratiques</h2>
      <p class="text-muted">Cas réels SaaS, marketplace, ERP… Répondez puis consultez la solution.</p>
      <div id="exercise-levels-root"></div>
    </section>`;

  const root = container.querySelector('#exercise-levels-root');

  CHECKLIST_LEVELS.forEach((l) => {
    const items = exercises[l.id] ?? [];
    if (!items.length) return;
    const block = document.createElement('div');
    block.className = 'exercise-level-block';
    block.innerHTML = `
      <h3 class="checklist-level-title" style="--cl-color:${l.color}">Exercices — ${l.label}</h3>
      ${items.map((ex) => renderExercise(ex, formationId, mod, l.id)).join('')}`;
    root.appendChild(block);
  });

  root.querySelectorAll('.btn-exercise-solution').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.exercise-card');
      const sol = card?.querySelector('.exercise-solution');
      if (!sol) return;
      const open = sol.hidden;
      sol.hidden = !open;
      btn.textContent = open ? '▲ Masquer la solution' : '▼ Voir la solution';
      if (open) {
        const level = card.dataset.level;
        const exId = card.dataset.exId;
        pedagogyStorage.markSolutionViewed(formationId, mod.id, level, exId);
      }
    });
  });

  root.querySelectorAll('.btn-exercise-done').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.exercise-card');
      const level = card?.dataset.level;
      const exId = card?.dataset.exId;
      if (!level || !exId) return;
      pedagogyStorage.markExerciseDone(formationId, mod.id, level, exId);
      card.classList.add('completed');
      if (!card.querySelector('.exercise-done-badge')) {
        btn.insertAdjacentHTML('beforebegin', '<p class="exercise-done-badge">✓ Exercice réalisé</p>');
      }
    });
  });
}
