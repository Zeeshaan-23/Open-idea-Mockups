import React from 'react';
import { OpenIdeaFlowerSymbol } from './OpenIdeaLogo';
import { Compass, Sparkles, Share2, Users, HeartHandshake, ArrowRight, FileText, Award } from 'lucide-react';

export default function EcosystemPhilosophy({ onNavigateAction }) {
  const pillars = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Access verified research, open datasets, and global problems that deserve serious attention.',
      icon: Compass,
      route: '/openresources'
    },
    {
      step: '02',
      title: 'Build',
      desc: 'Turn ideas into functional software rapidly with AI-assisted studio scaffolding and modern codebases.',
      icon: Sparkles,
      route: '/studio'
    },
    {
      step: '03',
      title: 'Share',
      desc: 'Publish your work into the open commons so others can inspect, learn from, and fork your solutions.',
      icon: Share2,
      route: '/projects'
    },
    {
      step: '04',
      title: 'Collaborate',
      desc: 'Connect with researchers, engineers, and domain specialists around shared technical challenges.',
      icon: Users,
      route: '/intern-fellowship'
    },
    {
      step: '05',
      title: 'Contribute',
      desc: 'Improve the platform, submit benchmark evaluations, and participate in peer fellowship initiatives.',
      icon: HeartHandshake,
      route: '/contribute'
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto var(--space-2xl)' }}>
          <div className="section-kicker" style={{ justifyContent: 'center' }}>
            <OpenIdeaFlowerSymbol size={16} />
            The Open Flywheel
          </div>
          <h2 className="section-title">
            Innovation belongs in the open.
          </h2>
          <p className="section-subtitle">
            Closed silos duplicate effort. Open Idea connects research, engineering, and execution so progress compounds for everyone.
          </p>
        </div>

        {/* 5-Step Horizontal Chain Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {pillars.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="card card-hover"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => onNavigateAction({ destination: item.route, label: item.title, type: 'Ecosystem Route' })}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
                      {item.step}
                    </span>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)'
                    }}>
                      <IconComp size={16} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--brand-blue)',
                  marginTop: '1rem'
                }}>
                  <span>Explore</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Initiatives Banner */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(19, 178, 207, 0.12)',
              color: 'var(--brand-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Open Idea Fellowship & Academic Residency
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Funded grants and technical mentorship for student researchers and open-source engineers.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => onNavigateAction({ destination: '/researchwhitepaper', label: 'Research Whitepaper', type: 'Academic Document' })}
              className="btn btn-secondary"
              style={{ fontSize: '0.8125rem', padding: '0.4rem 0.875rem' }}
            >
              <FileText size={14} />
              Whitepaper
            </button>
            <button
              type="button"
              onClick={() => onNavigateAction({ destination: '/intern-fellowship', label: 'Fellowship Application', type: 'Fellowship Intake' })}
              className="btn btn-primary"
              style={{ fontSize: '0.8125rem', padding: '0.4rem 1rem' }}
            >
              Apply for Fellowship
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
