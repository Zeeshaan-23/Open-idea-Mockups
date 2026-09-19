---
name: Open Idea
description: The Open Innovation Infrastructure
colors:
  navy-deep: "#1B3C53"
  blue-primary: "#2F8FEF"
  cyan-accent: "#13B2CF"
  lavender-soft: "#8C88D5"
  paper-bg: "#F8F9FA"
  card-surface: "#FFFFFF"
  card-subtle: "#F1F4F6"
  border-hairline: "rgba(27, 60, 83, 0.08)"
  text-primary: "#1B3C53"
  text-secondary: "#475569"
  text-muted: "#64748B"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.navy-deep}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.navy-deep}"
    rounded: "{rounded.md}"
    padding: "10px 18px"
---

# Design System: Open Idea

## Overview

**Creative North Star: "Editorial Technology: Smart, Human, Useful, Open"**

Open Idea is an editorial technology platform where research, engineering, open datasets, and community building converge. The visual world is quiet, confident, and scholarly—reminiscent of a modern university press or high-end laboratory notebook fused with precise digital tooling.

The interface prioritizes reading, clarity, and architectural whitespace over decorative noise. It rejects the saturated neon gradients, dark glassmorphism, and card-bloat of speculative AI landing pages, grounding the experience in crisp typography, natural paper surfaces, and deliberate structural divisions.

**Key Characteristics:**
- Editorial authority anchored by Deep Navy typography and Instrument Serif accents
- Warm, breathable paper-white surfaces as the primary resting state
- Restrained, purposeful application of Blue, Cyan, and Lavender
- Asymmetric, human layouts with variable density rather than repetitive 3-card stacks
- Tactile, precise interaction affordances with clear physical boundaries

## Colors

The palette derives strictly from the official Open Idea Brand Identity. Colors serve hierarchy, structural pacing, and state affordance, never background decoration.

### Primary
- **Deep Navy** (`#1B3C53`): The structural backbone. Governs display headings, primary buttons, high-contrast badges, and grounding borders.

### Secondary & Accent
- **Open Blue** (`#2F8FEF`): The primary interaction voice. Used for active navigation tabs, interactive links, focus rings, and primary action states.
- **Luminous Cyan** (`#13B2CF`): The indicator accent. Reserved for live status indicators, research dataset tags, and subtle gradient shifts on the sacred rosette mark.
- **Quiet Lavender** (`#8C88D5`): The tertiary intellectual accent. Used sparingly for academic badges, fellowship highlights, and subtle hover borders.

### Neutral & Surfaces
- **Paper Canvas** (`#F8F9FA`): The primary light background. A soft, warm off-white that prevents clinical eye strain and establishes an editorial canvas.
- **Pure Surface** (`#FFFFFF`): Crisp white card planes that lift slightly above the paper canvas through fine hairline borders.
- **Hairline Border** (`rgba(27, 60, 83, 0.08)`): Ultra-crisp architectural lines that frame sections and divide content without heavy shadows.

### Named Rules
**The Restraint Rule.** Accent colors (`#2F8FEF`, `#13B2CF`, `#8C88D5`) must never exceed 10% of total surface area on any viewport. The authority of the brand lives in Deep Navy and whitespace.

**The No-Glow Rule.** Neon drop-shadows, blurred radial color discs, and glassmorphic backdrop filters are forbidden. Contrast is created through tone, typography weight, and crisp borders.

## Typography

**Display / Editorial Accent:** Instrument Serif (with Georgia fallback)  
**Primary UI & Body:** Plus Jakarta Sans (with system-ui fallback)

The typographic character pairs modern geometric engineering precision (`Plus Jakarta Sans`) with literary gravitas (`Instrument Serif`). The serif is deployed like an intentional italic annotation or phrase accent within headlines, never as an unreadable body font.

