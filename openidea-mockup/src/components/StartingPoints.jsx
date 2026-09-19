import React from 'react';
import { Layout, UserCheck, ShoppingBag, Briefcase, ArrowUpRight, Sparkles } from 'lucide-react';

export default function StartingPoints({ onSelectPrompt }) {
  const starters = [
    {
      id: 'saas',
      title: 'SaaS Product Landing',
      subtitle: 'TaskFlow Engineering Platform',
      desc: 'Sticky nav with CTA, 3-stat bar, 6-feature grid with icons, 3-tier pricing matrix, and testimonials.',
      icon: Layout,
      color: '#2F8FEF',
      badge: 'Web App',
      prompt: 'Build a SaaS landing page for "TaskFlow" — a project management tool for engineering teams.\n\nSections: sticky nav with "TaskFlow" logo + Get Started CTA, hero with gradient text headline "Ship 10x faster with AI-powered project management", 3-stat bar (10K+ teams, 99.9% uptime, 50ms response), 6-feature grid with icons (Sprint Planning, Code Reviews, CI/CD Integration, Team Analytics, Slack Integration, API Access), pricing table with 3 tiers (Free $0/mo, Pro $29/mo, Enterprise custom), 3 testimonials from engineering leaders, dark CTA section "Ready to transform your workflow?", footer with 4 columns.\n\nStyle: Modern minimal. Clean whitespace, gray-900 buttons, blue-600 accent sparingly. Professional and trustworthy. Hover transitions on all cards.'
    },
    {
      id: 'portfolio',
      title: 'AI Engineer Portfolio',
      subtitle: 'Alex Chen · Full-Stack & ML',
      desc: 'Dark elegance portfolio with 4 featured project showcases, technical skills badges, and contact workflow.',
      icon: UserCheck,
      color: '#13B2CF',
      badge: 'Portfolio',
      prompt: 'Build a developer portfolio for "Alex Chen" — a full-stack engineer specializing in AI/ML products.\n\nSections: dark sticky nav with name + Resume/Contact links, hero with large gradient text "I build AI products that scale" + "Full-Stack Engineer · San Francisco" subtitle, featured projects grid (4 projects: AI Chat Platform, ML Pipeline Dashboard, Real-time Analytics Engine, Open Source CLI Tool — each with tech tags, description, and link buttons), skills section (React, TypeScript, Python, AWS, etc. as styled badges), about section with professional bio, dark CTA "Let\'s build something together" with email link, minimal dark footer.\n\nStyle: Dark elegance theme. bg-gray-950 entire page, emerald-400 accent glows, cards with border-gray-800 hover:border-emerald-500/30. Sophisticated, developer-focused.'
    },
    {
      id: 'ecommerce',
      title: 'Minimalist Storefront',
      subtitle: 'Elevate Sustainable Fashion',
      desc: 'Clean editorial storefront with curated product grid, shopping bag interaction, and sustainability narrative.',
      icon: ShoppingBag,
      color: '#8C88D5',
      badge: 'Storefront',
      prompt: 'Build an e-commerce storefront for "Elevate" — a premium minimalist clothing brand.\n\nSections: clean nav with "ELEVATE" logo + Shop/Collections/About links + cart icon, hero with full-width image placeholder and "Designed for the Modern Minimalist" headline, featured collection (4 product cards with image placeholder, name, price, "Add to Cart" button with hover effect), "Why Elevate" section with 3 value props (Sustainable Materials, Timeless Design, Free Returns), newsletter signup with email input, customer reviews (3 cards), footer with shop links, social icons, and newsletter.\n\nStyle: Modern minimal with bold typography. Lots of whitespace, text-gray-900 dominant, clean product cards with subtle hover shadows. No bright colors — let the products speak.'
    },
    {
      id: 'agency',
      title: 'Digital Product Studio',
      subtitle: 'Pixel & Code Creative Agency',
      desc: 'Bold vibrant agency site with high-impact hero, client proof metrics (+340% conversion), and multi-step process timeline.',
      icon: Briefcase,
      color: '#1B3C53',
      badge: 'Agency',
      prompt: 'Build a website for "Pixel & Code" — a digital product agency that builds SaaS apps.\n\nSections: sticky nav with gradient logo text + Work/Services/About/Contact links, hero with bold headline "We turn ideas into products people love" + violet-to-indigo gradient accent text + "See our work" and "Start a project" dual CTAs, client logos bar ("Trusted by" with 6 placeholder logo boxes), 3 case study cards (each with project image placeholder, client name, result metric like "+340% conversion"), services grid (Product Strategy, UI/UX Design, Full-Stack Development, Growth & Analytics — with icons), team section with 4 member cards (avatar placeholder, name, role), process timeline (Discovery → Design → Develop → Launch), dark CTA section, gradient footer.\n\nStyle: Bold vibrant. violet-600→indigo-600 gradients, energetic hover animations, shadow-violet-500/25 on buttons, rounded-2xl cards with shadow-lg. Stripe/Notion quality.'
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="section-kicker">
            <Sparkles size={14} />
            Instant Creation
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Start from a proven foundation.
              </h2>
              <p className="section-subtitle">
                Explore pre-engineered blueprints. Load any structure into Studio to customize it in real time.
              </p>
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              4 Production Blueprints
            </div>
          </div>
        </div>

        {/* 4 Editorial Starter Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          {starters.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="card card-hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onSelectPrompt(item.prompt);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div>
                  {/* Card Header: Icon + Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color
                    }}>
                      <IconComponent size={20} />
                    </div>
                    <span className="badge" style={{ fontSize: '0.6875rem' }}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--brand-blue)', marginBottom: '0.625rem' }}>
                    {item.subtitle}
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.875rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--brand-blue)'
                }}>
                  <span>Load into Studio</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
