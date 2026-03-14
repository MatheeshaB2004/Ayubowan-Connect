"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FlameIcon, AlertTriangleIcon, SparklesIcon,CircleIcon } from 'lucide-react';

interface ListingPerformance {
  name: string;
  bookings: number;
  maxBookings: number;
  tags: string[];
}
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
  const getTag = (tag: string) => {
    switch (tag) {
      case 'high':
        return {
          icon: FlameIcon,
          label: 'High',
          color: '#379683'
        };

      case 'strong':
        return {
          icon: SparklesIcon,
          label: 'Strong',
          color: '#2563eb'
        };

      case 'average':
        return {
          icon: SparklesIcon,
          label: 'Average',
          color: '#f59e0b'
        };

      case 'needs-improvement':
        return {
          icon: CircleIcon,
          label: 'Low Activity',
          color: '#dc2626'
        };

      case 'new':
        return {
          icon: SparklesIcon,
          label: 'New',
          color: '#8D5A97'
        };

      default:
        return null;
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
        {(Array.isArray(listings) ? listings : []).map((listing, index) => {
          const primaryTag = listing.tags?.[0];
          const tag = primaryTag ? getTag(primaryTag) : null;
          const pct =
            listing.maxBookings > 0
              ? (listing.bookings / listing.maxBookings) * 100
              : 0;
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
                        tag?.color === '#379683'
                          ? 'linear-gradient(90deg, #379683, #2d6b5e)'
                          : tag?.color === '#2563eb'
                            ? 'linear-gradient(90deg, #2563eb, #1e40af)'
                            : tag?.color === '#8D5A97'
                              ? 'linear-gradient(90deg, #8D5A97, #6b4275)'
                              : tag?.color === '#f59e0b'
                                ? 'linear-gradient(90deg, #f59e0b, #b45309)'
                                : 'linear-gradient(90deg, #dc2626, #991b1b)'
                    }} />

                </div>
              </div>

              {/* Booking count */}
              <div className="listings-bookings">
                <span className="listings-bookings-value">
                  {listing.bookings.toLocaleString()}
                </span>
                <span className="listings-bookings-label">bkgs</span>
              </div>

              {/* Tag */}
              <div className="listings-tag-container">
                {listing.tags?.map((t) => {
                  const tag = getTag(t);
                  if (!tag) return null;

                  return (
                    <span
                      key={t}
                      className="listings-tag"
                      style={{
                        backgroundColor: `${tag.color}15`,
                        color: tag.color
                      }}
                    >
                      <tag.icon className="listings-tag-icon" />
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>);

        })}
      </div>
    </motion.div>);

}