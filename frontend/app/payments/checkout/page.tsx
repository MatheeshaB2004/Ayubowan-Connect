'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';


export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();

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
    if (!expiry.match(/^\d{2}\/\d{2}$/)) newErrors.expiry = 'Expiry must be in MM/YY format';
    if (cvv.length !== 3) newErrors.cvv = 'CVV must be exactly 3 digits';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await clearCart();

    router.push('/payments/success');
  };

  const inputBase =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Back to Cart */}
        <Link
          href="/payments/cart"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 transition-colors mb-6"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          ← Back to Cart
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          Checkout
        </h1>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
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
                    {item.listing.title}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${item.listing.listingType === 'EXPERIENCE'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                      }`}>
                      {item.listing.listingType}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Qty: {item.quantity}
                  </p>

                  {item.listing.listingType === "EXPERIENCE" && (
                    <div className="mt-1.5 space-y-0.5">
                      <p className="text-sm text-green-600 font-medium">
                        Status: Approved
                      </p>
                      <p className="text-sm text-gray-500">
                        Booking Date: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                <p className="font-medium text-gray-700">
                  LKR {(item.quantity * item.listing.priceMin).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-5 pt-4 border-t border-gray-200 font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>LKR {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* PAYMENT FORM */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
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
                <p className="text-sm text-red-600">{errors.cardName}</p>
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
                <p className="text-sm text-red-600">{errors.cardNumber}</p>
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
                  <p className="text-sm text-red-600">{errors.expiry}</p>
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
                  <p className="text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>

            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              className="w-full rounded-lg bg-green-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-green-700"
            >
              Pay Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}