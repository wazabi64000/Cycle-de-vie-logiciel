import { progressEngine } from '../core/progress-engine.js';
import { storage } from '../core/storage.js';
import { eventBus, Events } from '../core/event-bus.js';
import { learningProgressService } from '../core/learning-progress-service.js';
import { renderModuleChecklists } from '../ui/checklist.js';
import { animateProgressBar } from '../ui/animations.js';
import { setNavbarExtra } from '../ui/layout.js';
import { fetchModuleChapters } from '../ui/memory-ui.js';
import { href, modulesIndexUrl, courseUrl } from '../core/paths.js';

let currentSlug = '';
let currentChapters = [];
let activeChapterId = '';
let moduleMeta = null;

function getModuleProgressPercent(moduleSlug) {
  const s = progressEngine.getState();
  const m = s.modules[moduleSlug];
  if (!m) return 0;
  const ped = Object.values(m.pedagogique).filter(Boolean).length;
  const tech = Object.values(m.technique).filter(Boolean).length;
  return Math.min(100, Math.round(((ped + tech) / 7) * 70 + (m.quizScore || 0) * 0.3));
}

function saveLearningPosition(extra = {}) {
  const global = progressEngine.getGlobalProgress();
  const chapter = currentChapters.find((c) => c.id === activeChapterId);

  learningProgressService.updatePosition({
    moduleId: currentSlug,
    moduleName: moduleMeta?.titre || currentSlug,
    chapterId: activeChapterId,
    chapterName: chapter?.name || '',
    lessonId: extra.lessonId || activeChapterId,
    lessonName: extra.lessonName || chapter?.name || '',
    scrollPosition: extra.scrollPosition ?? 0,
    progress: getModuleProgressPercent(currentSlug),
    globalProgress: global,
  });
}

function renderChapterNav(container, chapters, onSelect) {
  container.innerHTML = `
    <h3 class="card-title" style="margin-bottom:0.5rem">Chapitres</h3>
    <nav class="chapter-nav" aria-label="Navigation chapitres">
      ${chapters
        .map(
          (ch) => `
        <button type="button" class="chapter-nav-item${ch.id === activeChapterId ? ' active' : ''}"
          data-chapter="${ch.id}" aria-current="${ch.id === activeChapterId ? 'true' : 'false'}">
          ${ch.index}. ${ch.name}
        </button>`
        )
        .join('')}
    </nav>`;

  container.querySelectorAll('.chapter-nav-item').forEach((btn) => {
    btn.addEventListener('click', () => onSelect(btn.dataset.chapter));
  });
}

function scrollToChapter(iframe, chapterId, scrollOffset = 0) {
  try {
    const doc = iframe.contentDocument;
    const el = doc?.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (scrollOffset > 0) {
        iframe.contentWindow.scrollTo({ top: scrollOffset, behavior: 'auto' });
      }
    }
  } catch {
    /* cross-origin fallback */
  }
}

function setupIframeTracking(iframe, chapters) {
  iframe.addEventListener('load', () => {
    try {
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;

      const params = new URLSearchParams(window.location.search);
      const resumeChapter = params.get('chapter');
      const pos = learningProgressService.getLastPosition();

      if (resumeChapter || (params.get('resume') && pos.chapterId)) {
        const target = resumeChapter || pos.chapterId;
        activeChapterId = target;
        setTimeout(() => {
          scrollToChapter(iframe, target, pos.scrollPosition || 0);
          updateChapterNavActive();
        }, 300);
      }

      const onScroll = () => {
        const scrollTop = win.scrollY || doc.documentElement.scrollTop;
        let current = chapters[0]?.id || '';

        for (const ch of chapters) {
          const el = doc.getElementById(ch.id);
          if (el && el.offsetTop <= scrollTop + 120) current = ch.id;
        }

        if (current !== activeChapterId) {
          activeChapterId = current;
          updateChapterNavActive();
          eventBus.emit(Events.CHAPTER_CHANGED, { moduleSlug: currentSlug, chapterId: current });
          saveLearningPosition({ scrollPosition: scrollTop });
        } else {
          learningProgressService.saveScrollPosition(scrollTop, {
            moduleId: currentSlug,
            moduleName: moduleMeta?.titre,
            chapterId: activeChapterId,
            chapterName: chapters.find((c) => c.id === activeChapterId)?.name,
    progress: getModuleProgressPercent(currentSlug),
    globalProgress: progressEngine.getGlobalProgress(),
  });
        }
      };

      win.addEventListener('scroll', onScroll, { passive: true });
      if (!activeChapterId && chapters[0]) activeChapterId = chapters[0].id;
    } catch {
      /* iframe inaccessible */
    }
  });
}

