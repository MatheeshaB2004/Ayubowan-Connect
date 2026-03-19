'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const API_BASE = API_BASE_URL;

type Event = {
  id: number;
  title: string;
  startDate: string;
  time: string;
  location: string;
  price?: number;
  isFree: boolean;
  vendor?: {
    businessName?: string;
  };
};

export default function MyEventsPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_BASE}/events/user/registered`, {
          headers: { 'x-user-id': user.id },
        });

        if (response.ok) {
          const eventsData: Event[] = await response.json();
          setEvents(eventsData ?? []);
        } else {
          console.error('Failed to fetch events');
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [isLoaded, isSignedIn, user]);

  const statusBadge = () => {
    return 'bg-blue-100 text-blue-700';
  };

  const formatDisplayDate = (value?: string) => {
    if (!value) return '-';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '-';
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(parsed);
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center py-20 text-gray-400 text-base">
          <svg className="animate-spin h-5 w-5 mr-3 text-[#0d9488]" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Loading your events…
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center text-gray-500 py-20">
        Please sign in to view your events.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <DashboardTabs />
      <div className="max-w-6xl mx-auto py-12 px-4">
        {events.length === 0 ? (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">You have not registered for any events yet.</h2>
            <p className="text-gray-500 mb-6">Explore events to register for upcoming activities.</p>
            <Link href="/events">
              <button className="inline-flex items-center rounded-xl bg-[#0d9488] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78] active:scale-[0.98]">
                Browse Events
              </button>
            </Link>
          </div>
        ) : (
          <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mt-4 overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{event.vendor?.businessName ?? 'Organizer'}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDisplayDate(event.startDate)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{event.time}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{event.location}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge()}`}>
                          Registered
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
    </div>
  );
}
