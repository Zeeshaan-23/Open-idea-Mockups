/**
 * Open Idea Production Pricing Replica - Interactive Logic
 * Pure Vanilla JavaScript matching production interactions and simulations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentProvider = 'razorpay'; // 'razorpay' | 'stripe'
  let activePlan = null;

  // DOM Elements
  const btnRazorpay = document.getElementById('btn-provider-razorpay');
  const btnStripe = document.getElementById('btn-provider-stripe');
  const affiliateInput = document.getElementById('affiliate-code') || document.getElementById('affiliate-input');
  const affiliateMsg = document.getElementById('affiliate-incentive-msg');

  // Price elements
  const studentPriceVal = document.getElementById('price-student-val');
  const studentSecPrice = document.getElementById('student-secondary-price');
  const studentCta = document.getElementById('cta-student');

  const plusPriceVal = document.getElementById('price-plus-val');
  const plusSecPrice = document.getElementById('plus-secondary-price');
  const plusCta = document.getElementById('cta-plus');

  const businessPriceVal = document.getElementById('price-business-val');
  const businessSecPrice = document.getElementById('business-secondary-price');
  const businessCta = document.getElementById('cta-business');

  // Modal Elements
  const modal = document.getElementById('checkout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-plan-name');
  const summaryPlanTitle = document.getElementById('summary-plan-title');
  const summaryProvider = document.getElementById('summary-provider-title');
  const summaryReferralRow = document.getElementById('summary-referral-row');
  const summaryReferralVal = document.getElementById('summary-referral-val');
  const summaryAmount = document.getElementById('summary-amount-val');
  const modalConfirmBtn = document.getElementById('modal-confirm-pay-btn');
  const modalCheckoutBody = document.getElementById('modal-checkout-body');
  const modalSuccessView = document.getElementById('modal-success-view');
  const modalFinishBtn = document.getElementById('modal-finish-btn');

  // Mobile Navigation
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavPanel = document.getElementById('mobile-nav');

  // --------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
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
  }

  // --------------------------------------------------------------------------
  // 2. Payment Gateway Toggle (Razorpay vs Stripe)
  // --------------------------------------------------------------------------
  function setProvider(provider) {
    currentProvider = provider;

    if (provider === 'razorpay') {
      btnRazorpay.classList.add('active');
      btnStripe.classList.remove('active');

      // Student Card
      studentPriceVal.textContent = '₹200';
      studentSecPrice.textContent = '$2.50/month';
      studentCta.textContent = 'Subscribe for ₹200 ($2.50)/month';

      // Plus Card
      plusPriceVal.textContent = '₹999';
      plusSecPrice.textContent = '$12/month';
      plusCta.textContent = 'Subscribe for ₹999 ($12)/month';

      // Business Card
      businessPriceVal.textContent = '₹25,000';
      businessSecPrice.textContent = '$300 one-time';
      businessCta.textContent = 'Get Business Plan';
    } else {
      btnStripe.classList.add('active');
      btnRazorpay.classList.remove('active');

      // Student Card
      studentPriceVal.textContent = '$2.50';
      studentSecPrice.textContent = '₹200/month';
      studentCta.textContent = 'Subscribe for $2.50/month';

      // Plus Card
      plusPriceVal.textContent = '$12';
      plusSecPrice.textContent = '₹999/month';
      plusCta.textContent = 'Subscribe for $12/month';

      // Business Card
      businessPriceVal.textContent = '$300';
      businessSecPrice.textContent = '₹25,000 one-time';
      businessCta.textContent = 'Get Business Plan';
    }
  }

  if (btnRazorpay && btnStripe) {
    btnRazorpay.addEventListener('click', () => setProvider('razorpay'));
    btnStripe.addEventListener('click', () => setProvider('stripe'));
  }

  // --------------------------------------------------------------------------
  // 3. Referral / Affiliate Code Handler
  // --------------------------------------------------------------------------
  // Check URL param ?ref=... or sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');
  if (refParam) {
    const code = refParam.trim().toUpperCase();
    sessionStorage.setItem('ecosyz_affiliate_code', code);
  }

  const savedAffiliate = sessionStorage.getItem('ecosyz_affiliate_code');
  if (savedAffiliate && affiliateInput) {
    affiliateInput.value = savedAffiliate;
    if (affiliateMsg) {
      affiliateMsg.style.display = 'block';
      affiliateMsg.textContent = 'Your partner will earn 5% when you subscribe';
    }
  }

  if (affiliateInput) {
    affiliateInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toUpperCase();
      if (val.length > 0) {
        sessionStorage.setItem('ecosyz_affiliate_code', val);
        if (affiliateMsg) {
          affiliateMsg.style.display = 'block';
          affiliateMsg.textContent = 'Your partner will earn 5% when you subscribe';
        }
      } else {
        sessionStorage.removeItem('ecosyz_affiliate_code');
        if (affiliateMsg) {
          affiliateMsg.style.display = 'none';
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Interactive Info Tooltips (Click / Touch)
  // --------------------------------------------------------------------------
  document.querySelectorAll('.btn-tooltip-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wrap = btn.closest('.tooltip-wrap');
      // Close other open tooltips
      document.querySelectorAll('.tooltip-wrap.show').forEach(other => {
        if (other !== wrap) other.classList.remove('show');
      });
      wrap.classList.toggle('show');
    });
  });

  // Close tooltips when clicking anywhere else
  document.addEventListener('click', () => {
    document.querySelectorAll('.tooltip-wrap.show').forEach(wrap => {
      wrap.classList.remove('show');
    });
  });

  // --------------------------------------------------------------------------
  // 5. Simulated Checkout Modal
  // --------------------------------------------------------------------------
  function openCheckoutModal(planKey, title, inrPrice, usdPrice) {
    activePlan = { planKey, title, inrPrice, usdPrice };

    const isRazorpay = currentProvider === 'razorpay';
    const displayPrice = isRazorpay ? inrPrice : usdPrice;
    const providerName = isRazorpay ? 'Razorpay (UPI / Cards)' : 'Stripe (International Credit Cards)';

    modalTitle.textContent = `Subscribe to ${title}`;
    summaryPlanTitle.textContent = `${title} Plan`;
    summaryProvider.textContent = providerName;
    summaryAmount.textContent = displayPrice;

    // Check referral
    const refCode = sessionStorage.getItem('ecosyz_affiliate_code');
    if (refCode) {
      summaryReferralRow.style.display = 'flex';
      summaryReferralVal.textContent = `${refCode} (5% partner incentive)`;
    } else {
      summaryReferralRow.style.display = 'none';
    }

    // Reset views
    modalCheckoutBody.style.display = 'flex';
    modalSuccessView.style.display = 'none';
    modalConfirmBtn.disabled = false;
    modalConfirmBtn.textContent = 'Confirm & Proceed to Payment';

    // Show modal
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach plan clicks
  if (studentCta) {
    studentCta.addEventListener('click', () => {
      openCheckoutModal('student', 'Student', '₹200/month', '$2.50/month');
    });
  }

  if (plusCta) {
    plusCta.addEventListener('click', () => {
      openCheckoutModal('plus', 'Plus', '₹999/month', '$12/month');
    });
  }

  if (businessCta) {
    businessCta.addEventListener('click', () => {
      openCheckoutModal('business', 'Business Website', '₹25,000 (one-time)', '$300 (one-time)');
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCheckoutModal);
  }

  if (modalFinishBtn) {
    modalFinishBtn.addEventListener('click', closeCheckoutModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCheckoutModal();
      }
    });
  }

  // Simulate Payment Confirmation
  if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
      modalConfirmBtn.disabled = true;
      modalConfirmBtn.textContent = 'Processing Sandbox Payment...';

      setTimeout(() => {
        modalCheckoutBody.style.display = 'none';
        modalSuccessView.style.display = 'block';
      }, 700);
    });
  }

  // Keyboard Escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeCheckoutModal();
    }
  });
});
