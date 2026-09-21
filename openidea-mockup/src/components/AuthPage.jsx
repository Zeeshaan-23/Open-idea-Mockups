import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  X,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import OpenIdeaLogo from './OpenIdeaLogo';
import { GithubIcon, GoogleIcon } from './BrandIcons';
import '../styles/auth.css';

/**
 * Validate redirect parameter strictly against production rules:
 * - Must start with '/'
 * - Must not start with '//' (prevent protocol-relative open redirect)
 * - Must not contain '\' or '..' (prevent path manipulation & traversal)
 * - Must not use 'javascript:' or 'data:' protocols
 * Default fallback: '/studio'
 */
function validateRedirect(raw) {
  if (!raw || typeof raw !== 'string') return '/studio';
  const trimmed = raw.trim();
  if (
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('\\') ||
    trimmed.includes('..') ||
    trimmed.toLowerCase().startsWith('javascript:') ||
    trimmed.toLowerCase().startsWith('data:')
  ) {
    return '/studio';
  }
  return trimmed;
}

export default function AuthPage({
  onNavigate,
  isLoggedIn,
  setIsLoggedIn,
  currentPath = ''
}) {
  // Extract URL parameters
  const searchParams = useMemo(() => {
    try {
      const qIndex = currentPath.indexOf('?');
      if (qIndex !== -1) {
        return new URLSearchParams(currentPath.slice(qIndex));
      }
    } catch {}
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return new URLSearchParams();
    }
  }, [currentPath]);

  const rawRedirect = searchParams.get('redirect');
  const safeRedirect = useMemo(() => validateRedirect(rawRedirect), [rawRedirect]);
  const planParam = searchParams.get('plan');

  // Auth mode state: 'choice' (default when no mode param), 'signup', or 'signin'
  const [authMode, setAuthMode] = useState(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') return 'signup';
    if (modeParam === 'signin') return 'signin';
    return 'choice';
  });

  // Sync mode if route query parameter changes externally
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'signup') {
      setAuthMode('signup');
    } else if (modeParam === 'signin') {
      setAuthMode('signin');
    } else if (!modeParam) {
      setAuthMode('choice');
    }
  }, [currentPath, searchParams]);

  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [bannerError, setBannerError] = useState(null);
  const [bannerSuccess, setBannerSuccess] = useState(null);

  // Forgot password modal state
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(null);

  // Password requirements calculation (for Sign Up)
  const passwordCriteria = useMemo(() => {
    const pwd = formData.password;
    return {
      minLength: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd)
    };
  }, [formData.password]);

  // Handle OAuth callback errors on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const errorCode = params.get('error');
      const errorDesc = params.get('description');
      const errorMsg = params.get('message');

      if (errorCode) {
        let displayMessage = '';
        switch (errorCode) {
          case 'config_error':
            displayMessage = 'Authentication service is temporarily unavailable. Please try again later.';
            break;
          case 'code_exchange_failed':
            displayMessage = 'Unable to complete sign-in. Please try again.';
            break;
          case 'no_session':
            displayMessage = 'Session could not be established. Please try again.';
            break;
          case 'no_code_found':
            displayMessage = 'Authentication failed. Please try again.';
            break;
          case 'callback_error':
            displayMessage = 'Authentication callback failed. Please try again.';
            break;
          case 'access_denied':
            displayMessage = 'Access was denied. Please try again if you wish to sign in.';
            break;
          default:
            displayMessage = errorDesc || errorMsg || `Authentication error: ${errorCode}`;
            break;
        }

        setBannerError(displayMessage);

        // Clean error query parameters from browser history
        params.delete('error');
        params.delete('description');
        params.delete('message');
        const remainingQuery = params.toString();
        const cleanUrl = window.location.pathname + (remainingQuery ? `?${remainingQuery}` : '');
        window.history.replaceState({}, '', cleanUrl);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Switch mode in-place (clearing form and validation state)
  const handleSelectMode = (targetMode) => {
    setAuthMode(targetMode);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
    setFieldErrors({});
    setBannerError(null);
    setBannerSuccess(null);
    setShowPassword(false);
  };

  // Input change handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Client-side validation matching production Zod schemas
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation (both Sign In & Sign Up)
    if (!formData.email || !formData.email.trim()) {
      errors.email = 'Please enter a valid email address';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (authMode === 'signin') {
      // Sign In validation
      if (!formData.password) {
        errors.password = 'Password is required';
      }
    } else if (authMode === 'signup') {
      // Sign Up validation
      if (!formData.name || !formData.name.trim()) {
        errors.name = 'Name is required';
      }

      // Phone validation (optional, but if provided must be min 10 characters)
      if (formData.phone && formData.phone.trim().length > 0 && formData.phone.trim().length < 10) {
        errors.phone = 'Please enter a valid phone number';
      }

      // Password complexity
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long';
      } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(formData.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(formData.password)) {
        errors.password = 'Password must contain at least one number';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBannerError(null);
    setBannerSuccess(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      if (authMode === 'signin') {
        // ------------------------------------------------------------------
        // Sign In Flow: POST /api/auth/signin
        // ------------------------------------------------------------------
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          let errorMsg = 'Failed to sign in. Please try again.';
          const serverMsg = (data.error || data.message || '').toLowerCase();

          if (res.status === 401 || serverMsg.includes('invalid') || serverMsg.includes('credential')) {
            errorMsg = 'Invalid email or password. Please check your credentials and try again.';
          } else if (res.status === 429 || serverMsg.includes('too many') || serverMsg.includes('rate limit')) {
            errorMsg = 'Too many failed attempts. Please wait a few minutes before trying again.';
          } else if (serverMsg.includes('email not confirmed') || serverMsg.includes('unverified')) {
            errorMsg = 'Please check your inbox to confirm your email before signing in.';
          } else if (serverMsg.includes('user not found') || serverMsg.includes('no user')) {
            errorMsg = 'No account found with this email. Please sign up first.';
          } else if (data.error || data.message) {
            errorMsg = data.error || data.message;
          }

          setBannerError(errorMsg);
          return;
        }

        // Real Success state
        setBannerSuccess({
          title: 'Welcome back!',
          desc: 'You have been successfully signed in.'
        });

        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }

        setTimeout(() => {
          if (onNavigate) {
            onNavigate(safeRedirect);
          } else {
            window.location.href = safeRedirect;
          }
        }, 300);
      } else if (authMode === 'signup') {
        // ------------------------------------------------------------------
        // Sign Up Flow: POST /api/auth/signup
        // ------------------------------------------------------------------
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || undefined,
            password: formData.password
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          let errorMsg = 'Failed to create account. Please try again.';
          const serverMsg = (data.error || data.message || '').toLowerCase();

          if (res.status === 409 || serverMsg.includes('already exists') || serverMsg.includes('already registered')) {
            errorMsg = 'An account with this email already exists. Please sign in instead.';
          } else if (res.status === 429 || serverMsg.includes('too many') || serverMsg.includes('rate limit')) {
            errorMsg = 'Too many attempts. Please wait a few minutes before trying again.';
          } else if (data.error || data.message) {
            errorMsg = data.error || data.message;
          }

          setBannerError(errorMsg);
          return;
        }

        // Real Success state
        setBannerSuccess({
          title: 'Account created successfully!',
          desc: 'Welcome! Redirecting...'
        });

        if (setIsLoggedIn) {
          setIsLoggedIn(true);
        }

        setTimeout(() => {
          if (onNavigate) {
            onNavigate(safeRedirect);
          } else {
            window.location.href = safeRedirect;
          }
        }, 1000);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        setBannerError('Request timed out. Please check your connection and try again.');
      } else {
        const fallback = authMode === 'signup'
          ? 'Failed to create account. Please try again.'
          : 'Failed to sign in. Please try again.';
        setBannerError(err.message || fallback);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // OAuth provider action
  const handleOAuth = (provider) => {
    if (safeRedirect !== '/studio') {
      try {
        sessionStorage.setItem('auth_redirect_after_login', safeRedirect);
      } catch (e) {
        console.error(e);
      }
    }
    const oauthUrl = `/api/auth/oauth/${provider}?redirect=${encodeURIComponent(safeRedirect)}`;
    window.location.href = oauthUrl;
  };

  // Password reset request submission
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setResetError(null);
    setResetSuccess(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail || !resetEmail.trim() || !emailRegex.test(resetEmail.trim())) {
      setResetError('Please enter a valid email address');
      return;
    }

    setResetSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail.trim() })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Too many requests. Please wait a few minutes before trying again.');
        }
        throw new Error(data.error || data.message || 'Failed to send reset email. Please try again.');
      }

      setResetSuccess({
        title: 'Password reset email sent!',
        desc: 'Please check your email for instructions to reset your password.'
      });
      setResetEmail('');
      setTimeout(() => {
        setShowResetModal(false);
        setResetSuccess(null);
      }, 2500);
    } catch (err) {
      setResetError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* ================================================================
              CHOICE / ENTRY SCREEN (Default state when no ?mode= is specified)
              ================================================================ */}
          {authMode === 'choice' && (
            <div className="auth-choice-view">
              <div className="auth-header">
                <div
                  className="auth-brand-mark"
                  onClick={() => (onNavigate ? onNavigate('/') : (window.location.href = '/'))}
                  style={{ cursor: 'pointer' }}
                  title="Return to Open Idea"
                >
                  <OpenIdeaLogo size={38} />
                </div>

                <h1 className="auth-title">
                  Welcome to <span className="serif-accent">Open Idea</span>
                </h1>

                <p className="auth-subtitle">
                  Sign in to access your workspaces, projects, and studio tools, or create a new account to join the open innovation ecosystem.
                </p>

                {planParam && (
                  <div className="auth-plan-badge">
                    <Compass size={12} aria-hidden="true" />
                    <span>Selected Plan: {planParam.charAt(0).toUpperCase() + planParam.slice(1)}</span>
                  </div>
                )}
              </div>

              {bannerError && (
                <div className="auth-banner auth-banner-error" role="alert">
                  <AlertCircle size={16} className="auth-banner-icon" aria-hidden="true" />
                  <div className="auth-banner-body">{bannerError}</div>
                  <button
                    type="button"
                    onClick={() => setBannerError(null)}
                    className="auth-banner-close"
                    aria-label="Dismiss notice"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Two Primary Choices: Sign Up & Sign In */}
              <div className="auth-choice-actions" role="group" aria-label="Authentication options">
                <button
                  type="button"
                  onClick={() => handleSelectMode('signup')}
                  className="auth-choice-card auth-choice-card-primary"
                >
                  <div className="auth-choice-text">
                    <span className="auth-choice-heading">Sign Up</span>
                    <span className="auth-choice-desc">Create a new account to start building and researching</span>
                  </div>
                  <div className="auth-choice-icon-wrap">
                    <ArrowRight size={18} aria-hidden="true" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectMode('signin')}
                  className="auth-choice-card auth-choice-card-secondary"
                >
                  <div className="auth-choice-text">
                    <span className="auth-choice-heading">Sign In</span>
                    <span className="auth-choice-desc">Access your existing workspaces, datasets, and projects</span>
                  </div>
                  <div className="auth-choice-icon-wrap">
                    <ArrowRight size={18} aria-hidden="true" />
                  </div>
                </button>
              </div>

              <div className="auth-legal-notice">
                By continuing, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/terms')}
                  className="auth-legal-link"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/privacy')}
                  className="auth-legal-link"
                >
                  Privacy Policy
                </button>
                .
              </div>
            </div>
          )}

          {/* ================================================================
              FORM SCREEN (Sign In or Sign Up mode)
              ================================================================ */}
          {authMode !== 'choice' && (
            <div className="auth-form-view">
              <div className="auth-form-header-nav">
                <button
                  type="button"
                  onClick={() => handleSelectMode('choice')}
                  className="auth-back-choice-link"
                  aria-label="Back to all authentication options"
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  <span>All options</span>
                </button>
              </div>

              {/* Editorial Branding & Header */}
              <div className="auth-header">
                <div
                  className="auth-brand-mark"
                  onClick={() => (onNavigate ? onNavigate('/') : (window.location.href = '/'))}
                  style={{ cursor: 'pointer' }}
                  title="Return to Open Idea"
                >
                  <OpenIdeaLogo size={36} />
                </div>

                <h1 className="auth-title">
                  {authMode === 'signup' ? (
                    <>
                      Create your <span className="serif-accent">Open Idea</span> account
                    </>
                  ) : (
                    <>
                      Welcome back <span className="serif-accent">— Open Idea</span>
                    </>
                  )}
                </h1>

                <p className="auth-subtitle">
                  {authMode === 'signup'
                    ? 'Join thousands of researchers, engineers, and builders on Open Idea.'
                    : 'Sign in to access your workspaces, projects, and studio tools.'}
                </p>

                {planParam && (
                  <div className="auth-plan-badge">
                    <Compass size={12} aria-hidden="true" />
                    <span>Selected Plan: {planParam.charAt(0).toUpperCase() + planParam.slice(1)}</span>
                  </div>
                )}
              </div>

              {/* OAuth Authentication Surface (Google & GitHub) */}
              <div className="auth-oauth-group" role="group" aria-label="Social sign-in options">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  disabled={isSubmitting}
                  className="auth-oauth-btn"
                  aria-label="Continue with Google"
                >
                  <GoogleIcon size={18} />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth('github')}
                  disabled={isSubmitting}
                  className="auth-oauth-btn"
                  aria-label="Continue with GitHub"
                >
                  <GithubIcon size={18} />
                  <span>Continue with GitHub</span>
                </button>
              </div>

              <div className="auth-divider">
                <span>Or continue with email</span>
              </div>

              {/* Feedback Alerts */}
              {bannerError && (
                <div className="auth-banner auth-banner-error" role="alert">
                  <AlertCircle size={16} className="auth-banner-icon" aria-hidden="true" />
                  <div className="auth-banner-body">{bannerError}</div>
                  <button
                    type="button"
                    onClick={() => setBannerError(null)}
                    className="auth-banner-close"
                    aria-label="Dismiss error notice"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {bannerSuccess && (
                <div className="auth-banner auth-banner-success" role="status">
                  <CheckCircle2 size={16} className="auth-banner-icon" aria-hidden="true" />
                  <div className="auth-banner-body">
                    <div className="auth-banner-title">{bannerSuccess.title}</div>
                    <div>{bannerSuccess.desc}</div>
                  </div>
                </div>
              )}

              {/* Authentication Form */}
              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {/* Full Name (Sign Up Only) */}
                {authMode === 'signup' && (
                  <div className="auth-field-group">
                    <label className="auth-label" htmlFor="auth-name-input">
                      Full Name
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon">
                        <User size={16} aria-hidden="true" />
                      </span>
                      <input
                        id="auth-name-input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className={`auth-input ${fieldErrors.name ? 'has-error' : ''}`}
                        disabled={isSubmitting}
                        autoComplete="name"
                        required
                      />
                    </div>
                    {fieldErrors.name && (
                      <div className="auth-field-error" role="alert">
                        {fieldErrors.name}
                      </div>
                    )}
                  </div>
                )}

                {/* Email Field (Both Modes) */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="auth-email-input">
                    Email
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <Mail size={16} aria-hidden="true" />
                    </span>
                    <input
                      id="auth-email-input"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className={`auth-input ${fieldErrors.email ? 'has-error' : ''}`}
                      disabled={isSubmitting}
                      autoComplete="email"
                      required
                    />
                  </div>
                  {fieldErrors.email && (
                    <div className="auth-field-error" role="alert">
                      {fieldErrors.email}
                    </div>
                  )}
                </div>

                {/* Phone Number Field (Sign Up Only, Optional) */}
                {authMode === 'signup' && (
                  <div className="auth-field-group">
                    <label className="auth-label" htmlFor="auth-phone-input">
                      <span>Phone Number</span>
                      <span className="auth-label-optional">optional</span>
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon">
                        <Phone size={16} aria-hidden="true" />
                      </span>
                      <input
                        id="auth-phone-input"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number (optional)"
                        className={`auth-input ${fieldErrors.phone ? 'has-error' : ''}`}
                        disabled={isSubmitting}
                        autoComplete="tel"
                      />
                    </div>
                    {fieldErrors.phone && (
                      <div className="auth-field-error" role="alert">
                        {fieldErrors.phone}
                      </div>
                    )}
                  </div>
                )}

                {/* Password Field (Both Modes) */}
                <div className="auth-field-group">
                  <div className="auth-label">
                    <label htmlFor="auth-password-input">Password</label>
                    {authMode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowResetModal(true);
                          setResetError(null);
                          setResetSuccess(null);
                          setResetEmail(formData.email || '');
                        }}
                        className="auth-forgot-link-btn"
                      >
                        Forgot your password?
                      </button>
                    )}
                  </div>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <Lock size={16} aria-hidden="true" />
                    </span>
                    <input
                      id="auth-password-input"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder={authMode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                      className={`auth-input ${fieldErrors.password ? 'has-error' : ''}`}
                      disabled={isSubmitting}
                      autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="auth-toggle-visibility-btn"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <div className="auth-field-error" role="alert">
                      {fieldErrors.password}
                    </div>
                  )}

                  {/* Password Requirements Guidance (Sign Up Mode) */}
                  {authMode === 'signup' && (
                    <div className="auth-pwd-requirements" aria-label="Password criteria">
                      <div className={`auth-req-item ${passwordCriteria.minLength ? 'satisfied' : ''}`}>
                        {passwordCriteria.minLength ? (
                          <Check size={12} className="auth-req-icon" />
                        ) : (
                          <span className="auth-req-bullet">•</span>
                        )}
                        <span>8+ characters</span>
                      </div>
                      <div className={`auth-req-item ${passwordCriteria.uppercase ? 'satisfied' : ''}`}>
                        {passwordCriteria.uppercase ? (
                          <Check size={12} className="auth-req-icon" />
                        ) : (
                          <span className="auth-req-bullet">•</span>
                        )}
                        <span>1 uppercase letter</span>
                      </div>
                      <div className={`auth-req-item ${passwordCriteria.lowercase ? 'satisfied' : ''}`}>
                        {passwordCriteria.lowercase ? (
                          <Check size={12} className="auth-req-icon" />
                        ) : (
                          <span className="auth-req-bullet">•</span>
                        )}
                        <span>1 lowercase letter</span>
                      </div>
                      <div className={`auth-req-item ${passwordCriteria.number ? 'satisfied' : ''}`}>
                        {passwordCriteria.number ? (
                          <Check size={12} className="auth-req-icon" />
                        ) : (
                          <span className="auth-req-bullet">•</span>
                        )}
                        <span>1 number</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="auth-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="auth-spinner" aria-hidden="true" />
                      <span>{authMode === 'signup' ? 'Creating account...' : 'Signing in...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{authMode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              {/* In-Place Mode Switch (Sign In <-> Sign Up) */}
              <div className="auth-mode-switch-wrapper">
                {authMode === 'signup' ? (
                  <button
                    type="button"
                    onClick={() => handleSelectMode('signin')}
                    className="auth-mode-switch-btn"
                  >
                    Already have an account?
                    <span className="auth-switch-highlight">Sign in</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSelectMode('signup')}
                    className="auth-mode-switch-btn"
                  >
                    Don't have an account?
                    <span className="auth-switch-highlight">Sign up</span>
                  </button>
                )}
              </div>

              {/* Legal Notice */}
              <div className="auth-legal-notice">
                By continuing, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/terms')}
                  className="auth-legal-link"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('/privacy')}
                  className="auth-legal-link"
                >
                  Privacy Policy
                </button>
                .
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------
          Password Recovery Modal Overlay
          ------------------------------------------------------------------ */}
      {showResetModal && (
        <div
          className="auth-modal-overlay"
          onClick={() => setShowResetModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
        >
          <div
            className="auth-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="auth-modal-header">
              <div>
                <h2 id="reset-modal-title" className="auth-modal-title">
                  Reset Password
                </h2>
                <p className="auth-modal-desc">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="auth-modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {resetError && (
              <div className="auth-banner auth-banner-error" role="alert">
                <AlertCircle size={15} className="auth-banner-icon" aria-hidden="true" />
                <div className="auth-banner-body">{resetError}</div>
              </div>
            )}

            {resetSuccess && (
              <div className="auth-banner auth-banner-success" role="status">
                <CheckCircle2 size={15} className="auth-banner-icon" aria-hidden="true" />
                <div className="auth-banner-body">
                  <div className="auth-banner-title">{resetSuccess.title}</div>
                  <div>{resetSuccess.desc}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleResetSubmit} noValidate>
              <div className="auth-field-group">
                <label className="auth-label" htmlFor="reset-email-input">
                  Email
                </label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    <Mail size={16} aria-hidden="true" />
                  </span>
                  <input
                    id="reset-email-input"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="auth-input"
                    disabled={resetSubmitting}
                    autoComplete="email"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="auth-modal-actions">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="auth-modal-btn-cancel"
                  disabled={resetSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resetSubmitting}
                  className="auth-modal-btn-submit"
                >
                  {resetSubmitting ? (
                    <>
                      <span className="auth-spinner" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
