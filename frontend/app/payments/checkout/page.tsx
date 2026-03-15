'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();
  const { user } = useUser();

  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [errors, setErrors] = useState<{
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  }>({});

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^\d/]/g, '');

    const parts = value.split('/');
    if (parts.length > 2) {
      value = parts[0] + '/' + parts.slice(1).join('');
    }

    if (value.length === 2 && !value.includes('/') && expiry.length < 2) {
      value = value + '/';
    }

    value = value.slice(0, 5);

    setExpiry(value);
  };

  const handlePay = async () => {
    const newErrors: typeof errors = {};

    if (!cardName) newErrors.cardName = 'Cardholder name is required';
    if (cardNumber.length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    } else {
      // Validate expiry date is not in the past
      const [monthStr, yearStr] = expiry.split('/');
      const expiryMonth = parseInt(monthStr, 10);
      const expiryYear = 2000 + parseInt(yearStr, 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1; // 1-indexed
      const currentYear = now.getFullYear();

      if (expiryMonth < 1 || expiryMonth > 12) {
        newErrors.expiry = 'Month must be between 01 and 12';
      } else if (expiryYear < currentYear) {
        newErrors.expiry = 'Card has expired';
      } else if (expiryYear === currentYear && expiryMonth < currentMonth) {
        newErrors.expiry = 'Card has expired';
      }
    }
    if (cvv.length !== 3) newErrors.cvv = 'CVV must be exactly 3 digits';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Show a toast for the first error found
      const firstError = Object.values(newErrors)[0];
      if (firstError) toast.error(firstError);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (user) {
      for (const item of items) {
        try {
          if (item.bookingId) {
            // Experience booking already exists — mark as COMPLETED
            await fetch(`${API_BASE}/bookings/${item.bookingId}/status`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'x-user-id': user.id,
              },
              body: JSON.stringify({ status: 'COMPLETED' }),
            });
            console.log(`Updated booking ${item.bookingId} to COMPLETED`);
          } else {
            // Product/regular item — create a new CONFIRMED booking
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
              console.log(`Created booking ${booking.id} for listing ${item.listingId}`);

              // Immediately mark as CONFIRMED (paid)
              await fetch(`${API_BASE}/bookings/${booking.id}/status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'x-user-id': user.id,
                },
                body: JSON.stringify({ status: 'CONFIRMED' }),
              });
            } else {
              console.error('Failed to create booking:', await res.text());
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

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4">

      <div className="max-w-2xl mx-auto">

        {/* Back to Cart */}
        <Link
          href="/payments/cart"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98] mb-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Cart
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          Checkout
        </h1>

        {/* ORDER SUMMARY */}
        <div className="bg-[#e8f5f2] rounded-lg shadow-sm border border-[#cfe7e1] p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.listing?.title ?? item.booking?.listing?.title ?? 'Experience'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.listing?.vendor?.businessName ??
                      item.booking?.listing?.vendor?.businessName ??
                      'Unknown Vendor'}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${(item.listing?.listingType ?? item.booking?.listing?.listingType) === 'EXPERIENCE'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'
                      }`}>
                      {item.listing?.listingType ?? item.booking?.listing?.listingType ?? 'EXPERIENCE'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>

                  {(item.listing?.listingType ?? item.booking?.listing?.listingType) === 'EXPERIENCE' && (
                    <div className="mt-1.5 space-y-0.5">
                      <p className="text-sm text-[#21a17a] font-medium">
                        Status: Approved
                      </p>

                      <p className="text-sm text-gray-500">
                        Booking Date: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <p className="font-medium text-[#21a17a]">
                  LKR {(item.quantity *
                    (item.listing?.priceMin ?? item.booking?.listing?.priceMin ?? 0)
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-5 pt-4 border-t border-[#cfe7e1] font-bold text-lg text-[#21a17a]">
            <span>Total</span>
            <span>LKR {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* PAYMENT FORM */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Payment Details
          </h2>

          <div className="space-y-5">

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Cardholder Name
              </label>
              <input
                className={`${inputBase} ${errors.cardName ? 'border-red-400' : ''}`}
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => {
                  setCardName(e.target.value);
                  if (errors.cardName)
                    setErrors((prev) => ({ ...prev, cardName: undefined }));
                }}
              />
              {errors.cardName && (
                <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Card Number
              </label>
              <input
                className={`${inputBase} ${errors.cardNumber ? 'border-red-400' : ''}`}
                placeholder="1234567890123456"
                value={cardNumber}
                onChange={(e) => {
                  setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16));
                  if (errors.cardNumber)
                    setErrors((prev) => ({ ...prev, cardNumber: undefined }));
                }}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
              )}
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expiry Date
                </label>
                <input
                  className={`${inputBase} ${errors.expiry ? 'border-red-400' : ''}`}
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => {
                    handleExpiryChange(e);
                    if (errors.expiry)
                      setErrors((prev) => ({ ...prev, expiry: undefined }));
                  }}
                />
                {errors.expiry && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  CVV
                </label>
                <input
                  className={`${inputBase} ${errors.cvv ? 'border-red-400' : ''}`}
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => {
                    setCvv(e.target.value.replace(/\D/g, '').slice(0, 3));
                    if (errors.cvv)
                      setErrors((prev) => ({ ...prev, cvv: undefined }));
                  }}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>

            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full rounded-xl bg-[#0d9488] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]"
            >
              Pay Now — LKR {totalAmount.toLocaleString()}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}