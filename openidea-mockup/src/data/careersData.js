/**
 * Open Idea — Careers & Fellowship Roles Data Model
 *
 * Source of truth: verified production content from https://openidea.world/careers,
 * https://openidea.world/intern-fellowship, and Next.js client application chunks.
 * No fabricated job openings, salaries, benefits, or employee counts.
 */

export const CAREERS_META = {
  headline: 'Careers & Fellowships',
  serifAccent: 'at Open Idea',
  subtitle:
    'Join us in building the open innovation infrastructure for software, research, and datasets. We collaborate with technical interns, startup fellows, and growth contributors across remote, milestone-driven initiatives.',
  location: 'Remote',
  commitment: 'Internship / Fellowship',
  officialContactEmail: 'info@openidea.world',
  applicationEndpoint: '/api/careers/apply',
  fellowshipRoute: '/intern-fellowship',
  contributeRoute: '/contribute',
  contactRoute: '/contact'
};

export const CAREER_TRACKS = [
  { id: 'all', label: 'All Roles', count: 7 },
  { id: 'engineering', label: 'Engineering & AI', count: 2 },
  { id: 'devrel', label: 'Community & DevRel', count: 1 },
  { id: 'growth', label: 'Growth & BD', count: 3 },
  { id: 'content', label: 'Technical Writing', count: 1 }
];

