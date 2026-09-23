/* ==========================================================================
   OPEN IDEA PRODUCTION WEBSITE REPLICA - VANILLA JAVASCRIPT
   Reproduces all production interactions:
   - Typewriter placeholder animation (8 production phrases)
   - Auto-resizing textarea
   - Keyboard navigation (Tab for newline, Enter to submit)
   - Mode pill switching (Build App, Discover, Projects, Network)
   - 4 Template shortcuts with exact production prompt text injection
   - Mobile hamburger menu toggle
   - Floating chat drawer with categories and messaging simulation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Typewriter Placeholder Animation
  const promptTextarea = document.getElementById('prompt-textarea');
  const placeholderPhrases = [
    "Explore open source resources",
    "Search millions of research papers",
    "Find connections among resources",
    "Build app and innovate",
    "Discover open datasets",
    "Collaborate with innovators",
    "Explore cutting-edge projects",
    "Find solutions to complex problems"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterTimeout = null;
  let isUserTyping = false;

  function runTypewriter() {
    if (isUserTyping || (promptTextarea && promptTextarea.value.length > 0)) {
      return;
    }

    const currentPhrase = placeholderPhrases[phraseIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        charIndex--;
        if (promptTextarea) {
          promptTextarea.setAttribute('placeholder', currentPhrase.substring(0, charIndex));
        }
        typewriterTimeout = setTimeout(runTypewriter, 40);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % placeholderPhrases.length;
        typewriterTimeout = setTimeout(runTypewriter, 200);
      }
    } else {
      if (charIndex < currentPhrase.length) {
        charIndex++;
        if (promptTextarea) {
          promptTextarea.setAttribute('placeholder', currentPhrase.substring(0, charIndex));
        }
        typewriterTimeout = setTimeout(runTypewriter, 80);
      } else {
        typewriterTimeout = setTimeout(() => {
          isDeleting = true;
          runTypewriter();
        }, 2000);
      }
    }
  }

  if (promptTextarea) {
    runTypewriter();

    // Auto-resizing textarea
    function autoResize() {
      promptTextarea.style.height = 'auto';
      promptTextarea.style.height = promptTextarea.scrollHeight + 'px';
    }

    promptTextarea.addEventListener('input', () => {
      isUserTyping = promptTextarea.value.length > 0;
      autoResize();
    });

    promptTextarea.addEventListener('focus', () => {
      isUserTyping = true;
    });

    promptTextarea.addEventListener('blur', () => {
      if (!promptTextarea.value.length) {
        isUserTyping = false;
        runTypewriter();
      }
    });

    // Keyboard handlers: Tab for newline, Enter to submit
    promptTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = promptTextarea.selectionStart;
        const end = promptTextarea.selectionEnd;
        promptTextarea.value = promptTextarea.value.substring(0, start) + '\n' + promptTextarea.value.substring(end);
        promptTextarea.selectionStart = promptTextarea.selectionEnd = start + 1;
        autoResize();
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitPrompt();
      }
    });
  }

  // 3. Mode Action Pills (Build App, Discover, Projects, Network)
  let currentMode = 'build';
  const modePills = document.querySelectorAll('.mode-pill');

  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const mode = pill.getAttribute('data-mode');
      if (!mode) return;
      currentMode = mode;

      modePills.forEach(p => {
        const m = p.getAttribute('data-mode');
        p.className = 'mode-pill ' + (m === currentMode ? 'active' : `inactive-${m}`);
      });
    });
  });

  // 4. Template Shortcuts
  const templatePrompts = {
    saas: `Build a SaaS landing page for "TaskFlow" — a project management tool for engineering teams.\n\nSections: sticky nav with "TaskFlow" logo + Get Started CTA, hero with gradient text headline "Ship 10x faster with AI-powered project management", 3-stat bar (10K+ teams, 99.9% uptime, 50ms response), 6-feature grid with icons (Sprint Planning, Code Reviews, CI/CD Integration, Team Analytics, Slack Integration, API Access), pricing table with 3 tiers (Free $0/mo, Pro $29/mo, Enterprise custom), 3 testimonials from engineering leaders, dark CTA section "Ready to transform your workflow?", footer with 4 columns.\n\nStyle: Modern minimal. Clean whitespace, gray-900 buttons, blue-600 accent sparingly. Professional and trustworthy. Hover transitions on all cards.`,

    portfolio: `Build a developer portfolio for "Alex Chen" — a full-stack engineer specializing in AI/ML products.\n\nSections: dark sticky nav with name + Resume/Contact links, hero with large gradient text "I build AI products that scale" + "Full-Stack Engineer · San Francisco" subtitle, featured projects grid (4 projects: AI Chat Platform, ML Pipeline Dashboard, Real-time Analytics Engine, Open Source CLI Tool — each with tech tags, description, and link buttons), skills section (React, TypeScript, Python, AWS, etc. as styled badges), about section with professional bio, dark CTA "Let's build something together" with email link, minimal dark footer.\n\nStyle: Dark elegance theme. bg-gray-950 entire page, emerald-400 accent glows, cards with border-gray-800 hover:border-emerald-500/30. Sophisticated, developer-focused.`,

    ecommerce: `Build an e-commerce storefront for "Elevate" — a premium minimalist clothing brand.\n\nSections: clean nav with "ELEVATE" logo + Shop/Collections/About links + cart icon, hero with full-width image placeholder and "Designed for the Modern Minimalist" headline, featured collection (4 product cards with image placeholder, name, price, "Add to Cart" button with hover effect), "Why Elevate" section with 3 value props (Sustainable Materials, Timeless Design, Free Returns), newsletter signup with email input, customer reviews (3 cards), footer with shop links, social icons, and newsletter.\n\nStyle: Modern minimal with bold typography. Lots of whitespace, text-gray-900 dominant, clean product cards with subtle hover shadows. No bright colors — let the products speak.`,

    agency: `Build a website for "Pixel & Code" — a digital product agency that builds SaaS apps.\n\nSections: sticky nav with gradient logo text + Work/Services/About/Contact links, hero with bold headline "We turn ideas into products people love" + violet-to-indigo gradient accent text + "See our work" and "Start a project" dual CTAs, client logos bar ("Trusted by" with 6 placeholder logo boxes), 3 case study cards (each with project image placeholder, client name, result metric like "+340% conversion"), services grid (Product Strategy, UI/UX Design, Full-Stack Development, Growth & Analytics — with icons), team section with 4 member cards (avatar placeholder, name, role), process timeline (Discovery → Design → Develop → Launch), dark CTA section, gradient footer.\n\nStyle: Bold vibrant. violet-600 indigo-600 gradients, energetic hover animations, shadow-violet-500/25 on buttons, rounded-2xl cards with shadow-lg. Stripe/Notion quality.`
  };

  const templatePills = document.querySelectorAll('.template-pill');
  templatePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const templateKey = pill.getAttribute('data-template');
      if (templateKey && templatePrompts[templateKey] && promptTextarea) {
        promptTextarea.value = templatePrompts[templateKey];
        isUserTyping = true;
        promptTextarea.style.height = 'auto';
        promptTextarea.style.height = promptTextarea.scrollHeight + 'px';
        promptTextarea.focus();
      }
    });
  });

  // 5. Submit Action
  function submitPrompt() {
    const text = promptTextarea ? promptTextarea.value.trim() : '';
    let target = '/studio';
    if (currentMode === 'discover') target = '/openresources';
    else if (currentMode === 'projects') target = '/projects';
    else if (currentMode === 'network') target = '/coming-soon';

    if (text) {
      alert(`[Open Idea ${currentMode.toUpperCase()}]\n\nSubmitting query to ${target}:\n"${text.substring(0, 100)}${text.length > 100 ? '...' : ''}"`);
    } else {
      alert(`[Open Idea ${currentMode.toUpperCase()}]\n\nNavigating to ${target}`);
    }
  }

  const promptForm = document.getElementById('prompt-form');
  if (promptForm) {
    promptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitPrompt();
    });
  }

  // 6. Action Button (Plus / File Upload)
  const fileInput = document.getElementById('file-upload-input');
  const actionBtn = document.getElementById('prompt-action-btn');
  if (actionBtn && fileInput) {
    actionBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        alert(`Attached file: ${fileInput.files[0].name}`);
      }
    });
  }

  // 7. Voice Input Button
  const voiceBtn = document.getElementById('prompt-voice-btn');
  if (voiceBtn) {
    let isListening = false;
    voiceBtn.addEventListener('click', () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in this browser environment.');
        return;
      }

      if (!isListening) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.interimResults = true;

          recognition.onstart = () => {
            isListening = true;
            voiceBtn.style.color = '#34d399';
            voiceBtn.style.boxShadow = '0 0 10px rgba(52, 211, 153, 0.5)';
          };

          recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
              .map(r => r[0].transcript)
              .join('');
            if (promptTextarea) {
              promptTextarea.value = transcript;
              promptTextarea.style.height = 'auto';
              promptTextarea.style.height = promptTextarea.scrollHeight + 'px';
            }
          };

          recognition.onend = () => {
            isListening = false;
            voiceBtn.style.color = '';
            voiceBtn.style.boxShadow = '';
          };

          recognition.onerror = () => {
            isListening = false;
            voiceBtn.style.color = '';
            voiceBtn.style.boxShadow = '';
          };

          recognition.start();
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  // 8. Floating Chat Drawer Interaction
  const chatToggleBtn = document.getElementById('floating-chat-btn');
  const chatDrawer = document.getElementById('chat-drawer');
  const chatCloseBtn = document.getElementById('close-chat-btn');
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-message-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatCategoryBtns = document.querySelectorAll('.chat-category-btn');

  if (chatToggleBtn && chatDrawer) {
    chatToggleBtn.addEventListener('click', () => {
      chatDrawer.classList.toggle('open');
      if (chatDrawer.classList.contains('open') && chatInput) {
        chatInput.focus();
      }
    });

    if (chatCloseBtn) {
      chatCloseBtn.addEventListener('click', () => {
        chatDrawer.classList.remove('open');
      });
    }

    // Category Buttons
    chatCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chatCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        const botReplies = {
          general: "Hello! How can we help you with Open Idea today?",
          bug: "Please describe the bug you encountered, including browser and steps to reproduce.",
          feature: "We'd love to hear your idea! What feature would make Open Idea better for you?"
        };

        if (chatMessages) {
          const msg = document.createElement('div');
          msg.className = 'chat-bubble bot';
          msg.textContent = botReplies[cat] || botReplies.general;
          chatMessages.appendChild(msg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    });

    // Send Message
    if (chatForm && chatInput && chatMessages) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // User bubble
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-bubble user';
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Broadcast to other viewport
        broadcastSync({ type: 'SYNC_CHAT_MESSAGE', text });

        // Bot response simulation
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'chat-bubble bot';
          botMsg.textContent = "Thank you for reaching out! Please leave your email and phone number for our team to follow up.";
          chatMessages.appendChild(botMsg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 600);
      });
    }
  }

  // 9. Ecosystem Discovery Videos Autoplay & Theme Sync
  const discoveryVideos = document.querySelectorAll('.discovery-video');
  function playVisibleDiscoveryVideos() {
    discoveryVideos.forEach(video => {
      video.muted = true;
      if (video.offsetParent !== null) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    });
  }

  // Start on load
  playVisibleDiscoveryVideos();

  // Watch for theme toggles to resume playback of visible video
  const themeObserver = new MutationObserver(() => {
    playVisibleDiscoveryVideos();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class']
  });
});

