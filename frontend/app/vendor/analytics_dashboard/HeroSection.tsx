"use client";
import React from 'react';
import { motion } from 'framer-motion';
import "./page.css";
import {
  HomeIcon,
  CalendarCheckIcon,
  EyeIcon,
  MessageCircleIcon } from
'lucide-react';
interface HeroSectionProps {
  listings: number;
  bookings: number;
  views: number;
  inquiries: number;
}
export default function HeroSection({
  listings,
  bookings,
  views,
  inquiries
}: HeroSectionProps) {
  const stats = [
  {
    icon: HomeIcon,
    value: listings,
    label: 'Listings'
  },
  {
    icon: CalendarCheckIcon,
    value: bookings,
    label: 'Bookings'
  },
  {
    icon: EyeIcon,
    value: views,
    label: 'Views'
  },
  {
    icon: MessageCircleIcon,
    value: inquiries,
    label: 'Inquiries'
  }];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      className="hero-section">

      {/* Pattern Overlay */}
      <div
        className="hero-pattern"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />


      {/* Decorative SVG Elements */}
      <div className="hero-decorative">
        {/* Lotus Pattern */}
        <svg
          viewBox="0 0 400 300"
          className="hero-lotus">

          {/* Large Lotus */}
          <g transform="translate(200, 150)">
            <ellipse cx="0" cy="0" rx="60" ry="30" fill="white" opacity="0.3" />
            <ellipse
              cx="-40"
              cy="-20"
              rx="40"
              ry="20"
              fill="white"
              opacity="0.2"
              transform="rotate(-30)" />

            <ellipse
              cx="40"
              cy="-20"
              rx="40"
              ry="20"
              fill="white"
              opacity="0.2"
              transform="rotate(30)" />

            <ellipse
              cx="-50"
              cy="10"
              rx="35"
              ry="18"
              fill="white"
              opacity="0.15"
              transform="rotate(-60)" />

            <ellipse
              cx="50"
              cy="10"
              rx="35"
              ry="18"
              fill="white"
              opacity="0.15"
              transform="rotate(60)" />

            <ellipse
              cx="0"
              cy="-40"
              rx="30"
              ry="15"
              fill="white"
              opacity="0.25" />

          </g>
          {/* Floating Circles */}
          <circle cx="320" cy="60" r="25" fill="white" opacity="0.1" />
          <circle cx="80" cy="80" r="15" fill="white" opacity="0.08" />
          <circle cx="350" cy="200" r="20" fill="white" opacity="0.12" />
          <circle cx="100" cy="220" r="12" fill="white" opacity="0.06" />
          {/* Hexagons */}
          <polygon
            points="300,120 320,130 320,150 300,160 280,150 280,130"
            fill="white"
            opacity="0.08" />

          <polygon
            points="120,160 135,168 135,184 120,192 105,184 105,168"
            fill="white"
            opacity="0.06" />

          {/* Temple Shape */}
          <g transform="translate(280, 220)" opacity="0.15">
            <rect x="-30" y="0" width="60" height="40" fill="white" />
            <polygon points="-40,0 0,-30 40,0" fill="white" />
            <rect
              x="-10"
              y="15"
              width="20"
              height="25"
              fill="rgba(0,0,0,0.3)" />

          </g>
        </svg>
      </div>

      <div className="hero-content">
        {/* Left Content */}
        <div className="hero-left">
          <motion.p
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="hero-badge">

            Business Performance Overview
          </motion.p>
          <motion.h2
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.3
            }}
            className="hero-title">

            Insights & summary on your listings
          </motion.h2>

          {/* Stats Grid */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.4
            }}
            className="hero-stats-grid">

            {stats.map((stat, index) =>
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.5 + index * 0.1
              }}
              className="hero-stat-card">

                <div className="hero-stat-icon">
                  <stat.icon className="hero-stat-icon-svg" />
                </div>
                <div>
                  <p className="hero-stat-value">{stat.value}</p>
                  <p className="hero-stat-label">{stat.label}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Decorative Area - Visual Balance */}
        <div className="hero-right" />
      </div>
    </motion.section>);

}