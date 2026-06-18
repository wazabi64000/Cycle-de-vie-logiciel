import { storage } from '../core/storage.js';
import { base, href } from '../core/paths.js';

const NAV = [
  { id: 'home', label: 'Accueil', page: 'index.html' },
  { id: 'modules', label: 'Cours', page: 'index.html#modules' },
  { id: 'guide', label: 'Guide', page: 'index.html#guide' },
  { id: 'dashboard', label: 'Tableau de bord', page: 'dashboard.html' },
  { id: 'certification-rncp', label: 'Titre CDA', page: 'certification-rncp.html' },
  { id: 'certificate', label: 'Certificat', page: 'certificate.html' },
  { id: 'completion', label: 'Fin de parcours', page: 'completion.html' },
];

export function initLayout(options = {}) {
  const { page = 'home', showNameInput = false, showCta = false } = options;
  const root = document.getElementById('navbar-root');
  const foot = document.getElementById('footer-root');

  if (root) root.innerHTML = navbarHtml(page, { showNameInput, showCta });
  if (foot) foot.innerHTML = footerHtml();

  bindNavbar();
  document.documentElement.dataset.theme = storage.getTheme();
}

function navbarHtml(activePage, { showNameInput, showCta }) {
  const links = NAV.map(
    (item) => `
      <li>
        <a href="${href(item.page)}" class="nav-link${activePage === item.id ? ' active' : ''}"
           ${activePage === item.id ? 'aria-current="page"' : ''}>${item.label}</a>
      </li>`
  ).join('');

  return `
    <header class="navbar" role="banner">
      <div class="navbar-container">
        <a href="${href('index.html')}" class="navbar-logo">
          <span class="navbar-logo-icon" aria-hidden="true">◆</span>
          Wazaby<span>Code</span>
        </a>
        <button type="button" class="navbar-toggle" id="navbar-toggle"
          aria-expanded="false" aria-controls="navbar-menu" aria-label="Menu">
          <span class="navbar-toggle-bar"></span>
          <span class="navbar-toggle-bar"></span>
          <span class="navbar-toggle-bar"></span>
        </button>
        <nav class="navbar-menu" id="navbar-menu" aria-label="Navigation">
          <ul class="navbar-links">${links}</ul>
          <div class="navbar-menu-actions">
            ${showNameInput ? `<input type="text" id="name-input" class="input-name" placeholder="Votre nom" aria-label="Votre nom">` : ''}
            <button type="button" id="theme-toggle" class="btn btn-ghost btn-icon" aria-label="Thème">🌓</button>
            ${showCta ? `<a href="${href('dashboard.html')}" class="btn btn-primary navbar-cta">Commencer →</a>` : ''}
            ${activePage === 'module' ? `<a href="${href('dashboard.html')}" class="btn btn-ghost navbar-cta-mobile">Dashboard</a>` : ''}
          </div>
        </nav>
      </div>
      <div id="navbar-extra" class="navbar-extra" hidden></div>
      <div class="navbar-overlay" id="navbar-overlay" hidden></div>
    </header>`;
}

function footerHtml() {
  const y = new Date().getFullYear();
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${href('index.html')}" class="footer-logo">Wazaby<span>Code</span></a>
            <p class="footer-tagline">Formation CDA — HTML, CSS, JavaScript. Données locales, zéro serveur.</p>
          </div>
          <div class="footer-col">
            <h3 class="footer-heading">Navigation</h3>
            <ul class="footer-links">
              <li><a href="${href('index.html')}">Accueil</a></li>
              <li><a href="${href('index.html#guide')}">Guide</a></li>
              <li><a href="${href('dashboard.html')}">Tableau de bord</a></li>
              <li><a href="${href('certification-rncp.html')}">Référentiel RNCP</a></li>
              <li><a href="${href('certificate.html')}">Certificat WazabyCode</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-heading">Formation</h3>
            <ul class="footer-links">
              <li><a href="${href('module.html?slug=00-introduction-metier')}">Module 00</a></li>
              <li><a href="${href('module.html?slug=05-javascript')}">JavaScript</a></li>
              <li><a href="${href('dashboard.html#modules-list-section')}">Tous les modules</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-heading">WazabyCode</h3>
            <ul class="footer-links">
              <li><span class="footer-muted">22 modules · 800h+</span></li>
              <li><span class="footer-muted">Stockage : localStorage</span></li>
              <li><span class="footer-muted">100 % statique</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copy">© ${y} WazabyCode — CDA</p>
        </div>
      </div>
    </footer>`;
}

function bindNavbar() {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');
  const overlay = document.getElementById('navbar-overlay');
  if (!toggle) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('is-open');
    menu?.classList.remove('is-open');
    overlay?.setAttribute('hidden', '');
    document.body.classList.remove('nav-open');
  };
  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('is-open');
    menu?.classList.add('is-open');
    overlay?.removeAttribute('hidden');
    document.body.classList.add('nav-open');
  };

  toggle.onclick = () =>
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
  overlay?.addEventListener('click', close);
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  window.addEventListener('resize', () => window.innerWidth >= 992 && close());

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    storage.setTheme(storage.getTheme() === 'dark' ? 'light' : 'dark');
  });
}

export function setNavbarExtra(html) {
  const el = document.getElementById('navbar-extra');
  if (!el) return;
  el.innerHTML = html;
  el.hidden = !html;
}

/** Initialise navbar/footer si les conteneurs existent — appeler en premier sur chaque page */
export function initShell(page, opts = {}) {
  initLayout({ page, ...opts });
}