export const OPEN_POSITIONS = [
  {
    id: 'platform-development-engineer',
    title: 'Platform Development Engineer – Innovation Platform',
    roleBadge: 'Technical Intern / Startup Fellow',
    track: 'engineering',
    icon: '⚙️',
    location: 'Remote',
    type: 'Technical Internship',
    pdfPath: 'https://openidea.world/careers/platform-development-engineer.pdf',
    summary:
      "Foundational full-stack engineering role building the core infrastructure that powers Open Idea's innovation platform. You'll develop the no-code editor, real-time preview engine, deployment pipeline, and workspace environment that enable users to go from idea to working prototype. Key deliverables: 95%+ preview success rate, ≥99% platform uptime, one-click Vercel/Netlify deployment, collaborative workspace with version control. Requires proficiency in JavaScript/TypeScript, React, Node.js, build tools (Vite/Webpack), and deployment platforms.",
    highlights: [
      'Editor & Workspace: Intuitive editing interfaces, file management, component libraries, collaborative workspaces',
      'Preview & Build: Real-time render AI-generated code, handle esbuild/Vite/Webpack, hot module replacement',
      'Deployment: Automated workflows to Vercel/Netlify, zero manual intervention, ≥98% success rate',
      'Backend: APIs, database design, authentication, file storage, server-side logic'
    ],
    skills: [
      'JavaScript/TypeScript',
      'React.js',
      'Node.js',
      'Vite/Webpack',
      'Vercel/Netlify',
      'PostgreSQL',
      'Git'
    ],
    applyNote: 'Send resume, GitHub profile, and a brief note to info@openidea.world',
    needsGithub: true
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI / LLM Systems Engineer – Innovation Intelligence',
    roleBadge: 'AI Research & Engineering Intern',
    track: 'engineering',
    icon: '🤖',
    location: 'Remote',
    type: 'Research & Engineering Internship',
    pdfPath: 'https://openidea.world/careers/ai-ml-engineer.pdf',
    summary:
      'Core AI infrastructure role designing the intelligence layer that turns user ideas into executable prototypes. Build prompt pipelines with 90%+ success rate, develop semantic search across research/code/datasets (≥85% precision), implement AI validation for security and intent alignment. Evaluate and fine-tune LLMs (GPT-4, Claude, Gemini, open-source). Optimize to ≤1.5s latency, build monitoring dashboards, and experiment with RAG, function calling, and agentic workflows.',
    highlights: [
      'Prompt Engineering: Production templates for idea generation, code synthesis, project structuring',
      'Semantic Search: Vector DBs, embeddings, RAG, knowledge graph (≥85% precision)',
      'AI Validation: Automated testing for syntax, security, and logical consistency',
      'Performance: ≤1.5s latency, ≤1 AI failure/week, and cost optimization'
    ],
    skills: [
      'Python',
      'LangChain',
      'LLMs',
      'RAG',
      'Vector DBs',
      'Prompt Engineering',
      'PyTorch'
    ],
    applyNote: 'Send resume, GitHub profile, and a brief note to info@openidea.world',
    needsGithub: true
  },
  {
    id: 'developer-relations',
    title: 'Developer Relations & Platform Operations Associate',
    roleBadge: 'Community & Operations Intern',
    track: 'devrel',
    icon: '🤝',
    location: 'Remote',
    type: 'Community & Operations Internship',
    pdfPath: 'https://openidea.world/careers/developer-relations.pdf',
    summary:
      'Critical role bridging users and product—ensuring Open Idea is accessible, user-friendly, and community-driven. Design onboarding flows for 80%+ first-prototype success within 24 hours. Create comprehensive documentation, video tutorials, FAQs, and 12+ sample project templates. Provide first-line support via Discord/email (≤6hr response, ≤24hr resolution), foster community to 300+ members, and represent user needs to the product team.',
    highlights: [
      'Documentation: Getting Started Guide, 30+ knowledge-base articles, video walkthroughs',
      'Sample Projects: 12+ templates (web apps, mobile prototypes, AI tools, dashboards)',
      'Support: ≤24hr resolution, ≥8/10 satisfaction, Discord/Slack community moderation',
      'Developer Advocacy: User feedback loops, pain-point reports, and feature prioritization'
    ],
    skills: [
      'Technical Writing',
      'Documentation',
      'Discord / Slack',
      'Notion / GitBook',
      'User Support'
    ],
    applyNote: 'Send resume and a brief note to info@openidea.world',
    needsGithub: false
  },
  {
    id: 'marketing-growth',
    title: 'Marketing & Growth Associate – Innovation Platform',
    roleBadge: 'Growth & Strategy Intern',
    track: 'growth',
    icon: '📈',
    location: 'Remote',
    type: 'Growth & Strategy Internship',
    pdfPath: 'https://openidea.world/careers/marketing-growth-associate.pdf',
    summary:
      'High-impact role driving go-to-market strategy and user acquisition. Plan campaigns to onboard 500+ early adopters from universities, research institutions, and startup incubators. Produce 3+ weekly content pieces: tutorials, founder interviews, success stories, comparison content. Run multi-channel campaigns (LinkedIn, Twitter, Reddit, Product Hunt, Hacker News). Establish community, craft positioning for 4 key segments, and execute a top-10 Product Hunt launch.',
    highlights: [
      'Beta Launch: 500+ early adopters, 100+ beta users with ≥30% activation',
      'Content: 40+ pieces—blogs, videos, case studies, and email sequences',
      'Channels: LinkedIn, Twitter, Reddit, Product Hunt, university innovation clubs',
      'Analytics: Funnel metrics, A/B tests, CAC optimization, and growth dashboard tracking'
    ],
    skills: [
      'Content Marketing',
      'Growth Strategy',
      'SEO / Social Distribution',
      'Google Analytics',
      'Product Hunt'
    ],
    applyNote: 'Send resume and a brief note to info@openidea.world',
    needsGithub: false
  },
  {
    id: 'business-development-associate',
    title: 'Business Development Associate – Innovation Platform',
    roleBadge: 'IncubatorAIC-GBU / Startup Fellow / Growth Team',
    track: 'growth',
    icon: '📞',
    location: 'Remote',
    type: 'Startup Fellow / BD Internship',
    pdfPath: 'https://openidea.world/careers/business-development-associate.pdf',
    summary:
      "Frontline business development role responsible for generating demand, qualifying leads, booking demos, and driving user acquisition for Open Idea. You'll be one of the first voices prospects hear—shaping how the market understands the product. Complete daily outbound sales calls to founders, students, startup teams, institutions, innovation cells, and incubators. Qualify leads, pitch Open Idea clearly, handle objections, and move prospects to demos, trials, and closure. Maintain clean CRM records, run consistent follow-ups, and contribute weekly sales insights.",
    highlights: [
      'Outbound Calling: Daily sales call target with structured outcome tracking',
      'Lead Qualification: Separate curiosity from real opportunity across founders, students, incubators',
      'Demo Booking: Schedule product demos, discovery calls, and onboarding sessions',
      'CRM Hygiene: 100% activity logging with clear next-step tracking across every lead',
      'Follow-Up Cadence: First touch, reminder, re-engagement, and closure',
      'Sales Reporting: Weekly summaries on calls, conversations, demos, and objections'
    ],
    skills: [
      'Outbound Sales',
      'Lead Generation',
      'CRM Tools',
      'Cold Calling',
      'LinkedIn Outreach',
      'Objection Handling',
      'Pipeline Management'
    ],
    applyNote: 'Send resume and a brief note explaining why you are a strong fit to info@openidea.world',
    needsGithub: false
  },
  {
    id: 'outbound-sales-executive',
    title: 'Business Development (Sales) – Innovation Platform',
    roleBadge: 'Sales Intern / Growth Team / Work From Home',
    track: 'growth',
    icon: '🎯',
    location: 'Remote (Work From Home)',
    type: '3-Month Sales Internship (4 Openings)',
    pdfPath: 'https://openidea.world/careers/outbound-sales-executive.pdf',
    summary:
      'Outbound sales role making 60–100 calls per day to leads from marketing campaigns. Qualify prospects based on requirements, budget, and purchase readiness. Follow up via calls, WhatsApp, and email until closure. Update lead status daily in CRM/Google Sheets, handle customer queries and objections professionally, coordinate with sales and operations teams, and achieve daily/weekly call and conversion targets. Work from home with flexible hours, job offer up to 3.6 LPA post internship. Duration: 3 months. Openings: 4.',
    highlights: [
      'Outbound Calling: Make 60–100 outbound calls per day to qualified leads',
      'Lead Qualification: Qualify prospects on requirements, budget, location, and purchase readiness',
      'Follow-Up Management: Follow up via calls, WhatsApp, and email until closure or clear decline',
      'CRM & Reporting: Update lead status daily in Google Sheets/CRM, share daily performance reports',
      'Objection Handling: Handle customer queries and objections professionally and composedly',
      'Conversion Targets: Achieve daily and weekly call volume and conversion targets'
    ],
    skills: [
      'Cold Calling',
      'CRM / Google Sheets',
      'Effective Communication',
      'English Proficiency',
      'MS-Excel',
      'Social Media Marketing'
    ],
    applyNote: 'Send resume and a brief note to info@openidea.world',
    needsGithub: false
  },
  {
    id: 'technical-content-writer',
    title: 'Technical Content Writer – Innovation Platform',
    roleBadge: 'Content Intern / Marketing Team',
    track: 'content',
    icon: '✍️',
    location: 'Remote',
    type: 'Technical Writing Internship',
    pdfPath: 'https://openidea.world/careers/technical-content-writer.pdf',
    summary:
      'Content-driven role responsible for creating technical and marketing content that educates, attracts, and converts users for Open Idea. Write blog posts, tutorials, product documentation, case studies, landing page copy, email sequences, and social media content. Translate complex AI and no-code concepts into clear, engaging, and SEO-optimized content. Work closely with the product, engineering, and growth teams to tell the Open Idea story—from idea to prototype to launch. Ideal for writers who understand technology, love startups, and can make technical topics accessible to non-technical audiences.',
    highlights: [
      'Blog & SEO: Write 3+ weekly articles—tutorials, comparisons, how-tos, and founder stories',
      'Product Documentation: Create and maintain user guides, API docs, FAQs, and knowledge base articles',
      'Case Studies: Interview users and write compelling success stories showcasing Open Idea outcomes',
      'Landing Pages & Copy: Write high-converting copy for product pages, email campaigns, and ad creatives',
      'Social Content: Craft engaging posts for LinkedIn, Twitter, and community channels',
      'Content Strategy: Plan editorial calendar, track content performance, and optimize based on analytics'
    ],
    skills: [
      'Technical Writing',
      'SEO',
      'Blog Writing',
      'Copywriting',
      'Content Strategy',
      'Markdown / CMS',
      'Google Analytics'
    ],
    applyNote: 'Send resume, writing samples or portfolio link, and a brief note to info@openidea.world',
    needsGithub: false
  }
];

