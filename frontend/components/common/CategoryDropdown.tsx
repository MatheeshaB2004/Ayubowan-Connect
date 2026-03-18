import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface CategoryDropdownProps {
  value: string;
  onChange: (category: string) => void;
  categories: string[];
}

export function CategoryDropdown({
  value,
  onChange,
  categories,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const displayValue = value === 'all' || value === 'All' ? 'All Categories' : value;

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      {/* Trigger */}
      <div
        className="w-full h-10 pl-8 pr-3 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus-within:ring-2 focus-within:ring-[#0d9488]/30 focus-within:border-[#0d9488] transition-colors cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <span className="truncate flex-1 min-w-0">{displayValue}</span>
        <ChevronDown size={14} className={`text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
          <div
            className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
              value === 'all' 
              ? 'bg-[#e8f5f2] text-[#0d9488] font-medium' 
              : 'hover:bg-[#0d9488] hover:text-white text-gray-700'
            }`}
            onClick={() => {
              onChange('all');
              setIsOpen(false);
            }}
          >
            All Categories
          </div>

          {categories.map((category) => (
            <div
              key={category}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                value === category
                ? 'bg-[#e8f5f2] text-[#0d9488] font-medium'
                : 'hover:bg-[#0d9488] hover:text-white text-gray-700'
              }`}
              onClick={() => {
                onChange(category);
                setIsOpen(false);
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
