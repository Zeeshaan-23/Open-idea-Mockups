// Mock Data for Open Idea Community Workstation
// Reflects production entities: Working Groups, Peer Barter Marketplace, Events & Challenges, and Project Showcase.
// Adheres strictly to design.md: No fabricated celebrity testimonials, no inflated vanity metrics.

export const COMMUNITY_TABS = [
  { id: 'groups', label: 'Working Groups', description: 'Specialized collectives across research, hardware, and open source' },
  { id: 'barter', label: 'Peer Barter Exchange', description: 'Collaborative skill & resource exchange ("What I Need" / "What I Offer")' },
  { id: 'events', label: 'Events & Challenges', description: 'Workshops, research webinars, and open innovation hackathons' },
  { id: 'showcase', label: 'Project Showcase', description: 'Public open-source applications built on Open Idea Studio' }
];

export const MOCK_WORKING_GROUPS = [
  {
    id: 'grp-ai-research',
    name: 'AI & Scientific Literature Synthesis',
    slug: 'ai-scientific-literature',
    description: 'Developing open retrieval models and citation graph extractors for cross-disciplinary research papers.',
    topics: ['AI', 'Research', 'NLP', 'Open Access'],
    lead: 'Dr. Elena Rostova',
    institution: 'Open Science Collective',
    memberCount: 142,
    discussionCount: 38,
    activeInitiative: 'Benchmarking FAIR-compliant paper summarization on arXiv preprints'
  },
  {
    id: 'grp-hardware-iot',
    name: 'Open Hardware & IoT Sensor Arrays',
    slug: 'open-hardware-iot',
    description: 'Designing modular sub-GHz environmental sensor nodes, open schematics, and micro-meteorological relays.',
    topics: ['Hardware', 'IoT', 'Sensors', 'OSHWA'],
    lead: 'Marcus Vance',
    institution: 'Sub-GHz Mesh Lab',
    memberCount: 98,
    discussionCount: 24,
    activeInitiative: 'Standardizing KiCad 8.0 footprints for low-power soil capacitive probes'
  },
  {
    id: 'grp-climate-observatory',
    name: 'Planetary Climate Data & Eddy Flux',
    slug: 'planetary-climate-data',
    description: 'Aggregating open eddy covariance time-series, carbon flux datasets, and micro-climate observation networks.',
    topics: ['Climate', 'Open Data', 'Atmosphere', 'GeoJSON'],
    lead: 'Tariq Al-Mansoor',
    institution: 'Atmospheric Physics Consortium',
    memberCount: 116,
    discussionCount: 29,
    activeInitiative: 'Harmonizing high-frequency carbon fluxes from boreal forest towers'
  },
  {
    id: 'grp-frontend-tooling',
    name: 'Zero-Lockin Web Architecture',
    slug: 'zero-lockin-web-architecture',
    description: 'Advancing portable React 19 component patterns, vanilla CSS design tokens, and lightweight headless tools.',
    topics: ['React 19', 'Design Tokens', 'Vite', 'Open Source'],
    lead: 'Sarah Chen',
    institution: 'Independent Builder',
    memberCount: 184,
    discussionCount: 52,
    activeInitiative: 'CSS custom properties standard for portable telemetry components'
  }
];

export const MOCK_BARTER_ASKS = [
  {
    id: 'barter-01',
    title: 'Soil Moisture Calibration vs. Next.js Telemetry Frontend',
    author: {
      name: 'Marcus Vance',
      avatar: 'MV',
      role: 'Hardware Engineer · Sub-GHz Mesh Lab'
    },
    status: 'open',
    createdAt: '2026-09-18',
    description: 'I have designed a 6-node Sub-GHz capacitive sensor array for regenerative agriculture. I need assistance building a responsive React/Next.js dashboard to visualize live sensor packets via WebSockets.',
    whatINeed: 'Frontend developer with React/Next.js experience to create a clean telemetry dashboard using CSS tokens.',
    whatIOffer: 'Full KiCad PCB schematics, firmware flashing assistance, and 2 assembled sensor node kits shipped at cost.',
    pitches: [
      {
        id: 'p-1',
        author: { name: 'Sarah Chen', avatar: 'SC', role: 'Frontend Engineer' },
        createdAt: '2026-09-18',
        content: 'I built the Agrisense telemetry component on Open Idea. Happy to adapt the design tokens and layout for your sensor payload schema.'
      },
      {
        id: 'p-2',
        author: { name: 'Arun K.', avatar: 'AK', role: 'IoT Systems Architect' },
        createdAt: '2026-09-19',
        content: 'We could implement a lightweight MQTT over WebSocket broker. Let me know if you want to connect on Discord or GitHub.'
      }
    ]
  },
  {
    id: 'barter-02',
    title: 'Carbon Flux Time-Series Validation vs. Python GeoJSON Pipeline',
    author: {
      name: 'Tariq Al-Mansoor',
      avatar: 'TM',
      role: 'Environmental Researcher'
    },
    status: 'open',
    createdAt: '2026-09-17',
    description: 'We are publishing a 4-year eddy covariance dataset from our Mediterranean research plot. Seeking peer review on metadata formatting against FAIR principles.',
    whatINeed: 'Data scientist or academic reviewer familiar with NetCDF / Zenodo open data repository requirements.',
    whatIOffer: 'Automated Python GeoJSON spatial interpolation scripts and co-authorship on the published data descriptor.',
    pitches: [
      {
        id: 'p-3',
        author: { name: 'Dr. Elena Rostova', avatar: 'ER', role: 'Open Data Curator' },
        createdAt: '2026-09-18',
        content: 'Our working group recently audited 40 FAIR datasets. I can review your schema against Dataverse & Zenodo standards.'
      }
    ]
  },
  {
    id: 'barter-03',
    title: 'Accessible Color Contrast Audit vs. Technical Documentation Writing',
    author: {
      name: 'Kavita Sundaram',
      avatar: 'KS',
      role: 'Technical Writer & Student Fellow'
    },
    status: 'closed',
    createdAt: '2026-09-12',
    description: 'Completed an accessibility and keyboard-navigation audit for open research tools in exchange for comprehensive API guide documentation.',
    whatINeed: 'WCAG 2.1 AA accessibility specialist for tactile focus states.',
    whatIOffer: 'High-quality technical documentation, README overhaul, and getting-started tutorials.',
    pitches: [
      {
        id: 'p-4',
        author: { name: 'Liam O’Connor', avatar: 'LO', role: 'Accessibility Advocate' },
        createdAt: '2026-09-13',
        content: 'Completed the audit and verified 4.5:1 contrast across all interactive states. Documentation published.'
      }
    ]
  }
];

