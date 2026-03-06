"use client";

import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { motion } from "framer-motion";
import { Event } from "@/types/event";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  events: Event[];
  onSelectDate: (date: Date) => void;
}

export default function CalendarGrid({ 
  currentDate, 
  selectedDate, 
  events, 
  onSelectDate 
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      const eventDate = new Date(e.startDate);
      return isSameDay(eventDate, day);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-slate-100">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const inMonth = isSameMonth(day, currentDate);
          const today = isToday(day);
          const selected = selectedDate && isSameDay(day, selectedDate);

          return (
            <motion.button
              key={day.toISOString()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectDate(day)}
              className={`
                relative min-h-[80px] md:min-h-[100px] p-2 border-b border-r border-slate-100 
                text-left transition-colors duration-150 group
                ${idx % 7 === 0 ? "border-l-0" : ""}
                ${!inMonth ? "bg-slate-50/50" : "bg-white hover:bg-slate-50/80"}
                ${selected ? "!bg-slate-900/[0.03] ring-2 ring-inset ring-slate-900/10" : ""}
              `}
            >
              <span
                className={`
                  inline-flex items-center justify-center w-7 h-7 rounded-full text-sm
                  transition-all duration-150
                  ${!inMonth ? "text-slate-300" : "text-slate-700"}
                  ${today ? "bg-slate-900 text-white font-semibold" : ""}
                  ${selected && !today ? "bg-slate-200 font-semibold" : ""}
                `}
              >
                {format(day, "d")}
              </span>

              {/* Event indicators */}
              <div className="mt-1 space-y-0.5">
                {dayEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={event.id || i}
                    className={`
                      flex items-center gap-1.5 px-1.5 py-0.5 rounded-md text-[10px] md:text-xs
                      font-medium truncate transition-opacity bg-slate-100
                      ${inMonth ? "opacity-100" : "opacity-40"}
                    `}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-500" />
                    <span className="truncate text-slate-600 hidden md:inline">{event.title}</span>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[10px] text-slate-400 pl-1.5">
                    +{dayEvents.length - 3} more
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}