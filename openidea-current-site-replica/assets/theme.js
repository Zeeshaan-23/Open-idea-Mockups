/**
 * ============================================================================
 * OPEN IDEA GLOBAL THEME CONTROLLER
 * Centralized theme management (Dark / Light) with persistence and sync.
 * ============================================================================
 */

(function () {
  'use strict';

  var THEME_KEY = 'openidea-theme';

  // Read stored theme or default to 'dark'
  function getInitialTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (_) {}
    return 'dark';
  }

  // Apply theme to document and update toggle buttons
  function applyTheme(theme, broadcast) {
    if (broadcast === undefined) broadcast = true;

    // Apply attribute to <html> element
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Persist to localStorage
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_) {}

    // Update accessible labels and titles on all toggle buttons
    updateToggleButtons(theme);

    // Notify parent workbench if inside an iframe
    if (broadcast && window.self !== window.top) {
      try {
        window.parent.postMessage({
          type: 'WORKBENCH_THEME_CHANGE',
          theme: theme
        }, '*');
      } catch (_) {}
    }
  }

  function updateToggleButtons(theme) {
    var buttons = document.querySelectorAll('.theme-toggle-btn, .mobile-theme-drawer-row, [data-action="toggle-theme"]');
    var isLight = theme === 'light';
    var nextTheme = isLight ? 'Dark' : 'Light';

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-label', 'Switch to ' + nextTheme + ' theme');
      btn.setAttribute('title', 'Switch to ' + nextTheme + ' theme');

      var labelSpan = btn.querySelector('.theme-mode-label');
      if (labelSpan) {
        labelSpan.textContent = isLight ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    applyTheme(next, true);
  }

  // Expose global methods
  window.toggleOpenIdeaTheme = toggleTheme;
  window.setOpenIdeaTheme = function(t) { applyTheme(t, true); };

  // Listen for remote theme change from workbench parent
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (data && data.type === 'APPLY_REMOTE_THEME') {
      if (data.theme === 'light' || data.theme === 'dark') {
        applyTheme(data.theme, false); // false prevents echo loop
      }
    }
  });

  // Apply initial theme immediately (prevents flash)
  var currentTheme = getInitialTheme();
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Attach event listeners once DOM is loaded
  document.addEventListener('DOMContentLoaded', function () {
    updateToggleButtons(currentTheme);

    document.addEventListener('click', function (event) {
      var target = event.target.closest('.theme-toggle-btn, .mobile-theme-drawer-row, [data-action="toggle-theme"]');
      if (target) {
        event.preventDefault();
        event.stopPropagation();
        toggleTheme();
      }
    });
  });
})();
