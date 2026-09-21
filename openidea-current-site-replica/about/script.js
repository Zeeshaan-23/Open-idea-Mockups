/* ==========================================================================
   OPEN IDEA ABOUT PAGE REPLICA - VANILLA JAVASCRIPT
   Source of Truth: https://openidea.world/about
   Build ID: fh3eXRTQwDla62OU1Ickr
   Handles:
   - Mobile hamburger menu toggle
   - Live search input & Discover form submission
   - PWA Install prompt dismissal / install simulation
   - Active page keyboard shortcuts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
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

  // 2. Discover Search Form
  const searchForm = document.getElementById('about-search-form');
  const searchInput = document.getElementById('about-search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        // Production behavior: router.push('/openresources?q=' + encodeURIComponent(query))
        alert(`[Open Idea Discovery Engine]\n\nSearching open-source solutions for:\n"${query}"\n\nNavigating to /openresources?q=${encodeURIComponent(query)}`);
      } else {
        searchInput.focus();
        searchInput.style.boxShadow = '0 0 0 2px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.2)';
        setTimeout(() => {
          searchInput.style.boxShadow = '';
        }, 1200);
      }
    });
  }

  // 3. PWA Install Prompt
  const pwaToast = document.getElementById('pwa-toast');
  const pwaDismissBtn = document.getElementById('pwa-dismiss-btn');
  const pwaInstallBtn = document.getElementById('pwa-install-btn');

  if (pwaToast && pwaDismissBtn) {
    pwaDismissBtn.addEventListener('click', () => {
      pwaToast.style.transition = 'all 0.3s ease';
      pwaToast.style.opacity = '0';
      pwaToast.style.transform = 'translate(-50%, 20px)';
      setTimeout(() => {
        pwaToast.style.display = 'none';
      }, 300);
    });
  }

  if (pwaToast && pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', () => {
      alert('Open Idea web app added to your home screen!');
      pwaToast.style.display = 'none';
    });
  }
});
