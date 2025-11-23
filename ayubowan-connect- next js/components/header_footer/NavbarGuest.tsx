'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarGuestProps {
  textColorClass?: string;
}

const NavbarGuest: React.FC<NavbarGuestProps> = ({ textColorClass = '' }) => {
  const buttonBorderClass = textColorClass.includes('white') ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400';

  return (
    <div className="nav-guest-container">
      {/* Navigation Links - Centered Absolutely */}
      <div className="nav-links-center">
        <Link href="/experiences" className={`nav-link ${textColorClass}`}>experiences</Link>
        <Link href="/events" className={`nav-link ${textColorClass}`}>events</Link>
        <Link href="/marketplace" className={`nav-link ${textColorClass}`}>marketplace</Link>
        
        <div className="relative group">
          <button className={`nav-link more-dropdown-btn ${textColorClass}`}>
            more 
            <svg className="w-3 h-3 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div className="dropdown-menu">
            <Link href="/stories" className="dropdown-item">Stories</Link>
            <Link href="/our-story" className="dropdown-item">Our Story</Link>
            <Link href="/terms" className="dropdown-item">Terms & Conditions</Link>
            <Link href="/events" className="dropdown-item">Events</Link>
            <div style={{ borderTop: '1px solid #f3f4f6', margin: '0.25rem 0' }}></div>
            <Link href="/contact" className="dropdown-item">Contact</Link>
            <Link href="/help" className="dropdown-item">Help</Link>
            <Link href="/faq" className="dropdown-item">FAQ</Link>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="auth-buttons -mr-2">
        <Link href="/login" className={`btn-login ${buttonBorderClass} inline-block text-center pt-1.5`}>Log in</Link>
        <Link href="/login" className="btn-signup inline-block text-center pt-1.5">Sign up</Link>
      </div>
    </div>
  );
};

export default NavbarGuest;
