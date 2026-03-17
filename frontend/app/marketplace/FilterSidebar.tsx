import React, { useState, useRef, useEffect } from 'react';
import './FilterSidebar.css';
import { ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  locations: string[];
  selectedType: string;
  setSelectedType: (type: string) => void;
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
  categories,
  locations,
  selectedType,
  setSelectedType,
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

  const locationOptions = ["All Locations", ...locations.filter((loc) => loc && loc !== "All")];

  const filteredLocations = locationOptions.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  // Province-District mapping for Sri Lanka
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

  // Build hierarchical structure for display
  const locationStructure = Object.entries(provinceDistrictMap).map(([province, districts]) => ({
    province,
    districts: districts.filter(district =>
      locations.includes(district) &&
      (locationSearch === '' ||
        district.toLowerCase().includes(locationSearch.toLowerCase()) ||
        province.toLowerCase().includes(locationSearch.toLowerCase()))
    )
  })).filter(item =>
    // Show province if it has districts, OR if search is empty (show all), OR if province name matches search
    item.districts.length > 0 ||
    locationSearch === '' ||
    item.province.toLowerCase().includes(locationSearch.toLowerCase())
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
      {/* Type Filter */}
      <div className="filter-group">
        <h3 className="filter-title">Type</h3>
        <div className="radio-group">
          <label className="radio-label">
            <input
              suppressHydrationWarning
              type="radio"
              name="type"
              checked={selectedType === "All"}
              onChange={() => setSelectedType("All")}
            />
            <span>All</span>
          </label>
          <label className="radio-label">
            <input
              suppressHydrationWarning
              type="radio"
              name="type"
              checked={selectedType === "experience"}
              onChange={() => setSelectedType("experience")}
            />
            <span>Experiences</span>
          </label>
          <label className="radio-label">
            <input
              suppressHydrationWarning
              type="radio"
              name="type"
              checked={selectedType === "product"}
              onChange={() => setSelectedType("product")}
            />
            <span>Products</span>
          </label>
        </div>
      </div>

      {/* Search */}
      <div className="filter-group">
        <h3 className="filter-title">Search</h3>
        <input
          suppressHydrationWarning
          type="text"
          autoComplete="off"
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
            <span>{selectedLocation === 'All' || selectedLocation === 'All Locations' ? 'All Locations' : selectedLocation}</span>
            <ChevronDown size={16} className={`dropdown-arrow ${isLocationOpen ? 'open' : ''}`} />
          </div>
          {isLocationOpen && (
            <div className="dropdown-list">
              <div className="location-search-sticky">
                <input
                  suppressHydrationWarning
                  type="text"
                  autoComplete="off"
                  placeholder="Search provinces or districts..."
                  className="custom-input location-search-input"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* All Locations Option */}
              {(locationSearch === '' || 'all locations'.includes(locationSearch.toLowerCase())) && (
                <div
                  className={`dropdown-item ${(selectedLocation === 'All' || selectedLocation === 'All Locations') ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedLocation('All');
                    setIsLocationOpen(false);
                    setLocationSearch("");
                  }}
                >
                  All Locations
                </div>
              )}

              {/* Provinces with Districts */}
              {locationStructure.map(({ province, districts }) => (
                <div key={province}>
                  <div className="dropdown-section-header">{province} Province</div>
                  {districts.map((district) => (
                    <div
                      key={district}
                      className={`dropdown-item dropdown-subitem ${selectedLocation === district ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedLocation(district);
                        setIsLocationOpen(false);
                        setLocationSearch("");
                      }}
                    >
                      {district}
                    </div>
                  ))}
                </div>
              ))}

              {locationStructure.length === 0 && locationSearch !== '' && (
                <div className="dropdown-item dropdown-no-results">
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
          {categories.length > 0 ? (
            categories.map((category) => (
              <label className="checkbox-label" key={category}>
                <input
                  suppressHydrationWarning
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))
          ) : (
            <div className="no-categories-msg">No categories available</div>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="filter-group">
        <h3 className="filter-title">Price Range</h3>
        <div className="radio-group">
          <label className="radio-label">
            <input
              suppressHydrationWarning
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
              suppressHydrationWarning
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
              suppressHydrationWarning
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
              suppressHydrationWarning
              type="radio"
              name="price"
              value="5000-plus"
              checked={priceRange === '5000-plus'}
              onChange={() => setPriceRange('5000-plus')}
            />
            5000+
          </label>
        </div>

        <div className="price-inputs price-inputs-row">
          <input
            suppressHydrationWarning
            type="number"
            autoComplete="off"
            placeholder="Min"
            className="custom-input price-input-field"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            suppressHydrationWarning
            type="number"
            autoComplete="off"
            placeholder="Max"
            className="custom-input price-input-field"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
