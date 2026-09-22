/**
 * ============================================================================
 * WORKBENCH SYNCHRONIZATION CLIENT (Navigation & Meaningful Interactions)
 * Active ONLY when embedded inside an iframe (window.self !== window.top).
 * 
 * - Synchronizes internal page navigation between Desktop and Mobile frames.
 * - Synchronizes meaningful user interactions (tabs, mode pills, template pills,
 *   toggles, modals, buttons, accordions) without infinite loops.
 * - Scrolling remains 100% independent.
 * - Text typing remains independent.
 * - Mouse movement / cursor / physical hover remain independent.
 * - External links, target="_blank", mailto:, and tel: links are untouched.
 * ============================================================================
 */

(function() {
  'use strict';

  // Only active inside an iframe (workbench viewport)
  if (window.self === window.top) {
    return;
  }

  // Loop prevention flag: true when an interaction received from parent is being applied
  let isApplyingRemoteAction = false;

  // Programmatic navigation helper for pages that redirect via JS
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

  // --------------------------------------------------------------------------
  // 1. LISTEN FOR REMOTE INTERACTIONS FROM PARENT WORKBENCH
  // --------------------------------------------------------------------------
  window.addEventListener('message', function(event) {
    const data = event.data;
    if (!data || data.type !== 'APPLY_REMOTE_INTERACTION') return;

    // Guard against echo loops
    isApplyingRemoteAction = true;
    try {
      applyRemoteAction(data.action, data.payload);
    } catch (err) {
      console.warn('Error applying remote interaction:', err);
    } finally {
      // Release loop prevention guard after current microtask and event queue
      setTimeout(() => {
        isApplyingRemoteAction = false;
      }, 0);
    }
  });

  function applyRemoteAction(action, payload) {
    if (!payload) return;

    if (action === 'INTERACT_CLICK') {
      let target = null;

      // Match by ID
      if (payload.id) {
        target = document.getElementById(payload.id);
      }

      // Match by data attributes
      if (!target && payload.dataMode) {
        target = document.querySelector(`[data-mode="${payload.dataMode}"]`);
      }
      if (!target && payload.dataTemplate) {
        target = document.querySelector(`[data-template="${payload.dataTemplate}"]`);
      }
      if (!target && payload.dataCategory) {
        target = document.querySelector(`[data-category="${payload.dataCategory}"]`);
      }
      if (!target && payload.dataTab) {
        target = document.querySelector(`[data-tab="${payload.dataTab}"]`);
      }
      if (!target && payload.dataPlan) {
        target = document.querySelector(`[data-plan="${payload.dataPlan}"]`);
      }

      // Match by aria-controls or aria-label
      if (!target && payload.ariaControls) {
        target = document.querySelector(`[aria-controls="${payload.ariaControls}"]`);
      }
      if (!target && payload.ariaLabel) {
        target = document.querySelector(`[aria-label="${payload.ariaLabel}"]`);
      }

      // Match by selector
      if (!target && payload.selector) {
        try {
          target = document.querySelector(payload.selector);
        } catch (_) {}
      }

      // Match by button text content
      if (!target && payload.tagName === 'BUTTON' && payload.textContent) {
        const buttons = Array.from(document.querySelectorAll('button'));
        target = buttons.find(b => b.textContent.trim() === payload.textContent);
      }

      if (target) {
        // Dispatch synthetic click that triggers native & framework listeners
        target.click();
      }
    } else if (action === 'INTERACT_CHANGE') {
      let target = null;
      if (payload.id) {
        target = document.getElementById(payload.id);
      } else if (payload.name) {
        target = document.querySelector(`[name="${payload.name}"]`);
      }

      if (target && (target.type === 'checkbox' || target.type === 'radio')) {
        target.checked = payload.checked;
        target.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  // --------------------------------------------------------------------------
  // 2. INTERCEPT USER ACTIONS & BROADCAST TO PARENT WORKBENCH
  // --------------------------------------------------------------------------
  document.addEventListener('click', function(event) {
    // If currently applying a remote action, do NOT re-broadcast (prevents loops!)
    if (isApplyingRemoteAction) {
      return;
    }

    // A. Check if an anchor link (internal navigation) was clicked
    const anchor = event.target.closest('a');
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      // Hash link on same page
      if (href.startsWith('#')) return;

      // Protocols
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }

      // External target="_blank"
      if (anchor.target === '_blank') {
        return;
      }

      // External origin
      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          const url = new URL(href);
          if (url.origin !== window.location.origin) {
            return;
          }
        } catch (_) {
          return;
        }
      }

      // Internal link -> navigate both frames via parent
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
        window.location.href = href;
      }
      return;
    }

    // B. Check if non-anchor interactive control was clicked
    // Ignore text inputs, textarea, select (so typing and text focus are NOT synced)
    if (event.target.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select')) {
      return;
    }

    // Ignore theme toggle buttons (handled semantically via theme.js and WORKBENCH_THEME_CHANGE)
    if (event.target.closest('.theme-toggle-btn, .mobile-theme-drawer-row, [data-action="toggle-theme"]')) {
      return;
    }

    // Find closest actionable element
    const interactive = event.target.closest('button, [role="button"], [data-mode], [data-template], [data-category], [data-tab], [data-plan], .mode-pill, .template-pill, .chat-cat-tab, input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"]');
    if (!interactive) return;

    // Collect identifier metadata for semantic cross-frame targeting
    const payload = {
      id: interactive.id || null,
      dataMode: interactive.getAttribute('data-mode') || null,
      dataTemplate: interactive.getAttribute('data-template') || null,
      dataCategory: interactive.getAttribute('data-category') || null,
      dataTab: interactive.getAttribute('data-tab') || null,
      dataPlan: interactive.getAttribute('data-plan') || null,
      ariaControls: interactive.getAttribute('aria-controls') || null,
      ariaLabel: interactive.getAttribute('aria-label') || null,
      tagName: interactive.tagName,
      textContent: interactive.textContent ? interactive.textContent.trim().slice(0, 50) : null
    };

    // If no unique id/data attribute, compute a reliable class selector
    if (!payload.id && !payload.dataMode && !payload.dataTemplate && !payload.dataCategory && !payload.dataTab && !payload.dataPlan) {
      if (interactive.className && typeof interactive.className === 'string') {
        const classes = interactive.className.trim().split(/\s+/).filter(c => !c.includes(':') && c.length > 1);
        if (classes.length > 0) {
          payload.selector = `${interactive.tagName.toLowerCase()}.${classes.join('.')}`;
        }
      }
    }

    window.parent.postMessage({
      type: 'WORKBENCH_INTERACTION',
      action: 'INTERACT_CLICK',
      payload: payload
    }, '*');
  }, true);

  // Listen for checkbox / radio changes
  document.addEventListener('change', function(event) {
    if (isApplyingRemoteAction) return;

    const target = event.target;
    if (target && (target.type === 'checkbox' || target.type === 'radio')) {
      window.parent.postMessage({
        type: 'WORKBENCH_INTERACTION',
        action: 'INTERACT_CHANGE',
        payload: {
          id: target.id || null,
          name: target.name || null,
          checked: target.checked
        }
      }, '*');
    }
  }, true);

})();
