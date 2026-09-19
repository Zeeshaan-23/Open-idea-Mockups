import React, { useState } from 'react';
import { MessageSquare, X, Send, Bug, Lightbulb, HelpCircle, CheckCircle2 } from 'lucide-react';

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState('message'); // 'message' | 'contact' | 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 'message') {
      if (!message.trim()) return;
      setStep('contact');
    } else if (step === 'contact') {
      if (!email.trim() || !phone.trim()) return;
      setIsSubmitting(true);

      // Simulate Supabase Edge Function: send-email to sohni2012@gmail.com
      setTimeout(() => {
        setIsSubmitting(false);
        setStep('success');
      }, 700);
    }
  };

  const handleReset = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('message');
      setMessage('');
      setEmail('');
      setPhone('');
      setCategory('general');
    }, 300);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
      {/* Floating Trigger Button with Subtle Pulse */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open support and feedback chat"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--brand-gradient)',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 8px 24px rgba(47, 143, 239, 0.35)',
            transition: 'all var(--transition-base)',
            minHeight: '44px'
          }}
          className="support-pulse-btn"
        >
          <MessageSquare size={17} />
          <span>Support & Feedback</span>
        </button>
      )}

      {/* Interactive Modal / Popover */}
      {isOpen && (
        <div style={{
          width: 'calc(100vw - 32px)',
          maxWidth: '360px',
          background: 'var(--bg-popover)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'chatPop 200ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'var(--bg-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Support & Feedback
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Direct line to Open Idea founders
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Close chat"
              style={{ color: 'var(--text-muted)', display: 'flex', padding: '0.25rem' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '1.25rem' }}>
            {step === 'message' && (
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  What would you like to share?
                </div>

                {/* Category Pills */}
                <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem' }}>
                  {[
                    { id: 'bug', label: 'Bug Report', icon: Bug, color: '#EF4444' },
                    { id: 'feature', label: 'Feature Idea', icon: Lightbulb, color: '#F59E0B' },
                    { id: 'general', label: 'Other', icon: HelpCircle, color: 'var(--brand-blue)' },
                  ].map((c) => {
                    const IconC = c.icon;
                    const isSel = category === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCategory(c.id)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.375rem',
                          padding: '0.4rem 0.25rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          border: isSel ? `1px solid ${c.color}` : '1px solid var(--border-card)',
                          background: isSel ? 'var(--bg-subtle)' : 'transparent',
                          color: isSel ? c.color : 'var(--text-secondary)'
                        }}
                      >
                        <IconC size={12} />
                        <span>{c.label}</span>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit}>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      category === 'bug'
                        ? 'Describe what happened and how to reproduce it...'
                        : category === 'feature'
                        ? 'Describe the feature you would love to see...'
                        : 'How can we help you today?'
                    }
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      resize: 'none',
                      outline: 'none',
                      marginBottom: '1rem'
                    }}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', minHeight: '40px', fontSize: '0.875rem' }}
                  >
                    <span>Next: Add Contact Details</span>
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}

            {step === 'contact' && (
              <form onSubmit={handleSubmit}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Please provide your email and phone so we can follow up with your resolution:
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep('message')}
                    className="btn btn-secondary"
                    style={{ flex: 1, minHeight: '40px', fontSize: '0.8125rem' }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    style={{ flex: 2, minHeight: '40px', fontSize: '0.8125rem' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send to Team'}
                  </button>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <CheckCircle2 size={28} />
                </div>
                <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Thank you!
                </h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Your submission has been dispatched to <strong>info@openidea.world</strong>. Our core engineering team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ width: '100%', minHeight: '38px', fontSize: '0.8125rem' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .support-pulse-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(47, 143, 239, 0.45);
        }
        @keyframes chatPop {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
