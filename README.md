# WazabyCode — Project Roadmap

Guide interactif professionnel pour suivre **toutes les étapes** de réalisation d'une application moderne.

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
4. Utilisez la **recherche globale** (Docker, Jest, OWASP, CI/CD…)

| Fichier | Rôle |
|---------|------|
| `index.html` | Accueil — pourquoi une méthodologie |
| `roadmap.html` | Application principale (sidebar + 19 thèmes) |
| `completion.html` | Message final à 100 % |

## Les 19 thèmes

1. Analyse des besoins · 2. Conception · 3. Choix stack · 4. Bases de données · 5. Maquettage UX · 6. Frontend · 7. Backend · 8. Auth · 9. Tests · 10. QA · 11. Performance · 12. Stress test · 13. Sécurité · 14. DevOps · 15. CI/CD · 16. Infrastructure · 17. Déploiement · 18. Monitoring · 19. Maintenance

## Score & niveaux

- Score global **/ 1000** (checklists cochées)
- Niveaux : Débutant → Junior → Intermédiaire → Confirmé → Senior → Lead → Architecte → **Expert WazabyCode**

## Hébergement (optionnel)

GitHub Pages : https://wazabi64000.github.io/Cycle-de-vie-logiciel/

## Structure

```
js/config/roadmap-themes.js   → 19 thèmes + checklists
js/core/roadmap-engine.js     → Score & progression
js/core/roadmap-search.js       → Recherche globale
js/app/roadmap-app.js           → Application principale
css/roadmap.css                 → UI Notion/Linear inspired
```

## Ancien contenu LMS

Le dossier `cours-cda/` (22 modules CDA) reste disponible mais n'est plus le cœur de l'application.
