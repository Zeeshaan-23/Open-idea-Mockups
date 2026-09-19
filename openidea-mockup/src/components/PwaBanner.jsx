import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { OpenIdeaFlowerSymbol } from './OpenIdeaLogo';

export default function PwaBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [installed, setInstalled] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 40,
      maxWidth: '360px',
      background: 'var(--bg-popover)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.25rem',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      animation: 'slideUp 200ms ease-out'
    }}>
      <div style={{
        width: '46px',
        height: '46px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--brand-navy)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <OpenIdeaFlowerSymbol size={32} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Install Open Idea App
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {installed ? 'App ready on home screen!' : 'Add to home screen for full-screen & offline access.'}
        </div>
        
        {!installed ? (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setInstalled(true)}
              className="btn btn-primary"
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', minHeight: '30px' }}
            >
              <Download size={12} />
              Install
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="btn btn-ghost"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', minHeight: '30px' }}
            >
              Not now
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="btn btn-secondary"
            style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', minHeight: '30px', marginTop: '0.5rem' }}
          >
            Dismiss
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        style={{ color: 'var(--text-muted)', display: 'flex', alignSelf: 'flex-start' }}
      >
        <X size={15} />
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
