'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import '../../styles/components/Footer.css';

const Footer: React.FC = () => {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/landing' || pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/landing#${id}`);
      }
    }
  };

  return (
    <footer className="site-footer">
      <div className="container mx-auto">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand-col">
             <Link href="/" className="footer-brand-link animate-fade-in-up">
              <img src="/logo.png" alt="Ayubowan Connect" className="footer-logo-image" />
              <div className="footer-brand-text">
                <span className="brand-ayubowan">Ayubowan</span>
                <span className="brand-connect">Connect</span>
              </div>
            </Link>
             <p className="footer-copyright">
              © 2025 Ayubowan Connect. All rights reserved.
            </p>
            <div className="footer-socials">
                <a href="#"><Instagram size={18} /></a>
                <a href="#"><Twitter size={18} /></a>
                <a href="#"><Linkedin size={18} /></a>
                <a href="#"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => e.preventDefault()}>About us</a></li>
              <li><Link href="/experiences">Experiences</Link></li>
              <li><Link href="/landing#offer" onClick={(e) => handleScroll(e, 'offer')}>Events</Link></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Support</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Vendors</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Community</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Partners</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Support</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Help</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Terms</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Cookies</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Compliance</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter">
            <h3 className="footer-heading">Subscribe</h3>
            <p className="newsletter-text">
              Get the latest Sri Lankan cultural experiences delivered to your inbox.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Email address here" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Submit
              </button>
            </form>
            <p className="newsletter-disclaimer">
              By subscribing, you agree to our privacy policy and cultural sharing guidelines.
            </p>
          </div>

        </div>
        <div className="footer-bottom">
             <a href="#" onClick={(e) => e.preventDefault()}>Privacy policy</a>
             <a href="#" onClick={(e) => e.preventDefault()}>Terms of service</a>
             <a href="#" onClick={(e) => e.preventDefault()}>Cookie settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
