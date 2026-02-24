"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGridIcon,
  CalendarCheckIcon,
  EyeIcon,
  MessageSquareTextIcon,
  StarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  InboxIcon
} from
  'lucide-react';

interface KPIGridProps {
  summary: any;
}
export default function KPIGrid({ summary }: KPIGridProps) {

  const primaryStats = [
    {
      label: 'Bookings',
      value: summary?.bookings,
      change: 0,
      icon: CalendarCheckIcon,
      color: '#379683'
    },
    {
      label: 'Profile Views',
      value: summary?.profileViews,
      change: 0,
      icon: EyeIcon,
      color: '#577399'
    }];

  const secondaryStats = [
    {
      label: 'Listings',
      value: summary.listings,
      sub: 'Experiences + Products',
      icon: LayoutGridIcon,
      color: '#379683'
    },
    {
      label: 'Response Time',
      value: summary.avgResponseMinutes
        ? `${summary.avgResponseMinutes} min`
        : '—',
      sub: 'Avg accept time',
      icon: InboxIcon,
      color: '#577399'
    },
    {
      label: 'Reviews',
      value: summary.reviews,
      sub: 'Customer feedback',
      icon: MessageSquareTextIcon,
      color: '#8D5A97'
    },
    {
      label: 'Avg Rating',
      value: `${summary.avgRating}★`,
      sub: 'Vendor score',
      icon: StarIcon,
      color: '#379683'
    }
  ];

  return (
    <div className="kpi-container">
      {/* ── Dark stats banner (2 hero metrics) ── */}
      <motion.div
        initial={{
          opacity: 0,
          y: 16
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}
        className="kpi-primary-container">

        <div className="kpi-primary-grid">
          {primaryStats.map((stat, i) =>
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.1 + i * 0.1
              }}
              className="kpi-primary-card">

              {/* Icon */}
              <div
                className="kpi-primary-icon"
                style={{
                  backgroundColor: `${stat.color}25`
                }}>

                <stat.icon
                  className="kpi-primary-icon-svg"
                  style={{
                    color: stat.color
                  }} />

              </div>

              {/* Value */}
              <div className="kpi-primary-content">
                <p className="kpi-primary-label">
                  {stat.label}
                </p>
                <p className="kpi-primary-value">
                  {stat.value ?? ""}
                </p>
                <div
                  className={`kpi-primary-change ${stat.change >= 0 ? 'kpi-primary-change-positive' : 'kpi-primary-change-negative'}`}>

                  {stat.change >= 0 ?
                    <TrendingUpIcon className="kpi-primary-change-icon" /> :

                    <TrendingDownIcon className="kpi-primary-change-icon" />
                  }
                  {stat.change >= 0 ? '+' : ''}
                  {stat.change}% vs last period
                </div>
              </div>

              {/* Decorative bar chart */}
              <div className="kpi-chart">
                {[35, 60, 45, 80, 65, 90, 75].map((h, idx) =>
                  <motion.div
                    key={idx}
                    initial={{
                      height: 0
                    }}
                    animate={{
                      height: `${h}%`
                    }}
                    transition={{
                      delay: 0.3 + idx * 0.05,
                      duration: 0.4
                    }}
                    className="kpi-chart-bar"
                    style={{
                      backgroundColor: stat.color
                    }} />

                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Secondary stats row (4 compact pills) ── */}
      <motion.div
        initial={{
          opacity: 0,
          y: 12
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.2,
          duration: 0.4
        }}
        className="kpi-secondary-grid">

        {secondaryStats.map((stat, i) =>
          <motion.div
            key={stat.label}
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.25 + i * 0.07
            }}
            className="kpi-secondary-card">

            <div
              className="kpi-secondary-icon"
              style={{
                backgroundColor: `${stat.color}15`
              }}>

              <stat.icon
                className="kpi-secondary-icon-svg"
                style={{
                  color: stat.color
                }} />

            </div>
            <div className="kpi-secondary-content">
              <p className="kpi-secondary-label">
                {stat.label}
              </p>
              <p className="kpi-secondary-value">
                {stat.value}
              </p>
              <p className="kpi-secondary-sub">{stat.sub}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>);
}