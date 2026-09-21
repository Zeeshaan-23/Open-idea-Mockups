import React from 'react';
import { ArrowLeft, Compass, ArrowRight } from 'lucide-react';
import '../styles/notfound.css';

/**
 * NotFoundPage (404)
 * Editorial 404 experience extending the Open Idea design system.
 * Restrained, confident, and functional in both light and dark themes.
 */
export default function NotFoundPage({ onNavigate, invalidPath = '' }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/');
    }
  };

  const handleResourcesClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/openresources');
    }
  };

  return (
    <div className="not-found-page-shell" role="main" aria-label="Page Not Found">
      <div className="not-found-container">

        {/* Centered Large 404 Kicker */}
        <div className="not-found-kicker">
          <span>404 &mdash; Page Not Found</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="not-found-headline">
          This <span className="not-found-headline-em">idea</span> doesn't exist yet.
        </h1>

        {/* Invalid Path Pill if available */}
        {invalidPath && invalidPath !== '/' && (
          <div className="not-found-path-pill" title={invalidPath}>
            <span>Path: {invalidPath}</span>
          </div>
        )}

        {/* Supporting Copy */}
        <p className="not-found-desc">
          The destination you requested is not part of the Open Idea catalog or may have been relocated.
          Explore our open research index or return to the main platform.
        </p>

        {/* Actions */}
        <div className="not-found-actions">
          <a
            href="/"
            onClick={handleHomeClick}
            className="not-found-btn-primary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back home</span>
          </a>

          <a
            href="/openresources"
            onClick={handleResourcesClick}
            className="not-found-btn-secondary"
          >
            <Compass size={16} aria-hidden="true" />
            <span>Explore Open Resources</span>
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

      </div>
    </div>
  );
}
