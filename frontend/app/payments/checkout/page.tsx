'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCart();
  const router = useRouter();

  // ✅ Redirect safely after render
  useEffect(() => {
    if (items.length === 0) {
      router.replace('/payments/cart');
    }
  }, [items, router]);

  if (items.length === 0) {
    return null; // render nothing while redirecting
  }

  const handlePayment = () => {
    // simulate successful payment
    clearCart();
    router.push('/payments/success');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="border rounded p-4 mb-6">
        <h2 className="font-medium mb-2">Order Summary</h2>

        {items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.listing.title}</span>
            <span>LKR {item.listing.priceMin}</span>
          </div>
        ))}

        <hr className="my-3" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>LKR {totalAmount}</span>
        </div>
      </div>

      <div className="border rounded p-4 mb-6">
        <h2 className="font-medium mb-4">Card Details</h2>

        <input
          placeholder="Card Number"
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          placeholder="Name on Card"
          className="border p-2 w-full mb-3 rounded"
        />

        <div className="flex gap-3">
          <input
            placeholder="MM/YY"
            className="border p-2 w-1/2 rounded"
          />
          <input
            placeholder="CVV"
            className="border p-2 w-1/2 rounded"
          />
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white w-full py-3 rounded font-semibold"
      >
        Pay Now
      </button>
    </div>
  );
}