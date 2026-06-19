/** Helpers — construction des modules academy */

export const CHECKLIST_LEVELS = [
  { id: 'debutant', label: 'Débutant', color: '#22c55e' },
  { id: 'intermediaire', label: 'Intermédiaire', color: '#3b82f6' },
  { id: 'professionnel', label: 'Professionnel', color: '#8b5cf6' },
];

export const FORMATION_LEVELS = [
  { id: 'debutant', label: 'Débutant', icon: '🌱' },
  { id: 'intermediaire', label: 'Intermédiaire', icon: '⚡' },
  { id: 'professionnel', label: 'Professionnel', icon: '🎯' },
];

function cl(items) {
  return items.map((label, i) => ({ id: `item-${i + 1}`, label, weight: null }));
}

export function mod(num, slug, title, icon, keywords, why, topics, tools, checklists) {
  return {
    num,
    id: slug,
    slug,
    title,
    icon,
    keywords,
    why,
    topics,
    tools,
    checklists: {
      debutant: cl(checklists.debutant),
      intermediaire: cl(checklists.intermediaire),
      professionnel: cl(checklists.professionnel),
    },
  };
}

export function assignModuleWeights(modules, overrides = {}) {
  const LEVEL_W = { debutant: 4, intermediaire: 6, professionnel: 8 };
  let total = 0;
  for (const m of modules) {
    for (const [level, items] of Object.entries(m.checklists)) {
      for (const item of items) {
        const key = `${m.id}::${level}::${item.label}`;
        item.weight = overrides[key] ?? LEVEL_W[level] ?? 5;
        total += item.weight;
      }
    }
  }
  const factor = 1000 / total;
  for (const m of modules) {
    for (const level of Object.keys(m.checklists)) {
      for (const item of m.checklists[level]) {
        item.weight = Math.round(item.weight * factor * 10) / 10;
      }
    }
  }
  return modules;
}

export function getAllModuleItems(modules) {
  const items = [];
  for (const m of modules) {
    for (const level of ['debutant', 'intermediaire', 'professionnel']) {
      for (const item of m.checklists[level]) {
        items.push({
          moduleId: m.id,
          level,
          itemId: item.id,
          label: item.label,
          weight: item.weight ?? 0,
        });
      }
    }
  }
  return items;
}
