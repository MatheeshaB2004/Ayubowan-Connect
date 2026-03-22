"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getApiUrl } from "@/lib/api"; // Added getApiUrl
import "./Footer.css";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage(null);

    const backendUrl = getApiUrl("/newsletter/subscribe") || "http://localhost:3001/newsletter/subscribe";

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to subscribe");

      setMessage({ type: "success", text: data.message || "Thank you for subscribing!" });
      setEmail("");
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <footer className="site-footer">
      <div className="container mx-auto">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-link animate-fade-in-up">
              <img
                src="/logo.png"
                alt="Ayubowan Connect"
                className="footer-logo-image"
              />
              <div className="footer-brand-text">
                <span className="brand-ayubowan">Ayubowan</span>
                <span className="brand-connect">Connect</span>
              </div>
            </Link>
            <p className="footer-copyright">
              © 2025 Ayubowan Connect. All rights reserved.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/ayubowanconnect/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayubowan Connect on Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com/people/AyubowanConnect/61583979804191/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayubowan Connect on Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/ayubowanconnect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayubowan Connect on LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@ayubowanconnect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ayubowan Connect on YouTube"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="footer-heading">EXPLORE</h3>
            <ul className="footer-links">
              <li>
                <Link href="/">
                  About us
                </Link>
              </li>
              <li>
                <a href="/marketplace">
                  Experiences
                </a>
              </li>
              <li>
                <Link href="/events">
                  Events
                </Link>
              </li>
              <li>
                <a href="/faq">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="footer-heading">CONNECT</h3>
            <ul className="footer-links">
              <li>
                <a href="/auth/register">
                  Join Us
                </a>
              </li>
              <li>
                <a href="https://linktr.ee/ayubowanconnect" target="_blank" rel="noopener noreferrer">
                  Follow Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event('openChatWidget'));
                }}>
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h3 className="footer-heading">LEGAL</h3>
            <ul className="footer-links">
              <li>
                <Link href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLightboxOpen(true); }} className="cursor-pointer hover:text-[var(--lochinvar)] transition-colors">
                  Cookie Settings
                </a>
              </li>
              <li>
                <a href="/complaints">
                  Complaints
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter">
            <h3 className="footer-heading">SUBSCRIBE</h3>
            <p className="newsletter-text">
              Get the latest Sri Lankan cultural experiences delivered to your
              inbox.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Email address here"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "loading"}
              />
              <button 
                suppressHydrationWarning 
                type="submit" 
                className="newsletter-btn"
                disabled={status === "loading"}
                style={{ opacity: status === "loading" ? 0.7 : 1 }}
              >
                {status === "loading" ? "..." : "Submit"}
              </button>
            </form>
            {message && (
              <p style={{ marginTop: '8px', fontSize: '0.95rem', fontWeight: '500', color: message.type === 'success' ? '#fff' : '#ffcdd2' }}>
                {message.text}
              </p>
            )}
            <p className="newsletter-disclaimer">
              By subscribing, you agree to our privacy policy and cultural
              sharing guidelines.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <Link href="/privacy">
            Privacy Policy
          </Link>
          <Link href="/terms">
            Terms of service
          </Link>
          <a href="#" onClick={(e) => { e.preventDefault(); setIsLightboxOpen(true); }} className="cursor-pointer hover:text-[var(--lochinvar)] transition-colors">
            Cookie settings
          </a>
        </div>
        
        {/* Cookies/Browser Storage Lightbox */}
        {isLightboxOpen && (
          <div 
            className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsLightboxOpen(false)}
          >
             <div 
               className="w-full max-w-md h-full bg-white dark:bg-[var(--card)] shadow-2xl overflow-y-auto transform" 
               style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
               onClick={(e) => e.stopPropagation()}
             >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 z-10 bg-white dark:bg-[var(--card)]">
                   <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cookie Settings</h2>
                   <button 
                     onClick={() => setIsLightboxOpen(false)} 
                     aria-label="Close panel" 
                     className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                   >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </button>
                </div>
                <div className="p-8 text-gray-700 dark:text-gray-300 space-y-6">
                   <div>
                     <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Our Approach to Privacy</h3>
                     <p className="text-sm leading-relaxed">
                       Ayubowan Connect prioritizes your privacy. We do not use traditional cookies for authentication or tracking purposes.
                     </p>
                   </div>
                   
                   <div className="space-y-3">
                     <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900">
                       <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       <div>
                         <p className="text-sm font-medium text-gray-900 dark:text-white">Secure Token Authentication</p>
                         <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">We use modern token-based authentication for secure sessions</p>
                       </div>
                     </div>

                     <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900">
                       <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12M8 11h12m-12 4h12M3 7h.01M3 11h.01M3 15h.01"></path></svg>
                       <div>
                         <p className="text-sm font-medium text-gray-900 dark:text-white">Local Storage Usage</p>
                         <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Limited data stored locally to enhance your experience and remember preferences</p>
                       </div>
                     </div>

                     <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-900">
                       <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4v2m0 4v2M6.343 3.665c.886-.887 2.318-.887 3.203 0l.707.707a1.129 1.129 0 001.602-1.602L9.146.968c-.887-.887-2.318-.887-3.203 0l-.707.707A1.129 1.129 0 006.343 3.665zM3.172 6.172h1.414m9.9 9.9h1.414M12 1a11 11 0 110 22 11 11 0 010-22z"></path></svg>
                       <div>
                         <p className="text-sm font-medium text-gray-900 dark:text-white">No Tracking or Ads</p>
                         <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">We do not employ tracking scripts or third-party advertising cookies</p>
                       </div>
                     </div>
                   </div>

                   <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                     <p className="text-xs text-gray-500 dark:text-gray-400">
                       For more details, please review our <Link href="/privacy" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
                     </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
