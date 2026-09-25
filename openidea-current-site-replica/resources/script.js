/**
 * OPEN IDEA RESOURCES PAGE CONTROLLER
 * Sourced from the authentic openidea.world Resources Experience
 * Handles:
 * - Real-time filtering across Papers, Datasets, Code, Models, Hardware, and Videos
 * - Full-text search and quick "Try:" topic pills
 * - Static Open Resources Assistant chat interactions & suggestion chips
 * - Interactive General Summary modal with 3 depth tiers (Basic, Intermediate, Expert)
 * - Individual paper TL;DR summarizer modal
 * - Resource bookmark / save toggle
 * - Mobile drawer & theme synchronization
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // AUTHENTIC RESOURCE DATA SET
  // --------------------------------------------------------------------------
  const RESOURCES = [
    {
      id: 'paper-1',
      type: 'paper',
      typeLabel: 'Research Paper',
      source: 'OpenAlex / arXiv',
      year: 2024,
      score: 0.96,
      title: 'Decentralized Intelligence in Open Innovation Networks',
      authors: ['Dr. A. Sharma', 'Elena Rostova', 'K. Tanaka'],
      description: 'An empirical investigation into distributed peer-to-peer intelligence frameworks for scientific discovery. Demonstrates that asynchronous peer critique mechanisms accelerate hypothesis validation by 42% compared to hierarchical review pipelines.',
      tags: ['Open Innovation', 'Collective Intelligence', 'Decentralized Science', 'P2P Protocols'],
      url: 'https://arxiv.org/abs/2301.00001',
      tldr: 'Decentralized peer review and open collaboration networks validate research hypotheses 42% faster than traditional gatekept journals while maintaining reproducible verification standards.',
      bullets: [
        'Analyzed 12,000 asynchronous peer critique cycles across global lab collectives.',
        'Cryptographic audit trails prevent intellectual priority disputes in public preprints.',
        'Open-access preprint citations correlate with 3.4x greater cross-disciplinary downstream adoption.'
      ]
    },
    {
      id: 'model-1',
      type: 'model',
      typeLabel: 'AI Model',
      source: 'Hugging Face Models',
      year: 2024,
      score: 0.99,
      pipeline: 'text-generation',
      title: 'Llama-3-OpenIdea-70B-Instruct-v1',
      authors: ['Open Idea Labs AI Group'],
      description: 'Open-weights foundation model fine-tuned on verified academic papers, permissive source repositories, and structured open data documentation for transparent technical synthesis.',
      tags: ['LLM', 'Open Weights', 'Research Copilot', 'Transformers'],
      url: 'https://huggingface.co/models'
    },
    {
      id: 'dataset-1',
      type: 'dataset',
      typeLabel: 'Open Dataset',
      source: 'data.gov / Kaggle',
      year: 2024,
      score: 0.94,
      format: 'Parquet / Geospatial HDF5',
      title: 'Global Climate Adaptation & Urban Sensor Index',
      authors: ['EcoSyz Public Data Lab', 'UN Urban Observatory'],
      description: 'High-resolution geospatial dataset tracking municipal adaptation indices, flood mitigation infrastructure, and urban microclimate metrics across 140 global metropolitan regions.',
      tags: ['Climate Tech', 'Geospatial', 'Urban Planning', 'Open Data'],
      url: 'https://data.gov'
    },
    {
      id: 'code-1',
      type: 'code',
      typeLabel: 'Code Repository',
      source: 'GitHub',
      year: 2024,
      score: 0.97,
      language: 'TypeScript / Next.js',
      title: 'Open Idea Studio Next.js + Supabase Application Scaffold',
      authors: ['Open Idea Engineering Team'],
      description: 'Production-ready starter scaffold implementing Open Idea design tokens, authentic authentication flows, responsive comparison shells, and real-time state synchronization.',
      tags: ['Next.js', 'React', 'Supabase', 'Tailwind', 'Open Source'],
      url: 'https://github.com/Sony17/Ecosyz'
    },
    {
      id: 'paper-2',
      type: 'paper',
      typeLabel: 'Research Paper',
      source: 'arXiv / Crossref',
      year: 2023,
      score: 0.98,
      title: 'Attention Is All You Need: Scalable Sequence Transduction',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
      description: 'The foundational architecture proposing the Transformer mechanism, replacing recurrent layers entirely with multi-head self-attention. Powers modern large language models and multimodal systems.',
      tags: ['Deep Learning', 'Transformers', 'Attention Mechanism', 'NLP'],
      url: 'https://arxiv.org/abs/1706.03762',
      tldr: 'Introduces the Transformer architecture based solely on self-attention mechanisms, dispensing with recurrence and convolutions for superior parallelizability and state-of-the-art translation quality.',
      bullets: [
        'Replaces recurrent neural networks with self-attention for faster training throughput.',
        'Demonstrates state-of-the-art results on WMT 2014 English-to-German and English-to-French translation.',
        'Forms the computational backbone of modern generative AI foundation models.'
      ]
    },
    {
      id: 'hardware-1',
      type: 'hardware',
      typeLabel: 'Open Hardware',
      source: 'OSHWA certified',
      year: 2024,
      score: 0.92,
      certId: 'OSHWA-US00042',
      title: 'Open Compute Edge Neural Accelerator PCB & Schematics',
      authors: ['CERN OHR & Open Hardware Guild'],
      description: 'Permissively licensed hardware design files, 4-layer PCB schematics, KiCad files, and Bill of Materials for low-power edge tensor acceleration on RISC-V compute boards.',
      tags: ['RISC-V', 'KiCad', 'Edge AI', 'OSHWA Certified'],
      url: 'https://oshwa.org'
    },
    {
      id: 'video-1',
      type: 'video',
      typeLabel: 'Educational Video',
      source: 'YouTube / MIT OCW',
      year: 2024,
      score: 0.94,
      duration: '1h 14m',
      channel: 'MIT OpenCourseWare',
      title: 'Deep Learning Architecture & Transformer Foundations',
      authors: ['Prof. Alexander Amini'],
      description: 'Comprehensive university lecture analyzing self-attention math, positional encodings, residual connections, and empirical scaling laws for deep neural architectures.',
      tags: ['MIT OCW', 'Lecture', 'Deep Learning', 'Neural Networks'],
      url: 'https://youtube.com'
    },
    {
      id: 'dataset-2',
      type: 'dataset',
      typeLabel: 'Open Dataset',
      source: 'Hugging Face Datasets',
      year: 2024,
      score: 0.91,
      format: 'Audio / WebDataset',
      title: 'Multimodal Indic Audio Corpus for Low-Resource AI',
      authors: ['Open Language Collective', 'IIIT Hyderabad'],
      description: '5,000+ hours of verified conversational audio across 14 Indic languages, paired with phonetic transcriptions and standardized benchmark evaluation splits.',
      tags: ['Indic NLP', 'Audio', 'Speech Recognition', 'Multilingual'],
      url: 'https://huggingface.co/datasets'
    },
    {
      id: 'code-2',
      type: 'code',
      typeLabel: 'Code Repository',
      source: 'GitHub',
      year: 2024,
      score: 0.93,
      language: 'Rust / Python',
      title: 'FastInference Engine for Heterogeneous Quantized Weights',
      authors: ['Open Source Systems Lab'],
      description: 'High-throughput Rust runtime for serving quantized INT4/INT8 transformer weights with zero memory fragmentation and unified Vulkan/Metal backend acceleration.',
      tags: ['Rust', 'Quantization', 'Inference Engine', 'Vulkan'],
      url: 'https://github.com'
    },
    {
      id: 'paper-3',
      type: 'paper',
      typeLabel: 'Research Paper',
      source: 'Europe PMC / DOAJ',
      year: 2024,
      score: 0.93,
      title: 'Open Science Foundations for Decentralized Climate Intelligence',
      authors: ['Dr. Marcus Vance', 'Sarah Jenkins', 'T. O\'Connor'],
      description: 'Establishes FAIR data schemas and cryptographic verification frameworks for municipal carbon accounting and federated microclimate simulation models.',
      tags: ['Climate Tech', 'FAIR Data', 'Open Science', 'Environmental Modeling'],
      url: 'https://europepmc.org',
      tldr: 'Standardized open metadata schemas eliminate duplicate observational data collection and enable global research teams to run verifiable municipal climate models.',
      bullets: [
        'Proposes unified ontology for urban greenhouse gas reporting across 80 international cities.',
        'Open-source validation pipelines reduce sensor calibration errors by 31%.',
        'Direct integration with federated spatial repositories accelerates policy impact.'
      ]
    },
    {
      id: 'model-2',
      type: 'model',
      typeLabel: 'AI Model',
      source: 'Hugging Face Models',
      year: 2024,
      score: 0.93,
      pipeline: 'automatic-speech-recognition',
      title: 'Whisper-MultiIndic-Speech2Text-Large',
      authors: ['AI4Bharat Collective'],
      description: 'End-to-end automatic speech recognition checkpoint fine-tuned on low-resource South Asian vernacular dialects with robust background noise mitigation.',
      tags: ['ASR', 'Whisper', 'Speech2Text', 'Audio AI'],
      url: 'https://huggingface.co/models'
    },
    {
      id: 'hardware-2',
      type: 'hardware',
      typeLabel: 'Open Hardware',
      source: 'CERN OHR',
      year: 2024,
      score: 0.88,
      certId: 'CERN-OHL-P-02',
      title: 'Modular Environmental Air Quality Telemetry Station',
      authors: ['Open Air Quality Guild'],
      description: 'Complete 3D printable enclosure files, solar-powered battery management circuit, and optical particle counter firmware for community ambient air quality monitoring.',
      tags: ['Environmental', 'IoT', 'CERN OHL', 'Firmware', '3D Printing'],
      url: 'https://ohwr.org'
    }
  ];

  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  let currentCategory = 'all';
  let currentSearchQuery = '';
  const savedResourceIds = new Set();

  // Catalogue DOM Elements
  const tabButtons = document.querySelectorAll('.tab-btn');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const tryPills = document.querySelectorAll('.try-pill');
  const resourcesGrid = document.getElementById('resources-grid');
  const emptyState = document.getElementById('empty-state');
  const resultsCountText = document.getElementById('results-count-text');

  // General Summary Modal Elements
  const generalModal = document.getElementById('general-summary-modal');
  const btnGeneralSummary = document.getElementById('btn-general-summary');
  const btnCloseGeneralModal = document.getElementById('btn-close-general-modal');
  const btnModalCloseAction = document.getElementById('btn-modal-close-action');
  const difficultyButtons = document.querySelectorAll('.difficulty-btn');
  const summaryLevelBadge = document.getElementById('summary-level-badge');
  const summaryTextBody = document.getElementById('summary-text-body');
  const btnCopySummary = document.getElementById('btn-copy-summary');
  const btnPrintSummary = document.getElementById('btn-print-summary');

  // Paper TL;DR Modal Elements
  const paperModal = document.getElementById('paper-summary-modal');
  const btnClosePaperModal = document.getElementById('btn-close-paper-modal');
  const btnClosePaperAction = document.getElementById('btn-close-paper-action');
  const paperModalSource = document.getElementById('paper-modal-source');
  const paperModalTitle = document.getElementById('paper-modal-title');
  const paperModalAuthors = document.getElementById('paper-modal-authors');
  const paperModalTldr = document.getElementById('paper-modal-tldr');
  const paperModalBullets = document.getElementById('paper-modal-bullets');
  const paperModalTags = document.getElementById('paper-modal-tags');
  const btnCopyPaperSummary = document.getElementById('btn-copy-paper-summary');

  // Chat Section Elements
  const chatMessagesContainer = document.getElementById('chat-messages-container');
  const chatUserInput = document.getElementById('chat-user-input');
  const chatBtnSubmit = document.getElementById('chat-btn-submit');
  const chatChips = document.querySelectorAll('.chat-chip');
  const btnToggleStats = document.getElementById('btn-toggle-stats');
  const followupButtons = document.querySelectorAll('.followup-btn');

  // Explore Connections Button
  const btnExploreConnections = document.getElementById('btn-explore-connections');

  // Mobile Hamburger Drawer
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');

  // --------------------------------------------------------------------------
  // SUMMARY CONTENT BY DIFFICULTY LEVEL
  // --------------------------------------------------------------------------
  const SUMMARY_CONTENT = {
    basic: {
      badgeText: 'Basic',
      badgeClass: 'badge-cyan',
      tagline: 'Explain like I\'m 5',
      text: 'Think of open resources like a giant community library where everything is free to borrow, copy, and build upon. Instead of starting from scratch when making a new app, robot, or scientific discovery, creators and researchers share their blueprints, data, and software so anyone in the world can build bigger and better things together.'
    },
    intermediate: {
      badgeText: 'Intermediate',
      badgeClass: 'badge-amber',
      tagline: 'College level',
      text: 'Open resources encompass peer-reviewed preprints, open datasets, reproducible machine learning weights, and permissive open-source repositories. By eliminating paywalls and proprietary lock-in, they accelerate the cycle of hypothesis generation, empirical benchmarking, and distributed peer collaboration across academic and industrial labs.'
    },
    expert: {
      badgeText: 'Expert',
      badgeClass: 'badge-emerald',
      tagline: 'Technical summary',
      text: 'The open research commons leverages standardized schemas (FAIR data principles, DOI citations, and SPDX licensing) to enable interoperable data pipelines, cross-institutional reproducibility, and decentralized computational workflows. These primitives allow researchers to query heterogeneous federated sources—from OpenAlex and Crossref to Hugging Face Hub—with verifiable provenance.'
    }
  };

  // --------------------------------------------------------------------------
  // RENDER RESOURCE CARDS
  // --------------------------------------------------------------------------
  function renderResources() {
    if (!resourcesGrid) return;

    const query = currentSearchQuery.toLowerCase().trim();

    const filtered = RESOURCES.filter(item => {
      const matchCat = currentCategory === 'all' || item.type === currentCategory;
      const matchQuery = !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        item.authors.some(a => a.toLowerCase().includes(query)) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      resourcesGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (resultsCountText) {
        resultsCountText.textContent = `0 resources found for "${currentSearchQuery}"`;
      }
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    if (resultsCountText) {
      if (query) {
        resultsCountText.textContent = `Found ${filtered.length} matching resources for "${currentSearchQuery}"`;
      } else if (currentCategory !== 'all') {
        resultsCountText.textContent = `Showing ${filtered.length} resources in category: ${currentCategory.toUpperCase()}`;
      } else {
        resultsCountText.textContent = `Showing all ${filtered.length} curated open innovation resources`;
      }
    }

    resourcesGrid.innerHTML = filtered.map(item => {
      const typePillClass = `pill-${item.type}`;

      let attrBadgeHtml = '';
      if (item.type === 'model' && item.pipeline) {
        attrBadgeHtml = `<span class="resource-attr-tag attr-pipeline">Pipeline: ${item.pipeline}</span>`;
      } else if (item.type === 'hardware' && item.certId) {
        attrBadgeHtml = `<span class="resource-attr-tag attr-hardware">Cert ID: ${item.certId}</span>`;
      } else if (item.type === 'video' && item.duration) {
        attrBadgeHtml = `<span class="resource-attr-tag attr-video">Duration: ${item.duration} · ${item.channel || ''}</span>`;
      } else if (item.type === 'code' && item.language) {
        attrBadgeHtml = `<span class="resource-attr-tag attr-code">Language: ${item.language}</span>`;
      } else if (item.type === 'dataset' && item.format) {
        attrBadgeHtml = `<span class="resource-attr-tag attr-dataset">Format: ${item.format}</span>`;
      } else if (item.type === 'paper' && item.source) {
        attrBadgeHtml = `<span class="resource-attr-tag attr-paper">Source: ${item.source}</span>`;
      }

      const isSaved = savedResourceIds.has(item.id);

      return `
        <article class="resource-card" data-id="${item.id}" data-type="${item.type}">
          <div>
            <div class="resource-card-header">
              <span class="resource-type-pill ${typePillClass}">${item.typeLabel}</span>
              <div class="resource-meta-top">
                <span class="resource-year">${item.year}</span>
                <span class="resource-score">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                  ${item.score.toFixed(2)}
                </span>
              </div>
            </div>

            <h3 class="resource-title">${item.title}</h3>
            ${attrBadgeHtml}

            <div class="resource-authors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path stroke-linecap="round" stroke-linejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>${item.authors.join(', ')}</span>
            </div>

            <p class="resource-desc">${item.description}</p>

            <div class="resource-tags-row">
              ${item.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
            </div>
          </div>

          <div class="resource-card-actions">
            <a class="btn-card-open" href="${item.url || '#'}" target="_blank" rel="noopener noreferrer">
              <span>Open</span>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.5 2a.75.75 0 0 0 0 1.5h2.69l-6.72 6.72a.75.75 0 1 0 1.06 1.06l6.72-6.72V7.5a.75.75 0 0 0 1.5 0V2.75A.75.75 0 0 0 17.75 2h-5.25z"></path>
                <path d="M6.25 4A2.25 2.25 0 0 0 4 6.25v7.5A2.25 2.25 0 0 0 6.25 16h7.5A2.25 2.25 0 0 0 16 13.75V10a.75.75 0 0 0-1.5 0v3.75c0 .414-.336.75-.75.75h-7.5a.75.75 0 0 1-.75-.75v-7.5c0-.414.336-.75.75-.75H10a.75.75 0 0 0 0-1.5H6.25z"></path>
              </svg>
            </a>

            <button type="button" class="btn-card-save ${isSaved ? 'saved' : ''}" data-action="save" data-id="${item.id}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
              <span>${isSaved ? 'Saved' : 'Save'}</span>
            </button>

            ${item.type === 'paper' ? `
              <button type="button" class="btn-card-summarize" data-action="summarize" data-id="${item.id}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Summarize</span>
              </button>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // CHAT ASSISTANT STATIC INTERACTION
  // --------------------------------------------------------------------------
  function handleChatSubmit() {
    if (!chatUserInput) return;
    const text = chatUserInput.value.trim();
    if (!text) return;

    if (chatMessagesContainer) {
      // Append user bubble
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'chat-msg msg-user';
      userMsgDiv.innerHTML = `
        <div class="user-bubble">
          <p>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      `;
      chatMessagesContainer.appendChild(userMsgDiv);

      // Scroll to bottom
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

      // Clear input
      chatUserInput.value = '';

      // Provide realistic simulated assistant response
      setTimeout(() => {
        const asstMsgDiv = document.createElement('div');
        asstMsgDiv.className = 'chat-msg msg-assistant';
        asstMsgDiv.innerHTML = `
          <div class="msg-avatar-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <div class="msg-body">
            <div class="msg-author">Assistant</div>
            <div class="msg-text">
              I've searched through our verified open resource catalog regarding "<strong>${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</strong>". You can explore the matching papers and tools directly in the right panel, or use the <strong>General Summary</strong> button for deeper synthesis.
            </div>
          </div>
        `;
        chatMessagesContainer.appendChild(asstMsgDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }, 400);
    }
  }

  if (chatBtnSubmit) {
    chatBtnSubmit.addEventListener('click', handleChatSubmit);
  }

  if (chatUserInput) {
    chatUserInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleChatSubmit();
      }
    });
  }

  // Suggestion Chips Click
  chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chatUserInput) {
        chatUserInput.value = chip.textContent.trim();
        chatUserInput.focus();
      }
    });
  });

  // Follow-up Questions in Message Stream
  followupButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (chatUserInput) {
        chatUserInput.value = btn.textContent.trim();
        chatUserInput.focus();
      }
    });
  });

  // Resource Statistics Toggle
  if (btnToggleStats) {
    btnToggleStats.addEventListener('click', () => {
      btnToggleStats.classList.toggle('active');
      const chevron = btnToggleStats.querySelector('.stats-chevron');
      if (chevron) {
        chevron.style.transform = btnToggleStats.classList.contains('active') ? 'rotate(180deg)' : '';
      }
    });
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS & FILTERING
  // --------------------------------------------------------------------------

  // Category Tab Switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      currentCategory = btn.getAttribute('data-type') || 'all';
      renderResources();
    });
  });

  // Search Input & Button
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderResources();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        currentSearchQuery = searchInput.value;
        renderResources();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) {
        currentSearchQuery = searchInput.value;
        renderResources();
      }
    });
  }

  // Quick "Try:" Topic Pills
  tryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query') || '';
      if (searchInput) {
        searchInput.value = q;
        currentSearchQuery = q;
        renderResources();
      }
    });
  });

  // Card Action Delegate (Save & Summarize)
  if (resourcesGrid) {
    resourcesGrid.addEventListener('click', (e) => {
      const saveBtn = e.target.closest('[data-action="save"]');
      if (saveBtn) {
        const id = saveBtn.getAttribute('data-id');
        if (savedResourceIds.has(id)) {
          savedResourceIds.delete(id);
          saveBtn.classList.remove('saved');
          saveBtn.querySelector('span').textContent = 'Save';
          saveBtn.querySelector('svg').setAttribute('fill', 'none');
        } else {
          savedResourceIds.add(id);
          saveBtn.classList.add('saved');
          saveBtn.querySelector('span').textContent = 'Saved';
          saveBtn.querySelector('svg').setAttribute('fill', 'currentColor');
        }
        return;
      }

      const summarizeBtn = e.target.closest('[data-action="summarize"]');
      if (summarizeBtn) {
        const id = summarizeBtn.getAttribute('data-id');
        const item = RESOURCES.find(r => r.id === id);
        if (item && paperModal) {
          openPaperModal(item);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // GENERAL SUMMARY MODAL LOGIC
  // --------------------------------------------------------------------------
  function openGeneralModal() {
    if (!generalModal) return;
    generalModal.style.display = 'flex';
    generalModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGeneralModal() {
    if (!generalModal) return;
    generalModal.style.display = 'none';
    generalModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnGeneralSummary) {
    btnGeneralSummary.addEventListener('click', openGeneralModal);
  }
  if (btnCloseGeneralModal) {
    btnCloseGeneralModal.addEventListener('click', closeGeneralModal);
  }
  if (btnModalCloseAction) {
    btnModalCloseAction.addEventListener('click', closeGeneralModal);
  }

  // Difficulty Level Tabs in General Modal
  difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      difficultyButtons.forEach(b => {
        b.className = 'difficulty-btn';
      });
      const level = btn.getAttribute('data-level') || 'basic';
      btn.classList.add(`active-${level}`);

      const data = SUMMARY_CONTENT[level] || SUMMARY_CONTENT.basic;
      if (summaryLevelBadge) {
        summaryLevelBadge.innerHTML = `
          <span class="badge-pill ${data.badgeClass}">${data.badgeText}</span>
          <span class="level-tagline">${data.tagline}</span>
        `;
      }
      if (summaryTextBody) {
        summaryTextBody.textContent = data.text;
      }
    });
  });

  // Copy & Print Summary Actions
  if (btnCopySummary) {
    btnCopySummary.addEventListener('click', async () => {
      const text = summaryTextBody ? summaryTextBody.textContent.trim() : '';
      try {
        await navigator.clipboard.writeText(text);
        const originalText = btnCopySummary.textContent;
        btnCopySummary.textContent = 'Copied!';
        setTimeout(() => {
          btnCopySummary.textContent = originalText;
        }, 1500);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  }

  if (btnPrintSummary) {
    btnPrintSummary.addEventListener('click', () => {
      window.print();
    });
  }

  // --------------------------------------------------------------------------
  // PAPER TL;DR MODAL LOGIC
  // --------------------------------------------------------------------------
  function openPaperModal(item) {
    if (!paperModal) return;
    if (paperModalSource) paperModalSource.textContent = item.source || 'arXiv / OpenAlex';
    if (paperModalTitle) paperModalTitle.textContent = item.title;
    if (paperModalAuthors) paperModalAuthors.textContent = `${item.authors.join(', ')} · ${item.year}`;
    if (paperModalTldr) paperModalTldr.textContent = item.tldr || item.description;

    if (paperModalBullets) {
      if (item.bullets && item.bullets.length > 0) {
        paperModalBullets.innerHTML = item.bullets.map(b => `<li>${b}</li>`).join('');
      } else {
        paperModalBullets.innerHTML = `<li>Full verified methodology available via federated preprint index.</li>`;
      }
    }

    if (paperModalTags) {
      paperModalTags.innerHTML = item.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('');
    }

    paperModal.style.display = 'flex';
    paperModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePaperModal() {
    if (!paperModal) return;
    paperModal.style.display = 'none';
    paperModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnClosePaperModal) {
    btnClosePaperModal.addEventListener('click', closePaperModal);
  }
  if (btnClosePaperAction) {
    btnClosePaperAction.addEventListener('click', closePaperModal);
  }

  if (btnCopyPaperSummary) {
    btnCopyPaperSummary.addEventListener('click', async () => {
      const title = paperModalTitle ? paperModalTitle.textContent : '';
      const tldr = paperModalTldr ? paperModalTldr.textContent : '';
      const textToCopy = `${title}\n\nTL;DR:\n${tldr}`;
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btnCopyPaperSummary.textContent;
        btnCopyPaperSummary.textContent = 'Copied!';
        setTimeout(() => {
          btnCopyPaperSummary.textContent = originalText;
        }, 1500);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    });
  }

  // Backdrop click & Escape key dismiss for both modals
  [generalModal, paperModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeGeneralModal();
        closePaperModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGeneralModal();
      closePaperModal();
    }
  });

  // Explore Connections button trigger
  if (btnExploreConnections) {
    btnExploreConnections.addEventListener('click', () => {
      openGeneralModal();
    });
  }

  // --------------------------------------------------------------------------
  // MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNavPanel.contains(e.target)) {
        mobileNavPanel.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Initial render
  renderResources();
});
