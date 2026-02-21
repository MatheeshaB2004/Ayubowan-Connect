"use client";
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend } from
'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { BookingTrendPoint, ViewsVsBookingsPoint } from './datas';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);
interface PerformanceTrendsProps {
  bookingTrend: BookingTrendPoint[];
  viewsVsBookings: ViewsVsBookingsPoint[];
  conversionRate: number;
}
export default function PerformanceTrends({
  bookingTrend,
  viewsVsBookings,
  conversionRate
}: PerformanceTrendsProps) {
  const lineData = {
    labels: bookingTrend.map((d) => d.date),
    datasets: [
    {
      label: 'Bookings',
      data: bookingTrend.map((d) => d.bookings),
      borderColor: '#379683',
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#379683',
      fill: true,
      backgroundColor: (ctx: any) => {
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 240);
        gradient.addColorStop(0, 'rgba(55,150,131,0.35)');
        gradient.addColorStop(1, 'rgba(55,150,131,0)');
        return gradient;
      },
      tension: 0.4
    }]

  };
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f0f1a',
        titleColor: 'rgba(255,255,255,0.9)',
        bodyColor: '#379683',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.04)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font: {
            size: 11
          }
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.04)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font: {
            size: 11
          }
        },
        border: {
          display: false
        }
      }
    }
  };
  const barData = {
    labels: viewsVsBookings.map((d) => d.week),
    datasets: [
    {
      label: 'Views',
      data: viewsVsBookings.map((d) => d.views),
      backgroundColor: 'rgba(87,115,153,0.75)',
      borderRadius: 5,
      borderSkipped: false
    },
    {
      label: 'Bookings',
      data: viewsVsBookings.map((d) => d.bookings),
      backgroundColor: 'rgba(55,150,131,0.85)',
      borderRadius: 5,
      borderSkipped: false
    }]

  };
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255,255,255,0.45)',
          font: {
            size: 11
          },
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 3,
          useBorderRadius: true
        }
      },
      tooltip: {
        backgroundColor: '#0f0f1a',
        titleColor: 'rgba(255,255,255,0.9)',
        bodyColor: 'rgba(255,255,255,0.6)',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font: {
            size: 11
          }
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.04)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255,255,255,0.35)',
          font: {
            size: 11
          }
        },
        border: {
          display: false
        }
      }
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: 0.15
      }}
      className="rounded-3xl bg-[#1a1a2e] overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-7 pb-2">
        <div>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
            Performance
          </p>
          <h3 className="text-xl font-bold text-white">Booking Trends</h3>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#379683]/20 border border-[#379683]/30">
          <span className="w-2 h-2 rounded-full bg-[#379683]" />
          <span className="text-[#379683] font-semibold text-sm">
            {conversionRate}% conversion
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 divide-x divide-white/5">
        <div className="lg:col-span-3 px-8 py-6">
          <p className="text-white/40 text-xs font-medium mb-4">
            Bookings over time
          </p>
          <div className="h-[240px]">
            <Line data={lineData} options={lineOptions as any} />
          </div>
        </div>
        <div className="lg:col-span-2 px-8 py-6">
          <p className="text-white/40 text-xs font-medium mb-4">
            Views vs bookings
          </p>
          <div className="h-[240px]">
            <Bar data={barData} options={barOptions as any} />
          </div>
        </div>
      </div>
    </motion.div>);

}