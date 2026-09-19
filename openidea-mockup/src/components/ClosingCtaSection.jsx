import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ClosingCtaSection({ onNavigateAction }) {
  const handlePrimaryClick = (e) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: '/studio',
        label: 'Open Studio',
        type: 'Studio Application Scaffolding',
        note: 'Navigating to Open Idea Studio (/studio)'
      });
    }
  };

  const handleSecondaryClick = (e) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: '/openresources',
        label: 'Browse Open Resources',
        type: 'Open Resources Directory',
        note: 'Navigating to Open Resources (/openresources)'
      });
    }
  };

  return (
    <section className="closing-cta-section" id="start" aria-label="Closing Call to Action">
      <div className="closing-cta-container">
        <h2 className="closing-cta-title">
          Start with an idea. <span className="serif-italic">Build something real.</span>
        </h2>
        
        <p className="closing-cta-desc">
          Start building in Studio, or explore verified open resources.
        </p>

        <div className="closing-cta-actions">
          <a
            href="/studio"
            onClick={handlePrimaryClick}
            className="closing-primary-btn"
            id="closing-cta-studio-btn"
          >
            <span>Open Studio</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>

          <a
            href="/openresources"
            onClick={handleSecondaryClick}
            className="closing-secondary-link"
            id="closing-cta-resources-link"
          >
            <span>Browse open resources</span>
            <ArrowRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
