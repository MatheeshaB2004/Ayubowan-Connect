'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, totalAmount } = useCart();

  return (
    <div className="page-container">
      <h1 className="section-title">Your Cart</h1>

      {items.length === 0 ? (
        <div className="no-results">
          <p>Your cart is empty.</p>
          <Link href="/marketplace">
            <button className="btn-primary mt-4">Browse Marketplace</button>
          </Link>
        </div>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="card mb-4">
              <h3>{item.listing.title}</h3>
              <p className="text-muted">
                {item.listing.vendor?.businessName ?? 'Vendor'}
              </p>
              <p className="mt-2">
                LKR {item.listing.priceMin} × {item.quantity}
              </p>

              <button
                className="btn-outline mt-3"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="divider" />

          <div className="flex justify-between items-center">
            <strong>Total: LKR {totalAmount}</strong>
            <Link href="/payments/checkout">
              <button className="btn-primary">Proceed to Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}