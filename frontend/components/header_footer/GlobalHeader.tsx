"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "../../context/AuthContext";
import NavbarGuest from "./NavbarGuest";
import NavbarTraveller from "./NavbarTraveller";
import NavbarVendor from "./NavbarVendor";
import "./Header.css";

const GlobalHeader: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { role: contextRole } = useAuth(); // rename role to contextRole
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/landing";

  // Derive the active role: Check Clerk user metadata first, then fallback to context role
  const clerkRole = user?.unsafeMetadata?.role as string | undefined;
  // If signed in but no role set yet, assume 'user' (traveller). Vendors always have role='vendor' set.
  const activeRole = isSignedIn ? (clerkRole || 'user') : contextRole;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === "/landing" || pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/landing#${id}`);
      }
    }
  };

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
  const headerClass = `global-header ${isTransparent ? "header-transparent" : "header-solid"}`;

  return (
    <header className={headerClass}>
      <div className="container header-container relative">
        <div className="header-content">

          {/* Logo */}
          <div className="relative z-10 h-full flex items-center">
            <Link href="/" className="logo-container">
              {/* Image Logo: Visible when transparent (Top of Home) */}
              <img
                src="/logo.png"
                alt="Ayubowan Connect"
                className={`logo-image ${isTransparent ? '' : 'hidden-logo'}`}
              />

              {/* Text Logo: Always visible but changes layout */}
              <div className={`brand-text-container ${isTransparent ? 'layout-stacked' : 'layout-inline'}`}>
                <span className="brand-ayubowan">Ayubowan</span>
                <span className="brand-connect">Connect</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden md:flex flex-1 items-center justify-end h-full">
            {activeRole === 'vendor' ? (
              <NavbarVendor textColorClass={textColorClass} />
            ) : isSignedIn ? (
              <NavbarTraveller textColorClass={textColorClass} />
            ) : (
              <NavbarGuest textColorClass={textColorClass} />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu absolute top-full left-0 w-full z-50">
          <span className="section-tag">Menu ({activeRole === 'user' ? 'traveller' : activeRole})</span>

          {activeRole === 'guest' && (
            <>
              <Link href="/experiences" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Experiences</Link>
              <Link href="/landing#offer" className="mobile-link" onClick={(e) => handleScroll(e, 'offer')}>Events</Link>
              <Link href="/marketplace" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
              {isSignedIn ? (
                <>
                  <Link href="/User_profile_manager" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                </>
              ) : (
                <div className="mobile-menu-divider">
                  <Link href="/auth/login" className="btn-login" style={{ color: '#374151', borderColor: '#d1d5db', display: 'block', textAlign: 'center', marginBottom: '8px' }}>Log in</Link>
                  <Link href="/auth/register" className="btn-signup" style={{ display: 'block', textAlign: 'center' }}>Sign up</Link>
                </div>
              )}
            </>
          )}

          {(activeRole === 'traveller' || activeRole === 'user') && (
            <>
              <Link href="/trips" className="mobile-link">My Trips</Link>
              <Link href="/User_profile_manager" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
              <Link href="/saved" className="mobile-link">Saved</Link>
              <Link href="/messages" className="mobile-link">Messages</Link>
            </>
          )}

          {activeRole === 'vendor' && (
            <>
              <Link href="/vendor/dashboard" className="mobile-link">Dashboard</Link>
              <Link href="/listings" className="mobile-link">My Listings</Link>
              <Link href="/orders" className="mobile-link">Orders</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;
