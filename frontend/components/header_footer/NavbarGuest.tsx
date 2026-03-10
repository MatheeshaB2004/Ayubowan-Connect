"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

interface NavbarGuestProps {
  textColorClass?: string;
  isSignedIn?: boolean;
  user?: any;
}

const NavbarGuest: React.FC<NavbarGuestProps> = ({ textColorClass = '', isSignedIn, user }) => {
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

  // Determine button styles based on current page
  const isOnLoginPage = pathname?.includes('/login');
  const isOnRegisterPage = pathname?.includes('/register') || pathname?.includes('/sign-up');

  // Active button gets teal, inactive (white) only shows on opposite auth page
  const loginButtonClass = isOnRegisterPage ? 'btn-login-inactive' : 'btn-login';
  const signupButtonClass = isOnLoginPage ? 'btn-signup-inactive' : 'btn-signup';

  // Check if link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/' || pathname === '/landing';
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="nav-guest-container">
      {/* Navigation Links - Centered Absolutely */}
      <div className="nav-links-center">
        <Link href="/" className={`nav-link ${textColorClass} ${isActive('/') ? 'active' : ''}`}>Home</Link>
        <Link href="/landing#offer" onClick={(e) => handleScroll(e, 'offer')} className={`nav-link ${textColorClass}`}>Events</Link>
        <Link href="/marketplace" className={`nav-link ${textColorClass} ${isActive('/marketplace') ? 'active' : ''}`}>Marketplace</Link>
        <Link href="/pro" className={`nav-link ${textColorClass} ${isActive('/pro') ? 'active' : ''}`}>Pro</Link>
        <Link href="/landing#team" onClick={(e) => handleScroll(e, 'team')} className={`nav-link ${textColorClass}`}>Team</Link>

        <div className="relative group">
          <button className={`nav-link more-dropdown-btn ${textColorClass}`} suppressHydrationWarning>
            more
            <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className="dropdown-menu">
            <Link href="/landing#testimonials" onClick={(e) => handleScroll(e, 'testimonials')} className="dropdown-item w-full text-left block">Testimonials</Link>
            <Link href="/landing#team" onClick={(e) => handleScroll(e, 'team')} className="dropdown-item w-full text-left block">Our Story</Link>
            <button className="dropdown-item w-full text-left">Terms & Conditions</button>
            <Link href="/landing#offer" onClick={(e) => handleScroll(e, 'offer')} className="dropdown-item w-full text-left block">Events</Link>
            <div style={{ borderTop: '1px solid #f3f4f6', margin: '0.25rem 0' }}></div>
            <button className="dropdown-item w-full text-left">Contact</button>
            <button className="dropdown-item w-full text-left">Help</button>
            <button className="dropdown-item w-full text-left">FAQ</button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="auth-buttons">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <Link href="/User_profile_manager" className={`nav-link ${textColorClass}`}>
              My Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className={loginButtonClass}
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className={signupButtonClass}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarGuest;
