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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-xl w-full">

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 ring-4 ring-green-100">
          <svg
            className="h-12 w-12 text-green-500"
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

        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight text-center">
          {booking ? 'Booking Confirmed' : 'Payment Successful'}
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-500 mb-8">Loading booking details…</p>
        ) : booking ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 mb-8 space-y-3">
            <p className="text-lg font-semibold text-gray-900">{booking.listing?.title ?? 'Experience'}</p>
            <p className="text-sm text-gray-600">Vendor: {vendorName}</p>
            <p className="text-sm text-gray-600">Date: {formattedDate}</p>
            <p className="text-sm text-gray-600">Time: {formattedSlot}</p>
            <p className="text-sm text-gray-600">Guests: {booking.guests}</p>
            <p className="text-base font-semibold text-[#21a17a]">Total Paid: LKR {booking.totalPrice.toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-base mb-8 leading-relaxed text-center">
            Your payment was completed successfully.
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/dashboard/upcoming">
            <button className="w-full rounded-xl bg-[#0d9488] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
              View Upcoming Experiences
            </button>
          </Link>

          <Link href="/dashboard/bookings">
            <button className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]">
              Go to Dashboard
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}