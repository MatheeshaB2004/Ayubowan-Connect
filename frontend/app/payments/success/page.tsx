'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  // ensure cart is cleared after successful payment
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <svg
            className="h-10 w-10 text-green-500"
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

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Your order has been placed successfully.<br />
          Thank you for shopping with us!
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">

          <Link href="/marketplace">
            <button className="w-full rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500/50">
              Back to Marketplace
            </button>
          </Link>

          <Link href="/payments/cart">
            <button className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300/50">
              View Cart
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}