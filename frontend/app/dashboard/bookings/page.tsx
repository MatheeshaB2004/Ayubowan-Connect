'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Booking = {
  id: number;
  listingId: number;
  bookingDate: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED';
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

export default function BookingsPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { addToCart } = useCart();
  const router = useRouter();

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
          // Show experience bookings in actionable/customer-visible states
          const filtered = (data || []).filter(
            (b) =>
              b.listing?.listingType === 'EXPERIENCE' &&
              ['PENDING', 'CONFIRMED', 'REJECTED', 'COMPLETED'].includes(b.status),
          );
          setBookings(filtered);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isSignedIn, user, isLoaded]);

  const handleProceedToCheckout = async (bookingId: number) => {
    toast.success('Adding to cart…');
    try {
      await addToCart(null, 1, bookingId);
      router.push('/payments/cart');
    } catch {
      toast.error('Failed to add booking to cart');
    }
  };

  /* ── Helpers ── */
  const vendorName = (b: Booking) =>
    b.vendor?.businessName ?? b.listing?.vendor?.businessName ?? 'Unknown Vendor';

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      CONFIRMED: 'bg-[#0d9488]/15 text-[#0d9488]',
      REJECTED: 'bg-red-100 text-red-800',
      COMPLETED: 'bg-[#21a17a]/15 text-[#21a17a]',
    };
    return map[status] ?? 'bg-gray-100 text-gray-800';
  };

  const formatTimeSlot = (booking: Booking) => {
    if (!booking.slot?.startTime || !booking.slot?.endTime) return '-';
    const start = booking.slot.startTime.slice(0, 5);
    const end = booking.slot.endTime.slice(0, 5);
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
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Dashboard</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center rounded-xl bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              Pending Bookings
            </Link>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Orders History
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">My Pending Bookings</h2>
        <p className="text-gray-600 mt-2 mb-8">
          Track your experience booking requests and vendor confirmations.
        </p>

        {bookings.length === 0 ? (
          /* ── Empty state ── */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">You have no bookings yet.</h2>
            <p className="text-gray-500 mb-6">Browse the marketplace to find amazing experiences and products.</p>
            <Link href="/marketplace">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Marketplace
              </button>
            </Link>
          </div>
        ) : (
          /* ── Bookings table ── */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Experience Name</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Vendor</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Date</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Time Slot</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Participants</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Status</th>
                    <th className="py-4 px-6 font-semibold text-sm text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className={`transition-colors ${booking.status === 'COMPLETED' ? 'bg-green-50/30' : 'hover:bg-gray-50/60'}`}
                    >
                      <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {booking.listing?.title || 'Unknown Experience'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {vendorName(booking)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {formatTimeSlot(booking)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{booking.guests}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(booking.status)}`}
                        >
                          {booking.status === 'COMPLETED' ? 'Payment Completed' : booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {booking.status === 'PENDING' && (
                          <span className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500 cursor-not-allowed">
                            Waiting for vendor
                          </span>
                        )}
                        {booking.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleProceedToCheckout(booking.id)}
                            className="inline-flex items-center rounded-lg bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]"
                          >
                            Proceed to Checkout
                          </button>
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
