"use client";

import { Search, X, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Cooking",
  "Arts & Crafts",
  "Cultural",
  "Food & Beverage",
  "Community",
  "Adventure",
  "Wellness",
];

const LOCATIONS = [
  "Colombo",
  "Kandy",
  "Galle",
  "Nuwara Eliya",
  "Matale",
  "Jaffna",
  "Trincomalee",
  "Anuradhapura",
];

interface EventFiltersProps {
  search: string;
  category: string;
  location: string;
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onLocationChange: (val: string) => void;
}

export function EventFilters({
  search,
  category,
  location,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
}: EventFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <Input
            placeholder="Search events or vendors..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9 border-gray-200 focus-visible:ring-[#379683]/30 text-sm h-10"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category */}
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-44 border-gray-200 focus:ring-[#379683]/30 h-10 text-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location */}
        <Select value={location} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full md:w-44 border-gray-200 focus:ring-[#379683]/30 h-10 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <SelectValue placeholder="All Locations" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {LOCATIONS.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
