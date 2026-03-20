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
              <li><a href="#" onClick={(e) => e.preventDefault()}>Experiences</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Events</a></li>
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
        </div>
        <div className="footer-bottom">
             <p className="footer-copyright">
              © 2026 Ayubowan Connect. All rights reserved.
             </p>
             <div className="footer-bottom-links">
               <a href="#" onClick={(e) => e.preventDefault()}>Privacy policy</a>
               <a href="#" onClick={(e) => e.preventDefault()}>Terms of service</a>
               <a href="#" onClick={(e) => e.preventDefault()}>Cookie settings</a>
             </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
