# Open Idea Feedback Page Replica

## Production Source

- **URL:** https://openidea.world/feedback
- **Live Build ID:** `fh3eXRTQwDla62OU1Ickr`
- **Audit Date:** September 22, 2026

## Purpose

High-fidelity, faithful static replica of the current production Open Idea Feedback page using purely standard HTML5, CSS3, and Vanilla JavaScript (zero React, Next.js, or external UI component libraries).

## Sections

The live production `/feedback` page contains the following sections in order:
1. **Persistent Glass Header:**
   - Open Idea Logo + Title (`/`)
   - Desktop Navigation (`About`, `Features`, `Pricing`, `App Studio` gradient button)
   - Header Right Actions (Mobile circular user icon, Desktop "Sign In" button, "Feedback" active link + `BETA` pill, Mobile hamburger toggle)
   - Collapsible Glass Mobile Navigation Drawer
2. **Main Feedback Hero Section:**
   - Dark gradient background (`#0c2321` via `#121f22` to `#0a1016`)
   - Digital Globe background image (`hero-globe.png`) with 30% opacity and cyan radial glow blur
   - Headline: "We value your feedback" (`text-3xl font-bold mb-6 text-center text-white`)
   - Accessible form (`aria-label="Send us feedback"`)
   - Resizable-none glass textarea with emerald border (`border border-emerald-400/30`), placeholder "Share your thoughts...", and HTML5 required attribute
   - Submit button with gradient background (`from-emerald-400 to-cyan-400`), dark text, and hover scale transition
3. **Accent Bottom Separator Line:**
   - 2px emerald linear gradient divider across full screen width
4. **Production Footer:**
   - Open Idea branding & mission statement ("Empowering Open, Sustainable Innovation Worldwide")
   - Social channels (Discord, LinkedIn, Twitter/X, Facebook, Instagram, Email)
   - Contact numbers (Mobile `+91 81302 96940`, Landline `011 4119 3699`)
   - Navigation links (Careers, Fellowship, Partnership, Get a Website, Support)
   - Community links (Problems & Ideas, Newsletter, AI News)
   - Legal links (Privacy Policy, Terms of Use, Cookie Policy)
   - Registered Address (Greater Noida West) & Copyright © 2026

## Form Behavior & Interactions

1. **Required Validation:** Textarea has the `required` attribute. If empty, the browser triggers native validation or client-side error warning.
2. **Submission State:** On form submit:
   - Textarea and Submit button are disabled.
   - Button text changes to "Sending...".
   - Simulates async completion (500ms).
   - Re-enables textarea and button, resets button text to "Submit".
   - Clears textarea input.
   - Renders emerald confirmation message: "Thank you for your feedback!".
3. **Resetting on Edit:** When typing again in the textarea, status messages are automatically cleared.
4. **Mobile Drawer:** Smooth toggle via hamburger button with outside-click closing.
5. **Workbench Synchronization:**
   - Embedded frames sync with the parent workbench through `assets/nav-sync.js`.
   - Internal links dispatch `WORKBENCH_NAVIGATE` to keep both desktop and mobile viewports synchronized across pages.
