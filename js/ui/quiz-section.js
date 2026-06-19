/** UI Quiz par module — design style Kahoot */

import { CHECKLIST_LEVELS } from '../config/academy/helpers.js';
import { getModuleQuiz, gradeAnswer, PASS_THRESHOLD } from '../config/pedagogy-quiz.js';
import { pedagogyStorage } from '../core/pedagogy-storage.js';
import { checkAndAwardBadges } from '../core/pedagogy-engine.js';

const KAHOOT_PALETTE = [
  { cls: 'kahoot-red', shape: 'triangle' },
  { cls: 'kahoot-blue', shape: 'diamond' },
  { cls: 'kahoot-yellow', shape: 'circle' },
  { cls: 'kahoot-green', shape: 'square' },
];

const TYPE_LABELS = {
  single: 'QCM',
  multiple: 'Choix multiples',
  boolean: 'Vrai / Faux',
  order: 'Ordre logique',
  match: 'Association',
};

function kahootColorIndex(optionId) {
  const letters = 'ABCDEF';
  const i = letters.indexOf(String(optionId).toUpperCase());
  return i >= 0 ? i % 4 : 0;
}

function kahootShape(shape) {
  return `<span class="kahoot-shape kahoot-shape-${shape}" aria-hidden="true"></span>`;
}

function kahootOptionCard(o, q, multi = false) {
  const k = KAHOOT_PALETTE[kahootColorIndex(o.id)];
  const inputType = multi ? 'checkbox' : 'radio';
  const multiCls = multi ? ' quiz-option-multi' : '';
  return `
    <label class="quiz-option-card kahoot-answer ${k.cls}${multiCls}">
      <input type="${inputType}" name="q-${q.id}" value="${o.id}" class="quiz-input-sr">
      ${kahootShape(k.shape)}
      <span class="quiz-option-text">${o.text}</span>
    </label>`;
}

function typeBadge(type) {
  return `<span class="quiz-type-badge">${TYPE_LABELS[type] ?? type}</span>`;
}

function renderQuestion(q, index, total) {
  const stage = `
    <div class="kahoot-question-stage">
      <div class="kahoot-q-meta">
        <span class="quiz-q-num">${index + 1}</span>
        ${typeBadge(q.type)}
        <span class="kahoot-q-counter">${index + 1} / ${total}</span>
      </div>
      <div class="kahoot-question-box">
        <p class="quiz-question-text">${q.question}</p>
      </div>
    </div>`;

  if (q.type === 'single') {
    return `
      <article class="quiz-question-card kahoot-question" data-qid="${q.id}" data-type="single">
        ${stage}
        <div class="quiz-options-grid kahoot-answers-grid">
          ${q.options.map((o) => kahootOptionCard(o, q)).join('')}
        </div>
      </article>`;
  }

  if (q.type === 'multiple') {
    return `
      <article class="quiz-question-card kahoot-question" data-qid="${q.id}" data-type="multiple">
        ${stage}
        <p class="quiz-hint">Plusieurs réponses possibles</p>
        <div class="quiz-options-grid kahoot-answers-grid">
          ${q.options.map((o) => kahootOptionCard(o, q, true)).join('')}
        </div>
      </article>`;
  }

  if (q.type === 'boolean') {
    return `
      <article class="quiz-question-card kahoot-question" data-qid="${q.id}" data-type="boolean">
        ${stage}
        <div class="quiz-boolean-row kahoot-boolean-row">
          <label class="quiz-boolean-btn kahoot-answer kahoot-green quiz-boolean-true">
            <input type="radio" name="q-${q.id}" value="true" class="quiz-input-sr">
            ${kahootShape('square')}
            <span>Vrai</span>
          </label>
          <label class="quiz-boolean-btn kahoot-answer kahoot-red quiz-boolean-false">
            <input type="radio" name="q-${q.id}" value="false" class="quiz-input-sr">
            ${kahootShape('triangle')}
            <span>Faux</span>
          </label>
        </div>
      </article>`;
  }

  if (q.type === 'order') {
    return `
      <article class="quiz-question-card kahoot-question kahoot-special" data-qid="${q.id}" data-type="order">
        ${stage}
        <p class="quiz-hint">Ordre : numéros séparés par des virgules (ex : 0,1,2,3)</p>
        <ol class="quiz-order-steps">${q.items.map((it, i) => `
          <li><span class="quiz-order-idx">${i}</span>${it}</li>`).join('')}</ol>
        <input type="text" class="quiz-order-input" placeholder="0, 1, 2, 3…" data-qid="${q.id}" autocomplete="off">
      </article>`;
  }

  if (q.type === 'match') {
    const [kOk, kKo] = [KAHOOT_PALETTE[2], KAHOOT_PALETTE[0]];
    return `
      <article class="quiz-question-card kahoot-question kahoot-special" data-qid="${q.id}" data-type="match">
        ${stage}
        <div class="quiz-match-pairs">
          ${q.pairs.map((p) => `
            <div class="quiz-match-row">
              <span class="quiz-match-left">${p.left}</span>
              <span class="quiz-match-arrow">→</span>
              <span class="quiz-match-right">${p.right}</span>
            </div>`).join('')}
        </div>
        <div class="quiz-options-grid kahoot-answers-grid kahoot-answers-duo">
          <label class="quiz-option-card kahoot-answer ${kOk.cls}">
            <input type="radio" name="q-${q.id}" value="correct" class="quiz-input-sr">
            ${kahootShape(kOk.shape)}
            <span class="quiz-option-text">Associations correctes</span>
          </label>
          <label class="quiz-option-card kahoot-answer ${kKo.cls}">
            <input type="radio" name="q-${q.id}" value="wrong" class="quiz-input-sr">
            ${kahootShape(kKo.shape)}
            <span class="quiz-option-text">Une erreur</span>
          </label>
        </div>
      </article>`;
  }
  return '';
}

