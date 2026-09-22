/**
 * ============================================================================
 * WORKBENCH NAVIGATION CLIENT SYNCHRONIZATION
 * Synchronizes page navigation between Desktop and Mobile frames in the workbench.
 * Active ONLY when embedded inside an iframe (window.self !== window.top).
 * 
 * - Does NOT synchronize scrolling (Desktop and Mobile scroll independently).
 * - Does NOT synchronize inputs, mouse, or state.
 * - ONLY intercepts internal link navigation and notifies parent workbench.
 * - External links, target="_blank", mailto:, and tel: links are untouched.
 * ============================================================================
 */

(function() {
  'use strict';

  // Only activate inside an iframe (workbench viewport)
  if (window.self === window.top) {
    return;
  }

  // Global programmatic navigation helper for pages that redirect via JS
  window.workbenchNavigate = function(path) {
    if (!path) return;
    try {
      const targetUrl = new URL(path, window.location.href);
      window.parent.postMessage({
        type: 'WORKBENCH_NAVIGATE',
        pathname: targetUrl.pathname,
        search: targetUrl.search,
        hash: targetUrl.hash,
        rawHref: path
      }, '*');
    } catch (_) {
      window.location.href = path;
    }
  };

  // Intercept all clicks on internal <a> links
  document.addEventListener('click', function(event) {
    const anchor = event.target.closest('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    // Anchor hash link on same page (e.g. #section)
    if (href.startsWith('#')) return;

    // Standard non-http protocols (mailto, tel, javascript)
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return;
    }

    // External target="_blank" links
    if (anchor.target === '_blank') {
      return;
    }

    // Check if absolute URL points to a different origin
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const url = new URL(href);
        if (url.origin !== window.location.origin) {
          // External link (e.g. github, discord, external social) -> allow normal behavior
          return;
        }
      } catch (_) {
        return;
      }
    }

    // This is an internal link. Prevent default iframe navigation
    event.preventDefault();
    event.stopPropagation();

    try {
      const targetUrl = new URL(href, window.location.href);
      window.parent.postMessage({
        type: 'WORKBENCH_NAVIGATE',
        pathname: targetUrl.pathname,
        search: targetUrl.search,
        hash: targetUrl.hash,
        rawHref: href
      }, '*');
    } catch (err) {
      console.warn('Navigation resolution error:', err);
      window.location.href = href;
    }
  }, true); // Use capture phase so we intercept before local handlers
})();
