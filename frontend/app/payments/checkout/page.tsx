'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount, clearCart } = useCart();

  if (items.length === 0) {
    router.push('/payments/cart');
    return null;
  }

  const handlePay = () => {
    // simulate successful payment
    clearCart();
    router.push('/payments/success');
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h1>Checkout</h1>

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 8 }}>
          {item.listing.title} — Rs. {item.listing.priceMin}
        </div>
      ))}

      <hr />
      <p><strong>Total: Rs. {totalAmount}</strong></p>

      <button onClick={handlePay} style={{ marginTop: 16 }}>
        Pay Now
      </button>
    </div>
  );
}