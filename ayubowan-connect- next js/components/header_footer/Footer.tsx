'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import '../../styles/components/Footer.css';

const Footer: React.FC = () => {
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
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/experiences">Experiences</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/support">Support</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="footer-heading">Connect</h3>
            <ul className="footer-links">
              <li><Link href="/vendors">Vendors</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/help">Help</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
              <li><Link href="/compliance">Compliance</Link></li>
              <li><Link href="/contact">Contact</Link></li>
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
             <Link href="/privacy">Privacy policy</Link>
             <Link href="/terms">Terms of service</Link>
             <Link href="/cookies">Cookie settings</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
