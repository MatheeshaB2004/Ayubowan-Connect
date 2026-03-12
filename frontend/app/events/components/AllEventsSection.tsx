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

export function AllEventsSection({ events, totalCount, isGuest }: AllEventsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [currentMonth, setCurrentMonth] = useState(
    events.length > 0 ? getMonthYear(events[0].startDate) : ""
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || events.length === 0) return;
    const onScroll = () => {
      const top = el.getBoundingClientRect().top + 60;
      let best: Event | null = null;
      let bestDist = Infinity;
      events.forEach((ev) => {
        const ref = barRefs.current[ev.id];
        if (!ref) return;
        const d = Math.abs(ref.getBoundingClientRect().top - top);
        if (d < bestDist) { bestDist = d; best = ev; }
      });
      if (best) setCurrentMonth(getMonthYear((best as Event).startDate));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [events]);

  return (
    <section className="mb-10">

      {/* Section title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">All Events</h2>
        <span className="text-sm text-gray-500">{totalCount} events found</span>
      </div>

      {/* Sticky month label */}
      <div className="sticky top-[64px] z-20 bg-[#f9fafb] pb-2 mb-1">
        <div className="border-b-2 border-[#0d9488] pb-1">
          <span className="text-base font-semibold text-[#0d9488]">{currentMonth}</span>
        </div>
      </div>

      {/* Guest nudge */}
      {isGuest && (
        <div className="flex items-center gap-3 bg-[#e8f5f2] border border-[#0d9488]/20 rounded-xl px-4 py-3 mb-4 text-sm text-gray-700">
          <span className="text-lg">🌿</span>
          <span>
            <strong className="text-[#0d9488]">Sign in</strong> to register for events and view full details.{" "}
            <a href="/auth/login" className="text-[#0d9488] underline font-semibold hover:text-[#0b7a70]">
              Log in here →
            </a>
          </span>
        </div>
      )}

      {/* Event list */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 text-gray-400">
          <Calendar className="w-12 h-12 mb-3 text-gray-200" />
          <p className="font-medium text-gray-500">No events found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="h-[560px] overflow-y-auto pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#d1d5db transparent" }}
        >
          {events.map((ev) => (
            <EventBar
              key={ev.id}
              event={ev}
              isGuest={isGuest}
              innerRef={(el) => { barRefs.current[ev.id] = el; }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
