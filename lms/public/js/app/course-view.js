import { initLayout, setNavbarExtra } from '../ui/layout.js';

const isEmbed = window.self !== window.top;
const body = document.body;
const slug = body.dataset.moduleSlug || '';
const title = body.dataset.moduleTitle || document.title;

if (isEmbed) {
  body.classList.add('cours-embed');
} else {
  initLayout({ page: 'module' });
  setNavbarExtra(`
    <div class="navbar-extra-inner">
      <h1>${title}</h1>
      <div class="navbar-extra-meta">
        <span>Module ${body.dataset.moduleId || ''}</span>
        <span>${body.dataset.moduleDuration || ''}</span>
        <span>${body.dataset.moduleLevel || ''}</span>
      </div>
    </div>`);
}
