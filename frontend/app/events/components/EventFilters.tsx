import { LocationDropdown } from "@/components/common/LocationDropdown";
import { CategoryDropdown } from "@/components/common/CategoryDropdown";
import { Search, X, MapPin } from "lucide-react";

const CATEGORIES = [
  "Traditional Artisanship", "Textiles & Handicrafts", "Cooking", "Arts & Crafts", "Cultural", "Food & Beverage", "Community", "Adventure", "Nature & Wellness"
];
interface EventFiltersProps {
  search: string;
  category: string;
  location: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
}

export function EventFilters({
  search, category, location,
  onSearchChange, onCategoryChange, onLocationChange,
}: EventFiltersProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 shadow-sm relative z-50">
      <div className="flex flex-col md:flex-row gap-3">

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            suppressHydrationWarning
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
        <div className="relative w-full md:w-56 z-10">
          <CategoryDropdown 
            value={category}
            onChange={onCategoryChange}
            categories={CATEGORIES}
          />
        </div>

        {/* Location */}
        <div className="relative w-full md:w-56 z-20">
          <LocationDropdown
            value={location}
            onChange={onLocationChange}
            className="h-10 border border-gray-200 rounded-lg text-sm px-3 relative z-30 bg-white"
            icon={true}
          />
        </div>

      </div>
    </div>
  );
}
