'use client';

import React, { useEffect, useState } from 'react';
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

/* ── Mock data used when the /orders endpoint is not yet available ── */
const MOCK_ORDERS: Order[] = [
  {
    id: 1023,
    itemName: 'Pottery Workshop',
    vendorName: 'Lanka Crafts',
    orderDate: '2026-03-21',
    amount: 45,
    status: 'PAID',
  },
  {
    id: 1024,
    itemName: 'Batik Fabric',
    vendorName: 'Art Village',
    orderDate: '2026-03-22',
    amount: 18,
    status: 'PAID',
  },
  {
    id: 1025,
    itemName: 'Spice Garden Tour',
    vendorName: 'Hill Country Spices',
    orderDate: '2026-03-10',
    amount: 30,
    status: 'COMPLETED',
  },
];

export default function OrdersPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_BASE}/orders`, {
          headers: {
            'x-user-id': user.id,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data || []);
        } else {
          toast.error('Failed to load orders');
          // Fall back to mock data so the page still renders
          setOrders(MOCK_ORDERS);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
        // Fall back to mock data so the page still renders
        setOrders(MOCK_ORDERS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user, isLoaded]);

  /* ── Loading state ── */
  if (!isLoaded || isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading orders...</div>;
  }

  /* ── Unauthenticated state ── */
  if (!isSignedIn) {
    return <div className="p-8 text-center text-gray-500">Please sign in to view your orders.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">My Orders</h1>

      {orders.length === 0 ? (
        /* ── Empty state ── */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">You have no completed orders yet.</p>
          <Link href="/marketplace">
            <button className="btn-primary rounded-lg px-6 py-3 font-semibold text-white transition-all shadow-sm">
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
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
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
                      ${order.amount.toLocaleString()}
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
