import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Terminal, Code, Activity } from 'lucide-react';

export default function StudioShowcaseSection({ onNavigateAction }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'sensors' | 'export'

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

  const sensorNodes = [
    {
      id: 'Node 01',
      zone: 'Zone A · Topsoil Array',
      moisture: '42%',
      moistureNum: 42,
      temp: '24.2°C',
      power: '88% Solar',
      status: 'Active',
      telemetry: 'Moisture: 42% · Temp: 24.2°C'
    },
    {
      id: 'Node 02',
      zone: 'Zone B · Root Depth',
      moisture: '38%',
      moistureNum: 38,
      temp: '25.8°C',
      power: '94% Solar',
      status: 'Active',
      telemetry: 'Moisture: 38% · Temp: 25.8°C'
    },
    {
      id: 'Hub 03',
      zone: 'Canopy & Valve Relay',
      flow: '14.2 L/min',
      valve: 'Open',
      power: 'Main Grid',
      status: 'Active',
      telemetry: 'Flow: 14.2 L/min · Valve: Open'
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

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
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
            <div 
              className="studio-app-window" 
              role="region" 
              aria-label="Agrisense IoT Telemetry Generated Application Preview"
            >
              
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

              {/* App Canvas Interior (2D Interactive Tabbed Mode) */}
              <div className="studio-canvas-interior">
                  
                  {/* App Interior Navbar */}
                  <div className="studio-canvas-navbar">
                    <div className="studio-canvas-brand">
                      <div className="studio-canvas-indicator" aria-hidden="true" />
                      <span>Agrisense Telemetry</span>
                    </div>

                    <div className="studio-canvas-tabs" role="tablist" aria-label="Studio preview views">
                      <button
                        type="button"
                        role="tab"
                        id="studio-tab-overview"
                        aria-selected={activeTab === 'overview'}
                        aria-controls="studio-panel-overview"
                        onClick={() => handleTabClick('overview')}
                        className={`studio-canvas-tab ${activeTab === 'overview' ? 'active' : ''}`}
                      >
                        Overview
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id="studio-tab-sensors"
                        aria-selected={activeTab === 'sensors'}
                        aria-controls="studio-panel-sensors"
                        onClick={() => handleTabClick('sensors')}
                        className={`studio-canvas-tab ${activeTab === 'sensors' ? 'active' : ''}`}
                      >
                        Sensors
                      </button>
                      <button
                        type="button"
                        role="tab"
                        id="studio-tab-export"
                        aria-selected={activeTab === 'export'}
                        aria-controls="studio-panel-export"
                        onClick={() => handleTabClick('export')}
                        className={`studio-canvas-tab ${activeTab === 'export' ? 'active' : ''}`}
                      >
                        Export
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: OVERVIEW */}
                  {activeTab === 'overview' && (
                    <div 
                      className="studio-tab-panel studio-tab-overview" 
                      id="studio-panel-overview" 
                      role="tabpanel" 
                      aria-labelledby="studio-tab-overview"
                    >
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

                        {sensorNodes.map((node) => (
                          <div key={node.id} className="studio-telemetry-row">
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{node.id}</div>
                            <div>{node.telemetry}</div>
                            <div>{node.power}</div>
                            <div style={{ textAlign: 'right' }}>
                              <span className="studio-telemetry-status nominal">● {node.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SENSORS */}
                  {activeTab === 'sensors' && (
                    <div 
                      className="studio-tab-panel studio-tab-sensors" 
                      id="studio-panel-sensors" 
                      role="tabpanel" 
                      aria-labelledby="studio-tab-sensors"
                    >
                      <div className="studio-sensors-grid">
                        {sensorNodes.map((node) => (
                          <div key={node.id} className="studio-sensor-card">
                            <div className="studio-sensor-card-header">
                              <span className="studio-sensor-id">{node.id}</span>
                              <span className="studio-telemetry-status nominal">● {node.status}</span>
                            </div>
                            <div className="studio-sensor-zone">{node.zone}</div>
                            
                            <div className="studio-sensor-metrics">
                              {node.moisture && (
                                <div className="studio-sensor-metric-item">
                                  <span className="sensor-metric-label">Soil Moisture</span>
                                  <div className="sensor-metric-bar-wrap">
                                    <div 
                                      className="sensor-metric-bar-fill" 
                                      style={{ width: `${node.moistureNum}%` }} 
                                      aria-hidden="true" 
                                    />
                                  </div>
                                  <span className="sensor-metric-val">{node.moisture}</span>
                                </div>
                              )}
                              {node.temp && (
                                <div className="studio-sensor-metric-item">
                                  <span className="sensor-metric-label">Temperature</span>
                                  <span className="sensor-metric-val">{node.temp}</span>
                                </div>
                              )}
                              {node.flow && (
                                <div className="studio-sensor-metric-item">
                                  <span className="sensor-metric-label">Irrigation Flow</span>
                                  <span className="sensor-metric-val">{node.flow}</span>
                                </div>
                              )}
                              {node.valve && (
                                <div className="studio-sensor-metric-item">
                                  <span className="sensor-metric-label">Solenoid Valve</span>
                                  <span className="sensor-metric-val" style={{ color: '#10B981' }}>{node.valve}</span>
                                </div>
                              )}
                              <div className="studio-sensor-metric-item">
                                <span className="sensor-metric-label">Power Source</span>
                                <span className="sensor-metric-val">{node.power}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="studio-sensors-summary-strip">
                        <div className="sensors-summary-item">
                          <Activity size={13} style={{ color: '#10B981' }} aria-hidden="true" />
                          <span>12 nodes verified in mesh</span>
                        </div>
                        <div className="sensors-summary-item">
                          <span>Broadcast: 1.0 Hz nominal</span>
                        </div>
                        <div className="sensors-summary-item">
                          <span>Mesh protocol: Sub-GHz active</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: EXPORT */}
                  {activeTab === 'export' && (
                    <div 
                      className="studio-tab-panel studio-tab-export" 
                      id="studio-panel-export" 
                      role="tabpanel" 
                      aria-labelledby="studio-tab-export"
                    >
                      <div className="studio-code-header">
                        <div className="studio-code-filename">
                          <Code size={13} aria-hidden="true" />
                          <span>AgrisenseTelemetry.jsx</span>
                          <span className="studio-code-badge">React 19 / JSX</span>
                        </div>
                        <div className="studio-code-tech">CSS Tokens · Zero Proprietary Runtime</div>
                      </div>

                      <pre className="studio-code-view">
{`// Exported from Open Idea Studio
// Clean, portable React component with standard CSS tokens

export function AgrisenseTelemetry({ nodes = [], telemetryRate = "1.0 Hz" }) {
  return (
    <div className="agrisense-app">
      <header className="agrisense-header">
        <StatusBadge status="Nominal" onlineCount={12} rate={telemetryRate} />
      </header>
      <main className="agrisense-grid">
        <TelemetryTable data={nodes} />
      </main>
    </div>
  );
}

// Design tokens generated alongside component
export const agrisenseTokens = {
  statusNominal: '#10B981',
  telemetryBorder: 'var(--border-subtle)',
  telemetryCardBg: 'var(--bg-card)'
};`}
                      </pre>

                      <div className="studio-export-notice">
                        <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} aria-hidden="true" />
                        <span>Export complete, production-grade source code anytime. Runs on Next.js, Vite, or vanilla React.</span>
                      </div>
                    </div>
                  )}

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
