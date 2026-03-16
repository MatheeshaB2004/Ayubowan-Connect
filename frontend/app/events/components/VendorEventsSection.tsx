"use client";

import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { EventCard } from "./EventCard";
import { CreateEventDialog } from "./CreateEventDialog";
import { Event } from "../types/events";

interface Props { events: Event[]; token: string; onEventCreated: () => void; }

function HScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}>
      {children}
    </div>
  );
}

export function VendorEventsSection({ events, token, onEventCreated }: Props) {
  const [open, setOpen] = useState(false);

  const live     = events.filter(e => e.isLive || e.computedStatus === "live");
  const upcoming = events.filter(e => !e.isLive && e.computedStatus === "upcoming");
  const past     = events.filter(e => e.computedStatus === "past");

  return (
    <>
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Events</h2>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0d9488] hover:bg-[#0b7a70] active:scale-95 transition-all rounded-lg px-4 h-9"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center py-14">
            <div className="w-14 h-14 rounded-full bg-[#e8f5f2] flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-[#0d9488]/50" />
            </div>
            <p className="font-medium text-gray-600 mb-1">No events yet</p>
            <p className="text-sm text-gray-400 mb-5">Create your first event to get started</p>
            <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold text-white bg-[#0d9488] hover:bg-[#0b7a70] transition-colors rounded-lg px-4 h-9">
              <Plus className="w-4 h-4" />
              Create Event
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {live.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Live Now
                </h3>
                <HScroll>{live.map(e => <EventCard key={e.id} event={e} showVendor={false} />)}</HScroll>
              </div>
            )}
            {upcoming.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Upcoming</h3>
                <HScroll>{upcoming.map(e => <EventCard key={e.id} event={e} showVendor={false} />)}</HScroll>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Past Events</h3>
                <HScroll>{past.map(e => <EventCard key={e.id} event={e} showVendor={false} muted />)}</HScroll>
              </div>
            )}
          </div>
        )}
      </section>

      <CreateEventDialog open={open} token={token} onClose={() => setOpen(false)} onCreated={onEventCreated} />
    </>
  );
}
