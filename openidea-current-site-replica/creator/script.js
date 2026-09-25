/**
 * ============================================================================
 * OPEN IDEA CREATOR WORKSPACE - INTERACTIVE SCRIPT
 * Manages prompt auto-resize, quick actions, simulated generation canvas,
 * attachments, notifications, user menu, sidebar collapse, and mobile drawer.
 * ============================================================================
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // ------------------------------------------------------------------------
    // DOM Elements
    // ------------------------------------------------------------------------
    const promptInput = document.getElementById('creator-prompt-input');
    const promptCard = document.getElementById('creator-prompt-card');
    const submitBtn = document.getElementById('creator-submit-btn');
    const attachBtn = document.getElementById('creator-attach-btn');
    const fileInput = document.getElementById('creator-file-input');
    const attachedPill = document.getElementById('attached-file-pill');
    const attachedFileName = document.getElementById('attached-file-name');
    const removeAttachBtn = document.getElementById('btn-remove-attachment');
    const micBtn = document.getElementById('creator-mic-btn');

    const resultCard = document.getElementById('creator-result-card');
    const resultTitle = document.getElementById('result-card-title');
    const resultSummary = document.getElementById('result-summary-text');
    const resultCloseBtn = document.getElementById('btn-close-result');
    const newPromptBtn = document.getElementById('btn-new-prompt');

    const sidebar = document.getElementById('creator-sidebar');
    const sidebarCollapseToggle = document.getElementById('sidebar-collapse-toggle');

    const hamburgerBtn = document.getElementById('creator-hamburger');
    const mobileDrawer = document.getElementById('creator-mobile-drawer');
    const drawerBackdrop = document.getElementById('creator-mobile-backdrop');
    const drawerCloseBtn = document.getElementById('creator-drawer-close');

    const notifBtn = document.getElementById('creator-notif-btn');
    const notifMenu = document.getElementById('creator-notif-menu');
    const userBtn = document.getElementById('creator-topbar-user');
    const userMenu = document.getElementById('creator-user-menu');
    const searchInput = document.getElementById('creator-search-input');

    // ------------------------------------------------------------------------
    // 1. Textarea Auto-Resize
    // ------------------------------------------------------------------------
    function adjustPromptHeight() {
      if (!promptInput) return;
      promptInput.style.height = 'auto';
      const scrollHeight = promptInput.scrollHeight;
      promptInput.style.height = Math.min(scrollHeight, 140) + 'px';
      if (scrollHeight > 140) {
        promptInput.style.overflowY = 'auto';
      } else {
        promptInput.style.overflowY = 'hidden';
      }
    }

    if (promptInput) {
      promptInput.addEventListener('input', adjustPromptHeight);

      // Submit on Enter (without Shift)
      promptInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handlePromptSubmit();
        }
      });

      // Check if prompt was passed via URL query (e.g. from Templates "Open in Creator Workspace")
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const initialPrompt = urlParams.get('prompt');
        if (initialPrompt && promptInput) {
          promptInput.value = initialPrompt;
          adjustPromptHeight();
          promptInput.focus();
          if (promptCard) {
            promptCard.classList.add('pulse-highlight');
            setTimeout(() => {
              promptCard.classList.remove('pulse-highlight');
            }, 600);
          }
        }
      } catch (_) {}
    }

    // ------------------------------------------------------------------------
    // 2. Quick Action Chips & Sidebar/Drawer Quick Action Injection
    // ------------------------------------------------------------------------
    const quickActionTriggers = document.querySelectorAll('[data-action="quick-action"]');
    quickActionTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const promptText = trigger.getAttribute('data-prompt');
        if (!promptText || !promptInput) return;

        promptInput.value = promptText;
        adjustPromptHeight();
        promptInput.focus();

        // Highlight animation on the prompt card
        promptCard.classList.add('pulse-highlight');
        setTimeout(() => {
          promptCard.classList.remove('pulse-highlight');
        }, 600);

        // If mobile drawer was open, close it
        closeMobileDrawer();
      });
    });

    // ------------------------------------------------------------------------
    // 3. Prompt Submission & Simulated AI Creation Flow
    // ------------------------------------------------------------------------
    function handlePromptSubmit() {
      if (!promptInput) return;
      const text = promptInput.value.trim();

      if (!text) {
        // Subtle attention shake
        promptCard.style.transform = 'translateX(-6px)';
        setTimeout(() => { promptCard.style.transform = 'translateX(6px)'; }, 100);
        setTimeout(() => { promptCard.style.transform = 'translateX(-3px)'; }, 200);
        setTimeout(() => { promptCard.style.transform = 'none'; }, 300);
        promptInput.focus();
        return;
      }

      // Generate contextual title based on prompt keywords
      let generatedTitle = 'Interactive Open Idea Canvas';
      let summaryText = 'Your project blueprint has been synthesized using Open Idea\'s decentralized knowledge network.';

      const lower = text.toLowerCase();
      if (lower.includes('website') || lower.includes('landing') || lower.includes('portfolio')) {
        generatedTitle = 'Website Architecture Blueprint Generated';
        summaryText = 'Multi-section responsive structure with Open Idea dark/light themes, hero digital globe, and navigation system configured.';
      } else if (lower.includes('research') || lower.includes('paper') || lower.includes('scientific')) {
        generatedTitle = 'Research Synthesis & Citation Matrix';
        summaryText = 'Synthesized open-access scientific literature with dynamic knowledge graph relations and citation nodes.';
      } else if (lower.includes('content') || lower.includes('blog') || lower.includes('announcement')) {
        generatedTitle = 'Editorial Content Blueprint & Media Kit';
        summaryText = 'Comprehensive technical narrative formatted for developer launch, community governance, and social channels.';
      } else if (lower.includes('analyse') || lower.includes('data') || lower.includes('metric')) {
        generatedTitle = 'Open Data Analytics & Trend Model';
        summaryText = 'Visual metrics dashboard schema loaded with benchmarks across community repositories and innovation index.';
      } else if (lower.includes('business') || lower.includes('idea') || lower.includes('model')) {
        generatedTitle = 'Open Innovation Business Model Canvas';
        summaryText = '3 high-leverage sustainable business vectors mapped with open knowledge incentives and ecosystem monetization.';
      }

      // Show result card
      if (resultCard) {
        resultCard.style.display = 'block';
        if (resultTitle) resultTitle.textContent = generatedTitle;
        if (resultSummary) resultSummary.textContent = summaryText;

        // Smooth scroll to result
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', handlePromptSubmit);
    }

    if (resultCloseBtn) {
      resultCloseBtn.addEventListener('click', function () {
        if (resultCard) resultCard.style.display = 'none';
      });
    }

    if (newPromptBtn) {
      newPromptBtn.addEventListener('click', function () {
        if (resultCard) resultCard.style.display = 'none';
        if (promptInput) {
          promptInput.value = '';
          adjustPromptHeight();
          promptInput.focus();
        }
      });
    }

    // ------------------------------------------------------------------------
    // 4. File Attachment Simulation
    // ------------------------------------------------------------------------
    if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', function () {
        fileInput.click();
      });

      fileInput.addEventListener('change', function () {
        if (fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          if (attachedFileName) attachedFileName.textContent = file.name;
          if (attachedPill) attachedPill.style.display = 'inline-flex';
        }
      });
    }

    if (removeAttachBtn) {
      removeAttachBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (fileInput) fileInput.value = '';
        if (attachedPill) attachedPill.style.display = 'none';
      });
    }

    // ------------------------------------------------------------------------
    // 5. Microphone / Voice Input Simulation
    // ------------------------------------------------------------------------
    let isListening = false;
    let recognition = null;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      try {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = function () {
          isListening = true;
          if (micBtn) micBtn.classList.add('listening');
        };

        recognition.onresult = function (event) {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          if (promptInput) {
            promptInput.value = transcript;
            adjustPromptHeight();
          }
        };

        recognition.onerror = function () {
          stopListening();
        };

        recognition.onend = function () {
          stopListening();
        };
      } catch (_) {}
    }

    function stopListening() {
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
    }

    if (micBtn) {
      micBtn.addEventListener('click', function () {
        if (recognition) {
          if (!isListening) {
            try {
              recognition.start();
            } catch (_) {
              simulateVoice();
            }
          } else {
            recognition.stop();
          }
        } else {
          simulateVoice();
        }
      });
    }

    function simulateVoice() {
      if (isListening) {
        stopListening();
        return;
      }
      isListening = true;
      if (micBtn) micBtn.classList.add('listening');

      // Inject demo speech prompt after brief simulation
      setTimeout(() => {
        if (promptInput && isListening) {
          promptInput.value = 'Build a responsive open-source documentation platform with live search and dark mode';
          adjustPromptHeight();
        }
        stopListening();
      }, 1500);
    }

    // ------------------------------------------------------------------------
    // 5.5. My Projects Accordion & Chat Session Storage Controller
    // ------------------------------------------------------------------------
    const btnProjectsToggle = document.getElementById('btn-projects-toggle');
    const btnAddProject = document.getElementById('btn-add-project');
    const projectsDropdown = document.getElementById('projects-dropdown');
    const projectsList = document.getElementById('projects-list');
    const projectsCount = document.getElementById('projects-count');

    const drawerProjectsToggle = document.getElementById('drawer-projects-toggle');
    const drawerAddProject = document.getElementById('drawer-add-project');
    const drawerProjectsDropdown = document.getElementById('drawer-projects-dropdown');
    const drawerProjectsList = document.getElementById('drawer-projects-list');
    const drawerProjectsCount = document.getElementById('drawer-projects-count');

    const DEFAULT_PROJECT_SESSIONS = [
      {
        id: 'proj-1',
        title: 'SaaS Platform Scaffolding',
        prompt: 'Build a modern landing page for an open innovation platform with responsive layouts, dark mode, interactive showcase cards, and custom typography.',
        meta: 'Active session · 2h ago',
        active: true
      },
      {
        id: 'proj-2',
        title: 'Research Citation Graph',
        prompt: 'Search and synthesize recent scientific research papers on decentralized compute networks and open-source generative intelligence.',
        meta: 'Saved session · Yesterday',
        active: false
      },
      {
        id: 'proj-3',
        title: 'Open Data Metric Pipeline',
        prompt: 'Analyse global open-source innovation trends, community contributions, and repository growth metrics over the past 24 months.',
        meta: 'Saved session · 3d ago',
        active: false
      }
    ];

    let projectSessions = [];
    try {
      const stored = localStorage.getItem('openidea-creator-sessions');
      projectSessions = stored ? JSON.parse(stored) : DEFAULT_PROJECT_SESSIONS;
    } catch (_) {
      projectSessions = DEFAULT_PROJECT_SESSIONS;
    }

    function saveSessions() {
      try {
        localStorage.setItem('openidea-creator-sessions', JSON.stringify(projectSessions));
      } catch (_) {}
    }

    function renderSessions() {
      const count = projectSessions.length;
      if (projectsCount) projectsCount.textContent = count;
      if (drawerProjectsCount) drawerProjectsCount.textContent = count;

      [projectsList, drawerProjectsList].forEach((container) => {
        if (!container) return;
        container.innerHTML = '';

        if (projectSessions.length === 0) {
          const empty = document.createElement('div');
          empty.className = 'project-item-meta';
          empty.style.padding = '0.5rem';
          empty.style.textAlign = 'center';
          empty.textContent = 'No saved sessions yet. Click + to create one.';
          container.appendChild(empty);
          return;
        }

        projectSessions.forEach((sess) => {
          const item = document.createElement('div');
          item.className = 'project-item' + (sess.active ? ' active' : '');
          item.setAttribute('role', 'button');
          item.setAttribute('tabindex', '0');

          const main = document.createElement('div');
          main.className = 'project-item-main';

          const title = document.createElement('span');
          title.className = 'project-item-title';
          title.textContent = sess.title;

          const meta = document.createElement('span');
          meta.className = 'project-item-meta';
          meta.textContent = sess.meta || 'Saved chat session';

          main.appendChild(title);
          main.appendChild(meta);

          const delBtn = document.createElement('button');
          delBtn.className = 'project-item-delete';
          delBtn.title = 'Delete project session';
          delBtn.setAttribute('aria-label', 'Delete session');
          delBtn.innerHTML = '&times;';

          delBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            projectSessions = projectSessions.filter(p => p.id !== sess.id);
            if (sess.active && projectSessions.length > 0) {
              projectSessions[0].active = true;
            }
            saveSessions();
            renderSessions();
          });

          item.addEventListener('click', function() {
            projectSessions.forEach(p => { p.active = (p.id === sess.id); });
            saveSessions();
            renderSessions();

            // Populate workspace with this session
            if (promptInput) {
              promptInput.value = sess.prompt || '';
              adjustPromptHeight();
              promptInput.focus();
            }
          });

          item.appendChild(main);
          item.appendChild(delBtn);
          container.appendChild(item);
        });
      });
    }

    function toggleProjectsDropdown(open) {
      const isCurrentlyOpen = projectsDropdown && projectsDropdown.style.display !== 'none';
      const shouldOpen = typeof open === 'boolean' ? open : !isCurrentlyOpen;

      if (projectsDropdown) {
        projectsDropdown.style.display = shouldOpen ? 'flex' : 'none';
      }
      if (btnProjectsToggle) {
        btnProjectsToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      }
      if (drawerProjectsDropdown) {
        drawerProjectsDropdown.style.display = shouldOpen ? 'flex' : 'none';
      }
      if (drawerProjectsToggle) {
        drawerProjectsToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      }
    }

    function handleAddNewProject(e) {
      if (e) e.stopPropagation();
      toggleProjectsDropdown(true);

      const defaultName = 'Project ' + (projectSessions.length + 1);
      const title = window.prompt('Enter new project session name:', defaultName);
      if (!title || !title.trim()) return;

      const newSession = {
        id: 'proj-' + Date.now(),
        title: title.trim(),
        prompt: '',
        meta: 'Active session · Just now',
        active: true
      };

      projectSessions.forEach(p => { p.active = false; });
      projectSessions.unshift(newSession);
      saveSessions();
      renderSessions();

      if (promptInput) {
        promptInput.value = '';
        adjustPromptHeight();
        promptInput.focus();
      }
      if (resultCard) {
        resultCard.style.display = 'none';
      }
    }

    if (btnProjectsToggle) {
      btnProjectsToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleProjectsDropdown();
      });
    }

    if (btnAddProject) {
      btnAddProject.addEventListener('click', handleAddNewProject);
    }

    if (drawerProjectsToggle) {
      drawerProjectsToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleProjectsDropdown();
      });
    }

    if (drawerAddProject) {
      drawerAddProject.addEventListener('click', handleAddNewProject);
    }

    renderSessions();

    // ------------------------------------------------------------------------
    // 6. Sidebar Collapse Toggle (Desktop)
    // ------------------------------------------------------------------------
    if (sidebarCollapseToggle && sidebar) {
      // Check stored preference
      const isCollapsed = localStorage.getItem('openidea-creator-sidebar') === 'collapsed';
      if (isCollapsed) {
        sidebar.classList.add('collapsed');
      }

      sidebarCollapseToggle.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
        const nowCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('openidea-creator-sidebar', nowCollapsed ? 'collapsed' : 'expanded');
      });
    }

    // ------------------------------------------------------------------------
    // 7. Mobile Navigation Drawer
    // ------------------------------------------------------------------------
    function openMobileDrawer() {
      if (mobileDrawer) {
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
      }
      if (drawerBackdrop) {
        drawerBackdrop.classList.add('open');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
      }
      if (hamburgerBtn) {
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    }

    function closeMobileDrawer() {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
      if (drawerBackdrop) {
        drawerBackdrop.classList.remove('open');
        drawerBackdrop.setAttribute('aria-hidden', 'true');
      }
      if (hamburgerBtn) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    }

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', openMobileDrawer);
    }

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeMobileDrawer);
    }

    // ------------------------------------------------------------------------
    // 8. Topbar Dropdown Menus (Notifications & User Menu)
    // ------------------------------------------------------------------------
    if (notifBtn && notifMenu) {
      notifBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = notifMenu.classList.contains('show');
        closeAllDropdowns();
        if (!isOpen) {
          notifMenu.classList.add('show');
          notifBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    if (userBtn && userMenu) {
      userBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = userMenu.classList.contains('show');
        closeAllDropdowns();
        if (!isOpen) {
          userMenu.classList.add('show');
          userBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    function closeAllDropdowns() {
      if (notifMenu) notifMenu.classList.remove('show');
      if (notifBtn) notifBtn.setAttribute('aria-expanded', 'false');
      if (userMenu) userMenu.classList.remove('show');
      if (userBtn) userBtn.setAttribute('aria-expanded', 'false');
    }

    document.addEventListener('click', function () {
      closeAllDropdowns();
    });

    // ------------------------------------------------------------------------
    // 9. Keyboard Shortcuts (Cmd+K for search, Escape for menus)
    // ------------------------------------------------------------------------
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      } else if (e.key === 'Escape') {
        closeAllDropdowns();
        closeMobileDrawer();
      }
    });

  });
})();
