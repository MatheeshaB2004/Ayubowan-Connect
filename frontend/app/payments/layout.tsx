'use client';

import { CartProvider } from '@/context/CartContext';

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}