import React from 'react';
import OpenIdeaLogo from './OpenIdeaLogo';
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './BrandIcons';

export default function Footer({ onNavigateAction }) {
  const currentYear = new Date().getFullYear();

  const handleLink = (e, href, label, type = 'Footer Navigation') => {
    e.preventDefault();
    if (onNavigateAction) {
      onNavigateAction({
        destination: href,
        label,
        type,
        note: `Navigating to ${href}`
      });
    }
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { name: 'Discord', href: 'https://discord.gg/4weahHXQYY', icon: MessageSquare },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecosyz/', icon: LinkedinIcon },
    { name: 'X / Twitter', href: 'https://x.com/OpenIdeaOrg', icon: TwitterIcon },
    { name: 'Instagram', href: 'https://www.instagram.com/openidea.ai_platform/', icon: InstagramIcon },
    { name: 'GitHub', href: 'https://github.com/Sony17/Ecosyz', icon: GithubIcon },
    { name: 'Email', href: 'mailto:info@openidea.world', icon: Mail }
  ];

  const platformLinks = [
    { label: 'Platform Capabilities', href: '/features' },
    { label: 'AI Studio', href: '/studio' },
    { label: 'Open Resources', href: '/openresources' },
    { label: 'Community', href: '/community' },
    { label: 'Bespoke Websites', href: '/websites' },
    { label: 'Pricing & Plans', href: '/pricing' }
  ];

  const ecosystemLinks = [
    { label: 'About Open Idea', href: '/about' },
    { label: 'Contact & Inquiries', href: '/contact' },
    { label: 'Founder Contact', href: '/founder-contact' },
    { label: 'Problems & Ideas', href: '/problems-and-ideas' },
    { label: 'Fellowship & Residency', href: '/intern-fellowship' },
    { label: 'Open Source Contribution', href: '/contribute' },
    { label: 'Strategic Partnerships', href: '/partnership' },
    { label: 'Careers', href: '/careers' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Settings', href: '/cookies' },
    { label: 'Support Center', href: '/support' }
  ];

  return (
    <footer className="footer-section" role="contentinfo" aria-label="Site Footer">
      <div className="footer-container">
        
        {/* Main 4-Column Editorial Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand, Description, Social */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-lockup">
              <a
                href="/"
                onClick={(e) => handleLink(e, '/', 'Home', 'Brand Link')}
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                aria-label="Open Idea Homepage"
              >
                <OpenIdeaLogo size={38} id="footer-brand-logo-grad" />
              </a>
            </div>
            
            <p className="footer-brand-desc">
              An open platform to research problems, build software, and share knowledge.
            </p>

            <div className="footer-social-row" aria-label="Community & Social Channels">
              {socialLinks.map((s) => {
                const IconComp = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    aria-label={`Open Idea on ${s.name}`}
                    title={s.name}
                  >
                    <IconComp size={15} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Platform & Build */}
          <div className="footer-col">
            <div className="footer-col-title">Platform</div>
            <ul className="footer-links-list">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLink(e, item.href, item.label, 'Platform Route')}
                    className="footer-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ecosystem & Initiatives */}
          <div className="footer-col">
            <div className="footer-col-title">Ecosystem</div>
            <ul className="footer-links-list">
              {ecosystemLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLink(e, item.href, item.label, 'Ecosystem Route')}
                    className="footer-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Presence & Contact */}
          <div className="footer-col footer-col-contact">
            <div className="footer-col-title">Presence & Inquiries</div>
            
            <div className="footer-contact-details">
              <a href="mailto:info@openidea.world" className="footer-contact-item">
                <Mail size={14} className="footer-contact-icon" aria-hidden="true" />
                <span>info@openidea.world</span>
              </a>

              <a href="tel:+918130296940" className="footer-contact-item">
                <Phone size={14} className="footer-contact-icon" aria-hidden="true" />
                <span>+91 81302 96940</span>
              </a>

              <a href="tel:+911141193699" className="footer-contact-item">
                <Phone size={14} className="footer-contact-icon" aria-hidden="true" />
                <span>011 4119 3699</span>
              </a>

              <div className="footer-contact-item footer-address-item">
                <MapPin size={15} className="footer-contact-icon" aria-hidden="true" />
                <span>8125, 8th Floor, Gaur City Mall, Greater Noida West, UP 201318</span>
              </div>

              <div className="footer-feedback-box">
                <button
                  type="button"
                  onClick={(e) => handleLink(e, '/feedback', 'Feedback System', 'User Feedback')}
                  className="footer-feedback-btn"
                >
                  <span>Send Feedback</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal Links & Copyright */}
        <div className="footer-bottom-bar">
          <div className="footer-legal-links" aria-label="Legal and Policy Information">
            {legalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLink(e, item.href, item.label, 'Legal Document')}
                className="footer-legal-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-copyright">
            <span>© {currentYear} Open Idea. Built in India for global open innovation.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
