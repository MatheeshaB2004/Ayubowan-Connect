'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type DirectBooking = {
  id: number;
  guests: number;
  slot?: { startTime?: string; endTime?: string } | null;
  listing?: {
    title?: string;
    priceMin?: number;
    listingType?: string;
    vendor?: { businessName?: string };
  } | null;
};

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const bookingIdParam = searchParams.get('bookingId');
  const directBookingId = bookingIdParam ? Number(bookingIdParam) : null;

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [directBooking, setDirectBooking] = useState<DirectBooking | null>(null);
  const [errors, setErrors] = useState<{
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  }>({});

  useEffect(() => {
    if (!user || !directBookingId || Number.isNaN(directBookingId)) return;

    const fetchDirectBooking = async () => {
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          headers: { 'x-user-id': user.id },
        });
        if (!response.ok) return;
        const data = await response.json();
        const booking = (data ?? []).find((b: { id: number }) => b.id === directBookingId);
        setDirectBooking(booking ?? null);
      } catch (error) {
        console.error('Failed loading booking for checkout:', error);
      }
    };

    fetchDirectBooking();
  }, [user, directBookingId]);

  const formatTime = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return null;
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatTimeSlot = (startTime?: string, endTime?: string) => {
    if (!startTime || !endTime) return '-';
    const start = formatTime(startTime);
    const end = formatTime(endTime);
    if (!start || !end) return '-';
    return `${start} – ${end}`;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d/]/g, '');
    const parts = value.split('/');
    if (parts.length > 2) value = parts[0] + '/' + parts.slice(1).join('');
    if (value.length === 2 && !value.includes('/') && expiry.length < 2) value += '/';
    setExpiry(value.slice(0, 5));
  };

  const handlePay = async () => {
    const newErrors: typeof errors = {};

    if (!cardName) newErrors.cardName = 'Cardholder name is required';
    if (cardNumber.length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    } else {
      const [monthStr, yearStr] = expiry.split('/');
      const expiryMonth = parseInt(monthStr, 10);
      const expiryYear = 2000 + parseInt(yearStr, 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      if (expiryMonth < 1 || expiryMonth > 12) {
        newErrors.expiry = 'Month must be between 01 and 12';
      } else if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }
    if (cvv.length !== 3) newErrors.cvv = 'CVV must be exactly 3 digits';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      if (firstError) toast.error(firstError);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (user && directBooking) {
      try {
        const response = await fetch(`${API_BASE}/bookings/${directBooking.id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user.id,
          },
          body: JSON.stringify({ status: 'COMPLETED' }),
        });
        if (!response.ok) {
          toast.error('Failed to complete booking payment');
          return;
        }
      } catch (error) {
        console.error('Direct booking checkout error:', error);
        toast.error('Failed to complete booking payment');
        return;
      }

      router.push(`/payments/success?bookingId=${directBooking.id}`);
      return;
    }

    if (user) {
      for (const item of items) {
        try {
          if (item.bookingId) {
            await fetch(`${API_BASE}/bookings/${item.bookingId}/status`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'x-user-id': user.id,
              },
              body: JSON.stringify({ status: 'COMPLETED' }),
            });
          } else {
            const res = await fetch(`${API_BASE}/bookings`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-user-id': user.id,
              },
              body: JSON.stringify({
                listingId: item.listingId,
                date: new Date().toISOString(),
                participants: item.quantity,
                notes: 'Paid via checkout',
              }),
            });

            if (res.ok) {
              const booking = await res.json();
              await fetch(`${API_BASE}/bookings/${booking.id}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-id': user.id,
                },
                body: JSON.stringify({ status: 'CONFIRMED' }),
              });
            }
          }
        } catch (err) {
          console.error('Checkout booking error:', err);
        }
      }
    }

    await clearCart();
    router.push('/payments/success');
  };

  const inputBase =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-[#0d9488] focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30';
  const payableAmount = directBooking
    ? (directBooking.listing?.priceMin ?? 0) * (directBooking.guests ?? 1)
    : totalAmount;

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {!directBookingId && (
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-green-700 mb-6"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Marketplace
          </Link>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-100">
            {directBooking ? (
              (() => {
                const listing = directBooking.listing;
                const listingType = listing?.listingType ?? 'EXPERIENCE';
                const vendorName = listing?.vendor?.businessName ?? 'Vendor';
                const basePrice = listing?.priceMin ?? 0;
                const guests = directBooking.guests ?? 1;
                const totalPrice = basePrice * guests;
                const slotText = formatTimeSlot(directBooking.slot?.startTime, directBooking.slot?.endTime);
                return (
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <p className="font-medium text-gray-900">{listing?.title ?? 'Experience'}</p>
                      <p className="text-sm text-gray-600 mt-1">{vendorName}</p>
                      <p className="text-sm text-gray-600 mt-1">Qty: {guests}</p>
                      <p className="text-sm text-gray-600 mt-1">Time Slot: {slotText}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#21a17a]">LKR {totalPrice.toLocaleString()}</p>
                  </div>
                );
              })()
            ) : (
              items.map((item) => {
                const listing = item.listing ?? item.booking?.listing;
                const vendorName = listing?.vendor?.businessName ?? 'Vendor';
                const basePrice = listing?.priceMin ?? 0;
                const guests = item.booking?.guests ?? item.quantity ?? 1;
                const totalPrice = basePrice * guests;
                const slotText = formatTimeSlot(item.booking?.slot?.startTime, item.booking?.slot?.endTime);
                return (
                  <div key={item.id} className="flex justify-between items-center py-4">
                    <div>
                      <p className="font-medium text-gray-900">{listing?.title ?? 'Experience'}</p>
                      <p className="text-sm text-gray-600 mt-1">{vendorName}</p>
                      <p className="text-sm text-gray-600 mt-1">Qty: {guests}</p>
                      <p className="text-sm text-gray-600 mt-1">Time Slot: {slotText}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#21a17a]">LKR {totalPrice.toLocaleString()}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name</label>
              <input
                className={`${inputBase} ${errors.cardName ? 'border-red-400' : ''}`}
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => {
                  setCardName(e.target.value);
                  if (errors.cardName) setErrors((prev) => ({ ...prev, cardName: undefined }));
                }}
              />
              {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
              <input
                className={`${inputBase} ${errors.cardNumber ? 'border-red-400' : ''}`}
                placeholder="1234567890123456"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16));
                  if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: undefined }));
                }}
              />
              {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                <input
                  className={`${inputBase} ${errors.expiry ? 'border-red-400' : ''}`}
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => {
                    handleExpiryChange(e);
                    if (errors.expiry) setErrors((prev) => ({ ...prev, expiry: undefined }));
                  }}
                />
                {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                <input
                  className={`${inputBase} ${errors.cvv ? 'border-red-400' : ''}`}
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
                    if (errors.cvv) setErrors((prev) => ({ ...prev, cvv: undefined }));
                  }}
                />
                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Total Amount</h2>
          <div className="flex justify-between items-center py-4 border-y border-gray-100 mb-4">
            <span className="text-sm text-gray-600">Amount to pay</span>
            <span className="text-xl font-bold text-[#21a17a]">LKR {payableAmount.toLocaleString()}</span>
          </div>
          <button
            onClick={handlePay}
            className="w-full rounded-xl bg-[#0d9488] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]"
          >
            Pay LKR {payableAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}