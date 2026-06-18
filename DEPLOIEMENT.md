# Déploiement (optionnel)

WazabyCode fonctionne **sans déploiement** : ouvrez `index.html` localement.

Ce guide décrit uniquement la publication en ligne sur un hébergeur de **fichiers statiques**.

## Utilisation locale (recommandée)

1. Téléchargez ou clonez le projet
2. Ouvrez **`index.html`** dans Chrome, Firefox ou Edge
3. C'est tout — la progression est dans **localStorage**

> Utilisez toujours le même navigateur sur le même appareil pour conserver votre progression.

## GitHub Pages (optionnel)

**URL :** https://wazabi64000.github.io/Cycle-de-vie-logiciel/

1. Push sur la branche `main`
2. GitHub → **Settings** → **Pages** → Source : **GitHub Actions**
3. Le workflow `.github/workflows/deploy-pages.yml` publie le site

Aucun backend : GitHub sert uniquement des fichiers HTML/CSS/JS.

## Autres hébergeurs statiques

- Netlify, Cloudflare Pages, GitLab Pages
- Nginx / Apache : servir le dossier racine du projet
- Clé USB ou partage réseau : ouvrir `index.html` directement

## Données utilisateur

| Stockage | Contenu |
|----------|---------|
| `localStorage` | Progression, score, badges, checklists |
| `sessionStorage` | Session en cours, module actif |
| Cookies | Thème, dernière visite (30 jours) |

Pas de synchronisation cloud — tout reste sur l'appareil.

## Dépannage

**Page blanche ou modules absents :** ouvrez via `index.html` (pas un sous-dossier isolé). Vérifiez que le dossier `js/` est présent à côté des pages HTML.

**Progression perdue :** cache navigateur effacé ou changement d'appareil.

**Navbar absente :** le JavaScript doit être activé ; les modules ES nécessitent un navigateur récent (2020+).

## Dossier `lms/` (obsolète)

Ancienne version avec serveur Express — **non utilisée**. Utilisez les fichiers à la racine du projet.

## Régénération du contenu (développeurs)

Le script Node `scripts/generate-cours-cda.mjs` sert uniquement à **regénérer** les fichiers de cours en local. Il n'est pas requis pour utiliser la plateforme.

```bash
node scripts/generate-cours-cda.mjs
```
