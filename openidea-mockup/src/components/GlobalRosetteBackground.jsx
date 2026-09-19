import React from 'react';
import { OpenIdeaFlowerSymbol } from './OpenIdeaLogo';
import '../styles/rosette.css';

/**
 * GlobalRosetteBackground
 *
 * Extracts the official Open Idea Sacred Rosette background dome into a
 * persistent global visual element.
 *
 * Characteristics:
 * - Uses official OpenIdeaFlowerSymbol emblem implementation
 * - Fixed to the bottom center of the viewport
 * - Semicircular dome composition (100vw x 100vw with bottom 50% clipped)
 * - Continuous slow 60s CSS rotation (pure CSS, no mouse tracking, no JS loops)
 * - Approved low-opacity treatment: 0.19 (light theme) / 0.17 (dark theme)
 * - Sits behind page content (pointer-events: none, z-index: 0)
 * - Automatically hidden on mobile (< 768px), matching existing mobile behavior
 * - Mounted at app shell level so animation never restarts or changes on route changes
 */
export default function GlobalRosetteBackground() {
  return (
    <div className="page-background-rosette-dome" aria-hidden="true">
      <div className="bg-rosette-turn-wrapper">
        <OpenIdeaFlowerSymbol
          size="100%"
          id="global-bg-rosette-grad"
          viewBox="4 4 92 92"
          circleStroke={1.0}
          petalStroke={0.8}
          className="bg-rosette-svg"
        />
      </div>
    </div>
  );
}
