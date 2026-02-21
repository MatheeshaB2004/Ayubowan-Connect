"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FlameIcon, AlertTriangleIcon, SparklesIcon } from 'lucide-react';
import { ListingPerformance } from './datas';
interface TopListingsProps {
  listings: ListingPerformance[];
}
const medalColors = [
'listings-rank-1',
'listings-rank-2',
'listings-rank-3',
'listings-rank-4',
'listings-rank-5'];

const medalLabels = ['1st', '2nd', '3rd', '4th', '5th'];
export default function TopListings({ listings }: TopListingsProps) {
  const getTag = (tag: ListingPerformance['tag']) => {
    switch (tag) {
      case 'high':
        return {
          icon: FlameIcon,
          label: 'Top',
          color: '#379683'
        };
      case 'needs-improvement':
        return {
          icon: AlertTriangleIcon,
          label: 'Improve',
          color: '#d97706'
        };
      case 'new':
        return {
          icon: SparklesIcon,
          label: 'New',
          color: '#8D5A97'
        };
    }
  };
  return (
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
        delay: 0.2
      }}>

      {/* Column headers */}
      <div className="listings-header">
        <span className="listings-header-rank">
          #
        </span>
        <span className="listings-header-name">
          Listing
        </span>
        <span className="listings-header-bookings">
          Bookings
        </span>
        <span className="listings-header-status">
          Status
        </span>
      </div>

      <div className="listings-list">
        {listings.map((listing, index) => {
          const tag = getTag(listing.tag);
          const pct = listing.bookings / listing.maxBookings * 100;
          return (
            <motion.div
              key={listing.name}
              initial={{
                opacity: 0,
                x: -12
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: 0.25 + index * 0.08
              }}
              className="listings-item">

              {/* Rank */}
              <span className={`listings-rank ${medalColors[index]}`}>
                {medalLabels[index]}
              </span>

              {/* Name + bar */}
              <div className="listings-content">
                <p className="listings-name">
                  {listing.name}
                </p>
                <div className="listings-bar-container">
                  <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${pct}%`
                    }}
                    transition={{
                      delay: 0.4 + index * 0.08,
                      duration: 0.6
                    }}
                    className="listings-bar"
                    style={{
                      background:
                      tag.color === '#379683' ?
                      'linear-gradient(90deg, #379683, #2d6b5e)' :
                      tag.color === '#8D5A97' ?
                      'linear-gradient(90deg, #8D5A97, #6b4275)' :
                      'linear-gradient(90deg, #d97706, #b45309)'
                    }} />

                </div>
              </div>

              {/* Booking count */}
              <div className="listings-bookings">
                <span className="listings-bookings-value">
                  {listing.bookings}
                </span>
                <span className="listings-bookings-label">bkgs</span>
              </div>

              {/* Tag */}
              <div className="listings-tag-container">
                <span
                  className="listings-tag"
                  style={{
                    backgroundColor: `${tag.color}15`,
                    color: tag.color
                  }}>

                  <tag.icon className="listings-tag-icon" />
                  {tag.label}
                </span>
              </div>
            </motion.div>);

        })}
      </div>
    </motion.div>);

}