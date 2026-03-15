'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect, useMemo, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Booking = {
  id: number;
  guests: number;
  totalPrice: number;
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

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();
  const { user } = useUser();
  const searchParams = useSearchParams();
  const bookingIdParam = searchParams.get('bookingId');
  const bookingId = bookingIdParam ? Number(bookingIdParam) : null;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!user || !bookingId || Number.isNaN(bookingId)) return;

    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          headers: { 'x-user-id': user.id },
        });
        if (!response.ok) {
          setBooking(null);
          return;
        }
        const data: Booking[] = await response.json();
        const matched = (data ?? []).find((b) => b.id === bookingId) ?? null;
        setBooking(matched);
      } catch (error) {
        console.error('Failed to load booking confirmation details:', error);
        setBooking(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [user, bookingId]);

  const vendorName = useMemo(
    () => booking?.vendor?.businessName ?? booking?.listing?.vendor?.businessName ?? 'Unknown Vendor',
    [booking],
  );

  const formatTime = (value?: string) => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    const hours = parsed.getUTCHours();
    const minutes = parsed.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formattedSlot = useMemo(() => {
    if (!booking?.slot?.startTime || !booking.slot?.endTime) return '-';
    const start = formatTime(booking.slot.startTime);
    const end = formatTime(booking.slot.endTime);
    if (!start || !end) return '-';
    return `${start} – ${end}`;
  }, [booking]);

  const formattedDate = useMemo(() => {
    if (!booking?.slot?.startTime) return '-';
    const parsed = new Date(booking.slot.startTime);
    if (Number.isNaN(parsed.getTime())) return '-';
    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [booking]);

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-green-600 text-center mb-2">
            Payment Successful
          </h1>
          <p className="text-sm text-gray-600 text-center mb-6">
            Your order has been completed.
          </p>

          {isLoading ? (
            <p className="text-sm text-gray-600 text-center py-4">Loading order summary…</p>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              {booking ? (
                <div className="space-y-0">
                  <div className="py-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{booking.listing?.title ?? 'Experience'}</p>
                    <p className="text-sm text-gray-600 mt-1">Vendor: {vendorName}</p>
                  </div>
                  <div className="py-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Date: {formattedDate}</p>
                    <p className="text-sm text-gray-600 mt-1">Time Slot: {formattedSlot}</p>
                    <p className="text-sm text-gray-600 mt-1">Guests: {booking.guests}</p>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Paid</span>
                    <span className="text-xl font-bold text-[#21a17a]">LKR {booking.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 py-4">Payment record is confirmed.</p>
              )}
            </div>
          )}

          <div className="mt-6 grid gap-3">
            <Link href="/dashboard/upcoming">
              <button className="w-full rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                View Upcoming Experiences
              </button>
            </Link>
            <Link href="/dashboard/orders">
              <button className="w-full rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                View Orders
              </button>
            </Link>
            <Link href="/marketplace">
              <button className="w-full rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Back to Marketplace
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}