function updateChapterNavActive() {
  document.querySelectorAll('.chapter-nav-item').forEach((btn) => {
    const isActive = btn.dataset.chapter === activeChapterId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function selectChapter(chapterId, iframe) {
  activeChapterId = chapterId;
  updateChapterNavActive();
  scrollToChapter(iframe, chapterId, 0);

  const chapter = currentChapters.find((c) => c.id === chapterId);
  progressEngine.setChapterProgress(currentSlug, chapterId, true);
  learningProgressService.addHistoryEntry({
    type: 'chapter_completed',
    moduleId: currentSlug,
    moduleName: moduleMeta?.titre,
    chapterId,
    chapterName: chapter?.name,
  });

  eventBus.emit(Events.CHAPTER_CHANGED, { moduleSlug: currentSlug, chapterId });
  saveLearningPosition({ scrollPosition: 0 });
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) {
    window.location.href = href('dashboard.html');
    return;
  }

  currentSlug = slug;
  storage.setCurrentModule(slug);

  const indexRes = await fetch(modulesIndexUrl()).then((r) => r.json());
  moduleMeta = indexRes.modules.find((m) => m.slug === slug);

  if (!moduleMeta) {
    window.location.href = href('dashboard.html');
    return;
  }

  const slugs = indexRes.modules.map((m) => m.slug);
  const saved = storage.loadProgress();
  progressEngine.init(slugs, saved?.learner?.name);

  learningProgressService.recordModuleStarted(slug, moduleMeta.titre);
  currentChapters = await fetchModuleChapters(slug);

  document.title = `${moduleMeta.titre} — WazabyCode`;

  setNavbarExtra(`
    <div class="navbar-extra-inner">
      <h1 id="module-title">${moduleMeta.titre}</h1>
      <div id="module-meta" class="navbar-extra-meta">
        <span>Module ${moduleMeta.id}</span>
        <span>${moduleMeta.duree}</span>
        <span>${moduleMeta.niveau}</span>
      </div>
    </div>`);

  const courseFrame = document.getElementById('course-frame');
  courseFrame.src = courseUrl(slug);

  const fullCourseLink = document.getElementById('open-full-course');
  if (fullCourseLink) {
    fullCourseLink.href = courseUrl(slug);
    fullCourseLink.target = '_blank';
  }

  const chapterNavEl = document.getElementById('chapter-nav');
  if (chapterNavEl) {
    renderChapterNav(chapterNavEl, currentChapters, (id) => selectChapter(id, courseFrame));
  }

  setupIframeTracking(courseFrame, currentChapters);

  const state = progressEngine.getState();
  renderModuleChecklists(document.getElementById('module-checklists'), slug, state);

  const modState = state.modules[slug];
  const quizInput = document.getElementById('quiz-score');
  if (quizInput && modState) {
    quizInput.value = modState.quizScore || '';
    quizInput.addEventListener('change', () => {
      const score = Number(quizInput.value) || 0;
      progressEngine.setQuizScore(slug, score);
      learningProgressService.saveQuizState({
        quizId: `quiz-${slug}`,
        moduleId: slug,
        currentScore: score,
        answeredQuestions: {},
      });
      if (score >= 70) {
        learningProgressService.addHistoryEntry({
          type: 'quiz_passed',
          moduleId: slug,
          moduleName: moduleMeta.titre,
        });
      }
      updateModuleProgress(slug);
      saveLearningPosition();
    });
  }

  function updateModuleProgress(moduleSlug) {
    const pct = getModuleProgressPercent(moduleSlug);
    const bar = document.getElementById('module-progress-bar');
    animateProgressBar(bar, pct);
    document.getElementById('module-progress-label').textContent = `${pct}%`;
    saveLearningPosition({ progress: pct });
  }

  eventBus.on(Events.CHECKLIST_CHANGED, (data) => {
    if (data.moduleSlug === slug || !data.moduleSlug) updateModuleProgress(slug);
  });

  eventBus.on(Events.PROGRESS_UPDATED, () => {
    renderModuleChecklists(document.getElementById('module-checklists'), slug, progressEngine.getState());
    updateModuleProgress(slug);
  });

  learningProgressService.registerAutoSave({
    getContext: () => ({
      moduleId: currentSlug,
      moduleName: moduleMeta?.titre,
      chapterId: activeChapterId,
      chapterName: currentChapters.find((c) => c.id === activeChapterId)?.name,
      progress: getModuleProgressPercent(currentSlug),
    }),
    getProgressState: () => progressEngine.getState(),
  });

  window.addEventListener('beforeunload', () => {
    learningProgressService.flushSession(currentSlug, moduleMeta.titre, progressEngine.getState());
  });

  saveLearningPosition();
  updateModuleProgress(slug);
}

document.addEventListener('DOMContentLoaded', init);
