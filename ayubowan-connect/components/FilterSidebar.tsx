import React from 'react';
import '@/styles/components/FilterSidebar.css';

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: string;
  setPriceRange: (range: string) => void;
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
        <select 
          className="custom-select" 
          value={selectedLocation} 
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="All">All Locations</option>
          <option value="Kandy">Kandy</option>
          <option value="Colombo">Colombo</option>
          <option value="Galle">Galle</option>
          <option value="Sigiriya">Sigiriya</option>
          <option value="Ella">Ella</option>
          <option value="Nuwara Eliya">Nuwara Eliya</option>
        </select>
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
      </div>
    </aside>
  );
};

export default FilterSidebar;
