"use client";

import React, { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import DayEvents from "./DayEvents";
import EventForm from "./EventForm";
import { Event, CreateEventInput } from "@/types/event";
import { createEvent, deleteEvent } from "@/lib/api/events";
import { useRouter } from "next/navigation";

interface CalendarClientProps {
  initialEvents: Event[];
}

export default function CalendarClient({ initialEvents }: CalendarClientProps) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleCreateEvent = async (data: CreateEventInput) => {
    setIsSubmitting(true);
    try {
      const newEvent = await createEvent(data);
      setEvents((prev) => [...prev, newEvent]);
      setShowForm(false);
      router.refresh(); // Refresh server data
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      router.refresh(); // Refresh server data
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
              Calendar
            </h1>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-slate-900 hover:bg-slate-800 text-white gap-2 shadow-lg shadow-slate-900/10 h-10 px-5"
          >
            <Plus className="h-4 w-4" />
            New Event
          </Button>
        </div>

        <CalendarHeader
          currentDate={currentDate}
          onPrev={() => setCurrentDate(subMonths(currentDate, 1))}
          onNext={() => setCurrentDate(addMonths(currentDate, 1))}
          onToday={() => {
            setCurrentDate(new Date());
            setSelectedDate(new Date());
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              events={events}
              onSelectDate={(day) => setSelectedDate(day)}
            />
          </div>

          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedDate && (
                <DayEvents
                  key={selectedDate.toISOString()}
                  selectedDate={selectedDate}
                  events={events}
                  onDelete={handleDeleteEvent}
                  onClose={() => setSelectedDate(null)}
                  onAddEvent={() => setShowForm(true)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Event form modal */}
      <AnimatePresence>
        {showForm && (
          <EventForm
            date={selectedDate}
            onSubmit={handleCreateEvent}
            onCancel={() => setShowForm(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}