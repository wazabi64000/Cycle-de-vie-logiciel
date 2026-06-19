/** Recherche dans une formation */
export function searchFormationModules(modules, query) {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];
  const results = [];
  for (const m of modules) {
    const hay = [m.title, m.why, ...m.keywords, ...m.tools].join(' ').toLowerCase();
    if (m.title.toLowerCase().includes(q) || hay.includes(q)) {
      results.push({ moduleId: m.id, slug: m.slug, title: m.title, snippet: m.why.slice(0, 100) + '…' });
    }
    for (const topic of m.topics) {
      if (`${topic.title} ${topic.body}`.toLowerCase().includes(q)) {
        results.push({ moduleId: m.id, slug: m.slug, title: topic.title, snippet: m.title });
      }
    }
  }
  const seen = new Set();
  return results.filter((r) => {
    const k = `${r.slug}-${r.title}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 12);
}
