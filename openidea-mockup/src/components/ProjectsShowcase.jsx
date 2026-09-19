import React from 'react';
import { FolderGit2, ArrowRight, ExternalLink, Layers, Code, Users } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

export default function ProjectsShowcase({ onNavigateAction }) {
  // Curated representative projects built on Open Idea
  const projects = [
    {
      id: 'proj-1',
      title: 'Agrisense IoT',
      tagline: 'Open-source Soil Monitoring & Precision Irrigation',
      description: 'Solar-powered agricultural telemetry system using low-cost ESP32 microcontrollers and LoRaWAN mesh communication.',
      category: 'Climate & Hardware',
      tech: ['React', 'Next.js', 'FastAPI', 'LoRaWAN'],
      stars: '420',
      author: 'Aaditya Rao',
      githubUrl: 'https://github.com/Sony17/Ecosyz',
      liveUrl: '/projects'
    },
    {
      id: 'proj-2',
      title: 'BioSynthetica',
      tagline: 'Computational Protein Folding Visualizer',
      description: 'Browser-based 3D molecular structure explorer rendering AlphaFold2 predictions with WebGL shaders and real-time residue metrics.',
      category: 'Biotech',
      tech: ['Three.js', 'React', 'TypeScript', 'WebAssembly'],
      stars: '612',
      author: 'Elena Rostova',
      githubUrl: 'https://github.com/Sony17/Ecosyz',
      liveUrl: '/projects'
    },
    {
      id: 'proj-3',
      title: 'EduGraph',
      tagline: 'Decentralized Knowledge Graph for Public Schools',
      description: 'Interactive concept mapping tool connecting regional curriculum standards to open pedagogical materials across 6 dialects.',
      category: 'Education',
      tech: ['Next.js', 'D3.js', 'Supabase', 'Tailwind'],
      stars: '348',
      author: 'Karthik Menon',
      githubUrl: 'https://github.com/Sony17/Ecosyz',
      liveUrl: '/projects'
    }
  ];

  return (
    <section className="section" id="projects" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="section-kicker">
            <FolderGit2 size={14} />
            Community Creations
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Built in the open. <span className="serif-italic" style={{ color: 'var(--brand-blue)' }}>Shared with everyone.</span>
              </h2>
              <p className="section-subtitle">
                Inspect real solutions launched across the Open Idea network. Clone repositories, fork architectures, or join active developer teams.
              </p>
            </div>
            
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigateAction({ destination: '/projects', label: 'View All Projects', type: 'Product Route' });
              }}
              className="btn btn-secondary"
              style={{ minHeight: 'var(--min-touch-target)' }}
            >
              <span>Explore Projects Directory</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* 3 Major Project Showcases */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="card card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem'
              }}
            >
              <div>
                {/* Category & Stars */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge" style={{ fontSize: '0.6875rem' }}>
                    {proj.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    ★ {proj.stars}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {proj.title}
                </h3>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--brand-blue)', marginBottom: '0.75rem' }}>
                  {proj.tagline}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.6875rem',
                        padding: '0.1875rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.875rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    By {proj.author}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => onNavigateAction({ destination: proj.githubUrl, label: `${proj.title} Repository`, type: 'External GitHub' })}
                      aria-label="GitHub Repository"
                      className="btn btn-ghost"
                      style={{ padding: '0.375rem 0.625rem', minHeight: '36px' }}
                    >
                      <GithubIcon size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigateAction({ destination: `/projects?q=${encodeURIComponent(proj.title)}`, label: `${proj.title} Demo`, type: 'Project Route' })}
                      className="btn btn-primary"
                      style={{ padding: '0.375rem 0.875rem', fontSize: '0.8125rem', minHeight: '36px' }}
                    >
                      <span>Preview</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
