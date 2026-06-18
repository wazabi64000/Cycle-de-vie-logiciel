import {
  CHECKLIST_PEDAGOGIQUE,
  CHECKLIST_TECHNIQUE,
  CHECKLIST_PROJET,
} from '../config/checklists.js';
import { progressEngine } from '../core/progress-engine.js';

const CHECKLIST_MAP = {
  pedagogique: CHECKLIST_PEDAGOGIQUE,
  technique: CHECKLIST_TECHNIQUE,
  projet: CHECKLIST_PROJET,
};

export function renderChecklist(container, items, state, onChange) {
  container.innerHTML = items
    .map(
      (item) => `
    <label class="checklist-item ${state[item.id] ? 'checked' : ''}">
      <input type="checkbox" data-id="${item.id}" ${state[item.id] ? 'checked' : ''}
        aria-label="${item.label}"/>
      <span class="checklist-check">${state[item.id] ? '✓' : ''}</span>
      <span class="checklist-label">${item.label}</span>
      <span class="checklist-weight">${item.weight}%</span>
    </label>`
    )
    .join('');

  container.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const checked = e.target.checked;
      const row = e.target.closest('.checklist-item');
      row?.classList.toggle('checked', checked);
      const checkMark = row?.querySelector('.checklist-check');
      if (checkMark) checkMark.textContent = checked ? '✓' : '';
      onChange(id, checked);
    });
  });
}

export function renderModuleChecklists(container, moduleSlug, state) {
  container.innerHTML = `
    <div class="checklist-group">
      <h3>Checklist pédagogique</h3>
      <div id="cl-ped" class="checklist"></div>
    </div>
    <div class="checklist-group">
      <h3>Checklist technique</h3>
      <div id="cl-tech" class="checklist"></div>
    </div>`;

  const mod = state.modules[moduleSlug];
  if (!mod) return;

  renderChecklist(
    container.querySelector('#cl-ped'),
    CHECKLIST_PEDAGOGIQUE,
    mod.pedagogique,
    (id, checked) => progressEngine.toggleChecklist(moduleSlug, 'pedagogique', id, checked)
  );

  renderChecklist(
    container.querySelector('#cl-tech'),
    CHECKLIST_TECHNIQUE,
    mod.technique,
    (id, checked) => progressEngine.toggleChecklist(moduleSlug, 'technique', id, checked)
  );
}

export function renderProjectChecklist(container, state) {
  container.innerHTML = `
    <div class="checklist-group">
      <h3>Checklist projet</h3>
      <div id="cl-projet" class="checklist"></div>
    </div>`;

  renderChecklist(
    container.querySelector('#cl-projet'),
    CHECKLIST_PROJET,
    state.project.checklists,
    (id, checked) => progressEngine.toggleProjectChecklist(id, checked)
  );
}

export { CHECKLIST_MAP };
