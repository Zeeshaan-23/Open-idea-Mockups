import React, { useState, useEffect } from 'react';
import {
  Check,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  CreditCard,
  Tag,
  Clock,
  RotateCcw,
  Headphones,
  FileCode2,
  ExternalLink,
  ChevronDown,
  Info,
  X,
  CheckCircle2,
  Globe2,
  Zap,
  Building2,
  Coins
} from 'lucide-react';
import {
  PRICING_PLANS,
  BESPOKE_WEBSITE_OFFERING,
  PRICING_FAQS,
  COMPARISON_CATEGORIES,
  STUDIO_CREDIT_MATH
} from '../data/pricingData';
import '../styles/pricing.css';

export default function PricingPage({ onNavigate }) {
  // Currency & Payment Gateway State ('razorpay' = INR, 'stripe' = USD)
  const [gateway, setGateway] = useState('razorpay');
  const currency = gateway === 'razorpay' ? 'INR' : 'USD';

  // Active Category View: 'all' | 'platform' | 'websites' | 'comparison'
  const [activeCategory, setActiveCategory] = useState('all');

  // Affiliate / Partner Referral Code
  const [affiliateCode, setAffiliateCode] = useState(() => {
    try {
      return sessionStorage.getItem('ecosyz_affiliate_code') || '';
    } catch {
      return '';
    }
  });

  // Simulated Checkout Modal State
  const [checkoutModal, setCheckoutModal] = useState(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutSuccessNotice, setCheckoutSuccessNotice] = useState(null);

  // Sync Affiliate code with sessionStorage
  const handleAffiliateChange = (e) => {
    const val = e.target.value.trim().toUpperCase();
    setAffiliateCode(val);
    try {
      if (val) {
        sessionStorage.setItem('ecosyz_affiliate_code', val);
      } else {
        sessionStorage.removeItem('ecosyz_affiliate_code');
      }
    } catch {}
  };

  // Open Checkout Simulation
  const handleOpenCheckout = (plan) => {
    setCheckoutModal({
      planId: plan.id || plan.name,
      title: plan.name,
      priceLabel: currency === 'INR' ? plan.priceLabelInr : plan.priceLabelUsd,
      priceValue: currency === 'INR' ? plan.priceInr : plan.priceUsd,
      period: plan.period,
      type: plan.id ? 'Platform Subscription' : 'Turnkey Website Package',
      isWebsite: !plan.id
    });
  };

  // Confirm Simulated Checkout
  const handleConfirmCheckout = (e) => {
    e.preventDefault();
    setIsProcessingCheckout(true);

    setTimeout(() => {
      setIsProcessingCheckout(false);
      const planName = checkoutModal.title;
      setCheckoutModal(null);
      setCheckoutSuccessNotice({
        title: `${planName} Activated (Simulation)`,
        message: `Your sandbox account has been provisioned with ${planName} capabilities. No charge was incurred.`
      });
      setTimeout(() => setCheckoutSuccessNotice(null), 6000);
    }, 1200);
  };

  return (
    <div className="pricing-page-wrapper" role="main" aria-label="Open Idea Pricing and Commercial Model">
      <div className="pricing-container-max">

        {/* 1. EDITORIAL HEADER */}
        <header className="pricing-header">
          <div className="pricing-kicker">
            <Sparkles size={13} aria-hidden="true" />
            <span>Commercial Model · Transparent Access</span>
          </div>

          <h1 className="pricing-headline">
            Clear, open access <span className="pricing-headline-serif">— built for builders.</span>
          </h1>

          <p className="pricing-subheading">
            Self-service platform access for research and AI application scaffolding, paired with turnkey engineering services for custom business websites.
          </p>
        </header>

        {/* Success Notice if prototype subscription was completed */}
        {checkoutSuccessNotice && (
          <div
            style={{
              background: 'rgba(22, 163, 74, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="#16a34a" />
              <div>
                <strong style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{checkoutSuccessNotice.title}</strong>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{checkoutSuccessNotice.message}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCheckoutSuccessNotice(null)}
              style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
              aria-label="Dismiss notice"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* 2. CONTROLS BAR: GATEWAY TOGGLE & PARTNER REFERRAL CODE */}
        <div className="pricing-controls-bar" aria-label="Currency and Referral Controls">
          {/* Payment Gateway & Currency Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Billing Currency:
            </span>
            <div className="pricing-gateway-toggle" role="radiogroup" aria-label="Select Billing Currency and Gateway">
              <button
                type="button"
                role="radio"
                aria-checked={gateway === 'razorpay'}
                onClick={() => setGateway('razorpay')}
                className={`gateway-toggle-btn ${gateway === 'razorpay' ? 'active' : ''}`}
                title="Pay in INR via Razorpay (UPI, Netbanking, Cards)"
              >
                <span>₹ INR · Razorpay (UPI & Cards)</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={gateway === 'stripe'}
                onClick={() => setGateway('stripe')}
                className={`gateway-toggle-btn ${gateway === 'stripe' ? 'active' : ''}`}
                title="Pay in USD via Stripe (International Cards)"
              >
                <span>$ USD · Stripe (International)</span>
              </button>
            </div>
          </div>

          {/* Referral / Affiliate Partner Input */}
          <div className="pricing-partner-box">
            <span style={{ fontSize: '0.78125rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Partner Code:
            </span>
            <div className="partner-input-wrapper">
              <Tag size={13} className="partner-input-icon" aria-hidden="true" />
              <input
                id="affiliate-code-input"
                type="text"
                value={affiliateCode}
                onChange={handleAffiliateChange}
                placeholder="E.G. EC123456"
                className="partner-code-input"
                aria-label="Enter Partner or Affiliate Code"
              />
            </div>
            {affiliateCode && (
              <span className="partner-status-tag" title="5% partner referral credit will be recorded">
                <Check size={12} strokeWidth={2.5} />
                <span>5% Partner Credit Active</span>
              </span>
            )}
          </div>
        </div>

        {/* 3. OFFERING CATEGORY SELECTOR */}
        <nav className="pricing-tabs-nav" aria-label="Pricing Offering Category">
          <div className="pricing-tabs-group" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`pricing-tab-item ${activeCategory === 'all' ? 'active' : ''}`}
            >
              <Layers size={14} />
              <span>All Offerings</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'platform'}
              onClick={() => setActiveCategory('platform')}
              className={`pricing-tab-item ${activeCategory === 'platform' ? 'active' : ''}`}
            >
              <Zap size={14} />
              <span>Platform & Studio Access</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'websites'}
              onClick={() => setActiveCategory('websites')}
              className={`pricing-tab-item ${activeCategory === 'websites' ? 'active' : ''}`}
            >
              <Globe2 size={14} />
              <span>Turnkey Websites (₹25,000)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'comparison'}
              onClick={() => setActiveCategory('comparison')}
              className={`pricing-tab-item ${activeCategory === 'comparison' ? 'active' : ''}`}
            >
              <Coins size={14} />
              <span>Feature Comparison</span>
            </button>
          </div>
        </nav>

        {/* 4. PLATFORM SUBSCRIPTION CARDS (FREE, STUDENT, PLUS, ENTERPRISE) */}
        {(activeCategory === 'all' || activeCategory === 'platform') && (
          <section aria-labelledby="platform-plans-title">
            <div style={{ marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 id="platform-plans-title" style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Platform & Studio Access
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: '0.84375rem', color: 'var(--text-secondary)' }}>
                  Monthly self-service subscriptions for researchers, developers, and product teams.
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Billed monthly · Cancel anytime
              </span>
            </div>

            <div className="pricing-plans-grid">
              {PRICING_PLANS.map((plan) => {
                const priceDisplay = currency === 'INR' ? plan.priceLabelInr : plan.priceLabelUsd;
                const altDisplay = currency === 'INR'
                  ? (plan.priceUsd !== null ? `≈ ${plan.priceLabelUsd} USD` : '')
                  : (plan.priceInr !== null ? `≈ ${plan.priceLabelInr} INR` : '');

                return (
                  <article
                    key={plan.id}
                    className={`pricing-card ${plan.isPopular ? 'is-popular' : ''}`}
                    aria-label={`${plan.name} Plan`}
                  >
                    {plan.badge && (
                      <span className="pricing-card-badge">{plan.badge}</span>
                    )}

                    <header className="pricing-card-header">
                      <span className="pricing-card-kicker">{plan.kicker}</span>
                      <h3 className="pricing-card-name">{plan.name}</h3>
                      <p className="pricing-card-audience">{plan.audience}</p>
                    </header>

                    <div className="pricing-card-price-row">
                      <span className="pricing-card-price">{priceDisplay}</span>
                      {plan.priceInr !== null && (
                        <span className="pricing-card-period">{plan.period}</span>
                      )}
                    </div>

                    <div className="pricing-card-alt-currency">
                      {altDisplay || 'Contract pricing for organizations'}
                    </div>

                    {/* Studio Monthly Allowance Badge */}
                    <div className="pricing-studio-badge">
                      <div className="studio-badge-label">
                        <FileCode2 size={13} color="var(--brand-blue)" />
                        <span>{plan.studio.label}</span>
                      </div>
                      <span className="studio-badge-detail">
                        {plan.studio.creditGrant
                          ? `${plan.studio.creditGrant.toLocaleString()} credits · Up to ${plan.studio.maxFiles} files`
                          : 'Custom credits & unlimited files'}
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="pricing-features-list">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="pricing-feature-item">
                          <Check size={14} className="pricing-feature-icon" strokeWidth={2.4} aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    {plan.id === 'free' ? (
                      <button
                        type="button"
                        onClick={() => onNavigate && onNavigate('/auth?plan=free')}
                        className="pricing-cta-btn secondary"
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : plan.id === 'enterprise' ? (
                      <button
                        type="button"
                        onClick={() => onNavigate && onNavigate('/contact?enquiry=enterprise')}
                        className="pricing-cta-btn secondary"
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenCheckout(plan)}
                        className={`pricing-cta-btn ${plan.isPopular ? 'featured' : 'primary'}`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. BESPOKE TURNKEY WEBSITE SERVICE SECTION */}
        {(activeCategory === 'all' || activeCategory === 'websites') && (
          <section className="bespoke-website-section" aria-labelledby="bespoke-website-title">
            <div className="bespoke-website-card">
              {/* Top Row: Title & Price */}
              <div className="bespoke-card-top-row">
                <div className="bespoke-headline-group">
                  <div className="bespoke-eyebrow">
                    <Globe2 size={13} aria-hidden="true" />
                    <span>Turnkey Engineering · Production Website</span>
                  </div>
                  <h2 id="bespoke-website-title" className="bespoke-title">
                    {BESPOKE_WEBSITE_OFFERING.name}
                  </h2>
                  <p className="bespoke-desc">
                    {BESPOKE_WEBSITE_OFFERING.tagline} {BESPOKE_WEBSITE_OFFERING.note}
                  </p>
                </div>

                <div className="bespoke-price-box">
                  <span className="bespoke-price-label">{BESPOKE_WEBSITE_OFFERING.priceLabelInr}</span>
                  <span className="bespoke-price-subtext">One-time turnkey engagement</span>
                  <div className="bespoke-meta-pills">
                    <span className="bespoke-meta-pill">
                      <Clock size={11} style={{ marginRight: 4, display: 'inline' }} />
                      {BESPOKE_WEBSITE_OFFERING.delivery}
                    </span>
                    <span className="bespoke-meta-pill">
                      <RotateCcw size={11} style={{ marginRight: 4, display: 'inline' }} />
                      {BESPOKE_WEBSITE_OFFERING.revisions}
                    </span>
                    <span className="bespoke-meta-pill">
                      <Headphones size={11} style={{ marginRight: 4, display: 'inline' }} />
                      {BESPOKE_WEBSITE_OFFERING.support}
                    </span>
                  </div>
                </div>
              </div>

              {/* Deliverables 17 features grid */}
              <h3 className="bespoke-deliverables-heading">
                Everything Included in the ₹25,000 Turnkey Package:
              </h3>
              <div className="bespoke-features-grid">
                {BESPOKE_WEBSITE_OFFERING.features.map((feat, idx) => (
                  <div key={idx} className="bespoke-feature-item">
                    <Check size={14} color="var(--brand-cyan)" strokeWidth={2.4} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Transparent Exclusions & Commercial Conditions from Production */}
              <div className="bespoke-conditions-box">
                <h4 className="conditions-heading">
                  Transparent Commercial Conditions & Exclusions:
                </h4>
                <div className="conditions-list">
                  {BESPOKE_WEBSITE_OFFERING.conditions.map((cond, idx) => (
                    <div key={idx} className="condition-item">
                      <span className="condition-strong">{cond.label}: </span>
                      <span>{cond.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="bespoke-cta-row">
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  Prefer to consult and scope first? Start with a <strong style={{ color: 'var(--text-primary)' }}>₹500 refundable scoping deposit</strong> credited to your final project.
                </div>
                <div className="bespoke-actions-group">
                  <button
                    type="button"
                    onClick={() => handleOpenCheckout(BESPOKE_WEBSITE_OFFERING)}
                    className="pricing-cta-btn primary"
                    style={{ minWidth: 200 }}
                  >
                    <span>Order Business Website</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('/websites')}
                    className="pricing-cta-btn secondary"
                  >
                    <span>Explore Websites Showcase</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. APP STUDIO USAGE & FAIR CHARGING POLICY */}
        {(activeCategory === 'all' || activeCategory === 'platform') && (
          <section className="studio-guarantee-panel" aria-labelledby="studio-policy-title">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand-blue)', marginBottom: 6 }}>
                <ShieldCheck size={14} />
                <span>Fair Usage & Credit Policy</span>
              </div>
              <h2 id="studio-policy-title" className="guarantee-title">
                Transparent Studio build mechanics.
              </h2>
              <p className="guarantee-desc">
                {STUDIO_CREDIT_MATH.note}
              </p>
              <div className="guarantee-points">
                <div className="guarantee-point-item">
                  <Check size={13} color="#16a34a" strokeWidth={2.4} />
                  <span><strong>Zero vendor lock-in:</strong> Every scaffold exports clean React 19 source code that you own 100%.</span>
                </div>
                <div className="guarantee-point-item">
                  <Check size={13} color="#16a34a" strokeWidth={2.4} />
                  <span><strong>Error protection:</strong> A run that encounters a model failure or fails to build is never charged.</span>
                </div>
                <div className="guarantee-point-item">
                  <Check size={13} color="#16a34a" strokeWidth={2.4} />
                  <span><strong>Clear resets:</strong> All allowances refresh cleanly at 00:00 UTC on the 1st of each calendar month.</span>
                </div>
              </div>
            </div>

            <div className="guarantee-formula-card">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Credit Conversion Architecture
              </span>
              <div className="formula-row">
                <span className="formula-label">New Application Build:</span>
                <span className="formula-val">{STUDIO_CREDIT_MATH.buildCost} credits</span>
              </div>
              <div className="formula-row">
                <span className="formula-label">Code Modification / Edit:</span>
                <span className="formula-val">{STUDIO_CREDIT_MATH.editCost} credits</span>
              </div>
              <div className="formula-row">
                <span className="formula-label">Safety Buffer Multiplier:</span>
                <span className="formula-val">{STUDIO_CREDIT_MATH.multiplier}x grant coverage</span>
              </div>
              <div style={{ fontSize: '0.71875rem', color: 'var(--text-muted)', paddingTop: 6, borderTop: '1px solid var(--border-subtle)', lineHeight: 1.4 }}>
                Calculated to ensure every included build and edit can be fully completed without mid-generation halts.
              </div>
            </div>
          </section>
        )}

        {/* 7. FULL FEATURE COMPARISON TABLE */}
        {(activeCategory === 'all' || activeCategory === 'comparison') && (
          <section aria-labelledby="comparison-table-title">
            <div style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
              <h2 id="comparison-table-title" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Comprehensive Plan Comparison
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Evaluate every specification across workspace limits, App Studio capacity, and technical infrastructure.
              </p>
            </div>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="col-feature">Plan Specification</th>
                    <th className="col-tier">Free (₹0)</th>
                    <th className="col-tier">Student (₹200)</th>
                    <th className="col-tier">Plus (₹999)</th>
                    <th className="col-tier">Enterprise (Custom)</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_CATEGORIES.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="comparison-category-row">
                        <td colSpan={5}>{cat.category}</td>
                      </tr>
                      {cat.items.map((item, itemIdx) => (
                        <tr key={itemIdx}>
                          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</td>
                          <td className="col-tier">{item.free}</td>
                          <td className="col-tier">{item.student}</td>
                          <td className="col-tier" style={{ fontWeight: 600, color: 'var(--brand-navy)' }}>{item.plus}</td>
                          <td className="col-tier">{item.enterprise}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 8. COMMERCIAL FAQ SECTION */}
        <section className="pricing-faq-section" aria-labelledby="pricing-faq-title">
          <h2 id="pricing-faq-title" className="pricing-faq-heading">
            Frequently Asked Questions
          </h2>

          <div className="pricing-faq-grid">
            {PRICING_FAQS.map((faq, idx) => (
              <div key={idx} className="faq-card">
                <h3 className="faq-q">{faq.q}</h3>
                <p className="faq-a">{faq.a}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Have custom organizational requirements or research inquiries?{' '}
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/support')}
                style={{ color: 'var(--brand-blue)', fontWeight: 600, textDecoration: 'underline' }}
              >
                Contact our engineering team
              </button>
            </p>
          </div>
        </section>

      </div>

      {/* 9. PROTOTYPE CHECKOUT SIMULATION MODAL */}
      {checkoutModal && (
        <div
          className="checkout-modal-overlay"
          onClick={() => setCheckoutModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
        >
          <div
            className="checkout-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="checkout-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCard size={18} color="var(--brand-blue)" />
                <h3 id="checkout-modal-title" style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Simulated Order Checkout
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutModal(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="checkout-modal-body">
              <div className="checkout-summary-card">
                <div className="checkout-row">
                  <span className="checkout-row-label">Selected Offering:</span>
                  <span className="checkout-row-val">{checkoutModal.title}</span>
                </div>
                <div className="checkout-row">
                  <span className="checkout-row-label">Category:</span>
                  <span className="checkout-row-val">{checkoutModal.type}</span>
                </div>
                <div className="checkout-row">
                  <span className="checkout-row-label">Payment Gateway:</span>
                  <span className="checkout-row-val">
                    {gateway === 'razorpay' ? 'Razorpay (UPI / Netbanking / Cards)' : 'Stripe (International USD)'}
                  </span>
                </div>
                <div className="checkout-row" style={{ paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <span className="checkout-row-label" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Total Due:</span>
                  <span className="checkout-row-val" style={{ fontSize: '1.125rem', color: 'var(--brand-blue)' }}>
                    {checkoutModal.priceLabel} {checkoutModal.period && checkoutModal.period !== 'contract' ? checkoutModal.period : ''}
                  </span>
                </div>
                {affiliateCode && (
                  <div className="checkout-row" style={{ fontSize: '0.78125rem', color: '#16a34a' }}>
                    <span>Partner Tag ({affiliateCode}):</span>
                    <span>5% Referral Credited</span>
                  </div>
                )}
              </div>

              <div className="checkout-disclaimer">
                <strong>Prototype Environment:</strong> This action simulates the production payment integration (Razorpay / Stripe) in the local mockup. No real payment charge or financial transaction will occur.
              </div>

              <button
                type="button"
                onClick={handleConfirmCheckout}
                disabled={isProcessingCheckout}
                className="checkout-confirm-btn"
              >
                {isProcessingCheckout ? (
                  <span>Provisioning Sandbox...</span>
                ) : (
                  <>
                    <span>Confirm Prototype Activation</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
