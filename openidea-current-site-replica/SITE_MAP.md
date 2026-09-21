# Open Idea Current Website Map & User-Accessible Surface

> **Master Site Inventory & Architecture Specification**  
> **Source of Truth:** https://openidea.world/  
> **Last Audited:** September 22, 2026 (Live Next.js Production Build: `fh3eXRTQwDla62OU1Ickr`)  
> **Mockup Workspace:** `D:\Mockups\openidea-current-site-replica\`

---

## Executive Summary

A comprehensive recursive audit and reverse-engineering of the live production Open Idea website (`https://openidea.world/`) was conducted. Every user-accessible page, navigation route, form, modal, redirect, interactive control, and authentication boundary has been verified against live production HTTP responses and Next.js client-side bundles.

### Key Metrics
- **Total Discovered Internal Routes:** 29
- **Publicly Accessible Internal Pages:** 24
- **Authentication-Gated Routes (Redirect to `/auth`):** 4 (`/studio`, `/chat`, `/problems-and-ideas`, `/ai-news/saved`)
- **Dead / Broken Links:** 1 (`/docs/contributing` → HTTP 404)
- **Distinct Design Themes:** 2 (Primary Dark Emerald Gradient Theme across 26 pages; Commercial White/Teal Light Theme `oi-light-chrome` across 3 pages: `/form`, `/demo`, `/support`)
- **Existing Verified Mockup Pages:** 4 (`/` Homepage, `/pricing` Pricing, `/auth` Authentication, `/about` About)
- **Pages Remaining for Static Replication:** 20 public pages (excluding auth-gated application states and broken links)

---

## 1. Homepage (`/`)

- **Full Production URL:** `https://openidea.world/`
- **Page Title:** `Open Idea`
- **Theme:** Dark emerald radial gradient (`#0c2321` via `#121f22` to `#0a1016`)
- **Access:** Public (No authentication required)
- **Current Mockup Status:** **COMPLETED & VERIFIED** (`D:\Mockups\openidea-current-site-replica\site.html`)

### Discovered Links & Clickable Elements
1. **Logo link:** `href="/"`, triggers smooth scroll or page reload
2. **Desktop Nav:** `/about`, `/features`, `/pricing`, `/studio` ("App Studio" CTA button)
3. **Desktop Header Actions:** `/auth` ("Sign In"), `/feedback` ("Feedback" with yellow `BETA` pill)
4. **Hero Mode Pills (State Toggles):**
   - `Build App` (default active — highlights emerald gradient)
   - `Discover` (targets `/openresources` upon submission)
   - `Projects` (targets `/projects` upon submission)
   - `Network` (targets `/coming-soon` upon submission)
5. **Hero Template Shortcut Chips (Pre-fills Textarea Prompt):**
   - `SaaS Landing`
   - `Dev Portfolio`
   - `E-commerce`
   - `Agency Site`
6. **Hero Action Controls:**
   - File attachment button (triggers hidden `<input type="file">`)
   - Submit icon button (Enter or click submits prompt to mode target)
7. **Floating Chat Drawer Widget:** Bottom-right floating "Chat" button; expands feedback drawer with 3 tabs (`General`, `Bug`, `Feature`) and direct submit action
8. **Mobile Header:** Hamburger toggle button expands glass mobile drawer with all navigation links + Sign In CTA

---

## 2. Header Navigation

The site uses a shared persistent glass navbar (`glass h-14 border-b glass-border sticky top-0 z-50`).

| Label | Route / Destination | Element Type | Public | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Open Idea (Logo)** | `/` | Link (`<a>`) | Yes | Brand mark + "Open Idea" title |
| **About** | `/about` | Link (`<a>`) | Yes | Desktop nav & mobile drawer |
| **Features** | `/features` | Link (`<a>`) | Yes | Desktop nav & mobile drawer |
| **Pricing** | `/pricing` | Link (`<a>`) | Yes | Desktop nav & mobile drawer (Replicated) |
| **App Studio** | `/studio` | CTA Link (`<a>`) | **Auth-Gated** | Emerald-cyan gradient button; redirects to `/auth?redirect=%2Fstudio` unauthenticated |
| **Sign In** | `/auth` | Secondary CTA | Yes | Appends contextual `?redirect=<current-route>` |
| **Feedback** | `/feedback` | Link (`<a>`) | Yes | Accompanied by yellow `BETA` badge |
| **Mobile Hamburger** | `#mobile-nav` | Button (`<button>`) | Yes | Toggles mobile navigation menu |
| **Mobile User Icon** | `/auth` | Link (`<a>`) | Yes | Circular gradient button for mobile sign-in |

---

## 3. Homepage CTAs & Interactive Shortcuts

| Label / Control | Trigger Destination | Mechanism / Behavior | Public | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **App Studio (Header)** | `/studio` | Direct Navigation | Auth-Gated | Redirects to `/auth` if session absent |
| **Build App (Hero Pill)** | `/studio?description=...` | Form Submit Action | Auth-Gated | Encodes prompt into `description` query parameter |
| **Discover (Hero Pill)** | `/openresources` | Form Submit Action | Yes | Submits search query to resource directory |
| **Projects (Hero Pill)** | `/projects` | Form Submit Action | Yes | Submits search query to projects directory |
| **Network (Hero Pill)** | `/coming-soon?type=network` | Form Submit Action | Yes | Submits search query to coming-soon state |
| **SaaS Landing** | Homepage Textarea | Textarea Injection | Yes | Injects TaskFlow SaaS prompt template |
| **Dev Portfolio** | Homepage Textarea | Textarea Injection | Yes | Injects Alex Chen developer portfolio prompt |
| **E-commerce** | Homepage Textarea | Textarea Injection | Yes | Injects Elevate minimalist store prompt |
| **Agency Site** | Homepage Textarea | Textarea Injection | Yes | Injects Pixel & Code agency prompt |
| **Floating Chat Widget** | Modal Drawer | In-place Toggle | Yes | Expands support/feedback modal drawer |

---

## 4. Footer

The footer is shared across all standard dark-theme pages and contains brand information, contact details, commercial links, community links, and legal links.

