# Open Idea Production Website Replica

A faithful, standalone static replica of the current production website: [https://openidea.world/](https://openidea.world/).

Built strictly with **Pure Vanilla HTML, CSS, and JavaScript**.
No React, Next.js, TypeScript, Vite, Tailwind, or external component libraries.

---

## Source of Truth
- **Production URL**: [https://openidea.world/](https://openidea.world/)
- **Target Folder**: `d:\Mockups\openidea-current-site-replica\`
- **Isolated Workspace**: Completely separate directory without modifying any existing projects.

---

## Replicated Sections & Features

### 1. Header / Navigation Bar
- **Logo & Branding**: Open Idea icon with gradient text.
- **Desktop Navigation**: Centered links (`About`, `Features`, `Pricing`) and high-contrast `App Studio` gradient CTA button.
- **Desktop Action Group**: `Sign In` gradient button, `Feedback` link, and yellow `BETA` pill badge.
- **Mobile Navigation**:
  - Circular gradient quick auth button (`md:hidden`).
  - Hamburger toggle button (`md:hidden`).
  - Responsive slide-down glass dropdown menu (`#mobile-nav`) with full-width action buttons and links.

### 2. Hero Section
- **Background Visuals**:
  - Exact production `hero-globe.png` digital globe background image positioned on right.
  - Cyan radial gradient ambient glow overlay (`w-[700px] h-[400px] blur-3xl`).
- **Top-Right Quick Actions**:
  - `Contribute to Open Idea` border pill (hidden on mobile).
  - GitHub icon box linking to `https://github.com/Sony17/Ecosyz`.
- **Headline**:
  - `Research * Build * Collaborate` with multi-stop gradients and pulsing colored asterisks (`*`).
  - Space Grotesk font with 900 weight and `-0.04em` letter spacing.
- **Subtitle**:
  - "Where imagination shapes value-driven solutions".
- **Action Mode Pills**:
  - `Build App` (default active with emerald-to-cyan gradient and drop shadow).
  - `Discover`, `Projects`, `Network` (with colored borders, hover states, and dynamic route target switching).
- **Interactive Prompt Form Box**:
  - Dark container `#141618` with subtle border and focus rings.
  - Auto-resizing textarea with caret highlight.
  - **Typewriter Placeholder Animation**: cycles continuously through 8 production phrases:
    1. *Explore open source resources*
    2. *Search millions of research papers*
    3. *Find connections among resources*
    4. *Build app and innovate*
    5. *Discover open datasets*
    6. *Collaborate with innovators*
    7. *Explore cutting-edge projects*
    8. *Find solutions to complex problems*
  - Bottom controls:
    - `+` Action / file attachment button (with hidden file input supporting `.pdf, .txt, .csv, .md, .json, .png, .jpg, .jpeg, .webp, .gif`).
    - "Tab new line · Enter to go" keyboard hint (hidden on mobile).
    - Microphone icon for voice input.
    - Submit arrow button.
- **Quick Template Shortcuts**:
  - `SaaS Landing`: Injects TaskFlow SaaS landing page specification.
  - `Dev Portfolio`: Injects Alex Chen developer portfolio specification.
  - `E-commerce`: Injects Elevate minimalist clothing brand specification.
  - `Agency Site`: Injects Pixel & Code digital agency specification.
- **Bottom Separator**: Dual emerald dividing gradient lines.

### 3. Footer
- **Branding Column**: Open Idea logo (32px) and title.
- **Mission Statement**: "Empowering Open, Sustainable Innovation Worldwide".
- **Social Media Icons**: Discord, LinkedIn, Twitter/X, Facebook, Instagram, and Email.
- **Contact & Primary Navigation**:
  - Phone: `+91 81302 96940`
  - Landline: `011 4119 3699`
  - Links: `Careers`, `Fellowship`, `Partnership`, `Get a Website`, `Support`.
- **Secondary Links Row**: `Problems & Ideas`, `Newsletter`, `AI News`.
- **Legal Links Row**: `Privacy Policy`, `Terms of Use`, `Cookie Policy`.
- **Registered Address**: `8125, 8th Floor, Gaur City Mall Office Space, Sector 4, Greater Noida West, Gautam Buddha Nagar, 201318`.
- **Copyright Notice**: `© 2026 Open Idea. All rights reserved. Proudly built in India 🇮🇳 with ❤️ for global innovation.`

### 4. Floating Chat Widget
- Fixed floating button labeled `Chat` with emerald-to-cyan gradient and bounce animation.
- Interactive support drawer with category tabs (`General`, `Bug`, `Feature`), real-time simulated message exchange, and auto-scroll message container.

---

## Desktop + Mobile Synchronized Comparison Workspace

The primary entry point `index.html` implements the side-by-side comparison workbench:
- **Left Viewport**: Desktop viewport at exactly **1440px × 900px**.
- **Right Viewport**: Mobile viewport at exactly **390px × 844px**.
- **Single Source of Truth**: Both viewports load the exact same responsive file `site.html`, sharing `styles.css` and `script.js`.
- **Bi-Directional Real-Time Synchronization**:
  - **Scroll Sync**: Scrolling either the desktop or mobile viewport automatically scrolls the other proportionally so you can review both layouts at the same vertical position.
  - **Prompt Input Sync**: Typing into the prompt textarea in either view updates the other view in real time.
  - **Template Selection Sync**: Clicking any of the 4 template pills (`SaaS Landing`, `Dev Portfolio`, `E-commerce`, `Agency Site`) populates the prompt into both viewports simultaneously.
  - **Mode Pills Sync**: Toggling between `Build App`, `Discover`, `Projects`, and `Network` updates the active tab in both viewports.
  - **Chat Drawer Sync**: Opening the floating chat drawer or sending messages synchronizes across both viewports.
- **Workbench Toolbar Controls**:
  - `Sync: ON / OFF`: Toggle synchronization on or off with a single click.
  - `Fit Screen`: Automatically scales both viewports using CSS transforms so both 1440px desktop and 390px mobile viewports fit comfortably on any laptop or desktop screen simultaneously without horizontal scrolling.
  - Scale Presets: `100%`, `75%`, `65%`, `50%`.
  - `Reload Views`: Synchronously refreshes both iframes.
  - `Open Standalone (site.html)`: Direct link to view the website replica in standard fullscreen mode.

---

## Directory Structure

```
openidea-current-site-replica/
│
├── index.html            # Side-by-side Desktop (1440px) & Mobile (390px) comparison workspace
├── site.html             # Faithful standalone website replica
├── styles.css            # Production CSS styles, responsive breakpoints, animations
├── script.js             # Typewriter, template injection, auto-resize, mobile nav, chat
├── assets/
│   ├── images/
│   │   └── hero-globe.png   # 1.69 MB high-res digital globe asset from production
│   ├── logos/
│   │   └── logo.png         # 87.7 KB official Open Idea logo asset from production
│   ├── icons/
│   │   ├── favicon.ico      # Production favicon
│   │   └── icon-192.png     # PWA icon asset
│   └── fonts/               # Space Grotesk & Inter via Google Fonts CDN
└── README.md             # This documentation
```

---

## Production Differences & Limitations
- **Backend / Authentication**: The production site uses Next.js server-side routing and Supabase authentication. In this static replica, form submissions, action routes, and file attachments are visually simulated via interactive client-side feedback.
- **Speech Recognition**: Voice input uses the browser's standard Web Speech API (`webkitSpeechRecognition`); availability depends on browser support.
