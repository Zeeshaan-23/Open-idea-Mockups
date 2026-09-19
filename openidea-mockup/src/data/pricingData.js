/**
 * Open Idea Commercial & Pricing Data
 *
 * Source of Truth: Production Open Idea Website (https://openidea.world/pricing)
 * Next.js production chunks 1898 & 23827
 *
 * All pricing, credit grants, and commercial terms reflect actual production truth:
 * - Build credit cost: Math.ceil(266.9) = 267
 * - Edit credit cost: Math.ceil(51) = 51
 * - Credit grant multiplier: 1.25
 */

export const STUDIO_CREDIT_MATH = {
  buildCost: 267,
  editCost: 51,
  multiplier: 1.25,
  note: "A build turns a prompt into a new app scaffold. An edit modifies an existing app. Runs that fail to build are never charged. Monthly allowances reset on the 1st of every month."
};

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    kicker: 'Platform Entry',
    audience: 'Individuals & researchers starting out with open innovation',
    priceInr: 0,
    priceUsd: 0,
    priceLabelInr: '₹0',
    priceLabelUsd: '$0',
    period: '/month',
    isPaid: false,
    badge: null,
    workspaces: '3 workspaces',
    storage: '1GB / workspace',
    studio: {
      builds: 3,
      edits: 20,
      creditGrant: 2277,
      maxFiles: 10,
      label: '3 builds + 20 edits / month'
    },
    features: [
      '3 workspaces with isolated environments',
      'App Studio: 3 builds + 20 edits / month (2,277 credits)',
      'Up to 10 files per AI generation',
      'Basic AI search & discovery engine',
      'Public knowledge graph catalog access',
      'Standard community support & shared forums',
      '1GB cloud storage per workspace'
    ],
    ctaLabel: 'Start Free',
    ctaAction: 'auth',
    ctaHref: '/auth?plan=free'
  },
  {
    id: 'student',
    name: 'Student',
    kicker: 'Academic & Learning',
    audience: 'Affordable tier for students, fellows & academic researchers',
    priceInr: 200,
    priceUsd: 2.50,
    priceLabelInr: '₹200',
    priceLabelUsd: '$2.50',
    period: '/month',
    isPaid: true,
    badge: null,
    workspaces: '5 workspaces',
    storage: '2GB / workspace',
    studio: {
      builds: 4,
      edits: 40,
      creditGrant: 3885,
      maxFiles: 15,
      label: '4 builds + 40 edits / month'
    },
    features: [
      'Everything in Free',
      '5 workspaces with persistent state',
      'App Studio: 4 builds + 40 edits / month (3,885 credits)',
      'Up to 15 files per AI generation',
      'Enhanced AI research query engine',
      'Priority ticket & community support',
      '2GB cloud storage per workspace'
    ],
    ctaLabel: 'Subscribe · Student',
    ctaAction: 'subscribe',
    planId: 'student'
  },
  {
    id: 'plus',
    name: 'Plus',
    kicker: 'Power Creators',
    audience: 'Enhanced capabilities for power engineers, founders & creator teams',
    priceInr: 999,
    priceUsd: 12,
    priceLabelInr: '₹999',
    priceLabelUsd: '$12',
    period: '/month',
    isPaid: true,
    isPopular: true,
    badge: 'Most Popular',
    workspaces: 'Unlimited workspaces',
    storage: '5GB / workspace',
    studio: {
      builds: 10,
      edits: 100,
      creditGrant: 7770,
      maxFiles: 25,
      label: '10 builds + 100 edits / month'
    },
    features: [
      'Everything in Free & Student',
      'Unlimited active workspaces',
      'App Studio: 10 builds + 100 edits / month (7,770 credits)',
      'Up to 25 files per AI generation',
      'Advanced AI research tools & full knowledge graph access',
      '100,000 API requests / month with developer keys',
      'Priority response engineering support',
      '5GB cloud storage per workspace'
    ],
    ctaLabel: 'Subscribe · Plus',
    ctaAction: 'subscribe',
    planId: 'plus'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    kicker: 'Institutions & Teams',
    audience: 'Dedicated infrastructure for research labs, institutions & scale teams',
    priceInr: null,
    priceUsd: null,
    priceLabelInr: 'Custom',
    priceLabelUsd: 'Custom',
    period: 'contract',
    isPaid: true,
    badge: null,
    workspaces: 'Custom limits',
    storage: 'Unlimited storage',
    studio: {
      builds: 100,
      edits: 1000,
      creditGrant: null,
      maxFiles: -1,
      label: '100 builds + 1,000 edits / month'
    },
    features: [
      'Everything in Plus',
      'Custom workspace allocations & team quotas',
      'App Studio: 100 builds + 1,000 edits / month (credits tailored by contract)',
      'Unlimited files per generation & custom models',
      'Custom AI model fine-tuning & domain dataset training',
      'Single Sign-On (SSO) & role-based team access controls',
      'Advanced security, enterprise compliance & dedicated SLA',
      'Custom API rate limits & unlimited cloud storage',
      'Dedicated engineering partner & onboarding manager'
    ],
    ctaLabel: 'Contact Sales',
    ctaAction: 'contact',
    ctaHref: '/contact?enquiry=enterprise'
  }
];

