import { learningProgressService } from '../core/learning-progress-service.js';
import { href } from '../core/paths.js';
import { getModuleChapters } from '../core/modules-loader.js';

const DISMISS_KEY = 'wazabycode_resume_dismissed';

export function wasResumeDismissed() {
  return sessionStorage.getItem(DISMISS_KEY) === '1';
}

export function dismissResumeForSession() {
  sessionStorage.setItem(DISMISS_KEY, '1');
}

/**
 * Affiche la modale de reprise si une sauvegarde existe.
 * @param {object} options
 * @param {number} [options.globalProgress] — progression globale %
 */
export function showResumeModal(options = {}) {
  if (wasResumeDismissed()) return;
  if (!learningProgressService.hasResumePoint()) return;

  const pos = learningProgressService.getLastPosition();
  const globalProgress = options.globalProgress ?? pos.progress ?? 0;
  const daysAgo = learningProgressService.formatDaysAgo(pos.lastVisit);
  const relative = learningProgressService.formatRelativeTime(pos.lastVisit);

  const existing = document.getElementById('resume-modal');
  if (existing) existing.remove();

  const chapterLine = pos.chapterName
    ? `<p class="resume-detail"><strong>Chapitre :</strong> ${escapeHtml(pos.chapterName)}</p>`
    : '';

  const lessonLine = pos.lessonName
    ? `<p class="resume-detail"><strong>Leçon :</strong> ${escapeHtml(pos.lessonName)}</p>`
    : '';

  const modal = document.createElement('div');
  modal.id = 'resume-modal';
  modal.className = 'resume-modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'resume-modal-title');

  modal.innerHTML = `
    <div class="resume-modal">
      <div class="resume-modal-icon" aria-hidden="true">👋</div>
      <h2 id="resume-modal-title">Bienvenue de retour</h2>
      <p class="resume-modal-lead">Nous avons retrouvé votre progression.</p>

      <div class="resume-modal-body">
        <p>Votre dernière session remonte à <strong>${daysAgo}</strong>.</p>
        <p>Vous étiez en train d'apprendre :</p>
        <p class="resume-path">
          <strong>${escapeHtml(pos.moduleName || pos.moduleId)}</strong>
          ${pos.chapterName ? ` → <em>${escapeHtml(pos.chapterName)}</em>` : ''}
        </p>
        ${chapterLine}
        ${lessonLine}
        <p class="resume-progress">Progression : <strong>${globalProgress} %</strong></p>
        <p class="resume-sub">Votre progression globale est de <strong>${globalProgress} %</strong>.
        Continuez votre montée en compétences.</p>
        <p class="resume-meta">Dernière visite : ${relative}</p>
      </div>

      <div class="resume-modal-actions">
        <button type="button" class="btn btn-primary" id="resume-continue">Reprendre</button>
        <button type="button" class="btn btn-ghost" id="resume-dashboard">Tableau de bord</button>
        <button type="button" class="btn btn-ghost resume-reset" id="resume-reset">Commencer depuis le début</button>
      </div>
    </div>`;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add('visible'));

  const close = () => {
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 300);
  };

  document.getElementById('resume-continue')?.addEventListener('click', () => {
    dismissResumeForSession();
    window.location.href = learningProgressService.getResumeUrl();
  });

  document.getElementById('resume-dashboard')?.addEventListener('click', () => {
    dismissResumeForSession();
    close();
    if (!window.location.pathname.includes('dashboard')) {
      window.location.href = href('dashboard.html');
    }
  });

  document.getElementById('resume-reset')?.addEventListener('click', () => {
    if (confirm('Effacer le point de reprise ? Votre progression reste sauvegardée.')) {
      learningProgressService.clearResumePoint();
      dismissResumeForSession();
      close();
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      dismissResumeForSession();
      close();
    }
  });

  document.addEventListener('keydown', function onEsc(e) {
    if (e.key === 'Escape') {
      dismissResumeForSession();
      close();
      document.removeEventListener('keydown', onEsc);
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Barre « Dernière activité » sur le dashboard
 */
export function renderResumeBar(container, globalProgress) {
  if (!container) return;
  const pos = learningProgressService.getLastPosition();

  if (!pos.moduleId) {
    container.hidden = true;
    return;
  }

  container.hidden = false;
  const relative = learningProgressService.formatRelativeTime(pos.lastVisit);
  const chapterLabel = pos.chapterName
    ? `Chapitre ${pos.chapterId?.replace('chapitre-', '') || ''} : ${pos.chapterName}`
    : 'En cours de découverte';

  container.innerHTML = `
    <div class="resume-bar">
      <div class="resume-bar-icon" aria-hidden="true">▶</div>
      <div class="resume-bar-content">
        <p class="resume-bar-label">Dernière activité</p>
        <p class="resume-bar-title">${escapeHtml(pos.moduleName)}</p>
        <p class="resume-bar-chapter">${escapeHtml(chapterLabel)}</p>
        <p class="resume-bar-meta">
          Progression : <strong>${pos.progress || globalProgress} %</strong>
          · Dernière visite : ${relative}
        </p>
      </div>
      <a href="${learningProgressService.getResumeUrl()}" class="btn btn-primary resume-bar-btn">
        Continuer
      </a>
    </div>`;
}

const HISTORY_LABELS = {
  module_started: { icon: '📖', label: 'Module commencé' },
  chapter_completed: { icon: '✅', label: 'Chapitre terminé' },
  quiz_passed: { icon: '🎯', label: 'Quiz réussi' },
  module_completed: { icon: '🏆', label: 'Module terminé' },
  exercise_done: { icon: '✏️', label: 'Exercice terminé' },
};

export function renderLearningHistory(container) {
  if (!container) return;
  const { history } = learningProgressService.getLearningData();

  if (!history.length) {
    container.innerHTML = '<p class="empty-state">Votre historique apparaîtra ici au fur et à mesure.</p>';
    return;
  }

  container.innerHTML = `
    <div class="timeline" role="list">
      ${history
        .slice(0, 20)
        .map((entry) => {
          const meta = HISTORY_LABELS[entry.type] || { icon: '•', label: entry.type };
          const date = new Date(entry.date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const detail = entry.chapterName
            ? `${entry.moduleName} — ${entry.chapterName}`
            : entry.moduleName || entry.moduleId || '';
          return `
            <div class="timeline-item" role="listitem">
              <span class="timeline-dot" aria-hidden="true">${meta.icon}</span>
              <div class="timeline-content">
                <strong>${meta.label}</strong>
                <p>${escapeHtml(detail)}</p>
                <time class="timeline-date" datetime="${entry.date}">${date}</time>
              </div>
            </div>`;
        })
        .join('')}
    </div>`;
}

export function renderLearningStats(container, progressState) {
  if (!container) return;
  const stats = learningProgressService.updateStatistics(progressState);

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">${stats.totalTimeMinutes}</span>
        <span class="stat-label">Minutes d'apprentissage</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${stats.consecutiveDays}</span>
        <span class="stat-label">Jours consécutifs</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${stats.modulesCompleted.length}</span>
        <span class="stat-label">Modules terminés</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${stats.chaptersCompleted.length}</span>
        <span class="stat-label">Chapitres terminés</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${stats.quizzesPassed}</span>
        <span class="stat-label">Quiz réussis</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${stats.globalScore}</span>
        <span class="stat-label">Score global / 1000</span>
      </div>
    </div>`;
}

/** Chapitres d'un module (données embarquées) */
export function fetchModuleChapters(slug) {
  return Promise.resolve(getModuleChapters(slug));
}
