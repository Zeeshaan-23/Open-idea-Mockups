/**
 * Open Idea — Open Source Contribution Data Model
 *
 * Source of truth: verified production content from https://openidea.world/contribute,
 * the official repository at https://github.com/Sony17/Ecosyz, and Next.js client bundles.
 * No fabricated bounties, maintainer tiers, or fictional rewards.
 */

export const CONTRIBUTE_META = {
  headline: 'Contribute to',
  serifAccent: 'Open Idea',
  subtitle:
    "Help build the world's open innovation infrastructure. Every contribution—whether fixing a bug, refining documentation, proposing a dataset, or testing a workflow—advances open technology.",
  primaryRepoUrl: 'https://github.com/Sony17/Ecosyz',
  primaryRepoLabel: 'github.com/Sony17/Ecosyz',
  contributingGuideUrl: 'https://github.com/Sony17/Ecosyz/blob/main/docs/contributing.md',
  issuesUrl: 'https://github.com/Sony17/Ecosyz/issues',
  newIssueUrl: 'https://github.com/Sony17/Ecosyz/issues/new',
  licenseUrl: 'https://github.com/Sony17/Ecosyz/blob/main/LICENSE',
  licenseName: 'AGPL-3.0',
  licenseFullName: 'GNU Affero General Public License v3.0',
  discordUrl: 'https://discord.gg/4weahHXQYY',
  officialEmail: 'info@openidea.world'
};

export const CONTRIBUTION_PATHWAYS = [
  {
    id: 'code',
    title: 'Code Contributions',
    kicker: 'Core Architecture',
    icon: '💻',
    description:
      'Fix bugs, implement new platform features, optimize client rendering performance, or refactor components across our React, Vite, and Node.js stack.',
    targetAudience: 'Full-stack engineers, frontend developers, and systems architects.',
    outcome: 'Merged into production releases powering studio workspaces and open discovery tools.',
    actionLabel: 'View on GitHub',
    actionUrl: 'https://github.com/Sony17/Ecosyz',
    isExternal: true
  },
  {
    id: 'docs',
    title: 'Documentation',
    kicker: 'Knowledge & Clarity',
    icon: '📝',
    description:
      'Improve developer guides, author step-by-step walkthroughs, refine API definitions, fix typos, and translate educational resources for global builders.',
    targetAudience: 'Technical writers, educators, domain specialists, and community developers.',
    outcome: 'Published to the public documentation index and Getting Started guides.',
    actionLabel: 'Contribute Docs',
    actionUrl: 'https://github.com/Sony17/Ecosyz',
    isExternal: true
  },
  {
    id: 'bug',
    title: 'Report Bugs',
    kicker: 'Quality & Rigor',
    icon: '🐛',
    description:
      'Uncover edge cases, report UI layout anomalies, identify broken linkages, or provide structured reproduction steps on our public issue tracker.',
    targetAudience: 'Active users, QA analysts, security researchers, and developers.',
    outcome: 'Triaged by maintainers into active sprint milestones and hotfix patches.',
    actionLabel: 'Report Issue (GitHub)',
    actionUrl: 'https://github.com/Sony17/Ecosyz/issues/new',
    isExternal: true
  },
  {
    id: 'feature',
    title: 'Feature Ideas',
    kicker: 'Platform Evolution',
    icon: '💡',
    description:
      'Propose new studio capabilities, dataset categories, export pipelines, or AI evaluation workflows supported by concrete use cases.',
    targetAudience: 'Innovators, startup founders, researchers, and domain experts.',
    outcome: 'Evaluated in public GitHub Discussions and prioritized on open roadmap nodes.',
    actionLabel: 'Suggest Feature (GitHub)',
    actionUrl: 'https://github.com/Sony17/Ecosyz/issues/new',
    isExternal: true
  },
  {
    id: 'design',
    title: 'Design & UI',
    kicker: 'Editorial Aesthetics',
    icon: '🎨',
    description:
      'Refine responsive layouts, craft accessible micro-animations, design modular UI components, and uphold strict WCAG AA contrast standards.',
    targetAudience: 'Product designers, UI/UX engineers, and design system technologists.',
    outcome: 'Integrated into our shared CSS token architecture and component libraries.',
    actionLabel: 'Design Contributions',
    actionUrl: 'https://github.com/Sony17/Ecosyz',
    isExternal: true
  },
  {
    id: 'testing',
    title: 'Testing & QA',
    kicker: 'Reliability & Uptime',
    icon: '🧪',
    description:
      'Write end-to-end verification suites, unit tests, benchmark prompt validation pipelines, and verify cross-browser compatibility.',
    targetAudience: 'Test automation engineers, AI evaluators, and performance specialists.',
    outcome: 'Strengthens continuous integration to guarantee high availability and zero regressions.',
    actionLabel: 'Improve Tests',
    actionUrl: 'https://github.com/Sony17/Ecosyz',
    isExternal: true
  }
];