| Label | Route / URL | Type | Target | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Discord** | `https://discord.gg/4weahHXQYY` | External | `_blank` | Open Idea Discord community |
| **LinkedIn** | `https://www.linkedin.com/company/ecosyz/` | External | `_blank` | Parent company page (ECOSYZ) |
| **Twitter / X** | `https://x.com/OpenIdeaOrg` | External | `_blank` | Official X handle |
| **Facebook** | `https://www.facebook.com/profile.php?id=61570639731676` | External | `_blank` | Official Facebook profile |
| **Instagram** | `https://www.instagram.com/openidea.ai_platform/` | External | `_blank` | Official Instagram handle |
| **Email** | `mailto:info@openidea.world` | Protocol | Self | Direct email link |
| **Phone (Mobile)** | `tel:+918130296940` | Protocol | Self | Direct mobile dialer |
| **Landline** | `tel:+911141193699` | Protocol | Self | Direct Delhi landline dialer |
| **Careers** | `/careers` | Internal Page | Self | Job openings & culture |
| **Fellowship** | `/intern-fellowship` | Internal Page | Self | Milestone-based fellowship program |
| **Partnership** | `/partnership` | Internal Page | Self | Affiliate partnership tiers |
| **Get a Website** | `/form` | Internal Page | Self | Commercial website order wizard (Light theme) |
| **Support** | `/support` | Internal Page | Self | Ticketing and grievance redressal (Light theme) |
| **Problems & Ideas** | `/problems-and-ideas` | Internal App | Self | **Auth-Gated** (Redirects to `/auth`) |
| **Newsletter** | `/newsletter` | Internal Page | Self | Newsletter subscription |
| **AI News** | `/ai-news` | Internal Page | Self | AI news summary feed |
| **Privacy Policy** | `/privacy` | Legal Page | Self | 4-section privacy document |
| **Terms of Use** | `/terms` | Legal Page | Self | 4-section terms document (AGPL-3.0) |
| **Cookie Policy** | `/cookies` | Legal Page | Self | 4-section cookie document |

---

## 5. Comprehensive Internal Page Specifications

### `/about`
- **Page Type:** Marketing page
- **Title:** `Open Idea`
- **Reached from:** Header navigation, mobile navigation, homepage footer, `/features` bottom CTA
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero Section: "The World's Open Innovation Infrastructure" with background globe
  3. Interactive Search Bar: Real-time search across mission and docs
  4. Core Mission Cards: "Democratic AI", "Sovereign Innovation", "Open Infrastructure"
  5. Innovation Engine Deep Dive (Grid with live resource counts)
  6. Direct Navigation Pathways: Quick-access buttons to `/projects`, `/community`, and `/researchwhitepaper`
  7. Footer
- **Interactions:** Live in-page search filtering, hover states on cards, links to whitepaper
- **Forms:** In-page documentation search bar
- **Outgoing Internal Links:** `/`, `/features`, `/pricing`, `/studio`, `/auth`, `/projects`, `/community`, `/researchwhitepaper`, `/careers`, `/intern-fellowship`, `/partnership`, `/form`, `/support`, `/problems-and-ideas`, `/newsletter`, `/ai-news`, `/privacy`, `/terms`, `/cookies`
- **External Links:** Discord, LinkedIn, X, Facebook, Instagram
- **Assets:** `/hero-globe.png`, `/logo.png`
- **Responsive Notes:** Search bar expands full width below 640px; card grid collapses from 3 columns to 1 column.

---

### `/features`
- **Page Type:** Marketing page
- **Title:** `Open Idea`
- **Reached from:** Header navigation, mobile navigation, `/coming-soon`
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero Section: "Powerful Features for Modern Innovators"
  3. Feature Highlight 1: "Open Resources" (Linking directly to `/openresources`)
  4. Feature Highlight 2: "Collaborative Projects" (Linking to `/projects`)
  5. Feature Highlight 3: "Global Community" (Linking to `/community`)
  6. Interactive Feature Showcase: Tabbed interface highlighting AI Generation, Code Export, Real-time Collaboration
  7. Bottom Call-to-Action: Dual buttons linking to `/chat` (AI Assistant) and `/about`
  8. Footer
- **Interactions:** Feature tabs switching, card hover animations
- **Forms:** None
- **Outgoing Internal Links:** `/openresources`, `/projects`, `/community`, `/chat`, `/about`, standard header/footer routes
- **External Links:** Standard social footer
- **Assets:** Feature icon SVGs, `/hero-globe.png`, `/logo.png`
- **Responsive Notes:** Feature cards switch from 2-column split layout with visual graphics to stacked single column on mobile (<768px).

---

### `/pricing`
- **Page Type:** Pricing & Subscription page
- **Title:** `Pricing - Ecosyz · Open Idea`
- **Reached from:** Header navigation, mobile navigation, homepage
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Current Mockup Status:** **COMPLETED & VERIFIED** (`D:\Mockups\openidea-current-site-replica\pricing\site.html`)
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero: "Simple, transparent pricing"
  3. Billing Toggle: Monthly vs. Yearly (with "20% OFF" badge)
  4. Pricing Cards Grid:
     - Free ($0 / ₹0)
     - Starter ($19/mo or $15/mo yearly / ₹1,499)
     - Plus ($49/mo or $39/mo yearly / ₹3,899 — 9,713 credits confirmed)
     - Pro ($99/mo or $79/mo yearly / ₹7,899)
  5. Feature Comparison Table: 24 distinct criteria across limits, AI models, export, and support
  6. Referral Banner & Modal: Referral discount code input
  7. Enterprise CTA Banner: "Need a custom deployment?"
  8. FAQ Accordion (6 items)
  9. Footer
- **Interactions:** Monthly/Annual pricing recalculation toggle, Referral Code modal, FAQ accordion expansion
- **Forms:** Referral code redemption form
- **Outgoing Internal Links:** `/auth?plan=free`, `/auth?plan=starter`, `/auth?plan=plus`, `/auth?plan=pro`, standard header/footer routes

---

### `/auth`
- **Page Type:** Authentication portal
- **Title:** `Open Idea - Sign In`
- **Reached from:** Header "Sign In", mobile user icon, pricing plan CTAs, auth redirects
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald dual-panel
- **Current Mockup Status:** **COMPLETED & VERIFIED** (`D:\Mockups\openidea-current-site-replica\auth\site.html`)
- **Query Parameters:** `?redirect=<encoded_url>`, `?plan=<free|starter|plus|pro>`, `?mode=<signin|signup>`
- **Sections:**
  1. Brand Header / Back button to `/`
  2. Left Hero Panel: Value proposition, community stats, animated globe graphic
  3. Right Form Panel:
     - Tab switch: "Sign In" vs "Create Account"
     - OAuth Single-Sign-On: "Continue with Google", "Continue with GitHub"
     - Divider: "Or continue with email"
     - Input fields: Email, Password (with eye toggle), Remember Me, Forgot Password trigger
     - Terms acceptance disclaimer
- **Interactions:** Sign In / Sign Up tab switching, show/hide password, Forgot Password modal trigger, OAuth provider redirect triggers
- **Forms:** Sign In form, Sign Up form, Forgot Password modal form
- **Outgoing Internal Links:** `/`, `/terms`, `/privacy`

---

