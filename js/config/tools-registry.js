/**
 * Registre centralisé des outils — URLs officielles (2026)
 */
import { enrichTool } from './tool-profiles.js';
export const TOOLS_REGISTRY = {
  jira: { name: 'Jira', website: 'https://www.atlassian.com/software/jira', documentation: 'https://support.atlassian.com/jira/', github: 'https://github.com/atlassian', description: 'Gestion de projet Agile par Atlassian.', useCases: ['Scrum', 'Kanban', 'Bugs'], alternatives: ['Linear', 'ClickUp'], recommendedLevel: 'Intermédiaire', keywords: ['jira', 'atlassian', 'agile'] },
  trello: { name: 'Trello', website: 'https://trello.com', documentation: 'https://support.atlassian.com/trello/', github: 'https://github.com/trello', description: 'Tableaux Kanban visuels.', useCases: ['Kanban', 'To-do'], alternatives: ['Notion', 'Jira'], recommendedLevel: 'Débutant', keywords: ['trello', 'kanban'] },
  notion: { name: 'Notion', website: 'https://www.notion.so', documentation: 'https://www.notion.com/help', github: null, description: 'Docs, wikis et bases de données.', useCases: ['Documentation', 'Specs'], alternatives: ['Confluence'], recommendedLevel: 'Débutant', keywords: ['notion', 'wiki'] },
  clickup: { name: 'ClickUp', website: 'https://clickup.com', documentation: 'https://help.clickup.com', github: null, description: 'Productivité et gestion de projet.', useCases: ['Projet', 'Docs'], alternatives: ['Jira'], recommendedLevel: 'Intermédiaire', keywords: ['clickup'] },
  miro: { name: 'Miro', website: 'https://miro.com', documentation: 'https://help.miro.com', github: null, description: 'Tableau blanc collaboratif.', useCases: ['Workshops', 'Schémas'], alternatives: ['FigJam', 'Excalidraw'], recommendedLevel: 'Débutant', keywords: ['miro'] },
  drawio: { name: 'Draw.io', website: 'https://www.drawio.com', documentation: 'https://www.drawio.com/doc/', github: 'https://github.com/jgraph/drawio', description: 'Diagrammes UML et architecture.', useCases: ['UML', 'Flux'], alternatives: ['Excalidraw'], recommendedLevel: 'Débutant', keywords: ['draw.io', 'diagrams.net', 'uml'] },
  excalidraw: { name: 'Excalidraw', website: 'https://excalidraw.com', documentation: 'https://docs.excalidraw.com', github: 'https://github.com/excalidraw/excalidraw', description: 'Schémas hand-drawn style.', useCases: ['Sketch', 'Wireframes'], alternatives: ['Draw.io'], recommendedLevel: 'Débutant', keywords: ['excalidraw'] },
  react: { name: 'React', website: 'https://react.dev', documentation: 'https://react.dev/learn', github: 'https://github.com/facebook/react', description: 'Bibliothèque UI Meta.', useCases: ['SPA', 'Dashboard'], alternatives: ['Vue', 'Angular'], recommendedLevel: 'Intermédiaire', keywords: ['react', 'frontend'] },
  vue: { name: 'Vue.js', website: 'https://vuejs.org', documentation: 'https://vuejs.org/guide/introduction.html', github: 'https://github.com/vuejs/core', description: 'Framework progressif UI.', useCases: ['SPA'], alternatives: ['React'], recommendedLevel: 'Intermédiaire', keywords: ['vue', 'vuejs'] },
  angular: { name: 'Angular', website: 'https://angular.dev', documentation: 'https://angular.dev/overview', github: 'https://github.com/angular/angular', description: 'Framework TypeScript enterprise.', useCases: ['Enterprise'], alternatives: ['React'], recommendedLevel: 'Intermédiaire', keywords: ['angular'] },
  laravel: { name: 'Laravel', website: 'https://laravel.com', documentation: 'https://laravel.com/docs', github: 'https://github.com/laravel/laravel', description: 'Framework PHP.', useCases: ['API', 'SaaS'], alternatives: ['Symfony'], recommendedLevel: 'Intermédiaire', keywords: ['laravel', 'php'] },
  symfony: { name: 'Symfony', website: 'https://symfony.com', documentation: 'https://symfony.com/doc/current/index.html', github: 'https://github.com/symfony/symfony', description: 'Framework PHP modulaire.', useCases: ['Enterprise PHP'], alternatives: ['Laravel'], recommendedLevel: 'Intermédiaire', keywords: ['symfony'] },
  nodejs: { name: 'Node.js', website: 'https://nodejs.org', documentation: 'https://nodejs.org/docs/latest/api/', github: 'https://github.com/nodejs/node', description: 'Runtime JS serveur.', useCases: ['API', 'CLI'], alternatives: ['Deno'], recommendedLevel: 'Intermédiaire', keywords: ['node', 'nodejs'] },
  express: { name: 'Express', website: 'https://expressjs.com', documentation: 'https://expressjs.com/en/guide/routing.html', github: 'https://github.com/expressjs/express', description: 'Framework web Node minimal.', useCases: ['API REST'], alternatives: ['NestJS'], recommendedLevel: 'Intermédiaire', keywords: ['express'] },
  nestjs: { name: 'NestJS', website: 'https://nestjs.com', documentation: 'https://docs.nestjs.com', github: 'https://github.com/nestjs/nest', description: 'Framework Node TypeScript structuré.', useCases: ['API enterprise'], alternatives: ['Express'], recommendedLevel: 'Avancé', keywords: ['nestjs'] },
  postgresql: { name: 'PostgreSQL', website: 'https://www.postgresql.org', documentation: 'https://www.postgresql.org/docs/current/', github: 'https://github.com/postgres/postgres', description: 'SGBD relationnel open source.', useCases: ['Web apps', 'JSONB'], alternatives: ['MySQL'], recommendedLevel: 'Intermédiaire', keywords: ['postgresql', 'postgres', 'sql'] },
  mysql: { name: 'MySQL', website: 'https://www.mysql.com', documentation: 'https://dev.mysql.com/doc/', github: 'https://github.com/mysql/mysql-server', description: 'SGBD relationnel populaire.', useCases: ['LAMP'], alternatives: ['PostgreSQL'], recommendedLevel: 'Intermédiaire', keywords: ['mysql'] },
  mongodb: { name: 'MongoDB', website: 'https://www.mongodb.com', documentation: 'https://www.mongodb.com/docs/', github: 'https://github.com/mongodb/mongo', description: 'Base document NoSQL.', useCases: ['Données flexibles'], alternatives: ['PostgreSQL'], recommendedLevel: 'Intermédiaire', keywords: ['mongodb', 'nosql'] },
  redis: { name: 'Redis', website: 'https://redis.io', documentation: 'https://redis.io/docs/latest/', github: 'https://github.com/redis/redis', description: 'Cache clé-valeur en mémoire.', useCases: ['Cache', 'Sessions'], alternatives: ['Memcached'], recommendedLevel: 'Intermédiaire', keywords: ['redis', 'cache'] },
  figma: { name: 'Figma', website: 'https://www.figma.com', documentation: 'https://help.figma.com', github: null, description: 'Design UI collaboratif.', useCases: ['Maquettes'], alternatives: ['Penpot'], recommendedLevel: 'Débutant', keywords: ['figma', 'design'] },
  jest: { name: 'Jest', website: 'https://jestjs.io', documentation: 'https://jestjs.io/docs/getting-started', github: 'https://github.com/jestjs/jest', description: 'Tests unitaires JS.', useCases: ['Unit tests'], alternatives: ['Vitest'], recommendedLevel: 'Intermédiaire', keywords: ['jest', 'test'] },
  vitest: { name: 'Vitest', website: 'https://vitest.dev', documentation: 'https://vitest.dev/guide/', github: 'https://github.com/vitest-dev/vitest', description: 'Runner tests rapide Vite.', useCases: ['Unit tests'], alternatives: ['Jest'], recommendedLevel: 'Intermédiaire', keywords: ['vitest'] },
  playwright: { name: 'Playwright', website: 'https://playwright.dev', documentation: 'https://playwright.dev/docs/intro', github: 'https://github.com/microsoft/playwright', description: 'Tests E2E Microsoft.', useCases: ['E2E'], alternatives: ['Cypress'], recommendedLevel: 'Intermédiaire', keywords: ['playwright', 'e2e'] },
  cypress: { name: 'Cypress', website: 'https://www.cypress.io', documentation: 'https://docs.cypress.io', github: 'https://github.com/cypress-io/cypress', description: 'Framework E2E interactif.', useCases: ['E2E frontend'], alternatives: ['Playwright'], recommendedLevel: 'Intermédiaire', keywords: ['cypress'] },
  docker: { name: 'Docker', website: 'https://www.docker.com', documentation: 'https://docs.docker.com', github: 'https://github.com/docker', description: 'Conteneurisation standard.', useCases: ['Dev', 'Deploy'], alternatives: ['Podman'], recommendedLevel: 'Intermédiaire', keywords: ['docker', 'dockerfile', 'docker compose', 'container'] },
  kubernetes: { name: 'Kubernetes', website: 'https://kubernetes.io', documentation: 'https://kubernetes.io/docs/home/', github: 'https://github.com/kubernetes/kubernetes', description: 'Orchestrateur conteneurs.', useCases: ['Scale prod'], alternatives: ['Docker Swarm'], recommendedLevel: 'Avancé', keywords: ['kubernetes', 'k8s', 'helm'] },
  'github-actions': { name: 'GitHub Actions', website: 'https://github.com/features/actions', documentation: 'https://docs.github.com/en/actions', github: 'https://github.com/actions', description: 'CI/CD GitHub.', useCases: ['Pipeline CI/CD'], alternatives: ['GitLab CI'], recommendedLevel: 'Intermédiaire', keywords: ['github actions', 'ci', 'cd', 'pipeline'] },
  grafana: { name: 'Grafana', website: 'https://grafana.com', documentation: 'https://grafana.com/docs/grafana/latest/', github: 'https://github.com/grafana/grafana', description: 'Dashboards et alerting.', useCases: ['Monitoring'], alternatives: ['Datadog'], recommendedLevel: 'Intermédiaire', keywords: ['grafana'] },
  prometheus: { name: 'Prometheus', website: 'https://prometheus.io', documentation: 'https://prometheus.io/docs/introduction/overview/', github: 'https://github.com/prometheus/prometheus', description: 'Métriques et alerting.', useCases: ['SRE'], alternatives: ['Datadog'], recommendedLevel: 'Intermédiaire', keywords: ['prometheus'] },
  aws: { name: 'AWS', website: 'https://aws.amazon.com', documentation: 'https://docs.aws.amazon.com', github: 'https://github.com/aws', description: 'Cloud Amazon.', useCases: ['Cloud scale'], alternatives: ['Azure', 'GCP'], recommendedLevel: 'Avancé', keywords: ['aws', 'cloud'] },
  nginx: { name: 'Nginx', website: 'https://nginx.org', documentation: 'https://nginx.org/en/docs/', github: 'https://github.com/nginx/nginx', description: 'Reverse proxy.', useCases: ['SSL', 'Load balance'], alternatives: ['Caddy'], recommendedLevel: 'Intermédiaire', keywords: ['nginx'] },
  lighthouse: { name: 'Lighthouse', website: 'https://developer.chrome.com/docs/lighthouse', documentation: 'https://developer.chrome.com/docs/lighthouse/overview', github: 'https://github.com/GoogleChrome/lighthouse', description: 'Audit perf/SEO/a11y.', useCases: ['Web Vitals'], alternatives: [], recommendedLevel: 'Débutant', keywords: ['lighthouse', 'performance'] },
  k6: { name: 'K6', website: 'https://grafana.com/oss/k6/', documentation: 'https://grafana.com/docs/k6/latest/', github: 'https://github.com/grafana/k6', description: 'Load testing JS.', useCases: ['Stress test'], alternatives: ['JMeter'], recommendedLevel: 'Avancé', keywords: ['k6', 'stress', 'load'] },
  'owasp-zap': { name: 'OWASP ZAP', website: 'https://www.zaproxy.org', documentation: 'https://www.zaproxy.org/docs/', github: 'https://github.com/zaproxy/zaproxy', description: 'Scan sécurité web OWASP.', useCases: ['Pentest'], alternatives: ['Burp'], recommendedLevel: 'Avancé', keywords: ['owasp', 'zap', 'security'] },
  sentry: { name: 'Sentry', website: 'https://sentry.io', documentation: 'https://docs.sentry.io', github: 'https://github.com/getsentry/sentry', description: 'Error tracking prod.', useCases: ['Errors'], alternatives: [], recommendedLevel: 'Intermédiaire', keywords: ['sentry'] },
  vercel: { name: 'Vercel', website: 'https://vercel.com', documentation: 'https://vercel.com/docs', github: 'https://github.com/vercel', description: 'Deploy frontend/Next.js.', useCases: ['Static', 'SSR'], alternatives: ['Netlify'], recommendedLevel: 'Débutant', keywords: ['vercel', 'deploy'] },
  postman: { name: 'Postman', website: 'https://www.postman.com', documentation: 'https://learning.postman.com/docs/', github: 'https://github.com/postmanlabs', description: 'Client et tests API.', useCases: ['API tests'], alternatives: ['Insomnia'], recommendedLevel: 'Débutant', keywords: ['postman', 'api'] },
};

