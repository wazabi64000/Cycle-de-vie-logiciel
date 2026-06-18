import {
  RNCP_META,
  RNCP_CONTEXTE,
  RNCP_BLOCS,
  RNCP_EPREUVE_GLOBALE,
  RNCP_ACTIVITES,
  RNCP_SECTEURS,
  RNCP_METIERS,
  RNCP_VOIES_ACCES,
} from '../config/rncp-cda.js';
import { moduleUrl, href } from '../core/paths.js';

function renderMeta() {
  const el = document.getElementById('rncp-meta');
  if (!el) return;
  el.innerHTML = `
    <div class="rncp-meta-grid">
      <div><span class="rncp-label">Code RNCP</span><strong>${RNCP_META.code}</strong></div>
      <div><span class="rncp-label">ROME</span><strong>${RNCP_META.rome}</strong></div>
      <div><span class="rncp-label">Validité</span><strong>${RNCP_META.enregistrement}</strong></div>
      <div><span class="rncp-label">Ancienne version</span><strong>${RNCP_META.ancienCode}</strong></div>
    </div>`;
}

function renderContexte() {
  const el = document.getElementById('rncp-contexte');
  if (!el) return;
  el.innerHTML = `
    <p>${RNCP_CONTEXTE.objectifs}</p>
    <ul class="rncp-list">
      <li><strong>Sécurité :</strong> ${RNCP_CONTEXTE.securite}</li>
      <li><strong>Accessibilité & RGPD :</strong> ${RNCP_CONTEXTE.accessibilite}</li>
      <li><strong>Anglais :</strong> ${RNCP_CONTEXTE.anglais}</li>
    </ul>`;
}

function renderBlocs() {
  const el = document.getElementById('rncp-blocs');
  if (!el) return;
  el.innerHTML = RNCP_BLOCS.map(
    (bloc) => `
    <article class="dashboard-card rncp-bloc-card" id="${bloc.id}">
      <header class="rncp-bloc-header">
        <span class="rncp-bloc-code">${bloc.code}</span>
        <h2>${bloc.titre}</h2>
        <p class="rncp-bloc-duree">Durée épreuve : <strong>${bloc.dureeEpreuve}</strong></p>
      </header>

      <h3 class="card-title">Compétences attestées</h3>
      <ol class="rncp-competences">
        ${bloc.competences.map((c) => `<li>${c}</li>`).join('')}
      </ol>

      <h3 class="card-title">Modalités d'évaluation</h3>
      <ul class="rncp-list">
        <li><strong>Présentation projet :</strong> ${bloc.evaluation.presentation}</li>
        <li><strong>Entretien technique :</strong> ${bloc.evaluation.entretien}</li>
        <li><strong>Questionnaire professionnel :</strong> ${bloc.evaluation.questionnaire}</li>
      </ul>

      <h3 class="card-title">Modules WazabyCode associés</h3>
      <div class="rncp-module-links">
        ${bloc.modulesWazaby
          .map(
            (slug) =>
              `<a href="${moduleUrl(slug)}" class="rncp-module-chip">${slug.replace(/^\d+-/, '').replace(/-/g, ' ')}</a>`
          )
          .join('')}
      </div>
    </article>`
  ).join('');
}

function renderListSection(id, items, ordered = false) {
  const el = document.getElementById(id);
  if (!el) return;
  const tag = ordered ? 'ol' : 'ul';
  el.innerHTML = `<${tag} class="rncp-list">${items.map((i) => `<li>${i}</li>`).join('')}</${tag}>`;
}

function init() {
  renderMeta();
  renderContexte();
  renderBlocs();
  renderListSection('rncp-activites', RNCP_ACTIVITES);
  renderListSection('rncp-secteurs', RNCP_SECTEURS);
  renderListSection('rncp-metiers', RNCP_METIERS);
  renderListSection('rncp-voies', RNCP_VOIES_ACCES);

  const global = document.getElementById('rncp-epreuve');
  if (global) {
    global.innerHTML = `
      <p>Durée totale indicatif session complète : <strong>${RNCP_EPREUVE_GLOBALE.dureeTotale}</strong></p>
      <p>${RNCP_EPREUVE_GLOBALE.entretienFinal}</p>
      <p class="rncp-note">${RNCP_EPREUVE_GLOBALE.note}</p>
      <a href="${moduleUrl('21-preparation-titre-cda')}" class="btn btn-primary" style="margin-top:1rem">
        Module 21 — Préparer le titre →
      </a>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
