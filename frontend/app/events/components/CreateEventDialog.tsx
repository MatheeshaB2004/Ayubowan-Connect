"use client";

import { useState, useRef, useCallback } from "react";
import {
  X, Loader2, CloudUpload, ImageIcon,
  Plus, Trash2, ChevronDown, ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { createEvent, uploadEventImage } from "../lib/api/events";

//Constants
const CATEGORIES = [
  "Cooking", "Arts & Crafts", "Cultural",
  "Food & Beverage", "Community", "Adventure", "Wellness",
];
const CITIES = [
  "Colombo", "Kandy", "Galle", "Nuwara Eliya",
  "Matale", "Jaffna", "Trincomalee", "Anuradhapura",
];
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE_MB = 5;

//Types
interface Props {
  open: boolean;
  token: string;
  onClose: () => void;
  onCreated: () => void;
}

interface Form {
  title: string;
  description: string;
  category: string;
  city: string;
  startDate: string;
  endDate: string;
  time: string;
  maxParticipants: string;
  price: string;
  isFree: boolean;
}

const EMPTY_FORM: Form = {
  title: "", description: "", category: "", city: "",
  startDate: "", endDate: "", time: "",
  maxParticipants: "", price: "", isFree: false,
};

//Input class
const inp =
  "w-full h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-colors bg-white placeholder-gray-400";

// Main component
export function CreateEventDialog({ open, token, onClose, onCreated }: Props) {
  const [form, setForm]           = useState<Form>(EMPTY_FORM);
  const [learnItems, setLearnItems] = useState<string[]>([""]);
  const [infoItems, setInfoItems]   = useState<string[]>([""]);

  // Image state
  const [imageFile, setImageFile]       = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadedUrl, setImageUploadedUrl] = useState<string | null>(null);
  const [imageDragging, setImageDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Section collapse state
  const [learnOpen, setLearnOpen] = useState(true);
  const [infoOpen, setInfoOpen]   = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  //Form helpers
  const set = (k: keyof Form, v: string | boolean) =>
    setForm(p => ({ ...p, [k]: v }));

  //Learn items helpers
  const setLearnItem = (i: number, v: string) =>
    setLearnItems(prev => prev.map((x, idx) => idx === i ? v : x));
  const addLearnItem = () => setLearnItems(prev => [...prev, ""]);
  const removeLearnItem = (i: number) =>
    setLearnItems(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  //Info items helpers
  const setInfoItem = (i: number, v: string) =>
    setInfoItems(prev => prev.map((x, idx) => idx === i ? v : x));
  const addInfoItem = () => setInfoItems(prev => [...prev, ""]);
  const removeInfoItem = (i: number) =>
    setInfoItems(prev => prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev);

  //Image handling
  const processImageFile = useCallback((file: File) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError("Please select a JPG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setError(null);
    setImageFile(file);
    setImageUploadedUrl(null);
    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setImageDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setImageDragging(true);
  };

  const handleDragLeave = () => setImageDragging(false);

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUploadedUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Upload image to Cloudinary via backend, returns URL
  const uploadImage = async (): Promise<string | undefined> => {
    if (!imageFile) return undefined;
    if (imageUploadedUrl) return imageUploadedUrl; // already uploaded
    setImageUploading(true);
    try {
      const url = await uploadEventImage(token, imageFile);
      setImageUploadedUrl(url);
      return url;
    } catch {
      setError("Image upload failed. Please try again.");
      return undefined;
    } finally {
      setImageUploading(false);
    }
  };

  //Submit
  const handleSubmit = async () => {
    if (!form.title.trim()) { setError("Event title is required."); return; }
    if (!form.city)          { setError("Please select a city."); return; }
    if (!form.startDate)     { setError("Start date is required."); return; }
    setError(null);
    setLoading(true);

    try {
      // Upload image first if one was selected
      let finalImageUrl: string | undefined;
      if (imageFile) {
        finalImageUrl = await uploadImage();
        if (!finalImageUrl) { setLoading(false); return; } // upload failed
      }

      // Filter out empty bullet items
      const cleanLearn = learnItems.filter(x => x.trim() !== "");
      const cleanInfo  = infoItems.filter(x => x.trim() !== "");

      await createEvent(token, {
        title:             form.title.trim(),
        description:       form.description || undefined,
        category:          form.category    || undefined,
        location:          form.city,
        city:              form.city,
        district:          form.city,
        province:          "Western Province",
        startDate:         form.startDate,
        endDate:           form.endDate     || undefined,
        time:              form.time        || undefined,
        maxParticipants:   form.maxParticipants ? parseInt(form.maxParticipants) : undefined,
        price:             form.isFree ? undefined : form.price ? parseFloat(form.price) : undefined,
        isFree:            form.isFree,
        imageUrl:          finalImageUrl,
        whatYouWillLearn:  cleanLearn.length > 0 ? cleanLearn : undefined,
        importantInfo:     cleanInfo.length  > 0 ? cleanInfo  : undefined,
      });

      // Reset everything
      setForm(EMPTY_FORM);
      setLearnItems([""]);
      setInfoItems([""]);
      removeImage();
      onCreated();
      onClose();
    } catch {
      setError("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //Render
  if (!open) return null;
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Create New Event</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Fill in the details below to publish your event</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Scrollable form body ── */}
        <div
          className="overflow-y-auto flex-1 px-6 py-5 space-y-5"
          style={{ scrollbarWidth: "thin" }}
        >

          {/* ── 1. Event Image Upload ── */}
          <div>
            <label className="block text-[13px] font-medium text-gray-700 mb-2">
              Event Image
            </label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              onChange={handleFileInput}
              className="hidden"
            />

            {imagePreview ? (
              /* Preview state */
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  width={600}
                  height={192}
                  style={{ width: "100%", height: "12rem", objectFit: "cover" }}
                  unoptimized
                  priority
                />
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors group flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </div>
                {/* File name bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-2 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                  <span className="text-white text-[11px] truncate">{imageFile?.name}</span>
                  {imageUploading && (
                    <div className="ml-auto flex items-center gap-1 text-white/80 text-[10px]">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Uploading...
                    </div>
                  )}
                  {imageUploadedUrl && (
                    <span className="ml-auto text-green-300 text-[10px] font-medium">✓ Uploaded</span>
                  )}
                </div>
              </div>
            ) : (
              /* Drop zone */
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
                  imageDragging
                    ? "border-[#0d9488] bg-[#e8f5f2]"
                    : "border-gray-200 bg-gray-50 hover:border-[#0d9488]/50 hover:bg-[#e8f5f2]/40"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#e8f5f2] flex items-center justify-center mb-1">
                  <CloudUpload className="w-6 h-6 text-[#0d9488]" />
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  {imageDragging ? "Drop image here" : "Click to upload image"}
                </p>
                <p className="text-[11px] text-gray-400">
                  or drag and drop · JPG, PNG, WebP · Max {MAX_FILE_SIZE_MB}MB
                </p>
              </button>
            )}
          </div>

          {/* ── 2. Basic Info ── */}
          <FormField label="Event Title" required>
            <input
              type="text"
              placeholder="e.g. Traditional Cooking Masterclass"
              value={form.title}
              onChange={e => set("title", e.target.value)}
              className={inp}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category">
              <select value={form.category} onChange={e => set("category", e.target.value)} className={inp}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="City / Location" required>
              <select value={form.city} onChange={e => set("city", e.target.value)} className={inp}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Start Date" required>
              <input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} className={inp} />
            </FormField>
            <FormField label="End Date">
              <input type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} className={inp} />
            </FormField>
          </div>

          <FormField label="Time">
            <input
              type="text"
              placeholder="e.g. 09:00 AM – 12:00 PM"
              value={form.time}
              onChange={e => set("time", e.target.value)}
              className={inp}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Max Participants">
              <input type="number" min={1} placeholder="30" value={form.maxParticipants} onChange={e => set("maxParticipants", e.target.value)} className={inp} />
            </FormField>
            <FormField label="Price (LKR)">
              <div className="flex items-center gap-2">
                <input
                  type="number" min={0} placeholder="3500"
                  value={form.price}
                  onChange={e => set("price", e.target.value)}
                  disabled={form.isFree}
                  className={`${inp} flex-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <label className="flex items-center gap-1.5 text-[12px] text-gray-600 cursor-pointer whitespace-nowrap select-none">
                  <input type="checkbox" checked={form.isFree} onChange={e => set("isFree", e.target.checked)} className="accent-[#0d9488] w-3.5 h-3.5" />
                  Free
                </label>
              </div>
            </FormField>
          </div>

          {/* ── 3. Description ── */}
          <FormField label="Description">
            <textarea
              rows={3}
              placeholder="Tell participants what to expect from this event..."
              value={form.description}
              onChange={e => set("description", e.target.value)}
              className={`${inp} h-auto resize-none py-2`}
            />
          </FormField>

          {/* ── 4. What You'll Learn ── */}
          <CollapsibleSection
            title="What You'll Learn"
            subtitle="These bullet points appear in the event detail page"
            open={learnOpen}
            onToggle={() => setLearnOpen(o => !o)}
          >
            <div className="space-y-2">
              {learnItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5f2] flex items-center justify-center flex-shrink-0 mt-px">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                  </span>
                  <input
                    type="text"
                    placeholder={`e.g. ${["Traditional techniques", "Cultural history", "Hands-on practice"][i % 3]}`}
                    value={item}
                    onChange={e => setLearnItem(i, e.target.value)}
                    className={`${inp} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => removeLearnItem(i)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLearnItem}
                className="flex items-center gap-1.5 text-[12px] text-[#0d9488] font-medium hover:text-[#0b7a70] transition-colors mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add item
              </button>
            </div>
          </CollapsibleSection>

          {/* ── 5. Important Information ── */}
          <CollapsibleSection
            title="Important Information"
            subtitle="These appear in the Important Information sidebar on the event detail page"
            open={infoOpen}
            onToggle={() => setInfoOpen(o => !o)}
          >
            <div className="space-y-2">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#e8f5f2] flex items-center justify-center flex-shrink-0 mt-px">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                  </span>
                  <input
                    type="text"
                    placeholder={`e.g. ${["All materials provided", "Suitable for all skill levels", "Refreshments included"][i % 3]}`}
                    value={item}
                    onChange={e => setInfoItem(i, e.target.value)}
                    className={`${inp} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => removeInfoItem(i)}
                    className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addInfoItem}
                className="flex items-center gap-1.5 text-[12px] text-[#0d9488] font-medium hover:text-[#0b7a70] transition-colors mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add item
              </button>
            </div>
          </CollapsibleSection>

          {/* ── Error ── */}
          {error && (
            <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            disabled={loading || imageUploading}
            className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || imageUploading}
            className="flex-1 h-10 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading || imageUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {imageUploading ? "Uploading image..." : "Creating..."}
              </>
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


// Sub-components

function FormField({
  label, required, children,
}: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function CollapsibleSection({
  title, subtitle, open, onToggle, children,
}: {
  title: string;
  subtitle: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Section header — click to collapse */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#f9fafb] hover:bg-[#e8f5f2]/60 transition-colors text-left"
      >
        <div>
          <p className="text-[13px] font-semibold text-gray-800">{title}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        }
      </button>

      {/* Section content */}
      {open && (
        <div className="px-4 py-4">
          {children}
        </div>
      )}
    </div>
  );
}
