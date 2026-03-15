'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/nextjs';

type CartItem = {
    id: number;
    listingId: number;
    quantity: number;
    listing: {
        title: string;
        priceMin: number;
        listingType: string;
        media: Array<{ mediaUrl: string }>;
        vendor: { businessName: string };
    } | null;
};

type CartContextType = {
    items: CartItem[];
    cartCount: number;
    addToCart: (listingId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    refreshCart: () => Promise<void>;
    isOpen: boolean;
    toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isSignedIn, user } = useUser();
    const userId = user?.id ?? null;
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

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
            if (response.ok) {
                const data = await response.json();
                setItems(data.items || []);
            }
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isSignedIn, userId]);

    const addToCart = async (listingId: number, quantity: number) => {
        if (!isSignedIn || !userId) {
            alert('Please log in to add items to cart');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': userId,
                },
                body: JSON.stringify({ listingId, quantity }),
            });

            if (response.ok) {
                await fetchCart();
                alert('Item added to cart!');
            } else {
                alert('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

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

    const toggleCart = () => setIsOpen(!isOpen);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                cartCount,
                addToCart,
                removeFromCart,
                refreshCart: fetchCart,
                isOpen,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
