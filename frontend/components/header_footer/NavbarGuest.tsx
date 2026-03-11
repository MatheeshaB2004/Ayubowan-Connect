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
    if (pathname === '/home' || pathname === '/') {
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
        <Link href="/marketplace" className={`nav-link ${textColorClass}`}>Marketplace</Link>
        <Link href="/events" onClick={(e) => handleScroll(e, 'offer')} className={`nav-link ${textColorClass}`}>Events</Link>
        <Link href="/pro" className={`nav-link ${textColorClass}`}>Pro</Link>
        <Link href="/pro" className={`nav-link ${textColorClass}`}>FAQ</Link>
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
