'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <div className="payments-page">
        <div className="payments-container">
          <div className="payments-header">
            <h1>Your Cart</h1>
            <p>Your cart is currently empty</p>
          </div>

          <div className="payments-card" style={{ textAlign: 'center' }}>
            <Link href="/marketplace">
              <button className="btn-primary">Explore Marketplace</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payments-page">
      <div className="payments-container">
        <div className="payments-header">
          <h1>Your Cart</h1>
          <p>Review the experiences and products you’ve selected</p>
        </div>

        <div className="payments-card">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.listing?.title}</h3>
                <span>{item.listing?.vendor?.businessName ?? 'Vendor'}</span>
              </div>

              <div>
                <p className="cart-item-price">
                  LKR {item.listing?.priceMin}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-remove"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="payments-summary">
            <span>Total</span>
            <span>LKR {totalAmount}</span>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <Link href="/payments/checkout">
              <button className="btn-primary">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}