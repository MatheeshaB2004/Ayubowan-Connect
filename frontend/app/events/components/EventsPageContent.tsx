"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@clerk/nextjs";
import { EventFilters } from "./EventFilters";
import { AllEventsSection } from "./AllEventsSection";
import { VendorEventsSection } from "./VendorEventsSection";
import { UserRegisteredEvents } from "./UserRegisteredEvents";
import {
  fetchAllEvents,
  fetchVendorEvents,
  fetchUserRegisteredEvents,
} from "../lib/api/events";
import { Event } from "../types/events";
import { useSearchParams } from "next/navigation";

export function EventsPageContent() {
  const searchParams = useSearchParams();
  const { user, isLoaded } = useUser();
  const [search, setSearch]     = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [location, setLocation] = useState(searchParams.get("location") || "all");

  const [allEvents, setAllEvents]       = useState<Event[]>([]);
  const [vendorEvents, setVendorEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents]     = useState<Event[]>([]);
  const [loading, setLoading]           = useState(true);

  // AuthContext: { user, role, isAuthenticated, loginAsTraveller, loginAsVendor, logout }
  // role: 'traveller' | 'vendor' | 'guest'
  const { role, authReady, user: authUser } = useAuth();

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
      console.log("LOADED ALL EVENTS:", data.length, "events");
      setAllEvents(data);
    } catch (err) {
      console.warn("Failed to load events:", err);
      setAllEvents([]);
    }
  }, [search, category, location]);

  console.log("ALL EVENTS:", allEvents.length, "loaded");
  console.log("USER EVENTS:", userEvents.length, "loaded");

  const loadVendorEvents = useCallback(async () => {
    if (!isVendor) return;
    try {
      const data = await fetchVendorEvents(getToken(), user?.id);
      setVendorEvents(data);
    } catch (err) {
      console.warn("Failed to load vendor events:", err);
      setVendorEvents([]);
    }
  }, [isVendor, user?.id]);

  const loadUserEvents = useCallback(async () => {
    if (!isLoaded || !user) return;

    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress;

    if (!email) return;

    try {
      const events = await fetchUserRegisteredEvents(user);
      console.log("FETCHED USER EVENTS:", events);
      setUserEvents(events);
    } catch (err) {
      console.error("Failed to load user events", err);
    }
  }, [user, isLoaded]);

  // Initial load for vendor and user events
  useEffect(() => {
    loadUserEvents();
  }, [loadUserEvents]);

  // Refresh user events when page becomes visible (after registration)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isLoaded && user) {
        loadUserEvents();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [loadUserEvents, isLoaded, user]);

  // Debounced filter re-fetch handles both initial loadAllEvents and subsequent filter changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(async () => {
      await loadAllEvents();
      setLoading(false);
    }, search ? 300 : 0);
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
            userId={user?.id}
            onEventCreated={() => { loadVendorEvents(); loadAllEvents(); }}
          />
        )}

        {/* Traveller section - Registered Events */}
        {isUser && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              Your Registered Events
            </h2>
            <UserRegisteredEvents
              events={userEvents}
              onRegistrationChange={loadUserEvents}
            />
          </div>
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
