import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Send,
  CheckCircle2,
  GitPullRequest,
  Users,
  Briefcase
} from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import {
  CONTRIBUTE_META,
  CONTRIBUTION_PATHWAYS,
  CONTRIBUTION_STEPS,
  OPEN_SOURCE_VALUES,
  INTEREST_FORM_OPTIONS,
  ECOSYSTEM_DISTINCTIONS
} from '../data/contributeData';
import '../styles/contribute.css';

export default function ContributePage({ onNavigate }) {
  // Interest form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'code',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedStep, setCopiedStep] = useState(null);

  const handleCopySnippet = (snippet, index) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet).then(() => {
        setCopiedStep(index);
        setTimeout(() => setCopiedStep(null), 2200);
      });
    }
  };

  const handleSubmitInterest = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    // Explicit prototype simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        type: 'code',
        message: ''
      });
    }, 600);
  };

  const handleInternalNav = (destination, e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  return (
    <div className="contribute-page-wrapper">
      <div className="contribute-container-max">
        {/* ==================================================================
            1. Editorial Header & Premise
            ================================================================== */}
        <header className="contribute-header">
          <div className="contribute-kicker">
            <Sparkles size={14} />
            <span>Open Source Commons &middot; AGPL-3.0 Infrastructure</span>
          </div>

          <h1 className="contribute-headline">
            {CONTRIBUTE_META.headline}{' '}
            <span className="serif-accent">{CONTRIBUTE_META.serifAccent}</span>
          </h1>

          <p className="contribute-subheading">{CONTRIBUTE_META.subtitle}</p>

          <div className="contribute-header-actions">
            <a
              href={CONTRIBUTE_META.primaryRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-btn-primary"
            >
              <GithubIcon size={18} />
              <span>View on GitHub</span>
              <ExternalLink size={14} style={{ opacity: 0.7 }} />
            </a>

            <a
              href={CONTRIBUTE_META.contributingGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-btn-secondary"
            >
              <BookOpen size={16} />
              <span>Read Contributing Guide</span>
            </a>
          </div>
        </header>

        {/* ==================================================================
            2. Contribution Pathways Grid (6 Ways to Contribute)
            ================================================================== */}
        <section className="contribute-pathways-section" aria-labelledby="pathways-heading">
          <div className="contribute-section-header">
            <div className="contribute-section-kicker">Active Categories</div>
            <h2 id="pathways-heading" className="contribute-section-title">
              Ways to Contribute
            </h2>
          </div>

          <div className="contribute-pathways-grid">
            {CONTRIBUTION_PATHWAYS.map((pathway) => (
              <article key={pathway.id} className="contribute-pathway-card">
                <div className="contribute-pathway-top">
                  <div className="contribute-pathway-icon-row">
                    <span className="contribute-pathway-icon" aria-hidden="true">
                      {pathway.icon}
                    </span>
                    <span className="contribute-pathway-kicker">{pathway.kicker}</span>
                  </div>

                  <h3 className="contribute-pathway-card-title">{pathway.title}</h3>
                  <p className="contribute-pathway-card-desc">{pathway.description}</p>

                  <div className="contribute-pathway-audience">
                    <strong>Who it is for:</strong> {pathway.targetAudience}
                  </div>
                </div>

                <a
                  href={pathway.actionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contribute-pathway-action-link"
                >
                  <span>{pathway.actionLabel}</span>
                  <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ==================================================================
            3. Quick Start Guide (5-Step Sequential Workflow)
            ================================================================== */}
        <section className="contribute-guide-section" aria-labelledby="guide-heading">
          <div className="contribute-section-header" style={{ textAlign: 'center' }}>
            <div className="contribute-section-kicker">Developer Onboarding</div>
            <h2 id="guide-heading" className="contribute-section-title">
              Quick Start Contribution Guide
            </h2>
          </div>

          <div className="contribute-steps-list">
            {CONTRIBUTION_STEPS.map((step, idx) => (
              <div key={step.step} className="contribute-step-row">
                <div className="contribute-step-badge">{step.step}</div>
                <div className="contribute-step-content">
                  <h3 className="contribute-step-title">{step.title}</h3>
                  <p className="contribute-step-desc">{step.description}</p>

                  <div className="contribute-step-code-box">
                    <code>{step.codeSnippet}</code>
                    <button
                      type="button"
                      className="contribute-copy-code-btn"
                      onClick={() => handleCopySnippet(step.codeSnippet, idx)}
                      title="Copy command to clipboard"
                      aria-label={`Copy command for step ${step.step}`}
                    >
                      {copiedStep === idx ? (
                        <Check size={16} color="var(--brand-cyan)" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="contribute-guide-footer">
            <a
              href={CONTRIBUTE_META.contributingGuideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-btn-secondary"
            >
              <GitPullRequest size={16} />
              <span>Read Comprehensive Contributing Documentation</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* ==================================================================
            4. Expression of Interest Intake Form ("Repo Private? Express Your Interest")
            ================================================================== */}
        <section className="contribute-form-section" aria-labelledby="form-heading">
          <div className="contribute-form-container">
            <div className="contribute-form-header">
              <h2 id="form-heading" className="contribute-form-title">
                Repo Private? Express Your Interest
              </h2>
              <p className="contribute-form-subtitle">
                During active release cycles, specific repositories may be restricted. Share how you would
                like to contribute and our core engineering team will reach out with access.
              </p>
            </div>

            {submitSuccess ? (
              <div className="contribute-form-success">
                <div className="contribute-success-icon-wrap">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="contribute-success-title">Expression Recorded</h3>
                <p className="contribute-success-desc">
                  Thank you for expressing interest in contributing to Open Idea. In production, our maintainers
                  triage inquiries directly via admissions and the GitHub contributor list.
                </p>
                <button
                  type="button"
                  className="contribute-btn-primary"
                  onClick={() => setSubmitSuccess(false)}
                >
                  Submit Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInterest} className="contribute-form">
                {/* Prototype simulation disclaimer */}
                <div className="contribute-sim-badge">
                  <ShieldCheck size={18} />
                  <div>
                    <strong>Prototype Intake Simulation:</strong> Demonstrates candidate intake.
                    In production, inquiries dispatch via Supabase Edge Function to maintainers.
                  </div>
                </div>

                <div className="contribute-form-field">
                  <label className="contribute-form-label" htmlFor="contrib-name">
                    <span>
                      Full Name <span className="required-star">*</span>
                    </span>
                  </label>
                  <input
                    id="contrib-name"
                    type="text"
                    required
                    className="contribute-form-input"
                    placeholder="e.g. Priyanshu Verma"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="contribute-form-field">
                  <label className="contribute-form-label" htmlFor="contrib-email">
                    <span>
                      Email Address <span className="required-star">*</span>
                    </span>
                  </label>
                  <input
                    id="contrib-email"
                    type="email"
                    required
                    className="contribute-form-input"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="contribute-form-field">
                  <label className="contribute-form-label" htmlFor="contrib-type">
                    I want to contribute via
                  </label>
                  <select
                    id="contrib-type"
                    className="contribute-form-select"
                    value={formData.type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                  >
                    {INTEREST_FORM_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contribute-form-field">
                  <label className="contribute-form-label" htmlFor="contrib-message">
                    Message / Skills (Optional)
                  </label>
                  <textarea
                    id="contrib-message"
                    rows={4}
                    className="contribute-form-textarea"
                    placeholder="Tell us about your background, GitHub profile, or specific modules you'd like to work on..."
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className="contribute-form-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Expression of Interest</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ==================================================================
            5. Open Source Values & Licensing
            ================================================================== */}
        <section className="contribute-values-section" aria-labelledby="values-heading">
          <div className="contribute-section-header" style={{ textAlign: 'center' }}>
            <div className="contribute-section-kicker">Institutional Commitment</div>
            <h2 id="values-heading" className="contribute-section-title">
              Open Source Values
            </h2>
          </div>

          <div className="contribute-values-grid">
            {OPEN_SOURCE_VALUES.map((val) => (
              <div key={val.id} className="contribute-value-card">
                <div className="contribute-value-icon" aria-hidden="true">
                  {val.icon}
                </div>
                <h3 className="contribute-value-title">{val.title}</h3>
                <p className="contribute-value-desc">{val.description}</p>
              </div>
            ))}
          </div>

          <div className="contribute-license-bar">
            <a
              href={CONTRIBUTE_META.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-license-link"
            >
              <span>View License ({CONTRIBUTE_META.licenseName})</span>
              <ExternalLink size={14} />
            </a>

            <span className="contribute-license-sep" aria-hidden="true">
              &bull;
            </span>

            <a
              href={CONTRIBUTE_META.issuesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-license-link"
            >
              <span>Browse Public Issues</span>
              <ExternalLink size={14} />
            </a>

            <span className="contribute-license-sep" aria-hidden="true">
              &bull;
            </span>

            <a
              href={CONTRIBUTE_META.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contribute-license-link"
            >
              <span>Join Contributor Discord</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* ==================================================================
            6. Ecosystem Distinctions & Contextual Navigation
            ================================================================== */}
        <section className="contribute-distinctions-section" aria-labelledby="distinctions-heading">
          <div className="contribute-section-header">
            <div className="contribute-section-kicker">Navigation &amp; Clarification</div>
            <h2 id="distinctions-heading" className="contribute-section-title">
              Understanding Contribution vs. Community vs. Careers
            </h2>
          </div>

          <div className="contribute-distinctions-grid">
            {ECOSYSTEM_DISTINCTIONS.map((item) => (
              <div
                key={item.id}
                className={`contribute-distinction-card ${item.isCurrent ? 'is-current' : ''}`}
              >
                <div>
                  <span className="contribute-distinction-badge">{item.badge}</span>
                  <h3 className="contribute-distinction-title">{item.title}</h3>
                  <p className="contribute-distinction-desc">{item.description}</p>
                </div>

                {item.isCurrent ? (
                  <div
                    className="contribute-distinction-action-btn"
                    style={{ opacity: 0.75, cursor: 'default' }}
                  >
                    <span>Current Page</span>
                    <Check size={14} />
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleInternalNav(item.href, e)}
                    className="contribute-distinction-action-btn"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
