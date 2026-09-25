/**
 * OPEN IDEA TEMPLATES PAGE CONTROLLER
 * Handles real-time search, category filtering, blueprint live preview modal,
 * and responsive mobile drawer navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. DATA REPOSITORY FOR TEMPLATE PREVIEWS
  // ==========================================================================
  const TEMPLATES_DATABASE = {
    'saas-nexus': {
      category: 'SaaS & Web App',
      title: 'SaaS Nexus Multi-Tenant Engine',
      description: 'Production-ready multi-tenant SaaS architecture with organization workspaces, Supabase authentication, role-based access control, Stripe billing tiers, and live telemetry graphs.',
      tags: ['Next.js 15', 'Supabase Auth', 'Stripe Billing', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      creatorPrompt: 'Build a multi-tenant SaaS platform with subscription tiers, team workspaces, Supabase auth, and analytics dashboard.',
      previewWireframe: `
        <div style="display:flex; height:180px; gap:8px;">
          <div style="width:28%; background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.25); border-radius:6px; padding:10px; display:flex; flex-direction:column; gap:6px;">
            <div style="height:12px; width:65%; background:rgba(52,211,153,0.4); border-radius:3px;"></div>
            <div style="height:8px; width:80%; background:rgba(255,255,255,0.15); border-radius:2px; margin-top:6px;"></div>
            <div style="height:8px; width:70%; background:rgba(255,255,255,0.1); border-radius:2px;"></div>
            <div style="height:8px; width:90%; background:rgba(255,255,255,0.1); border-radius:2px;"></div>
          </div>
          <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
            <div style="height:28px; background:rgba(255,255,255,0.04); border-radius:4px; display:flex; align-items:center; padding:0 10px; justify-content:space-between;">
              <span style="font-size:11px; color:#34d399; font-weight:600;">Workspace: Acme Enterprise</span>
              <span style="font-size:10px; color:#9ca3af; background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:3px;">Active Pro Plan</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; flex:1;">
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:8px;">
                <div style="font-size:9px; color:#9ca3af;">Monthly MRR</div>
                <div style="font-size:14px; font-weight:700; color:#34d399; margin-top:2px;">$24,850</div>
              </div>
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:8px;">
                <div style="font-size:9px; color:#9ca3af;">Active Tenants</div>
                <div style="font-size:14px; font-weight:700; color:#22d3ee; margin-top:2px;">1,420</div>
              </div>
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:4px; padding:8px;">
                <div style="font-size:9px; color:#9ca3af;">API Health</div>
                <div style="font-size:14px; font-weight:700; color:#a78bfa; margin-top:2px;">99.98%</div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    'devfolio': {
      category: 'Developer Tool',
      title: 'DevFolio Technical Portfolio',
      description: 'High-contrast, minimalist portfolio engineered for software engineers, systems researchers, and creators. Features dynamic GitHub activity integration, MDX tech writing, and interactive project demos.',
      tags: ['React 19', 'Vite', 'MDX Engine', 'Lucide Icons', 'Tailwind', 'GitHub API'],
      creatorPrompt: 'Build a modern developer portfolio with project showcases, GitHub commit tracker, terminal command drawer, and MDX blog.',
      previewWireframe: `
        <div style="height:180px; display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="width:24px; height:24px; border-radius:50%; background:#22d3ee;"></div>
              <span style="font-size:12px; font-weight:700; color:#ffffff;">alex.dev · Staff Engineer</span>
            </div>
            <span style="font-size:10px; color:#22d3ee; border:1px solid rgba(34,211,238,0.3); padding:2px 8px; border-radius:9999px;">Terminal Ready</span>
          </div>
          <div style="flex:1; background:#050a0d; border-radius:6px; padding:10px; font-family:monospace; font-size:11px; color:#34d399; overflow:hidden;">
            <div>$ alex-cli --status</div>
            <div style="color:#9ca3af; margin-top:4px;">&gt; 1,842 contributions this year across 14 repos</div>
            <div style="color:#9ca3af;">&gt; Current focus: Distributed State &amp; WebGPU rendering</div>
            <div style="color:#22d3ee; margin-top:6px;">$ _</div>
          </div>
        </div>
      `
    },
    'research-commons': {
      category: 'Research & Knowledge',
      title: 'ResearchCommons Literature Index',
      description: 'Academic discovery and dataset repository with keyword filtering, DOI citation relations, dataset previews, and bibtex exports. Built for laboratory groups, universities, and open fellows.',
      tags: ['Open Data', 'Knowledge Graphs', 'D3.js', 'BibTeX Parser', 'CSV Inspector'],
      creatorPrompt: 'Create an open research knowledge repository with paper search, dataset downloads, citation graphs, and author profiles.',
      previewWireframe: `
        <div style="height:180px; display:flex; flex-direction:column; gap:8px;">
          <div style="background:rgba(255,255,255,0.04); border-radius:6px; padding:8px 12px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; color:#c084fc;">Query: "transformer attention memory optimization"</span>
            <span style="font-size:10px; color:#9ca3af;">42 results</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; flex:1; overflow:hidden;">
            <div style="background:rgba(255,255,255,0.02); border-left:3px solid #c084fc; border-radius:0 4px 4px 0; padding:8px;">
              <div style="font-size:11px; font-weight:600; color:#ffffff;">Sparse Linear Attention in Long-Horizon LLMs</div>
              <div style="font-size:9px; color:#9ca3af; margin-top:2px;">Published 2026 · 128 Citations · BibTeX Ready</div>
            </div>
            <div style="background:rgba(255,255,255,0.02); border-left:3px solid rgba(192,132,252,0.4); border-radius:0 4px 4px 0; padding:8px;">
              <div style="font-size:11px; font-weight:600; color:#ffffff;">OpenWeights Benchmark on Distributed Shards</div>
              <div style="font-size:9px; color:#9ca3af; margin-top:2px;">Dataset: 45.2 GB Parquet · DOI: 10.1145/382910</div>
            </div>
          </div>
        </div>
      `
    },
    'omnistore': {
      category: 'E-Commerce',
      title: 'OmniStore Headless Storefront',
      description: 'Ultra-fast headless commerce template with instant faceted search, optimistic slide-out cart drawer, variant color pickers, and optimized checkout flow.',
      tags: ['React', 'Headless Storefront', 'Stripe Checkout', 'Razorpay', 'Tailwind'],
      creatorPrompt: 'Build a modern responsive e-commerce storefront with product cards, category filters, cart drawer, and checkout.',
      previewWireframe: `
        <div style="height:180px; display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.08);">
            <span style="font-size:12px; font-weight:700; color:#ffffff;">OmniStore // Summer Collection</span>
            <span style="font-size:11px; color:#fb923c; font-weight:600;">🛒 Cart: 2 items ($184)</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; flex:1;">
            <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:8px; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="height:50px; background:rgba(251,146,60,0.15); border-radius:4px;"></div>
              <div><div style="font-size:10px; font-weight:600; color:#ffffff;">Aero Pro Jacket</div><div style="font-size:10px; color:#fb923c;">$120</div></div>
            </div>
            <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:8px; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="height:50px; background:rgba(52,211,153,0.15); border-radius:4px;"></div>
              <div><div style="font-size:10px; font-weight:600; color:#ffffff;">Run Mesh Shoe</div><div style="font-size:10px; color:#34d399;">$64</div></div>
            </div>
            <div style="background:rgba(255,255,255,0.03); border-radius:6px; padding:8px; display:flex; flex-direction:column; justify-content:space-between;">
              <div style="height:50px; background:rgba(34,211,238,0.15); border-radius:4px;"></div>
              <div><div style="font-size:10px; font-weight:600; color:#ffffff;">Knit Beanie</div><div style="font-size:10px; color:#22d3ee;">$28</div></div>
            </div>
          </div>
        </div>
      `
    },
    'studio-genesis': {
      category: 'AI Application',
      title: 'Studio Genesis AI Creation App',
      description: 'Turnkey generative interface with dynamic prompt textarea, quick action pill injection, multi-file upload pipeline, Web Speech voice input, and live interactive canvas preview.',
      tags: ['React 19', 'FastAPI', 'Web Speech API', 'SSE Stream', 'Code Sandbox'],
      creatorPrompt: 'Scaffold an AI studio creation workspace with prompt box, quick action chips, file attachments, and code generator.',
      previewWireframe: `
        <div style="height:180px; display:flex; flex-direction:column; gap:8px;">
          <div style="flex:1; background:rgba(255,255,255,0.02); border-radius:6px; padding:10px; display:flex; flex-direction:column; gap:8px;">
            <div style="align-self:flex-end; background:rgba(52,211,153,0.15); border:1px solid rgba(52,211,153,0.3); color:#34d399; font-size:11px; padding:6px 10px; border-radius:8px; max-width:80%;">
              Synthesize a multi-tier pricing calculator with annual discount toggle.
            </div>
            <div style="align-self:flex-start; background:rgba(255,255,255,0.06); font-size:11px; color:#f3f4f6; padding:6px 10px; border-radius:8px; max-width:85%;">
              Generating live responsive prototype with interactive billing toggle...
            </div>
          </div>
          <div style="height:32px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:6px; display:flex; align-items:center; padding:0 8px; justify-content:space-between;">
            <span style="font-size:10px; color:#9ca3af;">Type instruction or attach components...</span>
            <span style="font-size:10px; background:#34d399; color:#0c2321; font-weight:700; padding:2px 8px; border-radius:4px;">Run</span>
          </div>
        </div>
      `
    },
    'apex-agency': {
      category: 'Website & Landing',
      title: 'Apex Digital Product Studio',
      description: 'Striking, editorial agency showcase for technology consultancies and design firms. Includes kinetic typography, case study cards with metric badges, client logo marquee, and booking intake form.',
      tags: ['HTML5 / CSS3', 'Vanilla JS', 'Marquee', 'Dark/Light Atmosphere', 'Case Studies'],
      creatorPrompt: 'Build a modern digital product studio agency landing page with hero headline, client logos, services grid, case studies, and contact intake.',
      previewWireframe: `
        <div style="height:180px; display:flex; flex-direction:column; justify-content:space-between; padding:4px 0;">
          <div>
            <span style="font-size:9px; color:#60a5fa; text-transform:uppercase; letter-spacing:0.1em; font-weight:700;">Global Product Studio</span>
            <div style="font-size:16px; font-weight:800; color:#ffffff; line-height:1.2; margin-top:4px;">
              Engineering tomorrow's <span style="background:linear-gradient(to right, #60a5fa, #34d399); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">digital flagships</span>.
            </div>
          </div>
          <div style="display:flex; gap:8px; margin-top:8px;">
            <div style="flex:1; background:rgba(255,255,255,0.04); border-radius:4px; padding:6px 8px;">
              <div style="font-size:12px; font-weight:700; color:#34d399;">$450M+</div>
              <div style="font-size:9px; color:#9ca3af;">Client Valuation</div>
            </div>
            <div style="flex:1; background:rgba(255,255,255,0.04); border-radius:4px; padding:6px 8px;">
              <div style="font-size:12px; font-weight:700; color:#60a5fa;">28 Awards</div>
              <div style="font-size:9px; color:#9ca3af;">Design &amp; Tech</div>
            </div>
            <div style="flex:1; background:rgba(255,255,255,0.04); border-radius:4px; padding:6px 8px;">
              <div style="font-size:12px; font-weight:700; color:#c084fc;">99.8%</div>
              <div style="font-size:9px; color:#9ca3af;">Retention</div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03); border-radius:4px; padding:4px 8px; font-size:10px; color:#9ca3af; display:flex; justify-content:space-around;">
            <span>Acme Corp</span> · <span>Vanguard AI</span> · <span>Helios Labs</span> · <span>Novus Cloud</span>
          </div>
        </div>
      `
    }
  };

  // ==========================================================================
  // 2. DOM ELEMENT REFERENCES
  // ==========================================================================
  const searchInput = document.getElementById('template-search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const filterPills = document.querySelectorAll('.filter-pill');
  const templateCards = document.querySelectorAll('.template-card');
  const templatesGrid = document.getElementById('templates-grid');
  const emptyState = document.getElementById('templates-empty-state');
  const btnResetFilters = document.getElementById('btn-reset-filters');
  const countText = document.getElementById('templates-count-text');

  // Preview Modal Elements
  const modal = document.getElementById('template-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-btn-dismiss');
  const modalCategory = document.getElementById('modal-template-category');
  const modalTitle = document.getElementById('modal-template-title');
  const modalDesc = document.getElementById('modal-template-desc');
  const modalTechStack = document.getElementById('modal-tech-stack');
  const modalScreen = document.getElementById('modal-screen-content');
  const modalCreatorBtn = document.getElementById('modal-btn-open-creator');

  // Mobile Navigation Drawer Elements
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  // State
  let currentCategory = 'all';
  let currentSearchQuery = '';

  // ==========================================================================
  // 3. FILTER & SEARCH CORE ENGINE
  // ==========================================================================
  function applyFilters() {
    let visibleCount = 0;
    const q = currentSearchQuery.trim().toLowerCase();

    templateCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const textContent = card.textContent.toLowerCase();

      const matchesCategory = (currentCategory === 'all') || (category === currentCategory);
      const matchesSearch = !q || title.includes(q) || keywords.includes(q) || textContent.includes(q);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update count display
    if (countText) {
      if (currentCategory === 'all' && !q) {
        countText.textContent = `Showing all ${visibleCount} verified production blueprints`;
      } else {
        countText.textContent = `Showing ${visibleCount} of ${templateCards.length} blueprints`;
      }
    }

    // Toggle Empty State
    if (visibleCount === 0) {
      if (templatesGrid) templatesGrid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
    } else {
      if (templatesGrid) templatesGrid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
    }
  }

  // Category Pill Clicks
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  // Search Input Real-time Filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (btnClearSearch) {
        btnClearSearch.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
      }
      applyFilters();
    });
  }

  // Clear Search Button
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearchQuery = '';
        searchInput.focus();
      }
      btnClearSearch.style.display = 'none';
      applyFilters();
    });
  }

  // Reset Filters Button in Empty State
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      if (searchInput) searchInput.value = '';
      if (btnClearSearch) btnClearSearch.style.display = 'none';

      filterPills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-category') === 'all');
      });

      applyFilters();
    });
  }

  // ==========================================================================
  // 4. LIVE PREVIEW MODAL CONTROLS
  // ==========================================================================
  function openPreviewModal(templateId) {
    const data = TEMPLATES_DATABASE[templateId];
    if (!data || !modal) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;

    if (modalTechStack) {
      modalTechStack.innerHTML = data.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
    }

    if (modalScreen) {
      modalScreen.innerHTML = data.previewWireframe;
    }

    if (modalCreatorBtn) {
      modalCreatorBtn.href = `../creator/site.html?prompt=${encodeURIComponent(data.creatorPrompt)}`;
    }

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closePreviewModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach preview listeners
  document.querySelectorAll('[data-action="preview"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if (id) openPreviewModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePreviewModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closePreviewModal);

  // Close when clicking modal backdrop
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePreviewModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closePreviewModal();
    }
  });

  // ==========================================================================
  // 5. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.classList.toggle('open');
    });

    // Close drawer when clicking a link inside
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Initial Filter Execution
  applyFilters();
});
