import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';

export default function StudioShowcaseSection({ onNavigateAction }) {
  const specs = [
    {
      title: 'Clean Architecture',
      desc: 'Semantic React components and standard CSS tokens without proprietary lock-in.'
    },
    {
      title: 'Direct Code Ownership',
      desc: 'Export complete, production-grade source code anytime.'
    },
    {
      title: 'Production Ready',
      desc: 'Pre-configured responsive layouts, accessible markup, and verified performance.'
    }
  ];

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: '/studio',
        label: 'Open Studio Gateway',
        type: 'Product Route',
        note: 'Navigating to Open Idea Studio (/studio)'
      });
    }
  };

  return (
    <section className="studio-showcase-section" id="studio" aria-label="Studio Showcase">
      <div className="studio-container">
        
        <div className="studio-grid">
          
          {/* Left Column (38%): Editorial Narrative */}
          <div className="studio-copy-col">
            <div className="studio-kicker">
              <Sparkles size={13} aria-hidden="true" />
              <span>Studio & Scaffolding</span>
            </div>

            <h2 className="studio-title">
              Build with Open Idea
            </h2>
            
            <div className="studio-serif-subheading">
              From an idea to something you can use.
            </div>

            <p className="studio-desc">
              Describe what you want to build. Studio scaffolds functional web applications, configures responsive layouts, and outputs clean code you fully own.
            </p>

            <div className="studio-spec-list">
              {specs.map((item) => (
                <div key={item.title} className="studio-spec-item">
                  <div className="studio-spec-dot" aria-hidden="true" />
                  <div>
                    <span className="studio-spec-title">{item.title}: </span>
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <a
                href="/studio"
                onClick={handleCtaClick}
                className="studio-cta-btn"
              >
                <span>Explore Studio</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column (62%): Large Visual Application Canvas */}
          <div className="studio-visual-col">
            <div className="studio-app-window" role="region" aria-label="Agrisense IoT Telemetry Generated Application Preview">
              
              {/* Window Chrome */}
              <div className="studio-window-chrome">
                <div className="studio-window-dots" aria-hidden="true">
                  <div className="studio-window-dot" />
                  <div className="studio-window-dot" />
                  <div className="studio-window-dot" />
                </div>
                <div className="studio-window-address">
                  studio.openidea.world/workspace/agrisense-iot
                </div>
                <div className="studio-window-badge">
                  Generated Preview
                </div>
              </div>

              {/* App Canvas Interior */}
              <div className="studio-canvas-interior">
                
                {/* App Interior Navbar */}
                <div className="studio-canvas-navbar">
                  <div className="studio-canvas-brand">
                    <div className="studio-canvas-indicator" aria-hidden="true" />
                    <span>Agrisense Telemetry</span>
                  </div>

                  <div className="studio-canvas-tabs" aria-hidden="true">
                    <span className="studio-canvas-tab active">Overview</span>
                    <span className="studio-canvas-tab">Sensors</span>
                    <span className="studio-canvas-tab">Export</span>
                  </div>
                </div>

                {/* Telemetry Summary Cards */}
                <div className="studio-metrics-row">
                  <div className="studio-metric-card">
                    <span className="studio-metric-label">System Status</span>
                    <span className="studio-metric-value">Nominal</span>
                    <span className="studio-metric-sub">12 nodes online</span>
                  </div>
                  <div className="studio-metric-card">
                    <span className="studio-metric-label">Telemetry Rate</span>
                    <span className="studio-metric-value">1.0 Hz</span>
                    <span className="studio-metric-sub">Active mesh stream</span>
                  </div>
                  <div className="studio-metric-card">
                    <span className="studio-metric-label">Code Output</span>
                    <span className="studio-metric-value">Clean React</span>
                    <span className="studio-metric-sub">Zero lock-in</span>
                  </div>
                </div>

                {/* Telemetry Data Table */}
                <div className="studio-telemetry-table" aria-label="Sensor Telemetry Data">
                  <div className="studio-telemetry-head" aria-hidden="true">
                    <div>Node ID</div>
                    <div>Sensor Telemetry</div>
                    <div>Power</div>
                    <div style={{ textAlign: 'right' }}>Status</div>
                  </div>

                  <div className="studio-telemetry-row">
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Node 01</div>
                    <div>Moisture: 42% · Temp: 24.2°C</div>
                    <div>88% Solar</div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="studio-telemetry-status nominal">● Active</span>
                    </div>
                  </div>

                  <div className="studio-telemetry-row">
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Node 02</div>
                    <div>Moisture: 38% · Temp: 25.8°C</div>
                    <div>94% Solar</div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="studio-telemetry-status nominal">● Active</span>
                    </div>
                  </div>

                  <div className="studio-telemetry-row">
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Hub 03</div>
                    <div>Flow: 14.2 L/min · Valve: Open</div>
                    <div>Main Grid</div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="studio-telemetry-status nominal">● Active</span>
                    </div>
                  </div>
                </div>

                {/* App Canvas Footer */}
                <div className="studio-canvas-footer">
                  <div>
                    <span>Blueprint: </span>
                    <span className="studio-canvas-tech-tag">Agrisense IoT Telemetry</span>
                  </div>
                  <div>
                    <span>Architecture: </span>
                    <span className="studio-canvas-tech-tag">Next.js 14 · React 19 · CSS Tokens</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
