import React from 'react';
import {
  Compass,
  ArrowRight,
  Check,
  Sparkles,
  Layers,
  BookOpen,
  Terminal,
  Users,
  Briefcase,
  Coins,
  ChevronRight,
  Workflow
} from 'lucide-react';
import {
  PLATFORM_OVERVIEW,
  CORE_CAPABILITIES,
  CREATION_CONTINUUM_STEPS
} from '../data/featuresData';
import '../styles/features.css';

export default function FeaturesPage({ onNavigate }) {
  const handleAction = (destination) => {
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
      case 'pricing-compute':
        return <Coins size={20} />;
      default:
        return <Layers size={20} />;
    }
  };

  return (
    <div className="features-page-wrapper">
      {/* --------------------------------------------------------------------
          1. Editorial Header / Hero Premise
          -------------------------------------------------------------------- */}
      <header className="features-header">
        <div className="features-container-max">
          <div className="features-kicker">
            <Compass size={14} />
            <span>{PLATFORM_OVERVIEW.kicker}</span>
          </div>

          <h1 className="features-headline">
            All Features, <span className="serif-accent">One Unified Platform</span>
          </h1>

          <p className="features-subheading">
            {PLATFORM_OVERVIEW.subtitle}
          </p>

          {/* Quick-jump anchor pills */}
          <div className="features-jump-strip">
            {CORE_CAPABILITIES.map((cap) => (
              <a
                key={cap.id}
                href={`#${cap.id}`}
                className="features-jump-pill"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(cap.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>{cap.number}</span>
                <span>{cap.title}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------------
          2. Core Platform Capabilities Grid
          -------------------------------------------------------------------- */}
      <section className="features-section" id="core-capabilities">
        <div className="features-container-max">
          <div className="features-section-header">
            <div className="features-section-kicker">
              <Layers size={13} />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="features-section-title">
              Five Interconnected Ecosystem Layers
            </h2>
            <p className="features-section-desc">
              Open Idea is not a disjointed set of tools. Each capability directly feeds the next, transitioning raw scientific discovery into functional, self-hosted software.
            </p>
          </div>

          <div className="capabilities-grid">
            {CORE_CAPABILITIES.map((cap) => (
              <div key={cap.id} id={cap.id} className="capability-card">
                <div>
                  <div className="capability-header">
                    <span className="capability-number">{cap.number}</span>
                    <span className="capability-role-badge">{cap.role}</span>
                  </div>

                  <h3 className="capability-title">{cap.title}</h3>
                  <div className="capability-kicker">{cap.kicker}</div>
                  <p className="capability-summary">{cap.summary}</p>

                  {/* Creator Enablement Callout */}
                  <div className="capability-benefit-box">
                    <div className="benefit-box-label">
                      <Sparkles size={12} />
                      <span>Creator Enablement</span>
                    </div>
                    <p className="benefit-box-text">{cap.userBenefit}</p>
                  </div>

                  {/* Key Features Bullet List */}
                  <ul className="capability-features-list">
                    {cap.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="capability-feature-item">
                        <Check size={14} className="capability-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="capability-action-box">
                  <button
                    type="button"
                    className="capability-primary-btn"
                    onClick={() => handleAction(cap.primaryAction.destination)}
                  >
                    <span>{cap.primaryAction.label}</span>
                    <ArrowRight size={14} />
                  </button>

                  {cap.secondaryAction && (
                    <button
                      type="button"
                      className="capability-secondary-link"
                      onClick={() => handleAction(cap.secondaryAction.destination)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <span>{cap.secondaryAction.label}</span>
                      <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          3. The Unified Creation Continuum
          -------------------------------------------------------------------- */}
      <section className="features-section" id="creation-continuum">
        <div className="features-container-max">
          <div className="features-section-header">
            <div className="features-section-kicker">
              <Workflow size={13} />
              <span>System Dynamics</span>
            </div>
            <h2 className="features-section-title">
              From Raw Research to Production Software
            </h2>
            <p className="features-section-desc">
              How an idea moves through Open Idea: from academic discovery to functional scaffolding, peer collaboration, bespoke engineering, and production deployment.
            </p>
          </div>

          <div className="continuum-grid">
            {CREATION_CONTINUUM_STEPS.map((step) => (
              <div key={step.step} className="continuum-step-card">
                <div>
                  <div className="continuum-step-header">
                    <span className="continuum-step-num">{step.step}</span>
                    <span className="continuum-phase-badge">{step.phase}</span>
                  </div>
                  <h3 className="continuum-step-title">{step.title}</h3>
                  <p className="continuum-step-desc">{step.description}</p>
                </div>

                <div>
                  <button
                    type="button"
                    className="continuum-step-link"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    onClick={() => handleAction(step.destination)}
                  >
                    <span>Explore Step</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          4. Production Synthesis & Direct Engagement Banner
          -------------------------------------------------------------------- */}
      <section className="features-section" id="synthesis-banner">
        <div className="features-container-max">
          <div className="features-cta-banner">
            <div className="features-cta-content">
              <h3 className="features-cta-title">
                All Features, One Unified Platform
              </h3>
              <p className="features-cta-desc">
                Open Idea unites research provenance, open datasets, in-browser AI scaffolding, collaborative problem commons, and turnkey web engineering. Whether you are surveying literature, scaffolding applications, or commissioning production services, everything is connected.
              </p>
            </div>

            <div className="features-cta-actions">
              <button
                type="button"
                className="features-cta-primary"
                onClick={() => handleAction('/openresources')}
              >
                <span>Search Open Knowledge Base</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="features-cta-ghost"
                onClick={() => handleAction('/about')}
              >
                <span>Institutional Whitepaper</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
