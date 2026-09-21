# Open Idea Production Authentication Page Replica

### Production Source
[https://openidea.world/auth](https://openidea.world/auth)

### Purpose
Faithful, static HTML5, CSS3, and Vanilla JavaScript replica of the current live Open Idea Authentication page (`/auth`). Built without external frontend frameworks (no React, Next.js, Vite, or Tailwind) so that it operates standalone and locally when opening HTML files in any browser.

---

### Files
The Authentication replica is located at `D:\Mockups\openidea-current-site-replica\auth\`:

```
auth/
├── site.html         # Production-accurate static authentication page replica
├── styles.css        # Vanilla CSS matching live styles, 12-column layout, and modals
├── script.js         # Vanilla JS for form validation, mode toggle, OAuth, and reset modal
├── index.html        # Developer comparison workspace (1440px desktop & 390px mobile viewports)
├── README.md         # Comprehensive reverse-engineering and architecture documentation
└── assets/
    ├── fonts/        # Web font definitions (Space Grotesk & Inter)
    ├── icons/        # Favicon and PWA icons (favicon.ico, icon-192.png)
    ├── images/       # High-resolution production hero artwork (hero-globe.png)
    └── logos/        # Production brand vector/raster logos (logo.png)
```

---

### Auth UI Structure
1. **Header**:
   - Sticky backdrop-blur navigation bar.
   - Brand logo and name linking back to `../site.html`.
   - Desktop navigation links: Home, About, Features, Pricing (`../pricing/site.html`), App Studio CTA button, Feedback link, and yellow "BETA" badge.
   - Note: In production `/auth`, the header hides the "Sign In" button since the user is already on the authentication page.
2. **Main Authentication Hero**:
   - Deep gradient background: `#0c2321` via `#121f22` to `#0a1016`.
   - Production globe visual artwork (`hero-globe.png`) on the right half with 30% opacity and central cyan ambient radial glow.
   - Responsive 12-column grid:
     - **Left Column (cols 1-6)**: Form card with heading, subtitle, OAuth buttons, divider, input forms, auxiliary links, and back-to-home navigation.
     - **Right Column (cols 7-12)**: Open visual space displaying the high-resolution globe artwork as in production.
   - Decorative bottom emerald gradient dividing line.
3. **Social Authentication**:
   - **Continue with GitHub**: Dark button (`#1f2937`) with official GitHub SVG mark.
   - **Continue with Google**: Dark translucent button with official 4-color Google mark.
4. **Form Modes**:
   - **Sign In Mode**:
     - Heading: "Welcome Back"
     - Subtitle: "Sign in to continue your journey"
     - Fields: Email (`signin-email`) & Password (`signin-password`) with toggleable eye visibility icon.
     - Primary gradient button: "Sign In".
     - Links: "Forgot your password?" and "Don't have an account? Sign up".
   - **Sign Up Mode**:
     - Heading: "Join the Revolution"
     - Subtitle: "Create your account to start innovating"
     - Fields: Full Name (`signup-name`), Email (`signup-email`), Phone Number (`signup-phone`), Password (`signup-password`) with visibility toggle.
     - Primary gradient button: "Create Account".
     - Links: "Already have an account? Sign in".
5. **Contextual Plan Parameter**:
   - Supports `?plan=free` or other plan query parameters.
   - Automatically activates Sign Up mode and renders a sleek badge: *"✨ Signing up for the Free Plan"*.
6. **Reset Password Modal**:
   - Accessible via "Forgot your password?".
   - Dark glassmorphism modal with backdrop blur.
   - Email Address field with "Cancel" and "Send Reset Link" buttons.
   - Simulates password reset link dispatch with success toast.
7. **Toast Notifications**:
   - Simulates production toast alerts (Sonner-style) for successful sign-in, account creation, password reset, and validation errors.
8. **Shared Production Footer**:
   - Authentic footer with mission statement *"Empowering Open, Sustainable Innovation Worldwide"*, contact numbers (`+91 81302 96940`, `011 4119 3699`), social media links, careers/fellowship/partnership/website links, secondary news links, legal policies, registered address, and copyright.

---

### Desktop Behavior
- Target viewport: 1440px.
- 12-column asymmetric layout where the form occupies the left half (6 columns) and the visual globe artwork occupies the right half (6 columns).
- Input focus rings with emerald glow (`#34d399`).
- Smooth button hover scales (`hover:scale-105`).

---

### Mobile Behavior
- Target viewports: 375px, 390px, 414px.
- Center-aligned column with full touch target heights (min 44px for buttons).
- Zero horizontal overflow or clipped text.
- Full mobile hamburger navigation drawer.
- Responsive reset password dialog.

---

### Simulated Interactions
- **Sign In Submission**: Validates email and password, displays "Signing in..." loading state, triggers success toast, and simulates redirect back to `../site.html`.
- **Sign Up Submission**: Validates full name, email, phone (min 10 digits if provided), and password complexity (min 8 chars, 1 uppercase, 1 lowercase, 1 number).
- **OAuth Login**: Clicking GitHub or Google triggers simulated sandbox authentication and redirect.
- **Forgot Password**: Validates email, triggers loading state, closes modal, and displays confirmation toast.
- **Password Visibility**: Eye icon toggles password text visibility.

---

### Navigation Integration
- **Homepage → Auth**:
  - `site.html`: Desktop "Sign In" button, mobile quick-auth button, and mobile drawer "Sign In" button navigate to `auth/site.html?redirect=%2F`.
- **Pricing → Auth**:
  - `pricing/site.html`: "Get Started" on Free plan links to `../auth/site.html?plan=free`; header "Sign In" buttons navigate to `../auth/site.html?redirect=%2Fpricing`.
- **Auth → Homepage**:
  - `auth/site.html`: Logo, Home nav link, and "← Back to home" link navigate to `../site.html`.

---

### Assets
- `auth/assets/logos/logo.png`: Production brand flower emblem.
- `auth/assets/images/hero-globe.png`: High-resolution production digital globe artwork.
- `auth/assets/icons/favicon.ico`: Production favicon.
- `auth/assets/icons/icon-192.png`: Production PWA icon.

---

### Fonts
- **Brand & Headings**: `Space Grotesk` (Google Fonts, weights 600, 700).
- **Body & Form Inputs**: `Inter` (Google Fonts, weights 400, 500, 600, 700).

---

### Static Limitations
- No backend servers, databases, or live OAuth providers are connected.
- All credential verification, session storage, and resets are securely simulated locally in Vanilla JavaScript.
