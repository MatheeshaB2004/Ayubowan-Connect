"use client";

import { useRef, useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { EventBar } from "./EventBar";
import { Event } from "../types/events";
import { getMonthYear } from "../lib/utils";

interface AllEventsSectionProps {
  events: Event[];
  totalCount: number;
  isGuest: boolean;
}

export function AllEventsSection({
  events,
  totalCount,
  isGuest,
}: AllEventsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [currentMonth, setCurrentMonth] = useState(() =>
    events.length > 0 ? getMonthYear(events[0].startDate) : ""
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || events.length === 0) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const threshold = containerTop + 80;

      let best: Event | null = null;
      let bestDist = Infinity;

      events.forEach((ev) => {
        const el = eventRefs.current[ev.id];
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top - threshold);
        if (dist < bestDist) { bestDist = dist; best = ev; }
      });

      if (best) setCurrentMonth(getMonthYear((best as Event).startDate));
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
      <div className="sticky top-[65px] z-30 bg-gray-50 py-2.5 border-b-2 border-[#379683] mb-4">
        <span className="text-[17px] font-semibold text-[#379683]">
          {currentMonth}
        </span>
      </div>

      {/* Guest notice */}
      {isGuest && (
        <div className="flex items-center gap-3 bg-[#379683]/5 border border-[#379683]/20 rounded-xl px-4 py-3 mb-4 text-sm text-[#2d7a6a]">
          <span className="text-lg">🌿</span>
          <span>
            <strong>Sign in</strong> to register for events and view full details.{" "}
            <a href="/auth/login" className="underline font-semibold hover:text-[#379683]">
              Log in here
            </a>
          </span>
        </div>
      )}

      {/* List */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl border border-gray-100">
          <Calendar className="w-12 h-12 mb-3 text-gray-200" />
          <p className="font-medium text-gray-500">No events found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="h-[580px] overflow-y-auto pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
        >
          {events.map((event) => (
            <EventBar
              key={event.id}
              event={event}
              isGuest={isGuest}
              innerRef={(el) => { eventRefs.current[event.id] = el; }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
