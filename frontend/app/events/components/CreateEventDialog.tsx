"use client";

import { useState, useRef } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEvent } from "@/app/events/lib/api/events";

const CATEGORIES = [
  "Cooking", "Arts & Crafts", "Cultural",
  "Food & Beverage", "Community", "Adventure", "Wellness",
];

const LOCATIONS = [
  "Colombo", "Kandy", "Galle", "Nuwara Eliya",
  "Matale", "Jaffna", "Trincomalee", "Anuradhapura",
];

interface CreateEventDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  token: string;
}

interface FormState {
  title: string;
  description: string;
  category: string;
  location: string;
  city: string;
  district: string;
  province: string;
  startDate: string;
  endDate: string;
  time: string;
  maxParticipants: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category: "",
  location: "",
  city: "",
  district: "",
  province: "",
  startDate: "",
  endDate: "",
  time: "",
  maxParticipants: "",
  price: "",
  isFree: false,
  imageUrl: "",
};

export function CreateEventDialog({
  open,
  onClose,
  onCreated,
  token,
}: CreateEventDialogProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.title || !form.startDate || !form.location || !form.city) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await createEvent(token, {
        title: form.title,
        description: form.description || undefined,
        category: form.category || undefined,
        location: form.location,
        city: form.city,
        district: form.district || form.city,
        province: form.province || "Western",
        startDate: form.startDate,
        endDate: form.endDate || undefined,
        time: form.time || undefined,
        maxParticipants: form.maxParticipants ? parseInt(form.maxParticipants) : undefined,
        price: form.isFree ? undefined : form.price ? parseFloat(form.price) : undefined,
        isFree: form.isFree,
        imageUrl: form.imageUrl || undefined,
      });
      setForm(EMPTY_FORM);
      onCreated();
      onClose();
    } catch {
      setError("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Create New Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4" style={{ scrollbarWidth: "thin" }}>
          {/* Title */}
          <div>
            <Label htmlFor="ev-title" className="text-sm font-medium text-gray-700">
              Event Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ev-title"
              placeholder="e.g. Traditional Sri Lankan Cooking Class"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              className="mt-1 border-gray-200 focus-visible:ring-[#379683]/30"
            />
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger className="mt-1 border-gray-200 focus:ring-[#379683]/30">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">
                City / Location <span className="text-red-500">*</span>
              </Label>
              <Select
                value={form.city}
                onValueChange={(v) => {
                  set("city", v);
                  set("location", v);
                }}
              >
                <SelectTrigger className="mt-1 border-gray-200 focus:ring-[#379683]/30">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Start Date + End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ev-start" className="text-sm font-medium text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ev-start"
                type="date"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                className="mt-1 border-gray-200 focus-visible:ring-[#379683]/30"
              />
            </div>
            <div>
              <Label htmlFor="ev-end" className="text-sm font-medium text-gray-700">
                End Date
              </Label>
              <Input
                id="ev-end"
                type="date"
                value={form.endDate}
                onChange={(e) => set("endDate", e.target.value)}
                className="mt-1 border-gray-200 focus-visible:ring-[#379683]/30"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <Label htmlFor="ev-time" className="text-sm font-medium text-gray-700">
              Time
            </Label>
            <Input
              id="ev-time"
              placeholder="e.g. 09:00 AM – 12:00 PM"
              value={form.time}
              onChange={(e) => set("time", e.target.value)}
              className="mt-1 border-gray-200 focus-visible:ring-[#379683]/30"
            />
          </div>

          {/* Max Participants + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ev-max" className="text-sm font-medium text-gray-700">
                Max Participants
              </Label>
              <Input
                id="ev-max"
                type="number"
                min={1}
                placeholder="30"
                value={form.maxParticipants}
                onChange={(e) => set("maxParticipants", e.target.value)}
                className="mt-1 border-gray-200 focus-visible:ring-[#379683]/30"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Price (Rs.)</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  placeholder="3500"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  disabled={form.isFree}
                  className="border-gray-200 focus-visible:ring-[#379683]/30"
                />
                <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={form.isFree}
                    onChange={(e) => set("isFree", e.target.checked)}
                    className="accent-[#379683]"
                  />
                  Free
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="ev-desc" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="ev-desc"
              placeholder="Tell participants what to expect..."
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="mt-1 border-gray-200 focus-visible:ring-[#379683]/30 resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <Label htmlFor="ev-img" className="text-sm font-medium text-gray-700">
              Image URL
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="ev-img"
                placeholder="https://... or upload via Cloudinary"
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                className="border-gray-200 focus-visible:ring-[#379683]/30"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="border-gray-200 flex-shrink-0"
                title="Upload image (connect to Cloudinary endpoint)"
              >
                <Upload className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Paste a Cloudinary URL or use your upload endpoint
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="flex-1 border-gray-200 text-gray-700"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-[#379683] hover:bg-[#2d7a6a] text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </span>
            ) : (
              "Create Event"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
