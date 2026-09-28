/**
 * Open Idea Production Feedback Replica - Client Logic
 * Pure Vanilla JavaScript replicating production interactions and simulation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const hamburgerBtn = document.getElementById('hamburger-btn') || document.getElementById('mobile-menu-toggle') || document.querySelector('.btn-hamburger');
  const mobileNavPanel = document.getElementById('mobile-nav') || document.getElementById('mobile-nav-panel') || document.querySelector('.mobile-nav-panel');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
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

  // Feedback Form Handler & Attachment Control
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackTextarea = document.getElementById('feedback-textarea');
  const submitBtn = document.getElementById('btn-submit');
  const statusContainer = document.getElementById('feedback-status');

  const attachBtn = document.getElementById('btn-attach');
  const fileInput = document.getElementById('feedback-file-input');
  const attachmentPreview = document.getElementById('feedback-attachment-preview');
  const filenameDisplay = document.getElementById('attachment-filename');
  const filesizeDisplay = document.getElementById('attachment-filesize');
  const removeAttachmentBtn = document.getElementById('btn-remove-attachment');

  // File Attachment Interactions
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function clearAttachment() {
    if (fileInput) fileInput.value = '';
    if (attachmentPreview) attachmentPreview.style.display = 'none';
    if (filenameDisplay) {
      filenameDisplay.textContent = '';
      filenameDisplay.removeAttribute('title');
    }
    if (filesizeDisplay) filesizeDisplay.textContent = '';
  }

  if (attachBtn && fileInput) {
    attachBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (filenameDisplay) {
          filenameDisplay.textContent = file.name;
          filenameDisplay.title = file.name;
        }
        if (filesizeDisplay) {
          filesizeDisplay.textContent = '(' + formatFileSize(file.size) + ')';
        }
        if (attachmentPreview) {
          attachmentPreview.style.display = 'flex';
        }
      } else {
        clearAttachment();
      }
    });
  }

  if (removeAttachmentBtn) {
    removeAttachmentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearAttachment();
    });
  }

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
      if (attachBtn) attachBtn.disabled = true;
      if (removeAttachmentBtn) removeAttachmentBtn.disabled = true;
      if (statusContainer) {
        statusContainer.innerHTML = '';
      }

      // Simulate async network submission matching production
      setTimeout(() => {
        feedbackTextarea.disabled = false;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        if (attachBtn) attachBtn.disabled = false;
        if (removeAttachmentBtn) removeAttachmentBtn.disabled = false;
        feedbackTextarea.value = '';
        clearAttachment();

        if (statusContainer) {
          statusContainer.innerHTML = '<p class="feedback-success-msg">Thank you for your feedback!</p>';
        }
      }, 500);
    });
  }
});