### `/studio`
- **Page Type:** Application / AI Web App Studio
- **Title:** `App Studio - Open Idea`
- **Reached from:** Header "App Studio" button, hero prompt form submission
- **Publicly Accessible:** **NO (AUTHENTICATION-GATED)**
- **Behavior:** Unauthenticated requests immediately redirect to `/auth?redirect=%2Fstudio`
- **Query Parameters:** `?description=<prompt_text>`, `?template=<slug>`, `?project=<id>`
- **Application Capabilities (Authenticated State):**
  - Prompt bar with LLM generation engine
  - Live iframe sandbox preview with mobile/tablet/desktop controls
  - Monopack code tree viewer (HTML/CSS/JS/React files)
  - Asset manager and image generation tools
  - Export project (.zip, GitHub push, Vercel deployment)
- **Replica Recommendation:** Keep as navigation CTA that points to `/auth?redirect=%2Fstudio` (or simulate authenticated studio playground).

---

### `/openresources`
- **Page Type:** Resource directory / Search engine
- **Title:** `Open Resources - Open Idea`
- **Reached from:** `/features` ("Open Resources" card), hero search with "Discover" mode active
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** `?q=<search>`, `?category=<models|datasets|papers|code|videos>`, `?sort=<latest|popular>`
- **Sections:**
  1. Sticky Header
  2. Hero Section: "Open Innovation Resources"
  3. Search & Filter Bar: Text input + category filter chips (All, AI Models, Datasets, Research Papers, Open Source Code, Tutorials)
  4. Active Tag Pills: Trending tags (LLMs, Diffusion, RAG, Robotics, Vision)
  5. Resource Grid: Card list with badges (License, Framework, Upvotes, External Source)
  6. Detail Drawer: Clicking a card slides open resource metadata, citation, download link
  7. Footer
- **Interactions:** Live keyword filtering, category tab switching, modal/drawer preview
- **Forms:** Search input with clear button
- **Outgoing Internal Links:** Standard header/footer routes
- **External Links:** Hugging Face, ArXiv, GitHub repositories, YouTube tutorials

---

### `/projects`
- **Page Type:** Resource / Community Project Directory
- **Title:** `Open Projects - Open Idea`
- **Reached from:** `/about` ("Explore Projects" button), `/features` ("Collaborative Projects" card), hero search with "Projects" mode active
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** `?status=<active|incubating|completed>`, `?tech=<react|python|ai>`
- **Sections:**
  1. Sticky Header
  2. Hero Section: "Community-Driven Open Projects"
  3. Project Category Filter Bar
  4. Project Cards Grid (Title, description, contributor avatars, GitHub star count, live demo button)
  5. Skeleton Loading State (Displayed while fetching remote API items)
  6. "Submit Your Project" Call-to-Action banner (Links to `/contribute`)
  7. Footer
- **Interactions:** Category filtering, live demo preview link, submit project trigger
- **Forms:** Quick search bar
- **Outgoing Internal Links:** `/contribute`, standard header/footer routes
- **External Links:** GitHub project repositories

---

### `/community`
- **Page Type:** Resource / Community Portal
- **Title:** `Community - Open Idea`
- **Reached from:** `/about` ("Join Community" button), `/features` ("Global Community" card)
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero Section: "Join a Global Movement of Creators"
  3. Community Pillars Grid: "Builders", "Researchers", "Open Source Advocates", "Founders"
  4. Discussion Channels Highlight: Links to Discord guilds, GitHub Discussions, and community events
  5. Community Guidelines Section
  6. Contributor Spotlight Carousel / Leaderboard
  7. Discord Join Banner with live member count badge
  8. Footer
- **Interactions:** Guidelines accordion, spotlight pagination
- **Forms:** None
- **Outgoing Internal Links:** Standard header/footer routes
- **External Links:** Discord (`https://discord.gg/4weahHXQYY`), GitHub Discussions

---

### `/chat`
- **Page Type:** Application / AI Chatbot
- **Title:** `AI Chat - Open Idea`
- **Reached from:** `/features` ("Try AI Chat" CTA), floating chat quick-launcher
- **Publicly Accessible:** **NO (AUTHENTICATION-GATED)**
- **Behavior:** Unauthenticated requests immediately redirect to `/auth?redirect=%2Fchat`
- **Query Parameters:** `?q=<initial_prompt>`, `?model=<gpt-4o|claude|gemini>`
- **Application Capabilities (Authenticated State):**
  - Full-screen chat interface with conversational thread history
  - File upload and paper analysis
  - Code generation sandbox
- **Replica Recommendation:** Document as auth-gated; redirect to `/auth?redirect=%2Fchat`.

---

### `/feedback`
- **Page Type:** Form page
- **Title:** `Feedback - Open Idea`
- **Reached from:** Desktop header "Feedback" link, mobile navigation drawer
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** `?type=<general|bug|feature>`
- **Sections:**
  1. Sticky Header
  2. Main Feedback Card:
     - Feedback Category Selector (General, Bug Report, Feature Request, Praise)
     - Rating / Sentiment Emoji Selector
     - Feedback Textarea (with character counter)
     - Optional Email field (for follow-up)
     - Submit button ("Send Feedback")
  3. Success State: Confirmation card with "Thank you for helping us improve"
  4. Footer
- **Interactions:** Category pill selection, star/emoji rating, live character counter, simulated submission
- **Forms:** Public Feedback submission form
- **Outgoing Internal Links:** Standard header/footer routes

---

### `/contribute`
- **Page Type:** Resource / Contributor Guide & Application
- **Title:** `Contribute - Open Idea`
- **Reached from:** Desktop header ("Contribute to Open Idea" banner on homepage), `/projects` CTA
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero: "Shape the Future of Open Innovation"
  3. 6 Contribution Pathways Grid:
     - Code & Core Platform
     - AI Models & Datasets
     - Research & Benchmarks
     - Documentation & Tutorials
     - Design & UI/UX
     - Community & Evangelism
  4. Contributing Guide Link: (Links to `/docs/contributing` — **NOTE: Known 404 dead link on production**)
  5. Contributor Interest Application Form:
     - Name, Email, GitHub Profile URL, Primary Skills, Statement of Interest, Submit
  6. GitHub Repository Card (Links to `https://github.com/Sony17/Ecosyz`)
  7. Footer
- **Interactions:** Category card selection, form validation
- **Forms:** Contributor Interest Application form
- **Outgoing Internal Links:** `/docs/contributing` (Broken), standard header/footer routes
- **External Links:** GitHub repo (`https://github.com/Sony17/Ecosyz`)

---

