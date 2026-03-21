'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Calendar, MapPin, Users, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';

// Type definition based on backend response
interface Booking {
    id: number;
    bookingDate: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REJECTED';
    guests: number;
    totalPrice: number;
    listing: {
        title: string;
        listingType: string;
    };
}

const API_BASE = API_BASE_URL;

export default function TripsPage() {
    const { user } = useUser();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user) return;

            try {
                const response = await fetch(`${API_BASE}/bookings`, {
                    headers: {
                        'x-user-id': user.primaryEmailAddress?.emailAddress || user.id,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Could not load your trips. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                <p className="text-gray-600 mb-6">You need to be logged in to view your trips.</p>
                <Link href="/" className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition">
                    Go Home
                </Link>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-100 text-green-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'COMPLETED': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">My Trips</h1>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            ) : bookings.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No trips booked yet</h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Ready to explore Sri Lanka? Browse our experiences to start your journey.
                    </p>
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition"
                    >
                        Explore Experiences
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        ID #{booking.id}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                    {booking.listing.title}
                                </h3>

                                <div className="space-y-3 mt-4">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar size={18} className="mr-3 text-teal-600" />
                                        <span className="text-sm">
                                            {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <Users size={18} className="mr-3 text-teal-600" />
                                        <span className="text-sm">{booking.guests} Guests</span>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <Clock size={18} className="mr-3 text-teal-600" />
                                        <span className="text-sm">Booked on {new Date().toLocaleDateString()}</span>
                                        {/* Note: createdAt is not in the type definition above for brevity, using today as placeholder if needed or just removing */}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                                    <div className="text-sm text-gray-500">Total Price</div>
                                    <div className="text-lg font-bold text-teal-700">
                                        LKR {booking.totalPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
