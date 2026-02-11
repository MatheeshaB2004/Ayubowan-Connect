import React, { useState, useRef, useEffect } from 'react';
import '@/styles/components/FilterSidebar.css';
import { ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locations = [
    "All",
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  const filteredLocations = locations.filter(loc => 
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <aside className="sidebar-container">
      {/* Search */}
      <div className="filter-group">
        <h3 className="filter-title">Search</h3>
        <input 
          type="text" 
          placeholder="Search experiences..." 
          className="custom-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="filter-group">
        <h3 className="filter-title">Location</h3>
        <div className="custom-dropdown" ref={dropdownRef}>
          <div 
            className="dropdown-header" 
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            <span>{selectedLocation === 'All' ? 'All Locations' : selectedLocation}</span>
            <ChevronDown size={16} className={`dropdown-arrow ${isLocationOpen ? 'open' : ''}`} />
          </div>
          {isLocationOpen && (
            <div className="dropdown-list">
              <div style={{ padding: '8px', position: 'sticky', top: 0, backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="custom-input"
                  style={{ width: '100%', padding: '8px', fontSize: '0.875rem' }}
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {filteredLocations.map((loc) => (
                <div 
                  key={loc} 
                  className={`dropdown-item ${selectedLocation === loc ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsLocationOpen(false);
                    setLocationSearch("");
                  }}
                >
                  {loc === 'All' ? 'All Locations' : loc}
                </div>
              ))}
              {filteredLocations.length === 0 && (
                <div className="dropdown-item" style={{ cursor: 'default', color: '#9ca3af', textAlign: 'center' }}>
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="filter-group">
        <h3 className="filter-title">Category</h3>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('Culture')}
              onChange={() => handleCategoryChange('Culture')}
            />
            Culture
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('Food')}
              onChange={() => handleCategoryChange('Food')}
            />
            Food
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('Nature')}
              onChange={() => handleCategoryChange('Nature')}
            />
            Nature
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('Adventure')}
              onChange={() => handleCategoryChange('Adventure')}
            />
            Adventure
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={selectedCategories.includes('Wildlife')}
              onChange={() => handleCategoryChange('Wildlife')}
            />
            Wildlife
          </label>
        </div>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h3 className="filter-title">Price Range</h3>
        <div className="radio-group">
          <label className="radio-label">
            <input 
              type="radio" 
              name="price" 
              value="all"
              checked={priceRange === 'all'}
              onChange={() => setPriceRange('all')}
            />
            All Prices
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              name="price" 
              value="under-2000"
              checked={priceRange === 'under-2000'}
              onChange={() => setPriceRange('under-2000')}
            />
            Under 2000
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              name="price" 
              value="2000-5000"
              checked={priceRange === '2000-5000'}
              onChange={() => setPriceRange('2000-5000')}
            />
            2000 - 5000
          </label>
          <label className="radio-label">
            <input 
              type="radio" 
              name="price" 
              value="5000-plus"
              checked={priceRange === '5000-plus'}
              onChange={() => setPriceRange('5000-plus')}
            />
            5000+
          </label>
        </div>
        
        <div className="price-inputs" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
          <input
            type="number"
            placeholder="Min"
            className="custom-input"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ width: '100%' }}
          />
          <input
            type="number"
            placeholder="Max"
            className="custom-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
