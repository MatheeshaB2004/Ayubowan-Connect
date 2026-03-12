"use client";

import { useState, useRef } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { createEvent } from "../lib/api/events";

const CATEGORIES = ["Cooking","Arts & Crafts","Cultural","Food & Beverage","Community","Adventure","Wellness"];
const CITIES = ["Colombo","Kandy","Galle","Nuwara Eliya","Matale","Jaffna","Trincomalee","Anuradhapura"];

interface Props { open: boolean; token: string; onClose: () => void; onCreated: () => void; }

interface Form {
  title: string; description: string; category: string; city: string;
  startDate: string; endDate: string; time: string;
  maxParticipants: string; price: string; isFree: boolean; imageUrl: string;
}
const EMPTY: Form = {
  title:"",description:"",category:"",city:"",startDate:"",endDate:"",
  time:"",maxParticipants:"",price:"",isFree:false,imageUrl:"",
};

const inp = "w-full h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-colors bg-white placeholder-gray-400";

export function CreateEventDialog({ open, token, onClose, onCreated }: Props) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const set = (k: keyof Form, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title.trim()) { setError("Event title is required."); return; }
    if (!form.city)          { setError("Please select a city."); return; }
    if (!form.startDate)     { setError("Start date is required."); return; }
    setError(null); setLoading(true);
    try {
      await createEvent(token, {
        title: form.title.trim(), description: form.description || undefined,
        category: form.category || undefined, location: form.city, city: form.city,
        district: form.city, province: "Western Province",
        startDate: form.startDate, endDate: form.endDate || undefined,
        time: form.time || undefined,
        maxParticipants: form.maxParticipants ? parseInt(form.maxParticipants) : undefined,
        price: form.isFree ? undefined : form.price ? parseFloat(form.price) : undefined,
        isFree: form.isFree, imageUrl: form.imageUrl || undefined,
      });
      setForm(EMPTY); onCreated(); onClose();
    } catch { setError("Failed to create event. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Create New Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4" style={{ scrollbarWidth: "thin" }}>
          <Label text="Event Title" required>
            <input type="text" placeholder="e.g. Traditional Cooking Masterclass" value={form.title} onChange={e => set("title", e.target.value)} className={inp} />
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <Label text="Category">
              <select value={form.category} onChange={e => set("category", e.target.value)} className={inp}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Label>
            <Label text="City / Location" required>
              <select value={form.city} onChange={e => set("city", e.target.value)} className={inp}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Label text="Start Date" required>
              <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} className={inp} />
            </Label>
            <Label text="End Date">
              <input type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} className={inp} />
            </Label>
          </div>

          <Label text="Time">
            <input type="text" placeholder="e.g. 09:00 AM – 12:00 PM" value={form.time} onChange={e => set("time", e.target.value)} className={inp} />
          </Label>

          <div className="grid grid-cols-2 gap-4">
            <Label text="Max Participants">
              <input type="number" min={1} placeholder="30" value={form.maxParticipants} onChange={e => set("maxParticipants", e.target.value)} className={inp} />
            </Label>
            <Label text="Price (Rs.)">
              <div className="flex items-center gap-2">
                <input type="number" min={0} placeholder="3500" value={form.price} onChange={e => set("price", e.target.value)} disabled={form.isFree} className={`${inp} flex-1 disabled:opacity-50`} />
                <label className="flex items-center gap-1 text-[12px] text-gray-600 cursor-pointer whitespace-nowrap">
                  <input type="checkbox" checked={form.isFree} onChange={e => set("isFree", e.target.checked)} className="accent-[#0d9488]" />
                  Free
                </label>
              </div>
            </Label>
          </div>

          <Label text="Description">
            <textarea rows={3} placeholder="Tell participants what to expect..." value={form.description} onChange={e => set("description", e.target.value)} className={`${inp} h-auto resize-none py-2`} />
          </Label>

          <Label text="Image URL">
            <div className="flex gap-2">
              <input type="text" placeholder="https://res.cloudinary.com/..." value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} className={`${inp} flex-1`} />
              <button type="button" className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:text-[#0d9488] hover:border-[#0d9488]/40 transition-colors">
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Paste a Cloudinary URL or connect your upload endpoint.</p>
          </Label>

          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} disabled={loading} className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} className="flex-1 h-10 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating...</> : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ text, required, children }: { text: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-700 mb-1">
        {text}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