### Hierarchy
- **Display** (Regular 400, `clamp(2.75rem, 5.5vw, 4.5rem)`, line-height 1.1, letter-spacing `-0.02em`): Hero headline statement.
- **Headline** (Bold 700 / ExtraBold 800, `clamp(1.75rem, 3.25vw, 2.5rem)`, line-height 1.2): Major section titles.
- **Title** (SemiBold 600, `1.125rem` to `1.25rem`, line-height 1.35): Module, card, and paper titles.
- **Body** (Regular 400 / Medium 500, `0.9375rem` to `1rem`, line-height 1.6, max line-length `68ch`): Paragraphs and descriptive copy.
- **Label / Meta** (SemiBold 600 / Bold 700, `0.6875rem` to `0.75rem`, letter-spacing `0.06em`, uppercase where appropriate): Kicker headers, categories, and technical tags.

### Named Rules
**The Editorial Accent Rule.** `Instrument Serif` must appear at least once in the hero statement and can appear in major section titles, but must never be used for labels, buttons, or technical data tables.

## Layout

The layout uses an asymmetrical editorial grid with generous whitespace and intentional density shifts:
- **Max Container:** `1200px` with responsive padding (`1.25rem` mobile, `2rem` tablet, `3rem` desktop).
- **Asymmetry over Homogeneity:** Mix 2-column editorial splits, single-column focal moments, and modular horizontal data bands instead of repeating identical 3-card grids.
- **Vertical Rhythm:** Major thematic shifts use `5rem` to `6rem` vertical padding; related components inside a block use `1.5rem` to `2rem`.

## Elevation & Depth

Open Idea is a predominantly flat, ink-on-paper system. Depth is communicated via **tonal layering and crisp 1px hairline borders**, not heavy drop shadows.
- **Base Level:** Paper Canvas (`#F8F9FA`).
- **Elevated Planes:** Card Surface (`#FFFFFF`) with `1px solid rgba(27, 60, 83, 0.08)` and subtle `0 1px 3px rgba(27, 60, 83, 0.04)`.
- **Hover Response:** Subtle translation (`translateY(-2px)`) and border emphasis (`rgba(47, 143, 239, 0.3)`), never large blurry shadows.

## Shapes

- **Restrained Radii:** Modest `8px` to `12px` corners on cards and panels. Only pill buttons and badges use `9999px`.
- **Logo Integrity:** The 6-petal sacred rosette is never stretched, skewed, or placed in a jarring neon bubble. It exists as clean vector geometry in Deep Navy or the subtle brand gradient.

## Components

### Prompt & Discovery Console
- Rather than a giant dark rectangle dominating the entire screen, the prompt box is integrated as a thoughtful editorial instrument: a clean white card with crisp borders, a clearly articulated mode switch (`Build`, `Discover`, `Projects`, `Network`), a subtle text entry area, and accessible action tools (file upload, mic, submit).

### Buttons
- **Primary:** Deep Navy (`#1B3C53`) with white text and `8px` radius. Hover shifts to subtle blue or dark slate.
- **Secondary:** White surface with hairline border (`#E2E8F0`) and Deep Navy text.
- **Ghost:** Transparent with Deep Navy text, highlighting in soft blue tint on hover.
- **Touch Target:** Strictly 44px+ on all devices.

## Do's and Don'ts

### Do:
- **Do** treat Light Mode as the primary, polished presentation of the brand.
- **Do** pair Plus Jakarta Sans with selective Instrument Serif accents to evoke an intelligent, human tone.
- **Do** preserve every single working route, submission destination, file upload pipeline, and external corporate destination.
- **Do** use generous whitespace and varied layout structures to give each section an individual purpose.

### Don't:
- **Don't** use neon dark-mode glassmorphism, floating purple/cyan blurred blobs, or futuristic cyberpunk gradients.
- **Don't** make every section a centered headline with a 3-card grid.
- **Don't** display artificial top disclaimer banners or floating PWA banners that obstruct the hero on load.
- **Don't** use aggressive bouncing animations on support buttons.
- **Don't** fabricate fake social proof, inflated metrics, or startup buzzwords.