function bindOptionHighlight(form) {
  form.querySelectorAll('.quiz-option-card, .quiz-boolean-btn').forEach((label) => {
    const input = label.querySelector('input');
    if (!input) return;
    const sync = () => {
      if (input.type === 'radio') {
        form.querySelectorAll(`input[name="${input.name}"]`).forEach((inp) => {
          inp.closest('.quiz-option-card, .quiz-boolean-btn')?.classList.toggle('is-selected', inp.checked);
        });
      } else {
        label.classList.toggle('is-selected', input.checked);
      }
    };
    input.addEventListener('change', sync);
  });
}

function collectAnswer(container, q) {
  if (q.type === 'single' || q.type === 'boolean') {
    const sel = container.querySelector(`input[name="q-${q.id}"]:checked`);
    if (q.type === 'boolean') return sel ? sel.value === 'true' : null;
    return sel?.value ?? null;
  }
  if (q.type === 'multiple') {
    return [...container.querySelectorAll(`input[name="q-${q.id}"]:checked`)].map((i) => i.value);
  }
  if (q.type === 'order') {
    const raw = container.querySelector(`.quiz-order-input[data-qid="${q.id}"]`)?.value ?? '';
    return raw.split(',').map((s) => Number.parseInt(s.trim(), 10)).filter((n) => !Number.isNaN(n));
  }
  if (q.type === 'match') {
    return container.querySelector(`input[name="q-${q.id}"]:checked`)?.value ?? null;
  }
  return null;
}

function scoreRing(pct, passed) {
  const deg = Math.round(pct * 3.6);
  return `
    <div class="quiz-score-ring${passed ? ' passed' : ''}" style="--score-deg:${deg}deg">
      <div class="quiz-score-ring-inner">
        <span class="quiz-score-pct">${Math.round(pct)}%</span>
      </div>
    </div>`;
}

function levelStatusBadge(existing) {
  if (existing?.passed) return `<span class="quiz-level-status passed">✓ ${existing.score}/${existing.total}</span>`;
  if (existing) return `<span class="quiz-level-status retry">${existing.score}/${existing.total}</span>`;
  return '<span class="quiz-level-status pending">Non commencé</span>';
}

