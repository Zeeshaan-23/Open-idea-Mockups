import React, { useState, useMemo } from 'react';
import {
  Users,
  Repeat,
  Calendar,
  Layers,
  Search,
  Plus,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ThumbsUp,
  ExternalLink,
  MessageSquare,
  Paperclip,
  Check,
  X
} from 'lucide-react';
import {
  COMMUNITY_TABS,
  MOCK_WORKING_GROUPS,
  MOCK_BARTER_ASKS,
  MOCK_EVENTS,
  MOCK_SHOWCASE_PROJECTS,
  COMMUNITY_PATHWAYS
} from '../data/mockCommunityData';
import '../styles/community.css';

export default function CommunityPage({ onNavigate, initialTab = 'groups' }) {
  // Active Tab: 'groups' | 'barter' | 'events' | 'showcase'
  const [activeTab, setActiveTab] = useState(() => {
    const valid = ['groups', 'barter', 'events', 'showcase'];
    return valid.includes(initialTab) ? initialTab : 'groups';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Interactive local states
  const [joinedGroups, setJoinedGroups] = useState(new Set(['grp-hardware-iot']));
  const [barterAsks, setBarterAsks] = useState(MOCK_BARTER_ASKS);
  const [pitchInputs, setPitchInputs] = useState({});
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [showcaseProjects, setShowcaseProjects] = useState(MOCK_SHOWCASE_PROJECTS);

  // New post modal/drawer states
  const [isCreatingAsk, setIsCreatingAsk] = useState(false);
  const [newAskData, setNewAskData] = useState({
    title: '',
    description: '',
    whatINeed: '',
    whatIOffer: ''
  });

  const [feedbackToast, setFeedbackToast] = useState(null);

  // Trigger feedback toast
  const showToast = (title, message) => {
    setFeedbackToast({ title, message });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  // Toggle joining a group
  const handleToggleJoinGroup = (groupId, groupName) => {
    setJoinedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
        showToast('Left Working Group', `You have unsubscribed from ${groupName}.`);
      } else {
        next.add(groupId);
        showToast('Joined Working Group', `You are now a member of ${groupName}.`);
      }
      return next;
    });
  };

  // Handle submitting a pitch on a barter ask
  const handleAddPitch = (askId) => {
    const content = (pitchInputs[askId] || '').trim();
    if (!content) return;

    const newPitch = {
      id: `p-${Date.now()}`,
      author: { name: 'You (Current User)', avatar: 'ME', role: 'Collaborator' },
      createdAt: 'Just now',
      content
    };

    setBarterAsks((prev) =>
      prev.map((ask) => {
        if (ask.id === askId) {
          return {
            ...ask,
            pitches: [...ask.pitches, newPitch]
          };
        }
        return ask;
      })
    );

    setPitchInputs((prev) => ({ ...prev, [askId]: '' }));
    showToast('Pitch Submitted', 'Your collaborative offer has been added to the ask thread.');
  };

  // Toggle event RSVP
  const handleToggleRsvp = (eventId, eventTitle) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const nextState = !evt.isRegistered;
          showToast(
            nextState ? 'RSVP Confirmed' : 'Registration Cancelled',
            nextState ? `You are registered for ${eventTitle}.` : `Removed registration for ${eventTitle}.`
          );
          return {
            ...evt,
            isRegistered: nextState,
            attendeesCount: evt.attendeesCount + (nextState ? 1 : -1)
          };
        }
        return evt;
      })
    );
  };

  // Toggle showcase project upvote
  const handleToggleUpvote = (projectId) => {
    setShowcaseProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const nextUpvoted = !proj.hasUpvoted;
          return {
            ...proj,
            hasUpvoted: nextUpvoted,
            upvotes: proj.upvotes + (nextUpvoted ? 1 : -1)
          };
        }
        return proj;
      })
    );
  };

  // Create new barter ask
  const handleCreateAskSubmit = (e) => {
    e.preventDefault();
    if (!newAskData.title.trim() || !newAskData.description.trim()) return;

    const newEntry = {
      id: `barter-${Date.now()}`,
      title: newAskData.title.trim(),
      author: {
        name: 'You (Current User)',
        avatar: 'ME',
        role: 'Community Builder'
      },
      status: 'open',
      createdAt: 'Just now',
      description: newAskData.description.trim(),
      whatINeed: newAskData.whatINeed.trim() || 'Collaborative engineering support',
      whatIOffer: newAskData.whatIOffer.trim() || 'Domain expertise and peer review',
      pitches: []
    };

    setBarterAsks((prev) => [newEntry, ...prev]);
    setIsCreatingAsk(false);
    setNewAskData({ title: '', description: '', whatINeed: '', whatIOffer: '' });
    showToast('Barter Ask Published', 'Your request has been posted to the peer exchange.');
  };

  // Filter items based on search query
  const filteredGroups = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return MOCK_WORKING_GROUPS;
    return MOCK_WORKING_GROUPS.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.topics.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredBarter = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return barterAsks;
    return barterAsks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.whatINeed.toLowerCase().includes(q) ||
        b.whatIOffer.toLowerCase().includes(q)
    );
  }, [searchQuery, barterAsks]);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return events;
    return events.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.type.toLowerCase().includes(q)
    );
  }, [searchQuery, events]);

  const filteredShowcase = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return showcaseProjects;
    return showcaseProjects.filter(
      (sp) =>
        sp.title.toLowerCase().includes(q) ||
        sp.description.toLowerCase().includes(q) ||
        sp.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery, showcaseProjects]);

  return (
    <div className="community-page-wrapper" role="main" aria-label="Open Idea Community Workspace">
      <div className="community-container-max">

        {/* 1. EDITORIAL HEADER */}
        <header className="community-editorial-header">
          <div className="community-header-kicker">
            <Sparkles size={13} aria-hidden="true" />
            <span>Open Innovation Community · Knowledge Ecosystem</span>
          </div>

          <div className="community-header-title-row">
            <div>
              <h1 className="community-header-title">
                Open ideas are better
                <span className="community-header-serif">when they can move.</span>
              </h1>
              <p className="community-header-subtext">
                Connect with researchers, engineers, and independent creators across open hardware,
                scientific literature, and zero-lockin web tooling. Trade skills via peer barter, join working
                groups, and contribute to public breakthroughs.
              </p>
            </div>

            <div className="community-header-actions">
              {activeTab === 'barter' && (
                <button
                  type="button"
                  onClick={() => setIsCreatingAsk(true)}
                  className="studio-btn-action studio-btn-primary"
                  style={{ borderRadius: 'var(--radius-md)' }}
                >
                  <Plus size={14} aria-hidden="true" />
                  <span>Post Barter Ask</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* 2. COMMUNITY NAVIGATION & SEARCH CONSOLE */}
        <nav className="community-nav-bar" aria-label="Community Sections">
          <div className="community-nav-tabs-group" role="tablist">
            {COMMUNITY_TABS.map((tab) => {
              const Icon =
                tab.id === 'groups'
                  ? Users
                  : tab.id === 'barter'
                  ? Repeat
                  : tab.id === 'events'
                  ? Calendar
                  : Layers;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`community-nav-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="community-nav-filter-box">
            <div className="community-search-input-wrap">
              <Search size={13} style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="community-search-input"
                aria-label={`Search within ${activeTab}`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Feedback Toast */}
        {feedbackToast && (
          <div
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            role="status"
          >
            <CheckCircle2 size={16} style={{ color: '#10B981', flexShrink: 0 }} aria-hidden="true" />
            <div>
              <strong>{feedbackToast.title}:</strong> {feedbackToast.message}
            </div>
          </div>
        )}

        {/* 3. TAB 1: WORKING GROUPS */}
        {activeTab === 'groups' && (
          <section className="community-groups-grid" aria-label="Working Groups">
            {filteredGroups.map((group) => {
              const isJoined = joinedGroups.has(group.id);

              return (
                <article key={group.id} className="community-group-card">
                  <div className="community-group-header">
                    <div className="community-group-topics-row">
                      {group.topics.map((t) => (
                        <span key={t} className="community-topic-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="community-group-name">{group.name}</h3>
                  </div>

                  <p className="community-group-desc">{group.description}</p>

                  <div className="community-group-initiative">
                    <span className="community-initiative-label">Active Focus</span>
                    <span className="community-initiative-text">{group.activeInitiative}</span>
                  </div>

                  <div className="community-group-footer">
                    <div className="community-group-stats">
                      <span>{group.memberCount + (isJoined ? 1 : 0)} members</span>
                      <span>·</span>
                      <span>{group.discussionCount} threads</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleJoinGroup(group.id, group.name)}
                      className={`community-join-group-btn ${isJoined ? 'joined' : ''}`}
                    >
                      {isJoined ? 'Joined (Leave)' : 'Join Group'}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* 4. TAB 2: PEER BARTER EXCHANGE */}
        {activeTab === 'barter' && (
          <section className="community-barter-section" aria-label="Peer Barter Marketplace">
            <div className="community-barter-hero-banner">
              <div className="community-barter-banner-text">
                <h3 className="community-barter-banner-title">
                  Skill & Resource Barter Marketplace
                </h3>
                <p className="community-barter-banner-desc">
                  Open Idea supports direct, non-monetary skill exchange. Builders trade hardware engineering,
                  frontend UI implementation, dataset curation, or accessibility reviews directly with peers.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreatingAsk(true)}
                className="studio-btn-action studio-btn-primary"
              >
                <Plus size={14} aria-hidden="true" />
                <span>Post an Ask</span>
              </button>
            </div>

            {/* Modal: Create New Ask */}
            {isCreatingAsk && (
              <form onSubmit={handleCreateAskSubmit} className="community-barter-card" style={{ borderColor: 'var(--brand-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Post a Collaborative Barter Ask
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCreatingAsk(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Ask Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAskData.title}
                    onChange={(e) => setNewAskData({ ...newAskData, title: e.target.value })}
                    placeholder="e.g., KiCad PCB Review vs. React Component Architecture"
                    className="community-pitch-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Detailed Project Overview *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newAskData.description}
                    onChange={(e) => setNewAskData({ ...newAskData, description: e.target.value })}
                    placeholder="Describe what you are building and why you need peer assistance..."
                    className="community-pitch-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="community-barter-split">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#EF4444' }}>
                      WHAT I NEED *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAskData.whatINeed}
                      onChange={(e) => setNewAskData({ ...newAskData, whatINeed: e.target.value })}
                      placeholder="e.g. Frontend developer to build CSS token layout"
                      className="community-pitch-input"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10B981' }}>
                      WHAT I OFFER *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAskData.whatIOffer}
                      onChange={(e) => setNewAskData({ ...newAskData, whatIOffer: e.target.value })}
                      placeholder="e.g. Assembled sensor prototype hardware"
                      className="community-pitch-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsCreatingAsk(false)}
                    className="studio-btn-action studio-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="studio-btn-action studio-btn-primary">
                    Publish Ask
                  </button>
                </div>
              </form>
            )}

            {/* List of Barter Asks */}
            <div className="community-barter-list">
              {filteredBarter.map((ask) => (
                <article key={ask.id} className="community-barter-card">
                  <div className="community-barter-head">
                    <div className="community-author-lockup">
                      <div className="community-author-avatar">{ask.author.avatar}</div>
                      <div>
                        <div className="community-author-name">{ask.author.name}</div>
                        <div className="community-author-role">{ask.author.role} · {ask.createdAt}</div>
                      </div>
                    </div>

                    <span className={`community-barter-status-pill ${ask.status}`}>
                      ● {ask.status === 'open' ? 'Active Ask' : 'Exchange Completed'}
                    </span>
                  </div>

                  <h3 className="community-barter-title">{ask.title}</h3>
                  <p className="community-barter-desc">{ask.description}</p>

                  <div className="community-barter-split">
                    <div className="community-barter-col">
                      <span className="community-barter-col-label need">What They Need</span>
                      <span className="community-barter-col-text">{ask.whatINeed}</span>
                    </div>

                    <div className="community-barter-col">
                      <span className="community-barter-col-label offer">What They Offer</span>
                      <span className="community-barter-col-text">{ask.whatIOffer}</span>
                    </div>
                  </div>

                  {/* Pitch Thread */}
                  <div className="community-pitches-box">
                    <span className="community-pitches-title">
                      Collaboration Pitches ({ask.pitches.length})
                    </span>

                    {ask.pitches.map((pitch) => (
                      <div key={pitch.id} className="community-pitch-item">
                        <div className="community-pitch-author-bar">
                          <span className="community-pitch-author">{pitch.author.name} ({pitch.author.role})</span>
                          <span className="community-pitch-date">{pitch.createdAt}</span>
                        </div>
                        <div className="community-pitch-text">{pitch.content}</div>
                      </div>
                    ))}

                    {ask.status === 'open' && (
                      <div className="community-pitch-input-row">
                        <input
                          type="text"
                          value={pitchInputs[ask.id] || ''}
                          onChange={(e) =>
                            setPitchInputs({ ...pitchInputs, [ask.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddPitch(ask.id);
                            }
                          }}
                          placeholder="Pitch in: What can you contribute to this project?..."
                          className="community-pitch-input"
                          aria-label={`Pitch your contribution to ${ask.title}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddPitch(ask.id)}
                          className="community-pitch-btn"
                        >
                          Pitch In
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 5. TAB 3: EVENTS & CHALLENGES */}
        {activeTab === 'events' && (
          <section className="community-events-grid" aria-label="Events and Challenges">
            {filteredEvents.map((evt) => (
              <article key={evt.id} className="community-event-card">
                <div className="community-event-top">
                  <span className="community-event-badge">{evt.type}</span>
                  <div className="community-event-date-row">
                    <Clock size={13} aria-hidden="true" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                <h3 className="community-event-title">{evt.title}</h3>
                <p className="community-event-desc">{evt.description}</p>

                <div className="community-event-details-list">
                  <div className="community-event-detail-item">
                    <MapPin size={13} style={{ color: 'var(--brand-blue)' }} aria-hidden="true" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="community-event-detail-item">
                    <Users size={13} style={{ color: 'var(--brand-cyan)' }} aria-hidden="true" />
                    <span>{evt.attendeesCount} builders registered · Organized by {evt.organizer}</span>
                  </div>
                </div>

                <div className="community-event-footer">
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {evt.status === 'active' ? 'Active Sprint' : 'Open Registration'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleRsvp(evt.id, evt.title)}
                    className={`community-rsvp-btn ${evt.isRegistered ? 'registered' : ''}`}
                  >
                    {evt.isRegistered ? 'RSVP Confirmed (Cancel)' : 'Register / RSVP'}
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* 6. TAB 4: PROJECT SHOWCASE */}
        {activeTab === 'showcase' && (
          <section className="community-showcase-grid" aria-label="Community Project Showcase">
            {filteredShowcase.map((proj) => (
              <article key={proj.id} className="community-showcase-card">
                <div className="community-showcase-head">
                  <div>
                    <h3 className="community-showcase-title">{proj.title}</h3>
                    <div className="community-showcase-owner">by {proj.owner}</div>
                  </div>
                  <span className="community-showcase-framework">{proj.framework}</span>
                </div>

                <p className="community-showcase-desc">{proj.description}</p>

                <div className="community-showcase-tags-row">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="community-topic-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="community-showcase-footer">
                  <button
                    type="button"
                    onClick={() => handleToggleUpvote(proj.id)}
                    className={`community-upvote-btn ${proj.hasUpvoted ? 'upvoted' : ''}`}
                    aria-label={`Upvote ${proj.title}`}
                  >
                    <ThumbsUp size={12} aria-hidden="true" />
                    <span>{proj.hasUpvoted ? 'Upvoted' : 'Upvote'}</span>
                    <strong style={{ marginLeft: 2 }}>({proj.upvotes})</strong>
                  </button>

                  <a
                    href={proj.deploymentUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigate) {
                        onNavigate(proj.deploymentUrl);
                      }
                    }}
                    className="community-app-link"
                  >
                    <span>View Application</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* 7. COLLABORATIVE INITIATIVES / PATHWAYS BAND */}
        <section className="community-pathways-band" aria-label="Collaborative Pathways">
          <div className="community-pathways-header">
            <h3>Community Pathways & Contribution</h3>
            <p>
              Open Idea is sustained by distributed open-source contributions, student fellowships,
              and public problem registries. Explore how to participate:
            </p>
          </div>

          <div className="community-pathways-grid">
            {COMMUNITY_PATHWAYS.map((pathway) => (
              <div key={pathway.id} className="community-pathway-box">
                <div>
                  <h4 className="community-pathway-title">{pathway.title}</h4>
                  <p className="community-pathway-desc">{pathway.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate(pathway.route)}
                  className="community-pathway-btn"
                >
                  <span>{pathway.actionLabel}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
