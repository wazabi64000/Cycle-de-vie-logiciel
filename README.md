# Cycle-de-vie-logiciel — WazabyCode LMS CDA

Plateforme pédagogique **100 % statique** pour la formation **Concepteur Développeur d'Applications** (CDA).

- HTML, CSS, JavaScript uniquement
- Données en **localStorage** (pas de compte, pas de SQL)
- 22 modules · progression · badges · certificat

## GitHub Pages (production)

Site en ligne après push sur `main` :

**https://wazabi64000.github.io/Cycle-de-vie-logiciel/**

| Page | URL |
|------|-----|
| Accueil | https://wazabi64000.github.io/Cycle-de-vie-logiciel/ |
| Dashboard | https://wazabi64000.github.io/Cycle-de-vie-logiciel/dashboard.html |
| Module JS | https://wazabi64000.github.io/Cycle-de-vie-logiciel/module.html?slug=05-javascript |

### Activer GitHub Pages (une seule fois)

1. Repo GitHub → **Settings** → **Pages**
2. **Build and deployment** → Source : **GitHub Actions**
3. Push sur `main` → le workflow `.github/workflows/deploy-pages.yml` déploie automatiquement

## Démarrage local

```bash
cd Cycle-de-vie-logiciel
python3 -m http.server 3000
```

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Accueil + guide |
| http://localhost:3000/dashboard.html | Tableau de bord (navbar incluse) |
| http://localhost:3000/module.html?slug=05-javascript | Module avec iframe cours |

> Ne pas ouvrir les fichiers en `file://` — un serveur HTTP local est requis pour les modules ES et le `fetch`.

## Structure

```
index.html          → Accueil
dashboard.html      → Tableau de bord
module.html         → Vue module + iframe
certificate.html    → Certificat
completion.html     → Fin de parcours
css/, js/           → Assets
cours-cda/          → 22 modules pédagogiques
scripts/            → Générateur de contenu (Node, dev only)
```

## Régénérer les cours

```bash
node scripts/generate-cours-cda.mjs
```

## Documentation

- [Architecture](ARCHITECTURE.md)
- [Déploiement](DEPLOIEMENT.md)
- [Cursus CDA](cours-cda/README.md)
