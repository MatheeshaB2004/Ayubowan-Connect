'use client';

import React, { useState } from 'react';
import ExperienceCard from '@/components/ExperienceCard';
import FilterSidebar from '@/components/FilterSidebar';
import '@/styles/pages/Marketplace.css';

const mockListings = [
  {
    id: 1,
    title: "Traditional Kandyan Dance",
    price: 2500,
    location: "Kandy",
    district: "Kandy",
    rating: 4.8,
    imageUrl: "/assets/photos/B4.webp",
    category: "Culture"
  },
  {
    id: 2,
    title: "Sigiriya Rock Fortress Tour",
    price: 4500,
    location: "Sigiriya",
    district: "Matale",
    rating: 4.9,
    imageUrl: "/assets/photos/B6.jpg",
    category: "Culture"
  },
  {
    id: 3,
    title: "Ella Train Journey",
    price: 1200,
    location: "Ella",
    district: "Badulla",
    rating: 4.7,
    imageUrl: "/assets/photos/B7.jpg",
    category: "Nature"
  },
  {
    id: 4,
    title: "Galle Fort Walk",
    price: 0,
    location: "Galle",
    district: "Galle",
    rating: 4.6,
    imageUrl: "/assets/photos/B8.jpg",
    category: "Culture"
  },
  {
    id: 5,
    title: "Spicy Street Food Tour",
    price: 3000,
    location: "Colombo",
    district: "Colombo",
    rating: 4.5,
    imageUrl: "/assets/photos/B4.webp",
    category: "Food"
  },
  {
    id: 6,
    title: "Tea Plantation Visit",
    price: 2000,
    location: "Nuwara Eliya",
    district: "Nuwara Eliya",
    rating: 4.9,
    imageUrl: "/assets/photos/B6.jpg",
    category: "Nature"
  },
  {
    id: 7,
    title: "Whale Watching in Mirissa",
    price: 6000,
    location: "Mirissa",
    district: "Matara",
    rating: 4.8,
    imageUrl: "/assets/photos/B7.jpg",
    category: "Wildlife"
  },
  {
    id: 8,
    title: "Yala National Park Safari",
    price: 8500,
    location: "Yala",
    district: "Hambantota",
    rating: 4.9,
    imageUrl: "/assets/photos/B4.webp",
    category: "Wildlife"
  },
  {
    id: 9,
    title: "Traditional Mask Carving",
    price: 1500,
    location: "Ambalangoda",
    district: "Galle",
    rating: 4.7,
    imageUrl: "/assets/photos/B8.jpg",
    category: "Culture"
  },
  {
    id: 10,
    title: "Colombo City Tour by Tuk Tuk",
    price: 2500,
    location: "Colombo",
    district: "Colombo",
    rating: 4.6,
    imageUrl: "/assets/photos/B6.jpg",
    category: "Culture"
  },
  {
    id: 11,
    title: "Surfing Lesson in Arugam Bay",
    price: 3500,
    location: "Arugam Bay",
    district: "Ampara",
    rating: 4.8,
    imageUrl: "/assets/photos/B7.jpg",
    category: "Adventure"
  },
  {
    id: 12,
    title: "Cooking Class with Local Family",
    price: 2800,
    location: "Kandy",
    district: "Kandy",
    rating: 4.9,
    imageUrl: "/assets/photos/B4.webp",
    category: "Food"
  },
  {
    id: 13,
    title: "Horton Plains Trek",
    price: 4000,
    location: "Nuwara Eliya",
    district: "Nuwara Eliya",
    rating: 4.7,
    imageUrl: "/assets/photos/B8.jpg",
    category: "Adventure"
  },
  {
    id: 14,
    title: "Temple of the Tooth Visit",
    price: 1000,
    location: "Kandy",
    district: "Kandy",
    rating: 4.8,
    imageUrl: "/assets/photos/B6.jpg",
    category: "Culture"
  },
  {
    id: 15,
    title: "River Safari in Bentota",
    price: 3000,
    location: "Bentota",
    district: "Galle",
    rating: 4.5,
    imageUrl: "/assets/photos/B7.jpg",
    category: "Wildlife"
  },
  {
    id: 16,
    title: "Jaffna Food & Culture Tour",
    price: 4500,
    location: "Jaffna",
    district: "Jaffna",
    rating: 4.8,
    imageUrl: "/assets/photos/B4.webp",
    category: "Food"
  }
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState(6);

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

  const filteredListings = mockListings.filter((listing) => {
    // Search Filter
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Location Filter
    const matchesLocation = selectedLocation === 'All' || listing.district === selectedLocation;

    // Category Filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(listing.category);

    // Price Filter
    let matchesPrice = true;
    if (priceRange === 'custom') {
      const min = minPrice === '' ? 0 : Number(minPrice);
      const max = maxPrice === '' ? Infinity : Number(maxPrice);
      matchesPrice = listing.price >= min && listing.price <= max;
    } else if (priceRange === 'under-2000') {
      matchesPrice = listing.price < 2000;
    } else if (priceRange === '2000-5000') {
      matchesPrice = listing.price >= 2000 && listing.price <= 5000;
    } else if (priceRange === '5000-plus') {
      matchesPrice = listing.price > 5000;
    }

    return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
  });

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="marketplace-container">
      <div className="sidebar-section">
        <FilterSidebar 
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
        {filteredListings.length > 0 ? (
          <>
            <div className="listings-grid">
              {filteredListings.slice(0, visibleCount).map((listing) => (
                <ExperienceCard
                  key={listing.id}
                  title={listing.title}
                  price={listing.price}
                  location={listing.location}
                  rating={listing.rating}
                  imageUrl={listing.imageUrl}
                />
              ))}
            </div>
            {visibleCount < filteredListings.length && (
              <div className="see-more-container">
                <button onClick={handleSeeMore} className="see-more-btn">
                  See More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <p>No experiences found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
