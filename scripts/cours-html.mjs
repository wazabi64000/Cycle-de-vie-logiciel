/** Génération HTML des cours avec shell WazabyCode (navbar + footer) */

const MODULE_CODE_SAMPLES = {
  '03-git-github': `git init
git add .
git commit -m "feat: initial commit"
git branch feature/login
git checkout feature/login`,
  '05-javascript': `const fetchData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
};`,
  '06-bases-donnees': `SELECT u.name, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id;`,
  '08-backend-nodejs': `app.get('/api/users', async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});`,
  '09-react': `function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
  '13-securite': `// Rate limiting + helmet
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));`,
};

export function generateChapterContent(mod, chapterTitle, index) {
  const code = index === 4 && MODULE_CODE_SAMPLES[mod.slug]
    ? MODULE_CODE_SAMPLES[mod.slug]
    : '';

  return `
    <h3>Objectifs du chapitre</h3>
    <p>À l'issue de ce chapitre, vous maîtriserez <strong>${chapterTitle}</strong> dans le cadre du module ${mod.title}.</p>

    <h3>Concepts clés</h3>
    <ul>
      <li>Définition et rôle de ${chapterTitle.toLowerCase()} en entreprise</li>
      <li>Lien avec les objectifs du titre CDA</li>
      <li>Outils et méthodes recommandés</li>
      <li>Erreurs fréquentes et comment les éviter</li>
    </ul>

    <h3>Théorie appliquée</h3>
    <p>
      ${chapterTitle} intervient à l'étape ${index + 1} du module « ${mod.title} ».
      En projet professionnel, cette compétence permet de ${mod.objectives[index % mod.objectives.length]?.toLowerCase() || 'livrer une solution fiable'}.
    </p>

    ${code ? `<h3>Exemple de code</h3><pre class="code-block">${code}</pre>` : ''}

    <h3>Workflow</h3>
    <div class="diagram">Théorie — ${chapterTitle}
    ↓
Exemple guidé
    ↓
Exercice (niveau adapté)
    ↓
Quiz de validation</div>

    <h3>Démonstration</h3>
    <div class="demo-bad">
      <strong>Mauvaise pratique :</strong> ignorer ${chapterTitle.toLowerCase()} et improviser.<br>
      <strong>Conséquence :</strong> dette technique, retards, bugs en production.
    </div>
    <div class="demo-good">
      <strong>Bonne pratique :</strong> appliquer ${chapterTitle.toLowerCase()} dès le début du projet.<br>
      <strong>Résultat :</strong> code maintenable, équipe alignée, livraison maîtrisée.
    </div>

    <h3>À retenir</h3>
    <ul>
      <li>${chapterTitle} — chapitre ${index + 1} / ${mod.chapters.length}</li>
      <li>Durée module : ${mod.duration} · Niveau : ${mod.level}</li>
      <li>Prépare le TP : « ${mod.tps[Math.min(index, mod.tps.length - 1)].title} »</li>
    </ul>`;
}

export function generateCoursHtml(mod) {
  const chaptersHtml = mod.chapters
    .map(
      (ch, i) => `
    <section id="chapitre-${i + 1}" class="chapitre">
      <h2>Chapitre ${i + 1} — ${ch}</h2>
      <div class="contenu-chapitre">${generateChapterContent(mod, ch, i)}</div>
    </section>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Module ${mod.id} — ${mod.title} | WazabyCode</title>
  <link rel="stylesheet" href="../../css/main.css">
  <link rel="stylesheet" href="../../css/cours.css">