### `/docs/contributing`
- **Page Type:** Documentation / Developer Guide
- **Reached from:** `/contribute` ("Read Contributing Guide" link)
- **Publicly Accessible:** **NO — BROKEN LINK (HTTP 404)**
- **Production Status:** Returns Next.js standard 404 page ("This page could not be found.")
- **Replica Recommendation:** Retain link target for fidelity, but document clearly as a production broken link.

---

### `/researchwhitepaper`
- **Page Type:** Resource / Scientific Whitepaper
- **Title:** `Research Whitepaper - Open Idea`
- **Reached from:** `/about` ("Read Whitepaper" button)
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Paper Header: Title ("Open Innovation Infrastructure: Decentralized AI & Collaborative Workflows"), Authors, Abstract
  3. Action Bar: "Download PDF" button (`href="https://raw.githubusercontent.com/Sony17/Ecosyz/main/Open_Idea_Whitepaper.pdf"`), "Cite Paper" button (copies BibTeX)
  4. Sticky Left Table of Contents:
     - 1. Introduction
     - 2. Architecture Overview
     - 3. Decentralized Model Execution
     - 4. Consensus & Verification
     - 5. Tokenomics & Incentives
     - 6. Privacy & Security
     - 7. Empirical Benchmarks
     - 8. Roadmap & Governance
     - 9. References
  5. Main Article Body: Academic typesetting, LaTeX-rendered math equations, SVG architectural block diagrams
  6. Bottom Call-to-Action: "Build on Open Idea" linking to `/studio`
  7. Footer
- **Interactions:** Smooth scroll TOC spy, BibTeX copy to clipboard, PDF download
- **Forms:** None
- **Outgoing Internal Links:** `/studio`, standard header/footer routes
- **External Links:** Direct PDF download via GitHub raw link

---

### `/careers`
- **Page Type:** Careers / Recruitment page
- **Title:** `Careers - Open Idea`
- **Reached from:** Footer "Careers" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero: "Join Us in Democratizing Global Innovation"
  3. Culture & Perks Grid (Remote-first, competitive equity, open-source focus, learning stipend)
  4. Fellowship Callout Banner: "Looking for an internship?" linking to `/intern-fellowship`
  5. Open Roles Accordion (7 Job Openings):
     - Senior Full-Stack Engineer (Next.js / Python)
     - AI / ML Research Engineer (LLM Fine-tuning & RAG)
     - Systems Architect (Distributed Sandboxes & WebContainers)
     - UI/UX Design Lead (Design Systems & Micro-interactions)
     - Developer Relations & Community Manager
     - Technical Product Manager
     - Open Source Community Fellow
  6. Job Detail Drawer / Modal: Expandable role description, requirements, responsibilities, "Apply Now" button
  7. Footer
- **Interactions:** Accordion expand/collapse for 7 roles, "Apply Now" triggers email/modal
- **Forms:** Job application modal form (Name, Email, Resume upload, Portfolio/GitHub, Notes)
- **Outgoing Internal Links:** `/intern-fellowship`, standard header/footer routes

---

### `/intern-fellowship`
- **Page Type:** Careers / Fellowship Program
- **Title:** `Open Idea Fellowship`
- **Reached from:** Footer "Fellowship" link, `/careers` callout banner
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero: "Open Idea Student & Developer Fellowship"
  3. Interactive SVG Contribution Heatmap (GitHub-style activity graph demonstration)
  4. 4 Milestone Phases & Stipend Structure:
     - Phase 1: Onboarding & First PR (₹10,000 / $120)
     - Phase 2: Core Feature Implementation (₹25,000 / $300)
     - Phase 3: Benchmark & Optimization (₹35,000 / $420)
     - Phase 4: Production Deployment & Mentorship (₹50,000 / $600)
  5. Eligibility Criteria & Timeline
  6. "Apply for Fellowship" Trigger Button
  7. Footer
- **Interactions:** Milestone timeline stepper, Contribution heatmap tooltip hover
- **Forms:** Fellowship Application Form (Applicant details, university/org, GitHub handle, past projects)
- **Outgoing Internal Links:** standard header/footer routes

---

### `/partnership`
- **Page Type:** Partnership / Affiliate page
- **Title:** `Partnership Program - Open Idea`
- **Reached from:** Footer "Partnership" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero: "Partner with Open Idea"
  3. Affiliate Tier Cards Grid:
     - **Bronze Tier:** 5% recurring commission, standard marketing kit
     - **Silver Tier:** 7% recurring commission, co-marketing webinars, priority API access
     - **Gold Tier:** 10% recurring commission, dedicated account manager, custom white-labeling
  4. How It Works: 3-step workflow (Apply → Share Referral Link → Earn Monthly Payouts)
  5. CTA Button: "Become a Partner" linking to `/contact?enquiry=partnership`
  6. Partner FAQ Accordion
  7. Footer
- **Interactions:** Tier card hover effects, FAQ expansion
- **Forms:** None (delegates to `/contact?enquiry=partnership`)
- **Outgoing Internal Links:** `/contact?enquiry=partnership`, standard header/footer routes

---

### `/contact`
- **Page Type:** Contact / Inquiry Form
- **Title:** `Contact - Open Idea`
- **Reached from:** `/partnership` CTA, email footer link alternatives
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** `?enquiry=<partnership|sales|support|general>`
- **Sections:**
  1. Sticky Header
  2. Hero: "Get in Touch with Our Team"
  3. Contact Information Sidebar: Direct emails, phone numbers (`+91 81302 96940`, `011 4119 3699`), registered office address in Greater Noida West
  4. Contact Form:
     - Full Name (required)
     - Work Email (required)
     - Inquiry Type Dropdown (Partnership, Sales / Enterprise, Customer Support, General)
     - Subject
     - Message (required)
     - Submit button
  5. Submission Confirmation Modal
  6. Footer
- **Interactions:** Inquiry type pre-selection based on `?enquiry` query param, form validation, submit simulation
- **Forms:** Public Contact & Inquiry form
- **Outgoing Internal Links:** Standard header/footer routes

---

