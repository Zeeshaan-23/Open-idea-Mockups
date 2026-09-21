# Open Idea About Page Replica

## Production Source

- **URL:** https://openidea.world/about
- **Live Build ID:** `fh3eXRTQwDla62OU1Ickr`
- **Audit Date:** September 22, 2026

## Purpose

High-fidelity, connected static replica of the current production Open Idea About page using purely standard HTML, CSS, and Vanilla JavaScript (zero React, Next.js, or external UI component libraries).

## Sections

The live production `/about` page contains the following sections in order:
1. **Persistent Glass Header:**
   - Open Idea Logo + Title (`/`)
   - Desktop Navigation (`About` active with emerald badge styling, `Features`, `Pricing`, `App Studio` gradient button)
   - Header Right Actions (Mobile circular user icon, Desktop "Sign In" button, "Feedback" link + `BETA` pill, Mobile hamburger toggle)
   - Collapsible Glass Mobile Navigation Drawer
2. **Top-Right Floating Action Bar:**
   - "Contribute to Open Idea" badge button (`hidden sm:flex`, links to `/contribute`)
   - GitHub icon button (`flex`, links to `https://github.com/Sony17/Ecosyz`)
3. **Hero Section:**
   - Dark gradient background (`#0c2321` via `#121f22` to `#0a1016`)
   - Digital Globe background image (`hero-globe.png`) with 30% opacity and cyan radial glow blur
   - Headline: "The future of" + "INNOVATION" (tri-color gradient: emerald-cyan-indigo)
   - Subtitle: "The World's Open Innovation Infrastructure"
   - Search & Discover Form (Magnifying glass icon, placeholder: "Search problems, ideas, or open-source solutions.", and "Discover" gradient button)
   - 3 CTA Buttons:
     - "Build App" (gradient button, links to `/projects`)
     - "Join Community" (emerald outlined button, links to `/community`)
     - "View Projects" (cyan outlined button, links to `/projects`)
4. **Bottom Separator Line:**
   - 2px emerald linear gradient divider across full screen width
5. **Bottom-Right Floating Action Button:**
   - "Research Whitepaper" button with document icon, links to `/researchwhitepaper`
6. **PWA Install Toast Card:**
   - "Install Open Idea" prompt with "Install" and "Not now" action triggers
7. **Production Footer:**
   - Open Idea branding & mission statement ("Empowering Open, Sustainable Innovation Worldwide")
   - Social channels (Discord, LinkedIn, Twitter/X, Facebook, Instagram, Email)
   - Contact numbers (Mobile `+91 81302 96940`, Landline `011 4119 3699`)
   - Navigation links (Careers, Fellowship, Partnership, Get a Website, Support)
   - Community links (Problems & Ideas, Newsletter, AI News)
   - Legal links (Privacy Policy, Terms of Use, Cookie Policy)
   - Registered Address (Greater Noida West) & Copyright © 2026

## Content

All production copy has been replicated verbatim:
- Primary Heading: "The future of INNOVATION"
- Tagline: "The World's Open Innovation Infrastructure"
- Search Placeholder: "Search problems, ideas, or open-source solutions."
- Button Labels: "Discover", "Build App", "Join Community", "View Projects", "Contribute to Open Idea", "Research Whitepaper"
- Full footer text including phone numbers, links, addresses, and copyright notice

## Interactions

1. **Active Nav Link:**
   - "About" navigation item renders with active emerald highlighting:
     `color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); box-shadow: 0 4px 6px -1px rgba(52, 211, 153, 0.1);`
2. **Mobile Menu:**
   - Clicking hamburger button toggles `#mobile-nav.open`.
   - Pressing `Escape` or clicking outside dismisses mobile drawer.
3. **Discover Search Form:**
   - Submitting a non-empty query simulates navigation to `/openresources?q=<query>`.
   - Submitting an empty query triggers a focus warning state.
4. **PWA Install Prompt:**
   - "Not now" smoothly slides and dismisses toast card.
   - "Install" confirms installation.
5. **Buttons Hover & Active States:**
   - Hover scales (105%), glowing drop shadows, color transitions matching production Next.js styles.

## Navigation

- **Homepage → About:**
  - `../site.html` → `about/site.html`
- **About → Homepage:**
  - Logo link in header points to `../site.html`
- **About → Pricing:**
  - "Pricing" link in header points to `../pricing/site.html`
- **About → Authentication:**
  - "Sign In" button points to `../auth/site.html?redirect=%2Fabout`
  - Mobile user icon points to `../auth/site.html?redirect=%2Fabout`
- **About → Other Routes:**
  - Preserved standard paths (`/features`, `/studio`, `/contribute`, `/projects`, `/community`, `/researchwhitepaper`, etc.)

## Assets

- Logo: `../assets/logos/logo.png`
- Globe: `../assets/images/hero-globe.png`
- Icons: Font Awesome 6 Free (`fab fa-github`, `fab fa-discord`, `fab fa-linkedin`, `fab fa-twitter`, `fab fa-facebook`, `fab fa-instagram`, `fas fa-envelope`, `fas fa-phone`, `fas fa-file-alt`)

## Fonts

- Heading: `Space Grotesk` (weights 600, 700, 800, 900)
- Body: `Inter` (weights 400, 500, 600, 700)

## Desktop Behavior

- Rendered at 1440px width.
- Split 12-column grid layout (left content in 6-column span, right occupied by luminous 3D globe background).
- Top-right shows both "Contribute to Open Idea" badge and GitHub square icon button.
- Bottom-right shows "Research Whitepaper" floating button.
- 3 CTA buttons display in a horizontal row (`flex-row gap-4`).

## Mobile Behavior

- Rendered at 390px (and 375px/414px) viewport width.
- Desktop nav is hidden; replaced with circular user sign-in icon and hamburger menu toggle.
- Top-right "Contribute to Open Idea" text badge is hidden (`hidden sm:flex`), preserving clean header space, while GitHub icon remains accessible.
- Headline and subheadings scale smoothly (`text-3xl sm:text-5xl`).
- 3 CTA buttons stack vertically (`flex-col gap-4`) for thumb touch targets.
- Search input expands to 100% width with internal padding for the Discover button.
- Bottom-right "Research Whitepaper" button rests neatly above mobile navigation bar.

## Static Limitations

- The live Next.js App Studio IDE (`/studio`) and AI Chatbot (`/chat`) require server-side WebSocket/LLM infrastructure; links route to authentication or prompt modal states.
- Remote API data fetching on `/openresources` is simulated via local query dispatch.

## Verification

- **Production Comparison:** Live comparison against `https://openidea.world/about` confirms exact layout, gradients, typography, and element placement.
- **Desktop Check:** Tested at 1440×900 viewport; all elements align cleanly with zero horizontal overflow.
- **Mobile Check:** Tested at 390×844 and 375×667 viewports; mobile menu opens, forms resize, no text truncation.
- **Console Status:** Zero JavaScript errors, zero missing asset warnings.
