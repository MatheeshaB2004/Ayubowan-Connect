'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-10 max-w-md w-full text-center">

        {/* Success Icon */}
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

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Payment Successful
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-base mb-8 leading-relaxed">
          Your order has been placed successfully.
          <br />
          Thank you for shopping with us!
        </p>

        <Link href="/marketplace">
          <button className="w-full rounded-lg bg-[#0d9488] px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#0f766e]">
            Continue Shopping
          </button>
        </Link>

      </div>

    </div>
  );
}