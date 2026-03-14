"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { RatingBreakdown } from './datas';
ChartJS.register(ArcElement, Tooltip, Legend);
interface RatingAnalyticsProps {
  avgRating: number;
  totalReviews: number;
  satisfaction: number;
  breakdown: RatingBreakdown[];
}
export default function RatingAnalytics({
  avgRating,
  totalReviews,
  satisfaction,
  breakdown
}: RatingAnalyticsProps) {
  const donutData = {
    datasets: [
    {
      data: [satisfaction, 100 - satisfaction],
      backgroundColor: ['#379683', '#e2e8f0'],
      borderWidth: 0,
      hoverOffset: 0
    }]

  };
  const donutOptions = {
    cutout: '72%',
    rotation: -90,
    circumference: 360,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    animation: {
      duration: 900
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
        delay: 0.25
      }}
      className="rating-container">

      {/* Section label */}
      <p className="rating-label">
        Customer Ratings
      </p>

      <div className="rating-content">
        {/* Donut + number */}
        <div className="rating-donut-container">
          <div className="rating-donut-wrapper">
            <Doughnut data={donutData} options={donutOptions} />
            <div className="rating-donut-center">
              <span className="rating-donut-value">
                {avgRating}
              </span>
              <span className="rating-donut-max">/ 5</span>
            </div>
          </div>
          <div className="text-center">
            <p className="rating-satisfaction-value">{satisfaction}%</p>
            <p className="rating-satisfaction-text">
              positive · {totalReviews} reviews
            </p>
          </div>
        </div>

        {/* Star breakdown bars */}
        <div className="rating-breakdown">
          {(Array.isArray(breakdown) ? breakdown : []).map((item, index) =>
          <motion.div
            key={item.stars}
            initial={{
              opacity: 0,
              x: 16
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.3 + index * 0.07
            }}
            className="rating-breakdown-item">

              <div className="rating-breakdown-stars">
                <span className="rating-breakdown-stars-value">
                  {item.stars}
                </span>
                <StarIcon className="rating-breakdown-stars-icon" />
              </div>
              <div className="rating-breakdown-bar-container">
                <motion.div
                initial={{
                  width: 0
                }}
                animate={{
                  width: `${item.percentage}%`
                }}
                transition={{
                  delay: 0.4 + index * 0.07,
                  duration: 0.5
                }}
                className="rating-breakdown-bar" />

              </div>
              <span className="rating-breakdown-count">
                {item.count}{' '}
                <span className="rating-breakdown-count-opacity">({item.percentage}%)</span>
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>);

}