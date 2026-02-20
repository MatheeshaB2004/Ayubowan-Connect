"use client";
import { Inter } from "next/font/google";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { HeroSection } from "./HeroSection";
import "./page.css";

const inter = Inter({ subsets: ["latin"] });

export default function AnalyticsDashboardPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={inter.className}>
      <div className="dashboard-wrapper">
        <div className="dashboard-inner">

          {/*WELCOME SECTION */}
          <div className="dashboard-topbar">
            <div className="dashboard-welcome">
              <h1 className="dashboard-title">
                Good morning, Nimal 🤝
              </h1>
              <p className="dashboard-subtitle">
                Pro Vendor Dashboard · AyubowanConnect
              </p>
            </div>

            <div className="period-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="period-button"
              >
                <span>This Month</span>
                <ChevronDownIcon
                  className={`chevron ${isDropdownOpen ? "rotate" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="period-menu">
                  <button className="period-option active">This Month</button>
                  <button className="period-option">Last 30 Days</button>
                  <button className="period-option">Last Quarter</button>
                </div>
              )}
            </div>
          </div>

          {/* HERO SECTION */}
          <div className="hero-wrapper">
            <HeroSection
              listings={12}
              bookings={35}
              views={420}
              inquiries={18}
            />
          </div>

        </div>
      </div>
    </div>
  );
}