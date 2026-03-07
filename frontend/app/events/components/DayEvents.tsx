"use client";

import React from "react";
import { format, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Trash2, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";

interface DayEventsProps {
  selectedDate: Date | null;
  events: Event[];
  onDelete: (id: number) => void;
  onClose: () => void;
  onAddEvent: () => void;
}

export default function DayEvents({ 
  selectedDate, 
  events, 
  onDelete, 
  onClose, 
  onAddEvent 
}: DayEventsProps) {
  if (!selectedDate) return null;

  const dayEvents = events
    .filter((e) => {
      const eventDate = new Date(e.startDate);
      return isSameDay(eventDate, selectedDate);
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateA - dateB;
    });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            {format(selectedDate, "EEEE")}
          </p>
          <h3 className="text-2xl font-light text-slate-900 mt-0.5">
            {format(selectedDate, "MMMM d")}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={onAddEvent}
            className="rounded-full bg-slate-900 hover:bg-slate-800 text-white gap-1.5 h-8 px-3 text-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {dayEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-400">No events scheduled</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {dayEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 group relative"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <Badge 
                        variant="outline" 
                        className="text-slate-700 border-slate-200 text-[10px] font-medium"
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm">{event.title}</h4>
                    {event.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{event.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {format(new Date(event.startDate), "h:mm a")}
                        {event.endDate && ` – ${format(new Date(event.endDate), "h:mm a")}`}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(event.id)}
                    className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}