import { ROADMAP_THEMES } from '../config/roadmap-themes.js';

/** Index de recherche globale */
let _index = null;

function buildIndex() {
  const entries = [];
  for (const theme of ROADMAP_THEMES) {
    entries.push({
      type: 'theme',
      themeId: theme.id,
      title: theme.title,
      text: [theme.title, theme.why, ...theme.keywords, ...theme.tools].join(' ').toLowerCase(),
      snippet: theme.why.slice(0, 120) + '…',
    });
    for (const kw of theme.keywords) {
      entries.push({ type: 'keyword', themeId: theme.id, title: kw, text: kw.toLowerCase(), snippet: theme.title });
    }
    for (const tool of theme.tools) {
      entries.push({ type: 'tool', themeId: theme.id, title: tool, text: tool.toLowerCase(), snippet: `Outil — ${theme.title}` });
    }
    for (const topic of theme.topics) {
      entries.push({
        type: 'topic',
        themeId: theme.id,
        title: topic.title,
        text: `${topic.title} ${topic.body}`.toLowerCase(),
        snippet: topic.body.slice(0, 100) + '…',
      });
    }
  }
  return entries;
}

export function searchRoadmap(query) {
  if (!_index) _index = buildIndex();
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const scored = _index
    .map((entry) => {
      let score = 0;
      if (entry.title.toLowerCase() === q) score += 100;
      else if (entry.title.toLowerCase().startsWith(q)) score += 60;
      else if (entry.text.includes(q)) score += 30;
      if (entry.type === 'theme') score += 10;
      return { ...entry, score };
    })
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score);

  const seen = new Set();
  return scored.filter((e) => {
    const k = `${e.themeId}-${e.title}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 12);
}

export function invalidateSearchIndex() {
  _index = null;
}
