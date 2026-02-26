'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarGuestProps {
  textColorClass?: string;
}

const NavbarGuest: React.FC<NavbarGuestProps> = ({ textColorClass = '' }) => {
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

  const buttonBorderClass = textColorClass.includes('white') ? 'border-white/30 text-white hover:bg-white/10' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400';

  return (
    <div className="nav-guest-container">
      {/* Navigation Links - Centered Absolutely */}
      <div className="nav-links-center">
        <Link href="/" className={`nav-link ${textColorClass}`}>Home</Link>
        <Link href="/landing#offer" onClick={(e) => handleScroll(e, 'offer')} className={`nav-link ${textColorClass}`}>Events</Link>
        <Link href="/marketplace" className={`nav-link ${textColorClass}`}>Marketplace</Link>
        <Link href="/pro" className={`nav-link ${textColorClass}`}>Pro</Link>
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
      <div className="auth-buttons -mr-2">
        <a href="#" onClick={(e) => e.preventDefault()} className={`btn-login ${buttonBorderClass} inline-block text-center pt-1.5`}>Log in</a>
        <a href="#" onClick={(e) => e.preventDefault()} className="btn-signup inline-block text-center pt-1.5">Sign up</a>
      </div>
    </div>
  );
};

export default NavbarGuest;
