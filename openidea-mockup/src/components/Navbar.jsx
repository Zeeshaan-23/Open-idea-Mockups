import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import OpenIdeaLogo from './OpenIdeaLogo';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';

export default function Navbar({
  theme,
  setTheme,
  isLoggedIn,
  setIsLoggedIn,
  onNavigateAction
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // Radial pulse theme toggle spanning the entire viewport
  const handleToggleTheme = (e) => {
    if (isTransitioningRef.current) return;
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Fallback if View Transitions API is not supported or reduced motion preferred
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme);
      return;
    }

    isTransitioningRef.current = true;

    // Origin coordinates from the trigger button
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Radius needed to reach the farthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-transitioning');

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
        document.documentElement.setAttribute('data-theme', nextTheme);
      });
    });

    transition.ready
      .then(() => {
        // Luminous pulse wave ring at the leading edge of the expanding circle
        const wave = document.createElement('div');
        wave.className = 'theme-pulse-wave';
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        wave.style.setProperty('--pulse-max-size', `${endRadius * 2}px`);
        document.body.appendChild(wave);
        setTimeout(() => wave.remove(), 650);

        const animation = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 550,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );

        animation.finished.finally(() => {
          document.documentElement.classList.remove('theme-transitioning');
          isTransitioningRef.current = false;
        });
      })
      .catch(() => {
        document.documentElement.classList.remove('theme-transitioning');
        isTransitioningRef.current = false;
      });
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Open Resources', href: '/openresources' },
    { label: 'Studio', href: '/studio' },
    { label: 'Websites', href: '/websites' },
    { label: 'Community', href: '/community' },
    { label: 'Pricing', href: '/pricing' }
  ];

  const handleLinkClick = (e, href, label) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateAction({
      destination: href,
      label: label,
      type: 'Navigation Link',
      note: `Navigates to route: ${href}`
    });
  };

  return (
    <header className="navbar-header" role="banner">
      <div className="container navbar-container">
        {/* Left: Official Brand Vector Lockup */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigateAction) {
              onNavigateAction({
                destination: '/',
                label: 'Home',
                type: 'Navigation Link'
              });
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Open Idea Homepage"
          className="navbar-brand-link"
        >
          <OpenIdeaLogo size={30} id="navbar-brand-logo-grad" />
        </a>

        {/* Center: Restrained Editorial Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="desktop-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.label)}
                  className="nav-editorial-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Theme Toggle & Sign In */}
        <div className="navbar-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="theme-toggle-btn"
          >
            {theme === 'light' ? (
              <Moon size={18} strokeWidth={1.9} />
            ) : (
              <Sun size={18} strokeWidth={1.9} />
            )}
          </button>

          {/* Sign In / User Auth */}
          {isLoggedIn ? (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
                aria-label="User account menu"
                className="user-profile-trigger"
              >
                <span className="user-avatar-initials">
                  JD
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  John Doe
                </span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-panel" role="menu">
                  <div style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      John Doe
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      john@example.com
                    </div>
                  </div>
                  <div style={{ padding: '0.375rem' }}>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsLoggedIn(false);
                      }}
                      className="user-dropdown-item"
                    >
                      <LogOut size={15} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsLoggedIn(true);
                onNavigateAction({
                  destination: '/studio?login=1',
                  label: 'User Authentication',
                  type: 'Sign In Action',
                  note: 'Authenticated mock session: John Doe'
                });
              }}
              className="navbar-signin-btn"
            >
              Sign in
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
          <nav aria-label="Mobile Navigation Menu">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.label)}
                    className="mobile-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>Appearance</span>
                <button
                  type="button"
                  onClick={handleToggleTheme}
                  className="theme-toggle-btn"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </div>

              {!isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', minHeight: '44px' }}
                >
                  Sign in
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
