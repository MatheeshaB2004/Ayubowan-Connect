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
  <div className="payments-page">
    <div className="payments-container">

      <div className="payments-header">
        <h1>Checkout</h1>
        <p>Confirm your booking details</p>
      </div>

      <div className="payments-card">
        <form className="checkout-form">
          {/* your existing inputs */}

          <button type="submit" className="btn-primary">
            Confirm Booking
          </button>
        </form>
      </div>

    </div>
  </div>
);
}