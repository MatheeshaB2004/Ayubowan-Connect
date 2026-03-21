'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const API_BASE = API_BASE_URL;

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
  const { userId } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    const fetchBookings = async () => {
      const userIdentifier = user.primaryEmailAddress?.emailAddress || user.id;
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          headers: { 'x-user-id': userIdentifier },
        });

        if (response.ok) {
          const data: Booking[] = await response.json();
          console.log('Bookings response:', data);
          setBookings(data ?? []);
        } else {
          const errorText = await response.text();
          console.error('Bookings API error:', errorText);
          setBookings([]);
          return;
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!userId) return;
    fetchBookings();
  }, [isLoaded, isSignedIn, user, userId]);

  const upcomingBookings = useMemo(
    () =>
      bookings.filter((b) => {
        const slotStart = b.slot?.startTime ? new Date(b.slot.startTime) : null;
        const isExperience = b.listing?.listingType === 'EXPERIENCE';
        const isFutureOrToday = !!slotStart && !Number.isNaN(slotStart.getTime()) && slotStart.getTime() >= Date.now();
        const isRelevantStatus =
          b.status === 'CONFIRMED' || b.status === 'PENDING';

        return isExperience && isFutureOrToday && isRelevantStatus;
      }).sort((a, b) => {
        const startA = a.slot?.startTime ? new Date(a.slot.startTime).getTime() : Number.MAX_SAFE_INTEGER;
        const startB = b.slot?.startTime ? new Date(b.slot.startTime).getTime() : Number.MAX_SAFE_INTEGER;
        return startA - startB;
      }),
    [bookings]
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
    <div className="min-h-screen bg-[#f9fafb]">
      <DashboardTabs />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Upcoming Experiences</h2>
          <p className="text-gray-600 mt-2">
            View your paid future experiences and their latest status.
          </p>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">You have no upcoming experiences.</h2>
            <p className="text-gray-500 mb-6">Explore experiences to book your next adventure.</p>
            <Link href="/marketplace">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Marketplace
              </button>
            </Link>
          </div>
        ) : (
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
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {upcomingBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                        {booking.listing?.title ?? 'Unknown Experience'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{vendorName(booking)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatDisplayDate(booking.slot?.startTime)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{formatTimeSlot(booking)}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{booking.guests}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadge('UPCOMING')}`}>
                          {'upcoming'.toUpperCase()}
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