### `/form` ("Get a Website")
- **Page Type:** Commercial Service Order Wizard
- **Title:** `Get a Website - Open Idea`
- **Reached from:** Footer "Get a Website" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** **LIGHT THEME (`oi-light-chrome` / Pure White background `#ffffff` with dark gray typography and vibrant teal accents)**
- **Query Parameters:** `?plan=<hobby|business|mvp>`
- **Sections:**
  1. Custom Light Navbar with Open Idea brand mark, WhatsApp quick-help button, and phone link
  2. Hero: "Get a Professional Website Built for Your Business"
  3. Trust Badges: "5.0 Rating on Google Reviews (48+ reviews)", "Delivered in 48 Hours", "100% Satisfaction Guarantee"
  4. Interactive 4-Step Order Wizard:
     - **Step 1: Choose Your Package**
       - Hobby Website (₹999 — Single page, mobile responsive, domain connection)
       - Business Website (₹2,499 — Up to 5 pages, SEO optimized, contact forms, Google Maps)
       - MVP / Custom App (₹7,999 — Full-stack app, database, authentication, payment gateway)
     - **Step 2: Business & Contact Details**
       - Business Name, Category/Trade (Jeweller, Restaurant, Doctor, Education, etc.), Phone, Email, City
     - **Step 3: Website Requirements & Preferences**
       - Color choices, reference websites, logo upload, feature checkboxes (WhatsApp chat, photo gallery, inquiry form)
     - **Step 4: Review & Checkout**
       - Order summary, discount promo code box, integrated Razorpay checkout trigger
  5. Real Client Testimonials Carousel (Google review cards)
  6. "See Live Examples" Banner linking to `/demo`
  7. WhatsApp Direct Floating CTA
  8. Custom Light Footer
- **Interactions:** Step wizard navigation (Back/Next with field validation), package selector, coupon code calculator, Razorpay popup simulator, WhatsApp click-to-chat
- **Forms:** 4-Step Commercial Website Order Wizard Form
- **Outgoing Internal Links:** `/demo`, `/privacy`, `/terms`
- **External Links:** WhatsApp (`https://wa.me/918130296940`), Razorpay SDK

---

### `/demo`
- **Page Type:** Commercial Client Portfolio / Demo Showcase
- **Title:** `Live Demos - Open Idea Web Studio`
- **Reached from:** `/form` ("See Live Examples" link)
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** **LIGHT THEME (`oi-light-chrome`)**
- **Query Parameters:** `?category=<all|retail|food|services|education>`
- **Sections:**
  1. Custom Light Navbar
  2. Hero: "Explore Websites We've Built for Real Businesses"
  3. Category Filter Tabs: All (21), Retail & Jewellers, Restaurants & Cafes, Healthcare, Professional Services, Education
  4. Demo Cards Grid (21 Real Client Websites):
     - *Mangalam Jewellers* (Luxury Jewellery Store)
     - *Kuber Fab* (Textiles & Apparel Wholesale)
     - *Taste of India* (Fine Dining Restaurant & Menu)
     - *Little Scholars Academy* (Pre-school & Daycare)
     - *Apex Dental Clinic* (Multi-speciality Dental)
     - *Vanguard Legal Associates* (Law Firm)
     - *GreenLeaf Organic Grocers* (Retail Supermarket)
     - *...and 14 additional trade showcases*
  5. Card Controls: "Live Preview" button (opens internal `/demos/<slug>/index.html` or external client site in new tab), "Order Like This" button (redirects to `/form?ref=<slug>`)
  6. Custom Light Footer
- **Interactions:** Filter tabs, modal iframe previewer, category count badges
- **Forms:** None
- **Outgoing Internal Links:** `/form`, `/demos/...`, `/support`
- **External Links:** External client domains

---

### `/support`
- **Page Type:** Customer Support & Grievance Ticketing Portal
- **Title:** `Support & Complaints - Open Idea`
- **Reached from:** Footer "Support" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** **LIGHT THEME (`oi-light-chrome`)**
- **Query Parameters:** `?ticket=<id>`, `?tab=<new|track>`
- **Sections:**
  1. Custom Light Navbar
  2. Hero: "Help Center & Grievance Redressal"
  3. Dual-Tab Switcher:
     - **Tab 1: Submit a New Ticket**
       - Requester Full Name (required)
       - Registered Email (required)
       - Issue Category Dropdown (Website Order, Billing & Razorpay, Studio Bug, Feature Request, Legal / Grievance)
       - Priority Level Selector (Low, Medium, High, Urgent)
       - Subject Line (required)
       - Detailed Description Textarea (required)
       - Screenshot / Document Attachment Uploader
       - Captcha / Verification checkbox
       - Submit Ticket button
     - **Tab 2: Track an Existing Ticket**
       - Ticket ID Input (e.g. `OI-9824`)
       - Email Input
       - "Check Status" button with simulated ticket timeline response
  4. Emergency Contact Callout: Phone numbers (`+91 81302 96940`), email (`support@openidea.world`), WhatsApp
  5. Grievance Officer Details (Statutory compliance requirement)
  6. Custom Light Footer
- **Interactions:** Tab switching between New and Track, file uploader drag & drop, ticket status search query
- **Forms:** New Ticket Form, Track Ticket Form
- **Outgoing Internal Links:** `/form`, standard light footer routes
- **External Links:** WhatsApp, Razorpay SDK

---

### `/problems-and-ideas`
- **Page Type:** Community Idea Board / Application Route
- **Title:** `Problems & Ideas - Open Idea`
- **Reached from:** Footer "Problems & Ideas" link
- **Publicly Accessible:** **NO (AUTHENTICATION-GATED)**
- **Behavior:** Unauthenticated requests immediately redirect to `/auth?redirect=%2Fproblems-and-ideas`
- **Application Capabilities (Authenticated State):**
  - Problem statement submission
  - Upvoting and commenting on innovation ideas
  - Bounty attachment
- **Replica Recommendation:** Keep as navigation link; simulate auth redirect to `/auth?redirect=%2Fproblems-and-ideas`.

---

### `/newsletter`
- **Page Type:** Marketing / Subscription page
- **Title:** `Newsletter - Open Idea`
- **Reached from:** Footer "Newsletter" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero: "Stay at the Forefront of Open Innovation"
  3. Subscription Card:
     - Email address input
     - Frequency preferences (Weekly Digest, Real-time Breaking AI Releases)
     - Topic checkboxes (Open Models, Research Whitepapers, Web Studio Updates, Fellowship)
     - "Subscribe Now" button
  4. Previous Issues Archive List (Links to past 4 monthly editions)
  5. Footer
- **Interactions:** Topic selection toggles, subscription simulation with success toast
- **Forms:** Email Newsletter Subscription form
- **Outgoing Internal Links:** Standard header/footer routes

---

### `/ai-news`
- **Page Type:** Content / Curated AI News
- **Title:** `AI News - Open Idea`
- **Reached from:** Footer "AI News" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** `?category=<all|models|robotics|industry|research>`, `?search=<query>`
- **Sections:**
  1. Sticky Header
  2. Hero: "Daily Curated AI Intelligence"
  3. News Filter Controls: Category pills, search input, "Saved Articles" button linking to `/ai-news/saved`
  4. News Articles Grid: Cards featuring headline, source publication, publishing timestamp, 200-word concise summary, bookmark icon button, and external source link
  5. Pagination / "Load More Articles" button
  6. Footer
