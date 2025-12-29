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
    rating: 4.8,
    imageUrl: "/assets/photos/B4.webp",
    category: "Culture"
  },
  {
    id: 2,
    title: "Sigiriya Rock Fortress Tour",
    price: 4500,
    location: "Sigiriya",
    rating: 4.9,
    imageUrl: "/assets/photos/B6.jpg",
    category: "Culture"
  },
  {
    id: 3,
    title: "Ella Train Journey",
    price: 1200,
    location: "Ella",
    rating: 4.7,
    imageUrl: "/assets/photos/B7.jpg",
    category: "Nature"
  },
  {
    id: 4,
    title: "Galle Fort Walk",
    price: 0,
    location: "Galle",
    rating: 4.6,
    imageUrl: "/assets/photos/B8.jpg",
    category: "Culture"
  },
  {
    id: 5,
    title: "Spicy Street Food Tour",
    price: 3000,
    location: "Colombo",
    rating: 4.5,
    imageUrl: "/assets/photos/B4.webp",
    category: "Food"
  },
  {
    id: 6,
    title: "Tea Plantation Visit",
    price: 2000,
    location: "Nuwara Eliya",
    rating: 4.9,
    imageUrl: "/assets/photos/B6.jpg",
    category: "Nature"
  }
];

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');

  const filteredListings = mockListings.filter((listing) => {
    // Search Filter
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());

    // Location Filter
    const matchesLocation = selectedLocation === 'All' || listing.location === selectedLocation;

    // Category Filter
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(listing.category);

    // Price Filter
    let matchesPrice = true;
    if (priceRange === 'under-2000') {
      matchesPrice = listing.price < 2000;
    } else if (priceRange === '2000-5000') {
      matchesPrice = listing.price >= 2000 && listing.price <= 5000;
    } else if (priceRange === '5000-plus') {
      matchesPrice = listing.price > 5000;
    }

    return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
  });

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
          setPriceRange={setPriceRange}
        />
      </div>
      <div className="grid-section">
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <ExperienceCard
              key={listing.id}
              title={listing.title}
              price={listing.price}
              location={listing.location}
              rating={listing.rating}
              imageUrl={listing.imageUrl}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No experiences found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
