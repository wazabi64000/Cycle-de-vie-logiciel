# WazabyCode — Formation CDA

Plateforme **100 % statique** : HTML, CSS, JavaScript. Progression sauvegardée dans **localStorage** du navigateur.

- Aucun serveur à installer
- Aucun Node.js, Python, Docker ou base de données
- Pas de compte utilisateur

## Utilisation

1. Ouvrez **`index.html`** dans votre navigateur (double-clic ou glisser-déposer)
2. Cliquez sur **Voir les cours** ou **Tableau de bord**
3. Votre progression est enregistrée automatiquement dans le navigateur

| Fichier | Rôle |
|---------|------|
| `index.html` | Accueil + liste des 22 modules |
| `certification-rncp.html` | Référentiel officiel RNCP37873 (3 blocs CCP) |
| `dashboard.html` | Score, badges, progression |
| `certification-rncp.html` | Référentiel officiel RNCP37873 (3 blocs CCP) |
| `module.html?slug=05-javascript` | Vue module + cours |
| `cours-cda/*/cours.html` | Contenu pédagogique |

## Hébergement en ligne (optionnel)

Le site peut aussi être publié sur **GitHub Pages** ou tout hébergeur de fichiers statiques — voir [DEPLOIEMENT.md](DEPLOIEMENT.md).

## Structure

```
index.html, dashboard.html, module.html …
css/                  → Styles
js/                   → Logique + localStorage
cours-cda/            → 22 modules (800h+)
js/config/modules-catalog.js → Catalogue embarqué (pas de fetch)
```

## Documentation

- [Architecture](ARCHITECTURE.md)
- [Déploiement optionnel](DEPLOIEMENT.md)
- [Cursus CDA](cours-cda/README.md)
