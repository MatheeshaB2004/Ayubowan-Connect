'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Star,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Share2,
  Phone,
  Mail,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import './ProductDetail.css';
import ReviewSection from '../../review';
import { useCart } from '@/context/CartContext';

type ApiListing = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription?: string | null;
  priceMin: number;
  ratingAverage: number;
  ratingCount: number;
  tags: string[];
  inclusions?: unknown;
  specs?: unknown;
  listingType: 'EXPERIENCE' | 'PRODUCT';
  category?: { categoryName: string };
  location?: {
    city: string;
    district: string;
    province: string;
    latitude?: number | null;
    longitude?: number | null;
  };
  media?: Array<{ mediaUrl: string; isPrimary: boolean }>;
  vendor?: {
    businessName: string;
    shortTagline?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
  };
};

type ProductSpecs = {
  composition?: string;
  dimensions?: string;
  care?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';
const FALLBACK_IMAGE = '/assets/photos/B4.webp';

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const [listing, setListing] = useState<ApiListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!idStr) return;
    const controller = new AbortController();

    const loadListing = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/marketplace/${idStr}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Unable to load listing');
        }
        const data = (await response.json()) as ApiListing;
        setListing(data);
      } catch (err) {
        if (!isAbortError(err)) {
          setError('Unable to load product details.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadListing();
    return () => controller.abort();
  }, [idStr]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [listing?.id]);


  if (isLoading) {
    return (
      <div className="product-page-container">
        <div className="no-results">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="product-page-container">
        <div className="no-results">
          <p>{error ?? 'Product not found.'}</p>
          <Link href="/marketplace" className="breadcrumb-link">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  if (listing.listingType === 'EXPERIENCE') {
    return (
      <div className="product-page-container">
        <div className="no-results">
          <p>This listing is an experience. View it on the experience page.</p>
          <Link href={`/marketplace/experiences/${listing.id}`} className="breadcrumb-link">
            Go to experience
          </Link>
        </div>
      </div>
    );
  }

  const mediaUrls = (listing.media ?? [])
    .map((media) => media.mediaUrl)
    .filter(Boolean);
  const heroImage =
    listing.media?.find((media) => media.isPrimary)?.mediaUrl ??
    mediaUrls[0] ??
    FALLBACK_IMAGE;
  const images = mediaUrls.length > 0 ? mediaUrls : [heroImage];
  const includes = normalizeIncludes(listing.inclusions, listing.tags);
  const specs = normalizeSpecs(listing.specs);
  const vendorName = listing.vendor?.businessName ?? 'Vendor';
  const locationLabel = listing.location
    ? `${listing.location.city}, ${listing.location.district}`
    : 'Sri Lanka';

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="product-page-container">
      {/* Top Navigation */}
      <nav className="top-navigation">
        <div className="nav-container">
          <div className="breadcrumbs-nav">
            <Link href="/marketplace" className="breadcrumb-nav-link">
              Marketplace
            </Link>
            <ChevronRight size={16} />
            <span className="breadcrumb-current">Product</span>
          </div>
        </div>
      </nav>

      {/* Hero Gallery */}
      <div className="container-xl" style={{ paddingTop: '2rem', marginBottom: '3rem' }}>
        <div className="gallery-container">
          <Image
            src={images[currentImageIndex]}
            alt={listing.title}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Buttons - Always visible */}
          <button
            onClick={prevImage}
            disabled={images.length <= 1}
            className="gallery-nav-btn-base gallery-prev"
            title="Previous Image"
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextImage}
            disabled={images.length <= 1}
            className="gallery-nav-btn-base gallery-next"
            title="Next Image"
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>

          <div className="gallery-counter">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="thumbnails-grid">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`thumbnail-item ${idx === currentImageIndex ? 'active' : ''}`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="container-xl product-main-grid">
        {/* Left Column: Product Info */}
        <div className="left-col">
          <div className="tags-wrapper">
            {listing.tags.map((tag, idx) => (
              <span key={idx} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="product-title">{listing.title}</h1>

          <div className="rating-location-wrapper">
            <div className="rating-box">
              <Star size={16} fill="#fbbf24" className="text-yellow-400" />
              <span className="rating-text">
                {listing.ratingAverage > 0 ? listing.ratingAverage.toFixed(1) : '0.0'}
              </span>
              <span className="rating-count">({listing.ratingCount} reviews)</span>
            </div>
            <div className="location-box">
              <MapPin size={16} />
              <span>{locationLabel}</span>
            </div>
          </div>

          <p className="product-intro" style={{ marginBottom: '2rem' }}>
            {listing.longDescription ?? listing.shortDescription}
          </p>

          {/* Pricing */}
          <div className="pricing-card-container">
            <div className="price-main-display">
              LKR {listing.priceMin.toLocaleString()}
            </div>
            <div className="pricing-actions">
              <button
                className="add-to-cart-btn"
                style={{ flex: 1 }}
                onClick={() => listing && addToCart(listing.id, 1)}
              >
                Add to cart
              </button>
              <button className="buy-now-btn" style={{ flex: 1 }}>Buy now</button>
            </div>
          </div>

          {/* Includes */}
          {includes.length > 0 && (
            <div className="includes-card">
              <h3 className="includes-header">
                <ShieldCheck size={20} className="includes-header-icon" />
                What&apos;s Included
              </h3>
              <div className="includes-grid-modern">
                {includes.map((item, idx) => (
                  <div key={idx} className="include-item-modern">
                    <div className="include-bullet" />
                    <span className="include-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="product-review-wrapper">
            <div className="reviews-header">
              <Star size={20} className="reviews-icon" />
              <h2 className="reviews-title">Customer Reviews</h2>
            </div>

            <ReviewSection
              listingId={listing.id}
              ratingAverage={listing.ratingAverage}
              onListingUpdate={setListing}
              hideTitle
            />
          </div>
        </div>

        {/* Right Column: Vendor Info */}
        <div className="right-col">
          <div>
            <div className="vendor-card-container">
              <h3 className="vendor-card-title">Meet the Maker</h3>
              <div className="vendor-header-info">
                <h4 className="vendor-name">{vendorName}</h4>
                {listing.vendor?.shortTagline && (
                  <p className="vendor-tagline">{listing.vendor.shortTagline}</p>
                )}
              </div>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <MapPin size={16} />
                  <span className="contact-text">{locationLabel}</span>
                </div>
                {listing.vendor?.contactEmail && (
                  <div className="contact-info-item">
                    <Mail size={16} />
                    <span className="contact-text">{listing.vendor.contactEmail}</span>
                  </div>
                )}
                {listing.vendor?.contactPhone && (
                  <div className="contact-info-item">
                    <Phone size={16} />
                    <span className="contact-text">{listing.vendor.contactPhone}</span>
                  </div>
                )}
              </div>

              <a
                href={listing.vendor?.contactPhone ? `tel:${listing.vendor.contactPhone}` : '#'}
                className="btn-primary contact-btn-link"
              >
                Contact Maker
              </a>
              <button
                className="btn-secondary share-btn-flex"
              >
                <Share2 size={16} />
                Share Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing before footer */}
      <div className="footer-spacer" />

    </div>
  );
}

function normalizeIncludes(value: unknown, tags: string[]): string[] {
  const includes: string[] = [];
  if (Array.isArray(value)) {
    value.forEach((item) => {
      if (typeof item === 'string') {
        includes.push(item);
      } else if (typeof item === 'object' && item) {
        const raw = item as { title?: unknown; description?: unknown };
        if (raw.title) includes.push(String(raw.title));
        if (raw.description) includes.push(String(raw.description));
      }
    });
  }
  if (includes.length === 0 && Array.isArray(tags)) {
    includes.push(...tags);
  }
  return includes;
}

function normalizeSpecs(value: unknown): ProductSpecs {
  if (typeof value === 'object' && value) {
    const raw = value as { composition?: unknown; dimensions?: unknown; care?: unknown };
    return {
      composition: raw.composition ? String(raw.composition) : undefined,
      dimensions: raw.dimensions ? String(raw.dimensions) : undefined,
      care: raw.care ? String(raw.care) : undefined,
    };
  }
  return {};
}

function isAbortError(err: unknown) {
  return err instanceof DOMException && err.name === 'AbortError';
}
