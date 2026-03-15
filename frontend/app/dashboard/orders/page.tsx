'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Booking = {
  id: number;
  listingId: number;
  bookingDate: string;
  updatedAt: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  listing: {
    title: string;
    listingType?: string;
    vendor?: { businessName?: string };
  };
  vendor?: { businessName?: string };
  slot?: {
    startTime?: string;
    endTime?: string;
  } | null;
};

export default function OrdersPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchOrders = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        headers: { 'x-user-id': userId },
      });

      if (response.ok) {
        const data: Booking[] = await response.json();
        // Only show COMPLETED bookings as "orders"
        const completed = (data ?? []).filter((b) => b.status === 'COMPLETED');
        setOrders(completed);
      } else if (response.status === 404) {
        setOrders([]);
      } else {
        console.error('Server error:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchOrders(user.id);
  }, [isLoaded, isSignedIn, user, fetchOrders]);

  /* ── Helpers ── */
  const vendorName = (b: Booking) =>
    b.vendor?.businessName ?? b.listing?.vendor?.businessName ?? 'Unknown Vendor';

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (dateString: string) => {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return null;
    const hours = parsed.getUTCHours();
    const minutes = parsed.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatTimeSlot = (order: Booking) => {
    if (!order.slot?.startTime || !order.slot?.endTime) return '-';
    const start = formatTime(order.slot.startTime);
    const end = formatTime(order.slot.endTime);
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
          Loading orders…
        </div>
      </div>
    );
  }

  /* ── Unauthenticated ── */
  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500 py-20">
        Please sign in to view your orders.
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
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Upcoming Experiences
            </Link>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center rounded-xl bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Orders History
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Orders</h2>
        <p className="text-gray-600 mt-2 mb-8">
          View your completed purchases and booking history.
        </p>

        {orders.length === 0 ? (
          /* ── Empty state ── */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet.</h2>
            <p className="text-gray-500 mb-6">Explore experiences or products to make your first booking or purchase.</p>
            <Link href="/marketplace">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Marketplace
              </button>
            </Link>
          </div>
        ) : (
          /* ── Orders table ── */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Item</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Vendor</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Scheduled Experience Date</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Participants</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Price</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {order.listing?.title || 'Unknown Item'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {vendorName(order)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.slot?.startTime ? formatDate(order.slot.startTime) : '-'}
                        {order.slot?.startTime && order.slot?.endTime && (
                          <p className="text-xs text-gray-500 mt-1">Time: {formatTimeSlot(order)}</p>
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.guests}
                      </td>
                      <td className="py-4 px-6 text-sm text-[#21a17a] font-semibold">
                        LKR {order.totalPrice.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#21a17a]/15 text-[#21a17a]">
                          COMPLETED
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
