# WazabyCode — Project Roadmap

Guide interactif et **base de connaissances** pour suivre **toutes les étapes** de réalisation d'une application moderne.

> Ce n'est **pas** un LMS. C'est une roadmap de cycle de vie logiciel : de l'idée à la maintenance en production.

## Stack

- HTML5 · CSS3 · JavaScript ES2024
- Aucune dépendance externe
- Persistance : **localStorage** + sessionStorage + cookies
- Pas de compte utilisateur

## Utilisation

1. Ouvrez **`index.html`** dans votre navigateur
2. Cliquez sur **Commencer la roadmap**
3. Parcourez les **19 thèmes**, cochez les checklists
4. Cliquez **Détails** sur chaque item pour la définition, exemples et bonnes pratiques
5. Utilisez la **recherche globale** (Docker, Jest, OWASP, CI/CD…)
6. Activez **Mode CDA** pour les compétences RNCP37873

| Fichier | Rôle |
|---------|------|
| `index.html` | Accueil — pourquoi une méthodologie |
| `roadmap.html` | Application principale (sidebar + 19 thèmes) |
| `completion.html` | Message final à 100 % |
| `certification-rncp.html` | Référentiel RNCP CDA |

## Fonctionnalités base de connaissances

- **Registre d'outils** (`js/config/tools-registry.js`) — liens Site officiel, Documentation, GitHub
- **Modal Détails** — définition, pourquoi, exemple, outils, bonnes pratiques, erreurs fréquentes, niveaux débutant/inter/pro
- **Fiches technologiques** — clic sur un outil pour description, cas d'usage, alternatives
- **Score pondéré** — chaque checklist a un poids (total normalisé / 1000)
- **Recommandations automatiques** — alertes si étapes incohérentes (ex. frontend sans maquettes)
- **Mode CDA** — compétences RNCP, livrables et points de vigilance par thème
- **Illustrations** — `assets/examples/` (architecture, UML, BDD, Docker, CI/CD)

## Les 19 thèmes

1. Analyse des besoins · 2. Conception · 3. Choix stack · 4. Bases de données · 5. Maquettage UX · 6. Frontend · 7. Backend · 8. Auth · 9. Tests · 10. QA · 11. Performance · 12. Stress test · 13. Sécurité · 14. DevOps · 15. CI/CD · 16. Infrastructure · 17. Déploiement · 18. Monitoring · 19. Maintenance

## Score & niveaux

- Score global **/ 1000** (checklists cochées, **pondération par item**)
- Niveaux : Débutant → Junior → Intermédiaire → Confirmé → Senior → Lead → Architecte → **Expert WazabyCode**

## Hébergement (optionnel)

GitHub Pages : https://wazabi64000.github.io/Cycle-de-vie-logiciel/

## Structure

```
js/config/tools-registry.js      → URLs officielles des outils
js/config/checklist-knowledge.js → Contenu des modales Détails
js/config/roadmap-rules.js       → Recommandations automatiques
js/config/cda-roadmap-map.js     → Mode CDA / RNCP
js/config/roadmap-themes.js      → 19 thèmes + checklists pondérées
js/core/roadmap-engine.js        → Score & progression
js/core/roadmap-search.js        → Recherche globale enrichie
js/ui/knowledge-modal.js         → Modales interactives
js/app/roadmap-app.js            → Application principale
css/roadmap.css                  → UI Notion/Linear inspired
assets/examples/                 → Illustrations (SVG)
```

## Ancien contenu LMS

Le dossier `cours-cda/` (22 modules CDA) reste disponible mais n'est plus le cœur de l'application.