function renderQuizLevel(container, formationId, mod, level, levelLabel, color, questions) {
  const existing = pedagogyStorage.getQuizResult(formationId, mod.id, level);

  const block = document.createElement('div');
  block.className = 'quiz-level-card';
  block.style.setProperty('--quiz-level-color', color);
  block.innerHTML = `
    <header class="quiz-level-header">
      <div class="quiz-level-title-wrap">
        <span class="quiz-level-dot"></span>
        <h3>${levelLabel}</h3>
        <span class="quiz-level-count">${questions.length} questions</span>
      </div>
      ${levelStatusBadge(existing)}
    </header>
    <form class="quiz-form" data-level="${level}">
      <div class="quiz-questions-stack kahoot-stack">
        ${questions.map((q, i) => renderQuestion(q, i, questions.length)).join('')}
      </div>
      <footer class="quiz-form-footer">
        <button type="submit" class="quiz-submit-btn kahoot-submit">
          <span>Valider le quiz</span>
        </button>
      </footer>
    </form>
    <div class="quiz-result-panel" hidden></div>`;

  const form = block.querySelector('.quiz-form');
  bindOptionHighlight(form);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;
    const details = [];

    questions.forEach((q) => {
      const ans = collectAnswer(form, q);
      const ok = gradeAnswer(q, ans);
      if (ok) score++;
      details.push({ q, ok });
    });

    const total = questions.length;
    const passed = score / total >= PASS_THRESHOLD;
    const pct = (score / total) * 100;

    pedagogyStorage.saveQuizResult(formationId, mod.id, level, { score, total, passed });
    if (passed) checkAndAwardBadges(formationId, mod.id, level, true);

    const statusEl = block.querySelector('.quiz-level-status');
    if (statusEl) {
      statusEl.className = `quiz-level-status ${passed ? 'passed' : 'retry'}`;
      statusEl.textContent = passed ? `✓ ${score}/${total}` : `${score}/${total}`;
    }

    const resultEl = block.querySelector('.quiz-result-panel');
    resultEl.hidden = false;
    resultEl.innerHTML = `
      <div class="quiz-result-hero${passed ? ' passed' : ' failed'}">
        ${scoreRing(pct, passed)}
        <div class="quiz-result-summary">
          <h4>${passed ? 'Compétence comprise !' : 'Encore un effort !'}</h4>
          <p class="quiz-result-score-line"><strong>${score}</strong> / ${total} bonnes réponses</p>
          <p class="quiz-result-meta">${passed ? 'Seuil 60 % atteint — bravo !' : `${total - score} erreur(s) — consultez les explications.`}</p>
        </div>
      </div>
      <div class="quiz-corrections">
        <h4 class="quiz-corrections-title">Corrections détaillées</h4>
        ${details.map(({ q, ok }, i) => `
          <details class="quiz-correction-details${ok ? ' is-ok' : ' is-ko'}" ${ok ? '' : ' open'}>
            <summary>
              <span class="quiz-correction-icon">${ok ? '✓' : '✗'}</span>
              <span>Question ${i + 1} — ${q.question.slice(0, 72)}${q.question.length > 72 ? '…' : ''}</span>
            </summary>
            <p class="quiz-correction-explain">${q.explanation}</p>
          </details>`).join('')}
      </div>`;

    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  container.appendChild(block);
}

export function initQuizSection(container, formationId, mod) {
  if (!container) return;
  const quiz = getModuleQuiz(formationId, mod);

  container.innerHTML = `
    <section class="theme-card pedagogy-section quiz-section quiz-kahoot">
      <div class="quiz-section-head kahoot-head">
        <div class="kahoot-logo" aria-hidden="true">?</div>
        <div>
          <h2>Quiz !</h2>
          <p class="kahoot-subtitle">Auto-évaluation · 5 questions · Style interactif</p>
        </div>
      </div>
      <div class="quiz-levels-tabs kahoot-tabs" role="tablist" aria-label="Niveaux du quiz">
        ${CHECKLIST_LEVELS.map((l, i) => `
          <button type="button" class="quiz-tab${i === 0 ? ' active' : ''}" data-level="${l.id}" role="tab"
            style="--tab-color:${l.color}" aria-selected="${i === 0}">${l.label}</button>`).join('')}
      </div>
      <div id="quiz-levels-root" class="quiz-levels-root"></div>
    </section>`;

  const root = container.querySelector('#quiz-levels-root');
  const levelBlocks = {};

  CHECKLIST_LEVELS.forEach((l) => {
    const wrap = document.createElement('div');
    wrap.className = `quiz-level-pane${l.id === CHECKLIST_LEVELS[0].id ? ' active' : ''}`;
    wrap.dataset.level = l.id;
    wrap.hidden = l.id !== CHECKLIST_LEVELS[0].id;
    root.appendChild(wrap);
    renderQuizLevel(wrap, formationId, mod, l.id, l.label, l.color, quiz[l.id] ?? []);
    levelBlocks[l.id] = wrap;
  });

  container.querySelectorAll('.quiz-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const level = tab.dataset.level;
      container.querySelectorAll('.quiz-tab').forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      Object.entries(levelBlocks).forEach(([id, pane]) => {
        pane.hidden = id !== level;
        pane.classList.toggle('active', id === level);
      });
    });
  });
}