- **Interactions:** Category filter pill toggles, article bookmarking (prompts login if unauthenticated), search input
- **Forms:** News search filter input
- **Outgoing Internal Links:** `/ai-news/saved` (Auth-gated), standard header/footer routes
- **External Links:** Original publisher links (TechCrunch, ArXiv, VentureBeat, Nature)

---

### `/ai-news/saved`
- **Page Type:** Personal Content / Bookmarks
- **Title:** `Saved Articles - Open Idea`
- **Reached from:** `/ai-news` ("Saved Articles" button)
- **Publicly Accessible:** **NO (AUTHENTICATION-GATED)**
- **Behavior:** Unauthenticated requests immediately redirect to `/auth?redirect=%2Fai-news%2Fsaved`
- **Replica Recommendation:** Document as auth-gated redirect.

---

### `/coming-soon`
- **Page Type:** Dynamic Status Placeholder
- **Title:** `Open Idea`
- **Reached from:** Homepage prompt submission when "Network" mode active; feature teasers
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** `?type=<framework|integration|feature>`, `?name=<string>` (e.g. `?type=framework&name=django`)
- **Sections:**
  1. Sticky Header
  2. Central Hero:
     - Animated rotating Open Idea logo (2-second rotational cycle)
     - Heading: "Coming Soon"
     - Dynamic Subheading: `"{name} integration is on its way!"`
     - Description: "We're working hard to bring you this feature..."
     - Dual CTAs: "Back to Home" (`/`) and "View Features" (`/features`)
     - "Notify Me" interactive card with notification trigger button
  3. Footer
- **Interactions:** Interactive "Notify Me" alert trigger, logo animation, URL query parameter dynamic interpolation
- **Forms:** Notify Me interaction
- **Outgoing Internal Links:** `/`, `/features`, standard header/footer routes

---

### `/privacy`
- **Page Type:** Legal page
- **Title:** `Open Idea`
- **Reached from:** Footer "Privacy Policy" link, `/auth` footer, `/form` footer
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero Globe Background with radial glow & 32px grid
  3. Title: "Privacy Policy" (Gradient text: cyan to violet)
  4. Last updated timestamp: "February 2026"
  5. Content Glass Card with 4 numbered sections:
     - 1. Information We Collect
     - 2. How We Use Your Information
     - 3. Data Retention
     - 4. Contact (`mailto:info@openidea.world`)
  6. Footer
- **Interactions:** Mailto link
- **Forms:** None
- **Outgoing Internal Links:** Standard header/footer routes
- **External Links:** Email

---

### `/terms`
- **Page Type:** Legal page
- **Title:** `Open Idea`
- **Reached from:** Footer "Terms of Use" link, `/auth` form disclaimer, `/form` footer
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero Globe Background with radial glow & 32px grid
  3. Title: "Terms of Use" (Gradient text: cyan to violet)
  4. Last updated timestamp: "February 2026"
  5. Content Glass Card with 4 numbered sections:
     - 1. Acceptance of Terms
     - 2. Use of Service
     - 3. Intellectual Property (Explicitly states AGPL-3.0 license and links to `https://github.com/Sony17/Ecosyz/blob/main/LICENSE`)
     - 4. Contact (`mailto:info@openidea.world`)
  6. Footer
- **Interactions:** License link, mailto link
- **Forms:** None
- **Outgoing Internal Links:** Standard header/footer routes
- **External Links:** GitHub license link, Email

---

### `/cookies`
- **Page Type:** Legal page
- **Title:** `Open Idea`
- **Reached from:** Footer "Cookie Policy" link
- **Publicly Accessible:** Yes (HTTP 200)
- **Theme:** Dark emerald gradient
- **Query Parameters:** None
- **Sections:**
  1. Sticky Header
  2. Hero Globe Background with radial glow & 32px grid
  3. Title: "Cookie Policy" (Gradient text: cyan to violet)
  4. Last updated timestamp: "February 2026"
  5. Content Glass Card with 4 numbered sections:
     - 1. What Are Cookies
     - 2. Cookies We Use (Essential vs. Optional session cookies)
     - 3. Your Choices
     - 4. Contact (`mailto:info@openidea.world`)
  6. Footer
- **Interactions:** Mailto link
- **Forms:** None
- **Outgoing Internal Links:** Standard header/footer routes
- **External Links:** Email

---

## 6. Dynamic & Contextual Query Routes

The Open Idea production website uses query parameters to preserve context across navigations rather than generating disjoint routes:

| Base Route | Query Parameter | Values / Types | Contextual Behavior |
| :--- | :--- | :--- | :--- |
| `/auth` | `?redirect=` | Encoded URI (e.g. `%2Fstudio`, `%2Fpricing`, `%2Fprivacy`) | Preserves destination to route user back upon authentication |
| `/auth` | `?plan=` | `free`, `starter`, `plus`, `pro` | Pre-selects subscription tier when registering from `/pricing` |
| `/auth` | `?mode=` | `signin`, `signup` | Sets the default active tab on the dual auth card |
| `/studio` | `?description=` | Text string (URL encoded) | Injects prompt submitted from homepage hero form into Studio |
| `/studio` | `?template=` | `saas`, `portfolio`, `ecommerce`, `agency` | Automatically initialises sandbox with template scaffold |
| `/contact` | `?enquiry=` | `partnership`, `sales`, `support`, `general` | Pre-selects inquiry dropdown in contact form |
| `/form` | `?plan=` | `hobby`, `business`, `mvp` | Pre-selects website tier in Step 1 of order wizard |
| `/form` | `?ref=` | Demo slug (e.g. `mangalam-jewellers`) | Customizes wizard title to "Order a site like Mangalam Jewellers" |
| `/support` | `?tab=` | `new`, `track` | Toggles between New Ticket and Track Ticket views |
| `/support` | `?ticket=` | Ticket ID (e.g. `OI-9824`) | Pre-fills ticket ID for immediate status tracking |
| `/openresources` | `?category=` | `models`, `datasets`, `papers`, `code`, `videos` | Pre-filters the resource directory grid |
| `/openresources` | `?q=` | Search query string | Filters items matching title or description |
| `/ai-news` | `?category=` | `models`, `robotics`, `industry`, `research` | Filters news feed items |
| `/coming-soon` | `?type=` & `?name=` | e.g. `type=framework&name=django` | Dynamically customizes page title and heading |

---

## 7. Authentication Boundaries

The production application enforces strict access boundaries:

```
                  [ Public Visitor ]
                          │
          ┌───────────────┴───────────────┐
          ▼                               ▼
  [ Public Routes ]               [ Protected Routes ]
  - Homepage (/)                  - /studio
  - /about, /features, /pricing   - /chat
  - /openresources, /projects     - /problems-and-ideas
  - /careers, /partnership        - /ai-news/saved
  - /form, /demo, /support                │
  - /privacy, /terms, /cookies            ▼
                                    HTTP 307 / Next.js
                                   Redirect to /auth?redirect=...
```

