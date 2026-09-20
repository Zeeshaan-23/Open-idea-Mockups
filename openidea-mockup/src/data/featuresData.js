/**
 * Open Idea Platform Capabilities Data
 *
 * Grounded strictly in:
 * 1. Production /features ("All Features, One Platform — Everything you need to innovate, collaborate, and build the future")
 * 2. Official Open Idea Research Whitepaper and verified platform infrastructure
 * 3. PRODUCT.md platform capabilities and operational continuum
 */

export const PLATFORM_OVERVIEW = {
  kicker: 'Platform Capabilities Overview',
  title: 'All Features, One Unified Platform',
  subtitle:
    'Open Idea connects research provenance, open datasets, in-browser AI scaffolding, collaborative problem commons, and bespoke web engineering into a singular creation environment.',
  tagline: 'Everything you need to innovate, collaborate, and build the future.'
};

export const CORE_CAPABILITIES = [
  {
    id: 'open-resources',
    number: '01',
    role: 'Survey & Discover',
    title: 'Open Knowledge Aggregation',
    kicker: 'Research Provenance & Datasets',
    summary:
      'Access peer-reviewed research papers, verified public datasets, algorithms, and developer toolkits with verified intellectual property licensing.',
    userBenefit:
      'Eliminates months of manual literature synthesis and schema wrangling by indexing research and datasets directly alongside functional software implementations.',
    keyFeatures: [
      'Multi-provider literature search across academic preprints and repositories',
      'Unified dataset catalog with format and schema normalization',
      'Verified license tagging (MIT, Apache 2.0, CC-BY, GPL) upfront',
      'Citation generation and provenance tracking'
    ],
    primaryAction: {
      label: 'Launch Research Workstation',
      destination: '/openresources'
    },
    accent: 'var(--brand-cyan)'
  },
  {
    id: 'studio-scaffolding',
    number: '02',
    role: 'Prototype & Build',
    title: 'AI-Assisted App Scaffolding',
    kicker: 'In-Browser Software Engineering',
    summary:
      'Translate natural language prompts and open datasets into production-grade React and Next.js applications in an isolated in-browser workbench.',
    userBenefit:
      'Bypasses complex local development configuration and boilerplate wiring, generating clean, modular code with 100% creator ownership and zero vendor lock-in.',
    keyFeatures: [
      'Live in-browser preview and stateful interactive sandboxing',
      'Direct data binding from verified open repositories into UI components',
      'Instant complete source-code export (ZIP or Git push)',
      'Deterministic prompting without proprietary runtime dependencies'
    ],
    primaryAction: {
      label: 'Open Studio Workbench',
      destination: '/studio'
    },
    accent: 'var(--brand-blue)'
  },
  {
    id: 'community-commons',
    number: '03',
    role: 'Connect & Collaborate',
    title: 'Collaborative Problem Commons',
    kicker: 'Working Groups & Project Showcase',
    summary:
      'Participate in domain-specific working groups, contribute to global challenge registries, and discover peer-built open applications.',
    userBenefit:
      'Connects solo builders and researchers with verified mentors, student fellows, and active working groups to validate and stress-test prototypes.',
    keyFeatures: [
      'Public challenge registry organized by global innovation domains',
      'Student fellowships and research residency collaboration tracks',
      'Verified peer-review pipelines and academic citation linking',
      'Community Showcase highlighting functional open-source projects'
    ],
    primaryAction: {
      label: 'Explore Working Groups',
      destination: '/community'
    },
    secondaryAction: {
      label: 'Browse Showcase Projects',
      destination: '/community?tab=showcase'
    },
    accent: 'var(--brand-lavender)'
  },
  {
    id: 'bespoke-engineering',
    number: '04',
    role: 'Commission & Deploy',
    title: 'Bespoke Web Engineering',
    kicker: 'Turnkey Production Services',
    summary:
      'Commission custom web development, interactive dashboards, and turnkey production engineering directly from the core Open Idea engineering collective.',
    userBenefit:
      'Provides founders and organizations with enterprise-grade web development backed by a ₹500 booking deposit and 48-hour prototype delivery, directly subsidizing the open commons.',
    keyFeatures: [
      'Guaranteed 48-hour prototype turnaround and review cycle',
      'Transparent booking deposit (₹500) with milestone-based delivery',
      'Direct human engineering with production React, Next.js, and Tailwind/Vanilla CSS',
      'Revenue model that transparently funds the free public open-source infrastructure'
    ],
    primaryAction: {
      label: 'Explore Website Services',
      destination: '/websites'
    },
    accent: 'var(--brand-navy)'
  },
  {
    id: 'pricing-compute',
    number: '05',
    role: 'Scale & Sustain',
    title: 'Transparent Compute & Commercial Tiers',
    kicker: 'Token Math & Sustainability',
    summary:
      'Transparent token credit accounting, permanent free tiers for open-source exploration, and institutional enterprise partnerships.',
    userBenefit:
      'Demystifies AI compute costs with exact input/output credit ratios across OpenAI, Anthropic, Gemini, and DeepSeek, ensuring predictable prototyping budgets.',
    keyFeatures: [
      'Permanent free tier with monthly replenishment for research and open discovery',
      'Transparent token math with zero hidden markup across multi-provider LLMs',
      'Pro and Team plans for heavy Studio usage and collaborative team workspaces',
      'Custom institutional agreements for universities and research labs'
    ],
    primaryAction: {
      label: 'View Plans & Credit Math',
      destination: '/pricing'
    },
    accent: 'var(--brand-blue)'
  }
];

export const CREATION_CONTINUUM_STEPS = [
  {
    step: '01',
    phase: 'Survey',
    title: 'Literature & Data Discovery',
    description: 'Query verified papers, schemas, and public toolkits in Open Resources with verified licensing.',
    destination: '/openresources'
  },
  {
    step: '02',
    phase: 'Scaffold',
    title: 'In-Browser Prototyping',
    description: 'Transform prompts and datasets into functional React components inside Studio Workbench.',
    destination: '/studio'
  },
  {
    step: '03',
    phase: 'Collaborate',
    title: 'Peer Review & Working Groups',
    description: 'Engage with community fellows, submit challenge entries, and publish to the Showcase.',
    destination: '/community'
  },
  {
    step: '04',
    phase: 'Engineer',
    title: 'Turnkey Commissioning',
    description: 'Scale prototypes into production-grade websites through bespoke web engineering services.',
    destination: '/websites'
  },
  {
    step: '05',
    phase: 'Deploy',
    title: 'Production & Full Ownership',
    description: 'Export source code, connect custom domains, and deploy with zero platform vendor lock-in.',
    destination: '/pricing'
  }
];
