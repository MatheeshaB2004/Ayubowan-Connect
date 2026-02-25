'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>

        <Link
          href="/marketplace"
          className="inline-block mt-4 text-teal-600 underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="border rounded p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-medium">
              {item.listing.title}
            </p>

            <p className="text-sm text-gray-500">
              {item.listing.vendor?.businessName ?? 'Unknown vendor'}
            </p>

            <p className="mt-1">
              Rs. {item.listing.priceMin.toLocaleString()} × {item.quantity}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: Rs. {totalAmount.toLocaleString()}
        </p>

        <Link href="/payments/checkout">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}