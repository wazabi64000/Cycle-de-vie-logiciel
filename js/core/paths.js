/**
 * Chemins relatifs — site 100 % statique (file:// ou hébergement web)
 */
export function base() {
  const p = window.location.pathname;
  if (p.includes('/cours-cda/')) return '../../';
  return '';
}

export function href(page) {
  return `${base()}${page}`;
}

export const PAGES = {
  home: 'index.html',
  dashboard: 'dashboard.html',
  module: 'module.html',
  certificate: 'certificate.html',
  completion: 'completion.html',
  modulesJson: 'cours-cda/index.json',
  css: 'css/main.css',
};

export function modulesIndexUrl() {
  return href(PAGES.modulesJson);
}

export function courseUrl(slug) {
  return `${base()}cours-cda/${slug}/cours.html`;
}

export function moduleUrl(slug, params = {}) {
  const qs = new URLSearchParams({ slug, ...params });
  return `${href('module.html')}?${qs.toString()}`;
}
