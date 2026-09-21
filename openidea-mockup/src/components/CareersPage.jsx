import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  ArrowRight,
  ChevronDown,
  Download,
  ExternalLink,
  Mail,
  FileText,
  CheckCircle2,
  X,
  Upload,
  ShieldCheck,
  Layers,
  Globe,
  Share2,
  Check,
  Send
} from 'lucide-react';
import {
  CAREERS_META,
  CAREER_TRACKS,
  OPEN_POSITIONS,
  WORKING_PHILOSOPHY,
  ECOSYSTEM_PATHWAYS
} from '../data/careersData';
import '../styles/careers.css';

export default function CareersPage({ onNavigate, initialTrack = 'all' }) {
  // Track filtering
  const [selectedTrack, setSelectedTrack] = useState(initialTrack);

  // Accordion state (expandable role cards)
  const [expandedRoleId, setExpandedRoleId] = useState(() => {
    // Check if URL hash maps to a role
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash && OPEN_POSITIONS.some((r) => r.id === hash)) {
        return hash;
      }
    } catch {}
    // Default to first role open for instant engagement
    return OPEN_POSITIONS[0].id;
  });

  // Application Modal state
  const [applyModalRole, setApplyModalRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    coverNote: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedShareId, setCopiedShareId] = useState(null);

  const fileInputRef = useRef(null);

  // Scroll to hash on mount if present
  useEffect(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const el = document.getElementById(`role-${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch {}
  }, []);

  // Filter roles based on active track
  const filteredRoles = OPEN_POSITIONS.filter((role) => {
    if (selectedTrack === 'all') return true;
    return role.track === selectedTrack;
  });

  const handleToggleRole = (roleId) => {
    setExpandedRoleId((prev) => (prev === roleId ? null : roleId));
  };

  const handleOpenApplyModal = (role) => {
    setApplyModalRole(role);
    setSubmitSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      coverNote: '',
      resume: null
    });
  };

  const handleCloseApplyModal = () => {
    if (isSubmitting) return;
    setApplyModalRole(null);
    setSubmitSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, resume: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.phone || !formData.resume) {
      return;
    }

    setIsSubmitting(true);
    // Explicit prototype simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 700);
  };

  const handleShareRole = (role) => {
    const shareUrl = `${window.location.origin}/careers#${role.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopiedShareId(role.id);
        setTimeout(() => setCopiedShareId(null), 2500);
      });
    }
  };

  const handleInternalNav = (destination, e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  return (
    <div className="careers-page-wrapper">
      <div className="careers-container-max">
        {/* ==================================================================
            1. Editorial Header & Premise
            ================================================================== */}
        <header className="careers-header">
          <div className="careers-kicker">
            <Sparkles size={14} />
            <span>Open Infrastructure &middot; Fellowships &amp; Roles</span>
          </div>

          <h1 className="careers-headline">
            {CAREERS_META.headline}{' '}
            <span className="serif-accent">{CAREERS_META.serifAccent}</span>
          </h1>

          <p className="careers-subheading">{CAREERS_META.subtitle}</p>

          <div className="careers-meta-strip">
            <div className="careers-meta-item">
              <MapPin size={16} />
              <span>{CAREERS_META.location}</span>
            </div>
            <div className="careers-meta-item">
              <GraduationCap size={16} />
              <span>{CAREERS_META.commitment}</span>
            </div>
            <div className="careers-meta-item">
              <Briefcase size={16} />
              <span className="careers-meta-pill">7 Active Opportunities</span>
            </div>
          </div>

          {/* Contextual Pathway to Milestone Fellowship */}
          <div className="careers-fellowship-banner">
            <div className="careers-fellowship-banner-left">
              <div className="careers-fellowship-banner-icon">
                <Layers size={20} />
              </div>
              <div>
                <div className="careers-fellowship-banner-title">
                  Looking for self-paced milestone stipends?
                </div>
                <div className="careers-fellowship-banner-sub">
                  Explore our graph-based contribution roadmap where engineers unlock stipends per node.
                </div>
              </div>
            </div>
            <a
              href={CAREERS_META.fellowshipRoute}
              onClick={(e) => handleInternalNav(CAREERS_META.fellowshipRoute, e)}
              className="careers-fellowship-banner-link"
            >
              <span>Milestone Fellowship Program</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </header>

        {/* ==================================================================
            2. Working Philosophy (3-column triptych)
            ================================================================== */}
        <section className="careers-philosophy-section" aria-labelledby="philosophy-title">
          <div className="careers-section-heading-group">
            <div className="careers-section-kicker">Operating Ethos</div>
            <h2 id="philosophy-title" className="careers-section-title">
              What Working with Open Idea Means
            </h2>
          </div>

          <div className="careers-philosophy-grid">
            {WORKING_PHILOSOPHY.map((item) => (
              <div key={item.num} className="careers-philosophy-card">
                <span className="careers-philosophy-num">{item.num}</span>
                <h3 className="careers-philosophy-card-title">{item.title}</h3>
                <p className="careers-philosophy-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            3. Role Inventory & Filters
            ================================================================== */}
        <section id="roles" className="careers-roles-section" aria-labelledby="roles-title">
          <div className="careers-section-heading-group">
            <div className="careers-section-kicker">Current Opportunities</div>
            <h2 id="roles-title" className="careers-section-title">
              Active Fellowship &amp; Team Positions
            </h2>
          </div>

          {/* Filter Track Tabs */}
          <div className="careers-filter-bar" role="tablist" aria-label="Filter positions by track">
            {CAREER_TRACKS.map((track) => {
              const isActive = selectedTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`careers-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedTrack(track.id)}
                >
                  <span>{track.label}</span>
                  <span className="careers-filter-count">({track.count})</span>
                </button>
              );
            })}
          </div>

          {/* Role Cards List */}
          <div className="careers-roles-list">
            {filteredRoles.map((role) => {
              const isExpanded = expandedRoleId === role.id;
              return (
                <article
                  key={role.id}
                  id={`role-${role.id}`}
                  className={`careers-role-card ${isExpanded ? 'is-expanded' : ''}`}
                >
                  {/* Summary Header (Accordion Trigger) */}
                  <button
                    type="button"
                    className="careers-role-summary-trigger"
                    onClick={() => handleToggleRole(role.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`desc-${role.id}`}
                  >
                    <div className="careers-role-header-left">
                      <span className="careers-role-icon" aria-hidden="true">
                        {role.icon}
                      </span>
                      <div className="careers-role-title-wrap">
                        <h3 className="careers-role-title">{role.title}</h3>
                        <div className="careers-role-meta-row">
                          <span className="careers-role-badge">{role.roleBadge}</span>
                          <span className="careers-role-type-badge">{role.type}</span>
                          <span className="careers-role-type-badge">{role.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="careers-role-toggle-indicator" aria-hidden="true">
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {/* Expanded Details Body */}
                  {isExpanded && (
                    <div id={`desc-${role.id}`} className="careers-role-body">
                      {/* Summary Block */}
                      <div className="careers-role-desc-block">
                        <h4 className="careers-role-block-title">Role Overview</h4>
                        <p className="careers-role-summary-text">{role.summary}</p>
                      </div>

                      {/* Key Highlights */}
                      <div>
                        <h4 className="careers-role-block-title">Key Responsibilities &amp; Deliverables</h4>
                        <ul className="careers-role-highlights-list">
                          {role.highlights.map((item, idx) => (
                            <li key={idx} className="careers-role-highlight-item">
                              <span className="careers-role-bullet-icon" aria-hidden="true">
                                &bull;
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="careers-role-block-title">Required Competencies</h4>
                        <div className="careers-skills-container">
                          {role.skills.map((skill) => (
                            <span key={skill} className="careers-skill-pill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Supplementary note & download */}
                      <div className="careers-role-supplementary">
                        <div>
                          <div className="careers-apply-note">{role.applyNote}</div>
                          {role.needsGithub && (
                            <div className="careers-apply-note" style={{ marginTop: '0.25rem' }}>
                              * Include your GitHub profile or code samples with your application.
                            </div>
                          )}
                        </div>
                        <a
                          href={role.pdfPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="careers-pdf-link"
                          title={`Download ${role.title} specification (PDF)`}
                        >
                          <Download size={14} />
                          <span>Download PDF</span>
                        </a>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="careers-role-actions">
                        <button
                          type="button"
                          className="careers-apply-btn"
                          onClick={() => handleOpenApplyModal(role)}
                        >
                          <span>Apply for Role</span>
                          <ArrowRight size={14} />
                        </button>

                        <a
                          href="/contact?enquiry=careers"
                          onClick={(e) => handleInternalNav('/contact?enquiry=careers', e)}
                          className="careers-contact-link"
                        >
                          <span>Ask a Question</span>
                        </a>

                        <button
                          type="button"
                          className="careers-contact-link"
                          onClick={() => handleShareRole(role)}
                          title="Copy link to this position"
                        >
                          {copiedShareId === role.id ? (
                            <>
                              <Check size={14} color="var(--brand-cyan)" />
                              <span>Link Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 size={14} />
                              <span>Share</span>
                            </>
                          )}
                        </button>

                        <div className="careers-mailto-fallback">
                          Direct email:{' '}
                          <a href={`mailto:${CAREERS_META.officialContactEmail}`}>
                            {CAREERS_META.officialContactEmail}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ==================================================================
            4. Ecosystem Pathways (Distinct IA comparison)
            ================================================================== */}
        <section className="careers-pathways-section" aria-labelledby="pathways-title">
          <div className="careers-section-heading-group">
            <div className="careers-section-kicker">Navigation &amp; Clarification</div>
            <h2 id="pathways-title" className="careers-section-title">
              Three Ways to Engage the Open Idea Ecosystem
            </h2>
          </div>

          <div className="careers-pathways-grid">
            {ECOSYSTEM_PATHWAYS.map((pathway) => (
              <div key={pathway.id} className="careers-pathway-card">
                <div>
                  <span className="careers-pathway-badge">{pathway.badge}</span>
                  <h3 className="careers-pathway-title">{pathway.title}</h3>
                  <p className="careers-pathway-desc">{pathway.description}</p>
                </div>
                {pathway.isAnchor ? (
                  <a href={pathway.href} className="careers-pathway-action-btn">
                    <span>{pathway.actionLabel}</span>
                    <ArrowRight size={14} />
                  </a>
                ) : (
                  <a
                    href={pathway.href}
                    onClick={(e) => handleInternalNav(pathway.href, e)}
                    className="careers-pathway-action-btn"
                  >
                    <span>{pathway.actionLabel}</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            5. Direct Institutional Reach Footer
            ================================================================== */}
        <section className="careers-institutional-contact" aria-label="Direct contact options">
          <div className="careers-contact-box">
            <h2 className="careers-contact-box-title">Have Questions Before Applying?</h2>
            <p className="careers-contact-box-sub">
              Reach out directly to our admissions team. We review submissions continuously and respond
              within 1&ndash;2 business days.
            </p>

            <div className="careers-contact-actions-row">
              <a
                href={`mailto:${CAREERS_META.officialContactEmail}`}
                className="careers-contact-pill-btn"
              >
                <Mail size={16} />
                <span>{CAREERS_META.officialContactEmail}</span>
              </a>

              <a
                href={CAREERS_META.contactRoute}
                onClick={(e) => handleInternalNav(CAREERS_META.contactRoute, e)}
                className="careers-contact-pill-btn"
              >
                <Globe size={16} />
                <span>Visit Contact Coordinates</span>
              </a>
            </div>

            <p className="careers-tagline-note">
              Open Idea &middot; Smart, Human, Useful, Open &middot; Democratizing Innovation.
            </p>
          </div>
        </section>
      </div>

      {/* ====================================================================
          6. Interactive Application Modal
          ==================================================================== */}
      {applyModalRole && (
        <div
          className="careers-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-role-title"
          onClick={handleCloseApplyModal}
        >
          <div
            className="careers-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="careers-modal-header">
              <div className="careers-modal-title-wrap">
                <div className="careers-modal-kicker">Application Intake Brief</div>
                <h3 id="modal-role-title" className="careers-modal-title">
                  {applyModalRole.title}
                </h3>
              </div>
              <button
                type="button"
                className="careers-modal-close-btn"
                onClick={handleCloseApplyModal}
                aria-label="Close application modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {submitSuccess ? (
              <div className="careers-success-view">
                <div className="careers-success-icon-wrap">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="careers-success-title">Application Dispatched</h4>
                <p className="careers-success-desc">
                  Thank you for applying for the{' '}
                  <strong>{applyModalRole.title}</strong> role. In production, your resume and
                  qualifications are dispatched to the Open Idea admissions inbox for review.
                </p>

                <div className="careers-success-summary-box">
                  <div>
                    <strong>Applicant:</strong> {formData.name || 'Candidate'} ({formData.email})
                  </div>
                  <div>
                    <strong>Role Track:</strong> {applyModalRole.roleBadge}
                  </div>
                  <div>
                    <strong>Resume Attached:</strong> {formData.resume?.name || 'Uploaded file'}
                  </div>
                  <div>
                    <strong>Destination:</strong> {CAREERS_META.applicationEndpoint} &amp; {CAREERS_META.officialContactEmail}
                  </div>
                </div>

                <button
                  type="button"
                  className="careers-apply-btn"
                  onClick={handleCloseApplyModal}
                  style={{ marginTop: '0.75rem' }}
                >
                  Return to Careers
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication}>
                <div className="careers-modal-content">
                  {/* Prototype simulation disclaimer */}
                  <div className="careers-simulation-badge">
                    <ShieldCheck size={18} />
                    <div>
                      <strong>Prototype Application Harness:</strong> Submissions simulate the
                      production applicant pipeline (`POST {CAREERS_META.applicationEndpoint}`).
                    </div>
                  </div>

                  {/* Name */}
                  <div className="careers-form-group">
                    <label className="careers-form-label" htmlFor="applicant-name">
                      Full Name
                    </label>
                    <input
                      id="applicant-name"
                      type="text"
                      className="careers-form-input"
                      placeholder="e.g. Alex Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  </div>

                  {/* Email & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="careers-form-group">
                      <label className="careers-form-label" htmlFor="applicant-email">
                        <span>
                          Email Address <span className="required-star">*</span>
                        </span>
                      </label>
                      <input
                        id="applicant-email"
                        type="email"
                        required
                        className="careers-form-input"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>

                    <div className="careers-form-group">
                      <label className="careers-form-label" htmlFor="applicant-phone">
                        <span>
                          Phone Number <span className="required-star">*</span>
                        </span>
                      </label>
                      <input
                        id="applicant-phone"
                        type="tel"
                        required
                        className="careers-form-input"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  {/* LinkedIn & GitHub */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="careers-form-group">
                      <label className="careers-form-label" htmlFor="applicant-linkedin">
                        <span>LinkedIn</span>
                        <span className="optional-hint">Profile URL</span>
                      </label>
                      <input
                        id="applicant-linkedin"
                        type="url"
                        className="careers-form-input"
                        placeholder="https://linkedin.com/in/..."
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, linkedin: e.target.value }))
                        }
                      />
                    </div>

                    <div className="careers-form-group">
                      <label className="careers-form-label" htmlFor="applicant-github">
                        <span>GitHub</span>
                        {applyModalRole.needsGithub && (
                          <span style={{ color: 'var(--brand-cyan)', fontSize: '0.75rem' }}>
                            (Recommended)
                          </span>
                        )}
                      </label>
                      <input
                        id="applicant-github"
                        type="url"
                        className="careers-form-input"
                        placeholder="https://github.com/..."
                        value={formData.github}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, github: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="careers-form-group">
                    <label className="careers-form-label">
                      <span>
                        Resume / CV <span className="required-star">*</span>
                      </span>
                      <span className="optional-hint">PDF or DOCX (max 5MB)</span>
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />

                    {formData.resume ? (
                      <div className="careers-selected-file-chip">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FileText size={18} />
                          <div>
                            <strong>{formData.resume.name}</strong> (
                            {(formData.resume.size / 1024).toFixed(0)} KB)
                          </div>
                        </div>
                        <button
                          type="button"
                          className="careers-remove-file-btn"
                          onClick={handleRemoveFile}
                          aria-label="Remove attached resume"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="careers-file-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            fileInputRef.current?.click();
                          }
                        }}
                      >
                        <Upload size={24} className="careers-file-dropzone-icon" />
                        <div className="careers-file-dropzone-text">
                          Click to upload your Resume or CV
                        </div>
                        <div className="careers-file-dropzone-sub">
                          Supported formats: PDF, DOC, DOCX
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cover Note */}
                  <div className="careers-form-group">
                    <label className="careers-form-label" htmlFor="applicant-note">
                      <span>Brief Introduction / Note</span>
                      <span className="optional-hint">Why Open Idea?</span>
                    </label>
                    <textarea
                      id="applicant-note"
                      rows={3}
                      className="careers-form-textarea"
                      placeholder="Share a brief note about your experience, interests, and how you hope to contribute..."
                      value={formData.coverNote}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, coverNote: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="careers-modal-footer">
                  <button
                    type="button"
                    className="careers-modal-cancel-btn"
                    onClick={handleCloseApplyModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="careers-modal-submit-btn"
                    disabled={isSubmitting || !formData.email || !formData.phone || !formData.resume}
                  >
                    {isSubmitting ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
