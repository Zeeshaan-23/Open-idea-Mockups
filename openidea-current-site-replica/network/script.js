/**
 * Open Idea Open Network Interactive Controller
 * Handles interactive topology graph, node inspector, simulated protocol stream, and local drawer navigation.
 */

(function () {
  'use strict';

  // 1. Toast Notification Helper
  function showToast(message, type = 'info') {
    let toast = document.querySelector('.network-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'network-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `network-toast toast-${type} toast-show`;
    setTimeout(() => {
      toast.classList.remove('toast-show');
    }, 3000);
  }

  // 2. Interactive SVG Node Selection & Inspector
  const nodeGroups = document.querySelectorAll('.svg-node-group');
  const inspectorName = document.getElementById('inspector-name');
  const inspectorType = document.getElementById('inspector-type');
  const inspectorLatency = document.getElementById('inspector-latency');
  const inspectorPkts = document.getElementById('inspector-pkts');
  const inspectorRole = document.getElementById('inspector-role');
  const inspectorPubkey = document.getElementById('inspector-pubkey');
  const inspectorBadge = document.getElementById('inspector-badge');
  const btnPingNode = document.getElementById('btn-ping-node');

  let activeNode = document.getElementById('node-core');

  function selectNode(group) {
    if (!group) return;
    activeNode = group;
    nodeGroups.forEach(g => g.classList.remove('node-selected'));
    group.classList.add('node-selected');

    const name = group.getAttribute('data-name') || 'Mesh Relay';
    const status = group.getAttribute('data-status') || 'Active';
    const latency = group.getAttribute('data-latency') || '20ms';
    const pkts = group.getAttribute('data-pkts') || '100,000';
    const pubkey = group.getAttribute('data-pubkey') || '0x...';
    const role = group.getAttribute('data-role') || 'node';

    if (inspectorName) inspectorName.textContent = name;
    if (inspectorType) inspectorType.textContent = role.toUpperCase() + ' Node';
    if (inspectorLatency) inspectorLatency.textContent = latency;
    if (inspectorPkts) inspectorPkts.textContent = pkts;
    if (inspectorRole) inspectorRole.textContent = status;
    if (inspectorPubkey) inspectorPubkey.textContent = pubkey;
    if (inspectorBadge) inspectorBadge.textContent = 'Active';
  }

  nodeGroups.forEach(group => {
    group.addEventListener('click', () => {
      selectNode(group);
    });
  });

  // 3. Ping Node Telemetry Button
  if (btnPingNode) {
    btnPingNode.addEventListener('click', () => {
      btnPingNode.textContent = 'Pinging...';
      btnPingNode.style.opacity = '0.7';

      setTimeout(() => {
        const simulatedPing = Math.floor(Math.random() * 15 + 10) + 'ms';
        if (inspectorLatency) inspectorLatency.textContent = simulatedPing;
        btnPingNode.textContent = 'Ping Node Telemetry';
        btnPingNode.style.opacity = '1';
        showToast(`Ping response from ${inspectorName?.textContent || 'node'}: ${simulatedPing}`, 'success');
      }, 450);
    });
  }

  // 4. Filter Chips (Core, Gateway, Compute)
  const filterChips = document.querySelectorAll('.filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      nodeGroups.forEach(group => {
        const role = group.getAttribute('data-role');
        if (filter === 'all' || role === filter) {
          group.style.opacity = '1';
          group.style.pointerEvents = 'auto';
        } else {
          group.style.opacity = '0.25';
          group.style.pointerEvents = 'none';
        }
      });
    });
  });

  // 5. Copy CLI Command
  const copyBtn = document.getElementById('btn-copy-cli');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const cmd = 'curl -sSL https://openidea.world/install-node.sh | bash';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(cmd).then(() => {
          copyBtn.textContent = 'Copied! ✓';
          showToast('Relay install command copied to clipboard!', 'success');
          setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2500);
        });
      } else {
        copyBtn.textContent = 'Copied! ✓';
        showToast('Relay install command copied!', 'success');
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2500);
      }
    });
  }

  // 6. Live Protocol Event Stream Simulation
  const streamContainer = document.getElementById('stream-logs');
  const sampleEvents = [
    { badge: 'PACKET', class: 'badge-packet', text: 'Sub-GHz telemetry batch (12 sensors) verified by Data Mesh' },
    { badge: 'CONSENSUS', class: 'badge-consensus', text: 'State root updated: Merkle root 0x5a2d...91fc' },
    { badge: 'NODE', class: 'badge-node', text: 'Relay peer handshake accepted: 178.62.204.11 (EU-West)' },
    { badge: 'PACKET', class: 'badge-packet', text: 'WASM task #892 execution finalized (Compute Node Alpha: 14ms)' },
    { badge: 'CONSENSUS', class: 'badge-consensus', text: 'Block proposal validated across 12 mesh quorum relays' }
  ];

  if (streamContainer) {
    setInterval(() => {
      const evt = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML = `
        <span class="log-time">${timeStr}</span>
        <span class="log-badge ${evt.class}">${evt.badge}</span>
        <span class="log-text">${evt.text}</span>
      `;

      streamContainer.prepend(entry);
      if (streamContainer.children.length > 8) {
        streamContainer.removeChild(streamContainer.lastElementChild);
      }
    }, 4500);
  }

  // 7. Mobile Drawer (Strictly Local)
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !expanded);
      mobileNav.classList.toggle('is-open', !expanded);
    });

    mobileNav.querySelectorAll('.mobile-nav-link, .mobile-btn-full').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      });
    });
  }
})();
