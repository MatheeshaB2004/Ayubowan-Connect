'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const API_BASE = API_BASE_URL;

type Booking = {
  id: number;
  listingId: number;
  bookingDate: string;
  updatedAt: string;
  quantity?: number;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;
  listing?: {
    title: string;
    priceMin?: number;
    listingType?: string;
    vendor?: { businessName?: string };
  } | null;
  booking?: {
    guests?: number;
    listing?: {
      title?: string;
      priceMin?: number;
      listingType?: string;
      vendor?: { businessName?: string };
    } | null;
  } | null;
  vendor?: { businessName?: string };
  slot?: {
    startTime?: string;
    endTime?: string;
  } | null;
};

type Event = {
  id: number;
  title: string;
  startDate: string;
  time: string;
  location: string;
  price?: number;
  isFree: boolean;
  registrationDate?: string;
  vendor?: {
    businessName?: string;
  };
};

export default function OrdersPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Booking[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchOrders = useCallback(async (userId: string) => {
    try {
      // Fetch bookings
      const response = await fetch(`${API_BASE}/bookings`, {
        headers: { 'x-user-id': userId },
      });

      if (response.ok) {
        const data: Booking[] = await response.json();
        const orderItems = (data ?? []).filter(
          (b) => {
            const listingType = (b.listing?.listingType ?? b.booking?.listing?.listingType ?? '').toUpperCase();
            return b.status === 'COMPLETED' || (b.status === 'CONFIRMED' && listingType === 'PRODUCT');
          },
        );
        setOrders(orderItems);
      } else if (response.status === 404) {
        setOrders([]);
      } else {
        console.error('Server error:', response.status, await response.text());
      }

      // Fetch events
      const eventsResponse = await fetch(`${API_BASE}/events/user/registered`, {
        headers: { 'x-user-id': userId },
      });

      if (eventsResponse.ok) {
        const eventsData: Event[] = await eventsResponse.json();
        setEvents(eventsData ?? []);
      } else {
        console.error('Failed to fetch events');
        setEvents([]);
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchOrders(user.id);
  }, [isLoaded, isSignedIn, user, fetchOrders]);

  /* ── Helpers ── */
  const getListing = (order: Booking) =>
    order.listing ?? order.booking?.listing ?? null;

  const getListingType = (order: Booking) =>
    (getListing(order)?.listingType ?? '').toUpperCase();

  const isProductOrder = (order: Booking) => getListingType(order) === 'PRODUCT';
  const isExperienceOrder = (order: Booking) => !isProductOrder(order);

  const experienceOrders = orders.filter(isExperienceOrder);
  const productOrders = orders.filter(isProductOrder);

  const vendorName = (b: Booking) =>
    b.vendor?.businessName ?? getListing(b)?.vendor?.businessName ?? 'Unknown Vendor';

  const formatDate = (value?: string) => {
    if (!value) return '-';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '-';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(parsed);
  };

  const formatTime = (dateString: string) => {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return null;
    const hours = parsed.getUTCHours();
    const minutes = parsed.getUTCMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatTimeSlot = (order: Booking) => {
    if (!order.slot?.startTime || !order.slot?.endTime) return '-';
    const start = formatTime(order.slot.startTime);
    const end = formatTime(order.slot.endTime);
    if (!start || !end) return '-';
    return `${start} – ${end}`;
  };

  const formatExperienceDate = (order: Booking) =>
    order.slot?.startTime ? formatDate(order.slot.startTime) : '-';

  const getProductQuantity = (order: Booking) =>
    order.quantity ?? order.booking?.guests ?? order.guests ?? 1;

  const getProductTotal = (order: Booking) => {
    const listing = getListing(order);
    const computed = (listing?.priceMin ?? 0) * getProductQuantity(order);
    return computed > 0 ? computed : order.totalPrice;
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      UPCOMING: 'bg-blue-100 text-blue-700',
      COMPLETED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-gray-200 text-gray-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      CONFIRMED: 'bg-blue-100 text-blue-700',
      REJECTED: 'bg-red-100 text-red-700',
    };
    return map[status.toUpperCase()] ?? 'bg-gray-100 text-gray-700';
  };

  const getDisplayStatus = (order: Booking) => {
    if (isProductOrder(order) && order.status === 'CONFIRMED') return 'COMPLETED';
    return order.status.toUpperCase();
  };

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
    <div className="min-h-screen bg-[#f9fafb]">
      <DashboardTabs />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h2>
          <p className="text-gray-600 mt-2">
            View your completed purchases and booking history.
          </p>
        </div>

        {orders.length === 0 && events.length === 0 ? (
          /* ── Empty state ── */
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders or events yet.</h2>
            <p className="text-gray-500 mb-6">Explore experiences, products, or events to make your first booking, purchase, or registration.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/marketplace">
                <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                  Browse Marketplace
                </button>
              </Link>
              <Link href="/events">
                <button className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.98]">
                  Browse Events
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {experienceOrders.length > 0 && (
              <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience Orders</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="table-auto w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Experience Name</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Vendor</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Scheduled Experience Date</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Time Slot</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Participants</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Date</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Price</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {experienceOrders.map((order) => {
                        const listing = getListing(order);
                        return (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                              {listing?.title ?? 'Unknown Experience'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {vendorName(order)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {formatExperienceDate(order)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {formatTimeSlot(order)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {order.guests} {order.guests === 1 ? 'Guest' : 'Guests'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {formatDate(order.updatedAt)}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#21a17a] font-semibold">
                              LKR {order.totalPrice.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadge(getDisplayStatus(order))}`}>
                                {getDisplayStatus(order).toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {productOrders.length > 0 && (
              <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Orders</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="table-auto w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Product Name</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Vendor</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Quantity</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Date</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Price</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productOrders.map((order) => {
                        const listing = getListing(order);
                        const quantity = getProductQuantity(order);
                        return (
                          <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                              {listing?.title ?? 'Unknown Product'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {vendorName(order)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              Qty: {quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {formatDate(order.updatedAt)}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#21a17a] font-semibold">
                              LKR {getProductTotal(order).toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${statusBadge(getDisplayStatus(order))}`}>
                                {getDisplayStatus(order).toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Event Orders Section */}
            {events.filter(event => event.price && event.price > 0).length > 0 && (
              <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Orders</h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="table-auto w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Event Name</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Date</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Time</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Location</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Date</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Price</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Payment Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {events.filter(event => event.price && event.price > 0).map((event) => (
                        <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                            {event.title}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {event.time}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {event.location}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {formatDate(event.registrationDate)}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#21a17a] font-semibold">
                            {event.price ? `LKR ${event.price.toLocaleString()}` : 'FREE'}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                              COMPLETED
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
        )}
      </div>
    </div>
  );
}
