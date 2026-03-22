import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

const provinceDistrictMap: { [key: string]: string[] } = {
  'Western': ['Colombo', 'Gampaha', 'Kalutara'],
  'Central': ['Kandy', 'Matale', 'Nuwara Eliya'],
  'Southern': ['Galle', 'Matara', 'Hambantota'],
  'Northern': ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
  'Eastern': ['Ampara', 'Batticaloa', 'Trincomalee'],
  'North Western': ['Kurunegala', 'Puttalam'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  'Uva': ['Badulla', 'Monaragala'],
  'Sabaragamuwa': ['Ratnapura', 'Kegalle']
};

interface LocationDropdownProps {
  value: string;
  onChange: (location: string) => void;
  availableLocations?: string[];
  placeholder?: string;
  className?: string; // Optional overlay class for the trigger button
  icon?: boolean;     // Whether to render the MapPin icon 
}

export function LocationDropdown({
  value,
  onChange,
  availableLocations,
  placeholder = "Location",
  className = "",
  icon = true,
}: LocationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const locationOptions = availableLocations 
    ? ["All Locations", ...availableLocations.filter((loc) => loc && loc !== "All")]
    : ["All Locations", ...Object.values(provinceDistrictMap).flat()];

  const isActiveLocation = (district: string) => {
    return !availableLocations || availableLocations.includes(district);
  };

  const structure = Object.entries(provinceDistrictMap).map(([province, districts]) => ({
    province,
    districts: districts.filter(district =>
      isActiveLocation(district) &&
      (search === '' ||
        district.toLowerCase().includes(search.toLowerCase()) ||
        province.toLowerCase().includes(search.toLowerCase()))
    )
  })).filter(item =>
    item.districts.length > 0 ||
    search === '' ||
    item.province.toLowerCase().includes(search.toLowerCase())
  );

  const displayValue = value === 'all' || value === 'All' || value === 'All Locations' || !value
    ? placeholder 
    : value;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger */}
      <div
        className={`w-full flex justify-between items-center cursor-pointer bg-white ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 truncate flex-1 min-w-0">
          {icon && <MapPin size={18} className="text-gray-400 flex-shrink-0" />}
          <span className="truncate text-gray-700">{displayValue}</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 min-w-[100%] sm:min-w-[320px] w-max max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
          <div className="sticky top-0 bg-white p-2 border-b border-gray-100 z-10">
            <input
              type="text"
              autoComplete="off"
              placeholder="Search provinces or districts..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {(search === '' || 'all locations'.includes(search.toLowerCase())) && (
            <div
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                (value === 'All' || value === 'all' || value === 'All Locations') 
                ? 'bg-gray-100 font-medium' 
                : 'hover:bg-[#0d9488] hover:text-white text-gray-700'
              }`}
              onClick={() => {
                onChange('all');
                setIsOpen(false);
                setSearch("");
              }}
            >
              All Locations
            </div>
          )}

          {structure.map(({ province, districts }) => (
            <div key={province}>
              <div className="sticky top-[53px] px-3 py-1.5 text-xs font-bold text-[#0d9488] bg-[#f0fdfa] uppercase tracking-wider border-y border-gray-100/50 z-[9]">
                {province} Province
              </div>
              {districts.map((district) => (
                <div
                  key={district}
                  className={`px-3 py-2 pl-8 text-sm cursor-pointer transition-colors relative before:content-['•'] before:absolute before:left-4 before:text-gray-400 font-medium  ${
                    value === district 
                    ? 'bg-gray-100 font-medium text-gray-900 before:text-gray-900' 
                    : 'hover:bg-[#0d9488] hover:text-white text-gray-700 before:hover:text-white'
                  }`}
                  onClick={() => {
                    onChange(district);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {district}
                </div>
              ))}
            </div>
          ))}

          {structure.length === 0 && search !== '' && (
            <div className="px-3 py-3 text-sm text-gray-400 text-center">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
