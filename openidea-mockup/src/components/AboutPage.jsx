import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ExternalLink,
  Layers,
  FileText,
  ShieldCheck,
  Code2,
  Users,
  Globe,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  BookOpen,
  Terminal,
  GraduationCap,
  Briefcase,
  X,
  Check,
  MessageSquare,
  Building2
} from 'lucide-react';
import {
  INSTITUTIONAL_FACTS,
  CORE_PILLARS,
  FRAGMENTATION_CHALLENGES,
  STAKEHOLDER_AUDIENCES,
  INSTITUTIONAL_VALUES,
  ACTION_PATHWAYS
} from '../data/aboutData';
import '../styles/about.css';

export default function AboutPage({ onNavigate }) {
  const [activeAudienceId, setActiveAudienceId] = useState('researchers');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const activeAudience =
    STAKEHOLDER_AUDIENCES.find((item) => item.id === activeAudienceId) ||
    STAKEHOLDER_AUDIENCES[0];

  const handleCopy = (text, fieldName) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleAudienceAction = (destination) => {
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  const getPillarIcon = (id) => {
    switch (id) {
      case 'open-resources':
        return <BookOpen size={20} />;
      case 'studio-scaffolding':
        return <Terminal size={20} />;
      case 'community-commons':
        return <Users size={20} />;
      case 'bespoke-engineering':
        return <Briefcase size={20} />;
      default:
        return <Layers size={20} />;
    }
  };

  const getChallengeIcon = (id) => {
    switch (id) {
      case 'scattered-silos':
        return <Layers size={20} />;
      case 'heterogeneous-formats':
        return <FileText size={20} />;
      case 'licensing-ambiguity':
        return <ShieldCheck size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  return (
    <div className="about-page-wrapper">
      {/* --------------------------------------------------------------------
          1. Editorial Header / Hero Premise
          -------------------------------------------------------------------- */}
      <header className="about-header">
        <div className="about-container-max">
          <div className="about-kicker">
            <Compass size={14} />
            <span>Institutional Provenance & Whitepaper</span>
          </div>

          <h1 className="about-headline">
            Democratizing Innovation Through{' '}
            <span className="serif-accent">Unified Open Knowledge</span>
          </h1>

          <p className="about-subheading">
            {INSTITUTIONAL_FACTS.positioning}
          </p>

          <div className="about-meta-strip">
            <div className="about-meta-item">
              <span>Legal Entity:</span>
              <strong>{INSTITUTIONAL_FACTS.legalEntity}</strong>
            </div>
            <div className="about-meta-item">
              <span>Operating Model:</span>
              <strong>Open by Default · Sustainable Services</strong>
            </div>
            <div className="about-meta-item">
              <span>Headquarters:</span>
              <strong>Greater Noida West, Uttar Pradesh, India</strong>
            </div>
            <div className="about-meta-item">
              <span>Public Codebase:</span>
              <strong>GitHub (Sony17/Ecosyz)</strong>
            </div>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------------
          2. The Fragmentation Problem (Asymmetric Two-Column Exposition)
          -------------------------------------------------------------------- */}
      <section className="about-section" id="problem">
        <div className="about-container-max">
          <div className="about-section-header">
            <div className="about-section-kicker">
              <span>The Intellectual Challenge</span>
            </div>
            <h2 className="about-section-title">
              The Fragmentation of Open Knowledge
            </h2>
            <p className="about-section-desc">
              Humanity produces more open scientific research, software libraries, and public data than at any time in history. Yet the friction between discovery and execution remains cripplingly high.
            </p>
          </div>

          <div className="fragmentation-grid">
            {/* Left Column: Manifesto & Verified Scale Indicators */}
            <div className="problem-editorial-manifesto">
              <blockquote className="manifesto-quote">
                &ldquo;Open knowledge has never been more abundant, yet it has never been harder to assemble into working technology.&rdquo;
              </blockquote>
              <p className="manifesto-body">
                Published research preprints live in one silo. Telemetry and survey datasets reside on government portals. Open-source implementations sleep in unindexed Git repositories. Because formats, schemas, and licenses do not speak to one another, innovators spend months re-engineering baseline infrastructure before writing a single line of novel logic.
              </p>
              <div className="manifesto-stats-row">
                <div>
                  <div className="stat-callout-num">518M+</div>
                  <div className="stat-callout-label">
                    Open Source Repositories across disjointed forges
                  </div>
                </div>
                <div>
                  <div className="stat-callout-num">38%</div>
                  <div className="stat-callout-label">
                    Global Research is Open Access, but trapped in static PDF formats
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Challenge & Resolution Stack */}
            <div className="fragmentation-cards-stack">
              {FRAGMENTATION_CHALLENGES.map((challenge) => (
                <div key={challenge.id} className="pain-point-card">
                  <div className="pain-point-header">
                    <span style={{ color: 'var(--brand-blue)' }}>
                      {getChallengeIcon(challenge.id)}
                    </span>
                    <h3 className="pain-point-title">{challenge.title}</h3>
                  </div>
                  <p className="pain-point-context">{challenge.context}</p>
                  <div className="pain-point-resolution">
                    <strong>Open Idea Resolution:</strong> {challenge.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          3. Platform Architecture (4 Interlocking Pillars)
          -------------------------------------------------------------------- */}
      <section className="about-section" id="architecture">
        <div className="about-container-max">
          <div className="about-section-header">
            <div className="about-section-kicker">
              <span>Platform Architecture</span>
            </div>
            <h2 className="about-section-title">
              Four Unified Layers of Innovation
            </h2>
            <p className="about-section-desc">
              Open Idea bridges the entire continuum from raw academic research to production-ready software and long-term sustainable infrastructure.
            </p>
          </div>

          <div className="pillars-grid">
            {CORE_PILLARS.map((pillar) => (
              <div key={pillar.id} className="pillar-card">
                <div>
                  <div className="pillar-header-meta">
                    <span className="pillar-number">{pillar.number}</span>
                    <span className="pillar-kicker">{pillar.kicker}</span>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>

                <div>
                  <button
                    type="button"
                    className="pillar-action-link"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    onClick={() => onNavigate && onNavigate(pillar.destination)}
                  >
                    <span>{pillar.ctaText}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          4. Stakeholders Showcase (Interactive Tabbed Persona Exploration)
          -------------------------------------------------------------------- */}
      <section className="about-section" id="stakeholders">
        <div className="about-container-max">
          <div className="about-section-header">
            <div className="about-section-kicker">
              <span>Operational Modes</span>
            </div>
            <h2 className="about-section-title">
              Built for Every Stage of Open Creation
            </h2>
            <p className="about-section-desc">
              Whether you are conducting rigorous academic synthesis, prototyping software, completing a research fellowship, or launching an enterprise venture.
            </p>
          </div>

          <div className="stakeholders-container">
            {/* Left Vertical Tabs */}
            <div className="stakeholder-tabs" role="tablist" aria-label="Stakeholder Groups">
              {STAKEHOLDER_AUDIENCES.map((audience) => {
                const isActive = audience.id === activeAudienceId;
                return (
                  <button
                    key={audience.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`stakeholder-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveAudienceId(audience.id)}
                  >
                    <span className="stakeholder-tab-title">{audience.label}</span>
                    <span className="stakeholder-tab-sub">{audience.subtitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Tab Content Panel */}
            <div className="stakeholder-detail-panel" role="tabpanel">
              <div className="stakeholder-detail-header">
                <div className="stakeholder-detail-badge">
                  {activeAudience.subtitle}
                </div>
                <h3 className="stakeholder-detail-heading">
                  {activeAudience.label}
                </h3>
              </div>

              <p className="stakeholder-detail-desc">
                {activeAudience.description}
              </p>

              <div className="stakeholder-usecase-box">
                <div className="usecase-box-label">
                  <Sparkles size={13} style={{ color: 'var(--brand-blue)' }} />
                  <span>Representative Operational Flow</span>
                </div>
                <p className="usecase-box-text">
                  &ldquo;{activeAudience.useCase}&rdquo;
                </p>
              </div>

              <div className="stakeholder-tags-row">
                {activeAudience.tags.map((tag, idx) => (
                  <span key={idx} className="stakeholder-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <button
                  type="button"
                  className="stakeholder-cta-btn"
                  onClick={() => handleAudienceAction(activeAudience.primaryAction.destination)}
                >
                  <span>{activeAudience.primaryAction.label}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          5. Institutional Footprint, Values & Governance
          -------------------------------------------------------------------- */}
      <section className="about-section" id="governance">
        <div className="about-container-max">
          <div className="about-section-header">
            <div className="about-section-kicker">
              <span>Governance & Legal Accountability</span>
            </div>
            <h2 className="about-section-title">
              Institutional Footprint & Real-World Operations
            </h2>
            <p className="about-section-desc">
              Open Idea is not an anonymous protocol. We operate with verifiable legal stewardship, transparent code repositories, and physical office presence.
            </p>
          </div>

          <div className="institutional-grid">
            <div className="institutional-card">
              <div className="institutional-card-icon">
                <Globe size={18} />
              </div>
              <h3 className="institutional-card-title">Open-by-Default Infrastructure</h3>
              <p className="institutional-card-text">
                All research metadata indexes, public domain datasets, and community working groups remain permanently open access. Applications generated inside Studio belong 100% to creators with clean licensing provenance.
              </p>
              <button
                type="button"
                className="institutional-card-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                onClick={() => onNavigate && onNavigate('/openresources')}
              >
                <span>Browse Public Resources</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="institutional-card">
              <div className="institutional-card-icon">
                <MapPin size={18} />
              </div>
              <h3 className="institutional-card-title">Physical Registered Office</h3>
              <p className="institutional-card-text">
                {INSTITUTIONAL_FACTS.registeredAddress}
              </p>
              <button
                type="button"
                className="institutional-card-link"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                onClick={() => setIsInquiryModalOpen(true)}
              >
                <span>View Contact Coordinates</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="institutional-card">
              <div className="institutional-card-icon">
                <Code2 size={18} />
              </div>
              <h3 className="institutional-card-title">Open-Source Repository</h3>
              <p className="institutional-card-text">
                The primary platform architecture, community integrations, and service scaffolding are maintained publicly on GitHub under the Sony17/Ecosyz repository.
              </p>
              <a
                href={INSTITUTIONAL_FACTS.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="institutional-card-link"
              >
                <span>Inspect Repository on GitHub</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          6. Action Pathways & Direct Engagement Hub
          -------------------------------------------------------------------- */}
      <section className="about-section" id="pathways">
        <div className="about-container-max">
          <div className="about-section-header">
            <div className="about-section-kicker">
              <span>Pathways to Action</span>
            </div>
            <h2 className="about-section-title">
              Engage with the Open Idea Ecosystem
            </h2>
            <p className="about-section-desc">
              Whether you want to explore published research, build functional web applications, join a research residency, or commission custom web engineering.
            </p>
          </div>

          <div className="pathways-grid">
            {ACTION_PATHWAYS.map((pathway, idx) => (
              <div key={idx} className="pathway-card">
                <div>
                  <div className="pathway-category">{pathway.category}</div>
                  <h3 className="pathway-title">{pathway.title}</h3>
                  <p className="pathway-desc">{pathway.desc}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className="pathway-cta-btn"
                    onClick={() => onNavigate && onNavigate(pathway.destination)}
                  >
                    <span>{pathway.buttonText}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Contact Banner */}
          <div className="contact-hub-banner">
            <div className="contact-hub-content">
              <h3 className="contact-hub-title">
                Direct Inquiries & Institutional Partnerships
              </h3>
              <p className="contact-hub-desc">
                For research collaboration, academic citations, press questions, or custom enterprise web engineering, reach out directly to our Noida West headquarters.
              </p>
            </div>
            <div className="contact-hub-actions">
              <button
                type="button"
                className="contact-hub-primary-btn"
                onClick={() => setIsInquiryModalOpen(true)}
              >
                <Mail size={15} />
                <span>Contact Core Team</span>
              </button>
              <a
                href={INSTITUTIONAL_FACTS.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-hub-ghost-btn"
              >
                <MessageSquare size={15} />
                <span>Discord Community</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          Institutional Contact Dialog / Modal
          -------------------------------------------------------------------- */}
      {isInquiryModalOpen && (
        <div
          className="about-modal-backdrop"
          onClick={() => setIsInquiryModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-heading"
        >
          <div
            className="about-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="about-modal-header">
              <h3 id="about-modal-heading" className="about-modal-title">
                Institutional Coordinates
              </h3>
              <button
                type="button"
                className="about-modal-close"
                onClick={() => setIsInquiryModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ marginBottom: '1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              Official contact coordinates for EcoSyz &amp; Open Idea. Our team responds to research and institutional inquiries within 1&ndash;2 business days.
            </div>

            <div>
              <div className="about-modal-contact-row">
                <Mail size={16} className="about-modal-contact-icon" />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</div>
                  <a href={`mailto:${INSTITUTIONAL_FACTS.email}`} className="about-modal-contact-val">
                    {INSTITUTIONAL_FACTS.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="contact-hub-ghost-btn"
                  style={{ padding: '0.35rem 0.65rem', minHeight: 'auto', fontSize: '0.75rem' }}
                  onClick={() => handleCopy(INSTITUTIONAL_FACTS.email, 'email')}
                >
                  {copiedField === 'email' ? <Check size={13} style={{ color: 'var(--state-success)' }} /> : 'Copy'}
                </button>
              </div>

              <div className="about-modal-contact-row">
                <Phone size={16} className="about-modal-contact-icon" />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone (Direct &amp; Landline)</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {INSTITUTIONAL_FACTS.phoneDirect} &middot; {INSTITUTIONAL_FACTS.phoneLandline}
                  </div>
                </div>
                <button
                  type="button"
                  className="contact-hub-ghost-btn"
                  style={{ padding: '0.35rem 0.65rem', minHeight: 'auto', fontSize: '0.75rem' }}
                  onClick={() => handleCopy(INSTITUTIONAL_FACTS.phoneDirect, 'phone')}
                >
                  {copiedField === 'phone' ? <Check size={13} style={{ color: 'var(--state-success)' }} /> : 'Copy'}
                </button>
              </div>

              <div className="about-modal-contact-row">
                <MapPin size={16} className="about-modal-contact-icon" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Physical Headquarters</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: '0.2rem' }}>
                    {INSTITUTIONAL_FACTS.registeredAddress}
                  </div>
                </div>
              </div>

              <div className="about-modal-contact-row">
                <Code2 size={16} className="about-modal-contact-icon" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Public Repository</div>
                  <a
                    href={INSTITUTIONAL_FACTS.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-modal-contact-val"
                  >
                    github.com/Sony17/Ecosyz
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="contact-hub-primary-btn"
                style={{ padding: '0.5rem 1.25rem' }}
                onClick={() => setIsInquiryModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
