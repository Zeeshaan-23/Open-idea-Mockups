/**
 * Open Idea About Page Data
 *
 * Grounded strictly in:
 * 1. The official Open Idea Research Whitepaper ("Democratizing Innovation Through Unified Open Knowledge")
 * 2. PRODUCT.md platform positioning and operational principles
 * 3. Verified production footer metadata, address, contact coordinates, and repository links
 */

export const INSTITUTIONAL_FACTS = {
  name: 'Open Idea',
  legalEntity: 'EcoSyz / Open Idea Collective',
  tagline: 'The World’s Open Innovation Infrastructure',
  positioning:
    'An open creation environment that unites research provenance, open datasets, AI software scaffolding, and bespoke web engineering services.',
  registeredAddress:
    '8125, 8th Floor, Gaur City Mall Office Space, Sector 4, Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh 201318, India',
  email: 'info@openidea.world',
  phoneDirect: '+91 81302 96940',
  phoneLandline: '011 4119 3699',
  repositoryUrl: 'https://github.com/Sony17/Ecosyz',
  discordUrl: 'https://discord.gg/4weahHXQYY',
  linkedinUrl: 'https://www.linkedin.com/company/ecosyz/',
  xTwitterUrl: 'https://x.com/OpenIdeaOrg',
  operatingModel: 'Open by default, sustained through value-added engineering and enterprise services'
};

export const CORE_PILLARS = [
  {
    id: 'open-resources',
    number: '01',
    title: 'Open Knowledge Aggregation',
    kicker: 'Provenance & Datasets',
    desc: 'Aggregates peer-reviewed papers, public datasets, protocols, and developer toolkits across disjointed repositories into a single searchable index with verified licensing metadata.',
    destination: '/openresources',
    ctaText: 'Explore Knowledge Base',
    accent: 'var(--brand-cyan)'
  },
  {
    id: 'studio-scaffolding',
    number: '02',
    title: 'AI-Assisted App Scaffolding',
    kicker: 'Software Engineering',
    desc: 'Provides an in-browser engineering workbench (Studio) where creators translate natural language and open datasets into production-grade React code with zero vendor lock-in.',
    destination: '/studio',
    ctaText: 'Launch Studio',
    accent: 'var(--brand-blue)'
  },
  {
    id: 'community-commons',
    number: '03',
    title: 'Collaborative Problem Commons',
    kicker: 'Public Working Groups',
    desc: 'Connects domain experts, open-source maintainers, and student fellows around global challenge registries, research residencies, and verified citation graphs.',
    destination: '/community',
    ctaText: 'Join Working Groups',
    accent: 'var(--brand-lavender)'
  },
  {
    id: 'bespoke-engineering',
    number: '04',
    title: 'Bespoke Web Engineering',
    kicker: 'Sustainable Services',
    desc: 'Delivers custom production engineering and bespoke website development for organizations, directly subsidizing and sustaining the open-source infrastructure.',
    destination: '/websites',
    ctaText: 'Website Services',
    accent: 'var(--brand-navy)'
  }
];

export const FRAGMENTATION_CHALLENGES = [
  {
    id: 'scattered-silos',
    title: 'Dispersed Knowledge Silos',
    context: 'Over 518M open-source repositories and 38% of global research is now open access, yet valuable findings remain trapped across disconnected publishers, code hubs, and static databases.',
    resolution: 'Open Idea unifies papers, data catalogs, and software implementations into a single semantic index, making cross-domain discovery immediate.'
  },
  {
    id: 'heterogeneous-formats',
    title: 'Metadata & Format Incompatibilities',
    context: 'Preprints use bibtex, datasets use disparate CSV/Parquet schemas, and code utilizes ad-hoc readmes with no common standard to bridge research to production.',
    resolution: 'Standardized metadata extraction auto-indexes field, format, dependencies, and citation graphs so innovators can connect papers directly to functional code.'
  },
  {
    id: 'licensing-ambiguity',
    title: 'Legal & Licensing Friction',
    context: 'Combining open data with open-source algorithms frequently introduces compliance risks (GPL, Apache, CC-BY, MIT) that stall creators and commercial teams.',
    resolution: 'Built-in license verification catalogs usage rights and distribution constraints upfront, ensuring clean intellectual property provenance.'
  }
];

