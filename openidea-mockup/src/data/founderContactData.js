/**
 * Open Idea — Founder Contact Data Model
 *
 * Source of truth: verified production content from https://openidea.world/founder-contact
 * and production client chunk app/founder-contact/page-83ad779c54a471aa.js.
 *
 * Exact verified recipient: Sony Yadav (Founder, Open Idea)
 * Verified direct phone: +91 81302 96940
 * Verified direct email: sohni2012@gmail.com
 * Verified company email: info@openidea.world
 * Verified LinkedIn: https://www.linkedin.com/in/sonyy
 * Verified contact card asset: /founder/contact-card.png (Sony-Yadav-Open-Idea-Contact-Card.png)
 *
 * NOTE: No fabricated credentials, phone numbers, or synthetic .vcf files.
 */

export const FOUNDER_COORDINATES = {
  name: 'Sony Yadav',
  title: 'Founder',
  organization: 'Open Idea',
  roleLabel: 'Founder, Open Idea',
  linkedinUrl: 'https://www.linkedin.com/in/sonyy',
  linkedinDisplay: 'linkedin.com/in/sonyy',
  phoneDisplay: '+91 81302 96940',
  phoneRaw: '8130296940',
  phoneHref: 'tel:+918130296940',
  email: 'sohni2012@gmail.com',
  companyEmail: 'info@openidea.world',
  companyWebsite: 'https://openidea.world',
  companyLinkedin: 'https://www.linkedin.com/company/110214398',
  cardImage: '/founder/contact-card.png',
  cardDownloadFilename: 'Sony-Yadav-Open-Idea-Contact-Card.png',
  logoImage: '/founder/open-idea-logo.png'
};

export const WHATSAPP_PREFILLED_MESSAGE = [
  FOUNDER_COORDINATES.linkedinUrl,
  '\nSony Yadav — Founder, Open Idea',
  `Phone: ${FOUNDER_COORDINATES.phoneRaw}`,
  `Email: ${FOUNDER_COORDINATES.email}`,
  `Company: ${FOUNDER_COORDINATES.companyEmail}`,
  'Company: https://openidea.world\nCompany LinkedIn: https://www.linkedin.com/company/110214398'
].join('\n');

export const WHATSAPP_DIRECT_URL = `https://wa.me/91${FOUNDER_COORDINATES.phoneRaw}?text=${encodeURIComponent(
  WHATSAPP_PREFILLED_MESSAGE
)}`;

export const EDITORIAL_PREMISE = {
  headline: 'Founder Contact',
  headlineAccent: 'Direct Executive Line',
  lead: 'Direct correspondence with Sony Yadav, Founder of Open Idea. Reserved for strategic alliances, press inquiries, and high-impact research initiatives.',
  subtext: 'Scan the QR code to message directly on WhatsApp, download the verified contact card, or connect via LinkedIn and direct email.'
};

export const IA_DISTINCTION = {
  founderPath: {
    title: 'Founder Direct Desk',
    kicker: 'Route: /founder-contact',
    purpose: 'Personal & Executive Correspondence',
    bestFor: [
      'Strategic partnerships & high-impact ecosystem alliances',
      'Press, media interviews, and public discourse',
      'Direct research residencies and leadership inquiries',
      'Confidential matters requiring executive attention'
    ]
  },
  institutionalPath: {
    title: 'Institutional Desk',
    kicker: 'Route: /contact',
    purpose: 'Commercial, Engineering & Operations',
    bestFor: [
      'Custom website scoping, engineering briefs & trade archetypes',
      'Enterprise compute infrastructure, volume quotas & billing',
      'General platform feedback, account support & inquiries',
      'Formal vendor procurement and institutional legal agreements'
    ],
    actionLabel: 'Go to Institutional Contact',
    actionHref: '/contact'
  }
};
