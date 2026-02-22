"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ 
  currentDate, 
  onPrev, 
  onNext, 
  onToday 
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.h2
            key={format(currentDate, "MMMM yyyy")}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-2xl md:text-3xl font-light tracking-tight text-slate-900"
          >
            {format(currentDate, "MMMM")}
            <span className="font-semibold ml-2">{format(currentDate, "yyyy")}</span>
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToday}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full px-4"
        >
          Today
        </Button>
        <div className="flex items-center bg-slate-100 rounded-full p-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}