export const STAKEHOLDER_AUDIENCES = [
  {
    id: 'researchers',
    label: 'Researchers & Scientists',
    subtitle: 'Interdisciplinary Synthesis',
    description:
      'Quickly survey literature across emerging disciplines, find verified public datasets accompanying published papers, and discover reproducible code implementations.',
    useCase:
      'A climate researcher discovers satellite telemetry datasets, links them to a peer-reviewed methodology paper, and identifies collaborators for an urban adaptation study.',
    tags: ['Literature Discovery', 'Dataset Provenance', 'Citation Linking'],
    primaryAction: {
      label: 'Browse Curated Research',
      destination: '/openresources?q=climate+adaptation'
    }
  },
  {
    id: 'engineers',
    label: 'Engineers & Developers',
    subtitle: 'From Open Data to Production',
    description:
      'Bypass boilerplate setup by scaffolding production-grade React and Next.js applications directly from curated open datasets with complete code ownership.',
    useCase:
      'A software engineer takes an open health index, scaffolds an interactive telemetry dashboard inside Studio, and exports clean source code with zero proprietary lock-in.',
    tags: ['Full Source Ownership', 'React Boilerplates', 'Zero Vendor Lock-in'],
    primaryAction: {
      label: 'Open Scaffold Workbench',
      destination: '/studio'
    }
  },
  {
    id: 'fellows',
    label: 'Students & Fellows',
    subtitle: 'Residencies & Open Exploration',
    description:
      'Access university-level research materials, participate in real-world open-source working groups, and build verifiable portfolio contributions through residency programs.',
    useCase:
      'A computer science student engages with the Autonomous Agents Working Group, contributing code to verifiable peer review pipelines under mentor guidance.',
    tags: ['Student Fellowships', 'Mentorship', 'Open Source Residency'],
    primaryAction: {
      label: 'Explore Fellowships',
      destination: '/intern-fellowship'
    }
  },
  {
    id: 'entrepreneurs',
    label: 'Entrepreneurs & Organizations',
    subtitle: 'Turnkey Execution & Prototyping',
    description:
      'Validate hypotheses with verified open tools, prototype initial solutions, and commission turnkey, bespoke web engineering services to launch production websites.',
    useCase:
      'A founder validates an environmental monitoring service using public geospatial feeds, then commissions Open Idea for turnkey production web engineering.',
    tags: ['Bespoke Engineering', 'Rapid Prototyping', '₹500 Booking Deposit'],
    primaryAction: {
      label: 'Commission a Website',
      destination: '/form'
    }
  }
];

export const INSTITUTIONAL_VALUES = [
  {
    title: 'Open Innovation by Default',
    desc: 'Core discovery, dataset indexing, and collaborative tools are permanently open access to maximize global participation and reproducible scientific progress.'
  },
  {
    title: 'Editorial Clarity over AI Hype',
    desc: 'We reject speculative tech jargon, neon glassmorphism, and synthetic metrics. Communication is grounded in calm, scholarly precision and useful utility.'
  },
  {
    title: 'Complete Source Ownership',
    desc: 'Applications generated in Studio are not locked into our platform. Users retain 100% ownership of code, assets, and exported architecture.'
  },
  {
    title: 'Commercial Sustainability',
    desc: 'Open Idea sustains its public infrastructure through transparent bespoke engineering services, institutional partnerships, and commercial API tiers.'
  }
];

export const ACTION_PATHWAYS = [
  {
    title: 'Explore Knowledge Infrastructure',
    desc: 'Search indexed research papers, open datasets, and developer toolkits with verified metadata.',
    destination: '/openresources',
    buttonText: 'Browse Open Resources',
    category: 'Discovery'
  },
  {
    title: 'Build in Studio',
    desc: 'Scaffold functional web applications with AI assistance and export clean, production-ready code.',
    destination: '/studio',
    buttonText: 'Open Studio',
    category: 'Engineering'
  },
  {
    title: 'Contribute to the Codebase',
    desc: 'Contribute to core open-source modules, parsers, and data connectors hosted publicly on GitHub.',
    destination: '/contribute',
    buttonText: 'Contribute Code',
    category: 'Open Source'
  },
  {
    title: 'Student Residency & Fellowship',
    desc: 'Apply for research fellowships, project residencies, and collaborative innovation grants.',
    destination: '/intern-fellowship',
    buttonText: 'Apply for Fellowship',
    category: 'Residency'
  }
];
