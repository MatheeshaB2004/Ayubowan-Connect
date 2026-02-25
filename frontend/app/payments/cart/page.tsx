'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Cart</h1>
        <p>Your cart is empty.</p>
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
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.vendorName}</p>
            <p className="mt-1">Rs. {item.price}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Total: Rs. {totalAmount}</p>

        <Link href="/payments/checkout">
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}