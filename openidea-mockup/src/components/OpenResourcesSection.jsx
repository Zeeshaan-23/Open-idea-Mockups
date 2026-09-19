import React, { useState } from 'react';
import { Search, ArrowRight, Compass, ArrowUpRight } from 'lucide-react';

export default function OpenResourcesSection({ onNavigateAction }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Subordinated category filters supported by existing mock data
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'research', label: 'Research' },
    { id: 'datasets', label: 'Datasets' },
    { id: 'toolkits', label: 'Tools' }
  ];

  // Strictly preserved prototype items from existing repository code
  const resources = [
    {
      id: 'res-1',
      category: 'research',
      badge: 'Research Paper',
      title: 'Decentralized Intelligence in Open Innovation Networks',
      publisher: 'Open Idea Research Group',
      format: 'PDF / Whitepaper',
      tags: ['Open Innovation', 'Collective Intelligence']
    },
    {
      id: 'res-2',
      category: 'datasets',
      badge: 'Open Dataset',
      title: 'Global Climate Adaptation & Urban Infrastructure Index',
      publisher: 'EcoSyz Public Data Lab',
      format: 'Parquet / CSV',
      tags: ['Geospatial', 'Climate Tech']
    },
    {
      id: 'res-3',
      category: 'toolkits',
      badge: 'Developer Toolkit',
      title: 'Next.js + Supabase Open Studio Application Template',
      publisher: 'Open Idea Labs',
      format: 'GitHub Repo',
      tags: ['Next.js', 'React']
    },
    {
      id: 'res-4',
      category: 'datasets',
      badge: 'Open Dataset',
      title: 'Multimodal Indic Language Corpus for Low-Resource AI',
      publisher: 'Open Language Collective',
      format: 'HuggingFace / Audio',
      tags: ['NLP', 'Multilingual']
    }
  ];

  // Filter preview rows by selected category
  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter((item) => item.category === activeCategory);

  // Handle Search Submission (Navigates to /openresources with ?q=)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const destination = searchQuery.trim()
      ? `/openresources?q=${encodeURIComponent(searchQuery.trim())}`
      : '/openresources';

    if (onNavigateAction) {
      onNavigateAction({
        destination,
        label: searchQuery.trim() ? `Search: "${searchQuery}"` : 'Open Resources Directory',
        type: 'Resource Search',
        note: `Navigating to ${destination}`
      });
    }
  };

  // Handle Row Selection
  const handleRowClick = (item) => {
    const destination = `/openresources?q=${encodeURIComponent(item.title)}`;
    if (onNavigateAction) {
      onNavigateAction({
        destination,
        label: item.title,
        type: 'Resource Index Selection',
        note: `Navigating to resource detail: ${destination}`
      });
    }
  };

  return (
    <section className="open-resources-section" id="resources" aria-label="Open Resources Preview">
      <div className="resources-container">
        
        {/* Section Header */}
        <div className="resources-header">
          <div className="resources-header-left">
            <div className="resources-kicker">
              <Compass size={13} aria-hidden="true" />
              <span>Knowledge Infrastructure</span>
            </div>
            <h2 className="resources-title">
              Open Resources
            </h2>
            <div className="resources-serif-subheading">
              Find something worth building on.
            </div>
            <p className="resources-subtitle">
              A curated catalogue of verified research papers, open datasets, and developer toolkits.
            </p>
          </div>

          <div className="resources-header-right">
            <a
              href="/openresources"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateAction) {
                  onNavigateAction({
                    destination: '/openresources',
                    label: 'Explore Open Resources',
                    type: 'Product Gateway'
                  });
                }
              }}
              className="resources-header-cta"
            >
              <span>Explore Open Resources</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Search Bar + Subordinated Category Filter Toolbar */}
        <div className="resources-toolbar">
          <form className="resources-search-form" onSubmit={handleSearchSubmit} role="search">
            <div className="resources-search-box">
              <Search size={15} className="resources-search-icon" aria-hidden="true" />
              <input
                type="search"
                className="resources-search-input"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search resources"
              />
              {searchQuery.trim() && (
                <button type="submit" className="resources-search-submit">
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Subordinated Category Controls */}
          <nav className="resources-categories" aria-label="Resource Categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`resources-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Structured Catalogue Preview (Index / List, No Rounded Marketing Cards) */}
        <div className="resources-index-card" role="region" aria-label="Resource Index Preview">
          
          {/* Table Header (Desktop Only) */}
          <div className="resources-index-header" aria-hidden="true">
            <div>Category</div>
            <div>Resource Title</div>
            <div>Publisher / Format</div>
            <div style={{ textAlign: 'right' }}>Action</div>
          </div>

          {/* Structured Rows */}
          <div className="resources-index-rows">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="resources-index-row"
                onClick={() => handleRowClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRowClick(item);
                  }
                }}
                aria-label={`View ${item.title} (${item.badge})`}
              >
                {/* Column 1: Category Badge */}
                <div className="resource-col-badge">
                  <span className={`resource-category-tag ${item.category}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Column 2: Title & Semantic Tags */}
                <div className="resource-col-main">
                  <div className="resource-row-title">
                    {item.title}
                  </div>
                  <div className="resource-row-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="resource-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 3: Publisher & Format */}
                <div className="resource-col-meta">
                  <div className="resource-row-publisher">
                    {item.publisher}
                  </div>
                  <div className="resource-row-format">
                    {item.format}
                  </div>
                </div>

                {/* Column 4: Direct Affordance Arrow */}
                <div className="resource-col-action" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Prototype Notice Footer */}
          <div className="resources-index-footer">
            <div className="resources-prototype-indicator">
              <span>●</span>
              <span>Prototype index preview · Verified repository metadata</span>
            </div>
            <div>
              <a
                href="/openresources"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigateAction) {
                    onNavigateAction({
                      destination: '/openresources',
                      label: 'Complete Resources Directory',
                      type: 'Full Catalogue'
                    });
                  }
                }}
                className="resources-footer-link"
              >
                <span>View all resources</span>
                <ArrowRight size={12} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
