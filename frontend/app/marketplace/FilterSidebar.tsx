import React, { useState, useRef, useEffect } from 'react';
import './FilterSidebar.css';
import { ChevronDown } from 'lucide-react';
import { LocationDropdown } from '../../components/common/LocationDropdown';

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
        <LocationDropdown 
          value={selectedLocation}
          onChange={setSelectedLocation}
          availableLocations={locations}
          className="custom-input !py-2.5 !px-3"
          icon={false}
        />
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
