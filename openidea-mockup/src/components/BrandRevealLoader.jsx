import React, { useState, useEffect } from 'react';
import { OpenIdeaFlowerSymbol } from './OpenIdeaLogo';
import '../styles/loader.css';

/**
 * BrandRevealLoader
 * Global loading & brand reveal overlay.
 * Choreography:
 * - Stage 1: Centered Emblem (~150ms)
 * - Stage 2: Fast Controlled Rotation (~650ms)
 * - Stage 3: Lockup Formation — Emblem glides left as 'pen idea' reveals (~500ms + hold)
 * - Stage 4: Upward Curtain Reveal — Entire layer moves upward out of viewport (~650ms)
 */
export default function BrandRevealLoader({ onComplete, forceTrigger = false }) {
  const [stage, setStage] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Reduced-motion path: Skip rotation and sliding, show lockup briefly, then reveal
      setShowWordmark(true);
      setHasSettled(true);
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 400);
      const finishTimer = setTimeout(() => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }, 700);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(finishTimer);
      };
    }

    // Standard authored choreography sequence:
    // Stage 1 -> Stage 2: Start rotation at 150ms
    const tSpinStart = setTimeout(() => {
      setStage(2);
      setIsSpinning(true);
    }, 150);

    // Stage 2 -> Stage 3: Settle rotation and reveal wordmark at 800ms
    const tLockup = setTimeout(() => {
      setStage(3);
      setIsSpinning(false);
      setHasSettled(true);
      setShowWordmark(true);
    }, 800);

    // Stage 3 -> Stage 4: Begin upward curtain reveal at 1700ms
    const tCurtain = setTimeout(() => {
      setStage(4);
      setIsExiting(true);
    }, 1700);

    // Complete and unmount overlay at 2350ms
    const tFinish = setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 2350);

    return () => {
      clearTimeout(tSpinStart);
      clearTimeout(tLockup);
      clearTimeout(tCurtain);
      clearTimeout(tFinish);
    };
  }, [forceTrigger, onComplete]);

  // Once completed, unmount from DOM to ensure zero keyboard or screen-reader obstruction
  if (isFinished) {
    return null;
  }

  return (
    <div
      className={`brand-reveal-overlay stage-${stage} ${isExiting ? 'curtain-up' : ''}`}
      role="status"
      aria-label="Loading Open Idea"
      aria-live="polite"
      aria-hidden={isExiting}
    >
      <div className="brand-reveal-stage-wrapper">
        <div className="brand-reveal-composition">
          {/* Emblem (Acts as the 'O' in Open Idea) */}
          <div
            className={`brand-reveal-emblem-wrapper ${isSpinning ? 'is-spinning' : ''} ${hasSettled ? 'is-settled' : ''}`}
          >
            <OpenIdeaFlowerSymbol size={48} id="global-loader-rosette-grad" />
          </div>

          {/* Wordmark ('pen idea') reveals to form '[EMBLEM]pen idea' */}
          <div className={`brand-reveal-wordmark-wrapper ${showWordmark ? 'is-revealed' : ''}`}>
            <span className="brand-reveal-wordmark-text">
              pen idea
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