- **Session Guarding:** Implemented at Next.js middleware and client page component levels.
- **Query Persistence:** The requested destination is attached to `?redirect=` on `/auth`.
- **Public Sign In / Sign Up Access:** Anyone can access `/auth` to authenticate via email/password or OAuth (Google, GitHub).

---

## 8. App Studio Boundaries

- **Route:** `/studio`
- **Classification:** High-complexity Single Page Application (SPA / Web Application)
- **Public Boundary:** **Gated**. Unauthenticated users attempting to access `/studio` are redirected to `/auth?redirect=%2Fstudio`.
- **Interactive Role on Marketing Site:** 
  - The "App Studio" button in the header acts as the primary product CTA.
  - The hero prompt textarea on the homepage accepts natural language descriptions and routes them into Studio upon submit.
- **Replica Recommendation:** Do not build a live IDE inside the marketing replica. In the static replica, `/studio` should either trigger the `/auth` redirect or display a static screenshot/mockup of the Studio interface.

---

## 9. External Destinations Inventory

| Destination Name | Production Target URL | Purpose | Opens In |
| :--- | :--- | :--- | :--- |
| **Discord** | `https://discord.gg/4weahHXQYY` | Developer & user community chat | New Tab (`_blank`) |
| **LinkedIn** | `https://www.linkedin.com/company/ecosyz/` | Company profile & recruitment | New Tab (`_blank`) |
| **Twitter / X** | `https://x.com/OpenIdeaOrg` | Product announcements & AI news | New Tab (`_blank`) |
| **Facebook** | `https://www.facebook.com/profile.php?id=61570639731676` | Corporate social presence | New Tab (`_blank`) |
| **Instagram** | `https://www.instagram.com/openidea.ai_platform/` | Visual product updates & clips | New Tab (`_blank`) |
| **GitHub Platform** | `https://github.com/Sony17/Ecosyz` | Main open-source repository | New Tab (`_blank`) |
| **GitHub License** | `https://github.com/Sony17/Ecosyz/blob/main/LICENSE` | AGPL-3.0 full legal license | New Tab (`_blank`) |
| **GitHub Whitepaper** | `https://raw.githubusercontent.com/Sony17/Ecosyz/main/Open_Idea_Whitepaper.pdf` | PDF download asset | New Tab (`_blank`) |
| **WhatsApp Support** | `https://wa.me/918130296940` | Live sales & website assistance | New Tab (`_blank`) |
| **Razorpay SDK** | `https://checkout.razorpay.com/v1/checkout.js` | Checkout payment script | In-page script |
| **Meta Pixel** | `https://connect.facebook.net/en_US/fbevents.js` | Analytics tracking (`2233429150725239`) | In-page script |

---

## 10. Forms Inventory

| # | Form Name | Location | Fields | Required Fields | Validation | Submit Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Hero Prompt Form** | `/` | Textarea, Mode pills | Textarea | Non-empty check | Navigates to `/studio?description=...` |
| 2 | **Floating Chat Drawer** | Global | Category, Message, Email | Message | Non-empty check | In-page toast simulation |
| 3 | **Sign In Form** | `/auth` | Email, Password, Remember Me | Email, Password | Email format, min 6 chars | Authenticates or simulates session |
| 4 | **Sign Up Form** | `/auth` | Name, Email, Password, Terms Checkbox | All | Email format, min 8 chars | Authenticates or simulates session |
| 5 | **Forgot Password** | `/auth` (Modal) | Email | Email | Email format | Sends reset email confirmation |
| 6 | **Referral Code** | `/pricing` (Modal) | Referral Code string | Referral Code | Format check | Applies 10-20% discount badge |
| 7 | **Feedback Form** | `/feedback` | Category, Rating, Message, Email | Message | Non-empty | Shows confirmation card |
| 8 | **Contributor Form** | `/contribute` | Name, Email, GitHub URL, Skills, Note | Name, Email, GitHub | URL & Email checks | Submits application |
| 9 | **Contact Form** | `/contact` | Name, Email, Enquiry Type, Subject, Message | Name, Email, Message | Email format | Submits inquiry |
| 10 | **Get a Website (4-Step)** | `/form` | Plan, Business Name, Trade, Phone, Email, Preferences, Promo | Name, Phone, Email, Plan | Phone (10 digits), Email | Triggers Razorpay payment checkout |
| 11 | **New Ticket** | `/support` | Name, Email, Category, Priority, Subject, Message, Attachment | Email, Subject, Message | Email check | Issues ticket ID (e.g. `OI-XXXX`) |
| 12 | **Track Ticket** | `/support` | Ticket ID, Email | Ticket ID | Format `OI-[0-9]+` | Displays status timeline |
| 13 | **Newsletter** | `/newsletter` | Email, Topic checkboxes | Email | Email format | Shows subscription toast |
| 14 | **Fellowship Form** | `/intern-fellowship` | Name, Email, University, GitHub, Projects | All | Email, URL | Shows application received |
| 15 | **Coming Soon Notify** | `/coming-soon` | Notification trigger | None | Click event | Displays confirmation alert |

---

## 11. Shared Assets & Design Tokens

### Production Assets
- **Logo:** `https://openidea.world/logo.png` (36×36 icon, 120×120 animate-pulse, transparent PNG)
- **Globe Background:** `https://openidea.world/hero-globe.png` (High-res dark earth rendering with illuminated network nodes)
- **PWA Assets:** `/favicon.ico` (48×48), `/icons/icon-192.png`, `/icons/apple-touch-icon.png`, `/manifest.webmanifest`
- **Icon Library:** FontAwesome 6 Free (Discord, LinkedIn, Twitter, Facebook, Instagram, Envelope, Phone) + Custom Inline SVGs (Logo, Search, Chevron, External Link, Shield, Code, Server)

### Primary Dark Theme Tokens (26 Pages)
- **Background Gradient:** `linear-gradient(to bottom right, #0c2321, #121f22, #0a1016)`
- **Glass Panel Surface:** `background: rgba(18, 31, 34, 0.65); backdrop-filter: blur(12px); border: 1px solid rgba(16, 255, 139, 0.12);`
- **Accent Gradients:**
  - Emerald to Cyan: `linear-gradient(to right, #10ff8b, #00e5ff)` (Primary buttons, logo text)
  - Cyan to Violet: `linear-gradient(to right, #38bdf8, #0ff0fc, #a78bfa)` (Page headings, legal titles)
