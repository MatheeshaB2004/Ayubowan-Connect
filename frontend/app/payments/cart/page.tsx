'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart } = useCart();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.listing.priceMin,
    0
  );

  if (items.length === 0) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Your cart is empty</h2>
        <Link href="/marketplace">Go to Marketplace</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Cart</h1>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            gap: '1rem',
            borderBottom: '1px solid #ddd',
            padding: '1rem 0',
          }}
        >
          <Image
            src={item.listing.media?.[0]?.mediaUrl || '/assets/photos/B4.webp'}
            alt={item.listing.title}
            width={100}
            height={80}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.listing.title}</h3>
            <p>Vendor: {item.listing.vendor.businessName}</p>
            <p>Type: {item.listing.listingType}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: LKR {item.listing.priceMin}</p>
          </div>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: LKR {totalAmount.toLocaleString()}</h2>

      <Link href="/payments/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}