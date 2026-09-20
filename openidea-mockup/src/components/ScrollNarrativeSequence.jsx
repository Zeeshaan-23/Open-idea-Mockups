import React, { useEffect, useRef } from 'react';
import { 
  Compass, 
  Sparkles, 
  Users, 
  ArrowRight, 
  ArrowUpRight, 
  FileText, 
  Database, 
  Code2, 
  FolderGit2, 
  BookOpen, 
  CheckCircle2 
} from 'lucide-react';
import { OpenIdeaFlowerSymbol } from './OpenIdeaLogo';
import '../styles/scroll-narrative.css';

/**
 * ScrollNarrativeSequence
 *
 * Implements the vertical scroll narrative:
 * IDEA → EXPLORE → BUILD → CONNECT → OPEN RESOURCES → NEED A WEBSITE?
 *
 * Architecture & Characteristics:
 * - Falling Sacred Rosette is entirely owned by this component (no duplicate SVGs, no second rosette in WebsitesOffering)
 * - Zero React state re-renders on scroll: direct CSS variable mutation via DOM ref
 * - Direct 1-to-1 correspondence with scroll position (no trailing delay or floating behind the scroll)
 * - Staged milestones with settling moments at each step where the coin turns face-on
 * - Normal document flow for all content; sticky animation layer is purely visual with pointer-events: none
 * - Disabled on mobile (< 768px) and prefers-reduced-motion, with clean vertical reading order
 */

// Smooth cosine S-curve easing (0 derivative at both start and end for seamless tangents)
function sCurve(t) {
  return (1 - Math.cos(t * Math.PI)) / 2;
}

const NARRATIVE_MILESTONES = [
  // =========================================================================
  // STEP 01: EXPLORE DWELL ZONE (Right-Side Whitespace Corridor)
  // 180° ROTATION (0° → 180°)
  // In-place at y: 50vh, dedicated right-side flight corridor
  // =========================================================================
  { p: 0.00, flank: 'right',  y: 50, ry: 0,    scale: 1.00, shadow: 0.40, opacity: 1.0 },
  { p: 0.14, flank: 'right',  y: 50, ry: 90,   scale: 1.00, shadow: 0.35, opacity: 1.0 }, // Edge-on midway (+90°)
  { p: 0.28, flank: 'right',  y: 50, ry: 180,  scale: 1.00, shadow: 0.42, opacity: 1.0 }, // Face-on (+180° total)

  // =========================================================================
  // TRANSIT 1 → 2: RIGHT CORRIDOR DESCENT (Step 01 → Step 02)
  // Glides vertically down the right-side flight corridor (never crosses left)
  // =========================================================================
  { p: 0.34, flank: 'right',  y: 52, ry: 270,  scale: 1.00, shadow: 0.30, opacity: 1.0 }, // Edge-on midway (+90°)
  { p: 0.40, flank: 'right',  y: 50, ry: 360,  scale: 1.00, shadow: 0.40, opacity: 1.0 }, // Face-on arrival at Step 02

  // =========================================================================
  // STEP 02: BUILD DWELL ZONE (Right-Side Whitespace Corridor)
  // 180° ROTATION (360° → 540°)
  // In-place at y: 50vh, cleanly opposite Step 02 left editorial column
  // =========================================================================
  { p: 0.50, flank: 'right',  y: 50, ry: 450,  scale: 1.00, shadow: 0.35, opacity: 1.0 }, // Edge-on midway (+90°)
  { p: 0.61, flank: 'right',  y: 50, ry: 540,  scale: 1.00, shadow: 0.42, opacity: 1.0 }, // Face-on (+180° total)

  // =========================================================================
  // TRANSIT 2 → 3: RIGHT CORRIDOR DESCENT (Step 02 → Step 03)
  // Glides vertically down the right-side flight corridor (never crosses left)
  // =========================================================================
  { p: 0.67, flank: 'right',  y: 52, ry: 630,  scale: 1.00, shadow: 0.30, opacity: 1.0 }, // Edge-on midway (+90°)
  { p: 0.73, flank: 'right',  y: 50, ry: 720,  scale: 1.00, shadow: 0.40, opacity: 1.0 }, // Face-on arrival at Step 03

  // =========================================================================
  // STEP 03: CONNECT DWELL ZONE (Right-Side Whitespace Corridor)
  // 180° ROTATION (720° → 900°)
  // In-place at y: 50vh, cleanly opposite Step 03 left editorial column
  // =========================================================================
  { p: 0.81, flank: 'right',  y: 50, ry: 810,  scale: 1.00, shadow: 0.35, opacity: 1.0 }, // Edge-on midway (+90°)
  { p: 0.88, flank: 'right',  y: 50, ry: 900,  scale: 1.00, shadow: 0.42, opacity: 1.0 }, // Face-on (+180° total)

  // =========================================================================
  // TRANSIT BEHIND KNOWLEDGE INFRASTRUCTURE BRIEF & COMPLETE DISAPPEARANCE
  // Glides into center behind the card at y: 46vh, fading completely into nothingness
  // =========================================================================
  { p: 0.92, flank: 'center', y: 46, ry: 945,  scale: 0.96, shadow: 0.15, opacity: 0.35 },
  { p: 0.95, flank: 'center', y: 46, ry: 990,  scale: 0.90, shadow: 0.00, opacity: 0.00 },
  { p: 1.00, flank: 'center', y: 46, ry: 990,  scale: 0.90, shadow: 0.00, opacity: 0.00 }
];

