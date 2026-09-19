import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EcosystemSection from './components/EcosystemSection';
import OpenResourcesSection from './components/OpenResourcesSection';
import OpenResourcesPage from './components/OpenResourcesPage';
import StudioPage from './components/StudioPage';
import CommunityPage from './components/CommunityPage';
import WebsitesPage from './components/WebsitesPage';
import PricingPage from './components/PricingPage';
import NotFoundPage from './components/NotFoundPage';
import BrandRevealLoader from './components/BrandRevealLoader';
import GlobalRosetteBackground from './components/GlobalRosetteBackground';
import StudioShowcaseSection from './components/StudioShowcaseSection';
import WebsitesOffering from './components/WebsitesOffering';
import CommunitySection from './components/CommunitySection';
import ClosingCtaSection from './components/ClosingCtaSection';
import Footer from './components/Footer';
import ActionSimulationModal from './components/ActionSimulationModal';
import './styles/main.css';
import './styles/lower-homepage.css';

export default function App() {
  // LIGHT MODE IS THE STRICT DEFAULT
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('openidea-theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [actionModalData, setActionModalData] = useState(null);
  const [showBrandLoader, setShowBrandLoader] = useState(true);

  // Client-side route state tracking
  const [currentPath, setCurrentPath] = useState(() => {
    try {
      return window.location.pathname + window.location.search;
    } catch {
      return '/';
    }
  });

  // Known valid application routes and mock prototype endpoints
  const VALID_ROUTES = useMemo(() => new Set([
    '/',
    '',
    '/openresources',
    '/studio',
    '/community',
    '/projects',
    '/websites',
    '/demo',
    '/pricing',
    '/form',
    '/about',
    '/features',
    '/feedback',
    '/auth',
    '/coming-soon',
    '/intern-fellowship',
    '/contribute',
    '/partnership',
    '/careers',
    '/problems-and-ideas',
    '/privacy',
    '/terms',
    '/cookies',
    '/support'
  ]), []);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('openidea-theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Sync with browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic client-side navigation
  const navigateTo = (destination) => {
    try {
      window.history.pushState({}, '', destination);
      setCurrentPath(destination);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
    }
  };

  // Route resolution
  const cleanPath = useMemo(() => {
    return currentPath.split('?')[0].split('#')[0];
  }, [currentPath]);

  const isHome = cleanPath === '' || cleanPath === '/';
  const isOpenResources = cleanPath === '/openresources';
  const isStudio = cleanPath === '/studio';
  const isCommunity = cleanPath === '/community' || cleanPath === '/projects';
  const isWebsites = cleanPath === '/websites' || cleanPath === '/form' || cleanPath === '/demo';
  const isPricing = cleanPath === '/pricing';
  const isKnownMockRoute = !isHome && !isOpenResources && !isStudio && !isCommunity && !isWebsites && !isPricing && VALID_ROUTES.has(cleanPath);
  const isNotFound = !isHome && !isOpenResources && !isStudio && !isCommunity && !isWebsites && !isPricing && !isKnownMockRoute;

  // Auto-open modal if someone lands on a known mock route like /pricing
  useEffect(() => {
    if (isKnownMockRoute) {
      setActionModalData({
        destination: cleanPath,
        label: cleanPath.slice(1).replace(/-/g, ' ').toUpperCase(),
        type: 'Prototype Route',
        note: `Navigated to prototype route: ${cleanPath}`
      });
    }
  }, [isKnownMockRoute, cleanPath]);

  // Extract query parameter if coming to /openresources?q=...
  const initialQuery = useMemo(() => {
    try {
      const qIndex = currentPath.indexOf('?');
      if (qIndex !== -1) {
        const params = new URLSearchParams(currentPath.slice(qIndex));
        return params.get('q') || '';
      }
    } catch {}
    return '';
  }, [currentPath]);

  // Extract description parameter if coming to /studio?description=...
  const initialDescription = useMemo(() => {
    try {
      const qIndex = currentPath.indexOf('?');
      if (qIndex !== -1) {
        const params = new URLSearchParams(currentPath.slice(qIndex));
        return params.get('description') || '';
      }
    } catch {}
    return '';
  }, [currentPath]);

  // Extract initial community tab if coming to /community?tab=... or /projects
  const initialCommunityTab = useMemo(() => {
    if (cleanPath === '/projects') return 'showcase';
    try {
      const qIndex = currentPath.indexOf('?');
      if (qIndex !== -1) {
        const params = new URLSearchParams(currentPath.slice(qIndex));
        return params.get('tab') || 'groups';
      }
    } catch {}
    return 'groups';
  }, [currentPath, cleanPath]);

  // Handle Prompt Submission (from Hero primary doorway)
  const handlePromptSubmit = ({ mode, query, attachedFiles }) => {
    let targetRoute = '';
    let actionLabel = '';

    if (mode === 'build') {
      targetRoute = query ? `/studio?description=${encodeURIComponent(query)}` : '/studio';
      navigateTo(targetRoute);
      return;
    } else if (mode === 'discover') {
      targetRoute = query ? `/openresources?q=${encodeURIComponent(query)}` : '/openresources';
      navigateTo(targetRoute);
      return;
    } else if (mode === 'projects') {
      targetRoute = query ? `/community?tab=showcase&q=${encodeURIComponent(query)}` : '/community?tab=showcase';
      navigateTo(targetRoute);
      return;
    } else if (mode === 'network') {
      targetRoute = query ? `/coming-soon?q=${encodeURIComponent(query)}` : '/coming-soon';
      actionLabel = 'Open Innovation Network';
    }

    // Trigger simulation modal for non-implemented mock destinations
    setActionModalData({
      destination: targetRoute,
      label: actionLabel,
      type: `Prompt Submission (Mode: ${mode.toUpperCase()})`,
      query: query || '(Blank Query)',
      mode: mode,
      attachedFiles: attachedFiles,
      note: `In production, this submission stores attached files in sessionStorage ('uploadedFileContext') and navigates to ${targetRoute}.`
    });
  };

  // General Navigation Interceptor
  const handleNavigateAction = (action) => {
    const dest = typeof action === 'string' ? action : action?.destination;
    if (dest) {
      if (
        dest.startsWith('/openresources') ||
        dest.startsWith('/studio') ||
        dest.startsWith('/community') ||
        dest.startsWith('/projects') ||
        dest.startsWith('/websites') ||
        dest.startsWith('/pricing') ||
        dest.startsWith('/form') ||
        dest.startsWith('/demo')
      ) {
        navigateTo(dest);
        return;
      }
      if (dest === '/' || dest === '/#') {
        navigateTo('/');
        return;
      }
      const targetClean = dest.split('?')[0].split('#')[0];
      if (!VALID_ROUTES.has(targetClean)) {
        navigateTo(dest);
        return;
      }
    }
    setActionModalData(action);
  };

  return (
    <div className="open-idea-app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 0. Persistent Global Sacred Rosette Ambient Background */}
      <GlobalRosetteBackground />

      {/* 0. Global Brand Reveal Loading Overlay */}
      {showBrandLoader && (
        <BrandRevealLoader onComplete={() => setShowBrandLoader(false)} />
      )}

      {/* 1. Restrained Editorial Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onNavigateAction={handleNavigateAction}
      />

      {/* 2. Main Content: Dedicated /openresources, Dedicated /studio, Dedicated /community, Custom 404, or Approved Frozen Homepage */}
      {isNotFound ? (
        <main style={{ flex: 1 }}>
          <NotFoundPage
            onNavigate={navigateTo}
            invalidPath={currentPath}
          />
        </main>
      ) : isOpenResources ? (
        <main style={{ flex: 1 }}>
          <OpenResourcesPage
            onNavigate={navigateTo}
            initialQuery={initialQuery}
          />
        </main>
      ) : isStudio ? (
        <main style={{ flex: 1 }}>
          <StudioPage
            onNavigate={navigateTo}
            initialDescription={initialDescription}
          />
        </main>
      ) : isCommunity ? (
        <main style={{ flex: 1 }}>
          <CommunityPage
            onNavigate={navigateTo}
            initialTab={initialCommunityTab}
          />
        </main>
      ) : isWebsites ? (
        <main style={{ flex: 1 }}>
          <WebsitesPage
            onNavigate={navigateTo}
          />
        </main>
      ) : isPricing ? (
        <main style={{ flex: 1 }}>
          <PricingPage
            onNavigate={navigateTo}
          />
        </main>
      ) : (
        <main style={{ flex: 1 }}>
          {/* Hero Section with Focused Primary Prompt Interaction */}
          <Hero
            onPromptSubmit={handlePromptSubmit}
          />

          {/* Section 2: Ecosystem Introduction (Sparse, Editorial Triptych) */}
          <EcosystemSection
            onNavigateAction={handleNavigateAction}
          />

          {/* Section 3: Open Resources (Structured Search & Discovery Index) */}
          <OpenResourcesSection
            onNavigateAction={handleNavigateAction}
          />

          {/* Section 4: Studio / Build Showcase (60/40 Asymmetric Product Preview) */}
          <StudioShowcaseSection
            onNavigateAction={handleNavigateAction}
          />

          {/* Section 5: Websites / Bespoke Services (Compact Editorial Band) */}
          <WebsitesOffering
            onNavigateAction={handleNavigateAction}
          />

          {/* Section 6: Community / Contribution (Quiet Typographic Pathways) */}
          <CommunitySection
            onNavigateAction={handleNavigateAction}
          />

          {/* Section 7: Closing CTA (Calm, Decisive Conclusion) */}
          <ClosingCtaSection
            onNavigateAction={handleNavigateAction}
          />
        </main>
      )}

      {/* 3. Restrained Editorial Footer */}
      <Footer
        onNavigateAction={handleNavigateAction}
      />

      {/* Interactive Verification Modal (For non-implemented prototype routes) */}
      <ActionSimulationModal
        actionData={actionModalData}
        onClose={() => setActionModalData(null)}
      />
    </div>
  );
}
