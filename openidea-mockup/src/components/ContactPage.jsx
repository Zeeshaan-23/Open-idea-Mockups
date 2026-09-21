import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Code2,
  Check,
  Copy,
  ArrowRight,
  ExternalLink,
  Clock,
  ShieldCheck,
  Sparkles,
  Send,
  AlertCircle
} from 'lucide-react';
import {
  INSTITUTIONAL_COORDINATES,
  ENQUIRY_CATEGORIES,
  CONTEXTUAL_PATHWAYS
} from '../data/contactData';
import '../styles/contact.css';

export default function ContactPage({ onNavigate, initialEnquiry = 'general' }) {
  // Determine initial category from URL query or prop
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => {
    const found = ENQUIRY_CATEGORIES.find((cat) => cat.paramKey === initialEnquiry);
    return found ? found.id : 'general';
  });

  // Track previous initialEnquiry to sync state during render without cascading effects
  const [prevEnquiry, setPrevEnquiry] = useState(initialEnquiry);
  if (initialEnquiry !== prevEnquiry) {
    setPrevEnquiry(initialEnquiry);
    const match = ENQUIRY_CATEGORIES.find((cat) => cat.paramKey === initialEnquiry);
    if (match) {
      setSelectedCategoryId(match.id);
    }
  }

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  // Interaction States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  // Current Category Definition
  const currentCategory =
    ENQUIRY_CATEGORIES.find((cat) => cat.id === selectedCategoryId) ||
    ENQUIRY_CATEGORIES[0];

  // Clipboard Copy Handler
  const handleCopy = (text, fieldKey) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldKey);
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    }
  };

  // Form Submit Handler (Simulated Prototype Dispatch)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Client-Side Validation
    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 8) {
      setErrorMessage('Please enter a descriptive message (at least 8 characters).');
      return;
    }

    setIsSubmitting(true);

    // Realistic prototype dispatch simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({
        name: name.trim(),
        email: email.trim(),
        organization: organization.trim(),
        categoryLabel: currentCategory.label,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      // Clear inputs
      setName('');
      setEmail('');
      setOrganization('');
      setMessage('');
    }, 700);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setErrorMessage(null);
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container-max">
        {/* ------------------------------------------------------------------
            1. Editorial Header / Premise
            ------------------------------------------------------------------ */}
        <header className="contact-header">
          <div className="contact-kicker">
            <Sparkles size={14} />
            <span>Direct Reachability &middot; Open Coordination</span>
          </div>

          <h1 className="contact-headline">
            Institutional Coordinates &amp;{' '}
            <span className="serif-accent">Structured Dispatch</span>
          </h1>

          <p className="contact-subheading">
            Connect directly with Open Idea&rsquo;s core engineering, research, and stewardship team.
            Whether inquiring about custom enterprise compute, turnkey web development, or academic
            collaborations, our team responds within 1&ndash;2 business days.
          </p>

          <div className="contact-meta-strip">
            <div className="contact-meta-item">
              <Mail size={14} />
              <span>Primary: <strong>{INSTITUTIONAL_COORDINATES.primaryEmail}</strong></span>
            </div>
            <div className="contact-meta-item">
              <Phone size={14} />
              <span>Direct: <strong>{INSTITUTIONAL_COORDINATES.directPhone}</strong></span>
            </div>
            <div className="contact-meta-item">
              <Clock size={14} />
              <span>Timezone: <strong>IST (UTC+5:30)</strong></span>
            </div>
            <div className="contact-meta-item">
              <ShieldCheck size={14} />
              <span>Response: <strong>1&ndash;2 Business Days</strong></span>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------------
            2. Main Two-Column Asymmetrical Grid
            ------------------------------------------------------------------ */}
        <div className="contact-main-grid">
          {/* ----------------------------------------------------------------
              LEFT COLUMN: Verified Direct Coordinates & Institutional Presence
              ---------------------------------------------------------------- */}
          <aside className="contact-coordinates-col">
            <div>
              <h2 className="coordinates-section-title">Direct Contact Coordinates</h2>
              <p className="coordinates-section-desc">
                Verified institutional communication channels for EcoSyz &amp; Open Idea. Reach us directly
                for urgent inquiries or reference our public codebase.
              </p>
            </div>

            {/* Email Coordinate Card */}
            <div className="coordinate-card">
              <div className="coordinate-icon-box">
                <Mail size={20} />
              </div>
              <div className="coordinate-content">
                <div className="coordinate-label">Primary Electronic Mail</div>
                <a
                  href={`mailto:${INSTITUTIONAL_COORDINATES.primaryEmail}`}
                  className="coordinate-primary-val"
                >
                  {INSTITUTIONAL_COORDINATES.primaryEmail}
                </a>
                <div className="coordinate-secondary-note">
                  General inquiries, partnership briefs &amp; enterprise scoping
                </div>
              </div>
              <button
                type="button"
                className={`coordinate-action-btn ${copiedField === 'email' ? 'copied' : ''}`}
                onClick={() => handleCopy(INSTITUTIONAL_COORDINATES.primaryEmail, 'email')}
                title="Copy email to clipboard"
              >
                {copiedField === 'email' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct Phone & Landline Coordinate Card */}
            <div className="coordinate-card">
              <div className="coordinate-icon-box">
                <Phone size={20} />
              </div>
              <div className="coordinate-content">
                <div className="coordinate-label">Telephone (Direct &amp; Landline)</div>
                <div>
                  <a
                    href={INSTITUTIONAL_COORDINATES.directPhoneHref}
                    className="coordinate-primary-val"
                  >
                    {INSTITUTIONAL_COORDINATES.directPhone}
                  </a>
                </div>
                <div className="coordinate-secondary-note">
                  Direct Line &middot; Landline: {INSTITUTIONAL_COORDINATES.landlinePhone}
                </div>
              </div>
              <button
                type="button"
                className={`coordinate-action-btn ${copiedField === 'phone' ? 'copied' : ''}`}
                onClick={() => handleCopy(INSTITUTIONAL_COORDINATES.directPhone, 'phone')}
                title="Copy phone number"
              >
                {copiedField === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Physical Headquarters Coordinate Card */}
            <div className="coordinate-card">
              <div className="coordinate-icon-box">
                <MapPin size={20} />
              </div>
              <div className="coordinate-content">
                <div className="coordinate-label">Physical Headquarters</div>
                <div className="coordinate-primary-val" style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {INSTITUTIONAL_COORDINATES.registeredAddress}
                </div>
                <div className="coordinate-secondary-note">
                  Gautam Buddha Nagar, Uttar Pradesh 201318, India
                </div>
              </div>
              <button
                type="button"
                className={`coordinate-action-btn ${copiedField === 'address' ? 'copied' : ''}`}
                onClick={() => handleCopy(INSTITUTIONAL_COORDINATES.registeredAddress, 'address')}
                title="Copy physical address"
              >
                {copiedField === 'address' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedField === 'address' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Public GitHub Repository Card */}
            <div className="coordinate-card">
              <div className="coordinate-icon-box">
                <Code2 size={20} />
              </div>
              <div className="coordinate-content">
                <div className="coordinate-label">Public Code Provenance</div>
                <a
                  href={INSTITUTIONAL_COORDINATES.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coordinate-primary-val"
                >
                  {INSTITUTIONAL_COORDINATES.repositoryLabel}
                </a>
                <div className="coordinate-secondary-note">
                  Open source platform architecture, issue tracker &amp; PRs
                </div>
              </div>
              <a
                href={INSTITUTIONAL_COORDINATES.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="coordinate-action-btn"
                title="Open repository in new tab"
              >
                <ExternalLink size={14} />
                <span>GitHub</span>
              </a>
            </div>

            {/* Timezone & Turnaround SLA Card */}
            <div className="operating-sla-card">
              <div className="operating-sla-row">
                <Clock size={16} style={{ color: 'var(--brand-blue)' }} />
                <span>{INSTITUTIONAL_COORDINATES.timeZone}</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {INSTITUTIONAL_COORDINATES.responseTurnaround}. All electronic correspondence is directly
                routed to our active engineering and ecosystem dispatch coordinators.
              </div>
            </div>

            {/* Founder Executive Direct Line Referral */}
            <div className="operating-sla-card" style={{ marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--brand-blue, #2F8FEF)' }}>
                  Executive Direct Line
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sony Yadav</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', lineHeight: 1.45 }}>
                For high-impact strategic alliances, press inquiries, or direct founder-level correspondence:
              </div>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/founder-contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>Connect via Founder Contact</span>
                <ArrowRight size={13} style={{ color: 'var(--brand-blue)' }} />
              </button>
            </div>
          </aside>

          {/* ----------------------------------------------------------------
              RIGHT COLUMN: Structured Dispatch Form
              ---------------------------------------------------------------- */}
          <main className="contact-form-card" aria-label="Structured Contact Dispatch">
            {!isSubmitted ? (
              <>
                <div className="form-header-kicker">Structured Dispatch</div>
                <h2 className="form-header-title">{currentCategory.title}</h2>
                <p className="form-header-desc">{currentCategory.description}</p>

                {/* Category Selector Pills */}
                <div>
                  <span id="enquiry-purpose-label" className="enquiry-selector-label">Select Inquiry Purpose</span>
                  <div className="enquiry-pills-row" role="radiogroup" aria-labelledby="enquiry-purpose-label">
                    {ENQUIRY_CATEGORIES.map((cat) => {
                      const isActive = cat.id === selectedCategoryId;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          className={`enquiry-pill-btn ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedCategoryId(cat.id);
                            setErrorMessage(null);
                          }}
                        >
                          <span className="enquiry-pill-kicker">{cat.kicker}</span>
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Suggested Focus Callout */}
                <div className="category-guidance-box">
                  <strong>Recommended Details:</strong> {currentCategory.suggestedFocus}
                </div>

                {/* Error Alert */}
                {errorMessage && (
                  <div className="form-alert-error" role="alert" style={{ marginBottom: '1.25rem' }}>
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-group-split">
                    <div className="form-field">
                      <label htmlFor="contact-name" className="form-label">
                        Your Full Name <span style={{ color: 'var(--color-danger, #EF4444)' }}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        className="form-input"
                        placeholder="e.g. Dr. Priya Sharma / Alex Chen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span style={{ color: 'var(--color-danger, #EF4444)' }}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="form-input"
                        placeholder="e.g. priya@institution.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-organization" className="form-label">
                      <span>Organization / Project Reference</span>
                      <span className="form-label-optional">(Optional)</span>
                    </label>
                    <input
                      id="contact-organization"
                      type="text"
                      name="organization"
                      className="form-input"
                      placeholder="e.g. Stanford AI Lab / Apex Robotics / Independent Creator"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message" className="form-label">
                      <span>Inquiry Details</span>
                      <span style={{ color: 'var(--color-danger, #EF4444)' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="form-textarea"
                      placeholder={currentCategory.placeholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="form-submit-row">
                    <button
                      type="submit"
                      className="contact-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Clock size={16} className="animate-spin" />
                          <span>Routing Dispatch...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send {currentCategory.label}</span>
                        </>
                      )}
                    </button>

                    <div className="form-privacy-note">
                      Direct prototype submission. No third-party ad trackers or marketing newsletters.
                    </div>
                  </div>
                </form>
              </>
            ) : (
              /* Success Confirmation Panel */
              <div className="contact-success-panel" role="region" aria-label="Dispatch Confirmation">
                <div className="success-icon-disc">
                  <Check size={28} />
                </div>
                <h3 className="success-title">Inquiry Recorded in Prototype Dispatch</h3>
                <p className="success-body">
                  Thank you, <strong>{submittedData?.name}</strong>. Your inquiry has been cleanly validated
                  and routed through Open Idea&rsquo;s prototype submission interface.
                </p>

                <div className="success-summary-box">
                  <div className="success-summary-row">
                    <span style={{ color: 'var(--text-muted)' }}>Target Channel:</span>
                    <strong>{submittedData?.categoryLabel}</strong>
                  </div>
                  <div className="success-summary-row">
                    <span style={{ color: 'var(--text-muted)' }}>Sender Email:</span>
                    <span>{submittedData?.email}</span>
                  </div>
                  {submittedData?.organization && (
                    <div className="success-summary-row">
                      <span style={{ color: 'var(--text-muted)' }}>Affiliation:</span>
                      <span>{submittedData?.organization}</span>
                    </div>
                  )}
                  <div className="success-summary-row">
                    <span style={{ color: 'var(--text-muted)' }}>Dispatch Time:</span>
                    <span>{submittedData?.timestamp} IST</span>
                  </div>
                  <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', fontStyle: 'italic' }}>
                    &ldquo;{submittedData?.message}&rdquo;
                  </div>
                </div>

                <div className="success-actions-row">
                  <button
                    type="button"
                    className="coordinate-action-btn"
                    onClick={() => {
                      const text = `Open Idea Inquiry:\nFrom: ${submittedData?.name} (${submittedData?.email})\nCategory: ${submittedData?.categoryLabel}\nMessage: ${submittedData?.message}`;
                      handleCopy(text, 'summary');
                    }}
                  >
                    {copiedField === 'summary' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedField === 'summary' ? 'Summary Copied' : 'Copy Summary'}</span>
                  </button>

                  <button
                    type="button"
                    className="contact-submit-btn"
                    style={{ padding: '0.5rem 1.25rem', minHeight: '38px', fontSize: '0.84375rem' }}
                    onClick={handleResetForm}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ------------------------------------------------------------------
            3. Contextual Pathways (Instant Self-Serve Redirection)
            ------------------------------------------------------------------ */}
        <section className="contact-pathways-section" aria-label="Alternative Workstations">
          <div className="pathways-header">
            <div className="pathways-header-kicker">Self-Serve Workstations</div>
            <h2 className="pathways-header-title">Looking for an Immediate Action Pathway?</h2>
            <p className="pathways-header-desc">
              If your inquiry concerns active website scoping, direct code scaffolding, open source
              collaboration, or research residency, you can jump directly into the relevant workstation.
            </p>
          </div>

          <div className="contact-pathways-grid">
            {CONTEXTUAL_PATHWAYS.map((pathway) => (
              <div key={pathway.id} className="pathway-item-card">
                <div>
                  <div className="pathway-item-badge">{pathway.badge}</div>
                  <h3 className="pathway-item-title">{pathway.title}</h3>
                  <p className="pathway-item-desc">{pathway.description}</p>
                </div>

                <div>
                  {pathway.isExternal ? (
                    <a
                      href={pathway.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pathway-item-cta"
                    >
                      <span>{pathway.actionLabel}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="pathway-item-cta"
                      onClick={() => onNavigate && onNavigate(pathway.href)}
                    >
                      <span>{pathway.actionLabel}</span>
                      <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
