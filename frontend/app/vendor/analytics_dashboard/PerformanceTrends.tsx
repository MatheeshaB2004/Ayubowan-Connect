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
    Legend
} from
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
import { useSearchParams } from "next/navigation";
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
    const safeBookingTrend = Array.isArray(bookingTrend) ? bookingTrend : [];
    const safeViewsVsBookings = Array.isArray(viewsVsBookings) ? viewsVsBookings : [];
    const searchParams = useSearchParams();
    const period = searchParams.get("period");
    const shouldGroupWeekly = period === "lastQuarter";
    const lineData = {
        labels: safeBookingTrend.map((d) => {
            const date = new Date(d.date);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }),
        datasets: [
            {
                label: 'Bookings',
                data: safeBookingTrend.map((d) => d.bookings),
                borderWidth: 2.5,
                pointRadius: 3,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#379683',
                fill: true,
                backgroundColor: (ctx: any) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0, 0, 0, 240);
                    gradient.addColorStop(0, 'rgba(79,209,197,0.55)');
                    gradient.addColorStop(1, 'rgba(79,209,197,0.05)');
                    return gradient;
                },
                tension: 0.4
            }]

    };
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false
        },
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
                cornerRadius: 10,

                callbacks: {
                    label: (ctx: any) => {
                        const value = ctx.parsed.y ?? 0;
                        return `${ctx.dataset.label}: ${value}`;
                    }
                }

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
                    font: { size: 11 },
                    autoSkip: true,
                    maxTicksLimit: 8,
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

    const groupWeekly = (data: any[]) => {
        return Object.values(
            data.reduce((acc, item) => {
                const date = new Date(item.week);

                const start = new Date(date);
                start.setDate(date.getDate() - date.getDay());
                start.setHours(0, 0, 0, 0);

                const key = start.toISOString();

                if (!acc[key]) {
                    const end = new Date(start);
                    end.setDate(start.getDate() + 6);

                    acc[key] = {
                        start,
                        end,
                        views: 0,
                        bookings: 0
                    };
                }

                acc[key].views += item.views;
                acc[key].bookings += item.bookings;

                return acc;
            }, {} as Record<string, any>)
        );
    };


    const processedData = shouldGroupWeekly
        ? groupWeekly(safeViewsVsBookings)
        : safeViewsVsBookings.map((d) => ({
            start: new Date(d.week),
            end: new Date(d.week),
            views: d.views,
            bookings: d.bookings
        }));

    const barData = {
        labels: processedData.map((d: any) => {
            const format = (date: Date) =>
                date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                });

            if (shouldGroupWeekly) {
                return `${format(d.start)} – ${format(d.end)}`;
            }

            return format(d.start);
        }),
        datasets: [
            {
                label: 'Views',
                data: processedData.map((d: any) => d.views),
                backgroundColor: 'rgba(87,115,153,0.75)',
                borderRadius: 5,
                maxBarThickness: 26
            },
            {
                label: 'Bookings',
                data: processedData.map((d: any) => d.bookings),
                backgroundColor: 'rgba(55,150,131,0.85)',
                borderRadius: 5,
                maxBarThickness: 26
            }
        ]
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
                offset: true,
                stacked: false,
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgba(255,255,255,0.35)',
                    font: {
                        size: 11
                    },

                    maxRotation: 0,
                    minRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 6
                },
                border: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
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
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-white/5">
                <div className="lg:col-span-1 px-8 py-6">
                    <p className="text-white/40 text-xs font-medium mb-4">
                        Bookings over time
                    </p>
                    <div className="h-[240px]">
                        <Line data={lineData} options={lineOptions as any} />
                    </div>
                </div>
                <div className="lg:col-span-1 px-8 py-6">
                    <p className="text-white/40 text-xs font-medium mb-4">
                        Listing Views vs Bookings
                    </p>
                    <div className="h-[240px]">
                        <Bar data={barData} options={barOptions as any} />
                    </div>
                </div>
            </div>
        </motion.div>);

}