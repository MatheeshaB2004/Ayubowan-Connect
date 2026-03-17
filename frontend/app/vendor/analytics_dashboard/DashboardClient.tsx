"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
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
} from 'lucide-react';
import HeroSection from "./HeroSection";
import KPIGrid from "./KPIGrid";
import PerformanceTrends from "./PerformanceTrends";
import TopListings from "./TopListings";
import RatingAnalytics from "./RatingAnalytics";
import EngagementInsights from "./EngagementInsights";
import GoalTracker from "./GoalTracker";
import {
  Period,
  dashboardData,
  periodLabels
} from './datas';
import './page.css';
import { Inter } from "next/font/google";
import { useUser } from "@clerk/nextjs";

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
    label: 'Listings and Reviews',
    sectionId: 'section-listings'
  },
  {
    icon: StarIcon,
    label: 'Insights',
    sectionId: 'section-reviews'
  },
  {
    icon: TrophyIcon,
    label: 'Goals',
    sectionId: 'section-goals'
  }];

export default function DashboardClient({
  summary,
  bookingTrend,
  topListings,
  ratings,
  insights,
  viewsVsBookings,
  conversionRate,
  period,
  ratingTrend,
}: {
  summary: any;
  bookingTrend: any[];
  topListings: {
    name: string;
    bookings: number;
    maxBookings: number;
    tags: string[];
  }[];
  ratings: {
    avgRating: number;
    totalReviews: number;
    satisfaction: number;
    breakdown: {
      stars: number;
      count: number;
      percentage: number;
    }[];
  };
  insights: any[];
  viewsVsBookings: any[];
  conversionRate: number;
  period: string;

  ratingTrend: { label: string; avg: number }[];
}) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(period as Period);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('section-overview');
  const [hideSidebar, setHideSidebar] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { user, isLoaded } = useUser();
  const [liveSummary, setLiveSummary] = useState(summary);
  const [liveBookingTrend, setLiveBookingTrend] = useState(bookingTrend);
  const [liveViewsVsBookings, setLiveViewsVsBookings] = useState(viewsVsBookings);
  const [liveConversionRate, setLiveConversionRate] = useState(conversionRate);
  const [liveTopListings, setLiveTopListings] = useState(topListings);
  const [liveRatings, setLiveRatings] = useState(ratings);
  const [liveInsights, setLiveInsights] = useState(insights);
  const [liveGoal, setLiveGoal] = useState(null);
  
  const userId = user?.id;

  useEffect(() => {

    const checkPro = async () => {

      const res = await fetch(
        `http://localhost:3001/dashboard/vendor/profile?userId=${userId}`
      );

      const data = await res.json();

      if (!data.isProUser) {
        router.push("/vendor/freeDashboard");
      }

    };

    if (userId) {
      checkPro();
    }

  }, [userId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node))
        setIsDropdownOpen(false);
    };
    document.addEventListener('click', handler, true);
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

  useEffect(() => {
    setSelectedPeriod(period as Period);
  }, [period]);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideSidebar(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const refreshDashboard = async () => {
      const summaryRes = await fetch(
        `http://localhost:3001/dashboard/vendor/summary?userId=${user.id}&period=${selectedPeriod}`
      );

      const trendRes = await fetch(
        `http://localhost:3001/dashboard/vendor/booking-trend?userId=${user.id}&period=${selectedPeriod}`
      );

      const viewsRes = await fetch(
        `http://localhost:3001/dashboard/vendor/views-vs-bookings?userId=${user.id}&period=${selectedPeriod}`
      );

      const listingsRes = await fetch(
        `http://localhost:3001/dashboard/vendor/top-listings?userId=${user.id}&period=${selectedPeriod}`
      );

      const ratingsRes = await fetch(
        `http://localhost:3001/dashboard/vendor/ratings?userId=${user.id}&period=${selectedPeriod}`
      );

      const insightsRes = await fetch(
        `http://localhost:3001/dashboard/vendor/insights?userId=${user.id}&period=${selectedPeriod}`
      );

      const goalRes = await fetch(
        `http://localhost:3001/dashboard/vendor?userId=${user.id}`
      );

      const summaryData = await summaryRes.json();
      const trendData = await trendRes.json();
      const viewsJson = await viewsRes.json();
      const listingsData = await listingsRes.json();
      const ratingsData = await ratingsRes.json();
      const insightsData = await insightsRes.json();
      const goalData = await goalRes.json();

      setLiveSummary(summaryData);
      setLiveBookingTrend(trendData);
      setLiveViewsVsBookings(viewsJson.data);
      setLiveConversionRate(viewsJson.conversionRate);
      setLiveTopListings(listingsData);
      setLiveRatings(ratingsData);
      setLiveInsights(insightsData);
      setLiveGoal(goalData.goal);
    };

    const interval = setInterval(refreshDashboard, 5000);

    return () => clearInterval(interval);
  }, [user?.id, selectedPeriod]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  const periods: Period[] = ['thisMonth', 'last30Days', 'lastQuarter'];

  if (!mounted || !summary) return null;
  return (
    <div className={`${inter.className} dashboard-container`}>
      {/* ── Sidebar ── */}
      <aside className={`sidebar ${hideSidebar ? "sidebar-hidden" : ""}`}>
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
                Welcome, {user?.firstName || "Vendor"}! 👋
              </h1>
              <p className="top-bar-subtitle">
                Pro Vendor Dashboard · AyubowanConnect
              </p>
            </div>
            <div ref={dropdownRef} className="dropdown-container">
              <button
                suppressHydrationWarning
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(prev => !prev);
                }}
                className="dropdown-button"
              >
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
                    className="period-dropdown-menu">

                    {periods.map((p) => {

                      return (
                        <button
                          key={p}
                          onClick={() => {
                            router.push(`/vendor/analytics_dashboard?period=${p}`);
                            setSelectedPeriod(p);
                            setIsDropdownOpen(false);
                          }}
                          className={`period-dropdown-item ${selectedPeriod === p ? 'period-dropdown-item-active' : 'period-dropdown-item-inactive'}`}>
                          {periodLabels[p]}
                        </button>
                      );
                    })}
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            key={selectedPeriod}
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.3
            }}
            className="section-spacing-y">

            {/* ── 1. Overview ── */}
            <section id="section-overview" className="section-container section-spacing-y">
              <HeroSection
                experiences={liveSummary?.experiences || 0}
                bookings={liveSummary?.bookings || 0}
                products={liveSummary?.products || 0}
                events={liveSummary?.events || 0}
              />

              <div className="section-spacing">
                {summary && (
                  <KPIGrid summary={liveSummary} />
                )}
              </div>
            </section>

            {/* ── 2. Bookings ── */}
            <section id="section-bookings" className="section-container section-spacing">
              <SectionLabel
                icon={CalendarCheckIcon}
                color="#379683"
                title="Booking Trends" />

              <PerformanceTrends
                bookingTrend={liveBookingTrend || []}
                viewsVsBookings={liveViewsVsBookings || []}
                conversionRate={liveConversionRate || 0}
              />
            </section>

            {/* ── 3. Listings + Analytics side by side ── */}
            <div className="section-spacing">
              <div className="section-grid">
                <section
                  id="section-listings"
                  className="section-container section-grid-col-span-3">

                  <SectionLabel
                    icon={TrophyIcon}
                    color="#577399"
                    title="Top Experiences" />

                  <TopListings listings={liveTopListings || []} />
                </section>

                <section
                  id="section-analytics"
                  className="section-container section-grid-col-span-2">

                  <SectionLabel
                    icon={StarIcon}
                    color="#379683"
                    title="Rating Analytics" />

                  <RatingAnalytics
                    avgRating={liveRatings?.avgRating || 0}
                    totalReviews={liveRatings?.totalReviews || 0}
                    satisfaction={liveRatings?.satisfaction || 0}
                    breakdown={liveRatings?.breakdown || []}
                    trend={ratingTrend} 
                  />
                </section>
              </div>

            </div>

            {/* ── 4. Insights ── */}
            <section id="section-reviews" className="section-container section-spacing">
              <SectionLabel
                icon={LightbulbIcon}
                color="#8D5A97"
                title="Engagement Insights" />

              <EngagementInsights insights={liveInsights || []} />
            </section>

            {/* ── 5. Goals ── */}
            <section id="section-goals" className="section-container section-spacing" style={{ paddingBottom: '3rem' }}>
              <SectionLabel
                icon={SettingsIcon}
                color="#379683"
                title="Monthly Goal" />

              <GoalTracker goal={liveGoal} />
            </section>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

/* Lightweight section label — no card, just a header row */
function SectionLabel({
  icon: Icon,
  color,
  title
}: { icon: React.ElementType; color: string; title: string; }) {
  return (
    <div className="section-label">
      <div
        className="section-label-icon"
        style={{
          backgroundColor: `${color}18`
        }}>
        <Icon
          className="section-label-icon-svg"
          style={{
            color
          }} />
      </div>
      <h2 className="section-label-title">{title}</h2>
      <div className="section-label-divider" />
    </div>);
}