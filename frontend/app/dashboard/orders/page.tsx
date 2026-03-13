'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Order = {
  id: number;
  itemName: string;
  vendorName: string;
  orderDate: string;
  amount: number;
};

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
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user, isLoaded]);

  if (!isLoaded || isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading orders...</div>;
  }

  if (!isSignedIn) {
    return <div className="p-8 text-center text-gray-500">Please sign in to view your orders.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Purchase History</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500 mb-6">You haven't completed any purchases yet.</p>
          <Link href="/marketplace">
            <button className="btn-primary rounded-lg px-6 py-3 font-semibold text-white transition-all shadow-sm">
              Browse Marketplace
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Order ID</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Item Name</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Vendor</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Amount</th>
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
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-semibold">
                      LKR {order.amount.toLocaleString()}
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