</head>
<body class="cours-page"
  data-module-slug="${mod.slug}"
  data-module-id="${mod.id}"
  data-module-title="${mod.title.replace(/"/g, '&quot;')}"
  data-module-duration="${mod.duration}"
  data-module-level="${mod.level.replace(/"/g, '&quot;')}">

  <div id="navbar-root"></div>

  <main class="page-main">
    <div class="cours-hero">
      <div class="container">
        <a href="../../dashboard.html" class="cours-back">← Retour au tableau de bord</a>
        <h1>Module ${mod.id} — ${mod.title}</h1>
        <p>${mod.subtitle}</p>
        <div class="cours-meta">
          <span class="cours-badge">⏱ ${mod.duration}</span>
          <span class="cours-badge">📊 ${mod.level}</span>
          <span class="cours-badge">📚 ${mod.chapters.length} chapitres</span>
        </div>
      </div>
    </div>

    <article class="cours-container container">

      <section id="introduction">
        <h2>1. Introduction</h2>
        <h3>Pourquoi ce sujet existe ?</h3>
        <p>${mod.intro.why}</p>
        <h3>Où intervient-il ?</h3>
        <p>${mod.intro.where}</p>
        <h3>Quels problèmes résout-il ?</h3>
        <p>${mod.intro.problems}</p>
      </section>

      <section id="theorie">
        <h2>2. Théorie simplifiée</h2>
        <h3>Définition simple</h3>
        <p>${mod.title} : compétence centrale du développeur d'applications moderne.</p>
        <h3>Définition métier</h3>
        <p>Attendue en entreprise pour contribuer à des projets logiciels en équipe.</p>
        <h3>Définition technique</h3>
        <p>${mod.chapters.length} chapitres progressifs, du concept à la pratique professionnelle.</p>
        <h3>Cas d'usage réels</h3>
        <ul>${mod.objectives.slice(0, 5).map((o) => `<li>${o}</li>`).join('\n          ')}</ul>
      </section>

      <section id="visualisation">
        <h2>3. Visualisation</h2>
        <div class="diagram">Apprenant WazabyCode
    ↓
Module ${mod.id} — ${mod.title}
    ↓
${mod.chapters.slice(0, 5).join('\n    ↓\n')}
    ↓
Quiz + TP + Certification</div>
      </section>

      <section id="demonstration">
        <h2>4. Démonstration</h2>
        <div class="demo-bad">
          <strong>❌ Mauvaise pratique :</strong> sauter la théorie de ${mod.title.toLowerCase()}.<br>
          <strong>Conséquence :</strong> erreurs coûteuses en projet.
        </div>
        <div class="demo-good">
          <strong>✅ Bonne pratique :</strong> suivre le parcours chapitre par chapitre.<br>
          <strong>Résultat :</strong> compétence durable et score WazabyCode en hausse.
        </div>
      </section>

      <section id="exemples">
        <h2>5. Exemples</h2>
        <div class="example-grid">
          <div class="example-card level-debutant"><h4>Simple</h4><p>Premiers pas avec ${mod.title.toLowerCase()}.</p></div>
          <div class="example-card level-intermediaire"><h4>Intermédiaire</h4><p>Cas proche d'un projet réel.</p></div>
          <div class="example-card level-avance"><h4>Avancé</h4><p>Architecture et bonnes pratiques.</p></div>
          <div class="example-card level-pro"><h4>Professionnel</h4><p>${mod.tps[2]?.description || mod.tps[0].description}</p></div>
        </div>
      </section>

      <section id="exercices">
        <h2>6. Exercices</h2>
        <p>Consultez <code>exercices.json</code> — niveaux : débutant, intermédiaire, avancé, expert.</p>
      </section>

      <section id="tp">
        <h2>7. Travaux pratiques</h2>
        ${mod.tps
          .map(
            (tp) => `
        <div class="example-card" style="margin:1rem 0">
          <h4>${tp.title} <span class="cours-badge">${tp.level}</span></h4>
          <p>${tp.description}</p>
          <p><em>Durée : ${tp.duration}</em></p>
        </div>`
          )
          .join('')}
      </section>

      <nav class="cours-toc">
        <h2>Chapitres du module</h2>
        <ol>${mod.chapters.map((c, i) => `<li><a href="#chapitre-${i + 1}">${c}</a></li>`).join('\n          ')}</ol>
      </nav>

      ${chaptersHtml}

    </article>
  </main>

  <div id="footer-root"></div>
  <script type="module">
    import { initShell } from '../../js/ui/layout.js';
    initShell('module');
  </script>
  <script type="module" src="../../js/app/course-view.js"></script>
</body>
</html>`;
}
