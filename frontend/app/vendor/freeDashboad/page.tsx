"use client";

import React, { useState, useEffect } from "react";
import "./page.css";

type Ratings = {
    avgRating: number
    totalReviews: number
    percentages: Record<number, number>
}

export default function Dashboard() {
    const times: string[] = [];

    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const hour = String(h).padStart(2, "0");
            const minute = String(m).padStart(2, "0");
            times.push(`${hour}:${minute}`);
        }
    }
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("10:00");
    const [activeTab, setActiveTab] = useState("All");
    const [isEditingCal, setIsEditingCal] = useState(false);
    const today = new Date();
    const [reviews, setReviews] = useState<any[]>([]);

    const [ratings, setRatings] = useState<Ratings>({
        avgRating: 0,
        totalReviews: 0,
        percentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    });

    const [listings, setListings] = useState<any[]>([]);

    const [stats, setStats] = useState({
        activeListings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        events: 0,
    });
    const userId = 2; // temporary for testing
    const [currentDate, setCurrentDate] = useState(today)
    type Slot = {
        start: string
        end: string
    }

    type AvailabilityState = {
        [day: number]: Slot[]
    }

    const [availability, setAvailability] = useState<AvailabilityState>({})
    const [activeDay, setActiveDay] = useState<number | null>(null);

    const [replyText, setReplyText] = useState("");
    const [selectedReview, setSelectedReview] = useState(null);
    const [bookings, setBookings] = useState([
        {
            id: 1,
            name: "John Martinez",
            property: "Downtown Loft",
            nights: 3,
            dates: "Dec 15-18",
            price: 450,
            avatar: "https://i.pravatar.cc/150?img=11",
            status: "incoming",
        },
        {
            id: 2,
            name: "Emma Thompson",
            property: "Luxury Villa",
            nights: 5,
            dates: "Dec 20-25",
            price: 1250,
            avatar: "https://i.pravatar.cc/150?img=5",
            status: "incoming",
        },
        {
            id: 3,
            name: "Marcus Cole",
            property: "Oceanview Retreat",
            nights: 2,
            dates: "Nov 10-12",
            price: 600,
            avatar: "https://i.pravatar.cc/150?img=3",
            status: "completed",
        },
    ]);

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    useEffect(() => {

        const interval = setInterval(async () => {
            //const now = new Date()
            const now = new Date(today.getFullYear(), today.getMonth() + 1, 1)

            if (
                now.getMonth() !== currentDate.getMonth() ||
                now.getFullYear() !== currentDate.getFullYear()

                
            ) {
                console.log("MONTH CHANGED — deleting previous availability")
                const res = await fetch(
                    `http://localhost:3001/dashboard/vendor/availability/previous?userId=${userId}`,
                    { method: "DELETE" }
                );
                console.log("DELETE RESPONSE:", res.status)
                setCurrentDate(now);
                setAvailability({});
                setIsEditingCal(false);
            }
        }, 60000);

        return () => clearInterval(interval)
    }, [currentDate])

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3001/dashboard/vendor/stats?userId=${userId}`
                );

                console.log("Status:", res.status);

                const text = await res.text();
                console.log("Response body:", text);

                const data = JSON.parse(text);
                setStats(data);

            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await fetch(
                `http://localhost:3001/dashboard/vendor/reviews?userId=${userId}`
            );

            const data = await res.json();

            setReviews(data);
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        const fetchRatings = async () => {
            const res = await fetch(
                `http://localhost:3001/dashboard/vendor/rating-summary?userId=${userId}`
            );

            const data = await res.json();

            setRatings({
                avgRating: data?.avgRating ?? 0,
                totalReviews: data?.totalReviews ?? 0,
                percentages: data?.percentages ?? { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            });
        };

        fetchRatings();
    }, []);

    useEffect(() => {

        const fetchAvailability = async () => {

            const monthString = `${year}-${String(month + 1).padStart(2, '0')}-01`;

            const res = await fetch(
                `http://localhost:3001/dashboard/vendor/availability?userId=${userId}&month=${monthString}`
            );

            const data = await res.json();

            const mapped: AvailabilityState = {};

            data.forEach((d: any) => {
                const day = new Date(d.date).getDate();
                mapped[day] = d.slots || [];
            });

            setAvailability(mapped);
        };

        fetchAvailability();

    }, [currentDate]);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3001/dashboard/vendor/listings?userId=${userId}`
                );

                const data = await res.json();
                setListings(data);

            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        };

        fetchListings();
    }, []);

    const handleAccept = (id: number) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "accepted" } : b));
    };

    const handleDecline = (id: number) => {
        setBookings(prev => prev.filter(b => b.id !== id));
    };

    const handleMarkDone = (id: number) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "completed" } : b));
    };

    const toggleDate = (day: number) => {
        if (!isEditingCal) return;

        setActiveDay(prev => prev === day ? null : day);

        setAvailability(prev => {
            const copy = { ...prev };

            if (!copy[day]) {
                copy[day] = []; // create date with empty slots
            }

            return copy;
        });
    };
    const addSlot = (day: number) => {

        if (!startTime || !endTime) return

        if (startTime >= endTime) {
            alert("End time must be later than start time.")
            return
        }

        const existingSlots = availability[day] || []

        // prevent exact duplicate
        const duplicate = existingSlots.some(
            slot => slot.start === startTime && slot.end === endTime
        )

        if (duplicate) {
            alert("This exact slot already exists.")
            return
        }

        // prevent overlap
        const overlapping = existingSlots.some(
            slot => startTime < slot.end && endTime > slot.start
        )

        if (overlapping) {
            alert("This slot overlaps with an existing slot.")
            return
        }

        setAvailability(prev => {

            const copy = { ...prev }

            const slots = copy[day] ? [...copy[day]] : []

            slots.push({
                start: startTime,
                end: endTime
            })

            copy[day] = slots

            return copy
        })

    }
    const removeSlot = (day: number, index: number) => {
        setAvailability(prev => {
            const copy = { ...prev };
            copy[day] = copy[day].filter((_, i) => i !== index);
            if (copy[day].length === 0) {
                delete copy[day];
                if (activeDay === day) setActiveDay(null);
            }
            return copy;
        });
    };

    const editSlot = (day: number, index: number, field: keyof Slot, value: string) => {
        setAvailability(prev => {
            const copy = { ...prev };
            copy[day] = copy[day].map((slot, i) => i === index ? { ...slot, [field]: value } : slot);
            return copy;
        });
    };

    const filteredBookings = bookings.filter(b => {
        if (activeTab === "All") return true;
        if (activeTab === "Incoming") return b.status === "incoming";
        if (activeTab === "Accepted") return b.status === "accepted";
        if (activeTab === "Completed") return b.status === "completed";
        return true;
    });

    return (
        <div className="proplux-app">
            <aside className="proplux-sidebar">
                <div className="proplux-logo">
                    <div className="proplux-logo-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <span className="proplux-logo-text">Dashboard</span>
                </div>
                <nav className="proplux-nav">
                    <a href="#" className="proplux-nav-item active">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                        Dashboard
                    </a>
                    <a href="#listings" className="proplux-nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        Properties
                    </a>
                    <a href="#availability" className="proplux-nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Availability
                    </a>
                </nav>
            </aside>

            <main className="proplux-main">
                <header className="proplux-header">
                    <div className="proplux-header-text">
                        <h1>Welcome back, Sarah!</h1>
                        <p>Here's what's happening with your properties today</p>
                    </div>
                    <div className="proplux-header-actions">
                        <div className="proplux-live-badge"><span className="live-dot"></span>Live</div>
                        <img src="https://i.pravatar.cc/150?img=47" alt="Sarah" className="proplux-avatar" />
                    </div>
                </header>

                <div className="proplux-hero">
                    <div className="proplux-hero-content">
                        <h2>Grow Your Portfolio</h2>
                        <p>Add new properties and maximize your earnings</p>
                    </div>
                    <div className="proplux-hero-buttons">
                        <button className="btn-light-green active">Create Listing</button>
                        <button className="proplux-btn-light">Create Events</button>
                    </div>
                </div>

                <div className="proplux-stats-row">
                    <div className="proplux-stat-card">
                        <div className="stat-content">
                            <span className="stat-label">Active Listings</span>
                            <div className="stat-value">{stats.activeListings}</div>
                        </div>
                        <div className="stat-icon-wrap">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                        </div>
                    </div>

                    <div className="proplux-stat-card">
                        <div className="stat-content">
                            <span className="stat-label">Pending Bookings</span>
                            <div className="stat-value">{stats.pendingBookings}</div>
                        </div>
                        <div className="stat-icon-wrap">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                    </div>

                    <div className="proplux-stat-card">
                        <div className="stat-content">
                            <span className="stat-label">Completed Bookings</span>
                            <div className="stat-value">{stats.completedBookings}</div>
                        </div>
                        <div className="stat-icon-wrap">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>

                    <div className="proplux-stat-card">
                        <div className="stat-content">
                            <span className="stat-label">Events</span>
                            <div className="stat-value">{stats.events}</div>
                        </div>
                        <div className="stat-icon-wrap">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="proplux-bottom-grid">
                    <div className="proplux-card col-span-8">
                        <div className="proplux-card-header">
                            <h3>Booking Requests</h3>
                            <div className="proplux-tabs">
                                {["All", "Incoming", "Accepted", "Completed"].map(tab => (
                                    <button key={tab} className={`proplux-tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
                                ))}
                            </div>
                        </div>
                        <div className="proplux-list">
                            {filteredBookings.length === 0 ? (
                                <p style={{ color: "var(--text-muted)", padding: "16px" }}>No bookings found.</p>
                            ) : (
                                filteredBookings.map((b) => (
                                    <div key={b.id} className="proplux-request-item">
                                        <div className="request-user">
                                            <img src={b.avatar} alt={b.name} className="request-avatar" />
                                            <div className="request-info">
                                                <h4>{b.name}</h4>
                                                <p>{b.property} • {b.nights} nights</p>
                                            </div>
                                        </div>
                                        <div className="request-actions">
                                            <div className="request-price">${b.price}</div>
                                            <div className="action-buttons">
                                                {b.status === "incoming" && (
                                                    <>
                                                        <button className="btn-accept" onClick={() => handleAccept(b.id)}>Accept</button>
                                                        <button className="btn-decline" onClick={() => handleDecline(b.id)}>Decline</button>
                                                    </>
                                                )}
                                                {b.status === "accepted" && (
                                                    <button className="btn-done" onClick={() => handleMarkDone(b.id)}>Mark Done</button>
                                                )}
                                                {b.status === "completed" && (
                                                    <span style={{ color: "var(--success)", fontWeight: "600" }}>✓ Completed</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="proplux-card partner-score-card col-span-4">
                        <h3>Overall Rating</h3>
                        <div className="score-display">
                            <div className="score-number">
                                {ratings.avgRating}
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#eab308" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                            </div>
                            <div className="score-text">Based on {ratings.totalReviews} Reviews</div>
                        </div>
                        <div className="score-metrics rating-metrics">
                            <div className="metric">
                                <div className="metric-header"><span>5 Stars</span><span>{ratings?.percentages[5] ?? 0}%</span></div>
                                <div className="metric-bar-bg"><div className="metric-bar-fill" style={{ width: `${ratings?.percentages?.[5] ?? 0}%` }}></div></div>
                            </div>
                            <div className="metric">
                                <div className="metric-header"><span>4 Stars</span><span>{ratings?.percentages[4] ?? 0}%</span></div>
                                <div className="metric-bar-bg"><div className="metric-bar-fill" style={{ width: `${ratings?.percentages?.[4] ?? 0}%` }}></div></div>
                            </div>
                            <div className="metric">
                                <div className="metric-header"><span>3 Stars</span><span>{ratings?.percentages[3] ?? 0}%</span></div>
                                <div className="metric-bar-bg"><div className="metric-bar-fill warning-fill" style={{ width: `${ratings?.percentages?.[3] ?? 0}%` }}></div></div>
                            </div>
                            <div className="metric">
                                <div className="metric-header"><span>2 Stars</span><span>{ratings?.percentages[2] ?? 0}%</span></div>
                                <div className="metric-bar-bg"><div className="metric-bar-fill danger-fill" style={{ width: `${ratings?.percentages?.[2] ?? 0}%` }}></div></div>
                            </div>
                            <div className="metric">
                                <div className="metric-header"><span>1 Star</span><span>{ratings?.percentages[1] ?? 0}%</span></div>
                                <div className="metric-bar-bg"><div className="metric-bar-fill danger-fill" style={{ width: `${ratings?.percentages?.[1] ?? 0}%` }}></div></div>
                            </div>
                        </div>
                    </div>

                    <div id="listings" className="proplux-card col-span-6">
                        <h3>Your Listings</h3>

                        {listings.length === 0 ? (
                            <p style={{ color: "var(--text-muted)" }}>No listings found.</p>
                        ) : (
                            listings.map((l) => (
                                <div className="property-item mt-lite" key={l.id}>
                                    <div className="property-image">
                                        <img src={l.image || "/vendor_management/Create-listing.png"} />
                                    </div>

                                    <div className="property-details">
                                        <h4>{l.title}</h4>
                                        <p>{l.city}</p>

                                        <div className="property-rating">
                                            <div className="stars">⭐ {l.avgRating}</div>
                                            <span>({l.reviewCount} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="proplux-card col-span-6">
                        <h3>Recent Reviews</h3>
                        {Array.isArray(reviews) && reviews.map((r) => (
                            <div className="review-item mt-lite" key={r.id}>
                                <div className="review-header">

                                    <img
                                        src="https://i.pravatar.cc/150"
                                        className="review-avatar"
                                    />

                                    <div className="review-meta">
                                        <span className="reviewer-name">
                                            {r.user.fullName}
                                        </span>

                                        <span className="review-date">
                                            {new Date(r.createdAt).toLocaleDateString()}
                                        </span>

                                        <div className="stars">
                                            {"⭐".repeat(r.rating)}
                                        </div>
                                    </div>
                                </div>

                                <p className="review-text">{r.comment}</p>
                            </div>
                        ))}
                    </div>

                    {/* Availability Calendar (New Section) */}
                    <div id="availability" className="proplux-card proplux-calendar-section col-span-12">
                        <div className="proplux-card-header">
                            <h3>
                                Availability Calendar (
                                {currentDate.toLocaleString("default", { month: "long" })} {year}
                                )
                            </h3>
                            <div className="calendar-actions">
                                <button className={`btn-light-green ${isEditingCal ? 'active' : ''}`} onClick={() => setIsEditingCal(!isEditingCal)}>
                                    {isEditingCal ? "Editing..." : "Edit"}
                                </button>
                                {isEditingCal && (
                                    <>
                                        <button
                                            className="btn-decline"
                                            onClick={async () => {

                                                const monthString =
                                                    `${year}-${String(month + 1).padStart(2, "0")}-01`;

                                                const res = await fetch(
                                                    `http://localhost:3001/dashboard/vendor/availability?userId=${userId}&month=${monthString}`,
                                                    { method: "DELETE" }
                                                );
                                                console.log("DELETE STATUS:", res.status);

                                                setAvailability({});
                                                setActiveDay(null);

                                            }}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            className="btn-accept"
                                            onClick={async () => {

                                                const monthNumber = month + 1;

                                                const dates = Object.entries(availability).map(([day, slots]) => ({
                                                    date: `${year}-${String(monthNumber).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
                                                    slots
                                                }));

                                                await fetch(
                                                    "http://localhost:3001/dashboard/vendor/availability",
                                                    {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify({
                                                            userId,
                                                            dates
                                                        })
                                                    }
                                                );

                                                setIsEditingCal(false);
                                                setActiveDay(null);

                                            }}
                                        >
                                            Save
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="calendar-grid">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="calendar-day-header">{day}</div>
                            ))}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={"empty" + i} className="calendar-empty"></div>
                            ))}
                            {Array.from({ length: daysInMonth }, (_, i) => {
                                const day = i + 1
                                const hasSlots = availability[day] && availability[day].length > 0;
                                return (
                                    <div
                                        key={day}
                                        className={`calendar-day ${hasSlots ? "selected" : ""} ${isEditingCal ? "editable" : ""}`}
                                        style={{ border: activeDay === day ? '2px solid var(--primary)' : '' }}
                                        onClick={() => toggleDate(day)}
                                    >
                                        {day}
                                        {hasSlots && <div style={{ fontSize: '10px', marginTop: '4px', color: 'var(--primary)' }}>{availability[day].length} slot{availability[day].length > 1 ? 's' : ''}</div>}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Slot Editor Panel */}
                        {isEditingCal && activeDay !== null && (
                            <div className="slot-editor-panel mt-lite" style={{ background: "var(--bg-light)", padding: "20px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                                <h4>Edit Slots for {currentDate.toLocaleString("default", { month: "long" })} {activeDay}</h4>
                                <div className="add-slot-row" style={{ display: "flex", gap: "10px", marginTop: "15px", alignItems: "flex-end", flexWrap: "wrap" }}>
                                    <div>
                                        <label style={{ display: "block", fontSize: "12px", marginBottom: "5px", color: "var(--text-muted)", fontWeight: 500 }}>Start Time</label>
                                        <select value={startTime} onChange={e => setStartTime(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "#fff", outline: "none" }}>
                                            {times.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: "12px", marginBottom: "5px", color: "var(--text-muted)", fontWeight: 500 }}>End Time</label>
                                        <select value={endTime} onChange={e => setEndTime(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--border-color)", background: "#fff", outline: "none" }}>
                                            {times.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-light-green"
                                        onClick={() => addSlot(activeDay)}
                                    >
                                        Add Slot
                                    </button>
                                </div>

                                <div className="slots-list" style={{ marginTop: "20px" }}>
                                    {(availability[activeDay] || []).length === 0 ? (
                                        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>No slots added for this date yet. Select times above to add a slot.</p>
                                    ) : (
                                        (availability[activeDay] || [])
                                            .slice()
                                            .sort((a, b) => a.start.localeCompare(b.start))
                                            .map((slot, idx) => (

                                                <div
                                                    key={idx}
                                                    className="slot-card"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "10px 14px",
                                                        borderRadius: "8px",
                                                        border: "1px solid var(--border-color)",
                                                        background: "#fff",
                                                        marginBottom: "8px"
                                                    }}
                                                >

                                                    <span style={{ fontWeight: 500 }}>
                                                        {slot.start} – {slot.end}
                                                    </span>

                                                    <button
                                                        onClick={() => removeSlot(activeDay, idx)}
                                                        style={{
                                                            border: "none",
                                                            background: "transparent",
                                                            color: "red",
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        🗑
                                                    </button>

                                                </div>

                                            ))
                                    )}
                                </div>
                            </div>
                        )}

                        <p className="calendar-legend mt-lite">
                            <span className="legend-item">
                                <span className="legend-dot"></span>
                                Click Edit to select dates.
                            </span>
                            <span className="legend-item">
                                <span className="legend-dot"></span>
                                Selected dates are marked as available.
                            </span>
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
}