function interpolateValue(m0, m1, t, key) {
  return m0[key] + (m1[key] - m0[key]) * t;
}

export default function ScrollNarrativeSequence({ onNavigateAction }) {
  const containerRef = useRef(null);
  const coinAnchorRef = useRef(null);
  const stageRef = useRef(null);

  // Passive, Zero-Re-render Scroll Listener directly updating CSS Custom Variables
  useEffect(() => {
    // Respect reduced motion and mobile thresholds
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;

    let ticking = false;
    let scrollStopTimer = null;

    const updateCoinPosition = () => {
      if (!containerRef.current || !coinAnchorRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const el = coinAnchorRef.current;
      const docEl = document.documentElement;

      // Dynamically measure rendered step cluster coordinates
      // Offset 65% across corridor: moves coin into right-side flight corridor safely separated from left content
      let rightFlank = 77;
      const s1Cluster = containerRef.current.querySelector('#step-explore .narrative-step-cluster');
      const contentFlow = containerRef.current.querySelector('.narrative-content-flow');
      const winW = window.innerWidth || 1440;

      if (s1Cluster && contentFlow) {
        const r1 = s1Cluster.getBoundingClientRect();
        const cf = contentFlow.getBoundingClientRect();
        // Shift coin into open right corridor away from left content column
        const targetRight = r1.right + (cf.right - r1.right) * 0.65;
        rightFlank = Math.min(80, Math.max(70, (targetRight / winW) * 100));
      }

      const resolveX = (m) => {
        if (m.flank === 'right') return rightFlank;
        if (m.flank === 'center') return 50;
        return m.x !== undefined ? m.x : rightFlank;
      };

      // Phase 1: User is above or scrolling through the Hero transition zone
      if (rect.top > 0) {
        // Hide side streaks when in Hero section
        if (stageRef.current) {
          stageRef.current.style.setProperty('--side-streaks-opacity', '0');
        }

        // Morph distance: the final 380px before the narrative section reaches the top of the viewport
        const morphDistance = Math.min(viewportHeight * 0.55, 380);

        if (rect.top > morphDistance) {
          // In hero viewport at first glance: coin is 100% hidden, ambient background dome is full
          el.style.setProperty('--coin-opacity', '0');
          el.style.setProperty('--coin-scale', '1.6');
          el.style.setProperty('--coin-ry', '0deg');
          el.style.setProperty('--coin-x', '50%');
          el.style.setProperty('--coin-y', '20vh');
          el.style.setProperty('--action-lines-opacity', '0');
          el.style.setProperty('--shadow-opacity', '0');
          el.style.setProperty('--shadow-scale-x', '1');
          docEl.style.setProperty('--ambient-dome-opacity', '0.19');
        } else {
          // As user scrolls down and narrative section approaches (rect.top goes from morphDistance down to 0)
          const morphP = Math.min(1, Math.max(0, 1 - (rect.top / morphDistance)));
          const coinScale = 1.6 - 0.6 * morphP; // Contracts from 1.6 down to 1.0
          const coinRy = 20 * morphP;
          // Smoothly glide toward rightFlank as user approaches the narrative section
          const coinX = 50 + (rightFlank - 50) * sCurve(morphP);
          const coinY = 20 + 30 * morphP; // Glides from 20vh to 50vh
          const domeOpacity = 0.19 - 0.15 * morphP;

          el.style.setProperty('--coin-opacity', `${morphP.toFixed(2)}`);
          el.style.setProperty('--coin-scale', `${coinScale.toFixed(3)}`);
          el.style.setProperty('--coin-ry', `${coinRy.toFixed(1)}deg`);
          el.style.setProperty('--coin-x', `${coinX.toFixed(2)}%`);
          el.style.setProperty('--coin-y', `${coinY.toFixed(1)}vh`);
          el.style.setProperty('--action-lines-opacity', '0');
          el.style.setProperty('--shadow-opacity', `${(0.35 * morphP).toFixed(2)}`);
          el.style.setProperty('--shadow-scale-x', '1');
          docEl.style.setProperty('--ambient-dome-opacity', `${domeOpacity.toFixed(3)}`);
        }
        ticking = false;
        return;
      }

      // Phase 2: User is inside ScrollNarrativeSequence (rect.top <= 0)
      const totalScrollable = rect.height - viewportHeight;
      if (totalScrollable <= 0) {
        ticking = false;
        return;
      }

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      // Find surrounding milestones
      let m0 = NARRATIVE_MILESTONES[0];
      let m1 = NARRATIVE_MILESTONES[NARRATIVE_MILESTONES.length - 1];

      for (let i = 0; i < NARRATIVE_MILESTONES.length - 1; i++) {
        if (p >= NARRATIVE_MILESTONES[i].p && p <= NARRATIVE_MILESTONES[i + 1].p) {
          m0 = NARRATIVE_MILESTONES[i];
          m1 = NARRATIVE_MILESTONES[i + 1];
          break;
        }
      }

      const segSpan = m1.p - m0.p;
      const t = segSpan > 0 ? (p - m0.p) / segSpan : 0;

      // S-curve cosine easing for horizontal movement to produce smooth S-trajectories with zero sharp corners
      const x0 = resolveX(m0);
      const x1 = resolveX(m1);
      const s_t = sCurve(t);
      const x = x0 + (x1 - x0) * s_t;

      const y = interpolateValue(m0, m1, t, 'y');
      const ry = interpolateValue(m0, m1, t, 'ry');
      const scale = interpolateValue(m0, m1, t, 'scale');
      const shadow = interpolateValue(m0, m1, t, 'shadow');
      let opacity = m0.opacity !== undefined && m1.opacity !== undefined
        ? interpolateValue(m0, m1, t, 'opacity')
        : 1.0;

      // Dynamic check for Knowledge Infrastructure card (.narrative-resources-brief)
      // Guarantees the coin completely disappears behind this card and never pokes out below it
      const briefEl = containerRef.current.querySelector('.narrative-resources-brief');
      if (briefEl) {
        const bRect = briefEl.getBoundingClientRect();
        // As the card enters the viewport (top reaches 70vh), smoothly fade the coin behind the card
        if (bRect.top < viewportHeight * 0.70) {
          const fadeProgress = Math.min(1, Math.max(0, (viewportHeight * 0.70 - bRect.top) / (viewportHeight * 0.25)));
          const maxAllowedOpacity = Math.max(0, 1 - fadeProgress);
          opacity = Math.min(opacity, maxAllowedOpacity);
        }
      }

      // Side motion action lines & coin slipstream action lines: active while scrolling within the narrative section
      if (stageRef.current && rect.bottom > 100 && opacity > 0.05) {
        stageRef.current.style.setProperty('--side-streaks-opacity', '1');
        el.style.setProperty('--action-lines-opacity', '1');
        clearTimeout(scrollStopTimer);
        scrollStopTimer = setTimeout(() => {
          if (stageRef.current) {
            stageRef.current.style.setProperty('--side-streaks-opacity', '0');
          }
          if (coinAnchorRef.current) {
            coinAnchorRef.current.style.setProperty('--action-lines-opacity', '0');
          }
        }, 450);
      } else {
        if (stageRef.current) {
          stageRef.current.style.setProperty('--side-streaks-opacity', '0');
        }
        el.style.setProperty('--action-lines-opacity', '0');
      }

      // Realistic physical shadow projection that narrows when the coin is edge-on
      const shadowScaleX = 0.25 + 0.75 * Math.abs(Math.cos((ry * Math.PI) / 180));

      // Direct DOM style mutation without React re-render
      el.style.setProperty('--coin-x', `${x.toFixed(2)}%`);
      el.style.setProperty('--coin-y', `${y.toFixed(1)}vh`);
      el.style.setProperty('--coin-ry', `${ry.toFixed(1)}deg`);
      el.style.setProperty('--coin-scale', `${scale.toFixed(3)}`);
      el.style.setProperty('--coin-opacity', `${opacity.toFixed(2)}`);
      el.style.setProperty('--shadow-opacity', `${(shadow * opacity).toFixed(2)}`);
      el.style.setProperty('--shadow-scale', `${scale.toFixed(2)}`);
      el.style.setProperty('--shadow-scale-x', `${shadowScaleX.toFixed(2)}`);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        // Run immediately in event callback for zero-lag correspondence
        updateCoinPosition();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateCoinPosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(scrollStopTimer);
      document.documentElement.style.removeProperty('--ambient-dome-opacity');
    };
  }, []);

  const handleAction = (e, dest, label, type) => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: dest,
        label: label,
        type: type,
        note: `Navigating to ${dest}`
      });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="scroll-narrative-section" 
      id="ecosystem" 
      aria-label="Open Idea Ecosystem Scroll Narrative"
    >
      {/* ==================================================================
          1. STICKY VISUAL ANIMATION LAYER (Purely Visual, Pointer-events: none)
          ================================================================== */}
      <div ref={stageRef} className="narrative-sticky-stage" aria-hidden="true">
        
        {/* Side Motion Action Lines (streaks streaming bottom-to-up in outer whitespace) */}
        <div className="narrative-side-streaks narrative-side-streaks-left" aria-hidden="true">
          <span className="side-streak streak-l1" />
          <span className="side-streak streak-l2" />
          <span className="side-streak streak-l3" />
          <span className="side-streak streak-l4" />
          <span className="side-streak streak-l5" />
          <span className="side-streak streak-l6" />
          <span className="side-streak streak-l7" />
        </div>

        <div className="narrative-side-streaks narrative-side-streaks-right" aria-hidden="true">
          <span className="side-streak streak-r1" />
          <span className="side-streak streak-r2" />
          <span className="side-streak streak-r3" />
          <span className="side-streak streak-r4" />
          <span className="side-streak streak-r5" />
          <span className="side-streak streak-r6" />
          <span className="side-streak streak-r7" />
        </div>

        <div className="narrative-coin-track">
          <div ref={coinAnchorRef} className="narrative-falling-coin-anchor">
            
            {/* Trailing Action Lines (Visible during step transitions) */}
            <div className="narrative-action-lines">
              <span className="narrative-action-line" />
              <span className="narrative-action-line" />
              <span className="narrative-action-line" />
              <span className="narrative-action-line" />
              <span className="narrative-action-line" />
            </div>

            {/* Monumental 3D Emblem Body occupying whitespace beside content */}
            <div className="narrative-falling-coin-3d">
              <OpenIdeaFlowerSymbol
                size="82%"
                id="narrative-falling-coin-symbol"
                viewBox="4 4 92 92"
                circleStroke={2.3}
                petalStroke={1.9}
                className="narrative-falling-coin-svg"
              />
            </div>

            {/* Grounding / Landing Shadow */}
            <div className="narrative-coin-ground-shadow" />

          </div>
        </div>
      </div>

      {/* ==================================================================
          2. CONTENT IN NORMAL DOCUMENT FLOW (100% Accessible & Interactive)
          ================================================================== */}
      <div className="narrative-content-flow">
        
        {/* Sequence Introduction Header */}
        <div className="narrative-sequence-header">
          <div className="narrative-kicker">The Architecture</div>
          <h2 className="narrative-headline">
            Three ways to start. <span className="serif-accent">One continuous ecosystem.</span>
          </h2>
        </div>

        {/* Alternating 3-Step Sequence */}
        <div className="narrative-steps-container">

          {/* --------------------------------------------------------------
              STEP 01: EXPLORE
              Vertical Order: Content on Top, Enlarged Preview Card Below
              Aligned to LEFT | Coin falls on RIGHT flank
              -------------------------------------------------------------- */}
          {/* --------------------------------------------------------------
              STEP 01: EXPLORE
              Single Left Editorial Column: Content -> Preview Stacked
              -------------------------------------------------------------- */}
          <div className="narrative-step-block" id="step-explore">
            <div className="narrative-step-cluster">
              
              {/* Step 01 Content */}
              <div className="narrative-step-content">
                <div className="narrative-step-header-meta">
                  <span className="narrative-step-num" aria-hidden="true">01</span>
                  <span className="narrative-step-product-badge">Open Resources</span>
                </div>
                <h3 className="narrative-step-verb">Explore</h3>
                <p className="narrative-step-desc">
                  Access verified research papers, open datasets, and technical resources curated for transparent, reproducible innovation.
                </p>
                <a
                  href="/openresources"
                  onClick={(e) => handleAction(e, '/openresources', 'Browse Resources', 'Explore Step')}
                  className="narrative-step-cta"
                  id="cta-step-explore"
                >
                  <span>Browse resources</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              {/* Step 01 Compact Preview Card (Directly Below Content) */}
              <div className="narrative-step-preview">
                <div className="step-preview-card" role="region" aria-label="Open Resources Preview">
                  <div className="step-preview-header">
                    <div className="step-preview-label">
                      <Compass size={14} aria-hidden="true" />
                      <span>Curated Resources</span>
                    </div>
                    <span className="step-preview-badge">Verified Metadata</span>
                  </div>
                  <div className="step-preview-body">
                    <div className="preview-resource-list">
                      
                      {/* Item 1: Research Paper */}
                      <div className="preview-resource-item">
                        <div className="preview-item-top">
                          <span className="preview-tag">Research Paper</span>
                          <span className="preview-format">PDF / Whitepaper</span>
                        </div>
                        <div className="preview-item-title">
                          Decentralized Intelligence in Open Innovation Networks
                        </div>
                        <div className="preview-item-publisher">
                          Open Idea Research Group · Peer Reviewed · 32 Citations
                        </div>
                      </div>

                      {/* Item 2: Open Dataset */}
                      <div className="preview-resource-item">
                        <div className="preview-item-top">
                          <span className="preview-tag">Open Dataset</span>
                          <span className="preview-format">Parquet / CSV</span>
                        </div>
                        <div className="preview-item-title">
                          Global Climate Adaptation & Urban Infrastructure Index
                        </div>
                        <div className="preview-item-publisher">
                          EcoSyz Public Data Lab · 42.8 GB · Updated Weekly
                        </div>
                      </div>

                      {/* Item 3: Protocol Spec */}
                      <div className="preview-resource-item">
                        <div className="preview-item-top">
                          <span className="preview-tag">Protocol Specification</span>
                          <span className="preview-format">RFC / Markdown</span>
                        </div>
                        <div className="preview-item-title">
                          Verifiable Autonomous Agent Execution Architecture (AAVE-1)
                        </div>
                        <div className="preview-item-publisher">
                          Systems Working Group · Draft Spec · CC BY 4.0
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="step-preview-footer">
                    <span>Showing 3 of 48 verified entries</span>
                    <a
                      href="/openresources"
                      onClick={(e) => handleAction(e, '/openresources', 'Explore Directory', 'Preview Link')}
                      className="step-preview-link"
                    >
                      <span>View catalogue</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* --------------------------------------------------------------
              STEP 02: BUILD
              Single Left Editorial Column: Content -> Preview Stacked
              -------------------------------------------------------------- */}
          <div className="narrative-step-block" id="step-build">
            <div className="narrative-step-cluster">
              
              {/* Step 02 Content */}
              <div className="narrative-step-content">
                <div className="narrative-step-header-meta">
                  <span className="narrative-step-num" aria-hidden="true">02</span>
                  <span className="narrative-step-product-badge">Studio</span>
                </div>
                <h3 className="narrative-step-verb">Build</h3>
                <p className="narrative-step-desc">
                  An AI-assisted workspace for engineering functional web applications with complete source code ownership and zero vendor lock-in.
                </p>
                <a
                  href="/studio"
                  onClick={(e) => handleAction(e, '/studio', 'Open Studio', 'Build Step')}
                  className="narrative-step-cta"
                  id="cta-step-build"
                >
                  <span>Open Studio</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              {/* Step 02 Workspace Preview (Directly Below Content) */}
              <div className="narrative-step-preview">
                <div className="step-preview-card" role="region" aria-label="Studio Workspace Preview">
                  <div className="step-preview-header">
                    <div className="preview-code-tabs">
                      <Code2 size={14} aria-hidden="true" style={{ color: 'var(--brand-blue)' }} />
                      <span className="preview-tab-pill">App.jsx</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Workspace</span>
                    </div>
                    <span className="step-preview-badge">
                      <CheckCircle2 size={12} aria-hidden="true" />
                      <span>Scaffold Active</span>
                    </span>
                  </div>
                  <div className="step-preview-body">
                    <pre className="preview-code-snippet" tabIndex={0} aria-label="Exportable React Code Example">
                      <code>
                        <span className="code-cm">{'// Production-grade application scaffold'}</span>{'\n'}
                        <span className="code-kw">import</span> {'{ useOpenData }'} <span className="code-kw">from</span> <span className="code-str">'@openidea/core'</span>;{'\n'}
                        <span className="code-kw">import</span> {'{ StudioInterface }'} <span className="code-kw">from</span> <span className="code-str">'@openidea/ui'</span>;{'\n\n'}
                        <span className="code-kw">export function</span> <span className="code-fn">TelemetryApp</span>() {'{'}{'\n'}
                        {'  '}<span className="code-kw">const</span> {'{ data, loading }'} = <span className="code-fn">useOpenData</span>(<span className="code-str">'climate-index'</span>);{'\n'}
                        {'  '}<span className="code-kw">if</span> (loading) <span className="code-kw">return</span> &lt;<span className="code-fn">TelemetryLoader</span> status=<span className="code-str">"syncing"</span> /&gt;;{'\n'}
                        {'  '}<span className="code-kw">return</span> &lt;<span className="code-fn">StudioInterface</span> dataset={'{data}'} exportable /&gt;;{'\n'}
                        {'}'}
                      </code>
                    </pre>
                  </div>
                  <div className="step-preview-footer">
                    <span>Standard React + CSS tokens · Zero lock-in</span>
                    <a
                      href="/studio"
                      onClick={(e) => handleAction(e, '/studio', 'Open Studio Gateway', 'Preview Link')}
                      className="step-preview-link"
                    >
                      <span>Launch workspace</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* --------------------------------------------------------------
              STEP 03: CONNECT
              Single Left Editorial Column: Content -> Preview Stacked
              -------------------------------------------------------------- */}
          <div className="narrative-step-block" id="step-connect">
            <div className="narrative-step-cluster">
              
              {/* Step 03 Content */}
              <div className="narrative-step-content">
                <div className="narrative-step-header-meta">
                  <span className="narrative-step-num" aria-hidden="true">03</span>
                  <span className="narrative-step-product-badge">Projects & Community</span>
                </div>
                <h3 className="narrative-step-verb">Connect</h3>
                <p className="narrative-step-desc">
                  Collaborate across an open repository of live projects, research residencies, and community initiatives solving real challenges.
                </p>
                <a
                  href="/projects"
                  onClick={(e) => handleAction(e, '/projects', 'Explore Projects', 'Connect Step')}
                  className="narrative-step-cta"
                  id="cta-step-connect"
                >
                  <span>Explore projects</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>

              {/* Step 03 Community Preview (Directly Below Content) */}
              <div className="narrative-step-preview">
                <div className="step-preview-card" role="region" aria-label="Community Working Groups Preview">
                  <div className="step-preview-header">
                    <div className="step-preview-label">
                      <Users size={14} aria-hidden="true" />
                      <span>Public Working Groups</span>
                    </div>
                    <span className="step-preview-badge">Open Collaboration</span>
                  </div>
                  <div className="step-preview-body">
                    <div className="preview-project-list">
                      
                      {/* Project 1 */}
                      <div className="preview-project-item">
                        <div className="preview-project-header">
                          <div className="preview-project-title">EcoSyz Open Data Working Group</div>
                          <span className="preview-project-contributors">18 Contributors</span>
                        </div>
                        <p className="preview-project-desc">
                          Standardizing geospatial sensors and urban climate adaptation datasets in open formats.
                        </p>
                        <div className="preview-project-meta">
                          <span className="preview-meta-pill">Climate Tech</span>
                          <span className="preview-meta-pill">Apache 2.0</span>
                        </div>
                      </div>

                      {/* Project 2 */}
                      <div className="preview-project-item">
                        <div className="preview-project-header">
                          <div className="preview-project-title">Decentralized Scaffolding Project</div>
                          <span className="preview-project-contributors">24 Contributors</span>
                        </div>
                        <p className="preview-project-desc">
                          Modular scaffolding templates for autonomous agents and verifiable API tools.
                        </p>
                        <div className="preview-project-meta">
                          <span className="preview-meta-pill">AI Scaffolding</span>
                          <span className="preview-meta-pill">MIT License</span>
                        </div>
                      </div>

                      {/* Project 3 */}
                      <div className="preview-project-item">
                        <div className="preview-project-header">
                          <div className="preview-project-title">Verifiable Peer Review Commons</div>
                          <span className="preview-project-contributors">12 Contributors</span>
                        </div>
                        <p className="preview-project-desc">
                          Decentralized evaluation pipelines and open citation verification graphs.
                        </p>
                        <div className="preview-project-meta">
                          <span className="preview-meta-pill">Governance</span>
                          <span className="preview-meta-pill">CC BY 4.0</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="step-preview-footer">
                    <span>Active working group commons</span>
                    <a
                      href="/projects"
                      onClick={(e) => handleAction(e, '/projects', 'All Initiatives', 'Preview Link')}
                      className="step-preview-link"
                    >
                      <span>View all initiatives</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================================================================
            5. DEDICATED OPEN RESOURCES BRIEF
            Substantially smaller than the three Architecture steps.
            Provides representative context and a clear CTA to /openresources.
            ================================================================ */}
        <div className="narrative-resources-brief" role="region" aria-label="Open Resources Dedicated Brief">
          <div className="brief-header">
            <div className="brief-kicker">
              <BookOpen size={13} aria-hidden="true" />
              <span>Knowledge Infrastructure</span>
            </div>
            <h3 className="brief-title">
              Curated tools and datasets to accelerate research.
            </h3>
            <p className="brief-desc">
              Explore peer-reviewed research papers, verified open datasets, and production starter kits maintained by the Open Idea collective.
            </p>
          </div>

          {/* 3 Representative Categories */}
          <div className="brief-categories-grid">
            
            <div className="brief-category-col">
              <div className="brief-category-header">
                <FileText size={14} className="brief-category-icon" aria-hidden="true" />
                <div className="brief-category-name">Research Papers</div>
              </div>
              <p className="brief-category-text">
                Whitepapers, decentralization protocols, and open innovation methodology notes.
              </p>
            </div>

            <div className="brief-category-col">
              <div className="brief-category-header">
                <Database size={14} className="brief-category-icon" aria-hidden="true" />
                <div className="brief-category-name">Open Datasets</div>
              </div>
              <p className="brief-category-text">
                Climate adaptation metrics, urban infrastructure indexes, and multilingual corpora.
              </p>
            </div>

            <div className="brief-category-col">
              <div className="brief-category-header">
                <FolderGit2 size={14} className="brief-category-icon" aria-hidden="true" />
                <div className="brief-category-name">Developer Scaffolding</div>
              </div>
              <p className="brief-category-text">
                Production Next.js, Supabase, and React application boilerplates with clean tokens.
              </p>
            </div>

          </div>

          {/* Action Row */}
          <div className="brief-action-row">
            <span className="brief-note">
              Free to browse, download, and build upon · CC BY-SA 4.0 / Open Source
            </span>
            <a
              href="/openresources"
              onClick={(e) => handleAction(e, '/openresources', 'Explore All Resources', 'Resources Brief CTA')}
              className="brief-cta-btn"
              id="cta-brief-explore-all"
            >
              <span>Explore all resources</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Trail / Transition to Websites CTA */}
        <div className="narrative-landing-trail" aria-hidden="true">
          <div className="narrative-landing-line" />
          <div className="narrative-landing-dot" />
        </div>

      </div>
    </section>
  );
}
