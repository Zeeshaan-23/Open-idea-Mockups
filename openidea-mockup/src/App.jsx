import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EcosystemSection from './components/EcosystemSection';
import OpenResourcesSection from './components/OpenResourcesSection';
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

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('openidea-theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Handle Prompt Submission (from Hero primary doorway)
  const handlePromptSubmit = ({ mode, query, attachedFiles }) => {
    let targetRoute = '';
    let actionLabel = '';

    if (mode === 'build') {
      targetRoute = query ? `/studio?description=${encodeURIComponent(query)}` : '/studio?new=1';
      actionLabel = 'AI Studio Application Scaffolding';
    } else if (mode === 'discover') {
      targetRoute = query ? `/openresources?q=${encodeURIComponent(query)}` : '/openresources';
      actionLabel = 'Open Resources Search';
    } else if (mode === 'projects') {
      targetRoute = query ? `/projects?q=${encodeURIComponent(query)}` : '/projects';
      actionLabel = 'Community Projects Directory';
    } else if (mode === 'network') {
      targetRoute = query ? `/coming-soon?q=${encodeURIComponent(query)}` : '/coming-soon';
      actionLabel = 'Open Innovation Network';
    }

    // Trigger simulation modal showing technical parameters
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

  // General Navigation Interceptor for verification
  const handleNavigateAction = (action) => {
    setActionModalData(action);
  };

  return (
    <div className="open-idea-app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Restrained Editorial Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        onNavigateAction={handleNavigateAction}
      />

      {/* 2. Hero Section with Focused Primary Prompt Interaction */}
      <main style={{ flex: 1 }}>
        <Hero
          onPromptSubmit={handlePromptSubmit}
        />

        {/* 3. Section 2: Ecosystem Introduction (Sparse, Editorial Triptych) */}
        <EcosystemSection
          onNavigateAction={handleNavigateAction}
        />

        {/* 4. Section 3: Open Resources (Structured Search & Discovery Index) */}
        <OpenResourcesSection
          onNavigateAction={handleNavigateAction}
        />

        {/* 5. Section 4: Studio / Build Showcase (60/40 Asymmetric Product Preview) */}
        <StudioShowcaseSection
          onNavigateAction={handleNavigateAction}
        />

        {/* 6. Section 5: Websites / Bespoke Services (Compact Editorial Band) */}
        <WebsitesOffering
          onNavigateAction={handleNavigateAction}
        />

        {/* 7. Section 6: Community / Contribution (Quiet Typographic Pathways) */}
        <CommunitySection
          onNavigateAction={handleNavigateAction}
        />

        {/* 8. Section 7: Closing CTA (Calm, Decisive Conclusion) */}
        <ClosingCtaSection
          onNavigateAction={handleNavigateAction}
        />
      </main>

      {/* 9. Restrained Editorial Footer (Phase 3B) */}
      <Footer
        onNavigateAction={handleNavigateAction}
      />

      {/* Interactive Verification Modal (For checking routes, modes, queries) */}
      <ActionSimulationModal
        actionData={actionModalData}
        onClose={() => setActionModalData(null)}
      />
    </div>
  );
}
