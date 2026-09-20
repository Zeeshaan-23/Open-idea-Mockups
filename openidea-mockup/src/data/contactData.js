/**
 * Open Idea — Contact & Inquiries Data Model
 *
 * Source of truth: verified production content from https://openidea.world/contact,
 * production footer coordinates, and institutional records in About data.
 * No fabricated phone numbers, addresses, emails, or service claims.
 */

export const INSTITUTIONAL_COORDINATES = {
  organizationName: 'EcoSyz & Open Idea',
  legalEntity: 'EcoSyz Open Innovation Infrastructure',
  primaryEmail: 'info@openidea.world',
  directPhone: '+91 81302 96940',
  directPhoneHref: 'tel:+918130296940',
  landlinePhone: '011 4119 3699',
  landlinePhoneHref: 'tel:+911141193699',
  registeredAddress: '8125, 8th Floor, Gaur City Mall Office Space, Sector 4, Greater Noida West, Gautam Buddha Nagar, Uttar Pradesh 201318, India',
  pinCode: '201318',
  repositoryUrl: 'https://github.com/Sony17/Ecosyz',
  repositoryLabel: 'github.com/Sony17/Ecosyz',
  discordCommunity: 'https://discord.gg/4weahHXQYY',
  discordLabel: 'Open Idea Community Discord',
  timeZone: 'India Standard Time (UTC+5:30)',
  responseTurnaround: '1–2 business days for enterprise, partnership, and institutional correspondence',
  socialChannels: [
    { name: 'Discord', href: 'https://discord.gg/4weahHXQYY', handle: 'Open Idea Community' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecosyz/', handle: 'company/ecosyz' },
    { name: 'X / Twitter', href: 'https://x.com/OpenIdeaOrg', handle: '@OpenIdeaOrg' },
    { name: 'Instagram', href: 'https://www.instagram.com/openidea.ai_platform/', handle: '@openidea.ai_platform' },
    { name: 'GitHub', href: 'https://github.com/Sony17/Ecosyz', handle: 'Sony17/Ecosyz' }
  ]
};

export const ENQUIRY_CATEGORIES = [
  {
    id: 'general',
    paramKey: 'general',
    label: 'General',
    kicker: 'Platform & Support',
    title: 'General Inquiries & Community Questions',
    description: "Have questions or feedback? We'd love to hear from you.",
    placeholder: 'How can we help you?',
    subjectPrefix: 'Contact Form Submission - Open Idea',
    suggestedFocus: 'Platform questions, account assistance, product feedback, or general inquiries.'
  },
  {
    id: 'enterprise',
    paramKey: 'enterprise',
    label: 'Enterprise',
    kicker: 'Scale & Compute',
    title: 'Enterprise Inquiries & Infrastructure Deployments',
    description: "Interested in our Enterprise plan? Let's discuss how we can help your organization.",
    placeholder: 'Tell us about your organization and requirements...',
    subjectPrefix: 'Enterprise Inquiry - Open Idea',
    suggestedFocus: 'Dedicated compute clusters, custom volume quotas, enterprise SLA, and institutional billing.'
  },
  {
    id: 'partnership',
    paramKey: 'partnership',
    label: 'Partnership',
    kicker: 'Alliances & Ecosystem',
    title: 'Partnership & Collaboration Inquiries',
    description: "Interested in partnering with Open Idea? Let's explore collaboration opportunities.",
    placeholder: "Tell us about your organization and how you'd like to partner with Open Idea...",
    subjectPrefix: 'Partnership Inquiry - Open Idea',
    suggestedFocus: 'Strategic alliances, ecosystem integrations, institutional collaborations, and joint initiatives.'
  },
  {
    id: 'sales',
    paramKey: 'sales',
    label: 'Sales',
    kicker: 'Web & Engineering',
    title: 'Sales & Commercial Inquiries',
    description: 'Inquire about our dedicated bespoke website engineering, trade archetypes, or commercial compute packages.',
    placeholder: 'Tell us about the website or software you need engineered, preferred timeline, and project requirements...',
    subjectPrefix: 'Sales Inquiry - Open Idea',
    suggestedFocus: 'Bespoke web engineering, trade archetype customization, build slot reservation, and commercial quotes.'
  }
];

export const CONTEXTUAL_PATHWAYS = [
  {
    id: 'websites',
    badge: 'Turnkey Engineering',
    title: 'Need a Custom Website Engineered?',
    description: 'Explore 50 interactive trade archetypes across 7 industry sectors, or submit a scoping brief directly.',
    actionLabel: 'Browse Websites Catalog',
    href: '/websites'
  },
  {
    id: 'studio',
    badge: 'Instant AI Scaffolding',
    title: 'Looking to Scaffold Software Directly?',
    description: 'Jump immediately into AI Studio to generate multi-file project scaffolding with zero email turnaround.',
    actionLabel: 'Open AI Studio',
    href: '/studio'
  },
  {
    id: 'github',
    badge: 'Open Source Provenance',
    title: 'Reporting a Bug or Code Contribution?',
    description: 'Our codebase and issue tracker are publicly accessible on GitHub. Review active PRs or file an issue.',
    actionLabel: 'View GitHub Repository',
    href: 'https://github.com/Sony17/Ecosyz',
    isExternal: true
  },
  {
    id: 'fellowship',
    badge: 'Research & Residency',
    title: 'Applying for Fellowship or Careers?',
    description: 'Learn about our active mentorship tracks, open contributor pathways, and current team openings.',
    actionLabel: 'Explore Fellowship Program',
    href: '/intern-fellowship'
  }
];
