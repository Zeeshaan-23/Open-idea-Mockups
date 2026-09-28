/**
 * Open Idea Community Interactive Controller
 * Tab switching, group filtering & creation, upvotes, and drawer management.
 */

(function () {
  'use strict';

  // 1. Toast Notification Helper
  function showToast(message, type = 'info') {
    let toast = document.querySelector('.community-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'community-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `community-toast toast-${type} toast-show`;
    setTimeout(() => {
      toast.classList.remove('toast-show');
    }, 3200);
  }

  // 2. Tab Switching Logic
  const tabButtons = document.querySelectorAll('.comm-tab-btn');
  const tabPanes = document.querySelectorAll('.comm-tab-pane');

  function switchTab(tabId) {
    if (!tabId) return;

    tabButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    tabPanes.forEach(pane => {
      const isTarget = pane.id === `pane-${tabId}`;
      pane.classList.toggle('active', isTarget);
      if (isTarget) {
        pane.style.display = 'block';
      } else {
        pane.style.display = 'none';
      }
    });

    // Update URL hash without scroll jump
    if (history.replaceState) {
      history.replaceState(null, '', `#${tabId}`);
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Check URL hash or query on load
  const urlParams = new URLSearchParams(window.location.search);
  const requestedTab = urlParams.get('tab') || window.location.hash.replace('#', '');
  if (requestedTab && document.getElementById(`pane-${requestedTab}`)) {
    switchTab(requestedTab);
  }

  // 3. Groups Filtering & Search
  const searchInput = document.getElementById('groups-search-input');
  const topicSelect = document.getElementById('groups-topic-select');
  const groupCards = document.querySelectorAll('.group-card');

  function filterGroups() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const selectedTopic = (topicSelect?.value || '').toLowerCase().trim();

    groupCards.forEach(card => {
      const title = card.querySelector('.group-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.group-desc')?.textContent.toLowerCase() || '';
      const cardTopics = card.getAttribute('data-topics') || '';

      const matchesSearch = !query || title.includes(query) || desc.includes(query) || cardTopics.includes(query);
      const matchesTopic = !selectedTopic || cardTopics.includes(selectedTopic);

      card.style.display = matchesSearch && matchesTopic ? 'flex' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterGroups);
  if (topicSelect) topicSelect.addEventListener('change', filterGroups);

  // 4. Create Group Toggle & Submission
  const toggleCreateBtn = document.getElementById('btn-toggle-create-group');
  const createFormCard = document.getElementById('create-group-form-card');
  const createGroupForm = document.getElementById('create-group-form');
  const cancelCreateBtn = document.getElementById('btn-cancel-create-group');
  const createBtnText = document.getElementById('create-group-btn-text');

  function toggleCreateForm(show) {
    if (!createFormCard) return;
    const isVisible = show !== undefined ? show : createFormCard.style.display === 'none';
    createFormCard.style.display = isVisible ? 'block' : 'none';
    if (createBtnText) {
      createBtnText.textContent = isVisible ? '✕ Cancel' : '+ Create Group';
    }
  }

  if (toggleCreateBtn) {
    toggleCreateBtn.addEventListener('click', () => toggleCreateForm());
  }
  if (cancelCreateBtn) {
    cancelCreateBtn.addEventListener('click', () => toggleCreateForm(false));
  }

  if (createGroupForm) {
    createGroupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('new-group-name')?.value.trim();
      const desc = document.getElementById('new-group-desc')?.value.trim();
      const topics = document.getElementById('new-group-topics')?.value.trim();

      if (!name) return;

      const groupsGrid = document.querySelector('.groups-grid');
      if (groupsGrid) {
        const initials = name.slice(0, 2).toUpperCase();
        const newCard = document.createElement('div');
        newCard.className = 'group-card';
        newCard.setAttribute('data-topics', topics.toLowerCase());

        const tagsHtml = topics
          ? topics.split(',').map(t => `<span class="group-tag">${t.trim()}</span>`).join('')
          : '<span class="group-tag">New</span>';

        newCard.innerHTML = `
          <div class="group-card-header">
            <div class="group-avatar avatar-emerald">${initials}</div>
            <div class="group-header-info">
              <h3 class="group-title">${name}</h3>
              <p class="group-desc">${desc || 'A newly created collaborative group on Open Idea.'}</p>
              <div class="group-tags">${tagsHtml}</div>
            </div>
          </div>
          <div class="group-card-footer">
            <div class="group-stats">
              <span>1 member</span>
              <span class="stat-sep">·</span>
              <span>1 discussion</span>
            </div>
            <button type="button" class="btn-join-group joined">Joined ✓</button>
          </div>
        `;

        groupsGrid.prepend(newCard);
      }

      createGroupForm.reset();
      toggleCreateForm(false);
      showToast(`Group "${name}" successfully created!`, 'success');
    });
  }

  // 5. Join Group Action
  document.addEventListener('click', (e) => {
    const joinBtn = e.target.closest('.btn-join-group');
    if (joinBtn) {
      const isJoined = joinBtn.classList.contains('joined');
      if (isJoined) {
        joinBtn.classList.remove('joined');
        joinBtn.textContent = 'Join Group';
        showToast('Left group', 'info');
      } else {
        joinBtn.classList.add('joined');
        joinBtn.textContent = 'Joined ✓';
        showToast('Successfully joined group!', 'success');
      }
    }
  });

  // 6. Showcase Upvotes
  document.querySelectorAll('.btn-showcase-upvote').forEach(btn => {
    btn.addEventListener('click', function () {
      const isVoted = this.classList.contains('upvoted');
      let count = parseInt(this.getAttribute('data-votes') || '0', 10);
      if (isVoted) {
        count = Math.max(0, count - 1);
        this.classList.remove('upvoted');
        this.innerHTML = `<span>▲ Upvote (${count})</span>`;
      } else {
        count += 1;
        this.classList.add('upvoted');
        this.innerHTML = `<span>▲ Upvoted (${count})</span>`;
        showToast('Thank you for upvoting this project!', 'success');
      }
      this.setAttribute('data-votes', count);
    });
  });

  // 7. Interactive Buttons for Events, Challenges, Barter, Gigs
  document.querySelectorAll('.btn-event-rsvp').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.textContent.includes('Registered')) return;
      this.textContent = 'Registered ✓';
      this.style.background = 'var(--emerald-500, #10b981)';
      this.style.color = '#fff';
      showToast('RSVP confirmed! Added to your schedule.', 'success');
    });
  });

  document.querySelectorAll('.btn-submit-challenge').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Solution portal opened. Please connect your GitHub account.', 'info');
    });
  });

  document.querySelectorAll('.btn-pitch-in').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Opening barter exchange dialogue with author...', 'info');
    });
  });

  document.querySelectorAll('.btn-request-gig').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Gig inquiry draft initiated. Check your messages.', 'info');
    });
  });

  const postAskBtn = document.getElementById('btn-toggle-post-ask');
  if (postAskBtn) {
    postAskBtn.addEventListener('click', () => {
      showToast('Barter ask creation form opened.', 'info');
    });
  }

  const createGigBtn = document.getElementById('btn-create-gig');
  if (createGigBtn) {
    createGigBtn.addEventListener('click', () => {
      showToast('Gig listing builder opened.', 'info');
    });
  }

  // 8. Mobile Drawer (Strictly Local)
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !expanded);
      mobileNav.classList.toggle('is-open', !expanded);
    });

    mobileNav.querySelectorAll('.mobile-nav-link, .mobile-btn-full').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      });
    });
  }
})();
