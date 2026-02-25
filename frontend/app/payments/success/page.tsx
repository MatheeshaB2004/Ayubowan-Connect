'use client';

import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
  <div className="payments-page">
    <div className="payments-container">

      <div className="payments-header">
        <h1>Booking Confirmed</h1>
        <p>Your request has been sent successfully</p>
      </div>

      <div className="payments-card" style={{ textAlign: 'center' }}>
        <div className="success-icon">
          ✓
        </div>

        <p>
          The vendor will review your booking and get back to you shortly.
        </p>

        <div className="success-actions">
          <Link href="/marketplace">
            <button className="btn-secondary">Explore More</button>
          </Link>

          <Link href="/bookings">
            <button className="btn-primary">View My Bookings</button>
          </Link>
        </div>
      </div>

    </div>
  </div>
);
}