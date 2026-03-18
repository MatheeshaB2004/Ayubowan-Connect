"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { EventFilters } from "./components/EventFilters";
import { AllEventsSection } from "./components/AllEventsSection";
import { VendorEventsSection } from "./components/VendorEventsSection";
import { UserRegisteredEvents } from "./components/UserRegisteredEvents";
import {
  fetchAllEvents,
  fetchVendorEvents,
  fetchUserRegisteredEvents,
} from "./lib/api/events";
import { Event } from "./types/events";

import { useSearchParams } from "next/navigation";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const [search, setSearch]     = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [location, setLocation] = useState(searchParams.get("location") || "all");

  const [allEvents, setAllEvents]       = useState<Event[]>([]);
  const [vendorEvents, setVendorEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents]     = useState<Event[]>([]);
  const [loading, setLoading]           = useState(true);

  // AuthContext: { user, role, isAuthenticated, loginAsTraveller, loginAsVendor, logout }
  // role: 'traveller' | 'vendor' | 'guest'
  const { role, authReady, user } = useAuth();

  const isGuest  = authReady && (role === "guest" || !role);
  const isVendor = role === "vendor";
  const isUser   = role === "traveller";

  // JWT read — store under "accessToken" key when you wire real login
  const getToken = () =>
    typeof window !== "undefined" ? (localStorage.getItem("accessToken") ?? "") : "";

  const loadAllEvents = useCallback(async () => {
    try {
      const data = await fetchAllEvents({
        search:   search   || undefined,
        category: category !== "all" ? category : undefined,
        location: location !== "all" ? location : undefined,
      });
      setAllEvents(data);
    } catch (err) {
      console.error("Failed to load events:", err);
      setAllEvents([]);
    }
  }, [search, category, location]);

  const loadVendorEvents = useCallback(async () => {
    if (!isVendor) return;
    try {
      const data = await fetchVendorEvents(getToken());
      setVendorEvents(data);
    } catch (err) {
      console.error("Failed to load vendor events:", err);
      setVendorEvents([]);
    }
  }, [isVendor]);

  const loadUserEvents = useCallback(async () => {
    if (!isUser) return;
    try {
      const data = await fetchUserRegisteredEvents(getToken(), user?.id);
      setUserEvents(data);
    } catch (err) {
      console.error("Failed to load user events:", err);
      setUserEvents([]);
    }
  }, [isUser, user?.id]);

  // Initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([loadAllEvents(), loadVendorEvents(), loadUserEvents()]);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced filter re-fetch
  useEffect(() => {
    const t = setTimeout(loadAllEvents, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [search, category, location, loadAllEvents]);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Cultural Events Calendar
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            Discover and participate in authentic Sri Lankan cultural experiences
          </p>
        </div>

        {/* Filters */}
        <EventFilters
          search={search} category={category} location={location}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onLocationChange={setLocation}
        />

        {/* All Events */}
        {loading ? <AllEventsSkeleton /> : (
          <AllEventsSection
            events={allEvents}
            totalCount={allEvents.length}
            isGuest={isGuest}
          />
        )}

        {/* Vendor section */}
        {isVendor && (
          <VendorEventsSection
            events={vendorEvents}
            token={getToken()}
            onEventCreated={() => { loadVendorEvents(); loadAllEvents(); }}
          />
        )}

        {/* Traveller section */}
        {isUser && (
          <UserRegisteredEvents
            events={userEvents}
            onRegistrationChange={loadUserEvents}
          />
        )}

      </div>
    </div>
  );
}

function AllEventsSkeleton() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div className="h-0.5 bg-gray-200 rounded mb-4" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 animate-pulse">
            <div className="w-[110px] h-[78px] bg-gray-100 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-5 bg-gray-100 rounded w-2/3" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
              <div className="flex gap-4 mt-3">
                {[...Array(4)].map((_, j) => <div key={j} className="h-3 bg-gray-100 rounded w-20" />)}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end flex-shrink-0">
              <div className="h-7 w-16 bg-gray-100 rounded-md" />
              <div className="h-8 w-24 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
