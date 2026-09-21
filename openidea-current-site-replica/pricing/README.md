# Open Idea Production Pricing Page Replica

### Page
Current Open Idea Pricing page replica (`/pricing`).

### Source
[https://openidea.world/pricing](https://openidea.world/pricing)

### Purpose
High-fidelity, pixel-faithful static HTML5, CSS3, and Vanilla JavaScript replica of the live Open Idea production Pricing page. Built without external build frameworks (no React, Next.js, TypeScript, Vite, or Tailwind) so that it can be inspected and run locally in any browser by directly opening the HTML files.

---

### Integration
The Pricing page is completely integrated as a **connected page** with the primary Open Idea replica website:
1. **Homepage → Pricing**:
   - In `D:\Mockups\openidea-current-site-replica\site.html`, clicking the **Pricing** navigation link (in both desktop navbar and mobile slide-down drawer) routes directly to `pricing/site.html` via the relative path `pricing/site.html`.
2. **Pricing → Homepage**:
   - In `D:\Mockups\openidea-current-site-replica\pricing\site.html`, clicking either the brand logo (Open Idea + icon) or the **Home** navigation link routes back to the homepage via the relative path `../site.html`.
3. **Workspace Comparison Integration**:
   - The root comparison workspace `index.html` seamlessly renders navigation inside its desktop (1440px) and mobile (390px) iframes.
   - In addition, a dedicated Pricing comparison workspace is available at `pricing/index.html` with a direct return button to the `../index.html` homepage workbench.

---

### Files
The Pricing replica structure is self-contained inside `D:\Mockups\openidea-current-site-replica\pricing\`:

```
pricing/
├── site.html         # Pure static production Pricing page replica
├── styles.css        # Vanilla CSS styling with exact design tokens, typography, cards, and modal
├── script.js         # Vanilla JS for payment toggles, affiliate logic, tooltips, and modal checkout
├── index.html        # Developer comparison workspace (1440px desktop & 390px mobile viewports)
├── README.md         # Comprehensive reverse-engineering documentation
└── assets/
    ├── fonts/        # Web fonts reference
    ├── icons/        # Favicon and app icon (favicon.ico, icon-192.png)
    ├── images/       # High-res production visuals (hero-globe.png)
    └── logos/        # Production brand vector/raster logos (logo.png)
```

---

### Sections
1. **Site Header & Navigation**:
   - Sticky backdrop blur navbar (`rgba(12, 35, 33, 0.75)` with `backdrop-filter: blur(12px)`).
   - Brand logo and title linking back to `../site.html`.
   - Desktop navigation items: Home, About, Features, **Pricing** (active highlight pill), App Studio CTA button.
   - Right-hand action buttons: Sign In, Feedback link, and yellow "BETA" badge.
   - Mobile hamburger menu toggle and full-width navigation drawer.
2. **Hero Header**:
   - Globe background art (`hero-globe.png`) with cyan radial ambient illumination glow.
   - Space Grotesk heading: *"Get Access to Open Idea"*.
   - Subtitle: *"Simple, transparent pricing that grows with you. Try any plan free for 14 days."*
3. **Payment Provider Toggle**:
   - Pill toggle selector: **Razorpay (UPI/Cards)** (default active) vs. **Stripe (International)**.
   - Toggles pricing currency display across all cards between Indian Rupees (INR) and US Dollars (USD).
4. **Referral / Affiliate Box**:
   - Center input box for partner/affiliate code (`e.g. EC123456`).
   - Dynamic partner incentive indicator: *"Your partner will earn 5% when you subscribe"*.
   - Stores code in browser `sessionStorage.ecosyz_affiliate_code`.
5. **Primary Plans Grid (3 Cards)**:
   - Free Tier, Student Tier, and Plus Tier (highlighted with emerald border and "Most popular" badge).
6. **Secondary Services Grid (2 Cards)**:
   - Business Website Tier (₹25,000 one-time, note: "We'll call to understand your needs", and "Most popular" badge) and Enterprise Custom Tier.
7. **Footer Help Banner**:
   - *"Have questions about pricing? Talk to us"* linking to `/contact`.
8. **Site Footer**:
   - Production-matching footer with Open Idea brand, tagline *"Empowering Open, Sustainable Innovation Worldwide"*, contact phones (`+91 81302 96940`, `011 4119 3699`), social media links, careers/fellowship/partnership/website links, secondary news links, legal policies, registered address, and copyright.
9. **Interactive Order / Checkout Modal Simulation**:
   - Accessible from all plan subscribe buttons.
   - Displays plan name, selected gateway, applied affiliate referral credit, and total amount.
   - Simulates end-to-end payment confirmation with loading state and success feedback.

---

### Plans & Pricing Verified from Production

| Plan | Price (INR) | Price (USD) | Workspaces | Builds & Edits / Month | Credit Details | Key Inclusions |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Free** | ₹0 / mo | $0 / mo | 3 workspaces | 3 builds + 20 edits | 2,277 credits | Basic AI search capabilities, Public knowledge graph access, Standard support, Community features, 1GB storage per workspace |
| **Student** | ₹200 / mo | $2.50 / mo | 5 workspaces | 4 builds + 40 edits | 3,885 credits | Everything in Free, Enhanced AI search, Priority support, 2GB storage per workspace |
| **Plus** ⭐ *(Most Popular)* | ₹999 / mo | $12 / mo | Unlimited | 10 builds + 100 edits | 9,713 credits | Everything in Free, Advanced AI research tools, Full knowledge graph access, Priority support, 5GB storage per workspace, API access (100K req/mo) |
| **Business Website** ⭐ *(Most Popular)* | ₹25,000 one-time | $300 one-time | N/A | Complete Website | 2-7 days delivery | 17 verified features (Up to 5 pages, Mobile-friendly, Google Maps, Click-to-call & WhatsApp, Enquiry form, Photo gallery, Reviews, SEO, SSL, 1-yr hosting, 3 revisions, 30-day support) |
| **Enterprise** | Custom | Custom | Custom | 100 builds + 1,000 edits | Contract-based | Everything in Plus, Custom workspace limits, Dedicated support, Custom AI training, Advanced security & compliance, Unlimited storage, Custom API limits, SSO & team management |

*Credit Calculation Formulas Verified from Production Source Code:*
- Formula: `Math.ceil((builds * 267 + edits * 51) * 1.25)`
- Build cost: 267 credits
- Edit cost: 51 credits
- Safety buffer: 1.25x
- Plus calculation: `(10 * 267 + 100 * 51) * 1.25 = 7,770 * 1.25 = 9,712.5 -> ceil = 9,713 credits` (The earlier 7,770 documented in draft audits was the unbuffered baseline before applying the 1.25x buffer).

---

### Desktop Behavior
- Viewport width: 1440px target (fluid up to 1920px+).
- Two-tier grid layout:
  - Row 1: 3 columns for SaaS plans (Free, Student, Plus).
  - Row 2: 2 balanced columns for Business Website and Enterprise.
- Hover states with emerald/cyan glows and smooth border transitions.
- Interactive hover tooltips displaying credit breakdown calculations.

---

### Mobile Behavior
- Viewport width: 375px - 414px (primary baseline: 390px).
- Cards stack vertically in a clean single column with full touch target heights (min 44px for buttons).
- Zero horizontal clipping or overflowing text.
- Full mobile drawer navigation with animated backdrop blur.
- Tap-to-reveal tooltips for mobile users.
- Modal responsive container centered with scroll lock.

---

### Interactions Implemented
1. **Provider Switching**: Clicking Razorpay or Stripe updates prices and currencies dynamically across cards.
2. **Referral Code Handling**: Stores and retrieves affiliate code from `sessionStorage.ecosyz_affiliate_code` and applies 5% partner incentive.
3. **Credit Info Tooltips**: Clicking or hovering on `(i)` badges displays exact credit calculation tooltips.
4. **Checkout Modal Simulation**: Clicking any Subscribe or "Get Business Plan" button opens the interactive checkout summary dialog with simulated payment confirmation.
5. **Mobile Navigation**: Hamburger button triggers the responsive slide-down menu.
6. **Cross-Page Navigation**: Bidirectional routing between Homepage (`site.html`) and Pricing (`pricing/site.html`).

---

### Assets
- `pricing/assets/logos/logo.png`: Authentic production brand logo.
- `pricing/assets/images/hero-globe.png`: Authentic high-resolution globe artwork used across production hero sections.
- `pricing/assets/icons/favicon.ico`: Authentic production favicon.
- `pricing/assets/icons/icon-192.png`: Authentic PWA icon.

---

### Fonts
- **Headings & Brand**: `Space Grotesk` (Google Fonts, weights 600, 700).
- **Body & UI**: `Inter` (Google Fonts, weights 400, 500, 600, 700).

---

### Limitations & Static Simulations
- **Payment Gateway**: Simulated via Vanilla JS modal and sandbox workflow. No real banking APIs or credit card fields are connected.
- **Backend Authentication**: Link `/auth?plan=free` preserves production routing.
- **Enterprise Contact Sales**: Routes to `/contact?enquiry=enterprise` as in production.

---

### Verification
- Checked against live production website `https://openidea.world/pricing`.
- Verified in both standalone browser view (`site.html`) and comparison workbench (`index.html`) at 1440px desktop and 390px mobile viewports.
- Tested complete navigation flow: Homepage → Pricing → Homepage.
