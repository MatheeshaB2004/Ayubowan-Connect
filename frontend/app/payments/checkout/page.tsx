'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { totalAmount, clearCart } = useCart();

  const handlePayment = async () => {
    // Simulated payment – no real gateway
    await new Promise((resolve) => setTimeout(resolve, 1000));

    clearCart();
    router.push('/payments/success');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Card Payment</h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Card Number"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="CVV"
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        onClick={handlePayment}
        className="w-full mt-6 bg-green-600 text-white py-2 rounded"
      >
        Pay Rs. {totalAmount}
      </button>
    </div>
  );
}