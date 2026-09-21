import React, { useState } from 'react';
import {
  MessageSquare,
  Download,
  ExternalLink,
  Copy,
  Check,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { LinkedinIcon } from './BrandIcons';
import {
  FOUNDER_COORDINATES,
  WHATSAPP_DIRECT_URL,
  EDITORIAL_PREMISE,
  IA_DISTINCTION
} from '../data/founderContactData';
import '../styles/founder-contact.css';

export default function FounderContactPage({ onNavigate }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  };

  const handleAction = (destination) => {
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  return (
    <div className="founder-contact-page">
      <div className="founder-contact-container">

        {/* ------------------------------------------------------------------
            1. Editorial Header
            ------------------------------------------------------------------ */}
        <header className="founder-header">
          <div className="founder-badge-pill">
            <Compass size={13} aria-hidden="true" />
            <span>Executive Direct Line</span>
          </div>

          <h1 className="founder-title">
            Founder Contact <span className="serif-accent">— Sony Yadav</span>
          </h1>

          <p className="founder-subtitle">
            {EDITORIAL_PREMISE.lead}
          </p>

          <div className="founder-note-pill">
            <ShieldCheck size={15} style={{ color: 'var(--brand-blue, #2F8FEF)' }} aria-hidden="true" />
            <span>Verified executive communication channel. Strictly for direct founder correspondence.</span>
          </div>
        </header>

        {/* ------------------------------------------------------------------
            2. Verified Production Channels Triptych
               (WhatsApp Direct QR, Contact Card Download, Platform Mission)
            ------------------------------------------------------------------ */}
        <div className="founder-grid">

          {/* Column 1: WhatsApp Direct Channel & QR Code */}
          <div className="founder-card founder-card-qr">
            <div>
              <div className="coordinate-label" style={{ justifyContent: 'center', marginBottom: '0.25rem' }}>
                <MessageSquare size={14} style={{ color: '#10b981' }} aria-hidden="true" />
                <span>Instant Messaging</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                Message on WhatsApp
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                Scan with your mobile camera or launch WhatsApp directly with pre-composed context.
              </p>
            </div>

            <div className="qr-wrapper">
              <img
                src="/founder/qr-code.svg"
                alt="Scan QR code to message founder Sony Yadav directly on WhatsApp"
                className="qr-image"
                width={140}
                height={140}
                loading="eager"
              />
            </div>

            <div style={{ width: '100%' }}>
              <div className="qr-caption">Direct WhatsApp Gateway</div>
              <a
                href={WHATSAPP_DIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="founder-wa-action-btn"
                aria-label="Open conversation with Sony Yadav on WhatsApp"
              >
                <span>Open in WhatsApp</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Digital Contact Card Preview & Download */}
          <div className="founder-card founder-card-visual">
            <div>
              <div className="coordinate-label" style={{ marginBottom: '0.25rem' }}>
                <ShieldCheck size={14} style={{ color: 'var(--brand-blue)' }} aria-hidden="true" />
                <span>Verified Asset</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                Digital Contact Card
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                Official high-resolution Open Idea founder credential card for press, archives, or contact records.
              </p>
            </div>

            <div className="card-preview-box">
              <img
                src={FOUNDER_COORDINATES.cardImage}
                alt="Sony Yadav — Founder contact card with details"
                className="card-preview-img"
                loading="lazy"
              />
            </div>

            <a
              href={FOUNDER_COORDINATES.cardImage}
              download={FOUNDER_COORDINATES.cardDownloadFilename}
              className="founder-download-btn"
              aria-label="Download Sony Yadav Open Idea Contact Card as PNG"
            >
              <Download size={15} aria-hidden="true" />
              <span>Download Contact Card</span>
            </a>
          </div>

          {/* Column 3: Platform Context Card */}
          <div className="founder-card founder-card-platform">
            <div>
              <div className="coordinate-label" style={{ marginBottom: '0.25rem' }}>
                <Compass size={14} style={{ color: 'var(--brand-lavender)' }} aria-hidden="true" />
                <span>Platform Context</span>
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
                Open Idea Platform
              </h3>
              <p className="platform-desc">
                An open innovation infrastructure uniting research provenance, AI software scaffolding, open datasets, and bespoke engineering.
              </p>
            </div>

            <div className="platform-preview-box">
              <img
                src={FOUNDER_COORDINATES.logoImage}
                alt="Open Idea — Innovation Platform"
                className="card-preview-img"
                loading="lazy"
              />
            </div>

            <div className="platform-link-row">
              <span>Corporate Desk</span>
              <a
                href={`mailto:${FOUNDER_COORDINATES.companyEmail}`}
                aria-label="Email Open Idea institutional inbox"
              >
                <span>{FOUNDER_COORDINATES.companyEmail}</span>
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------------
            3. Direct Verified Coordinates Strip
            ------------------------------------------------------------------ */}
        <section className="coordinates-section" aria-labelledby="direct-coordinates-heading">
          <div className="coordinates-header">
            <div>
              <h2 id="direct-coordinates-heading" className="coordinates-title">
                Verified Executive Coordinates
              </h2>
              <span className="coordinates-caption">
                One-click direct contact lines and copyable credentials
              </span>
            </div>
            <div className="coordinate-label">
              <LinkedinIcon size={14} aria-hidden="true" />
              <a
                href={FOUNDER_COORDINATES.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>{FOUNDER_COORDINATES.name} on LinkedIn</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="coordinates-grid">
            
            {/* Phone Coordinate */}
            <div className="coordinate-item">
              <div className="coordinate-label">
                <Phone size={13} aria-hidden="true" />
                <span>Direct Phone</span>
              </div>
              <a
                href={FOUNDER_COORDINATES.phoneHref}
                className="coordinate-value"
                title="Call Sony Yadav"
              >
                {FOUNDER_COORDINATES.phoneDisplay}
              </a>
              <div className="coordinate-actions">
                <button
                  type="button"
                  className={`coord-action-btn ${copiedKey === 'phone' ? 'copied' : ''}`}
                  onClick={() => handleCopy(FOUNDER_COORDINATES.phoneDisplay, 'phone')}
                  aria-label="Copy direct phone number"
                >
                  {copiedKey === 'phone' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Personal / Direct Email */}
            <div className="coordinate-item">
              <div className="coordinate-label">
                <Mail size={13} aria-hidden="true" />
                <span>Founder Email</span>
              </div>
              <a
                href={`mailto:${FOUNDER_COORDINATES.email}`}
                className="coordinate-value"
                title="Email Sony Yadav directly"
              >
                {FOUNDER_COORDINATES.email}
              </a>
              <div className="coordinate-actions">
                <button
                  type="button"
                  className={`coord-action-btn ${copiedKey === 'email' ? 'copied' : ''}`}
                  onClick={() => handleCopy(FOUNDER_COORDINATES.email, 'email')}
                  aria-label="Copy founder direct email"
                >
                  {copiedKey === 'email' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedKey === 'email' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="coordinate-item">
              <div className="coordinate-label">
                <LinkedinIcon size={13} aria-hidden="true" />
                <span>LinkedIn</span>
              </div>
              <a
                href={FOUNDER_COORDINATES.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="coordinate-value"
                title="Open LinkedIn Profile"
              >
                {FOUNDER_COORDINATES.linkedinDisplay}
              </a>
              <div className="coordinate-actions">
                <button
                  type="button"
                  className={`coord-action-btn ${copiedKey === 'linkedin' ? 'copied' : ''}`}
                  onClick={() => handleCopy(FOUNDER_COORDINATES.linkedinUrl, 'linkedin')}
                  aria-label="Copy LinkedIn profile URL"
                >
                  {copiedKey === 'linkedin' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedKey === 'linkedin' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Company Desk Email */}
            <div className="coordinate-item">
              <div className="coordinate-label">
                <Mail size={13} aria-hidden="true" />
                <span>Company Desk</span>
              </div>
              <a
                href={`mailto:${FOUNDER_COORDINATES.companyEmail}`}
                className="coordinate-value"
                title="Email Open Idea institutional inbox"
              >
                {FOUNDER_COORDINATES.companyEmail}
              </a>
              <div className="coordinate-actions">
                <button
                  type="button"
                  className={`coord-action-btn ${copiedKey === 'companyEmail' ? 'copied' : ''}`}
                  onClick={() => handleCopy(FOUNDER_COORDINATES.companyEmail, 'companyEmail')}
                  aria-label="Copy company email address"
                >
                  {copiedKey === 'companyEmail' ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copiedKey === 'companyEmail' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------------
            4. Information Architecture Switchboard
               (/founder-contact vs /contact)
            ------------------------------------------------------------------ */}
        <section className="ia-distinction-section" aria-labelledby="ia-distinction-heading">
          <div className="ia-section-header">
            <h2 id="ia-distinction-heading" className="ia-section-title">
              Choosing the Right Communication Channel
            </h2>
            <p className="ia-section-desc">
              Open Idea maintains distinct pathways for personal executive dialogue versus institutional service delivery.
            </p>
          </div>

          <div className="ia-columns-wrapper">

            {/* Column A: Founder Direct Desk (Current Route) */}
            <div className="ia-column-card" style={{ borderTop: '3px solid var(--brand-blue, #2F8FEF)' }}>
              <div>
                <div className="ia-column-header">
                  <div className="ia-col-kicker">{IA_DISTINCTION.founderPath.kicker}</div>
                  <h3 className="ia-col-title">{IA_DISTINCTION.founderPath.title}</h3>
                  <p className="ia-col-purpose">{IA_DISTINCTION.founderPath.purpose}</p>
                </div>

                <ul className="ia-list">
                  {IA_DISTINCTION.founderPath.bestFor.map((item, idx) => (
                    <li key={idx} className="ia-list-item">
                      <Check size={14} className="ia-list-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-hairline)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Active Page: Direct Executive Line
                </span>
              </div>
            </div>

            {/* Column B: Institutional Desk (/contact) */}
            <div className="ia-column-card" style={{ borderTop: '3px solid #1B3C53' }}>
              <div>
                <div className="ia-column-header">
                  <div className="ia-col-kicker">{IA_DISTINCTION.institutionalPath.kicker}</div>
                  <h3 className="ia-col-title">{IA_DISTINCTION.institutionalPath.title}</h3>
                  <p className="ia-col-purpose">{IA_DISTINCTION.institutionalPath.purpose}</p>
                </div>

                <ul className="ia-list">
                  {IA_DISTINCTION.institutionalPath.bestFor.map((item, idx) => (
                    <li key={idx} className="ia-list-item">
                      <ArrowRight size={14} className="ia-list-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="ia-redirect-btn"
                onClick={() => handleAction('/contact')}
              >
                <span>{IA_DISTINCTION.institutionalPath.actionLabel}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------------
            5. Contextual Editorial Navigation Links
            ------------------------------------------------------------------ */}
        <nav className="founder-footer-nav" aria-label="Founder Context Navigation">
          <button
            type="button"
            className="founder-footer-nav-link"
            onClick={() => handleAction('/about')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            <span>Learn About Institutional Provenance & Pillars</span>
            <ArrowRight size={13} aria-hidden="true" />
          </button>

          <span style={{ color: 'var(--border-hairline)' }}>•</span>

          <button
            type="button"
            className="founder-footer-nav-link"
            onClick={() => handleAction('/contact')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
          >
            <span>General, Sales & Enterprise Support Desk</span>
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </nav>

      </div>
    </div>
  );
}
