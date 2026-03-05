"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { EventBar } from "./EventBar";
import { Event } from "@/app/events/types/events";

interface AllEventsSectionProps {
  events: Event[];
  totalCount: number;
}

function getMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function AllEventsSection({ events, totalCount }: AllEventsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [currentMonth, setCurrentMonth] = useState(() =>
    events.length > 0 ? getMonthYear(events[0].startDate) : ""
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || events.length === 0) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 3;

      let closestEvent: Event | null = null;
      let closestDistance = Infinity;

      events.forEach((event) => {
        const el = eventRefs.current[event.id];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - containerCenter);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestEvent = event;
        }
      });

      if (closestEvent) {
        setCurrentMonth(getMonthYear((closestEvent as Event).startDate));
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [events]);

  return (
    <section className="mb-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
        <span className="text-sm text-gray-500">{totalCount} events found</span>
      </div>

      {/* Sticky month indicator */}
      <div className="sticky top-[65px] z-30 bg-gray-50 py-3 border-b-2 border-[#379683] mb-4">
        <h3 className="text-lg font-semibold text-[#379683]">{currentMonth}</h3>
      </div>

      {/* Scrollable list */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl border border-gray-100">
          <Calendar className="w-12 h-12 mb-3 text-gray-200" />
          <p className="font-medium text-gray-500">No events found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="h-[580px] overflow-y-auto pr-2 space-y-0"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
        >
          {events.map((event) => (
            <EventBar
              key={event.id}
              event={event}
              innerRef={(el) => {
                eventRefs.current[event.id] = el;
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
