/**
 * Open Idea Production Authentication Replica - Interactive Logic
 * Pure Vanilla JavaScript matching production validation, OAuth, modals, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let isSignUp = false;
  let isSubmitting = false;

  // URL Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  const redirectParam = urlParams.get('redirect');

  // DOM Elements - Titles & Forms
  const authTitle = document.getElementById('auth-title');
  const authSubtitle = document.getElementById('auth-subtitle');
  const planBanner = document.getElementById('auth-plan-banner');
  const planText = document.getElementById('auth-plan-text');

  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');
  const switchModeBtn = document.getElementById('btn-switch-mode');

  // Inputs - Sign In
  const signinEmail = document.getElementById('signin-email');
  const signinPassword = document.getElementById('signin-password');
  const signinEmailError = document.getElementById('signin-email-error');
  const signinPasswordError = document.getElementById('signin-password-error');
  const signinSubmitBtn = document.getElementById('signin-submit-btn');

  // Inputs - Sign Up
  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPhone = document.getElementById('signup-phone');
  const signupPassword = document.getElementById('signup-password');
  const signupNameError = document.getElementById('signup-name-error');
  const signupEmailError = document.getElementById('signup-email-error');
  const signupPhoneError = document.getElementById('signup-phone-error');
  const signupPasswordError = document.getElementById('signup-password-error');
  const signupSubmitBtn = document.getElementById('signup-submit-btn');

  // Password Toggles
  const toggleSigninPwBtn = document.getElementById('btn-toggle-signin-pw');
  const toggleSignupPwBtn = document.getElementById('btn-toggle-signup-pw');

  // OAuth Buttons
  const githubBtn = document.getElementById('btn-oauth-github');
  const googleBtn = document.getElementById('btn-oauth-google');

  // Reset Password Modal Elements
  const forgotPwBtn = document.getElementById('btn-open-forgot-pw');
  const resetModal = document.getElementById('reset-modal');
  const cancelResetBtn = document.getElementById('btn-cancel-reset');
  const resetForm = document.getElementById('reset-form');
  const forgotEmail = document.getElementById('forgot-email');
  const forgotEmailError = document.getElementById('forgot-email-error');
  const sendResetBtn = document.getElementById('btn-send-reset');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');

  // Mobile Navigation
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  // --------------------------------------------------------------------------
  // 1. Mobile Navigation
  // --------------------------------------------------------------------------
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Contextual Plan Parameter Handling
  // --------------------------------------------------------------------------
  if (planParam) {
    // If coming with a specific plan (e.g., /auth?plan=free or ?plan=plus),
    // default to Sign Up mode as users want to register for that tier
    setMode(true);
    if (planBanner && planText) {
      planBanner.style.display = 'inline-flex';
      const formattedPlan = planParam.charAt(0).toUpperCase() + planParam.slice(1);
      planText.textContent = `Signing up for the ${formattedPlan} Plan`;
    }
  }

  // --------------------------------------------------------------------------
  // 3. Mode Switching (Sign In <-> Sign Up)
  // --------------------------------------------------------------------------
  function setMode(signUp) {
    isSignUp = signUp;
    clearErrors();

    if (isSignUp) {
      authTitle.textContent = 'Join the Revolution';
      authSubtitle.textContent = 'Create your account to start innovating';
      signinForm.style.display = 'none';
      signupForm.style.display = 'flex';
      switchModeBtn.textContent = 'Already have an account? Sign in';
    } else {
      authTitle.textContent = 'Welcome Back';
      authSubtitle.textContent = 'Sign in to continue your journey';
      signupForm.style.display = 'none';
      signinForm.style.display = 'flex';
      switchModeBtn.textContent = "Don't have an account? Sign up";
    }
  }

  if (switchModeBtn) {
    switchModeBtn.addEventListener('click', () => {
      setMode(!isSignUp);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Password Visibility Toggles
  // --------------------------------------------------------------------------
  function setupPasswordToggle(button, input) {
    if (!button || !input) return;
    let isVisible = false;

    button.addEventListener('click', () => {
      isVisible = !isVisible;
      input.type = isVisible ? 'text' : 'password';

      button.innerHTML = isVisible
        ? `<svg class="pw-eye-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
           </svg>`
        : `<svg class="pw-eye-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
           </svg>`;
    });
  }

  setupPasswordToggle(toggleSigninPwBtn, signinPassword);
  setupPasswordToggle(toggleSignupPwBtn, signupPassword);

  // --------------------------------------------------------------------------
  // 5. Toast Notifications (Simulating Sonner in production)
  // --------------------------------------------------------------------------
  function showToast(type, title, desc, duration = 4000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast-item ${type}`;
    toast.innerHTML = `
      <div style="flex: 1;">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px) scale(0.95)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 6. Validation Helpers
  // --------------------------------------------------------------------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function clearErrors() {
    [signinEmail, signinPassword, signupName, signupEmail, signupPhone, signupPassword, forgotEmail].forEach(input => {
      if (input) input.classList.remove('has-error');
    });
    [signinEmailError, signinPasswordError, signupNameError, signupEmailError, signupPhoneError, signupPasswordError, forgotEmailError].forEach(msg => {
      if (msg) {
        msg.style.display = 'none';
        msg.textContent = '';
      }
    });
  }

  function setFieldError(input, errorEl, message) {
    if (input) input.classList.add('has-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearFieldError(input, errorEl) {
    if (input) input.classList.remove('has-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  // Real-time error clearing on input
  [signinEmail, signinPassword].forEach(input => {
    if (input) input.addEventListener('input', clearErrors);
  });
  [signupName, signupEmail, signupPhone, signupPassword].forEach(input => {
    if (input) input.addEventListener('input', clearErrors);
  });
  if (forgotEmail) forgotEmail.addEventListener('input', clearErrors);

  // --------------------------------------------------------------------------
  // 7. Form Submission: Sign In
  // --------------------------------------------------------------------------
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      clearErrors();

      const emailVal = signinEmail.value.trim();
      const pwVal = signinPassword.value;
      let hasError = false;

      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(signinEmail, signinEmailError, 'Please enter a valid email address');
        hasError = true;
      }

      if (!pwVal) {
        setFieldError(signinPassword, signinPasswordError, 'Password is required');
        hasError = true;
      }

      if (hasError) return;

      // Simulate Authentication
      isSubmitting = true;
      signinSubmitBtn.disabled = true;
      signinSubmitBtn.textContent = 'Signing in...';

      setTimeout(() => {
        isSubmitting = false;
        signinSubmitBtn.disabled = false;
        signinSubmitBtn.textContent = 'Sign In';

        showToast('success', 'Welcome back!', 'You have been successfully signed in.', 3500);

        // Simulated redirect back to homepage
        setTimeout(() => {
          const target = redirectParam ? decodeURIComponent(redirectParam) : '../site.html';
          window.location.href = target.startsWith('/') ? '../site.html' : target;
        }, 1200);
      }, 600);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Form Submission: Sign Up
  // --------------------------------------------------------------------------
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      clearErrors();

      const nameVal = signupName.value.trim();
      const emailVal = signupEmail.value.trim();
      const phoneVal = signupPhone.value.trim();
      const pwVal = signupPassword.value;
      let hasError = false;

      if (!nameVal) {
        setFieldError(signupName, signupNameError, 'Name is required');
        hasError = true;
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(signupEmail, signupEmailError, 'Please enter a valid email address');
        hasError = true;
      }

      if (phoneVal && phoneVal.replace(/\D/g, '').length < 10) {
        setFieldError(signupPhone, signupPhoneError, 'Please enter a valid phone number');
        hasError = true;
      }

      // Password rules: min 8 chars, 1 uppercase, 1 lowercase, 1 number
      if (pwVal.length < 8) {
        setFieldError(signupPassword, signupPasswordError, 'Password must be at least 8 characters');
        hasError = true;
      } else if (!/[A-Z]/.test(pwVal)) {
        setFieldError(signupPassword, signupPasswordError, 'Password must contain at least one uppercase letter');
        hasError = true;
      } else if (!/[a-z]/.test(pwVal)) {
        setFieldError(signupPassword, signupPasswordError, 'Password must contain at least one lowercase letter');
        hasError = true;
      } else if (!/[0-9]/.test(pwVal)) {
        setFieldError(signupPassword, signupPasswordError, 'Password must contain at least one number');
        hasError = true;
      }

      if (hasError) return;

      // Simulate Registration
      isSubmitting = true;
      signupSubmitBtn.disabled = true;
      signupSubmitBtn.textContent = 'Creating account...';

      setTimeout(() => {
        isSubmitting = false;
        signupSubmitBtn.disabled = false;
        signupSubmitBtn.textContent = 'Create Account';

        showToast('success', 'Account created successfully!', 'Welcome! Redirecting...', 3500);

        setTimeout(() => {
          const target = redirectParam ? decodeURIComponent(redirectParam) : '../site.html';
          window.location.href = target.startsWith('/') ? '../site.html' : target;
        }, 1200);
      }, 600);
    });
  }

  // --------------------------------------------------------------------------
  // 9. OAuth Simulation (GitHub & Google)
  // --------------------------------------------------------------------------
  function simulateOAuth(providerName) {
    showToast('success', `Authenticating with ${providerName}`, 'Sandbox connection established. Redirecting...', 3000);
    setTimeout(() => {
      const target = redirectParam ? decodeURIComponent(redirectParam) : '../site.html';
      window.location.href = target.startsWith('/') ? '../site.html' : target;
    }, 1000);
  }

  if (githubBtn) {
    githubBtn.addEventListener('click', () => simulateOAuth('GitHub'));
  }
  if (googleBtn) {
    googleBtn.addEventListener('click', () => simulateOAuth('Google'));
  }

  // --------------------------------------------------------------------------
  // 10. Forgot Password Modal
  // --------------------------------------------------------------------------
  function openResetModal() {
    if (resetModal) {
      resetModal.classList.add('open');
      resetModal.setAttribute('aria-hidden', 'false');
      clearErrors();
      if (forgotEmail) forgotEmail.focus();
    }
  }

  function closeResetModal() {
    if (resetModal) {
      resetModal.classList.remove('open');
      resetModal.setAttribute('aria-hidden', 'true');
      clearErrors();
    }
  }

  if (forgotPwBtn) {
    forgotPwBtn.addEventListener('click', openResetModal);
  }
  if (cancelResetBtn) {
    cancelResetBtn.addEventListener('click', closeResetModal);
  }
  if (resetModal) {
    resetModal.addEventListener('click', (e) => {
      if (e.target === resetModal) closeResetModal();
    });
  }

  if (resetForm) {
    resetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const emailVal = forgotEmail.value.trim();
      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(forgotEmail, forgotEmailError, 'Please enter a valid email address');
        return;
      }

      sendResetBtn.disabled = true;
      sendResetBtn.textContent = 'Sending...';

      setTimeout(() => {
        sendResetBtn.disabled = false;
        sendResetBtn.textContent = 'Send Reset Link';
        closeResetModal();
        if (forgotEmail) forgotEmail.value = '';

        showToast(
          'success',
          'Password reset email sent!',
          'Please check your email for instructions to reset your password.',
          5000
        );
      }, 600);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resetModal && resetModal.classList.contains('open')) {
      closeResetModal();
    }
  });
});
