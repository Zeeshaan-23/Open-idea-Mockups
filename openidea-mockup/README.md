# OpenIdea — Where Open Innovation Takes Shape

A modern, responsive landing page and ecosystem showcase for OpenIdea built with React, Vite, and Lucide icons.

## Architecture & Homepage Experience

The Open Idea homepage is structured around a continuous editorial journey that guides visitors through the ecosystem:

1. **Hero Section (`Hero.jsx`)**
   - Full viewport experience on load (`min-height: calc(100vh - 64px)`).
   - Focused primary prompt interaction with 4 modes (`Build`, `Discover`, `Projects`, `Network`).
   - Web Speech API real-time voice dictation and multi-format file attachment pipeline.
   - Ambient Sacred Rosette background dome that seamlessly morphs into the falling medallion upon scrolling.

2. **Vertical Scroll Narrative Sequence (`ScrollNarrativeSequence.jsx`)**
   - Unified vertical scroll narrative connecting the core ecosystem pillars:
     - **01 Explore**: Verified research papers, open datasets, protocol specifications, and technical resources (`/openresources`).
     - **02 Build**: Autonomous scaffolding, production React application code, and studio workspace tools (`/studio`).
     - **03 Connect**: Active public working groups, research residencies, and collaborative initiatives (`/projects`).
     - **Knowledge Infrastructure Brief**: Compact overview of curated tools and datasets, leading to `/openresources`.
   - **Monumental Falling Sacred Rosette Medallion**:
     - Large 3D architectural emblem (`clamp(340px, 28vw, 460px)`) commanding the whitespace flank beside content.
     - Numismatic physical detailing: dual concentric bevel rims, specular radial gradient, and dynamic ground shadow foreshortening (`0.25 + 0.75 * |cos(ry)|`).
     - Calibrated in-place dwell rotation of **180° per step** (face-on → edge-on → face-on).
     - Fluid S-curve cosine transits across the viewport center (`sCurve(t) = (1 - Math.cos(π * t)) / 2`).
     - Offset corridor positioning (~160px gap from contents) clear of side action lines.
     - GPU-accelerated motion streaks streaming bottom-to-up on the viewport edges and above the emblem.
     - Clean vanishing transit behind the Knowledge Infrastructure card with zero lower boundary overflow.

3. **Bespoke Websites Offering (`WebsitesOffering.jsx`)**
   - High-performance web presence engineering and bespoke website intake (`/form`).

4. **Footer & Navigation (`Navbar.jsx`, `Footer.jsx`)**
   - Editorial navigation with light/dark theme toggle, mock authentication state, comprehensive sitemap, and feedback route.

## Technical Highlights

- **Zero React Scroll Re-renders**: Lockstep 1-to-1 scroll tracking via passive scroll event listeners directly mutating CSS Custom Variables (`--coin-x`, `--coin-y`, `--coin-ry`, `--coin-opacity`, `--action-lines-opacity`) on DOM node refs.
- **Pure Vanilla CSS**: Full adherence to `DESIGN.md` design tokens with zero Tailwind or ad-hoc framework dependencies.
- **Hardware-Accelerated Motion**: 3D perspective transforms (`transform-style: preserve-3d; translate3d; rotateY`) composited entirely on the GPU.
- **Responsive & Accessible**:
  - Sticky animation track automatically disables on screens `< 1024px`, rendering a clean single-column editorial reading order.
  - Respects `prefers-reduced-motion: reduce` by disabling spatial translation and continuous rotation.
  - Full WCAG AA contrast compliance, keyboard focus rings, and 44px+ touch targets.

## Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes bundled with Node.js)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Build output is generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

## Project Structure
- `src/components/`
  - `Hero.jsx` — Full-viewport ideation doorway and prompt console
  - `ScrollNarrativeSequence.jsx` — Unified vertical scroll narrative with falling 3D Sacred Rosette emblem
  - `WebsitesOffering.jsx` — Bespoke web engineering intake band
  - `Navbar.jsx` / `Footer.jsx` — Editorial header and comprehensive footer
  - `OpenIdeaLogo.jsx` — Vector Sacred Rosette flower symbol and wordmark
- `src/styles/`
  - `tokens.css` — Color, typography, spacing, radius, and elevation tokens
  - `scroll-narrative.css` — 3D coin perspective, action lines, alternating grid, and responsive styling
  - `hero.css` — Full-viewport hero styles, prompt console, and starter chips
  - `rosette.css` — Ambient dome background styling and morph transitions
- `public/` — Static assets and branding images
- `dist/` — Pre-built production files ready for hosting