export const CONTRIBUTION_STEPS = [
  {
    step: '1',
    title: 'Fork & Clone',
    description:
      'Fork the official repository at github.com/Sony17/Ecosyz and clone your fork to your local development machine.',
    codeSnippet: 'git clone https://github.com/<your-username>/Ecosyz.git'
  },
  {
    step: '2',
    title: 'Set Up Environment',
    description:
      'Install required dependencies using npm and configure local environment variables according to the project documentation.',
    codeSnippet: 'npm install && npm run dev'
  },
  {
    step: '3',
    title: 'Create Branch',
    description:
      'Create a focused branch for your changes with a descriptive prefix (e.g., feat/editor-tokens or fix/table-contrast).',
    codeSnippet: 'git checkout -b feat/your-contribution'
  },
  {
    step: '4',
    title: 'Make & Verify Changes',
    description:
      'Write clean, typed code adhering to DESIGN.md tokens, write unit tests, and verify zero layout regressions.',
    codeSnippet: 'npm test # or npm run build'
  },
  {
    step: '5',
    title: 'Submit Pull Request',
    description:
      'Push your branch to your fork and open a pull request against main with a comprehensive summary of changes.',
    codeSnippet: 'git push origin feat/your-contribution'
  }
];

export const OPEN_SOURCE_VALUES = [
  {
    id: 'collaborative',
    icon: '🤝',
    title: 'Collaborative',
    description:
      'We believe in working transparently in the open to build innovation infrastructure greater than the sum of its individual parts.'
  },
  {
    id: 'open-license',
    icon: '🌍',
    title: 'Open & Copyleft (AGPL-3.0)',
    description:
      'Licensed under AGPL-3.0, ensuring that modifications and hosted derivatives remain open and free for the global innovation commons.'
  }
];

export const INTEREST_FORM_OPTIONS = [
  { value: 'code', label: 'Code Contribution' },
  { value: 'docs', label: 'Documentation' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'feature', label: 'Feature Idea' },
  { value: 'design', label: 'Design & UI' },
  { value: 'testing', label: 'Testing / QA' },
  { value: 'other', label: 'Other' }
];

export const ECOSYSTEM_DISTINCTIONS = [
  {
    id: 'contribute',
    title: 'Open Source Contribution',
    badge: 'Public Commons',
    description:
      'Voluntary participation in the open codebase, issue triage, documentation, and design under AGPL-3.0. No formal application or employment required.',
    actionLabel: 'Active Destination',
    href: '/contribute',
    isCurrent: true
  },
  {
    id: 'community',
    title: 'Community & Groups',
    badge: 'Peer Collaboration',
    description:
      'Join specialized working groups, participate in research cohorts, showcase active projects, and interact in the Open Idea Discord community.',
    actionLabel: 'Explore Community',
    href: '/community',
    isCurrent: false
  },
  {
    id: 'careers',
    title: 'Careers & Fellowships',
    badge: 'Structured Team Roles',
    description:
      'Formal technical internships, startup fellowships, and growth positions with dedicated mentorship, milestone deliverables, and stipends.',
    actionLabel: 'View Careers & Roles',
    href: '/careers',
    isCurrent: false
  }
];
