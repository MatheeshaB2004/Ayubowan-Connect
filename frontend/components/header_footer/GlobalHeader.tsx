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

          {/* ── GUEST ── */}
          {!isSignedIn && (
            <>
              <Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/marketplace" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
              <Link href="/events" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              <Link href="/pro" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Pro</Link>
              <Link href="/faq" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
              <div className="mobile-menu-divider">
                <Link href="/auth/login" className="btn-login mobile-auth-btn" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                <Link href="/auth/register" className="btn-signup mobile-auth-btn" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
              </div>
            </>
          )}

          {/* ── TRAVELLER / USER ── */}
          {isSignedIn && (activeRole === 'traveller' || activeRole === 'user') && (
            <>
              <Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/marketplace" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
              <Link href="/events" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              <Link href="/dashboard/orders" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/pro" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Pro</Link>
              <Link href="/faq" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
              <Link href="/User_profile_manager" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
              <Link href="/payments/cart" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
            </>
          )}

          {/* ── VENDOR ── */}
          {isSignedIn && activeRole === 'vendor' && (
            <>
              <Link href="/" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/vendor/freeDashboad" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              <Link href="/events" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              <Link href="/pro" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Pro</Link>
              <Link href="/faq" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
              <Link href="/vendor/listings" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>My Listings</Link>
              <Link href="/vendor/profile" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Business Profile</Link>
              <div className="mobile-menu-divider">
                <Link href="/vendor/listings#create-listing" className="btn-signup mobile-auth-btn" onClick={() => setIsMobileMenuOpen(false)}>Create Listing</Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;
