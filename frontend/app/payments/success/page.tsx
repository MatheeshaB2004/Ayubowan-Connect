'use client';

import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your order has been placed successfully.</p>

      <Link href="/marketplace">
        <button style={{ marginTop: 16 }}>Back to Marketplace</button>
      </Link>
    </div>
  );
}