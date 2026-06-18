# Déploiement WazabyCode

Site **100 % statique** — HTML, CSS, JavaScript. Aucun Node.js requis en production.

## GitHub Pages (recommandé)

**URL :** https://wazabi64000.github.io/Cycle-de-vie-logiciel/

### Configuration initiale

1. Pousser le code sur la branche `main`
2. GitHub → **Settings** → **Pages**
3. **Build and deployment** → **Source : GitHub Actions**
4. À chaque push sur `main`, le workflow `deploy-pages.yml` publie le site

### Fichiers de déploiement

| Fichier | Rôle |
|---------|------|
| `.github/workflows/deploy-pages.yml` | CI/CD GitHub Pages |
| `.nojekyll` | Désactive Jekyll, sert les fichiers tels quels |

Les chemins relatifs (`css/`, `js/`, `cours-cda/`) fonctionnent sous le sous-chemin `/Cycle-de-vie-logiciel/`.

## Développement local

```bash
git clone <votre-repo> Cycle-de-vie-logiciel
cd Cycle-de-vie-logiciel
python3 -m http.server 3000
```

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Accueil + guide |
| http://localhost:3000/dashboard.html | Tableau de bord |
| http://localhost:3000/cours-cda/00-introduction-metier/cours.html | Cours direct |

Alternative :

```bash
npx serve . -l 3000
```

## 2. Générer / mettre à jour les cours

Node.js est utilisé **uniquement** pour le script de génération (optionnel) :

```bash
node scripts/generate-cours-cda.mjs
```

## 3. Production (Nginx)

Servir le dossier racine du projet :

```nginx
server {
    listen 80;
    server_name votredomaine.fr;
    root /var/www/wazabycode;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 4. Docker (statique)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t wazabycode .
docker run -d -p 8080:80 wazabycode
```

## 5. Structure servie

```
/                         → index.html
/dashboard.html           → LMS
/module.html              → Vue module + iframe cours
/certificate.html         → Certificat
/completion.html          → Fin de parcours
/cours-cda/*/cours.html   → Cours avec navbar WazabyCode
/css, /js                 → Assets statiques
```

## 6. Données utilisateur

- Stockage : **localStorage** du navigateur (`wazabycode_progress`, etc.)
- Pas d'authentification, pas de base de données
- La progression est liée au navigateur / appareil

## 7. Dépannage

**Navbar absente :** vérifier que la page est servie via HTTP (pas `file://`) et que `js/ui/layout.js` est accessible.

**Port 3000 occupé :**

```bash
lsof -ti :3000 | xargs kill -9
python3 -m http.server 3000
```

**Progression perdue :** effacement du cache navigateur ou changement d'appareil.

## 8. Ancien dossier `lms/`

Le dossier `lms/` contient une ancienne version avec serveur Express Node.js. **Elle n'est plus nécessaire** — utilisez la racine du projet avec un serveur statique.