const ALIASES = {
  'draw.io': 'drawio', 'diagrams.net': 'drawio', 'node.js': 'nodejs', 'node': 'nodejs',
  'github actions': 'github-actions', 'postgres': 'postgresql', 'owasp zap': 'owasp-zap',
  'docker compose': 'docker', 'dockerfile': 'docker', 'docker registry': 'docker',
};

function normalizeKey(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function resolveToolId(displayName) {
  const lower = displayName.toLowerCase().trim();
  if (ALIASES[lower]) return ALIASES[lower];
  const key = normalizeKey(displayName);
  if (TOOLS_REGISTRY[key]) return key;
  for (const [id, tool] of Object.entries(TOOLS_REGISTRY)) {
    if (tool.name.toLowerCase() === lower) return id;
    if (tool.keywords?.some((kw) => lower.includes(kw) || kw.includes(lower))) return id;
  }
  return null;
}

export function resolveTool(displayName) {
  const id = resolveToolId(displayName);
  if (!id) return null;
  return enrichTool(id, { ...TOOLS_REGISTRY[id] });
}

export function getEnrichedTool(id) {
  const base = TOOLS_REGISTRY[id];
  return base ? enrichTool(id, { ...base }) : null;
}

export function getAllEnrichedTools() {
  return Object.entries(TOOLS_REGISTRY).map(([id, base]) => enrichTool(id, { ...base }));
}

export function resolveOrStubTool(displayName) {
  const resolved = resolveTool(displayName);
  if (resolved) return resolved;
  const id = normalizeKey(displayName);
  return enrichTool(id, {
    name: displayName,
    description: `Outil « ${displayName} » recommandé pour cette étape du cycle de vie.`,
    website: null,
    documentation: null,
    github: null,
    useCases: ['Usage contextuel au projet'],
    alternatives: [],
    recommendedLevel: 'Intermédiaire',
    keywords: [displayName.toLowerCase()],
  });
}

export function renderToolLinkButtons(tool) {
  const links = [];
  if (tool?.website) links.push({ label: 'Site officiel', url: tool.website, cls: 'btn-tool-site' });
  if (tool?.documentation) links.push({ label: 'Documentation', url: tool.documentation, cls: 'btn-tool-doc' });
  if (tool?.github) links.push({ label: 'GitHub', url: tool.github, cls: 'btn-tool-gh' });
  if (tool?.tutorial) links.push({ label: 'Tutoriel', url: tool.tutorial, cls: 'btn-tool-tuto' });
  return links;
}
