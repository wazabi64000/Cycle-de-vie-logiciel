# WazabyCode LMS — Système de progression

## Architecture modulaire

```
lms/public/js/
├── config/          # Niveaux, scores, badges, checklists, maturité
├── core/            # Storage, moteur progression, recommandations, events
├── ui/              # Animations, checklists, confetti
└── app/             # Pages (dashboard, module, certificat, completion)
```

## Persistance hybride

| Stockage | Clé | Données |
|----------|-----|---------|
| **localStorage** | `wazabycode_progress` | Progression, scores, badges, certificats |
| **sessionStorage** | `wazabycode_current_module` | Module ouvert, quiz en cours |
| **Cookies** (30j) | `wb_level`, `wb_theme`, `wb_last_visit` | Niveau, thème, dernière visite |

## Score global — 1000 points

| Catégorie | Points | Modules associés |
|-----------|--------|------------------|
| Analyse | 100 | 00, 01, 02 |
| Conception | 100 | 01 |
| Frontend | 100 | 04, 05, 09 |
| Backend | 100 | 07, 08 |
| Base de données | 100 | 06 |
| Tests | 100 | 12 |
| Sécurité | 100 | 13, 17 |
| DevOps | 100 | 14 |
| CI/CD | 100 | 15, 16 |
| Déploiement | 100 | 18 |

## Niveaux

1. Explorateur (0–100)
2. Apprenti Développeur (101–250)
3. Développeur Junior (251–450)
4. Développeur Confirmé (451–650)
5. Développeur Fullstack (651–800)
6. Architecte Logiciel (801–950)
7. Expert WazabyCode (951–1000)

## Calcul automatique

À chaque case cochée dans une checklist :

1. Recalcul score module (pédagogique 40% + technique 30% + quiz 30%)
2. Recalcul scores par catégorie
3. Recalcul score global
4. Recalcul progression cours / projet
5. Vérification badges et certificat
6. Mise à jour UI sans rechargement (EventBus)

## Certificat

Conditions : Progression ≥ 90 %, Quiz moyen ≥ 80 %, Projet ≥ 80 %

## Persistance mémoire apprenant

| Clé localStorage | Contenu |
|------------------|---------|
| `wazabycode_last_position` | Module, chapitre, scroll, dernière visite |
| `wazabycode_learning_data` | Quiz, exercices, historique, statistiques |

Service : `js/core/learning-progress-service.js` — adaptateur interchangeable (PostgreSQL, API REST…).

```bash
npm start
# http://localhost:3000/dashboard.html
```
