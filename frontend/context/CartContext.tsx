'use client';

import React, { createContext, useContext, useState } from 'react';

/* =======================
   TYPES (TOP LEVEL ONLY)
   ======================= */

export type CartListingSnapshot = {
  id: number;
  title: string;
  priceMin: number;
  vendor?: {
    businessName?: string;
  };
  media: { mediaUrl: string }[];
};

export type CartItem = {
  id: string;
  listingId: number;
  quantity: number;
  listingType: 'EXPERIENCE' | 'PRODUCT';
  listing: CartListingSnapshot;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
};

/* =======================
   CONTEXT
   ======================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =======================
   PROVIDER
   ======================= */

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...item,
      },
    ]);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.listing.priceMin * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =======================
   HOOK
   ======================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};