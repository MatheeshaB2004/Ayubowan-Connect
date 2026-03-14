'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import toast from 'react-hot-toast';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Order = {
  id: number;
  itemName: string;
  vendorName: string;
  orderDate: string;
  amount: number;
  status: 'PAID' | 'COMPLETED';
};

/* ── Mock fallback – used ONLY when the API is completely unreachable ── */
const MOCK_ORDERS: Order[] = [
  { id: 1023, itemName: 'Pottery Workshop', vendorName: 'Lanka Crafts', orderDate: '2026-03-21', amount: 45, status: 'PAID' },
  { id: 1024, itemName: 'Batik Fabric', vendorName: 'Art Village', orderDate: '2026-03-22', amount: 18, status: 'PAID' },
  { id: 1025, itemName: 'Spice Garden Tour', vendorName: 'Hill Country Spices', orderDate: '2026-03-10', amount: 30, status: 'COMPLETED' },
];

export default function OrdersPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usedMock, setUsedMock] = useState(false);
  const hasFetched = useRef(false);

  const fetchOrders = useCallback(async (userId: string) => {
    const url = `${API_BASE}/orders`;
    console.log('Orders API URL:', url);
    console.log('User ID:', userId);

    try {
      const response = await fetch(url, {
        headers: { 'x-user-id': userId },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Orders response:', data);
        setOrders(data ?? []);
        setUsedMock(false);
      } else if (response.status === 404) {
        // 404 = no database user found for this Clerk ID → treat as empty orders
        console.log('No DB user / no orders found — showing empty state');
        setOrders([]);
        setUsedMock(false);
      } else {
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        toast.error('Failed to load orders', { id: 'orders-error' });
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      toast.error('Network error. Showing sample data.', { id: 'orders-error' });
      setOrders(MOCK_ORDERS);
      setUsedMock(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Wait until Clerk finishes loading
    if (!isLoaded) return;

    // User not signed in — stop loading
    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    // Prevent React Strict Mode double-fetch
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchOrders(user.id);
  }, [isLoaded, isSignedIn, user, fetchOrders]);

  /* ── Loading ── */
  if (!isLoaded || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center py-20 text-gray-400 text-base">
          <svg className="animate-spin h-5 w-5 mr-3 text-[#0d9488]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading orders…
        </div>
      </div>
    );
  }

  /* ── Unauthenticated ── */
  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500 py-20">
        Please sign in to view your orders.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">My Orders</h1>

      {usedMock && (
        <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
          Showing sample data — the orders API is currently unavailable.
        </div>
      )}

      {orders.length === 0 ? (
        /* ── Empty state ── */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">You have no completed orders yet.</p>
          <Link href="/marketplace">
            <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
              Browse Marketplace
            </button>
          </Link>
        </div>
      ) : (
        /* ── Orders table ── */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Order ID</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Item</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Vendor</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Amount</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-500 font-mono">
                      #{order.id.toString().padStart(6, '0')}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                      {order.itemName}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {order.vendorName}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-semibold">
                      LKR {order.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
