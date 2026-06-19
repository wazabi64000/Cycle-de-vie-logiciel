import { ROADMAP_THEMES } from '../config/roadmap-themes.js';
import { TOOLS_REGISTRY, resolveTool } from '../config/tools-registry.js';

/** Index de recherche globale enrichie */
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
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of theme.checklists[level]) {
        entries.push({
          type: 'checklist',
          themeId: theme.id,
          title: item.label,
          text: `${item.label} ${theme.title} ${level}`.toLowerCase(),
          snippet: `Checklist — ${theme.title}`,
        });
      }
    }
  }

  for (const [key, tool] of Object.entries(TOOLS_REGISTRY)) {
    const kwText = (tool.keywords ?? []).join(' ');
    entries.push({
      type: 'registry',
      themeId: findThemeForTool(tool.name),
      title: tool.name,
      text: `${tool.name} ${tool.description ?? ''} ${kwText}`.toLowerCase(),
      snippet: tool.description?.slice(0, 100) ?? `Technologie — ${tool.name}`,
      toolKey: key,
    });
    for (const kw of tool.keywords ?? []) {
      if (kw === tool.name.toLowerCase()) continue;
      entries.push({
        type: 'registry-alias',
        themeId: findThemeForTool(tool.name),
        title: kw,
        text: kw.toLowerCase(),
        snippet: `${tool.name} — ${tool.description?.slice(0, 60) ?? ''}`,
        toolKey: key,
      });
    }
  }

  return entries;
}

function findThemeForTool(toolName) {
  const lower = toolName.toLowerCase();
  for (const theme of ROADMAP_THEMES) {
    if (theme.tools.some((t) => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()))) {
      return theme.id;
    }
  }
  return ROADMAP_THEMES[0]?.id ?? 'devops';
}

export function searchRoadmap(query) {
  if (!_index) _index = buildIndex();
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const scored = _index
    .map((entry) => {
      let score = 0;
      const title = entry.title.toLowerCase();
      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 60;
      else if (title.includes(q)) score += 45;
      else if (entry.text.includes(q)) score += 30;
      if (entry.type === 'theme') score += 10;
      if (entry.type === 'registry' || entry.type === 'registry-alias') score += 15;
      return { ...entry, score };
    })
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score);

  const seen = new Set();
  return scored.filter((e) => {
    const k = `${e.type}-${e.themeId}-${e.title}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 15);
}

export function searchTools(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return Object.values(TOOLS_REGISTRY).filter(
    (t) =>
      t.name.toLowerCase().includes(q)
      || t.keywords?.some((kw) => kw.includes(q) || q.includes(kw))
  );
}

export function invalidateSearchIndex() {
  _index = null;
}

export { resolveTool };
