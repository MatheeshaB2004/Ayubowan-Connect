'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type Booking = {
  id: number;
  listingId: number;
  bookingDate: string;
  guests: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  totalPrice: number;
  listing: {
    title: string;
  };
};

export default function BookingsPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { addToCart } = useCart();
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_BASE}/bookings`, {
          headers: {
            'x-user-id': user.id,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data || []);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isSignedIn, user, isLoaded]);

  const handlePayNow = async (bookingId: number) => {
    toast.success('Adding to cart...');
    try {
        await addToCart(null, 1, bookingId);
        router.push('/payments/cart');
    } catch (err) {
        toast.error('Failed to add booking to cart');
    }
  };

  if (!isLoaded || isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;
  }

  if (!isSignedIn) {
    return <div className="p-8 text-center text-gray-500">Please sign in to view your bookings.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h2>
          <p className="text-gray-500 mb-6">You haven't requested any experiences yet.</p>
          <Link href="/marketplace">
            <button className="btn-primary rounded-lg px-6 py-3 font-semibold text-white transition-all shadow-sm">
              Explore Experiences
            </button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Experience</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Date</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Participants</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700">Status</th>
                  <th className="py-4 px-6 font-semibold text-sm text-gray-700 pl-8">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                      {booking.listing?.title || 'Unknown Experience'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {booking.guests}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${booking.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        {booking.status.toLowerCase()}
                      </span>
                    </td>
                    <td className="py-4 px-6 pl-8">
                      {booking.status === 'PENDING' && (
                        <span className="text-sm text-gray-500 italic">Waiting for vendor approval</span>
                      )}
                      {booking.status === 'APPROVED' && (
                        <button
                          onClick={() => handlePayNow(booking.id)}
                          className="btn-book-now text-sm px-4 py-2"
                        >
                          Pay Now
                        </button>
                      )}
                      {booking.status === 'REJECTED' && (
                        <Link href={`/marketplace/experiences/${booking.listingId}`}>
                          <button className="btn-primary text-sm px-4 py-2">
                            Rebook
                          </button>
                        </Link>
                      )}
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
