'use client';

import React, { useState, useEffect, useRef } from 'react';
import ExperienceCard from './ExperienceCard';
import FilterSidebar from './FilterSidebar';
import './Experiences.css';

type ListingSummary = {
  id: number;
  title: string;
  price: number;
  location: string;
  district: string;
  rating: number;
  imageUrl: string | null;
  category: string;
  type: 'experience' | 'product';
  shortDescription: string;
};

type ListingsResponse = {
  total: number;
  items: ListingSummary[];
};

type FiltersResponse = {
  categories: string[];
  locations: string[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const isFirstRender = useRef(true);

  // Load filter states from session storage on mount
  useEffect(() => {
    // Always try to restore filters from session storage
    const savedType = sessionStorage.getItem('marketplaceType');
    const savedLocation = sessionStorage.getItem('marketplaceLocation');
    const savedCategories = sessionStorage.getItem('marketplaceCategories');
    const savedPriceRange = sessionStorage.getItem('marketplacePriceRange');
    const savedMinPrice = sessionStorage.getItem('marketplaceMinPrice');
    const savedMaxPrice = sessionStorage.getItem('marketplaceMaxPrice');
    const savedSearchQuery = sessionStorage.getItem('marketplaceSearchQuery');

    if (savedType) setSelectedType(savedType);
    if (savedLocation) setSelectedLocation(savedLocation);
    if (savedCategories) setSelectedCategories(JSON.parse(savedCategories));
    if (savedPriceRange) setPriceRange(savedPriceRange);
    if (savedMinPrice) setMinPrice(savedMinPrice);
    if (savedMaxPrice) setMaxPrice(savedMaxPrice);
    if (savedSearchQuery) setSearchQuery(savedSearchQuery);
  }, []);

  // Save all filter states to session storage when they change
  useEffect(() => {
    // Skip saving on the very first render to avoid overwriting storage with defaults
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    sessionStorage.setItem('marketplaceType', selectedType);
    sessionStorage.setItem('marketplaceLocation', selectedLocation);
    sessionStorage.setItem('marketplaceCategories', JSON.stringify(selectedCategories));
    sessionStorage.setItem('marketplacePriceRange', priceRange);
    sessionStorage.setItem('marketplaceMinPrice', minPrice);
    sessionStorage.setItem('marketplaceMaxPrice', maxPrice);
    sessionStorage.setItem('marketplaceSearchQuery', searchQuery);
  }, [selectedType, selectedLocation, selectedCategories, priceRange, minPrice, maxPrice, searchQuery]);

  // Clear filters on page unload (when closing tab/window or refreshing)
  useEffect(() => {
    const handleBeforeUnload = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      // Only clear if it's a reload (refresh), not navigation
      if (navigation?.type === 'reload') {
        sessionStorage.removeItem('marketplaceType');
        sessionStorage.removeItem('marketplaceLocation');
        sessionStorage.removeItem('marketplaceCategories');
        sessionStorage.removeItem('marketplacePriceRange');
        sessionStorage.removeItem('marketplaceMinPrice');
        sessionStorage.removeItem('marketplaceMaxPrice');
        sessionStorage.removeItem('marketplaceSearchQuery');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [listings, setListings] = useState<ListingSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    setMinPrice('');
    setMaxPrice('');
  };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
    setPriceRange('custom');
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
    setPriceRange('custom');
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadFilters = async () => {
      try {
        const response = await fetch(`${API_BASE}/marketplace/filters`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to load filters');
        }
        const data = (await response.json()) as FiltersResponse;
        setAvailableCategories(Array.isArray(data.categories) ? data.categories : []);
        setAvailableLocations(Array.isArray(data.locations) ? data.locations : []);
      } catch (err) {
        if (!isAbortError(err)) {
          setError('Unable to load filters. Please try again.');
        }
      }
    };

    loadFilters();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedLocation, selectedCategories, priceRange, minPrice, maxPrice]);

  useEffect(() => {
    const controller = new AbortController();

    const loadListings = async () => {
      setIsLoading(true);
      setError(null);
      const params = new URLSearchParams();

      if (selectedType !== 'All') {
        params.set('type', selectedType);
      }
      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      }
      if (selectedCategories.length > 0) {
        params.set('category', selectedCategories.join(','));
      }
      if (selectedLocation !== 'All') {
        params.set('location', selectedLocation);
      }
      if (priceRange !== 'all' && priceRange !== 'custom') {
        params.set('priceRange', priceRange);
      }
      if (priceRange === 'custom') {
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);
      }

      params.set('limit', itemsPerPage.toString());
      params.set('offset', ((currentPage - 1) * itemsPerPage).toString());

      try {
        const response = await fetch(`${API_BASE}/marketplace?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to load listings');
        }
        const data = (await response.json()) as ListingsResponse;
        setListings(Array.isArray(data.items) ? data.items : []);
        setTotal(typeof data.total === 'number' ? data.total : 0);
      } catch (err) {
        if (!isAbortError(err)) {
          setError('Unable to load listings. Please try again.');
          setListings([]);
          setTotal(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadListings();
    return () => controller.abort();
  }, [
    searchQuery,
    selectedType,
    selectedLocation,
    selectedCategories,
    priceRange,
    minPrice,
    maxPrice,
    currentPage,
  ]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="experiences-container">
      <div className="sidebar-section">
        <FilterSidebar
          categories={availableCategories}
          locations={availableLocations}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceRange={priceRange}
          setPriceRange={handlePriceRangeChange}
          minPrice={minPrice}
          setMinPrice={handleMinPriceChange}
          maxPrice={maxPrice}
          setMaxPrice={handleMaxPriceChange}
        />
      </div>
      <div className="grid-section">
        {isLoading ? (
          <div className="no-results">
            <p>Loading listings...</p>
          </div>
        ) : error ? (
          <div className="no-results">
            <p>{error}</p>
          </div>
        ) : listings.length > 0 ? (
          <>
            <div className="listings-grid">
              {listings.map((listing) => (
                <ExperienceCard
                  key={listing.id}
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  rating={listing.rating}
                  imageUrl={listing.imageUrl}
                  type={listing.type as 'experience' | 'product'}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination-container">
                <button 
                  onClick={handlePreviousPage} 
                  className="pagination-btn"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={handleNextPage} 
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <p>No experiences or products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function isAbortError(err: unknown) {
  return err instanceof DOMException && err.name === 'AbortError';
}
