import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronDown,
  Compass,
  Send,
  MessageSquare,
  BookOpen,
  Info,
  Layers,
  Terminal,
  Cpu,
  Video,
  FileText,
  Database
} from 'lucide-react';
import {
  RESOURCE_CATEGORIES,
  SEARCH_SUGGESTIONS,
  SOURCE_NAMES,
  MOCK_RESOURCES,
  filterResources,
  getAssistantResponse
} from '../data/mockResources';
import '../styles/openresources.css';

export default function OpenResourcesPage({ onNavigate, initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [committedQuery, setCommittedQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedResourceId, setExpandedResourceId] = useState(null);
  const [activeInspectTab, setActiveInspectTab] = useState('overview'); // 'overview' | 'qa'

  // Per-resource Q&A state: { [resourceId]: { selectedQuestionIndex: number|null, customQaList: [{q, a}] } }
  const [resourceQaState, setResourceQaState] = useState({});
  const [resourceCustomInput, setResourceCustomInput] = useState('');

  // Right-hand Research Assistant state
  const [assistantMessages, setAssistantMessages] = useState([
    {
      id: 'init-1',
      role: 'assistant',
      title: 'Open Resources Intelligence',
      text: "Hello. I am the Research Assistant. I have indexed the active open resources in this catalogue. You can compare methodology across papers, synthesize datasets, or extract architectural approaches. Select a suggested prompt below or type your question."
    }
  ]);
  const [assistantInput, setAssistantInput] = useState('');

  // Synchronize initialQuery if provided via URL/Hero
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      setCommittedQuery(initialQuery);
    }
  }, [initialQuery]);

  // Compute filtered resources locally
  const filteredResources = useMemo(() => {
    return filterResources({
      query: committedQuery,
      category: activeCategory
    });
  }, [committedQuery, activeCategory]);

  // Compute category counts for badge indicators
  const categoryCounts = useMemo(() => {
    const counts = {};
    RESOURCE_CATEGORIES.forEach(cat => {
      counts[cat.id] = filterResources({
        query: committedQuery,
        category: cat.id
      }).length;
    });
    return counts;
  }, [committedQuery]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setCommittedQuery(searchQuery.trim());
    if (onNavigate) {
      const url = searchQuery.trim()
        ? `/openresources?q=${encodeURIComponent(searchQuery.trim())}`
        : '/openresources';
      window.history.replaceState({}, '', url);
    }
  };

  // Handle Clearing Search
  const handleClearSearch = () => {
    setSearchQuery('');
    setCommittedQuery('');
    if (onNavigate) {
      window.history.replaceState({}, '', '/openresources');
    }
  };

  // Handle Suggestion Chip Click
  const handleChipClick = (suggestion) => {
    if (committedQuery.toLowerCase() === suggestion.toLowerCase()) {
      // Toggle off if already active
      setSearchQuery('');
      setCommittedQuery('');
    } else {
      setSearchQuery(suggestion);
      setCommittedQuery(suggestion);
    }
  };

  // Toggle Resource Inspection Inline
  const handleToggleExpand = (id) => {
    if (expandedResourceId === id) {
      setExpandedResourceId(null);
    } else {
      setExpandedResourceId(id);
      setActiveInspectTab('overview');
      setResourceCustomInput('');
    }
  };

  // Handle Per-Resource Suggested Question Click
  const handleSelectResourceQa = (resourceId, qIndex, questionObj) => {
    setResourceQaState(prev => {
      const existing = prev[resourceId] || { selectedQuestionIndex: null, customQaList: [] };
      return {
        ...prev,
        [resourceId]: {
          ...existing,
          selectedQuestionIndex: qIndex
        }
      };
    });
  };

  // Handle Custom Question inside Resource Inspection
  const handleCustomResourceQaSubmit = (resource, e) => {
    e.preventDefault();
    const qText = resourceCustomInput.trim();
    if (!qText) return;

    const answer = `Based on the repository metadata for "${resource.title}": ${resource.description.slice(0, 180)}... Consult the "Open" source link for raw experimental benchmarks.`;

    setResourceQaState(prev => {
      const existing = prev[resource.id] || { selectedQuestionIndex: null, customQaList: [] };
      return {
        ...prev,
        [resource.id]: {
          ...existing,
          customQaList: [...existing.customQaList, { q: qText, a: answer }]
        }
      };
    });
    setResourceCustomInput('');
  };

  // Handle Research Assistant Prompts
  const handleAssistantPrompt = (promptType, label) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: label
    };

    const response = getAssistantResponse(promptType, filteredResources, label);
    const assistantMsg = {
      id: `asst-${Date.now() + 1}`,
      role: 'assistant',
      title: response.title,
      text: response.content
    };

    setAssistantMessages(prev => [...prev, userMsg, assistantMsg]);
  };

  // Handle Custom Message to Research Assistant
  const handleAssistantSubmit = (e) => {
    e.preventDefault();
    const text = assistantInput.trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text
    };

    const response = getAssistantResponse('custom', filteredResources, text);
    const assistantMsg = {
      id: `asst-${Date.now() + 1}`,
      role: 'assistant',
      title: response.title,
      text: response.content
    };

    setAssistantMessages(prev => [...prev, userMsg, assistantMsg]);
    setAssistantInput('');
  };

  // Category Icon helper
  const renderCategoryIcon = (type) => {
    switch (type) {
      case 'paper': return <FileText size={12} />;
      case 'dataset': return <Database size={12} />;
      case 'code': return <Terminal size={12} />;
      case 'model': return <Layers size={12} />;
      case 'hardware': return <Cpu size={12} />;
      case 'video': return <Video size={12} />;
      default: return <BookOpen size={12} />;
    }
  };

  return (
    <div className="open-resources-workstation">
      <div className="or-container">

        {/* 1. PAGE HEADER (Editorial, Compact) */}
        <header className="or-header">
          <div className="or-kicker">
            <span className="or-kicker-dot" aria-hidden="true" />
            <Compass size={13} aria-hidden="true" />
            <span>Open Resources</span>
          </div>
          <h1 className="or-headline">
            Search the open <span className="or-headline-em">knowledge</span> landscape.
          </h1>
          <p className="or-subheading">
            Explore verified research papers, open datasets, source repositories, foundation models,
            open hardware blueprints, and technical lectures from across the global commons.
          </p>
        </header>

        {/* 2. PRIMARY SEARCH SURFACE */}
        <section className="or-search-surface" aria-label="Resource Search">
          <form className="or-search-form" onSubmit={handleSearchSubmit} role="search">
            <div className="or-search-bar">
              <Search size={18} className="or-search-icon" aria-hidden="true" />
              <input
                type="search"
                className="or-search-input"
                placeholder="Search papers, datasets, code, models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search open resources"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="or-search-clear"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
              <button type="submit" className="or-search-submit">
                <span>Search</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </form>

          {/* Suggestion Chips */}
          <div className="or-suggestions" aria-label="Search suggestions">
            <span className="or-suggestions-label">Try:</span>
            {SEARCH_SUGGESTIONS.map((suggestion) => {
              const isActive = committedQuery.toLowerCase() === suggestion.toLowerCase();
              return (
                <button
                  key={suggestion}
                  type="button"
                  className={`or-chip ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleChipClick(suggestion)}
                  aria-pressed={isActive}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. CATEGORY NAVIGATION (Editorial Index Filter) */}
        <nav className="or-category-nav" aria-label="Resource Category Filter" role="tablist">
          {RESOURCE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`or-category-btn ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="or-category-count">{count}</span>
              </button>
            );
          })}
        </nav>

        {/* 4. MAIN WORKSTATION (Two-Pane Desktop Architecture) */}
        <div className="or-workstation-grid">

          {/* LEFT PANE: Results Area (~60%) */}
          <main className="or-results-pane" aria-label="Search Results">
            {/* Meta Bar */}
            <div className="or-results-meta-bar">
              <div>
                <span className="or-results-count">{filteredResources.length} results</span>
                <span className="or-results-scope">
                  {committedQuery ? `for "${committedQuery}"` : 'indexed in open catalog'}
                </span>
              </div>
              <div className="or-results-sources">
                Sources: arXiv · Crossref · Zenodo · Dataverse · GitHub · Hugging Face · OSHWA · YouTube
              </div>
            </div>

            {/* Results List or Empty State */}
            {filteredResources.length === 0 ? (
              <div className="or-empty-state">
                <div className="or-empty-title">No resources match your search</div>
                <p className="or-empty-desc">
                  No records were found for "{committedQuery}" in category "{activeCategory}". Try broadening your keywords or selecting another category.
                </p>
                <button
                  type="button"
                  className="or-empty-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setCommittedQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="or-resource-list" role="feed" aria-label="Open Resources Feed">
                {filteredResources.map((resource, idx) => {
                  const isExpanded = expandedResourceId === resource.id;
                  const itemNumber = String(idx + 1).padStart(2, '0');
                  const qaData = resourceQaState[resource.id] || { selectedQuestionIndex: null, customQaList: [] };

                  return (
                    <article
                      key={resource.id}
                      className={`or-resource-row ${isExpanded ? 'is-expanded' : ''}`}
                      aria-expanded={isExpanded}
                    >
                      {/* Collapsed / Summary Line (Click to Expand) */}
                      <div
                        className="or-row-header"
                        onClick={() => handleToggleExpand(resource.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggleExpand(resource.id);
                          }
                        }}
                        aria-label={`${resource.title} (${resource.type}). Click to inspect.`}
                      >
                        {/* Index */}
                        <div className="or-row-index" aria-hidden="true">
                          {itemNumber}
                        </div>

                        {/* Main Content */}
                        <div className="or-row-main">
                          <div className="or-row-top-line">
                            <span className={`or-type-badge ${resource.type}`}>
                              {resource.type}
                            </span>
                            <span className="or-source-tag">
                              {SOURCE_NAMES[resource.source] || resource.source}
                            </span>
                            <span className="or-year-tag">
                              {resource.year}
                            </span>
                            {resource.license && (
                              <span className="or-license-tag">
                                {resource.license}
                              </span>
                            )}
                          </div>

                          <h2 className="or-row-title">
                            {resource.title}
                          </h2>

                          <div className="or-row-authors">
                            {resource.authors.join(', ')}
                          </div>

                          <div className="or-row-tags">
                            {resource.tags.map(tag => (
                              <span key={tag} className="or-tag">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Row Actions */}
                        <div className="or-row-actions">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="or-btn-open"
                            onClick={(e) => e.stopPropagation()}
                            title={`Open external source: ${resource.url}`}
                          >
                            <span>Open</span>
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                          <ChevronDown
                            size={16}
                            className="or-chevron-icon"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* 5. RESOURCE INSPECTION (Inline Expansion) */}
                      {isExpanded && (
                        <div className="or-inspection-panel" role="region" aria-label={`Inspection for ${resource.title}`}>
                          {/* Tabs: Overview vs. Q&A */}
                          <div className="or-inspect-tabs" role="tablist">
                            <button
                              type="button"
                              role="tab"
                              aria-selected={activeInspectTab === 'overview'}
                              className={`or-inspect-tab-btn ${activeInspectTab === 'overview' ? 'is-active' : ''}`}
                              onClick={() => setActiveInspectTab('overview')}
                            >
                              Overview
                            </button>
                            <button
                              type="button"
                              role="tab"
                              aria-selected={activeInspectTab === 'qa'}
                              className={`or-inspect-tab-btn ${activeInspectTab === 'qa' ? 'is-active' : ''}`}
                              onClick={() => setActiveInspectTab('qa')}
                            >
                              Q&A
                            </button>
                          </div>

                          {/* Tab 1: Overview */}
                          {activeInspectTab === 'overview' && (
                            <div className="or-overview-content">
                              <p className="or-overview-desc">
                                {resource.description}
                              </p>

                              {/* Metadata Grid */}
                              <div className="or-meta-grid">
                                <div>
                                  <div className="or-meta-item-label">Source Repository</div>
                                  <div className="or-meta-item-value">{SOURCE_NAMES[resource.source] || resource.source}</div>
                                </div>
                                <div>
                                  <div className="or-meta-item-label">License</div>
                                  <div className="or-meta-item-value">{resource.license || 'Open Access'}</div>
                                </div>
                                <div>
                                  <div className="or-meta-item-label">Publication Year</div>
                                  <div className="or-meta-item-value">{resource.year}</div>
                                </div>
                                {resource.typeMeta && Object.entries(resource.typeMeta).map(([k, v]) => (
                                  <div key={k}>
                                    <div className="or-meta-item-label">{k.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
                                    <div className="or-meta-item-value">{v}</div>
                                  </div>
                                ))}
                              </div>

                              <div className="or-overview-actions">
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="or-btn-open"
                                  style={{ padding: '0.5rem 1rem' }}
                                >
                                  <span>Open external resource</span>
                                  <ExternalLink size={13} aria-hidden="true" />
                                </a>
                              </div>
                            </div>
                          )}

                          {/* Tab 2: Q&A */}
                          {activeInspectTab === 'qa' && (
                            <div className="or-qa-content">
                              <div className="or-qa-suggestions-label">Suggested Inquiries:</div>
                              <div className="or-qa-questions-list">
                                {resource.qa.map((item, qIdx) => {
                                  const isSelected = qaData.selectedQuestionIndex === qIdx;
                                  return (
                                    <div key={qIdx}>
                                      <button
                                        type="button"
                                        className={`or-qa-question-btn ${isSelected ? 'is-active' : ''}`}
                                        onClick={() => handleSelectResourceQa(resource.id, qIdx, item)}
                                      >
                                        <span>{item.q}</span>
                                        <ChevronDown size={14} style={{ transform: isSelected ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
                                      </button>
                                      {isSelected && (
                                        <div className="or-qa-answer-box" style={{ marginTop: '0.375rem' }}>
                                          {item.a}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}

                                {/* Custom user questions logged for this resource */}
                                {qaData.customQaList.map((cqa, cIdx) => (
                                  <div key={`custom-${cIdx}`} style={{ marginTop: '0.375rem' }}>
                                    <div className="or-qa-question-btn is-active">
                                      <span>{cqa.q}</span>
                                    </div>
                                    <div className="or-qa-answer-box" style={{ marginTop: '0.375rem' }}>
                                      {cqa.a}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Question Input */}
                              <form
                                className="or-qa-input-bar"
                                onSubmit={(e) => handleCustomResourceQaSubmit(resource, e)}
                              >
                                <input
                                  type="text"
                                  className="or-qa-input"
                                  placeholder="Ask a specific question about this resource..."
                                  value={resourceCustomInput}
                                  onChange={(e) => setResourceCustomInput(e.target.value)}
                                  aria-label="Ask about this resource"
                                />
                                <button
                                  type="submit"
                                  className="or-qa-submit-btn"
                                  disabled={!resourceCustomInput.trim()}
                                >
                                  Ask
                                </button>
                              </form>
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </main>

          {/* 6. RIGHT PANE: Research Assistant (~40%) */}
          <aside className="or-assistant-pane" aria-label="Research Assistant Panel">
            <div className="or-assistant-header">
              <div className="or-assistant-title-row">
                <div className="or-assistant-label">
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Research Assistant</span>
                </div>
                <span className="or-assistant-badge">
                  {filteredResources.length} visible in context
                </span>
              </div>
              <p className="or-assistant-desc">
                Ask questions about the resources you're exploring.
              </p>
            </div>

            {/* Suggested Prompts */}
            <div className="or-assistant-prompts" aria-label="Assistant Suggested Inquiries">
              <button
                type="button"
                className="or-assistant-prompt-btn"
                onClick={() => handleAssistantPrompt('compare', 'Compare these resources')}
              >
                <span>Compare these resources</span>
                <ArrowRight size={13} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="or-assistant-prompt-btn"
                onClick={() => handleAssistantPrompt('summarize', 'Summarize the key themes')}
              >
                <span>Summarize the key themes</span>
                <ArrowRight size={13} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="or-assistant-prompt-btn"
                onClick={() => handleAssistantPrompt('approaches', 'Find common approaches')}
              >
                <span>Find common approaches</span>
                <ArrowRight size={13} aria-hidden="true" />
              </button>
            </div>

            {/* Conversation Log */}
            <div className="or-assistant-log" role="log" aria-live="polite">
              {assistantMessages.map((msg) => (
                <div key={msg.id} className={`or-msg ${msg.role}`}>
                  {msg.title && <div className="or-msg-title">{msg.title}</div>}
                  <div className="or-msg-text">{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Assistant Input Bar */}
            <form className="or-assistant-input-form" onSubmit={handleAssistantSubmit}>
              <input
                type="text"
                className="or-assistant-input"
                placeholder="Ask about these resources..."
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                aria-label="Ask the research assistant"
              />
              <button
                type="submit"
                className="or-assistant-send-btn"
                disabled={!assistantInput.trim()}
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>

            <p className="or-assistant-footer-note">
              Prototype research assistant · Synthesizes metadata from active filtered resources
            </p>
          </aside>

        </div>

      </div>
    </div>
  );
}
