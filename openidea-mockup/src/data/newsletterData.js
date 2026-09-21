/**
 * Open Idea — Newsletter Data Model
 *
 * Source of truth: verified production content from https://openidea.world/newsletter
 * and production client chunk app/newsletter/page-fefcefea7fd96460.js.
 *
 * Grounded strictly in verified production facts:
 * - Real API endpoint: POST /api/newsletter/subscribe
 * - 4 verified content streams: Product updates, AI news, Community highlights, Early access
 * - Verified success/error messages
 * - No fabricated archives, subscriber statistics, or publication schedules.
 */

export const NEWSLETTER_META = {
  endpoint: '/api/newsletter/subscribe',
  title: 'Newsletter',
  titleAccent: 'Open Innovation Dispatch',
  tagline: 'Get updates on Open Idea, AI news, and open innovation',
  description:
    'Subscribe to our newsletter for product updates, AI and innovation news, community highlights, and early access to new features.',
  fallbackEmail: 'info@openidea.world',
  fallbackEmailHref: 'mailto:info@openidea.world',
  successMessage: "Thanks! We'll add you to our newsletter.",
  errorMessage: 'Something went wrong. Please try again or contact us at',
  privacyNote: 'Direct editorial correspondence. No third-party tracking, ad cookies, or data resale.'
};

export const NEWSLETTER_STREAMS = [
  {
    id: 'product-updates',
    number: '01',
    title: 'Product Updates',
    summary:
      'Changelogs and platform enhancements across Open Idea, including AI Studio scaffolding workbench releases, AST telemetry upgrades, and export tooling.'
  },
  {
    id: 'ai-news',
    number: '02',
    title: 'AI & Innovation News',
    summary:
      'Curated briefings on open-source foundation models, decentralized AI infrastructure, reproducible research benchmarks, and peer-reviewed open datasets.'
  },
  {
    id: 'community-highlights',
    number: '03',
    title: 'Community Highlights',
    summary:
      'Spotlights on public working groups, open problem commons submissions, student fellowship breakthroughs, and verified citations across the ecosystem.'
  },
  {
    id: 'early-access',
    number: '04',
    title: 'Early Feature Access',
    summary:
      'Priority invitations to test new developer features, experimental dataset synthesis tools, dedicated compute slots, and turnkey web archetypes.'
  }
];

export const CONTEXTUAL_REFERRALS = [
  {
    title: 'Institutional Mission',
    description: 'Read the Open Idea research whitepaper and understand our 4 core architecture pillars.',
    actionLabel: 'Explore About Open Idea',
    href: '/about'
  },
  {
    title: 'Open Knowledge Base',
    description: 'Search through thousands of peer-reviewed papers, public datasets, and open protocol repositories.',
    actionLabel: 'Browse Open Resources',
    href: '/openresources'
  },
  {
    title: 'Executive Correspondence',
    description: 'Connect directly with founder Sony Yadav for strategic partnerships, press, and institutional alliances.',
    actionLabel: 'Contact Founder Directly',
    href: '/founder-contact'
  }
];
