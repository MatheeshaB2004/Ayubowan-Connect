'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './Cart.css';

export default function CartPage() {
    const { items, removeFromCart, cartCount } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        return (
            <div className="cart-login-container">
                <h1 className="login-title">Please Log In</h1>
                <p>You need to be logged in to view your cart.</p>
                <Link href="/" className="login-link">Go Home</Link>
            </div>
        );
    }

    const handleItemCheckout = (item: any) => {
        const typePath = item.listing.listingType === 'EXPERIENCE' ? 'experiences' : 'products';
        router.push(`/marketplace/${typePath}/${item.listingId}`);
    };

    return (
        <div className="cart-container">
            <h1 className="cart-page-title">
                <ShoppingBag /> Your Cart ({cartCount} items)
            </h1>

            {items.length === 0 ? (
                <div className="empty-cart-container">
                    <p className="empty-cart-text">Your cart is empty.</p>
                    <Link href="/marketplace" className="continue-shopping-btn">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-items-wrapper">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item-card">
                            <div className="cart-item-image-wrapper">
                                {item.listing.media[0] ? (
                                    <Image
                                        src={item.listing.media[0].mediaUrl}
                                        alt={item.listing.title}
                                        fill
                                        className="cart-item-image"
                                    />
                                ) : (
                                    <div className="cart-item-placeholder"></div>
                                )}
                            </div>

                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.listing.title}</h3>
                                <p className="cart-item-vendor">{item.listing.vendor ? item.listing.vendor.businessName : 'Unknown Vendor'}</p>
                                <p className="cart-item-price">LKR {item.listing.priceMin.toLocaleString()}</p>
                                <div className="cart-item-qty">Qty: {item.quantity}</div>
                            </div>

                            <div className="cart-item-actions">
                                <button
                                    onClick={() => handleItemCheckout(item)}
                                    className="checkout-btn"
                                >
                                    Proceed to Checkout
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="remove-btn"
                                >
                                    <Trash2 size={16} /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
