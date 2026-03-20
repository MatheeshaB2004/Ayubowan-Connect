'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: 'experiences', label: 'Experiences' },
  { id: 'events',      label: 'Events' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'team',        label: 'Team' },
];

const appHomeHref = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://app.ayubowanconnect.com/';

const GlobalHeader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isLanding = pathname === '/' || pathname === '/landing';

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setIsScrolled(currentScrollY > 10);
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const isTransparent = isLanding && !isScrolled && !isMobileMenuOpen;
  const textColorClass = isTransparent ? 'text-white' : 'text-gray-700';
  const headerClass = `global-header ${isVisible ? '' : 'hidden-header'} ${isTransparent ? 'header-transparent' : 'header-solid'}`;

  // Smooth-scroll to section if on landing; navigate otherwise
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    if (isLanding) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

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
                className={`logo-image ${isTransparent ? '' : 'hidden-logo'}`}
              />
              <div className={`brand-text-container ${isTransparent ? 'layout-stacked' : 'layout-inline'}`}>
                <span className="brand-ayubowan">Ayubowan</span>
                <span className="brand-connect">Connect</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="nav-guest-container">
              <div className="nav-links-center">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/landing#${item.id}`}
                    className={`nav-link ${textColorClass}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="auth-buttons">
                <Link href={appHomeHref} className="app-home-button">
                  Go to App
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-10">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-toggle"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
          <span className="section-tag">Menu</span>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/landing#${item.id}`}
              className="mobile-link"
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
          <div className="mobile-menu-divider">
            <Link href={appHomeHref} className="app-home-button mobile-app-home-button">
              Go to App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;
