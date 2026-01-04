'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import NavbarGuest from './NavbarGuest';
import NavbarTraveller from './NavbarTraveller';
import NavbarVendor from './NavbarVendor';

const GlobalHeader: React.FC = () => {
  const { role } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/landing';

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname === '/landing' || pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/landing#${id}`);
      }
    }
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Hide if scrolling down and past 100px, show if scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        // Add solid background if scrolled away from top
        if (currentScrollY > 10) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Determine visual state
  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;
  
  // Text color class for child navbars
  // If transparent (Home + Top), text is white. 
  // If solid (Scrolled or not Home), text is dark gray/lochinvar on hover
  const textColorClass = isTransparent ? 'text-white' : 'text-gray-700';

  // Base class + conditional class
  const headerClass = `global-header ${isVisible ? '' : 'hidden-header'} ${isTransparent ? 'header-transparent' : 'header-solid'}`;

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

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {role === 'guest' && <NavbarGuest textColorClass={textColorClass} />}
            {role === 'traveller' && <NavbarTraveller textColorClass={textColorClass} />}
            {role === 'vendor' && <NavbarVendor textColorClass={textColorClass} />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle"
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
          <span className="section-tag">Menu ({role})</span>
             
             {role === 'guest' && (
                 <>
                    <Link href="/experiences" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Experiences</Link>
                    <Link href="/landing#offer" className="mobile-link" onClick={(e) => handleScroll(e, 'offer')}>Events</Link>
                    <Link href="/landing#offer" className="mobile-link" onClick={(e) => handleScroll(e, 'offer')}>Marketplace</Link>
                    <div className="mobile-menu-divider">
                      <button className="btn-login" style={{ color: '#374151', borderColor: '#d1d5db' }}>Log in</button>
                      <button className="btn-signup">Sign up</button>
                    </div>
                 </>
             )}

             {role === 'traveller' && (
               <>
                 <Link href="/trips" className="mobile-link">My Trips</Link>
                 <Link href="/saved" className="mobile-link">Saved</Link>
                 <Link href="/messages" className="mobile-link">Messages</Link>
               </>
             )}

             {role === 'vendor' && (
               <>
                 <Link href="/dashboard" className="mobile-link">Dashboard</Link>
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
