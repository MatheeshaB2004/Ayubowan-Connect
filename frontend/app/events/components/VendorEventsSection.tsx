"use client";

import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "./EventCard";
import { CreateEventDialog } from "./CreateEventDialog";
import { Event } from "@/app/events/types/events";

interface VendorEventsSectionProps {
  events: Event[];
  token: string;
  onEventCreated: () => void;
}

function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-3"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}
    >
      {children}
    </div>
  );
}

export function VendorEventsSection({
  events,
  token,
  onEventCreated,
}: VendorEventsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const liveEvents = events.filter((e) => e.computedStatus === "live" || e.isLive);
  const upcomingEvents = events.filter(
    (e) => !e.isLive && e.computedStatus === "upcoming"
  );
  const pastEvents = events.filter((e) => e.computedStatus === "past");

  return (
    <>
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Events</h2>
          <Button
            className="bg-[#379683] hover:bg-[#2d7a6a] text-white h-9 px-4 text-sm"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create Event
          </Button>
        </div>

        {events.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-14 text-gray-400">
            <Calendar className="w-10 h-10 mb-3 text-gray-200" />
            <p className="font-medium text-gray-500">No events yet</p>
            <p className="text-sm mt-1 mb-5">Create your first event to get started</p>
            <Button
              className="bg-[#379683] hover:bg-[#2d7a6a] text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Event
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Live */}
            {liveEvents.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Live Now
                </h3>
                <HorizontalScroll>
                  {liveEvents.map((event) => (
                    <EventCard key={event.id} event={event} showVendor={false} />
                  ))}
                </HorizontalScroll>
              </div>
            )}

            {/* Upcoming */}
            {upcomingEvents.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Upcoming Events
                </h3>
                <HorizontalScroll>
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} showVendor={false} />
                  ))}
                </HorizontalScroll>
              </div>
            )}

            {/* Past */}
            {pastEvents.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Past Events
                </h3>
                <HorizontalScroll>
                  {pastEvents.map((event) => (
                    <div key={event.id} className="opacity-70">
                      <EventCard event={event} showVendor={false} />
                    </div>
                  ))}
                </HorizontalScroll>
              </div>
            )}
          </div>
        )}
      </section>

      <CreateEventDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreated={onEventCreated}
        token={token}
      />
    </>
  );
}
