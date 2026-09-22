/* ==========================================================================
   OPEN IDEA FEATURES PAGE REPLICA - VANILLA JAVASCRIPT
   Source of Truth: https://openidea.world/features
   Handles:
   - Mobile hamburger menu toggle
   - Keyboard navigation (Escape key dismissal)
   - Outside click menu dismissal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link inside is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
