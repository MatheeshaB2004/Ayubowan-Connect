"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import NavbarGuest from "./NavbarGuest";

const GlobalHeader: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        if (currentScrollY > 10) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;
  const textColorClass = isTransparent ? "text-white" : "text-gray-700";
  const headerClass = `global-header ${isVisible ? "" : "hidden-header"} ${isTransparent ? "header-transparent" : "header-solid"}`;

  return (
    <header className={headerClass}>
      <div className="container header-container relative">
        <div className="header-content">
          {/* Logo */}
          <div className="relative z-10 h-full flex items-center">
            <Link href="/" className="logo-container">
              <img
                src="/logo.png"
                alt="Ayubowan Connect"
                className={`logo-image ${isTransparent ? "" : "hidden-logo"}`}
              />

              <div
                className={`brand-text-container ${isTransparent ? "layout-stacked" : "layout-inline"}`}
              >
                <span className="brand-ayubowan">Ayubowan</span>
                <span className="brand-connect">Connect</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <NavbarGuest
              textColorClass={textColorClass}
              isSignedIn={isSignedIn}
              user={user}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu absolute top-full left-0 w-full z-50">
          <span className="section-tag">Menu</span>
          <Link href="/" className="mobile-link">
            Home
          </Link>
          <Link href="/events" className="mobile-link">
            Events
          </Link>
          <Link href="/marketplace" className="mobile-link">
            Marketplace
          </Link>
          <Link href="/pro" className="mobile-link">
            Pro
          </Link>
          <Link href="/trips" className="mobile-link">
            Tours
          </Link>
          <Link href="/experiences" className="mobile-link">
            Experiences
          </Link>
          {!isSignedIn && (
            <div className="mobile-menu-divider">
              <Link
                href="/auth/login"
                className="btn-login"
                style={{ color: "#374151", borderColor: "#d1d5db" }}
              >
                Log in
              </Link>
              <Link href="/auth/register" className="btn-signup">
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;
