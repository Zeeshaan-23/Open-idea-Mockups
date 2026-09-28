/**
 * App Studio Interactive Logic (studio/script.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Hamburger Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // 2. Blueprint Starter Chips
  const promptInput = document.getElementById('studio-prompt-input');
  const starterChips = document.querySelectorAll('.starter-chip');
  const editorBody = document.getElementById('editor-code-body');
  const previewUrl = document.querySelector('.preview-url-text');

  const templatesData = {
    agrisense: {
      prompt: 'Build a decentralized IoT agricultural sensor telemetry dashboard for "AgriSense". Monitor soil moisture, canopy temperature, and LoRa mesh node status with automatic solenoid valve actuation.',
      url: 'https://studio.preview/agrisense-telemetry',
      fileName: 'AgrisenseTelemetry.jsx',
      code: [
        '<span class="line-num">1</span><span class="code-kw">import</span> { useState, useEffect } <span class="code-kw">from</span> <span class="code-str">\'react\'</span>;',
        '<span class="line-num">2</span><span class="code-kw">import</span> { TelemetryHeader, SensorGrid } <span class="code-kw">from</span> <span class="code-str">\'@ecosyz/agrisense-ui\'</span>;',
        '<span class="line-num">3</span>',
        '<span class="line-num">4</span><span class="code-comment">// Production scaffolding: Clean tokens & accessible semantics</span>',
        '<span class="line-num">5</span><span class="code-kw">export default function</span> <span class="code-fn">AgrisenseTelemetryApp</span>() {',
        '<span class="line-num">6</span>  <span class="code-kw">const</span> [activeZone, setActiveZone] = useState(<span class="code-str">\'all\'</span>);',
        '<span class="line-num">7</span>  <span class="code-kw">const</span> [valveOpen, setValveOpen] = useState(<span class="code-bool">false</span>);',
        '<span class="line-num">8</span>  <span class="code-kw">const</span> [moisture, setMoisture] = useState(42.5);',
        '<span class="line-num">9</span>',
        '<span class="line-num">10</span>  <span class="code-kw">return</span> (',
        '<span class="line-num">11</span>    &lt;<span class="code-tag">main</span> <span class="code-prop">className</span>=<span class="code-str">"agrisense-dashboard"</span>&gt;',
        '<span class="line-num">12</span>      &lt;<span class="code-tag">TelemetryHeader</span> <span class="code-prop">status</span>=<span class="code-str">"Nominal"</span> <span class="code-prop">nodeCount</span>={38} <span class="code-prop">meshProtocol</span>=<span class="code-str">"Sub-GHz LoRa"</span> /&gt;',
        '<span class="line-num">13</span>      &lt;<span class="code-tag">SensorGrid</span> <span class="code-prop">zone</span>={activeZone} <span class="code-prop">moisture</span>={moisture} <span class="code-prop">valveStatus</span>={valveOpen ? <span class="code-str">"OPEN"</span> : <span class="code-str">"STANDBY"</span>} /&gt;',
        '<span class="line-num">14</span>    &lt;/<span class="code-tag">main</span>&gt;',
        '<span class="line-num">15</span>  );',
        '<span class="line-num">16</span>}'
      ].join('\n')
    },
    saas: {
      prompt: 'Build a high-conversion SaaS project analytics dashboard for "TaskFlow" with sprint velocity, team workload heatmap, and billing usage metrics.',
      url: 'https://studio.preview/taskflow-saas',
      fileName: 'TaskFlowDashboard.jsx',
      code: [
        '<span class="line-num">1</span><span class="code-kw">import</span> { useState } <span class="code-kw">from</span> <span class="code-str">\'react\'</span>;',
        '<span class="line-num">2</span><span class="code-kw">import</span> { MetricCard, SprintBurndown } <span class="code-kw">from</span> <span class="code-str">\'@ecosyz/saas-blocks\'</span>;',
        '<span class="line-num">3</span>',
        '<span class="line-num">4</span><span class="code-kw">export default function</span> <span class="code-fn">TaskFlowApp</span>() {',
        '<span class="line-num">5</span>  <span class="code-kw">const</span> [sprint] = useState(<span class="code-str">\'Sprint 24\'</span>);',
        '<span class="line-num">6</span>  <span class="code-kw">return</span> (',
        '<span class="line-num">7</span>    &lt;<span class="code-tag">section</span> <span class="code-prop">className</span>=<span class="code-str">"saas-analytics-canvas"</span>&gt;',
        '<span class="line-num">8</span>      &lt;<span class="code-tag">h1</span>&gt;Velocity: 94.2% on Track&lt;/<span class="code-tag">h1</span>&gt;',
        '<span class="line-num">9</span>      &lt;<span class="code-tag">SprintBurndown</span> <span class="code-prop">current</span>={sprint} <span class="code-prop">pointsLeft</span>={14} /&gt;',
        '<span class="line-num">10</span>    &lt;/<span class="code-tag">section</span>&gt;',
        '<span class="line-num">11</span>  );',
        '<span class="line-num">12</span>}'
      ].join('\n')
    },
    search: {
      prompt: 'Build an AI academic research knowledge hub with arXiv paper vector indexing, semantic citation clustering, and PDF TL;DR extraction.',
      url: 'https://studio.preview/research-hub',
      fileName: 'ResearchKnowledgeHub.jsx',
      code: [
        '<span class="line-num">1</span><span class="code-kw">import</span> { VectorSearch, PaperCard } <span class="code-kw">from</span> <span class="code-str">\'@openidea/research-ui\'</span>;',
        '<span class="line-num">2</span>',
        '<span class="line-num">3</span><span class="code-kw">export default function</span> <span class="code-fn">ResearchHub</span>() {',
        '<span class="line-num">4</span>  <span class="code-kw">return</span> (',
        '<span class="line-num">5</span>    &lt;<span class="code-tag">main</span> <span class="code-prop">className</span>=<span class="code-str">"research-explorer"</span>&gt;',
        '<span class="line-num">6</span>      &lt;<span class="code-tag">VectorSearch</span> <span class="code-prop">index</span>=<span class="code-str">"open-commons-v4"</span> /&gt;',
        '<span class="line-num">7</span>    &lt;/<span class="code-tag">main</span>&gt;',
        '<span class="line-num">8</span>  );',
        '<span class="line-num">9</span>}'
      ].join('\n')
    },
    portfolio: {
      prompt: 'Build a modern dark-mode full-stack engineer portfolio for "Alex Chen" featuring interactive terminal, GitHub contribution graph, and tech stack tags.',
      url: 'https://studio.preview/alex-chen-portfolio',
      fileName: 'PortfolioApp.jsx',
      code: [
        '<span class="line-num">1</span><span class="code-kw">import</span> { HeroBio, ProjectShowcase } <span class="code-kw">from</span> <span class="code-str">\'@ecosyz/portfolio-ui\'</span>;',
        '<span class="line-num">2</span>',
        '<span class="line-num">3</span><span class="code-kw">export default function</span> <span class="code-fn">Portfolio</span>() {',
        '<span class="line-num">4</span>  <span class="code-kw">return</span> (',
        '<span class="line-num">5</span>    &lt;<span class="code-tag">div</span> <span class="code-prop">className</span>=<span class="code-str">"portfolio-root"</span>&gt;',
        '<span class="line-num">6</span>      &lt;<span class="code-tag">HeroBio</span> <span class="code-prop">name</span>=<span class="code-str">"Alex Chen"</span> <span class="code-prop">role</span>=<span class="code-str">"AI Systems Engineer"</span> /&gt;',
        '<span class="line-num">7</span>    &lt;/<span class="code-tag">div</span>&gt;',
        '<span class="line-num">8</span>  );',
        '<span class="line-num">9</span>}'
      ].join('\n')
    }
  };

  starterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      starterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const tmpl = chip.getAttribute('data-app-template');
      const data = templatesData[tmpl];
      if (data && promptInput) {
        promptInput.value = data.prompt;
        if (editorBody) editorBody.innerHTML = data.code;
        if (previewUrl) previewUrl.textContent = data.url;
        showToast(`Loaded ${chip.textContent.trim()} blueprint`);
      }
    });
  });

  // Prompt Form Submission
  const promptForm = document.getElementById('studio-prompt-form');
  if (promptForm) {
    promptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = promptInput.value.trim();
      if (!val) {
        promptInput.focus();
        return;
      }
      showToast('Generating application scaffolding with OpenIdea Coder...');
    });
  }

  // 3. Workspace View Mode Switching (Split / Code / Preview)
  const viewTabs = document.querySelectorAll('.view-tab-btn');
  const editorPane = document.getElementById('studio-editor-pane');
  const previewPane = document.getElementById('studio-preview-pane');

  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      viewTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const mode = tab.getAttribute('data-view-mode');
      if (mode === 'code') {
        editorPane.style.display = 'flex';
        editorPane.style.flex = '1';
        previewPane.style.display = 'none';
      } else if (mode === 'preview') {
        editorPane.style.display = 'none';
        previewPane.style.display = 'flex';
        previewPane.style.flex = '1';
      } else {
        editorPane.style.display = 'flex';
        editorPane.style.flex = '1';
        previewPane.style.display = 'flex';
        previewPane.style.flex = '1';
      }
    });
  });

  // 4. Viewport Size Controls (Desktop / Mobile Preview)
  const viewportBtns = document.querySelectorAll('.btn-viewport-size');
  const sandboxViewport = document.getElementById('sandbox-viewport');

  viewportBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewportBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const vp = btn.getAttribute('data-viewport');
      if (vp === 'mobile') {
        sandboxViewport.style.maxWidth = '390px';
        sandboxViewport.style.margin = '0 auto';
        sandboxViewport.style.boxShadow = '0 0 0 8px rgba(0, 0, 0, 0.4)';
        sandboxViewport.style.borderRadius = '1.25rem';
      } else {
        sandboxViewport.style.maxWidth = '100%';
        sandboxViewport.style.margin = '0';
        sandboxViewport.style.boxShadow = 'none';
        sandboxViewport.style.borderRadius = '0';
      }
    });
  });

  // 5. Interactive Demo App Controls (Sandbox)
  const zoneBtns = document.querySelectorAll('.demo-filter-btn');
  const moistureVal = document.getElementById('metric-moisture-val');
  const moistureBar = document.getElementById('metric-moisture-bar');
  const valveBtn = document.getElementById('btn-toggle-valve');
  const valveBadge = document.getElementById('valve-status-badge');
  const valveText = document.getElementById('valve-btn-text');
  let isValveOpen = false;

  const zoneData = {
    all: { moisture: '42.5', bar: '68%' },
    north: { moisture: '34.2', bar: '45%' },
    greenhouse: { moisture: '58.7', bar: '88%' },
    hydro: { moisture: '76.1', bar: '95%' }
  };

  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoneBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const zone = btn.getAttribute('data-zone');
      const data = zoneData[zone] || zoneData.all;
      if (moistureVal) moistureVal.innerHTML = `${data.moisture}<span class="metric-unit">%</span>`;
      if (moistureBar) moistureBar.style.width = data.bar;
    });
  });

  if (valveBtn) {
    valveBtn.addEventListener('click', () => {
      isValveOpen = !isValveOpen;
      valveBtn.classList.toggle('valve-open', isValveOpen);
      if (isValveOpen) {
        if (valveBadge) {
          valveBadge.textContent = 'ACTIVE';
          valveBadge.className = 'metric-badge badge-optimal';
        }
        if (valveText) valveText.textContent = 'Close Solenoid Valve';
        showToast('Actuating Sub-GHz irrigation solenoid: Valve OPEN');
      } else {
        if (valveBadge) {
          valveBadge.textContent = 'Standby';
          valveBadge.className = 'metric-badge';
        }
        if (valveText) valveText.textContent = 'Open Solenoid Valve';
        showToast('Irrigation solenoid closed: Standby state');
      }
    });
  }

  const anomalyBtn = document.getElementById('btn-simulate-anomaly');
  if (anomalyBtn) {
    anomalyBtn.addEventListener('click', () => {
      if (moistureVal) moistureVal.innerHTML = '88.4<span class="metric-unit">%</span>';
      if (moistureBar) moistureBar.style.width = '96%';
      showToast('Simulating high-volume precipitation event');
    });
  }

  const pollBtn = document.getElementById('btn-demo-refresh');
  if (pollBtn) {
    pollBtn.addEventListener('click', () => {
      showToast('Polling 38 LoRa transceivers... Telemetry fresh');
    });
  }

  // 6. Action Tools (Copy Code & Export)
  const copyBtn = document.getElementById('btn-copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeText = editorBody ? editorBody.innerText : '';
      navigator.clipboard.writeText(codeText).then(() => {
        showToast('React component copied to clipboard!');
      }).catch(() => {
        showToast('Code copied to clipboard');
      });
    });
  }

  const exportBtn = document.getElementById('btn-download-zip');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      showToast('Exporting repository ZIP: agrisense-telemetry-nextjs.zip');
    });
  }

  // Toast Helper
  const toast = document.getElementById('studio-toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
