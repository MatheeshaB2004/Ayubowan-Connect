"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

interface NavbarGuestProps {
  textColorClass?: string;
  isSignedIn?: boolean;
}

const NavbarGuest: React.FC<NavbarGuestProps> = ({ textColorClass = '', isSignedIn }) => {
  const pathname = usePathname();

  // Determine button styles based on current page
  const isOnLoginPage = pathname?.includes('/login');
  const isOnRegisterPage =
    pathname?.includes('/register') ||
    pathname?.includes('/sign-up') ||
    pathname?.includes('/vendor-register') ||
    pathname?.includes('/user-register');

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
        <Link href="/marketplace" className={`nav-link ${textColorClass} ${isActive('/marketplace') ? 'active' : ''}`}>Marketplace</Link>
        <Link href="/events" className={`nav-link ${textColorClass} ${isActive('/events') ? 'active' : ''}`}>Events</Link>
        <Link href="/pro" className={`nav-link ${textColorClass} ${isActive('/pro') ? 'active' : ''}`}>Pro</Link>
        <Link href="/faqs" className={`nav-link ${textColorClass} ${isActive('/faqs') ? 'active' : ''}`}>FAQs</Link>
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
