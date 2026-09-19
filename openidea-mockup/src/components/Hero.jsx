import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Paperclip, X, FileText, ArrowRight } from 'lucide-react';
import { OpenIdeaFlowerSymbol } from './OpenIdeaLogo';

export default function Hero({ onPromptSubmit }) {
  // Mode State: 'build' | 'discover' | 'projects' | 'network'
  const [activeMode, setActiveMode] = useState('build');
  const [promptText, setPromptText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isPromptFocused, setIsPromptFocused] = useState(false);

  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const heroSectionRef = useRef(null);

  // Mode Selector sliding indicator state & refs
  const modeRowRef = useRef(null);
  const tabRefs = useRef({});
  const [sliderStyle, setSliderStyle] = useState({ left: 0, top: 0, width: 0, height: 0, ready: false });

  // Update mode selector sliding indicator
  useEffect(() => {
    const updateSlider = () => {
      const currentTab = tabRefs.current[activeMode];
      if (currentTab && modeRowRef.current) {
        setSliderStyle({
          left: currentTab.offsetLeft,
          top: currentTab.offsetTop,
          width: currentTab.offsetWidth,
          height: currentTab.offsetHeight,
          ready: true
        });
      }
    };

    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeMode]);



  // Dynamic placeholders clearly indicating intent
  const placeholders = {
    build: 'Describe an app, dashboard, or tool to build...',
    discover: 'Search open datasets, research papers, or toolkits...',
    projects: 'Search community projects, experiments, or tools...',
    network: 'Explore open contributor networks and collaboration groups...'
  };

  // Dynamic submit button labels communicating the exact destination
  const submitLabels = {
    build: 'Build in Studio',
    discover: 'Explore Resources',
    projects: 'Search Projects',
    network: 'Connect'
  };

  // Lightweight starter suggestions (populate prompt on click)
  const suggestions = [
    { label: 'Dashboard', prompt: 'Build an interactive analytics dashboard for monitoring web performance and API metrics.' },
    { label: 'Portfolio', prompt: 'Build a minimalist developer portfolio showcasing open source repositories and case studies.' },
    { label: 'Directory', prompt: 'Build a curated directory of open source AI research datasets and developer tools.' },
    { label: 'API tool', prompt: 'Build a lightweight API tester tool with request inspector, response viewer, and cURL export.' }
  ];

  // Speech Recognition (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        if (transcript) {
          setPromptText((prev) => (prev ? `${prev.trim()} ${transcript}` : transcript));
        }
      };
      recognition.onerror = (e) => {
        console.warn('Speech recognition notice:', e.error);
        setIsListening(false);
      };
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Speech recognition not available:', err);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // cleanup
        }
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Speech recognition failed to start:', e);
      }
    }
  };

  // File Upload Handler (Stores in sessionStorage for production parity)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newFiles = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type || 'document'
    }));

    const updated = [...attachedFiles, ...newFiles];
    setAttachedFiles(updated);

    try {
      sessionStorage.setItem('uploadedFileContext', JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (idx) => {
    const updated = attachedFiles.filter((_, i) => i !== idx);
    setAttachedFiles(updated);
    try {
      sessionStorage.setItem('uploadedFileContext', JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  // Form Submit
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    onPromptSubmit({
      mode: activeMode,
      query: promptText.trim(),
      attachedFiles: attachedFiles
    });
  };

  // Handle Keyboard Submit (Enter without Shift)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Apply Suggestion
  const handleSelectSuggestion = (suggestionPrompt) => {
    setPromptText(suggestionPrompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <section ref={heroSectionRef} className="hero-editorial-section" aria-labelledby="hero-main-headline">
      {/* Enlarged Fixed Background Sacred Rosette Semicircle Dome */}
      <div
        className="page-background-rosette-dome"
        aria-hidden="true"
      >
        <div className="bg-rosette-turn-wrapper">
          <OpenIdeaFlowerSymbol
            size="100%"
            id="bg-rosette-grad"
            viewBox="4 4 92 92"
            circleStroke={1.0}
            petalStroke={0.8}
            className="bg-rosette-svg"
          />
        </div>
      </div>

      <div className="container hero-container">
        {/* Headline: Start with an idea. Build something real. */}
        <h1 id="hero-main-headline" className="hero-headline">
          <span className="hero-headline-primary">Start with an idea.</span>{' '}
          <span className="hero-headline-secondary">
            Build <span className="hero-editorial-accent">something real.</span>
          </span>
        </h1>

        {/* 3. Concise Plain-Language Supporting Explanation */}
        <p className="hero-subtitle">
          Explore ideas, build useful software, discover resources, and connect with what others are making.
        </p>

        {/* 4. Refined Prompt Surface (Single Visual Center) */}
        <div className={`prompt-surface-card ${isPromptFocused ? 'is-focused' : ''}`}>
          <form onSubmit={handleSubmit} className="prompt-form" role="search" aria-label="Open Idea Creation and Search Console">
            
            {/* Subordinated Intent / Mode Selector */}
            <div ref={modeRowRef} className="prompt-mode-row" role="tablist" aria-label="Select Mode">
              {/* Fluid Sliding Active Indicator */}
              <span
                className="prompt-mode-slider"
                style={{
                  transform: `translate3d(${sliderStyle.left}px, ${sliderStyle.top}px, 0)`,
                  width: `${sliderStyle.width}px`,
                  height: `${sliderStyle.height}px`,
                  opacity: sliderStyle.ready ? 1 : 0
                }}
                aria-hidden="true"
              />

              {[
                { id: 'build', label: 'Build App' },
                { id: 'discover', label: 'Discover' },
                { id: 'projects', label: 'Projects' },
                { id: 'network', label: 'Network' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  ref={(el) => { tabRefs.current[mode.id] = el; }}
                  type="button"
                  role="tab"
                  id={`mode-tab-${mode.id}`}
                  aria-selected={activeMode === mode.id}
                  aria-controls={`prompt-panel-${mode.id}`}
                  onClick={() => {
                    setActiveMode(mode.id);
                    if (textareaRef.current) textareaRef.current.focus();
                  }}
                  className={`prompt-mode-pill ${activeMode === mode.id ? 'active' : ''}`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Clean, Tactile Textarea */}
            <div className="prompt-textarea-wrapper" id={`prompt-panel-${activeMode}`}>
              <textarea
                ref={textareaRef}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsPromptFocused(true)}
                onBlur={() => setIsPromptFocused(false)}
                placeholder={placeholders[activeMode]}
                rows={3}
                className="prompt-textarea"
                aria-label={placeholders[activeMode]}
              />
            </div>

            {/* Attached File Chips */}
            {attachedFiles.length > 0 && (
              <div className="prompt-attached-files" aria-label="Attached files">
                {attachedFiles.map((file, idx) => (
                  <span key={idx} className="prompt-file-chip">
                    <FileText size={13} strokeWidth={1.8} aria-hidden="true" />
                    <span className="chip-name">{file.name}</span>
                    <span className="chip-size">{file.size}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="chip-remove-btn"
                      aria-label={`Remove attached file ${file.name}`}
                      title={`Remove attached file ${file.name}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Utility Bar: Attachments, Voice Dictation, Submit */}
            <div className="prompt-utility-bar">
              <div className="prompt-utility-left">
                {/* File Attachment Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="prompt-icon-btn"
                  title="Attach reference files (.pdf, .txt, .csv, .json, images)"
                  aria-label="Attach reference file"
                >
                  <Paperclip size={17} strokeWidth={1.9} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.txt,.csv,.md,.json,.png,.jpg,.jpeg,.webp,.gif"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  aria-hidden="true"
                />

                {/* Voice Dictation Button */}
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className={`prompt-icon-btn ${isListening ? 'listening' : ''}`}
                    title={isListening ? 'Stop listening' : 'Dictate with voice'}
                    aria-label={isListening ? 'Stop voice dictation' : 'Start voice dictation'}
                  >
                    {isListening ? <MicOff size={17} color="#DC2626" /> : <Mic size={17} strokeWidth={1.9} />}
                  </button>
                )}

                {isListening && (
                  <span className="speech-status-indicator" aria-live="polite">
                    <span className="pulse-dot"></span> Listening...
                  </span>
                )}
              </div>

              {/* Dynamic Destination Submit Button */}
              <button
                type="submit"
                className="prompt-submit-btn"
                aria-label={`${submitLabels[activeMode]} and proceed`}
              >
                <span>{submitLabels[activeMode]}</span>
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        {/* 5. Lightweight Starting Points (Secondary Suggestions) */}
        <div className="hero-suggestions-row" aria-label="Starter Suggestions">
          <span className="suggestions-label">Try starting with</span>
          <div className="suggestions-chips-group">
            {suggestions.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleSelectSuggestion(item.prompt)}
                className="suggestion-chip"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
