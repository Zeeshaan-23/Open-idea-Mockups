import React, { useState, useMemo } from 'react';
import {
  Globe,
  Search,
  ArrowRight,
  Check,
  Shield,
  Clock,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  X,
  SlidersHorizontal,
  Code2,
  Smartphone,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  PhoneCall,
  DollarSign
} from 'lucide-react';
import {
  WEBSITE_SECTORS,
  INDUSTRY_DEMOS,
  WEBSITES_FAQ,
  SERVICE_BENEFITS
} from '../data/mockWebsitesData';
import '../styles/websites.css';

export default function WebsitesPage({ onNavigate, initialCategory = null }) {
  // Filtering & Search
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Interactivity
  const [activeDemo, setActiveDemo] = useState(null);
  const [demoViewTab, setDemoViewTab] = useState('preview'); // 'preview' | 'features' | 'tech'
  const [demoDeviceMode, setDemoDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'

  // 4-Step Intake Brief Wizard
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [intakeStep, setIntakeStep] = useState(1);
  const [intakeData, setIntakeData] = useState({
    kind: 'business', // 'hobby' | 'business' | 'mvp'
    name: '',
    phone: '',
    city: '',
    industry: 'Restaurant & Cafe',
    hasDomain: 'need-domain', // 'have-domain' | 'need-domain'
    notes: ''
  });
  const [intakeSuccess, setIntakeSuccess] = useState(false);

  // Quick Scoping Card state in Hero
  const [quickIndustry, setQuickIndustry] = useState('Restaurant & Cafe');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickKind, setQuickKind] = useState('business');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filtered Demos
  const filteredDemos = useMemo(() => {
    return INDUSTRY_DEMOS.filter((demo) => {
      const matchesSector = selectedSector === 'all' || demo.sector === selectedSector;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        demo.name.toLowerCase().includes(q) ||
        demo.tagline.toLowerCase().includes(q) ||
        demo.description.toLowerCase().includes(q) ||
        demo.features.some((f) => f.toLowerCase().includes(q));
      return matchesSector && matchesSearch;
    });
  }, [selectedSector, searchQuery]);

  // Handle Quick Scoping Submit
  const handleQuickScopeSubmit = (e) => {
    e.preventDefault();
    setIntakeData((prev) => ({
      ...prev,
      phone: quickPhone || prev.phone,
      industry: quickIndustry || prev.industry,
      kind: quickKind || prev.kind
    }));
    setIntakeStep(2);
    setShowIntakeModal(true);
  };

  // Launch Intake from a Demo Card
  const handleBuildForDemo = (demo) => {
    setIntakeData((prev) => ({
      ...prev,
      industry: demo.name,
      kind: 'business'
    }));
    setIntakeStep(1);
    setShowIntakeModal(true);
  };

  // Open Live Demo Inspector
  const handleOpenDemoInspector = (demo) => {
    setActiveDemo(demo);
    setDemoViewTab('preview');
    setDemoDeviceMode('desktop');
  };

  // Complete Intake Wizard
  const handleCompleteIntake = (e) => {
    e.preventDefault();
    setIntakeSuccess(true);
  };

  // Reset Intake
  const handleCloseIntake = () => {
    setShowIntakeModal(false);
    setIntakeSuccess(false);
    setIntakeStep(1);
  };

  // Bridge to Studio
  const handleJumpToStudio = (tradeName = '') => {
    const desc = tradeName
      ? `High-performance mobile-first website for a ${tradeName} with WhatsApp booking, Google Maps directions, and pricing catalog.`
      : 'Bespoke business web application with modular sections, contact forms, and clean React architecture.';
    if (onNavigate) {
      onNavigate(`/studio?description=${encodeURIComponent(desc)}`);
    }
  };

  return (
    <div className="websites-page-root" role="main" aria-label="Websites & Bespoke Engineering">
      
      {/* --------------------------------------------------------------------
          1. HERO SECTION (Editorial Split)
          -------------------------------------------------------------------- */}
      <section className="wb-hero-section">
        <div className="wb-container">
          <div className="wb-hero-grid">
            
            {/* Left Column: Proposition & Authority */}
            <div>
              <div className="wb-hero-eyebrow">
                <span className="wb-live-pulse" aria-hidden="true" />
                <span>Bespoke Web Engineering · Live in ~5 Days</span>
              </div>

              <h1 className="wb-hero-title">
                A website that gets you <em>calls, not compliments</em>.
              </h1>

              <p className="wb-hero-subtitle">
                We engineer production-ready websites for Indian businesses, clinics, shops, and startups. Your prices, your real photos, one-tap WhatsApp inquiries, Google Maps directions, and 100% source-code ownership.
              </p>

              <ul className="wb-hero-key-points">
                <li className="wb-hero-point-item">
                  <span className="wb-point-check"><Check size={12} /></span>
                  <span><strong>Questions tailored for your trade:</strong> 50 custom archetypes from restaurants to diagnostic labs.</span>
                </li>
                <li className="wb-hero-point-item">
                  <span className="wb-point-check"><Check size={12} /></span>
                  <span><strong>Wired for immediate customer leads:</strong> One-tap WhatsApp, click-to-call, and verified Google Maps pins.</span>
                </li>
                <li className="wb-hero-point-item">
                  <span className="wb-point-check"><Check size={12} /></span>
                  <span><strong>₹500 refundable booking:</strong> Holds your build slot for 7 days, 100% money-back if first draft is declined.</span>
                </li>
              </ul>

              <div className="wb-hero-actions">
                <button
                  type="button"
                  className="wb-btn-primary"
                  onClick={() => {
                    setIntakeStep(1);
                    setShowIntakeModal(true);
                  }}
                >
                  <span>Start Your Website Brief</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>

                <a
                  href="#catalog"
                  className="wb-btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore 50 Live Demos</span>
                  <ChevronDown size={15} aria-hidden="true" />
                </a>

                <a
                  href="https://wa.me/918130296940?text=Hi%20Open%20Idea%2C%20I%20have%20a%20question%20about%20getting%20my%20business%20website%20built."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-secondary"
                  style={{ color: '#16a34a' }}
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="wb-hero-chips-row">
                <span className="wb-hero-chip">DPIIT-recognised Indian Startup</span>
                <span className="wb-hero-chip">AIC-GBU Incubated</span>
                <span className="wb-hero-chip">Mobile-First React Architecture</span>
                <span className="wb-hero-chip">Zero Vendor Lock-in</span>
              </div>
            </div>

            {/* Right Column: Quick Scoping & Turnaround Card */}
            <div>
              <div className="wb-hero-scope-card">
                <h2 className="wb-scope-title">Start with 30 Seconds</h2>
                <p className="wb-scope-desc">
                  Select your trade to see estimated turnaround and launch scope. No payment taken at this step.
                </p>

                <form onSubmit={handleQuickScopeSubmit} className="wb-scope-form">
                  <div className="wb-field-group">
                    <label className="wb-field-label" htmlFor="quick-trade-select">
                      What is your business or project?
                    </label>
                    <select
                      id="quick-trade-select"
                      className="wb-select"
                      value={quickIndustry}
                      onChange={(e) => setQuickIndustry(e.target.value)}
                    >
                      {INDUSTRY_DEMOS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.icon} {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="wb-grid-2col">
                    <div className="wb-field-group">
                      <label className="wb-field-label" htmlFor="quick-kind-select">
                        Project Scope
                      </label>
                      <select
                        id="quick-kind-select"
                        className="wb-select"
                        value={quickKind}
                        onChange={(e) => setQuickKind(e.target.value)}
                      >
                        <option value="business">Business Site (~5 Days)</option>
                        <option value="hobby">Hobby / Portfolio (3–5 Days)</option>
                        <option value="mvp">Full Web App / MVP (7–14 Days)</option>
                      </select>
                    </div>

                    <div className="wb-field-group">
                      <label className="wb-field-label" htmlFor="quick-phone-input">
                        WhatsApp Number
                      </label>
                      <input
                        id="quick-phone-input"
                        type="tel"
                        className="wb-input"
                        placeholder="98XXXXXXXX"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-canvas)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Target Delivery:</span>
                      <strong style={{ color: 'var(--brand-blue)' }}>Within 5 Business Days</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78125rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Booking Holding Fee:</span>
                      <strong style={{ color: '#16a34a' }}>₹500 (100% Refundable)</strong>
                    </div>
                  </div>

                  <button type="submit" className="wb-scope-submit-btn">
                    <span>Continue to Project Brief</span>
                    <ArrowRight size={15} />
                  </button>

                  <p className="wb-scope-disclaimer">
                    Zero payment right now. We review your brief and contact you via WhatsApp within 24 hours.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          2. TRUST PILLARS STRIP
          -------------------------------------------------------------------- */}
      <section className="wb-trust-strip" aria-label="Official Credentials">
        <div className="wb-container">
          <div className="wb-trust-grid">
            <div className="wb-trust-item">
              <div className="wb-trust-icon-box">
                <Shield size={18} />
              </div>
              <div>
                <div className="wb-trust-text-primary">DPIIT-Recognised Startup</div>
                <div className="wb-trust-text-secondary">Official Govt. of India Registry</div>
              </div>
            </div>

            <div className="wb-trust-item">
              <div className="wb-trust-icon-box">
                <Layers size={18} />
              </div>
              <div>
                <div className="wb-trust-text-primary">AIC-GBU Incubated</div>
                <div className="wb-trust-text-secondary">Gautam Buddha University</div>
              </div>
            </div>

            <div className="wb-trust-item">
              <div className="wb-trust-icon-box">
                <DollarSign size={18} />
              </div>
              <div>
                <div className="wb-trust-text-primary">₹500 100% Refundable</div>
                <div className="wb-trust-text-secondary">Returned if draft not approved</div>
              </div>
            </div>

            <div className="wb-trust-item">
              <div className="wb-trust-icon-box">
                <MessageCircle size={18} />
              </div>
              <div>
                <div className="wb-trust-text-primary">WhatsApp Lead Routing</div>
                <div className="wb-trust-text-secondary">Instant inquiries on your phone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          3. LIVE DEMO CATALOG (50 INDUSTRIES)
          -------------------------------------------------------------------- */}
      <section id="catalog" className="wb-catalog-section">
        <div className="wb-container">
          
          <div className="wb-section-header">
            <div className="wb-section-kicker">
              <Globe size={13} aria-hidden="true" />
              <span>Real Trade Archetypes</span>
            </div>
            <h2 className="wb-section-title">
              50 live website demos you can inspect right now.
            </h2>
            <p className="wb-section-subtitle">
              Working interactive prototypes, not static mockup images. Each is tailored around the exact questions and conversion triggers that industry's customers look for.
            </p>
          </div>

          {/* Search & Sector Toolbar */}
          <div className="wb-filter-toolbar">
            <div className="wb-search-bar">
              <Search className="wb-search-icon" size={18} aria-hidden="true" />
              <input
                type="text"
                className="wb-search-input"
                placeholder="Search trades & capabilities — Restaurant, Clinic, Gym, Coaching, Bakery, Salon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search demo categories"
              />
            </div>

            <div className="wb-sector-pills" role="tablist" aria-label="Industry Sectors">
              {WEBSITE_SECTORS.map((sector) => (
                <button
                  key={sector.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedSector === sector.id}
                  className={`wb-sector-btn ${selectedSector === sector.id ? 'active' : ''}`}
                  onClick={() => setSelectedSector(sector.id)}
                >
                  {sector.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Counter */}
          <div className="wb-results-summary">
            <span>Showing <strong>{filteredDemos.length}</strong> of <strong>50</strong> live industry demos</span>
            {searchQuery && (
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--brand-blue)', fontSize: '0.8125rem', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSector('all');
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Demos Grid */}
          <div className="wb-demo-grid">
            {filteredDemos.map((demo) => (
              <article key={demo.id} className="wb-demo-card">
                <div
                  className="wb-demo-topbar"
                  style={{
                    background: `linear-gradient(90deg, ${demo.colors.primary}, ${demo.colors.secondary})`
                  }}
                  aria-hidden="true"
                />

                <div className="wb-demo-card-body">
                  <div className="wb-demo-card-head">
                    <div className="wb-demo-icon-title">
                      <div className="wb-demo-icon-wrap" aria-hidden="true">
                        {demo.icon}
                      </div>
                      <div>
                        <h3 className="wb-demo-name">{demo.name}</h3>
                        <span className="wb-demo-sector-tag">
                          {WEBSITE_SECTORS.find((s) => s.id === demo.sector)?.label || 'Bespoke'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="wb-demo-tagline">{demo.tagline}</div>
                  <p className="wb-demo-description">{demo.description}</p>

                  {/* Curated Color Swatches */}
                  <div className="wb-demo-palette" title="Curated industry color accents">
                    <span className="wb-palette-label">Palette:</span>
                    <span className="wb-color-swatch" style={{ background: demo.colors.primary }} />
                    <span className="wb-color-swatch" style={{ background: demo.colors.secondary }} />
                    <span className="wb-color-swatch" style={{ background: demo.colors.accent }} />
                  </div>

                  {/* Key Features Checklist */}
                  <div className="wb-demo-features">
                    {demo.features.slice(0, 3).map((f) => (
                      <span key={f} className="wb-feature-pill">
                        ✓ {f}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions */}
                  <div className="wb-demo-card-actions">
                    <button
                      type="button"
                      className="wb-card-btn-preview"
                      onClick={() => handleOpenDemoInspector(demo)}
                      title={`Inspect ${demo.name} live prototype`}
                    >
                      <Smartphone size={14} />
                      <span>Inspect Demo</span>
                    </button>

                    <button
                      type="button"
                      className="wb-card-btn-build"
                      onClick={() => handleBuildForDemo(demo)}
                      title={`Build a site for ${demo.name}`}
                    >
                      <span>Build This</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------------------
          4. CORE CAPABILITIES ("What You Get")
          -------------------------------------------------------------------- */}
      <section className="wb-steps-section" style={{ background: 'var(--bg-canvas)' }}>
        <div className="wb-container">
          <div className="wb-section-header">
            <div className="wb-section-kicker">
              <Layers size={13} aria-hidden="true" />
              <span>Engineering Standard</span>
            </div>
            <h2 className="wb-section-title">
              The pages and features a customer actually opens.
            </h2>
            <p className="wb-section-subtitle">
              Not a stock theme with your logo pasted on it. We design around what you sell, what your customers call to ask, and how they navigate to your physical location.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            {SERVICE_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(47, 143, 239, 0.08)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          5. STUDIO VS. BESPOKE BRIDGE
          -------------------------------------------------------------------- */}
      <section className="wb-bridge-section">
        <div className="wb-container">
          <div className="wb-bridge-card">
            <div>
              <div className="wb-bridge-kicker">Developer Independence</div>
              <h3 className="wb-bridge-title">Prefer to build and scaffold the code yourself?</h3>
              <p className="wb-bridge-desc">
                If you are a developer or technical founder, jump into <strong>AI Studio</strong>. You can prompt-engineer applications, inspect generated React source code, review AST telemetry, and download clean zip archives with zero platform lock-in.
              </p>
            </div>

            <div className="wb-bridge-actions">
              <button
                type="button"
                className="wb-btn-primary"
                onClick={() => handleJumpToStudio()}
              >
                <Code2 size={16} />
                <span>Open AI Studio Workbench</span>
              </button>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Free, open source code generation & AST telemetry
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          6. HOW IT WORKS (4 STEPS)
          -------------------------------------------------------------------- */}
      <section className="wb-steps-section">
        <div className="wb-container">
          <div className="wb-section-header">
            <div className="wb-section-kicker">
              <Clock size={13} aria-hidden="true" />
              <span>Turnkey Execution</span>
            </div>
            <h2 className="wb-section-title">
              Four steps, and you are only on step one.
            </h2>
            <p className="wb-section-subtitle">
              You are never asked for money before you know what you are getting. Stop or modify anytime.
            </p>
          </div>

          <div className="wb-steps-grid">
            <div className="wb-step-card">
              <div className="wb-step-number">1</div>
              <h3 className="wb-step-heading">Leave Your Number</h3>
              <p className="wb-step-body">
                Name, WhatsApp contact, city, and your business category. That is the whole intake form to get started.
              </p>
              <span className="wb-step-duration">30 Seconds</span>
            </div>

            <div className="wb-step-card">
              <div className="wb-step-number">2</div>
              <h3 className="wb-step-heading">Answer the Trade Brief</h3>
              <p className="wb-step-body">
                A brief set of targeted questions for your trade: items you sell, service timings, and landmark location.
              </p>
              <span className="wb-step-duration">About 2 Minutes</span>
            </div>

            <div className="wb-step-card">
              <div className="wb-step-number">3</div>
              <h3 className="wb-step-heading">Book Your Build Slot</h3>
              <p className="wb-step-body">
                ₹500 refundable holding deposit. Holds your slot for 7 days and is credited into your final invoice.
              </p>
              <span className="wb-step-duration">Held for 7 Days</span>
            </div>

            <div className="wb-step-card">
              <div className="wb-step-number">4</div>
              <h3 className="wb-step-heading">Review Your First Draft</h3>
              <p className="wb-step-body">
                We deliver a live preview link on WhatsApp. You test it on your phone, suggest changes, and we refine it.
              </p>
              <span className="wb-step-duration">Within 5 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          7. FEE EXPLAINER (₹500 REFUNDABLE)
          -------------------------------------------------------------------- */}
      <section className="wb-fee-section">
        <div className="wb-container">
          <div className="wb-fee-card">
            <div className="wb-fee-badge-box">
              <p className="wb-fee-amount">₹500</p>
              <p className="wb-fee-slot-label">to book your build slot</p>
              <span className="wb-fee-pill">100% Fully Refundable</span>
            </div>

            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 400, color: 'var(--text-primary)', margin: '0 0 1.25rem 0' }}>
                Why we ask for ₹500 — and how you get it back.
              </h2>

              <ul className="wb-fee-list">
                <li className="wb-fee-item">
                  <span className="wb-fee-check-ico"><Check size={13} /></span>
                  <span><strong>It is not the project price:</strong> It holds a dedicated build slot with engineering leads. Final quote is given once we read your exact scope.</span>
                </li>
                <li className="wb-fee-item">
                  <span className="wb-fee-check-ico"><Check size={13} /></span>
                  <span><strong>Your slot is held for 7 days:</strong> You are never rushed into sending photos or menu items immediately.</span>
                </li>
                <li className="wb-fee-item">
                  <span className="wb-fee-check-ico"><Check size={13} /></span>
                  <span><strong>100% money-back guarantee:</strong> Message us on WhatsApp within 7 days of receiving your first draft link, and the full ₹500 is refunded to your account in 5–7 days.</span>
                </li>
                <li className="wb-fee-item">
                  <span className="wb-fee-check-ico"><Check size={13} /></span>
                  <span><strong>Adjusted into final price:</strong> When you approve the draft, the ₹500 is credited in full towards your final project invoice.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          8. FAQ ACCORDION
          -------------------------------------------------------------------- */}
      <section className="wb-faq-section">
        <div className="wb-container">
          <div className="wb-section-header">
            <div className="wb-section-kicker">
              <MessageCircle size={13} aria-hidden="true" />
              <span>Clarity & Answers</span>
            </div>
            <h2 className="wb-section-title">
              Common questions before you send your brief.
            </h2>
            <p className="wb-section-subtitle">
              Transparent terms, real timelines, and direct engineering commitments.
            </p>
          </div>

          <div className="wb-faq-list">
            {WEBSITES_FAQ.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="wb-faq-item">
                  <button
                    type="button"
                    className="wb-faq-trigger"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span className="wb-faq-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="wb-faq-content">
                      <p style={{ margin: 0 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          9. INTERACTIVE LIVE DEMO INSPECTOR MODAL
          -------------------------------------------------------------------- */}
      {activeDemo && (
        <div className="wb-modal-backdrop" onClick={() => setActiveDemo(null)} role="dialog" aria-modal="true">
          <div className="wb-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="wb-modal-header">
              <div className="wb-modal-title-group">
                <span style={{ fontSize: '1.5rem' }}>{activeDemo.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    {activeDemo.name} Live Demo Preview
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    openidea.world/websites/{activeDemo.slug}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', background: 'var(--bg-canvas)', padding: '2px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: demoDeviceMode === 'desktop' ? 'var(--brand-navy)' : 'none',
                      color: demoDeviceMode === 'desktop' ? '#ffffff' : 'var(--text-secondary)'
                    }}
                    onClick={() => setDemoDeviceMode('desktop')}
                  >
                    Desktop
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '4px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: demoDeviceMode === 'mobile' ? 'var(--brand-navy)' : 'none',
                      color: demoDeviceMode === 'mobile' ? '#ffffff' : 'var(--text-secondary)'
                    }}
                    onClick={() => setDemoDeviceMode('mobile')}
                  >
                    Mobile
                  </button>
                </div>

                <button
                  type="button"
                  className="wb-modal-close-btn"
                  onClick={() => setActiveDemo(null)}
                  aria-label="Close Preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{ padding: '0 1.5rem', background: 'var(--bg-canvas)' }}>
              <div className="wb-modal-tabs">
                <button
                  type="button"
                  className={`wb-modal-tab-btn ${demoViewTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setDemoViewTab('preview')}
                >
                  Interactive Prototype
                </button>
                <button
                  type="button"
                  className={`wb-modal-tab-btn ${demoViewTab === 'features' ? 'active' : ''}`}
                  onClick={() => setDemoViewTab('features')}
                >
                  Trade Features & Flow
                </button>
                <button
                  type="button"
                  className={`wb-modal-tab-btn ${demoViewTab === 'tech' ? 'active' : ''}`}
                  onClick={() => setDemoViewTab('tech')}
                >
                  Architecture & Code Tokens
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="wb-modal-body">
              {demoViewTab === 'preview' && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div
                    className="wb-browser-chrome"
                    style={{
                      width: demoDeviceMode === 'mobile' ? '375px' : '100%',
                      transition: 'width 0.25s ease'
                    }}
                  >
                    {/* Simulated Browser URL bar */}
                    <div className="wb-chrome-header">
                      <div className="wb-chrome-dots">
                        <span className="wb-chrome-dot" />
                        <span className="wb-chrome-dot" />
                        <span className="wb-chrome-dot" />
                      </div>
                      <div className="wb-chrome-url-bar">
                        https://{activeDemo.sampleData.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.openidea.world
                      </div>
                    </div>

                    {/* Simulated Site Content */}
                    <div
                      className="wb-simulated-site-viewport"
                      style={{
                        background: activeDemo.colors.background || '#ffffff',
                        fontFamily: 'system-ui, sans-serif'
                      }}
                    >
                      {/* Top banner */}
                      <div
                        style={{
                          background: activeDemo.colors.primary,
                          color: '#ffffff',
                          padding: '8px 14px',
                          fontSize: '0.8125rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <strong>{activeDemo.sampleData.brandName}</strong>
                        <span>📞 Call / WhatsApp Active</span>
                      </div>

                      {/* Hero */}
                      <div style={{ padding: '24px 16px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: activeDemo.colors.primary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          ⭐ Est. {activeDemo.sampleData.established} • Verified Local Trade
                        </span>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '8px 0', color: '#1a1a1a', lineHeight: 1.2 }}>
                          {activeDemo.sampleData.headline}
                        </h4>
                        <p style={{ fontSize: '0.875rem', color: '#555', margin: '0 auto 16px', maxWidth: '440px', lineHeight: 1.5 }}>
                          {activeDemo.sampleData.subheadline}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <a
                            href={`https://wa.me/918130296940?text=Inquiry%20for%20${encodeURIComponent(activeDemo.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: activeDemo.colors.primary,
                              color: '#fff',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              fontSize: '0.8125rem',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                          >
                            📱 WhatsApp Inquiry
                          </a>
                          <span style={{ fontSize: '0.8125rem', padding: '8px 12px', background: '#fff', borderRadius: '6px', border: '1px solid #ddd', color: '#333' }}>
                            ⏰ {activeDemo.sampleData.timing}
                          </span>
                        </div>
                      </div>

                      {/* Sample Products / Menu / Services */}
                      {activeDemo.sampleData.sampleItems && (
                        <div style={{ padding: '18px 16px' }}>
                          <h5 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: '12px', color: '#222' }}>
                            Featured Offerings & Transparent Pricing
                          </h5>
                          <div style={{ display: 'grid', gridTemplateColumns: demoDeviceMode === 'mobile' ? '1fr' : '1fr 1fr', gap: '10px' }}>
                            {activeDemo.sampleData.sampleItems.map((item) => (
                              <div
                                key={item.name}
                                style={{
                                  background: '#ffffff',
                                  border: '1px solid rgba(0,0,0,0.08)',
                                  borderRadius: '8px',
                                  padding: '12px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{ fontSize: '0.875rem', color: '#111' }}>{item.name}</strong>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: activeDemo.colors.primary }}>
                                      {item.price}
                                    </span>
                                  </div>
                                  <p style={{ fontSize: '0.78125rem', color: '#666', margin: '6px 0 10px 0', lineHeight: 1.4 }}>
                                    {item.desc}
                                  </p>
                                </div>
                                <span style={{ fontSize: '0.6875rem', color: '#16a34a', fontWeight: 600 }}>
                                  ✓ Available on WhatsApp Order
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Footer bar */}
                      <div style={{ background: '#f5f5f5', padding: '12px 16px', fontSize: '0.75rem', color: '#666', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        📍 Verified Google Maps Location • Fast Doorstep Delivery • Direct Owner Contact
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {demoViewTab === 'features' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                      Why This Design Converts for {activeDemo.name}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      Every industry archetype in Open Idea is engineered after studying how Indian customers actually interact with that trade. Instead of generic corporate text, it addresses the 3 most frequent customer questions immediately: <em>What do you sell? How much does it cost? Where are you located?</em>
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    {activeDemo.features.map((feature, i) => (
                      <div
                        key={feature}
                        style={{
                          background: 'var(--bg-canvas)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '8px',
                          padding: '12px'
                        }}
                      >
                        <div style={{ color: 'var(--brand-blue)', fontWeight: 700, fontSize: '0.8125rem', marginBottom: '4px' }}>
                          0{i + 1}. Feature
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {feature}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'rgba(47, 143, 239, 0.06)', border: '1px solid rgba(47, 143, 239, 0.2)', borderRadius: '8px', padding: '14px' }}>
                    <h5 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--brand-blue)', margin: '0 0 4px 0' }}>
                      Delivery Commitment for {activeDemo.name}
                    </h5>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      When you book this build slot with ₹500, our leads deliver your customized draft within 5 business days. Send your items and phone numbers on WhatsApp, and we wire it up directly.
                    </p>
                  </div>
                </div>
              )}

              {demoViewTab === 'tech' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
                      Design Tokens & Clean React Architecture
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      Unlike closed web builders that lock you into monthly fees forever, this website is pure standard code you own 100%.
                    </p>
                  </div>

                  <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                    <div style={{ color: 'var(--brand-blue)', marginBottom: '8px' }}>// {activeDemo.name} Color Tokens</div>
                    <div>--theme-primary: {activeDemo.colors.primary};</div>
                    <div>--theme-secondary: {activeDemo.colors.secondary};</div>
                    <div>--theme-accent: {activeDemo.colors.accent};</div>
                    <div>--theme-background: {activeDemo.colors.background};</div>
                    <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>// Modern Stack: React 18, Vite, Vanilla CSS, Zero Vendor Lock-in</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '14px' }}>
                    <div>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>Want to inspect code or build yourself?</strong>
                      <div style={{ fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                        Scaffold this exact archetype in AI Studio with real-time prompt generation.
                      </div>
                    </div>
                    <button
                      type="button"
                      className="wb-btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '0.8125rem' }}
                      onClick={() => handleJumpToStudio(activeDemo.name)}
                    >
                      <Code2 size={14} />
                      <span>Scaffold in Studio</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-canvas)', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Deposit: <strong style={{ color: '#16a34a' }}>₹500 refundable</strong> · Turnaround: <strong>~5 business days</strong>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`https://wa.me/918130296940?text=Hi%20Open%20Idea%2C%20I%20like%20the%20${encodeURIComponent(activeDemo.name)}%20demo%20and%20want%20to%20know%20more.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.8125rem' }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Query</span>
                </a>

                <button
                  type="button"
                  className="wb-btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.8125rem' }}
                  onClick={() => {
                    setActiveDemo(null);
                    handleBuildForDemo(activeDemo);
                  }}
                >
                  <span>Start This Build</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------
          10. INTERACTIVE 4-STEP INTAKE BRIEF WIZARD MODAL
          -------------------------------------------------------------------- */}
      {showIntakeModal && (
        <div className="wb-modal-backdrop" onClick={handleCloseIntake} role="dialog" aria-modal="true">
          <div className="wb-modal-dialog wb-intake-modal-dialog" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="wb-modal-header">
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  {intakeSuccess ? 'Website Project Brief Received' : 'Tell Us What You Want Built'}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {intakeSuccess ? 'Confirmation & Next Steps' : 'Step ' + intakeStep + ' of 3 · Fast 2-minute intake'}
                </span>
              </div>

              <button
                type="button"
                className="wb-modal-close-btn"
                onClick={handleCloseIntake}
                aria-label="Close Modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step Progress Indicators */}
            {!intakeSuccess && (
              <div className="wb-step-indicator-bar">
                <div className={`wb-step-ind-item ${intakeStep === 1 ? 'active' : ''} ${intakeStep > 1 ? 'done' : ''}`}>
                  <span className="wb-step-ind-dot">1</span>
                  <span>Scope</span>
                </div>
                <div className={`wb-step-ind-item ${intakeStep === 2 ? 'active' : ''} ${intakeStep > 2 ? 'done' : ''}`}>
                  <span className="wb-step-ind-dot">2</span>
                  <span>Trade</span>
                </div>
                <div className={`wb-step-ind-item ${intakeStep === 3 ? 'active' : ''}`}>
                  <span className="wb-step-ind-dot">3</span>
                  <span>Slot</span>
                </div>
              </div>
            )}

            {/* Wizard Body */}
            <div className="wb-modal-body">
              {intakeSuccess ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(22, 163, 74, 0.12)', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Check size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                    Your Build Slot Request is Logged
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '460px', margin: '0 auto 1.5rem' }}>
                    We received your brief for <strong>{intakeData.industry}</strong>. Our engineering lead will review your requirements and message your WhatsApp number (<strong>{intakeData.phone}</strong>) within 24 hours.
                  </p>

                  <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '1rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Project Category:</span>
                      <strong>{intakeData.industry}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>City / Location:</span>
                      <strong>{intakeData.city || 'India'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Estimated First Draft:</span>
                      <strong style={{ color: 'var(--brand-blue)' }}>In ~5 Business Days</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Refundable Holding Slot:</span>
                      <strong style={{ color: '#16a34a' }}>₹500 (Covered by 7-Day Guarantee)</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a
                      href={`https://wa.me/918130296940?text=Hi%20Open%20Idea%2C%20I%20just%20submitted%20my%20brief%20for%20${encodeURIComponent(intakeData.industry)}%20(Phone%3A%20${encodeURIComponent(intakeData.phone)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wb-btn-primary"
                    >
                      <MessageCircle size={15} />
                      <span>Open WhatsApp Chat Now</span>
                    </a>
                    <button
                      type="button"
                      className="wb-btn-secondary"
                      onClick={handleCloseIntake}
                    >
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={intakeStep === 3 ? handleCompleteIntake : (e) => { e.preventDefault(); setIntakeStep(intakeStep + 1); }}>
                  {/* Step 1: Project Scope */}
                  {intakeStep === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                          What are we building for you?
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                          Pick the tier that best matches your immediate business need.
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label
                          style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '12px',
                            border: `2px solid ${intakeData.kind === 'business' ? 'var(--brand-blue)' : 'var(--border-subtle)'}`,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: intakeData.kind === 'business' ? 'rgba(47, 143, 239, 0.05)' : 'var(--bg-card)'
                          }}
                        >
                          <input
                            type="radio"
                            name="scope-tier"
                            checked={intakeData.kind === 'business'}
                            onChange={() => setIntakeData({ ...intakeData, kind: 'business' })}
                            style={{ marginTop: '3px' }}
                          />
                          <div>
                            <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                              Business Website (Recommended)
                            </strong>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                              Custom site for your shop, clinic, restaurant, or service. Live WhatsApp ordering, Google Maps, photo processing, and price menu. Live in 5 days.
                            </span>
                          </div>
                        </label>

                        <label
                          style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '12px',
                            border: `2px solid ${intakeData.kind === 'hobby' ? 'var(--brand-blue)' : 'var(--border-subtle)'}`,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: intakeData.kind === 'hobby' ? 'rgba(47, 143, 239, 0.05)' : 'var(--bg-card)'
                          }}
                        >
                          <input
                            type="radio"
                            name="scope-tier"
                            checked={intakeData.kind === 'hobby'}
                            onChange={() => setIntakeData({ ...intakeData, kind: 'hobby' })}
                            style={{ marginTop: '3px' }}
                          />
                          <div>
                            <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                              Hobby / Personal Portfolio
                            </strong>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                              1 to 4 pages for personal projects, creative portfolios, résumés, or single-product launches. Live in 3–5 days.
                            </span>
                          </div>
                        </label>

                        <label
                          style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '12px',
                            border: `2px solid ${intakeData.kind === 'mvp' ? 'var(--brand-blue)' : 'var(--border-subtle)'}`,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            background: intakeData.kind === 'mvp' ? 'rgba(47, 143, 239, 0.05)' : 'var(--bg-card)'
                          }}
                        >
                          <input
                            type="radio"
                            name="scope-tier"
                            checked={intakeData.kind === 'mvp'}
                            onChange={() => setIntakeData({ ...intakeData, kind: 'mvp' })}
                            style={{ marginTop: '3px' }}
                          />
                          <div>
                            <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', display: 'block' }}>
                              Full MVP / Web Application
                            </strong>
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                              Custom dashboards, user accounts, databases, and payment integration. Scoped individually with senior engineers.
                            </span>
                          </div>
                        </label>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="submit" className="wb-btn-primary">
                          <span>Next: Contact & Trade Details</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact & Trade Details */}
                  {intakeStep === 2 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                          Tell us how to reach you
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                          We communicate primarily on WhatsApp so you can review live links directly on your phone.
                        </p>
                      </div>

                      <div className="wb-field-group">
                        <label className="wb-field-label" htmlFor="intake-name">Your Full Name *</label>
                        <input
                          id="intake-name"
                          type="text"
                          className="wb-input"
                          placeholder="e.g. Rajesh Sharma"
                          value={intakeData.name}
                          onChange={(e) => setIntakeData({ ...intakeData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="wb-grid-2col">
                        <div className="wb-field-group">
                          <label className="wb-field-label" htmlFor="intake-phone">WhatsApp Number *</label>
                          <input
                            id="intake-phone"
                            type="tel"
                            className="wb-input"
                            placeholder="98XXXXXXXX"
                            value={intakeData.phone}
                            onChange={(e) => setIntakeData({ ...intakeData, phone: e.target.value })}
                            required
                          />
                        </div>

                        <div className="wb-field-group">
                          <label className="wb-field-label" htmlFor="intake-city">City / State</label>
                          <input
                            id="intake-city"
                            type="text"
                            className="wb-input"
                            placeholder="e.g. Greater Noida"
                            value={intakeData.city}
                            onChange={(e) => setIntakeData({ ...intakeData, city: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="wb-field-group">
                        <label className="wb-field-label" htmlFor="intake-industry">Select Your Business Category</label>
                        <select
                          id="intake-industry"
                          className="wb-select"
                          value={intakeData.industry}
                          onChange={(e) => setIntakeData({ ...intakeData, industry: e.target.value })}
                        >
                          {INDUSTRY_DEMOS.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.icon} {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="wb-field-group">
                        <label className="wb-field-label">Do you already own a domain name?</label>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.84375rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="domain"
                              checked={intakeData.hasDomain === 'have-domain'}
                              onChange={() => setIntakeData({ ...intakeData, hasDomain: 'have-domain' })}
                            />
                            <span>Yes, I own one</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="domain"
                              checked={intakeData.hasDomain === 'need-domain'}
                              onChange={() => setIntakeData({ ...intakeData, hasDomain: 'need-domain' })}
                            />
                            <span>No, please buy one for me</span>
                          </label>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <button
                          type="button"
                          className="wb-btn-secondary"
                          onClick={() => setIntakeStep(1)}
                        >
                          Back
                        </button>
                        <button type="submit" className="wb-btn-primary">
                          <span>Next: Review Guarantee & Slot</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Slot Reservation & Refundable Guarantee */}
                  {intakeStep === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                          Review Slot Reservation & Guarantee
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                          Holding fee: ₹500. 100% refundable if you decline the first draft within 7 days.
                        </p>
                      </div>

                      <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px', marginBottom: '10px' }}>
                          <div>
                            <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>Build Slot Reservation</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned to Open Idea Web Engineering Team</div>
                          </div>
                          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-navy)' }}>₹500</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78125rem', color: 'var(--text-secondary)' }}>
                          <li>✓ <strong>Held for 7 days:</strong> Gives you ample time to submit photos without rushing.</li>
                          <li>✓ <strong>100% Money-back guarantee:</strong> Refunded in 5–7 days if you decline the first draft link.</li>
                          <li>✓ <strong>Credited into invoice:</strong> When you proceed, ₹500 is deducted from the final price.</li>
                        </ul>
                      </div>

                      <div className="wb-field-group">
                        <label className="wb-field-label" htmlFor="intake-notes">Special notes or must-have features (Optional)</label>
                        <textarea
                          id="intake-notes"
                          className="wb-input"
                          rows="3"
                          placeholder="e.g. We need online cake customization, pure veg indication, and evening home delivery."
                          value={intakeData.notes}
                          onChange={(e) => setIntakeData({ ...intakeData, notes: e.target.value })}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <button
                          type="button"
                          className="wb-btn-secondary"
                          onClick={() => setIntakeStep(2)}
                        >
                          Back
                        </button>
                        <button type="submit" className="wb-btn-primary">
                          <span>Confirm & Request Build Slot</span>
                          <Check size={14} />
                        </button>
                      </div>

                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                        In this mockup, this logs your submission locally and simulates slot assignment.
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