export const WORKING_PHILOSOPHY = [
  {
    num: '01',
    title: 'Autonomy & Real Deliverables',
    description:
      'We do not assign busywork or artificial demo projects. Fellows and interns ship production code, build real documentation, and engage genuine users from week one.'
  },
  {
    num: '02',
    title: 'Innovation in the Open',
    description:
      'Our foundation rests on open datasets, open research provenance, and verifiable public tools. Your contributions become part of a lasting, public portfolio.'
  },
  {
    num: '03',
    title: 'Milestone Clarity',
    description:
      'Expectations are bounded by clear milestone deliverables rather than bureaucratic seat time. You know what success looks like at every checkpoint.'
  }
];

export const ECOSYSTEM_PATHWAYS = [
  {
    id: 'careers',
    title: 'Careers & Team Roles',
    badge: 'Structured Fellowship',
    description:
      'Join our core team as a technical intern or startup fellow. Work directly with leadership on key product, AI, growth, or content deliverables with dedicated mentorship.',
    actionLabel: 'Browse Current Openings',
    href: '#roles',
    isAnchor: true
  },
  {
    id: 'fellowship',
    title: 'Milestone Fellowship',
    badge: 'Graph Roadmap',
    description:
      'For engineers and researchers seeking a self-paced, graph-based contribution model. Match your resume to our roadmap and earn stipends per completed milestone node.',
    actionLabel: 'Explore Milestone Fellowship',
    href: '/intern-fellowship',
    isAnchor: false
  },
  {
    id: 'contribute',
    title: 'Open Source Community',
    badge: 'Public Commons',
    description:
      'Participate in the global open-source ecosystem without formal employment. Submit pull requests, curate datasets, evaluate models, and help fellow builders.',
    actionLabel: 'Contribution Guidelines',
    href: '/contribute',
    isAnchor: false
  }
];
