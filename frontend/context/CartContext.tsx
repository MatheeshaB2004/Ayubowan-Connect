'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';

/* =======================
   Types
======================= */

export type CartItem = {
    id: number;
    listingId: number;
    quantity: number;
    listing: {
        title: string;
        priceMin: number;
        listingType: 'PRODUCT' | 'EXPERIENCE';
        media: Array<{ mediaUrl: string }>;
        vendor: { businessName: string };
    };
};

type CartContextType = {
    items: CartItem[];
    cartCount: number;
    totalAmount: number;
    addToCart: (listingId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
    isOpen: boolean;
    toggleCart: () => void;
};

/* =======================
   Context
======================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

/* =======================
   Provider
======================= */

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isSignedIn, user } = useUser();
    const userId = user?.id ?? null;

    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    /* =======================
       Fetch Cart
    ======================= */

    const fetchCart = async () => {
        if (!isSignedIn || !userId) {
            setItems([]);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/cart`, {
                headers: {
                    'x-user-id': userId,
                },
            });

            if (!response.ok) {
                console.error('Failed to fetch cart');
                return;
            }

            const data = await response.json();
            setItems(data.items || []);
        } catch (error) {
            console.error('Fetch cart error:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isSignedIn, userId]);

    /* =======================
       Add to Cart
    ======================= */

    const addToCart = async (listingId: number, quantity = 1) => {
        if (!isSignedIn || !userId) {
            toast.error('Please log in to add items to cart');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId,
                },
                body: JSON.stringify({
                    listingId,
                    quantity,
                }),
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Add to cart failed:', response.status, text);
                return;
            }

            await fetchCart();
        } catch (error) {
            console.error('Cart error:', error);
        }
    };

    /* =======================
       Remove
    ======================= */

    const removeFromCart = async (itemId: number) => {
        if (!isSignedIn || !userId) return;

        try {
            await fetch(`${API_BASE}/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'x-user-id': userId,
                },
            });

            await fetchCart();
        } catch (error) {
            console.error('Error removing from cart', error);
        }
    };

    /* =======================
       Clear
    ======================= */

    const clearCart = async () => {
        if (!isSignedIn || !userId) return;

        try {
            await fetch(`${API_BASE}/cart`, {
                method: 'DELETE',
                headers: {
                    'x-user-id': userId,
                },
            });

            setItems([]);
        } catch (error) {
            console.error('Error clearing cart', error);
        }
    };

    /* =======================
       Derived values
    ======================= */

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalAmount = items.reduce(
        (sum, item) => sum + item.quantity * item.listing.priceMin,
        0
    );

    const toggleCart = () => setIsOpen((prev) => !prev);

    return (
        <CartContext.Provider
            value={{
                items,
                cartCount,
                totalAmount,
                addToCart,
                removeFromCart,
                clearCart,
                refreshCart: fetchCart,
                isOpen,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};