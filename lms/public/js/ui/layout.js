import { storage } from '../core/storage.js';

const NAV_ITEMS = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'guide', label: 'Guide', href: '/#guide' },
  { id: 'dashboard', label: 'Tableau de bord', href: '/dashboard.html' },
  { id: 'certificate', label: 'Certificat', href: '/certificate.html' },
  { id: 'completion', label: 'Fin de parcours', href: '/completion.html' },
];

/**
 * @param {object} options
 * @param {string} options.page — page active (home, dashboard, module, certificate, completion)
 * @param {boolean} [options.showNameInput]
 * @param {boolean} [options.showCta]
 * @param {string} [options.moduleSlot] — contenu HTML optionnel sous la navbar (page module)
 */
export function initLayout(options = {}) {
  const { page = 'home', showNameInput = false, showCta = false } = options;

  injectNavbar(page, { showNameInput, showCta });
  injectFooter();
  bindNavbar();
  document.documentElement.dataset.theme = storage.getTheme();
}

function injectNavbar(activePage, { showNameInput, showCta }) {
  const root = document.getElementById('navbar-root');
  if (!root) return;

  const links = NAV_ITEMS.map(
    (item) => `
      <li>
        <a href="${item.href}" class="nav-link${activePage === item.id ? ' active' : ''}"
           ${activePage === item.id ? 'aria-current="page"' : ''}>
          ${item.label}
        </a>
      </li>`
  ).join('');

  root.innerHTML = `
    <header class="navbar" role="banner">
      <div class="navbar-container">
        <a href="/" class="navbar-logo" aria-label="WazabyCode — Accueil">
          <span class="navbar-logo-icon" aria-hidden="true">◆</span>
          Wazaby<span>Code</span>
        </a>

        <button type="button" class="navbar-toggle" id="navbar-toggle"
          aria-expanded="false" aria-controls="navbar-menu" aria-label="Ouvrir le menu">
          <span class="navbar-toggle-bar"></span>
          <span class="navbar-toggle-bar"></span>
          <span class="navbar-toggle-bar"></span>
        </button>

        <nav class="navbar-menu" id="navbar-menu" aria-label="Navigation principale">
          <ul class="navbar-links">${links}</ul>
          <div class="navbar-menu-actions">
            ${showNameInput ? `
              <label class="sr-only" for="name-input">Votre nom</label>
              <input type="text" id="name-input" class="input-name" placeholder="Votre nom" aria-label="Votre nom">
            ` : ''}
            <button type="button" id="theme-toggle" class="btn btn-ghost btn-icon" aria-label="Changer le thème">
              <span aria-hidden="true">🌓</span>
            </button>
            ${showCta ? `<a href="/dashboard.html" class="btn btn-primary navbar-cta">Commencer →</a>` : ''}
            ${activePage === 'module' ? `<a href="/dashboard.html" class="btn btn-ghost navbar-cta-mobile">Tableau de bord</a>` : ''}
          </div>
        </nav>
      </div>
      <div id="navbar-extra" class="navbar-extra"></div>
      <div class="navbar-overlay" id="navbar-overlay" hidden></div>
    </header>`;
}

function injectFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;

  const year = new Date().getFullYear();

  root.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" class="footer-logo">Wazaby<span>Code</span></a>
            <p class="footer-tagline">
              Formation professionnelle au développement logiciel — du premier cours à la mise en production.
            </p>
          </div>

          <div class="footer-col">
            <h3 class="footer-heading">Navigation</h3>
            <ul class="footer-links">
              <li><a href="/">Accueil</a></li>
              <li><a href="/#guide">Guide utilisateur</a></li>
              <li><a href="/dashboard.html">Tableau de bord</a></li>
              <li><a href="/certificate.html">Certificat</a></li>
              <li><a href="/completion.html">Fin de parcours</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3 class="footer-heading">Formation</h3>
            <ul class="footer-links">
              <li><a href="/module.html?slug=00-introduction-metier">Module 00 — Métier</a></li>
              <li><a href="/module.html?slug=01-analyse-conception">Module 01 — Conception</a></li>
              <li><a href="/module.html?slug=19-projet-professionnel">Projet professionnel</a></li>
              <li><a href="/dashboard.html#modules-list-section">Tous les modules</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3 class="footer-heading">WazabyCode</h3>
            <ul class="footer-links">
              <li><a href="/dashboard.html">Progression & badges</a></li>
              <li><a href="/certificate.html">Obtenir le certificat</a></li>
              <li><span class="footer-muted">CDA — 22 modules</span></li>
              <li><span class="footer-muted">800h+ de formation</span></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copy">© ${year} WazabyCode. Tous droits réservés.</p>
          <p class="footer-copy footer-copy-sub">Concepteur Développeur d'Applications</p>
        </div>
      </div>
    </footer>`;
}

function bindNavbar() {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');
  const overlay = document.getElementById('navbar-overlay');

  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.classList.remove('is-open');
    menu?.classList.remove('is-open');
    overlay?.setAttribute('hidden', '');
    document.body.classList.remove('nav-open');
  };

  const openMenu = () => {
    toggle?.setAttribute('aria-expanded', 'true');
    toggle?.classList.add('is-open');
    menu?.classList.add('is-open');
    overlay?.removeAttribute('hidden');
    document.body.classList.add('nav-open');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  menu?.querySelectorAll('.nav-link, .navbar-cta-mobile').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) closeMenu();
  });

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const current = storage.getTheme();
    storage.setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/** Slot sous la navbar pour infos module */
export function setNavbarExtra(html) {
  const extra = document.getElementById('navbar-extra');
  if (extra) {
    extra.innerHTML = html;
    extra.hidden = !html;
  }
}
