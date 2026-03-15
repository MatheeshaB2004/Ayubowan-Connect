'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Booking = {
  id: number;
  listingId: number;
  bookingDate: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  listing?: {
    title?: string;
    listingType?: string;
    vendor?: { businessName?: string };
  } | null;
  vendor?: { businessName?: string } | null;
  slot?: {
    startTime?: string;
    endTime?: string;
  } | null;
};

export default function UpcomingExperiencesPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          headers: { 'x-user-id': user.id },
        });

        if (response.ok) {
          const data: Booking[] = await response.json();
          setBookings(data ?? []);
        } else {
          console.error('Failed to fetch bookings');
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isLoaded, isSignedIn, user]);

  const upcomingBookings = useMemo(
    () =>
      bookings.filter((b) => {
        const slotStart = b.slot?.startTime ? new Date(b.slot.startTime) : null;
        const isExperience = b.listing?.listingType === 'EXPERIENCE';
        const isFutureOrToday = !!slotStart && !Number.isNaN(slotStart.getTime()) && slotStart >= new Date();
        const isRelevantStatus = b.status === 'COMPLETED';

        return isExperience && isFutureOrToday && isRelevantStatus;
      }).sort((a, b) => {
        const startA = a.slot?.startTime ? new Date(a.slot.startTime).getTime() : Number.MAX_SAFE_INTEGER;
        const startB = b.slot?.startTime ? new Date(b.slot.startTime).getTime() : Number.MAX_SAFE_INTEGER;
        return startA - startB;
      }),
    [bookings],
  );

  const vendorName = (b: Booking) =>
    b.vendor?.businessName ?? b.listing?.vendor?.businessName ?? 'Unknown Vendor';

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

  const statusBadge = (status: Booking['status']) => {
    if (status === 'CANCELLED') return 'bg-red-100 text-red-800';
    return 'bg-[#21a17a]/15 text-[#21a17a]';
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center py-20 text-gray-400 text-base">
          <svg className="animate-spin h-5 w-5 mr-3 text-[#0d9488]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading upcoming experiences…
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500 py-20">
        Please sign in to view your upcoming experiences.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Dashboard</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Pending Bookings
            </Link>
            <Link
              href="/dashboard/upcoming"
              className="inline-flex items-center rounded-xl bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm"
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

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Upcoming Experiences</h2>
        <p className="text-gray-600 mt-2 mb-8">
          View your paid future experiences and their latest status.
        </p>

        {upcomingBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No upcoming experiences yet.</h2>
            <p className="text-gray-500 mb-6">Explore experiences to book your next adventure.</p>
            <Link href="/marketplace">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Marketplace
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Experience</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Vendor</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Date</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Time Slot</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Participants</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {upcomingBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {booking.listing?.title ?? 'Unknown Experience'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{vendorName(booking)}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }) : '-'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{formatTimeSlot(booking)}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{booking.guests}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(booking.status)}`}>
                          Upcoming
                        </span>
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
