"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getApiUrl } from "@/lib/api"; // Added getApiUrl
import "./Footer.css";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

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
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An error occurred" });
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
              <a href="#">
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
              <a href="#">
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
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#">
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
              <a href="#">
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
                <a href="#" onClick={(e) => e.preventDefault()}>
                  About us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Experiences
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Events
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Partners
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
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
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Vendors
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Community
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Press Kit
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Partners
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Join Us
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
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
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Site map
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
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
          <a href="#" onClick={(e) => e.preventDefault()}>
            Privacy policy
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Terms of service
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Cookie settings
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
