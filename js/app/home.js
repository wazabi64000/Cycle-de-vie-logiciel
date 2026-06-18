import { learningProgressService } from '../core/learning-progress-service.js';
import { showResumeModal } from '../ui/memory-ui.js';
import { href } from '../core/paths.js';

/** Mettre en surbrillance le lien Guide si ancre #guide */
if (window.location.hash === '#guide') {
  document.querySelector(`.nav-link[href="${href('index.html#guide')}"]`)?.classList.add('active');
  document.querySelector(`.nav-link[href="${href('index.html')}"]`)?.classList.remove('active');
}

if (learningProgressService.hasResumePoint()) {
  const pos = learningProgressService.getLastPosition();
  showResumeModal({ globalProgress: pos.globalProgress || pos.progress || 0 });
}
