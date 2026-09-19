import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CommunitySection({ onNavigateAction }) {
  const pathways = [
    {
      id: 'projects',
      title: 'Projects',
      desc: 'Browse projects built on Open Idea or share what you have created.',
      route: '/projects',
      label: 'Explore projects',
      type: 'Community Projects'
    },
    {
      id: 'contribute',
      title: 'Contribute',
      desc: 'Help improve the platform, documentation, and tools.',
      route: '/contribute',
      label: 'View contribution guide',
      type: 'Open Source Contribution'
    },
    {
      id: 'fellowship',
      title: 'Fellowship',
      desc: 'Mentorship and project residency for students and independent builders.',
      route: '/intern-fellowship',
      label: 'Fellowship information',
      type: 'Fellowship Program'
    },
    {
      id: 'problems',
      title: 'Problems & Ideas',
      desc: 'Submit a problem worth solving or propose an idea for others to explore.',
      route: '/problems-and-ideas',
      label: 'View problems and ideas',
      type: 'Problems Registry'
    }
  ];

  const handleAction = (e, pathway) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: pathway.route,
        label: pathway.title,
        type: pathway.type,
        note: `Navigating to ${pathway.route}`
      });
    }
  };

  return (
    <section className="community-section" id="community" aria-label="Community and Contribution">
      <div className="community-container">
        
        {/* Editorial Statement Header */}
        <div className="community-header">
          <h2 className="community-title">
            Open ideas are better <span className="serif-italic">when they can move.</span>
          </h2>
          <p className="community-intro">
            A shared commons to explore projects, contribute tools, and collaborate on real-world challenges.
          </p>
        </div>

        {/* Quiet Typographic Pathways (Divided by hairline rules, no cards) */}
        <div className="community-pathways-grid">
          {pathways.map((item) => (
            <div key={item.id} className="community-pathway-item">
              <h3 className="community-pathway-title">{item.title}</h3>
              <p className="community-pathway-desc">{item.desc}</p>
              <a
                href={item.route}
                onClick={(e) => handleAction(e, item)}
                className="community-pathway-link"
                aria-label={`${item.label} (${item.title})`}
              >
                <span>{item.label}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
