"use client";

import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "./EventCard";
import { Event } from "@/app/events/types/events";

interface UserRegisteredEventsProps {
  events: Event[];
}

export function UserRegisteredEvents({ events }: UserRegisteredEventsProps) {
  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Registered Events</h2>
        <Badge className="bg-[#379683] hover:bg-[#379683] text-white px-3 py-1 text-xs">
          {events.length} {events.length === 1 ? "Event" : "Events"}
        </Badge>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-gray-400">
          <Calendar className="w-10 h-10 mb-3 text-gray-200" />
          <p className="font-medium text-gray-500">No registered events yet</p>
          <p className="text-sm mt-1">Browse events above and register to get started!</p>
        </div>
      ) : (
        <div
          className="flex gap-4 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}
        >
          {events.map((event) => (
            <EventCard key={event.id} event={event} showVendor={true} />
          ))}
        </div>
      )}
    </section>
  );
}
