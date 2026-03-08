"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, CalendarDays } from "lucide-react";
import { CreateEventInput } from "@/types/event";

interface EventFormProps {
  date: Date | null;
  onSubmit: (data: CreateEventInput) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function EventForm({ date, onSubmit, onCancel, isSubmitting }: EventFormProps) {
  const [form, setForm] = useState<{
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: string;
    city: string;
    district: string;
    province: string;
    status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED';
  }>({
    title: "",
    description: "",
    startDate: date ? format(date, "yyyy-MM-dd") : "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    city: "",
    district: "",
    province: "",
    status: "PUBLISHED",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.startDate || !form.location || !form.city || !form.district || !form.province) {
      return;
    }

    // Combine date and time into ISO string
    const startDateTime = form.startTime 
      ? `${form.startDate}T${form.startTime}:00.000Z`
      : `${form.startDate}T00:00:00.000Z`;

    const endDateTime = form.endDate && form.endTime
      ? `${form.endDate}T${form.endTime}:00.000Z`
      : undefined;

    const eventData: CreateEventInput = {
      title: form.title,
      description: form.description || undefined,
      startDate: startDateTime,
      endDate: endDateTime,
      location: form.location,
      city: form.city,
      district: form.district,
      province: form.province,
      status: form.status,
    };

    onSubmit(eventData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 sticky top-0 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <CalendarDays className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">New Event</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Title */}
          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Title *
            </Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Event name"
              className="mt-1.5 rounded-xl border-slate-200 focus:ring-slate-900 focus:border-slate-900"
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Description
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Add details..."
              rows={3}
              className="mt-1.5 rounded-xl border-slate-200 focus:ring-slate-900 focus:border-slate-900 resize-none"
            />
          </div>

          {/* Start Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Start Date *
              </Label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="mt-1.5 rounded-xl border-slate-200"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Start Time
              </Label>
              <Input
                type="time"
                value={form.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className="mt-1.5 rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* End Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                End Date
              </Label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="mt-1.5 rounded-xl border-slate-200"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                End Time
              </Label>
              <Input
                type="time"
                value={form.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className="mt-1.5 rounded-xl border-slate-200"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Location *
            </Label>
            <Input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Venue or address"
              className="mt-1.5 rounded-xl border-slate-200"
              required
            />
          </div>

          {/* City, District, Province */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                City *
              </Label>
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
                className="mt-1.5 rounded-xl border-slate-200"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                District *
              </Label>
              <Input
                value={form.district}
                onChange={(e) => handleChange("district", e.target.value)}
                placeholder="District"
                className="mt-1.5 rounded-xl border-slate-200"
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Province *
              </Label>
              <Input
                value={form.province}
                onChange={(e) => handleChange("province", e.target.value)}
                placeholder="Province"
                className="mt-1.5 rounded-xl border-slate-200"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </Label>
            <Select 
              value={form.status} 
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger className="mt-1.5 rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 rounded-xl border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!form.title.trim() || !form.startDate || !form.location || !form.city || !form.district || !form.province || isSubmitting}
              className="flex-1 rounded-xl bg-slate-900 hover:bg-slate-800"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}