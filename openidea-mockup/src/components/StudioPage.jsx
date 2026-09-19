import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Layers,
  FileCode2,
  FolderTree,
  Sliders,
  Copy,
  Check,
  Download,
  RotateCcw,
  Paperclip,
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import { AGRISENSE_SPECIFICATION } from '../data/mockStudioData';
import '../styles/studio.css';

export default function StudioPage({ onNavigate, initialDescription = '' }) {
  const spec = AGRISENSE_SPECIFICATION;

  // Prompt input state (prefilled from URL or default Agrisense prompt)
  const [promptText, setPromptText] = useState(() => {
    return initialDescription || spec.defaultPrompt;
  });

  // Attached context files (read from sessionStorage or added in Studio)
  const [attachedFiles, setAttachedFiles] = useState(() => {
    try {
      const stored = sessionStorage.getItem('uploadedFileContext');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const fileInputRef = useRef(null);

  // Active workstation tab: 'preview' | 'arch' | 'code' | 'tokens'
  const [activeTab, setActiveTab] = useState('preview');

  // Interactive preview state: nodes and valve relay
  const [nodes, setNodes] = useState(spec.nodes);
  const [valveOpen, setValveOpen] = useState(true);

  // Refinement simulation state
  const [isRefining, setIsRefining] = useState(false);
  const [refineStep, setRefineStep] = useState('');

  // Export notification / feedback state
  const [copiedCode, setCopiedCode] = useState(false);
  const [exportNotice, setExportNotice] = useState(null);

  // Sync initial description if it changes
  useEffect(() => {
    if (initialDescription) {
      setPromptText(initialDescription);
    }
  }, [initialDescription]);

  // Handle adding context file
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newEntries = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type || 'context'
    }));

    const updated = [...attachedFiles, ...newEntries];
    setAttachedFiles(updated);
    try {
      sessionStorage.setItem('uploadedFileContext', JSON.stringify(updated));
    } catch {}

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle removing context file
  const handleRemoveFile = (index) => {
    const updated = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updated);
    try {
      sessionStorage.setItem('uploadedFileContext', JSON.stringify(updated));
    } catch {}
  };

  // Simulate prompt refinement / scaffolding update
  const handleRefineSubmit = (e) => {
    if (e) e.preventDefault();
    if (isRefining) return;

    setIsRefining(true);
    setRefineStep('Analyzing specification constraints...');

    setTimeout(() => {
      setRefineStep('Scaffolding React 19 components & CSS tokens...');
    }, 600);

    setTimeout(() => {
      setIsRefining(false);
      setRefineStep('');
      setExportNotice({
        title: 'Scaffold Updated',
        message: 'Components re-composed to match updated prompt constraints.'
      });
      setTimeout(() => setExportNotice(null), 4000);
    }, 1400);
  };

  // Reset specification to default
  const handleResetSpec = () => {
    setPromptText(spec.defaultPrompt);
    setValveOpen(true);
    setExportNotice({
      title: 'Specification Reset',
      message: 'Restored default Agrisense IoT telemetry baseline.'
    });
    setTimeout(() => setExportNotice(null), 3000);
  };

  // Interactive valve toggle
  const handleToggleValve = () => {
    setValveOpen((prev) => !prev);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard?.writeText(spec.sourceCode).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2400);
    });
  };

  // Simulate downloading archive
  const handleDownloadArchive = () => {
    setExportNotice({
      title: 'Simulated Export (Prototype)',
      message: 'Generated clean React 19 archive (agrisense-starter.zip) with standard CSS tokens.'
    });
    setTimeout(() => setExportNotice(null), 5000);
  };

  return (
    <div className="studio-workspace-page" role="main" aria-label="Open Idea Studio Workspace">
      <div className="studio-workspace-container">

        {/* 1. WORKSPACE EDITORIAL HEADER */}
        <header className="studio-workspace-header">
          <div className="studio-header-meta-row">
            <div className="studio-header-kicker">
              <Sparkles size={13} aria-hidden="true" />
              <span>Studio Workspace · Application Scaffolding</span>
            </div>

            <div className="studio-header-status-pill">
              <span className="studio-header-status-dot" aria-hidden="true" />
              <span>Generated from Specification</span>
            </div>
          </div>

          <div className="studio-header-headline-row">
            <div>
              <h1 className="studio-header-title">
                {spec.title}
                <span className="studio-header-serif">— usable software.</span>
              </h1>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {spec.subtitle} · 100% portable React 19 source code without vendor lock-in.
              </p>
            </div>

            <div className="studio-header-actions">
              <button
                type="button"
                onClick={handleCopyCode}
                className="studio-btn-action studio-btn-secondary"
                aria-label="Copy source code"
              >
                {copiedCode ? (
                  <>
                    <Check size={14} style={{ color: '#10B981' }} aria-hidden="true" />
                    <span>JSX Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    <span>Copy JSX</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadArchive}
                className="studio-btn-action studio-btn-primary"
                aria-label="Export project archive"
              >
                <Download size={14} aria-hidden="true" />
                <span>Export Code</span>
              </button>
            </div>
          </div>
        </header>

        {/* 2. SPECIFICATION & CONTEXT CONSOLE */}
        <section className="studio-spec-console" aria-label="Application Specification Console">
          <div className="studio-spec-label-row">
            <span className="studio-spec-label">
              <Sparkles size={13} style={{ color: 'var(--brand-cyan)' }} aria-hidden="true" />
              <span>Natural-Language Specification</span>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={handleResetSpec}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.74rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RotateCcw size={11} aria-hidden="true" />
                <span>Reset to Baseline</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleRefineSubmit} className="studio-spec-input-box">
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Describe app requirements or refine UI specifications..."
              className="studio-spec-input"
              aria-label="Application specification prompt"
            />

            <button
              type="submit"
              disabled={isRefining}
              className={`studio-spec-refine-btn ${isRefining ? 'loading' : ''}`}
            >
              <span>{isRefining ? refineStep : 'Refine Scaffold'}</span>
            </button>
          </form>

          {/* Uploaded Context & File Attachment Row */}
          <div className="studio-context-chips-row">
            <span className="studio-context-label">Context:</span>

            {attachedFiles.length > 0 ? (
              attachedFiles.map((file, idx) => (
                <span key={idx} className="studio-context-chip">
                  <Paperclip size={11} aria-hidden="true" />
                  <span>{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(idx)}
                    className="studio-context-chip-remove"
                    aria-label={`Remove context file ${file.name}`}
                  >
                    <X size={11} aria-hidden="true" />
                  </button>
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                No external context attached.
              </span>
            )}

            <label className="studio-attach-file-label">
              <Paperclip size={11} aria-hidden="true" />
              <span>Attach Context File</span>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                aria-label="Upload context file"
              />
            </label>
          </div>

          {/* Prototype feedback toast */}
          {exportNotice && (
            <div
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px',
                fontSize: '0.78rem',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              role="status"
            >
              <CheckCircle2 size={14} style={{ color: '#10B981', flexShrink: 0 }} aria-hidden="true" />
              <div>
                <strong>{exportNotice.title}:</strong> {exportNotice.message}
              </div>
            </div>
          )}
        </section>

        {/* 3. WORKBENCH VIEW TABS (PREVIEW, ARCHITECTURE, CODE, TOKENS) */}
        <div className="studio-workbench-view">
          
          <nav className="studio-workbench-tabs-nav" aria-label="Studio inspection views">
            <div className="studio-workbench-tabs-list" role="tablist">
              <button
                type="button"
                role="tab"
                id="tab-preview"
                aria-selected={activeTab === 'preview'}
                aria-controls="panel-preview"
                onClick={() => setActiveTab('preview')}
                className={`studio-workbench-tab ${activeTab === 'preview' ? 'active' : ''}`}
              >
                <Layers size={14} aria-hidden="true" />
                <span>Application Preview</span>
                <span className="studio-workbench-tab-badge">Interactive</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-arch"
                aria-selected={activeTab === 'arch'}
                aria-controls="panel-arch"
                onClick={() => setActiveTab('arch')}
                className={`studio-workbench-tab ${activeTab === 'arch' ? 'active' : ''}`}
              >
                <FolderTree size={14} aria-hidden="true" />
                <span>Architecture & Hierarchy</span>
                <span className="studio-workbench-tab-badge">{spec.components.length} files</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-code"
                aria-selected={activeTab === 'code'}
                aria-controls="panel-code"
                onClick={() => setActiveTab('code')}
                className={`studio-workbench-tab ${activeTab === 'code' ? 'active' : ''}`}
              >
                <FileCode2 size={14} aria-hidden="true" />
                <span>Generated Source Code</span>
                <span className="studio-workbench-tab-badge">React 19</span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-tokens"
                aria-selected={activeTab === 'tokens'}
                aria-controls="panel-tokens"
                onClick={() => setActiveTab('tokens')}
                className={`studio-workbench-tab ${activeTab === 'tokens' ? 'active' : ''}`}
              >
                <Sliders size={14} aria-hidden="true" />
                <span>Design Tokens</span>
                <span className="studio-workbench-tab-badge">{spec.tokens.length} variables</span>
              </button>
            </div>

            <div className="studio-workbench-submeta">
              <span>Stack:</span>
              <strong style={{ color: 'var(--text-secondary)' }}>{spec.framework}</strong>
            </div>
          </nav>

          {/* TAB 1: LIVE APPLICATION PREVIEW */}
          {activeTab === 'preview' && (
            <div
              className="studio-preview-pane"
              id="panel-preview"
              role="tabpanel"
              aria-labelledby="tab-preview"
            >
              <div className="studio-preview-window-frame">
                {/* Window Chrome */}
                <div className="studio-preview-chrome">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: 'var(--border-card)' }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: 'var(--border-card)' }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: 'var(--border-card)' }} />
                  </div>

                  <div className="studio-chrome-url">
                    <span>https://</span>
                    <span>{spec.blueprintPath}</span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Live Preview
                  </div>
                </div>

                {/* Application Interior */}
                <div className="studio-app-interior">
                  <div className="studio-app-header-strip">
                    <div className="studio-app-title-group">
                      <div className="studio-app-pulse" aria-hidden="true" />
                      <h2 className="studio-app-title">Agrisense IoT Telemetry Monitor</h2>
                    </div>

                    <div className="studio-app-meta-badges">
                      <span className="studio-app-badge">Mesh: 1.0 Hz Nominal</span>
                      <span className="studio-app-badge">4 Nodes Reporting</span>
                    </div>
                  </div>

                  {/* Sensor Nodes & Valve Actuator Grid */}
                  <div className="studio-nodes-grid">
                    {nodes.map((node) => (
                      <article key={node.id} className="studio-node-card">
                        <div className="studio-node-head">
                          <div className="studio-node-info">
                            <span className="studio-node-id">{node.id}</span>
                            <span className="studio-node-zone">{node.zone} · {node.depth}</span>
                          </div>
                          <span className="studio-node-status">● {node.status}</span>
                        </div>

                        <div className="studio-node-metrics-list">
                          {node.moisture && (
                            <div className="studio-node-metric-row">
                              <span className="studio-node-metric-key">Soil Moisture:</span>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="studio-node-metric-val">{node.moisture}</span>
                                <div className="studio-metric-bar" aria-hidden="true">
                                  <div
                                    className="studio-metric-bar-fill"
                                    style={{ width: `${node.moistureNum}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {node.temp && (
                            <div className="studio-node-metric-row">
                              <span className="studio-node-metric-key">Temperature:</span>
                              <span className="studio-node-metric-val">{node.temp}</span>
                            </div>
                          )}

                          {node.humidity && (
                            <div className="studio-node-metric-row">
                              <span className="studio-node-metric-key">Humidity:</span>
                              <span className="studio-node-metric-val">{node.humidity}</span>
                            </div>
                          )}

                          <div className="studio-node-metric-row">
                            <span className="studio-node-metric-key">Power Source:</span>
                            <span className="studio-node-metric-val">{node.power}</span>
                          </div>
                        </div>
                      </article>
                    ))}

                    {/* Interactive Valve Actuator Card */}
                    <article className="studio-node-card actuator">
                      <div className="studio-node-head">
                        <div className="studio-node-info">
                          <span className="studio-node-id">Relay-03</span>
                          <span className="studio-node-zone">Sector 3 · Drip Line Actuator</span>
                        </div>
                        <span className="studio-node-status" style={{ color: valveOpen ? '#10B981' : 'var(--text-muted)' }}>
                          ● {valveOpen ? 'Active' : 'Standby'}
                        </span>
                      </div>

                      <div className="studio-node-metrics-list">
                        <div className="studio-node-metric-row">
                          <span className="studio-node-metric-key">Irrigation Flow:</span>
                          <span className="studio-node-metric-val">{valveOpen ? '14.2 L/min' : '0.0 L/min'}</span>
                        </div>

                        <div className="studio-valve-control-row">
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            Actuator State:
                          </span>
                          <button
                            type="button"
                            onClick={handleToggleValve}
                            className={`studio-valve-btn ${valveOpen ? 'open' : 'closed'}`}
                            aria-label="Toggle Solenoid Valve"
                          >
                            {valveOpen ? 'Valve Open (Click to Close)' : 'Valve Closed (Click to Open)'}
                          </button>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE & HIERARCHY */}
          {activeTab === 'arch' && (
            <div
              className="studio-arch-pane"
              id="panel-arch"
              role="tabpanel"
              aria-labelledby="tab-arch"
            >
              {/* Architecture specs grid */}
              <div className="studio-arch-specs-band">
                {spec.specs.map((item) => (
                  <div key={item.label} className="studio-arch-spec-item">
                    <span className="studio-arch-spec-lbl">{item.label}</span>
                    <span className="studio-arch-spec-val">{item.value}</span>
                    <span className="studio-arch-spec-note">{item.note}</span>
                  </div>
                ))}
              </div>

              {/* Component files table */}
              <div>
                <div style={{ marginBottom: '8px', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                  Scaffolded File & Component Tree
                </div>

                <table className="studio-components-table">
                  <thead>
                    <tr>
                      <th>File & Component</th>
                      <th>Type</th>
                      <th>Size</th>
                      <th>Description</th>
                      <th>Props / Contract</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spec.components.map((comp) => (
                      <tr key={comp.name}>
                        <td className="studio-comp-name">{comp.name}</td>
                        <td>
                          <span className="studio-comp-type-pill">{comp.type}</span>
                        </td>
                        <td style={{ fontFamily: 'monospace' }}>{comp.size}</td>
                        <td>{comp.description}</td>
                        <td style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                          {comp.props.join(' · ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GENERATED SOURCE CODE */}
          {activeTab === 'code' && (
            <div
              className="studio-code-pane"
              id="panel-code"
              role="tabpanel"
              aria-labelledby="tab-code"
            >
              <div className="studio-code-pane-header">
                <span className="studio-code-filename">
                  <FileCode2 size={14} style={{ color: 'var(--brand-blue)' }} aria-hidden="true" />
                  <span>src/components/AgrisenseTelemetry.jsx</span>
                </span>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="studio-btn-action studio-btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {copiedCode ? (
                    <>
                      <Check size={12} style={{ color: '#10B981' }} aria-hidden="true" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} aria-hidden="true" />
                      <span>Copy JSX</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="studio-code-pre-box">
                <code>{spec.sourceCode}</code>
              </pre>
            </div>
          )}

          {/* TAB 4: DESIGN TOKENS */}
          {activeTab === 'tokens' && (
            <div
              className="studio-tokens-pane"
              id="panel-tokens"
              role="tabpanel"
              aria-labelledby="tab-tokens"
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
                CSS Custom Properties (agrisense-tokens.css)
              </div>

              <table className="studio-tokens-table">
                <thead>
                  <tr>
                    <th>CSS Custom Property</th>
                    <th>Value</th>
                    <th>Role in Design System</th>
                  </tr>
                </thead>
                <tbody>
                  {spec.tokens.map((tok) => (
                    <tr key={tok.token}>
                      <td className="studio-token-name">{tok.token}</td>
                      <td>
                        <div className="studio-token-color-cell">
                          {tok.value.startsWith('#') && (
                            <span
                              className="studio-token-swatch"
                              style={{ backgroundColor: tok.value }}
                              aria-hidden="true"
                            />
                          )}
                          <span style={{ fontFamily: 'monospace' }}>{tok.value}</span>
                        </div>
                      </td>
                      <td>{tok.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* 4. EXPORT & ZERO LOCK-IN GUARANTEE STRIP */}
        <section className="studio-ownership-strip" aria-label="Code Ownership and Export">
          <div className="studio-ownership-content">
            <ShieldCheck size={20} className="studio-ownership-icon" aria-hidden="true" />
            <div>
              <h3 className="studio-ownership-title">Direct Code Ownership & Zero Lock-in</h3>
              <p className="studio-ownership-desc">
                Everything scaffolded in Studio is pure, portable code under the MIT license. There are no proprietary
                cloud runtimes, telemetry proxies, or mandatory backend dependencies. You can run this directly with{' '}
                <code>npm run dev</code> on Vite or Next.js.
              </p>
              <div className="studio-prototype-disclaimer">
                Prototype notice: Code generation and export packaging are simulated client-side for demonstration.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleCopyCode}
              className="studio-btn-action studio-btn-secondary"
            >
              <Copy size={13} aria-hidden="true" />
              <span>Copy Component JSX</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadArchive}
              className="studio-btn-action studio-btn-primary"
            >
              <Download size={13} aria-hidden="true" />
              <span>Download ZIP Archive</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
