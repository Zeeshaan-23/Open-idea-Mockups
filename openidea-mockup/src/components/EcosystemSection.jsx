import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EcosystemSection({ onNavigateAction }) {
  const pathways = [
    {
      num: '01',
      verb: 'Explore',
      domain: 'Open Resources',
      desc: 'Verified research papers, open datasets, and technical standards.',
      cta: 'Browse resources',
      route: '/openresources'
    },
    {
      num: '02',
      verb: 'Build',
      domain: 'Studio',
      desc: 'AI-assisted workspace to build functional web applications with exportable code.',
      cta: 'Open Studio',
      route: '/studio'
    },
    {
      num: '03',
      verb: 'Connect',
      domain: 'Projects & Community',
      desc: 'Public project repository, fellowship initiatives, and open-source collaboration.',
      cta: 'Explore projects',
      route: '/projects'
    }
  ];

  const handleAction = (e, path) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: path.route,
        label: `${path.verb}: ${path.domain}`,
        type: 'Ecosystem Pathway',
        note: `Navigating to ${path.domain} gateway via ${path.route}`
      });
    }
  };

  return (
    <section className="ecosystem-section" id="ecosystem" aria-label="Ecosystem Pathways">
      <div className="ecosystem-container">
        
        {/* Section Header */}
        <div className="ecosystem-header">
          <div className="ecosystem-kicker">
            The Architecture
          </div>
          <h2 className="ecosystem-statement">
            Three ways to start.
          </h2>
        </div>

        {/* Editorial Triptych */}
        <div className="ecosystem-grid">
          {pathways.map((item) => (
            <div key={item.num} className="ecosystem-col">
              <div>
                <div className="ecosystem-num" aria-hidden="true">
                  {item.num}
                </div>
                <h3 className="ecosystem-verb">
                  {item.verb}
                </h3>
                <div className="ecosystem-domain">
                  {item.domain}
                </div>
                <p className="ecosystem-desc">
                  {item.desc}
                </p>
              </div>

              <div>
                <a
                  href={item.route}
                  onClick={(e) => handleAction(e, item)}
                  className="ecosystem-link"
                >
                  <span>{item.cta}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
