import React from 'react';
import { Globe, ArrowRight, Check } from 'lucide-react';

export default function WebsitesOffering({ onNavigateAction }) {
  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: '/websites',
        label: 'Bespoke Websites',
        type: 'Product Destination',
        note: 'Navigating to bespoke websites offering (/websites)'
      });
    }
  };

  return (
    <section className="websites-service-section" id="websites" aria-label="Bespoke Website Services">
      <div className="websites-container">
        
        <div className="websites-band-card">
          
          {/* Left Column: Proposition & Capabilities */}
          <div className="websites-band-content">
            <div className="websites-kicker">
              <Globe size={13} aria-hidden="true" />
              <span>Bespoke Web Engineering</span>
            </div>

            <h2 className="websites-title">
              Need a website?
            </h2>

            <div className="websites-serif-subheading">
              We can build it for you.
            </div>

            <p className="websites-desc">
              We design, engineer, and deploy production-grade websites for organizations that need a high-performance web presence.
            </p>

            <div className="websites-tags-row">
              <span className="websites-tag-pill">
                <Check size={12} aria-hidden="true" />
                <span>Custom React Architecture</span>
              </span>
              <span className="websites-tag-pill">
                <Check size={12} aria-hidden="true" />
                <span>Mobile & SEO Optimized</span>
              </span>
              <span className="websites-tag-pill">
                <Check size={12} aria-hidden="true" />
                <span>Full Code Ownership</span>
              </span>
            </div>
          </div>

          {/* Right Column: Direct Intake Action */}
          <div className="websites-band-action">
            <a
              href="/websites"
              onClick={handleCtaClick}
              className="websites-cta-btn"
            >
              <span>Start a Website Project</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
            <span className="websites-subtext">
              Direct intake review with engineering leads
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
