"use client";

import React, { useState, useEffect } from "react";
import "./page.css";

type Ratings = {
  avgRating: number
  totalReviews: number
  percentages: Record<number, number>
}

export default function Dashboard() {
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
  const [selectedDates, setSelectedDates] = useState<number[]>([])

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

    const interval = setInterval(() => {
      const now = new Date()

      if (
        now.getMonth() !== currentDate.getMonth() ||
        now.getFullYear() !== currentDate.getFullYear()
      ) {
        console.log("New month detected! Resetting calendar.");
        setCurrentDate(now);
        setSelectedDates([]); // Auto-clear selected available dates
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
    setSelectedDates(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === "All") return true;
    if (activeTab === "Incoming") return b.status === "incoming";
    if (activeTab === "Accepted") return b.status === "accepted";
    if (activeTab === "Completed") return b.status === "completed";
    return true;
  });

  {/*const submitReply = async () => {
    await fetch("http://localhost:3001/vendor/dashboard/reply-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewId: selectedReview,
        reply: replyText,
      }),
    });

    window.location.reload();
  };*/}

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

                {/*
                {r.reply && (
                  <p className="vendor-reply">
                    Vendor reply: {r.reply}
                  </p>
                )}
                */}

                {/*{!r.reply && (
                  <button className="reply-btn">Reply</button>
                )} 
                */}
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
                    <button className="btn-decline" onClick={() => setSelectedDates([])}>Reset</button>
                    <button className="btn-accept" onClick={() => setIsEditingCal(false)}>Save</button>
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
                return (
                  <div
                    key={day}
                    className={`calendar-day ${selectedDates.includes(day) ? "selected" : ""} ${isEditingCal ? "editable" : ""}`}
                    onClick={() => toggleDate(day)}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
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
