import React from 'react';
import { X, ArrowRight, ExternalLink, CheckCircle2, Code2, Database, ShieldAlert, Sparkles } from 'lucide-react';

export default function ActionSimulationModal({ actionData, onClose }) {
  if (!actionData) return null;

  const { destination, label, type, note, query, mode, attachedFiles } = actionData;

  const fullUrl = destination.startsWith('http')
    ? destination
    : `https://openidea.world${destination}`;

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(11, 21, 32, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 200
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-popover)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'var(--bg-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(47, 143, 239, 0.15)',
              color: 'var(--brand-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Action Preserved: {type || 'Navigation'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Functional Verification Modal
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{ color: 'var(--text-muted)', display: 'flex' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto' }}>
          
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
              Action Triggered
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {label}
            </div>
          </div>

          {/* Technical Target Route Box */}
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Code2 size={14} style={{ color: 'var(--brand-blue)' }} />
                Target Route in Production
              </span>
              <span className="badge" style={{ fontSize: '0.6875rem' }}>
                Route Verified
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.875rem',
              color: 'var(--brand-blue)',
              wordBreak: 'break-all',
              background: 'var(--bg-subtle)',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              {destination}
            </div>
          </div>

          {/* If prompt payload exists */}
          {query && (
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                Prompt Query Parameter
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', maxHeight: '120px', overflowY: 'auto', lineHeight: 1.5 }}>
                "{query}"
              </div>
            </div>
          )}

          {/* If attached files exist */}
          {attachedFiles && attachedFiles.length > 0 && (
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <Database size={13} style={{ color: 'var(--brand-cyan)' }} />
                <span>Session Storage Payload (`sessionStorage.uploadedFileContext`)</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                {attachedFiles.map((f) => (
                  <span key={f.id} className="badge" style={{ fontSize: '0.75rem' }}>
                    {f.name} ({f.size})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Operational Note */}
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.125rem' }} />
            <span>
              {note || `In the live Next.js application, this interaction seamlessly transitions to ${destination}. All parameter states and context are fully preserved.`}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Stay in Mockup
            </button>
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1.3 }}
            >
              <span>Test Live Route</span>
              <ExternalLink size={15} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