export const BESPOKE_WEBSITE_OFFERING = {
  name: 'Business Website Service',
  headline: 'Turnkey Bespoke Website Engineering',
  tagline: 'Complete production-ready website with all essentials, designed and deployed in 2–7 days.',
  priceInr: 25000,
  priceLabelInr: '₹25,000',
  period: 'one-time',
  delivery: '2–7 days delivery',
  revisions: '3 revision rounds',
  support: '30 days dedicated engineering support',
  note: "We call to understand your needs and review requirements before engineering begins.",
  features: [
    'Responsive website (up to 5 pages)',
    'Mobile-first, high-performance responsive engineering',
    'Business info & working hours display',
    'Interactive location map with Google Maps',
    'Direct click-to-call & WhatsApp action button',
    'WhatsApp enquiry & appointment booking system',
    'Interactive photo gallery & asset showcase',
    'Services & products catalog showcase',
    'Verified customer reviews & testimonials section',
    'Offers & announcements banner section',
    'Transparent pricing & service packages display',
    'Validated contact form with spam protection',
    'Social media channel integration links',
    'Free high-speed hosting & subdomain included',
    '3 structured revision rounds included',
    '30 days dedicated post-launch support',
    'Guaranteed delivery in 2–7 business days'
  ],
  conditions: [
    { label: 'Custom Domain', value: 'Billed at actuals if you need a custom domain registered or connected.' },
    { label: 'Taxes', value: 'GST at 18% applicable on invoice as per statutory regulations.' },
    { label: 'Content Assets', value: 'Your logo, photos, and copy — you send them, our team formats and places them.' },
    { label: 'Third-Party Tools', value: 'Specialized paid third-party plugins, stock media, or external APIs billed at actuals.' }
  ]
};

export const PRICING_FAQS = [
  {
    q: 'How do App Studio builds, edits, and credits work?',
    a: 'A build synthesizes natural language prompts and uploaded context into an entirely new React 19 application scaffold. An edit refines or modifies specific components of an existing application. Every plan includes a monthly credit grant calculated to cover its full build and edit quota. If a build run encounters a generation error, you are not charged.'
  },
  {
    q: 'When do monthly allowances and credits reset?',
    a: 'All platform allowances, Studio builds, edits, and API request quotas reset cleanly at midnight UTC on the 1st day of every calendar month. Unused monthly quotas do not roll over.'
  },
  {
    q: 'Who qualifies for the Student plan?',
    a: 'The Student plan (₹200 / $2.50 per month) is open to students, university researchers, fellows, and self-directed learners building open-source projects or learning application architecture. No complex enterprise verification is required.'
  },
  {
    q: 'What is the relationship between the ₹25,000 Website Service and the ₹500 scoping fee?',
    a: 'The ₹25,000 Business Website is our complete, all-inclusive turnkey engineering package. If you prefer to consult first or scope your custom requirements, you can place a ₹500 refundable scoping deposit on our Websites page (/websites). That ₹500 is fully credited toward your project upon kickoff.'
  },
  {
    q: 'What payment methods and currencies are supported?',
    a: 'In India, we support UPI (Google Pay, PhonePe, Paytm), RuPay, Indian Netbanking, and Credit/Debit cards via Razorpay. For international clients, we process all major credit cards and global payments via Stripe in USD.'
  },
  {
    q: 'How does the Partner / Affiliate referral code work?',
    a: 'If an Open Idea partner, educator, or community member referred you, enter their code at the top of the pricing page. When you activate a paid subscription, your partner automatically earns a 5% credit commission. Your code persists in your session.'
  },
  {
    q: 'Can I cancel or change my subscription at any time?',
    a: 'Yes. You can upgrade, downgrade, or cancel your subscription at any time without lock-in. When upgrading, changes take effect immediately; when cancelling, your plan remains active until the end of your current billing cycle.'
  }
];

export const COMPARISON_CATEGORIES = [
  {
    category: 'Workspace & Infrastructure',
    items: [
      { name: 'Active Workspaces', free: '3', student: '5', plus: 'Unlimited', enterprise: 'Custom' },
      { name: 'Storage Allowance', free: '1GB / workspace', student: '2GB / workspace', plus: '5GB / workspace', enterprise: 'Unlimited' },
      { name: 'Knowledge Graph Access', free: 'Public catalog', student: 'Standard', plus: 'Full graph', enterprise: 'Full + Custom' },
      { name: 'Developer API Access', free: '—', student: '—', plus: '100K requests / mo', enterprise: 'Custom SLA' }
    ]
  },
  {
    category: 'App Studio Scaffolding',
    items: [
      { name: 'Monthly Builds', free: '3 / mo', student: '4 / mo', plus: '10 / mo', enterprise: '100 / mo' },
      { name: 'Monthly Edits', free: '20 / mo', student: '40 / mo', plus: '100 / mo', enterprise: '1,000 / mo' },
      { name: 'Monthly Credit Grant', free: '2,277 credits', student: '3,885 credits', plus: '7,770 credits', enterprise: 'Contract-based' },
      { name: 'Max Files per Generation', free: '10 files', student: '15 files', plus: '25 files', enterprise: 'Unlimited' },
      { name: 'Code Ownership', free: '100% portable', student: '100% portable', plus: '100% portable', enterprise: '100% portable' },
      { name: 'Failed Build Protection', free: 'Free retry (not charged)', student: 'Free retry (not charged)', plus: 'Free retry (not charged)', enterprise: 'Dedicated SLA' }
    ]
  },
  {
    category: 'Support & Administration',
    items: [
      { name: 'Support Channel', free: 'Community forum', student: 'Priority support', plus: 'Priority response', enterprise: 'Dedicated engineer' },
      { name: 'Security & Compliance', free: 'Standard', student: 'Standard', plus: 'Standard', enterprise: 'SOC2 / HIPAA readiness' },
      { name: 'Single Sign-On (SSO)', free: '—', student: '—', plus: '—', enterprise: 'SAML / Okta / Azure AD' },
      { name: 'Custom Model Training', free: '—', student: '—', plus: '—', enterprise: 'Included' }
    ]
  }
];
