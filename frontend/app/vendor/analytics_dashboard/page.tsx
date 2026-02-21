"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboardIcon,
  CalendarCheckIcon,
  LayoutGridIcon,
  BarChart3Icon,
  StarIcon,
  SettingsIcon,
  ChevronDownIcon,
  TrophyIcon,
  LightbulbIcon
} from
  'lucide-react';
import HeroSection from "./HeroSection";
import KPIGrid from "./KPIGrid";
import {
  Period,
  dashboardData,
  periodLabels
} from
  './datas';
import './page.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const navItems = [
  {
    icon: LayoutDashboardIcon,
    label: 'Overview',
    sectionId: 'section-overview'
  },
  {
    icon: CalendarCheckIcon,
    label: 'Bookings',
    sectionId: 'section-bookings'
  },
  {
    icon: LayoutGridIcon,
    label: 'Listings',
    sectionId: 'section-listings'
  },
  {
    icon: BarChart3Icon,
    label: 'Analytics',
    sectionId: 'section-analytics'
  },
  {
    icon: StarIcon,
    label: 'Reviews',
    sectionId: 'section-reviews'
  },
  {
    icon: SettingsIcon,
    label: 'Goals',
    sectionId: 'section-goals'
  }];

export default function Page() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('thisMonth');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section-overview');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const data = dashboardData[selectedPeriod];
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node))

        setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  useEffect(() => {
    const ids = navItems.map((n) => n.sectionId);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          threshold: 0.25,
          rootMargin: '-80px 0px -55% 0px'
        }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [selectedPeriod]);
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  const periods: Period[] = ['thisMonth', 'last30Days', 'lastQuarter'];
  return (
    <div className={`${inter.className} dashboard-container`}>
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 200
          }}
          onClick={() => scrollTo('section-overview')}
          className="logo-button">

          <svg
            viewBox="0 0 32 32"
            className="logo-svg"
            fill="currentColor">

            <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4c1.5 0 2.8.5 3.9 1.3L16 12l-3.9-4.7C13.2 6.5 14.5 6 16 6zm-6.7 3.3L13 14l-6.3 1.3c-.4-1.1-.7-2.3-.7-3.6 0-1.6.4-3.1 1.1-4.4l3.2 2zm-2.6 7.4L13 18l-2.3 5.7c-2.1-1.7-3.5-4.2-3.9-7zm5.6 9.6L16 20l3.7 6.3c-1.1.5-2.4.7-3.7.7s-2.6-.2-3.7-.7zm9.4-4L19 18l6.3-1.3c-.4 2.8-1.8 5.3-3.9 7zm3.6-9.6L19 14l3.7-6.3c.7 1.3 1.1 2.8 1.1 4.4 0 1.3-.3 2.5-.7 3.6z" />
          </svg>
        </motion.div>

        <nav className="nav-container">
          {navItems.map((item, i) => {
            const active = activeSection === item.sectionId;
            return (
              <motion.button
                key={item.label}
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.1 + i * 0.05
                }}
                onClick={() => scrollTo(item.sectionId)}
                className={`nav-button ${active ? 'nav-button-active' : 'nav-button-inactive'}`}>

                <item.icon
                  className={`nav-icon ${active ? 'nav-icon-active' : 'nav-icon-inactive'}`} />

                {active &&
                  <motion.div
                    layoutId="dot"
                    className="nav-dot" />

                }
                <div className="nav-tooltip">
                  {item.label}
                  <div className="nav-tooltip-arrow" />
                </div>
              </motion.button>);

          })}
        </nav>

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}
          className="user-avatar">

          N
        </motion.div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Top bar */}
          <motion.div
            initial={{
              opacity: 0,
              y: -10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="top-bar">

            <div>
              <h1 className="top-bar-title">
                Good morning, Nimal 🤝
              </h1>
              <p className="top-bar-subtitle">
                Pro Vendor Dashboard · AyubowanConnect
              </p>
            </div>
            <div ref={dropdownRef} className="dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="dropdown-button">

                <span className="dropdown-text">
                  {periodLabels[selectedPeriod]}
                </span>
                <ChevronDownIcon
                  className={`dropdown-icon ${isDropdownOpen ? 'dropdown-icon-open' : ''}`} />

              </button>
              <AnimatePresence>
                {isDropdownOpen &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -8
                    }}
                    transition={{
                      duration: 0.15
                    }}
                    className="dropdown-menu">

                    {periods.map((p) =>
                      <button
                        key={p}
                        onClick={() => {
                          setSelectedPeriod(p);
                          setIsDropdownOpen(false);
                        }}
                        className={`dropdown-item ${selectedPeriod === p ? 'dropdown-item-active' : 'dropdown-item-inactive'}`}>

                        {periodLabels[p]}
                      </button>
                    )}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </motion.div>
          <section className="section-spacing-y">
            <HeroSection
              listings={data.kpi.totalListings.value}
              bookings={data.kpi.bookings.value}
              views={data.kpi.profileViews.value}
              inquiries={data.kpi.inquiries.value}
            />
            
            <KPIGrid data={data.kpi} />
          </section>
        </div>
      </main>
    </div>
  )

}