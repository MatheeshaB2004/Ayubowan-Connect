"use client";

import { Calendar } from "lucide-react";
import { EventCard } from "./EventCard";
import { Event } from "../types/events";

interface Props {
  events: Event[];
  onRegistrationChange?: () => void;
}

export function UserRegisteredEvents({ events }: Props) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Registered Events</h2>
        <span className="text-[12px] font-semibold bg-[#0d9488] text-white px-3 py-1 rounded-full">
          {events.length} {events.length === 1 ? "Event" : "Events"}
        </span>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center py-14">
          <div className="w-14 h-14 rounded-full bg-[#e8f5f2] flex items-center justify-center mb-3">
            <Calendar className="w-7 h-7 text-[#0d9488]/50" />
          </div>
          <p className="font-medium text-gray-600 mb-1">No registered events yet</p>
          <p className="text-sm text-gray-400">Browse events above and register to get started!</p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}>
          {events.map(ev => <EventCard key={ev.id} event={ev} showVendor />)}
        </div>
      )}
    </section>
  );
}
