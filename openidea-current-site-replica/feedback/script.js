/**
 * Open Idea Production Feedback Replica - Client Logic
 * Pure Vanilla JavaScript replicating production interactions and simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavPanel = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking links inside
    mobileNavPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (event) => {
      if (!mobileNavPanel.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        mobileNavPanel.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Feedback Form Handler
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackTextarea = document.getElementById('feedback-textarea');
  const submitBtn = document.getElementById('btn-submit');
  const statusContainer = document.getElementById('feedback-status');

  if (feedbackForm && feedbackTextarea && submitBtn) {
    feedbackTextarea.addEventListener('input', () => {
      // Clear previous status messages when user starts typing again
      if (statusContainer) {
        statusContainer.innerHTML = '';
      }
    });

    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const message = feedbackTextarea.value.trim();
      if (!message) {
        if (statusContainer) {
          statusContainer.innerHTML = '<p class="feedback-error-msg">Something went wrong. Please try again.</p>';
        }
        return;
      }

      // Loading state matching production
      feedbackTextarea.disabled = true;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      if (statusContainer) {
        statusContainer.innerHTML = '';
      }

      // Simulate async network submission matching production
      setTimeout(() => {
        feedbackTextarea.disabled = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        feedbackTextarea.value = '';

        if (statusContainer) {
          statusContainer.innerHTML = '<p class="feedback-success-msg">Thank you for your feedback!</p>';
        }
      }, 500);
    });
  }
});