export const MOCK_EVENTS = [
  {
    id: 'evt-workshop-01',
    title: 'Building Zero-Lockin Web Tools with React 19 & CSS Tokens',
    type: 'Workshop',
    category: 'workshop',
    status: 'upcoming',
    date: '2026-09-28',
    time: '16:00 UTC',
    location: 'Open Idea Virtual Room (Jitsi Meet)',
    description: 'Hands-on session exploring how to scaffold self-contained web applications with clean exportable code, zero vendor dependencies, and portable tokens.',
    attendeesCount: 78,
    isRegistered: false,
    organizer: 'Open Idea Studio Working Group'
  },
  {
    id: 'evt-hackathon-02',
    title: 'Open Hardware for Climate Resilience Challenge',
    type: 'Innovation Challenge',
    category: 'hackathon',
    status: 'active',
    date: '2026-10-05 to 2026-10-12',
    time: '7-Day Sprint',
    location: 'Global / Asynchronous Discord & GitHub',
    description: 'Co-designing open-source sensor hardware and telemetry pipelines for agricultural water conservation. Prototype hardware grants provided.',
    attendeesCount: 134,
    isRegistered: true,
    organizer: 'Sub-GHz Mesh Lab & Open Idea Fellowship'
  },
  {
    id: 'evt-webinar-03',
    title: 'FAIR Data Protocols in Academic Literature Synthesis',
    type: 'Webinar',
    category: 'webinar',
    status: 'upcoming',
    date: '2026-10-18',
    time: '14:00 UTC',
    location: 'Open Webcast',
    description: 'Panel discussion on federating open science datasets across arXiv, Crossref, and Zenodo without proprietary paywalls.',
    attendeesCount: 92,
    isRegistered: false,
    organizer: 'AI & Scientific Literature Group'
  }
];

export const MOCK_SHOWCASE_PROJECTS = [
  {
    id: 'proj-agrisense',
    title: 'Agrisense IoT Telemetry',
    framework: 'React 19 / CSS Tokens',
    owner: 'Marcus Vance & Sub-GHz Lab',
    description: 'Autonomous agricultural sensor mesh for real-time soil moisture and solenoid irrigation actuation.',
    deploymentUrl: '/studio',
    githubUrl: 'https://github.com/open-idea/agrisense-iot',
    upvotes: 42,
    hasUpvoted: false,
    tags: ['IoT', 'Agriculture', 'Telemetry']
  },
  {
    id: 'proj-carbon-flux',
    title: 'Carbon Flux Observatory',
    framework: 'Next.js 14 / GeoJSON',
    owner: 'Tariq Al-Mansoor',
    description: 'Atmospheric eddy covariance time-series analyzer with diurnal carbon uptake visualization.',
    deploymentUrl: '/openresources?q=carbon+flux',
    githubUrl: 'https://github.com/open-idea/carbon-flux-observatory',
    upvotes: 29,
    hasUpvoted: false,
    tags: ['Climate', 'Open Data', 'Environmental']
  },
  {
    id: 'proj-research-index',
    title: 'Open Literature Synthesizer',
    framework: 'React 19 / OpenAlex API',
    owner: 'Dr. Elena Rostova',
    description: 'Citation network explorer extracting research methodology across open-access preprints.',
    deploymentUrl: '/openresources',
    githubUrl: 'https://github.com/open-idea/open-research-synthesizer',
    upvotes: 37,
    hasUpvoted: true,
    tags: ['Research', 'NLP', 'Open Access']
  }
];

export const COMMUNITY_PATHWAYS = [
  {
    id: 'fellowship',
    title: 'Student Fellowship & Residency',
    desc: 'Mentorship, stipend, and project residency for students and independent open-source builders.',
    route: '/intern-fellowship',
    actionLabel: 'Apply for fellowship'
  },
  {
    id: 'contribute',
    title: 'Open Source Contribution Guide',
    desc: 'Guidelines for submitting pull requests, testing code, improving documentation, and reporting issues.',
    route: '/contribute',
    actionLabel: 'Read contribution guide'
  },
  {
    id: 'problems',
    title: 'Problems & Ideas Registry',
    desc: 'Public repository of unsolved domain problems and collaborative hypotheses ready for exploration.',
    route: '/problems-and-ideas',
    actionLabel: 'Explore problem registry'
  }
];