- **Text Hierarchy:**
  - Primary: `#ffffff`
  - Secondary: `rgba(204, 251, 241, 0.8)` (`text-teal-100/80`)
  - Muted: `rgba(156, 163, 175, 0.9)` (`text-gray-400`)
- **Typography:** `Space Grotesk`, `Inter`, sans-serif

### Secondary Commercial Light Theme Tokens (`oi-light-chrome` across 3 Pages: `/form`, `/demo`, `/support`)
- **Background:** `#ffffff` (Pure White) with subtle gray section bands (`#f8fafc`)
- **Surface Cards:** `#ffffff` with `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;`
- **Primary Accent:** `#0d9488` (Teal-600) and `#0f766e` (Teal-700)
- **Text Hierarchy:**
  - Headings: `#0f172a` (Slate-900)
  - Body: `#334155` (Slate-700)
  - Subdued: `#64748b` (Slate-500)

---

## 12. Master Page Inventory Summary Table

| # | Route | Page Type | Public | Source Link | Needs Replica | Notes |
| :---: | :--- | :--- | :---: | :--- | :---: | :--- |
| **1** | `/` | Marketing / Entrypoint | Yes | Header Logo / Direct | **Done** | Existing verified replica (`site.html`) |
| **2** | `/about` | Marketing / About | Yes | Header / Footer | **Done** | Completed verified replica (`about/site.html`) |
| **3** | `/features` | Marketing / Features | Yes | Header / Footer | **Yes** | 3 core feature pillars, tabbed showcase, CTAs |
| **4** | `/pricing` | Pricing & Plans | Yes | Header / Footer | **Done** | Existing verified replica (`pricing/site.html`) |
| **5** | `/auth` | Authentication Portal | Yes | Header CTA / Redirects | **Done** | Existing verified replica (`auth/site.html`) |
| **6** | `/studio` | Web App Studio | **Gated** | Header CTA / Hero | **No (Auth)** | Auth-gated application; route redirects to `/auth` |
| **7** | `/openresources` | Resource Directory | Yes | Features / Hero Search | **Yes** | Searchable directory of models, datasets, papers |
| **8** | `/projects` | Showcase Directory | Yes | About / Features / Hero | **Yes** | Open source project showcases |
| **9** | `/community` | Community Hub | Yes | About / Features | **Yes** | Community pillars, guidelines, Discord link |
| **10** | `/chat` | AI Chatbot | **Gated** | Features CTA | **No (Auth)** | Auth-gated application; route redirects to `/auth` |
| **11** | `/feedback` | Public Feedback Form | Yes | Header / Mobile Menu | **Yes** | Dedicated feedback card with rating & textarea |
| **12** | `/contribute` | Contributor Portal | Yes | Homepage / Projects | **Yes** | 6 contribution paths + interest form |
| **13** | `/docs/contributing` | Developer Guide | **No** | Linked from `/contribute`| **No (Dead)** | **Broken Link (HTTP 404)** on production |
| **14** | `/researchwhitepaper`| Scientific Document | Yes | About page CTA | **Yes** | 9-section paper, TOC spy, PDF download |
| **15** | `/careers` | Careers / Recruitment | Yes | Footer | **Yes** | 7 job accordion items, fellowship banner |
| **16** | `/intern-fellowship` | Fellowship Program | Yes | Footer / Careers | **Yes** | SVG contribution heatmap, 4 stipend phases |
| **17** | `/partnership` | Affiliate Program | Yes | Footer | **Yes** | Bronze, Silver, Gold commission tiers |
| **18** | `/contact` | Contact & Inquiries | Yes | Partnership / Footer | **Yes** | Inquiry form with `?enquiry=` handling |
| **19** | `/form` | Website Order Wizard | Yes | Footer ("Get a Website")| **Yes** | 4-step commercial wizard (**Light Theme**) |
| **20** | `/demo` | Trade Sites Portfolio | Yes | `/form` ("Live Demos") | **Yes** | 21 client websites showcase (**Light Theme**) |
| **21** | `/support` | Support & Complaints | Yes | Footer | **Yes** | New Ticket & Track Ticket tabs (**Light Theme**) |
| **22** | `/problems-and-ideas`| Community Idea Board | **Gated** | Footer | **No (Auth)** | Auth-gated application; route redirects to `/auth` |
| **23** | `/newsletter` | Newsletter Signup | Yes | Footer | **Yes** | Dedicated subscription card with archives |
| **24** | `/ai-news` | Curated AI News Feed | Yes | Footer | **Yes** | Daily 200-word summaries with category filters |
| **25** | `/ai-news/saved` | Bookmarked Articles | **Gated** | `/ai-news` | **No (Auth)** | Auth-gated personal route; redirects to `/auth` |
| **26** | `/coming-soon` | Dynamic Feature Teaser | Yes | Hero "Network" submit | **Yes** | Rotating logo animation, query interpolation |
| **27** | `/privacy` | Legal Privacy Policy | Yes | Footer / Auth / Form | **Yes** | 4 numbered sections, Feb 2026 update |
| **28** | `/terms` | Legal Terms of Use | Yes | Footer / Auth / Form | **Yes** | 4 numbered sections, AGPL-3.0 license link |
| **29** | `/cookies` | Legal Cookie Policy | Yes | Footer | **Yes** | 4 numbered sections, Feb 2026 update |

---

## 13. Completeness Verification Trail

1. **Origin Verification:**
   - Crawl originated at `https://openidea.world/`.
   - Header links, hero mode pills, prompt shortcuts, footer links, and floating triggers inspected.
2. **Recursive Crawl:**
   - Evaluated outgoing links from `/about`, `/features`, `/pricing`, `/contribute`, `/careers`, `/partnership`, `/form`, `/demo`, `/support`, and `/ai-news`.
   - Discovered hidden and sub-routes: `/researchwhitepaper`, `/intern-fellowship`, `/demo`, `/ai-news/saved`, `/coming-soon`, and `/docs/contributing`.
3. **Chunk & Bundle Verification:**
   - Inspected Next.js production build artifacts (`fh3eXRTQwDla62OU1Ickr`), Webpack runtime, App Router manifest, and client-side page chunks to confirm no pages or API-routed pages were missed.
4. **Theme Segregation Identified:**
   - Revealed that the commercial website service (`/form`, `/demo`, `/support`) is rendered under an explicit Light Theme (`oi-light-chrome`) while all other marketing and informational pages use the dark emerald gradient theme.
5. **Session Gates Confirmed:**
   - Verified that `/studio`, `/chat`, `/problems-and-ideas`, and `/ai-news/saved` return client redirects to `/auth?redirect=...` for unauthenticated visitors.

This document stands as the definitive specification for completing the Open Idea website replication.
