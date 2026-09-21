import React, { useState } from 'react';
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Layers,
  Sparkles,
  Cpu,
  Users,
  Compass
} from 'lucide-react';
import {
  NEWSLETTER_META,
  NEWSLETTER_STREAMS,
  CONTEXTUAL_REFERRALS
} from '../data/newsletterData';
import '../styles/newsletter.css';

export default function NewsletterPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage(null);

    try {
      const res = await fetch(NEWSLETTER_META.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: trimmed })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Subscription failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = (destination) => {
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  const getStreamIcon = (id) => {
    switch (id) {
      case 'product-updates':
        return <Cpu size={16} className="stream-icon" aria-hidden="true" />;
      case 'ai-news':
        return <Sparkles size={16} className="stream-icon" aria-hidden="true" />;
      case 'community-highlights':
        return <Users size={16} className="stream-icon" aria-hidden="true" />;
      case 'early-access':
        return <Layers size={16} className="stream-icon" aria-hidden="true" />;
      default:
        return <Compass size={16} className="stream-icon" aria-hidden="true" />;
    }
  };

  return (
    <div className="newsletter-page">
      <div className="newsletter-container">

        {/* ------------------------------------------------------------------
            1. Editorial Header
            ------------------------------------------------------------------ */}
        <header className="newsletter-header">
          <div className="newsletter-badge-pill">
            <Mail size={13} aria-hidden="true" />
            <span>Open Idea Publication Desk</span>
          </div>

          <h1 className="newsletter-title">
            {NEWSLETTER_META.title} <span className="serif-accent">— {NEWSLETTER_META.titleAccent}</span>
          </h1>

          <p className="newsletter-tagline">
            {NEWSLETTER_META.tagline}
          </p>
        </header>

        {/* ------------------------------------------------------------------
            2. Main Subscription Module
            ------------------------------------------------------------------ */}
        <section className="newsletter-subscribe-module" aria-label="Newsletter Subscription Form">
          <div className="newsletter-module-content">
            <p className="newsletter-pitch">
              {NEWSLETTER_META.description}
            </p>

            {/* Status Notifications */}
            {status === 'success' && (
              <div className="newsletter-status-box newsletter-status-success" role="status">
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                <div>
                  <strong>Subscribed Successfully</strong>
                  <div>{NEWSLETTER_META.successMessage}</div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="newsletter-status-box newsletter-status-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} aria-hidden="true" />
                <div>
                  <strong>Subscription Error</strong>
                  <div>
                    {NEWSLETTER_META.errorMessage}{' '}
                    <a href={NEWSLETTER_META.fallbackEmailHref}>
                      {NEWSLETTER_META.fallbackEmail}
                    </a>
                    .
                  </div>
                </div>
              </div>
            )}

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="newsletter-form-container">
              <div className="newsletter-field-group">
                <label htmlFor="newsletter-email" className="newsletter-input-label">
                  Email address
                </label>
                <div className="newsletter-input-action-row">
                  <div className="newsletter-input-wrapper">
                    <Mail size={18} className="newsletter-input-icon" aria-hidden="true" />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                      className="newsletter-input"
                      autoComplete="email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="newsletter-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock size={16} className="animate-spin" aria-hidden="true" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send size={14} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="newsletter-privacy-note">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>{NEWSLETTER_META.privacyNote}</span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            3. What Arrives in the Dispatch (4 Verified Content Streams)
            ------------------------------------------------------------------ */}
        <section className="newsletter-streams-section" aria-labelledby="streams-heading">
          <div className="streams-header">
            <h2 id="streams-heading" className="streams-title">
              What Arrives in the Dispatch
            </h2>
            <p className="streams-subtitle">
              Strictly focused on research, platform scaffolding, and open innovation breakthroughs.
            </p>
          </div>

          <div className="streams-grid">
            {NEWSLETTER_STREAMS.map((stream) => (
              <article key={stream.id} className="stream-card">
                <div className="stream-top-row">
                  <span className="stream-number">{stream.number}</span>
                  {getStreamIcon(stream.id)}
                </div>
                <h3 className="stream-title">{stream.title}</h3>
                <p className="stream-summary">{stream.summary}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
            4. Quiet Ecosystem Referrals
            ------------------------------------------------------------------ */}
        <nav className="newsletter-referrals" aria-label="Ecosystem Navigation">
          <div className="referrals-grid">
            {CONTEXTUAL_REFERRALS.map((ref) => (
              <div key={ref.href} className="referral-card">
                <div>
                  <h3 className="referral-title">{ref.title}</h3>
                  <p className="referral-desc">{ref.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAction(ref.href)}
                  className="referral-action-btn"
                >
                  <span>{ref.actionLabel}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </nav>

      </div>
    </div>
  );
}
