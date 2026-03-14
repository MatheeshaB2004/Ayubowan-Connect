"use client";

import { Search, X, SlidersHorizontal, MapPin } from "lucide-react";

const CATEGORIES = [
  "Cooking", "Arts & Crafts", "Cultural",
  "Food & Beverage", "Community", "Adventure", "Wellness",
];

const LOCATIONS = [
  "Colombo", "Kandy", "Galle", "Nuwara Eliya",
  "Matale", "Jaffna", "Trincomalee", "Anuradhapura",
];

interface EventFiltersProps {
  search: string;
  category: string;
  location: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
}

const selectCls =
  "w-full h-10 pl-8 pr-3 text-sm border border-gray-200 rounded-lg appearance-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-colors cursor-pointer";

export function EventFilters({
  search, category, location,
  onSearchChange, onCategoryChange, onLocationChange,
}: EventFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search events or vendors..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-9 pr-9 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category */}
        <div className="relative w-full md:w-48">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)} className={selectCls}>
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Location */}
        <div className="relative w-full md:w-48">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <select value={location} onChange={(e) => onLocationChange(e.target.value)} className={selectCls}>
            <option value="all">All Locations</option>
            {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

      </div>
    </div>
  );
}
