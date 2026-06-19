/** Pédagogie enrichie — modules DWWM étendus (ressources, cas réels, BP, erreurs) */

const LEVEL_LABELS = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  professionnel: 'Professionnel',
};

function lvl(bp, cm, cases) {
  return { bestPractices: bp, commonMistakes: cm, realCases: cases };
}

function res(label, url, type = 'official') {
  return { label, url, type };
}

function caseEx(title, summary) {
  return { title, summary };
}

/** @param {string} slug @param {{ resources: object[], levels: object }} data */
function pack(slug, resources, levels) {
  return { slug, resources, levels };
}

const PEDAGOGY = {
  'analyse-besoin': pack('analyse-besoin', [
    res('Guide Agile — User Stories', 'https://www.atlassian.com/agile/project-management/user-stories'),
    res('RNCP DWWM — Compétences analyse', 'https://www.francecompetences.fr/recherche/rncp/37674/'),
    res('Jira', 'https://www.atlassian.com/software/jira', 'tool'),
  ], {
    debutant: lvl(
      ['Commencer par le problème utilisateur, pas la solution', 'Lister tous les acteurs', 'Rédiger 3 US courtes et testables'],
      ['Confondre besoin et feature technique', 'Oublier le commanditaire', 'US sans critère d\'acceptation'],
      [caseEx('Artisan local', 'Besoin : visibilité en ligne. US : « En tant que visiteur, je veux voir les services pour contacter l\'artisan ».')],
    ),
    intermediaire: lvl(
      ['Structurer le CDC par sections', 'Prioriser le backlog MoSCoW', 'Valider les cas d\'utilisation avec le client'],
      ['CDC sans périmètre MVP', 'Critères d\'acceptation flous', 'Pas de contraintes NFR'],
      [caseEx('App RDV coiffure', 'CU « Prendre RDV » : scénario nominal + créneau indisponible + annulation.')],
    ),
    professionnel: lvl(
      ['Workshop discovery documenté', 'Matrice risques + RACI', 'Validation signée avant dev intensif'],
      ['Scope creep sans change request', 'NFR oubliés (RGPD, perf)', 'Analyse technique imposée trop tôt'],
      [caseEx('Marketplace B2B', 'CDC 40p : contexte, MVP corridor géographique, NFR 99.5% dispo, planning par sprint.')],
    ),
  }),

  personas: pack('personas', [
    res('NN/g — Personas', 'https://www.nngroup.com/articles/persona/'),
    res('Miro — Templates personas', 'https://miro.com/templates/persona/'),
  ], {
    debutant: lvl(
      ['Basé sur des données réelles (interviews)', '1 objectif + 1 frustration par persona', 'Nom et citation mémorables'],
      ['Stéréotypes sans données', 'Persona = profil du développeur', 'Trop de personas (max 3–5)'],
      [caseEx('E-commerce', '« Sophie, 34 ans, compare les prix sur mobile le soir ».')],
    ),
    intermediaire: lvl(
      ['Lier chaque persona à des user stories', 'Scénarios d\'usage par persona', 'Partager en atelier équipe + client'],
      ['Personas jamais mis à jour', 'Pas de lien avec analytics', 'Personas génériques « utilisateur »'],
      [caseEx('SaaS RH', 'Admin IT vs manager vs salarié — parcours et pain points distincts.')],
    ),
    professionnel: lvl(
      ['Personas versionnés dans Notion/Confluence', 'Retours utilisateurs intégrés trimestriellement', 'Tests UX guidés par persona'],
      ['Personas décoratifs non utilisés en sprint planning', 'Données inventées'],
      [caseEx('Banque en ligne', 'Persona senior non digital + persona digital native → parcours accessibilité différenciés.')],
    ),
  }),

  benchmark: pack('benchmark', [
    res('SimilarWeb', 'https://www.similarweb.com'),
    res('Google Trends', 'https://trends.google.com'),
    res('BuiltWith', 'https://builtwith.com'),
  ], {
    debutant: lvl(
      ['Comparer 3 concurrents minimum', 'Noter forces/faiblesses factuelles', 'Capturer des screenshots UX'],
      ['Copier sans analyser', 'Ignorer les indirects', 'Benchmark sans critères'],
      [caseEx('App livraison', 'Comparatif Deliveroo/Uber Eats : checkout, temps, frais, app mobile.')],
    ),
    intermediaire: lvl(
      ['Matrice fonctionnelle (feature grid)', 'Analyse UX heuristique Nielsen', 'SWOT marché documenté'],
      ['Benchmark superficiel (homepage seule)', 'Pas de recommandations actionnables'],
      [caseEx('CRM PME', 'Matrice : pipeline, email, mobile, API, pricing — gaps identifiés pour différenciation.')],
    ),
    professionnel: lvl(
      ['Présentation benchmark au client', 'Veille concurrentielle planifiée', 'Lien benchmark → backlog priorisé'],
      ['Données SimilarWeb interprétées sans contexte', 'Benchmark figé 2 ans'],
      [caseEx('EdTech', 'Trends « cours en ligne » + BuiltWith stack concurrent + UX audit onboarding.')],
    ),
  }),

  maquettage: pack('maquettage', [
    res('Figma', 'https://www.figma.com'),
    res('Penpot', 'https://penpot.app'),
    res('Laws of UX', 'https://lawsofux.com'),
  ], {
    debutant: lvl(
      ['Wireframe avant couleurs finales', 'Mobile-first', 'Navigation claire dès le wireframe'],
      ['Maquette haute fidélité trop tôt', 'Ignorer le responsive', 'Pas de parcours utilisateur'],
      [caseEx('Landing page', 'Wireframe : hero, CTA, 3 features, footer — testé en 30 min sur Figma.')],
    ),
    intermediaire: lvl(
      ['Prototype cliquable 5+ écrans', 'Design system couleurs/typo/espacements', 'User journey map complète'],
      ['Prototype sans états erreur/loading', 'Handoff dev incomplet'],
      [caseEx('App mobile', 'Prototype Figma : login → liste → détail → action — test guérilla 5 users.')],
    ),
    professionnel: lvl(
      ['Tests utilisateurs sur prototype', 'Specs dev (spacing, tokens)', 'Accessibilité couleurs WCAG AA'],
      ['Design non maintenu post-lancement', 'Composants non réutilisables'],
      [caseEx('Dashboard SaaS', 'Design system 20 composants + prototype testé + export assets dev.')],
    ),
  }),

  'architecture-web': pack('architecture-web', [
    res('MDN — Web architecture', 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work'),
    res('C4 Model', 'https://c4model.com'),
  ], {
    debutant: lvl(
      ['Schéma 3 tiers : client → serveur → BDD', 'Séparer front et back', 'Documenter le flux HTTP'],
      ['Logique métier dans le front', 'Pas de schéma', 'Confondre API et BDD'],
      [caseEx('Blog', 'HTML/JS → API PHP → MySQL — diagramme simple Draw.io.')],
    ),
    intermediaire: lvl(
      ['Diagramme C4 niveau 1–2', 'Justifier choix stack', 'ADR pour décisions clés'],
      ['Couplage fort front/BDD', 'Pas de versioning API'],
      [caseEx('E-commerce', 'React SPA → API REST Node → PostgreSQL + Redis cache sessions.')],
    ),
    professionnel: lvl(
      ['Schéma déploiement inclus', 'Points de scalabilité identifiés', 'Sécurité by design documentée'],
      ['Architecture non mise à jour', 'Over-engineering microservices prématuré'],
      [caseEx('Plateforme e-learning', 'C4 + ADR auth JWT + schéma déploiement Docker Compose staging/prod.')],
    ),
  }),

  'serveurs-web': pack('serveurs-web', [
    res('Apache HTTP Server', 'https://httpd.apache.org/docs/'),
    res('Nginx', 'https://nginx.org/en/docs/'),
    res('Caddy', 'https://caddyserver.com/docs/'),
  ], {
    debutant: lvl(
      ['Comprendre HTTP/HTTPS', 'Virtual host local configuré', 'Page statique servie'],
      ['Confondre serveur web et app server', 'SSL mal configuré'],
      [caseEx('Site vitrine', 'Apache VirtualHost local :8080 → dossier public/ avec index.html.')],
    ),
    intermediaire: lvl(
      ['Reverse proxy Nginx vers Node/PHP', 'Logs access/error analysés', 'Let\'s Encrypt ou Caddy SSL'],
      ['Proxy sans headers X-Forwarded-*', 'Pas de rotation logs'],
      [caseEx('App Node', 'Nginx :443 → proxy_pass localhost:3000 + certificat SSL.')],
    ),
    professionnel: lvl(
      ['Load balancing 2+ instances', 'Comparatif Apache/Nginx/Caddy documenté', 'Headers sécurité (HSTS, CSP)'],
      ['Root inutile en prod', 'Config non versionnée'],
      [caseEx('Prod PME', 'Nginx LB → 2 containers app + Caddy SSL edge + monitoring 502.')],
    ),
  }),

  'serveurs-javascript': pack('serveurs-javascript', [
    res('Node.js', 'https://nodejs.org/docs/latest/api/'),
    res('Express', 'https://expressjs.com'),
    res('NestJS', 'https://docs.nestjs.com'),
  ], {
    debutant: lvl(
      ['Serveur Express minimal', 'Routes GET/POST', 'package.json + npm scripts'],
      ['Callback hell sans async', 'Secrets en dur', 'Pas de gestion erreurs'],
      [caseEx('API hello', 'Express : GET /api/hello → JSON { message: "OK" }.')],
    ),
    intermediaire: lvl(
      ['CRUD REST complet', 'Middleware validation + auth', 'Structure modules NestJS'],
      ['Routes sans validation', 'Pas de tests API'],
      [caseEx('API todos', 'Express CRUD /todos + middleware JWT + Supertest.')],
    ),
    professionnel: lvl(
      ['Injection dépendances NestJS', 'Comparatif Express/NestJS justifié', 'Rate limiting + helmet'],
      ['Monolithe Node non structuré', 'Pas de graceful shutdown'],
      [caseEx('API SaaS', 'NestJS modules Auth/Users/Billing + guards + OpenAPI spec.')],
    ),
  }),

  'serveurs-php-avances': pack('serveurs-php-avances', [
    res('Laravel', 'https://laravel.com/docs'),
    res('Symfony', 'https://symfony.com/doc/current/index.html'),
    res('PHP.net', 'https://www.php.net/docs.php'),
  ], {
    debutant: lvl(
      ['Comprendre quand rester en PHP natif', 'Première route Laravel/Symfony', 'Composer install'],
      ['Mélanger HTML et SQL sans ORM', 'Ignorer PSR'],
      [caseEx('Petit site', 'PHP natif OK pour 3 pages ; Laravel dès CRUD + auth.')],
    ),
    intermediaire: lvl(
      ['CRUD Eloquent/Doctrine', 'Migrations versionnées', 'API REST Resources/Platform'],
      ['Fat controllers', 'Pas de validation FormRequest'],
      [caseEx('Blog Laravel', 'Models Post/User, migrations, API /api/posts, Sanctum auth.')],
    ),
    professionnel: lvl(
      ['Services + DI Symfony', 'Auth Laravel Passport/Sanctum prod', 'Choix framework argumenté'],
      ['Logique métier dans controllers', 'Pas de tests PHPUnit'],
      [caseEx('ERP léger', 'Symfony services + API Platform + Doctrine + JWT + tests fonctionnels.')],
    ),
  }),

  'sgbd-relationnels': pack('sgbd-relationnels', [
    res('PostgreSQL Docs', 'https://www.postgresql.org/docs/current/'),
    res('MySQL Docs', 'https://dev.mysql.com/doc/'),
    res('MariaDB Docs', 'https://mariadb.com/kb/en/documentation/'),
    res('SQLite', 'https://www.sqlite.org/docs.html'),
  ], {
    debutant: lvl(
      ['Comprendre différences SGBD', 'Créer schéma sur 2 SGBD test', 'Types de données adaptés'],
      ['SQLite en prod haute concurrence', 'Confondre MySQL et MariaDB admin'],
      [caseEx('Dev local', 'SQLite pour prototyper ; PostgreSQL pour staging/prod.')],
    ),
    intermediaire: lvl(
      ['Justifier choix SGBD projet', 'Migrations Flyway/Prisma/Laravel', 'Index sur FK'],
      ['SELECT * partout', 'Pas de backup testé'],
      [caseEx('SaaS EU', 'PostgreSQL JSONB + RLS multi-tenant ; MariaDB pour legacy LAMP.')],
    ),
    professionnel: lvl(
      ['Backup/restauration testée', 'Réplication ou HA esquissée', 'EXPLAIN ANALYZE sur requêtes lentes'],
      ['N+1 queries', 'Pas de stratégie migration zero-downtime'],
      [caseEx('Marketplace', 'PostgreSQL master + read replica ; Redis cache ; backup quotidien testé mensuellement.')],
    ),
  }),

  nosql: pack('nosql', [
    res('MongoDB Docs', 'https://www.mongodb.com/docs/'),
    res('Redis Docs', 'https://redis.io/docs/latest/'),
  ], {
    debutant: lvl(
      ['Distinguer SQL vs NoSQL', 'Insert/read document MongoDB', 'SET/GET Redis'],
      ['NoSQL pour tout remplacer SQL', 'Redis comme BDD principale sans persistence'],
      [caseEx('Catalogue produits', 'MongoDB si attributs produits très variables ; PostgreSQL si reporting SQL.')],
    ),
    intermediaire: lvl(
      ['Cache Redis sur API', 'TTL et invalidation', 'Modèle document justifié'],
      ['Cache sans stratégie invalidation', 'Documents MongoDB non indexés'],
      [caseEx('Session store', 'Redis sessions + PostgreSQL données métier — polyglot persistence.')],
    ),
    professionnel: lvl(
      ['Architecture polyglotte documentée', 'Redis persistence AOF/RDB si critique', 'Trade-offs expliqués client'],
      ['Eventual consistency ignorée', 'MongoDB transactions mal comprises'],
      [caseEx('Feed social', 'MongoDB posts ; Redis timeline cache ; PostgreSQL users/billing.')],
    ),
  }),

  authentification: pack('authentification', [
    res('OWASP Auth Cheat Sheet', 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'),
    res('JWT.io', 'https://jwt.io/introduction'),
    res('OAuth 2.0', 'https://oauth.net/2/'),
  ], {
    debutant: lvl(
      ['Mots de passe hashés (bcrypt/argon2)', 'Sessions + cookie HttpOnly/Secure', 'Login/logout fonctionnel'],
      ['MD5/sha1 pour passwords', 'JWT dans localStorage sans réflexion', 'Pas de logout'],
      [caseEx('Site membre', 'Session PHP + password_hash ; cookie Secure en prod HTTPS.')],
    ),
    intermediaire: lvl(
      ['JWT access + refresh token', 'OAuth2 login Google/GitHub', 'Rate limiting login'],
      ['Refresh token sans rotation', 'OAuth sans state param (CSRF)'],
      [caseEx('SPA + API', 'JWT Bearer API ; refresh httpOnly cookie ; OAuth GitHub login.')],
    ),
    professionnel: lvl(
      ['OpenID Connect si SSO', 'MFA pour admin', 'Audit flux auth + rotation secrets'],
      ['Secrets JWT jamais rotés', 'Sessions sans expiration'],
      [caseEx('SaaS B2B', 'OIDC enterprise SSO + RBAC + audit logs connexions.')],
    ),
  }),

  'tests-web': pack('tests-web', [
    res('Jest', 'https://jestjs.io/docs/getting-started'),
    res('Vitest', 'https://vitest.dev/guide/'),
    res('Playwright', 'https://playwright.dev/docs/intro'),
    res('PHPUnit', 'https://phpunit.de/documentation.html'),
    res('K6', 'https://grafana.com/docs/k6/latest/'),
  ], {
    debutant: lvl(
      ['5 tests unitaires minimum', 'Collection Postman API', '1 scénario E2E login'],
      ['Tester uniquement happy path', 'Données prod en test'],
      [caseEx('API auth', 'Tests : login OK, mauvais MDP, register, email dupliqué, token expiré.')],
    ),
    intermediaire: lvl(
      ['Pyramide tests respectée', 'CI exécute tests au push', 'Smoke test charge K6'],
      ['100% E2E', 'Tests flaky non corrigés'],
      [caseEx('E-commerce', 'Jest unit + Supertest API + Playwright checkout + K6 100 users.')],
    ),
    professionnel: lvl(
      ['TDD sur modules critiques', 'Contract tests API', 'Critères sortie release définis'],
      ['Couverture 100% sans assertions métier', 'Pas de tests charge avant prod'],
      [caseEx('ERP', 'Pyramide 70/20/10 ; PHPUnit domaine ; Playwright parcours commande ; K6 p95 < 500ms.')],
    ),
  }),

  'qa-assurance': pack('qa-assurance', [
    res('ISTQB — Glossaire', 'https://glossary.istqb.org/'),
    res('Ministère — Référentiel DWWM', 'https://www.francecompetences.fr/recherche/rncp/37674/'),
  ], {
    debutant: lvl(
      ['Checklist recette rédigée', 'Bug report structuré (steps, expected, actual)', 'Smoke test post-deploy'],
      ['Cocher recette sans tester', 'Bugs sans reproduction'],
      [caseEx('Release v1.0', 'Smoke : home, login, action métier, logout — 15 min post-deploy.')],
    ),
    intermediaire: lvl(
      ['Plan régression automatisé + manuel', 'UAT planifiée client staging', 'Definition of Done avec QA'],
      ['Régression manuelle totale', 'Pas d\'environnement staging'],
      [caseEx('Sprint release', 'Suite auto 200 tests + checklist exploratoire + UAT sign-off client.')],
    ),
    professionnel: lvl(
      ['Métriques qualité (defect density, escape rate)', 'Zero bug bloquant prod', 'Post-mortem qualité'],
      ['UAT = développeur seul', 'Pas de critères sortie objectifs'],
      [caseEx('SaaS mensuel', 'Release train ; regression 4h ; UAT 2j ; rollback < 15 min si P1.')],
    ),
  }),

  'securite-web': pack('securite-web', [
    res('OWASP Top 10', 'https://owasp.org/www-project-top-ten/'),
    res('OWASP ZAP', 'https://www.zaproxy.org/docs/'),
    res('Security Headers', 'https://securityheaders.com'),
  ], {
    debutant: lvl(
      ['Parcourir OWASP Top 10', 'Requêtes préparées partout', 'Headers sécurité basiques'],
      ['XSS via innerHTML non échappé', 'Mots de passe clairs en BDD'],
      [caseEx('Formulaire contact', 'Validation serveur + htmlspecialchars + CSRF token.')],
    ),
    intermediaire: lvl(
      ['Scan ZAP sans alerte haute', 'CSP configurée', 'Auth rate limiting'],
      ['CORS * en prod', 'Secrets en Git'],
      [caseEx('API publique', 'ZAP baseline CI ; helmet.js ; validation Joi/Zod ; secrets env.')],
    ),
    professionnel: lvl(
      ['Threat modeling STRIDE léger', 'Plan remédiation vulnérabilités', 'Pentest autorisé documenté'],
      ['Security by obscurity', 'Pas de mise à jour dépendances'],
      [caseEx('Marketplace', 'OWASP ASVS L1 ; audit ZAP + headers A+ ; SAST Dependabot ; RGPD.')],
    ),
  }),

  seo: pack('seo', [
    res('Google Search Central', 'https://developers.google.com/search/docs'),
    res('Lighthouse', 'https://developer.chrome.com/docs/lighthouse/overview'),
  ], {
    debutant: lvl(
      ['Title/description uniques', 'H1 par page', 'robots.txt + sitemap.xml'],
      ['Keyword stuffing', 'Pages sans meta description', 'Images sans alt'],
      [caseEx('Site vitrine', 'Title « Plombier Lyon — Devis 24h » ; sitemap 5 URLs ; Search Console.')],
    ),
    intermediaire: lvl(
      ['Lighthouse SEO > 90', 'URLs propres + canonical', 'Open Graph basique'],
      ['Contenu dupliqué', 'Sitemap non soumis'],
      [caseEx('Blog tech', 'Schema Article ; hreflang si multilingue ; Core Web Vitals OK.')],
    ),
    professionnel: lvl(
      ['Stratégie mots-clés + contenu', 'JSON-LD Organization/Product', 'Suivi positions trimestriel'],
      ['SEO technique sans contenu qualité', 'Cloaking ou black hat'],
      [caseEx('E-commerce', 'Schema Product ; sitemap index ; Search Console monitoring ; perf mobile.')],
    ),
  }),

  'performance-web': pack('performance-web', [
    res('Web Vitals', 'https://web.dev/vitals/'),
    res('Lighthouse', 'https://developer.chrome.com/docs/lighthouse/overview'),
  ], {
    debutant: lvl(
      ['Images compressées WebP', 'loading="lazy" below fold', 'Audit Lighthouse perf'],
      ['Images 4K non redimensionnées', '10 scripts bloquants'],
      [caseEx('Landing', 'Hero WebP 80KB ; defer JS ; LCP amélioré de 4s à 2s.')],
    ),
    intermediaire: lvl(
      ['LCP < 2.5s cible', 'Bundle JS analysé (webpack/vite)', 'Cache-Control headers'],
      ['Pas de dimensions img (CLS)', 'API sans pagination'],
      [caseEx('SPA React', 'Code splitting routes ; CDN assets ; Redis cache API ; INP < 200ms.')],
    ),
    professionnel: lvl(
      ['Budget perf en CI', 'RUM Web Vitals prod', 'CDN edge + HTTP/2'],
      ['Optimiser sans mesurer', 'Cache invalidation chaotique'],
      [caseEx('Media site', 'LCP 1.8s field data ; lazy + prefetch ; service worker cache static.')],
    ),
  }),

  'devops-debutant': pack('devops-debutant', [
    res('Docker Docs', 'https://docs.docker.com'),
    res('12-Factor App', 'https://12factor.net'),
  ], {
    debutant: lvl(
      ['Dockerfile fonctionnel', 'docker-compose up en 1 commande', '.env.example sans secrets'],
      ['Secrets dans Dockerfile', 'Root container inutile'],
      [caseEx('Dev local', 'Compose : web + postgres ; README « docker compose up ».')],
    ),
    intermediaire: lvl(
      ['Multi-service compose', 'Volumes persistants BDD', 'Logs docker compose logs -f'],
      ['latest tag en prod', 'Pas de .dockerignore'],
      [caseEx('Stack DWWM', 'App Node + PostgreSQL + volume pgdata ; env DATABASE_URL.')],
    ),
    professionnel: lvl(
      ['Multi-stage build', 'Healthchecks containers', 'Runbook onboarding dev 30 min'],
      ['Compose prod sans secrets manager', 'Images non scannées'],
      [caseEx('CI local', 'Compose identique staging ; healthcheck /health ; non-root user.')],
    ),
  }),

  cicd: pack('cicd', [
    res('GitHub Actions', 'https://docs.github.com/en/actions'),
    res('GitHub Actions — Starter workflows', 'https://github.com/actions/starter-workflows'),
  ], {
    debutant: lvl(
      ['Workflow lint + test au push', 'Badge README', 'Secrets non committés'],
      ['Pipeline sans tests', 'Deploy manuel non documenté'],
      [caseEx('Projet DWWM', 'Actions : npm test + eslint on push main ; badge vert README.')],
    ),
    intermediaire: lvl(
      ['Tests bloquent merge (branch protection)', 'Deploy staging auto', 'Artifacts build'],
      ['Deploy prod direct sans staging', 'Secrets en YAML clair'],
      [caseEx('App full-stack', 'Push → test → build Docker → deploy Render staging.')],
    ),
    professionnel: lvl(
      ['Pipeline build→test→deploy prod gated', 'Rollback documenté', 'Review required + environments'],
      ['Pas de notification échec CI', 'Flaky tests ignorés en CI'],
      [caseEx('SaaS', 'GitHub Environments prod approval ; blue-green deploy ; Sentry release tracking.')],
    ),
  }),

  hebergement: pack('hebergement', [
    res('AWS', 'https://docs.aws.amazon.com'),
    res('Azure', 'https://learn.microsoft.com/azure/'),
    res('Google Cloud', 'https://cloud.google.com/docs'),
  ], {
    debutant: lvl(
      ['Différencier mutualisé/VPS/cloud', 'Site en ligne HTTPS', 'Coût mensuel estimé'],
      ['Prod sur free tier sans limites', 'Pas de backup'],
      [caseEx('Portfolio DWWM', 'Vercel/Netlify gratuit ; domaine .fr ; HTTPS auto.')],
    ),
    intermediaire: lvl(
      ['VPS Ubuntu provisionné', 'DNS A/CNAME configuré', 'Backup hebdomadaire'],
      ['SSH password auth', 'Firewall non configuré'],
      [caseEx('PME', 'OVH VPS Debian ; Nginx ; Let\'s Encrypt ; backup rsync.')],
    ),
    professionnel: lvl(
      ['Comparatif coût/TTFM/scale', 'Architecture cloud multi-AZ esquissée', 'DR plan documenté'],
      ['Cloud sans billing alerts', 'Données EU hors région sans accord'],
      [caseEx('Scale-up', 'AWS ECS + RDS + CloudFront ; Terraform esquisse ; RTO 4h.')],
    ),
  }),

  monitoring: pack('monitoring', [
    res('Sentry Docs', 'https://docs.sentry.io'),
    res('Grafana', 'https://grafana.com/docs/grafana/latest/'),
    res('Prometheus', 'https://prometheus.io/docs/introduction/overview/'),
  ], {
    debutant: lvl(
      ['Logs structurés JSON', 'Sentry ou équivalent', 'Alerte email sur 500'],
      ['console.log seul en prod', 'Pas de corrélation request-id'],
      [caseEx('App MVP', 'Sentry free tier ; alerte Slack #errors ; logs stdout Docker.')],
    ),
    intermediaire: lvl(
      ['Dashboard uptime/latence', 'Endpoint /health', 'Runbook incident 1 page'],
      ['Alertes non actionnables', 'Pas de rétention logs'],
      [caseEx('API prod', 'Prometheus scrape /metrics ; Grafana dashboard ; PagerDuty P1.')],
    ),
    professionnel: lvl(
      ['SLI/SLO définis', 'Post-mortem blameless', 'Alerting tuning anti-fatigue'],
      ['Monitoring = uptime seul', 'Pas de tracing distribué'],
      [caseEx('SaaS', 'SLO 99.9% ; error budget ; Grafana on-call ; post-mortem template.')],
    ),
  }),

  'projet-fil-rouge': pack('projet-fil-rouge', [
    res('Référentiel RNCP37674', 'https://www.francecompetences.fr/recherche/rncp/37674/'),
    res('GitHub', 'https://docs.github.com'),
  ], {
    debutant: lvl(
      ['Sujet validé formateur/client', 'Repo GitHub + README', 'Analyse + 2 personas'],
      ['Projet trop ambitieux', 'Sans Git dès J1'],
      [caseEx('E-learning MVP', 'Catalogue cours + inscription ; personas apprenant/formateur.')],
    ),
    intermediaire: lvl(
      ['Maquettes Figma + MVP', 'API CRUD + BDD', 'Tests + staging deploy'],
      ['Front sans back connecté', 'Pas de doc technique'],
      [caseEx('Marketplace locale', 'Analyse→maquettes→React+API Node+PostgreSQL→tests Postman→Render.')],
    ),
    professionnel: lvl(
      ['Prod HTTPS + monitoring', 'Dossier projet complet', 'Présentation 20 min + démo backup'],
      ['Démo sans plan B', 'Sécurité ignorée en soutenance'],
      [caseEx('Soutenance DWWM', 'Parcours complet 11 étapes ; GitHub public ; Sentry ; Q&R technique préparées.')],
    ),
  }),
};

export function getDwwmPedagogy(moduleId) {
  return PEDAGOGY[moduleId] ?? null;
}

export function enrichDwwmModule(mod) {
  const pedagogy = PEDAGOGY[mod.id];
  if (!pedagogy) return mod;
  return { ...mod, pedagogy };
}

export function enrichDwwmModules(modules) {
  return modules.map(enrichDwwmModule);
}

/** Knowledge modal pour checklists DWWM étendues */
export function buildDwwmChecklistKnowledge(moduleId, level, label, moduleWhy, mod) {
  const ped = PEDAGOGY[moduleId];
  if (!ped) return null;

  const levelData = ped.levels[level] ?? ped.levels.debutant;
  const topic = mod?.topics?.[0];
  const levelLabel = LEVEL_LABELS[level] ?? level;

  return {
    label,
    themeId: moduleId,
    level,
    definition: `« ${label} » — livrable ${levelLabel} du module ${mod?.title ?? moduleId}. ${topic?.body?.slice(0, 100) ?? ''}`,
    why: [
      moduleWhy?.slice(0, 120) ?? 'Compétence essentielle du parcours DWWM professionnel.',
      'Étape traçable pour le dossier projet et la soutenance.',
      'Aligne pratique et référentiel titre.',
    ],
    example: {
      title: levelData.realCases?.[0]?.title ?? 'Cas DWWM',
      diagram: levelData.realCases?.[0]?.summary ?? `Équipe → ${label} → Livrable validé`,
    },
    tools: mod?.tools ?? [],
    bestPractices: levelData.bestPractices ?? [],
    commonMistakes: levelData.commonMistakes ?? [],
    depthLevels: {
      debutant: ped.levels.debutant?.bestPractices?.[0] ?? LEVEL_LABELS.debutant,
      intermediaire: ped.levels.intermediaire?.bestPractices?.[0] ?? LEVEL_LABELS.intermediaire,
      professionnel: ped.levels.professionnel?.bestPractices?.[0] ?? LEVEL_LABELS.professionnel,
    },
    image: null,
    weight: null,
  };
}

export { PEDAGOGY as DWWM_MODULE_PEDAGOGY };
