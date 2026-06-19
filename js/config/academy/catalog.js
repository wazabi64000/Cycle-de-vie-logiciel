/** Catalogue des formations — WazabyCode Academy */

export const ACADEMY_META = {
  name: 'WazabyCode Academy',
  brand: 'WazabyCode',
  tagline: 'Plateforme multi-formations — Développement, Cybersécurité, Réseaux, Linux, Cloud, DevOps',
  subtitle: 'Une application · Une architecture · Plusieurs parcours',
};

export const FORMATIONS = [
  {
    id: 'cda',
    slug: 'cda',
    title: 'CDA',
    fullTitle: 'Concepteur Développeur d\'Applications',
    cert: 'RNCP37873',
    icon: '🎓',
    color: '#6366f1',
    category: 'Développement',
    description: 'Parcours complet du cycle de vie logiciel — analyse à maintenance. Préparation titre CDA.',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'cda',
    usesRoadmap: true,
    moduleCount: 19,
  },
  {
    id: 'dwwm',
    slug: 'dwwm',
    title: 'DWWM',
    fullTitle: 'Développeur Web et Web Mobile',
    cert: 'RNCP37674',
    icon: '💻',
    color: '#3b82f6',
    category: 'Développement',
    description: 'Parcours complet DWWM — analyse, maquettes, front/back, BDD, tests, sécurité, DevOps et projet fil rouge.',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'dwwm',
    moduleCount: 31,
    legacyModuleIds: [
      'html-fondamentaux', 'css-fondamentaux', 'javascript-fondamentaux',
      'responsive-design', 'accessibilite-web', 'php-fondamentaux',
      'sql-fondamentaux', 'api-rest', 'git-fondamentaux', 'deploiement-web',
    ],
  },
  {
    id: 'cyber',
    slug: 'cyber',
    title: 'Cybersécurité',
    fullTitle: 'Cybersécurité Débutant',
    icon: '🛡️',
    color: '#ef4444',
    category: 'Sécurité',
    description: 'CIA, authentification, phishing, OWASP, OSINT, sécurité réseau et Linux.',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'cyber',
    moduleCount: 15,
  },
  {
    id: 'reseaux',
    slug: 'reseaux',
    title: 'Réseaux',
    fullTitle: 'Réseaux Débutant',
    icon: '🌐',
    color: '#06b6d4',
    category: 'Infrastructure',
    description: 'OSI, TCP/IP, IP, DHCP, DNS, VLAN, types de réseaux (LAN, WAN, VPN…).',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'reseaux',
    moduleCount: 12,
  },
  {
    id: 'linux',
    slug: 'linux',
    title: 'Linux',
    fullTitle: 'Linux Administration',
    icon: '🐧',
    color: '#f59e0b',
    category: 'Système',
    description: 'Fichiers, permissions, SSH, services, Bash, logs et durcissement.',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'linux',
    moduleCount: 10,
  },
  {
    id: 'devops',
    slug: 'devops',
    title: 'DevOps',
    fullTitle: 'DevOps Débutant',
    icon: '🐳',
    color: '#22c55e',
    category: 'DevOps',
    description: 'Git, Docker, Kubernetes, CI/CD, monitoring, Infrastructure as Code.',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'devops',
    moduleCount: 9,
  },
  {
    id: 'cloud',
    slug: 'cloud',
    title: 'Cloud',
    fullTitle: 'Cloud Fundamentals',
    icon: '☁️',
    color: '#8b5cf6',
    category: 'Cloud',
    description: 'AWS, Azure, GCP, VPS, conteneurs, serverless, CDN et stockage.',
    levels: ['debutant', 'intermediaire', 'professionnel'],
    modeKey: 'cloud',
    moduleCount: 9,
  },
];

export function getFormation(id) {
  return FORMATIONS.find((f) => f.id === id || f.slug === id) ?? null;
}

export function getFormationsByCategory() {
  const map = new Map();
  for (const f of FORMATIONS) {
    if (!map.has(f.category)) map.set(f.category, []);
    map.get(f.category).push(f);
  }
  return map;
}
