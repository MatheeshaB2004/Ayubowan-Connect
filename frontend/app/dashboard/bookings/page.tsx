'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/lib/api';

const API_BASE = API_BASE_URL;

type Booking = {
  id: number;
  listingId: number;
  bookingDate: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  listing: {
    title: string;
    priceMin?: number;
    listingType?: string;
    vendor?: { businessName?: string };
  };
  vendor?: { businessName?: string };
  slot?: {
    startTime?: string;
    endTime?: string;
  } | null;
};

export default function BookingsPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!isSignedIn || !user) return;
    const userIdentifier = user.primaryEmailAddress?.emailAddress || user.id;
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        headers: { 'x-user-id': userIdentifier },
      });
      if (response.ok) {
        const data: Booking[] = await response.json();
        // Show experience bookings in actionable/customer-visible states
        const filtered = (data || []).filter(
          (b) =>
            b.listing?.listingType === 'EXPERIENCE' &&
            ['PENDING', 'CONFIRMED', 'REJECTED'].includes(b.status),
        );
        setBookings(filtered);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!isLoaded) return;
    const run = async () => {
      if (!isSignedIn || !user) {
        setIsLoading(false);
        return;
      }
      await fetchBookings();
      setIsLoading(false);
    };
    run();
  }, [isLoaded, isSignedIn, user, fetchBookings]);

  useEffect(() => {
    if (!isSignedIn || !user) return;
    const interval = setInterval(() => {
      fetchBookings();
    }, 30000);
    return () => clearInterval(interval);
  }, [isSignedIn, user, fetchBookings]);

  const handleCancelBooking = async (bookingId: number) => {
    if (!user) return;

    const userIdentifier = user.primaryEmailAddress?.emailAddress || user.id;

    try {
      const response = await fetch(`${API_BASE}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userIdentifier,
        },
        body: JSON.stringify({ status: 'CANCELLED' }),
      });

      if (!response.ok) {
        toast.error('Failed to cancel booking');
        return;
      }

      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      toast.success('Booking cancelled');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  /* ── Helpers ── */
  const vendorName = (b: Booking) =>
    b.vendor?.businessName ?? b.listing?.vendor?.businessName ?? 'Unknown Vendor';
  const bookingPrice = (b: Booking) => b.totalPrice || (b.listing?.priceMin ?? 0) * b.guests;

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      UPCOMING: 'bg-blue-100 text-blue-700',
      COMPLETED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-gray-200 text-gray-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      CONFIRMED: 'bg-blue-100 text-blue-700',
      REJECTED: 'bg-red-100 text-red-700',
    };
    return map[status.toUpperCase()] ?? 'bg-gray-100 text-gray-700';
  };

  const formatDisplayDate = (value?: string) => {
    if (!value) return '-';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '-';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(parsed);
  };

  const formatTime = (dateString: string) => {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return null;
    const hours = parsed.getUTCHours();
    const minutes = parsed.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatTimeSlot = (booking: Booking) => {
    if (!booking.slot?.startTime || !booking.slot?.endTime) return '-';
    const start = formatTime(booking.slot.startTime);
    const end = formatTime(booking.slot.endTime);
    if (!start || !end) return '-';
    return `${start} – ${end}`;
  };

  /* ── Loading ── */
  if (!isLoaded || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center py-20 text-gray-400 text-base">
          <svg className="animate-spin h-5 w-5 mr-3 text-[#0d9488]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading bookings…
        </div>
      </div>
    );
  }

  /* ── Unauthenticated ── */
  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500 py-20">
        Please sign in to view your bookings.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Dashboard</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center rounded-xl bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Pending Bookings
            </Link>
            <Link
              href="/dashboard/upcoming"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Upcoming Experiences
            </Link>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Orders History
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Pending Bookings</h2>
          <p className="text-gray-600 mt-2">
            Track your experience booking requests and vendor confirmations.
          </p>
        </div>

        {bookings.length === 0 ? (
          /* ── Empty state ── */
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">You have no pending bookings.</h2>
            <p className="text-gray-500 mb-6">Browse the marketplace to find amazing experiences and products.</p>
            <Link href="/marketplace">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Marketplace
              </button>
            </Link>
          </div>
        ) : (
          /* ── Bookings table ── */
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mt-4 overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Experience</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Vendor</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Time Slot</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Participants</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Price</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                        {booking.listing?.title || 'Unknown Experience'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {vendorName(booking)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatDisplayDate(booking.slot?.startTime)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatTimeSlot(booking)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{booking.guests}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#21a17a]">
                        LKR {bookingPrice(booking).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadge(booking.status)}`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {booking.status === 'PENDING' && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500">
                              Waiting for vendor
                            </span>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-all hover:bg-red-100 active:scale-[0.98]"
                            >
                              Cancel Booking
                            </button>
                          </div>
                        )}
                        {booking.status === 'CONFIRMED' && (
                          <div className="flex flex-wrap items-center gap-2">
                            <Link href={`/payments/checkout?bookingId=${booking.id}`}>
                              <button
                                className="inline-flex items-center rounded-lg bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]"
                              >
                                Proceed to Checkout
                              </button>
                            </Link>
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition-all hover:bg-red-100 active:scale-[0.98]"
                            >
                              Cancel Booking
                            </button>
                          </div>
                        )}
                        {booking.status === 'REJECTED' && (
                          <Link href={`/marketplace/experiences/${booking.listingId}`}>
                            <button className="inline-flex items-center rounded-lg border border-[#0d9488] px-4 py-2 text-sm font-semibold text-[#0d9488] shadow-sm transition-all hover:bg-[#0d9488]/5 active:scale-[0.98]">
                              Book Again
                            </button>
                          </Link>
                        )}
                        {booking.status === 'COMPLETED' && (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
