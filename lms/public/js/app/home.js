import { initLayout } from '../ui/layout.js';
import { learningProgressService } from '../core/learning-progress-service.js';
import { showResumeModal } from '../ui/memory-ui.js';

initLayout({ page: 'home', showCta: true });

/** Mettre en surbrillance le lien Guide si ancre #guide */
if (window.location.hash === '#guide') {
  document.querySelector('.nav-link[href="/#guide"]')?.classList.add('active');
  document.querySelector('.nav-link[href="/"]')?.classList.remove('active');
}

if (learningProgressService.hasResumePoint()) {
  const pos = learningProgressService.getLastPosition();
  showResumeModal({ globalProgress: pos.globalProgress || pos.progress || 0 });
}
