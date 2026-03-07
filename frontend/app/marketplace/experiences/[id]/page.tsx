'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Utensils,
  Coffee,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  X,
  Music,
  Camera,
  Sun,
  Map,
  Phone,
  Mail,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import './ExperienceDetail.css';
import ReviewSection from '../../review';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import toast from "react-hot-toast";

type ApiListing = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription?: string | null;
  priceMin: number;
  priceMax?: number | null;
  ratingAverage: number;
  ratingCount: number;
  tags: string[];
  inclusions?: unknown;
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

type InclusionItem = {
  title: string;
  description: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';
const FALLBACK_IMAGE = '/assets/photos/B4.webp';

export default function ExperienceDetailPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const [listing, setListing] = useState<ApiListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1,
    notes: '',
  });
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);

  // Gallery State
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
          setError('Unable to load experience details.');
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





  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to book this experience");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id,
        },
        body: JSON.stringify({
          listingId: listing?.id,
          bookingDate: bookingForm.date,
          guests: bookingForm.guests,
          notes: bookingForm.notes,
        }),
      });

      if (response.ok) {
        setIsBookingSubmitted(true);
      } else {
        alert('Failed to submit booking request.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleAddToCart = async () => {
    if (!listing) return;

    try {
      await addToCart(listing.id, 1);
      toast.success("Item added to cart");
    } catch {
      toast.error("Could not add item to cart");
    }
  };


  if (isLoading) {
    return (
      <div className="detail-page-container">
        <div className="no-results">
          <p>Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="detail-page-container">
        <div className="no-results">
          <p>{error ?? 'Experience not found.'}</p>
          <Link href="/marketplace" className="breadcrumb-link">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  if (listing.listingType === 'PRODUCT') {
    return (
      <div className="detail-page-container">
        <div className="no-results">
          <p>This listing is a product. View it on the product page.</p>
          <Link href={`/marketplace/products/${listing.id}`} className="breadcrumb-link">
            Go to product
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
  const gallery = mediaUrls.length > 0 ? mediaUrls : [heroImage];
  const tags = listing.tags?.length
    ? listing.tags
    : listing.category?.categoryName
      ? [listing.category.categoryName]
      : [];
  const subtitle = listing.shortDescription ?? '';
  const description = listing.longDescription ?? listing.shortDescription ?? '';
  const locationLabel = listing.location
    ? `${listing.location.city}, ${listing.location.district}, ${listing.location.province}`
    : 'Sri Lanka';
  const inclusions = normalizeInclusions(listing.inclusions);
  const ratingRounded = Math.round(listing.ratingAverage || 0);
  const statItems = [
    { label: 'Reviews', value: listing.ratingCount },
    { label: 'Average rating', value: listing.ratingAverage.toFixed(1) },
    { label: 'Category', value: listing.category?.categoryName ?? '—' },
    { label: 'Type', value: 'Experience' },
  ];

  return (
    <div className="detail-page-container">
      {/* Top Navigation */}
      <nav className="top-navigation">
        <div className="nav-container">
          <div className="breadcrumbs-nav">
            <Link href="/marketplace" className="breadcrumb-nav-link">
              Marketplace
            </Link>
            <ChevronRight size={16} />
            <span className="breadcrumb-current">Experience</span>
          </div>
        </div>
      </nav>

      {/* Hero Gallery Section */}
      <section className="hero-gallery-section">
        <div className="hero-gallery-container">
          <div className="gallery-main">
            <button
              className="gallery-nav-btn prev"
              onClick={() =>
                setCurrentImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))
              }
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="gallery-image-wrapper">
              <Image
                src={gallery[currentImageIndex] || heroImage}
                alt={listing.title}
                fill
                className="gallery-main-image"
                priority
              />
              <div className="image-overlay" />

              {/* Hero Info Overlay */}
              <div className="hero-info-overlay">
                <div className="hero-badges">
                  {tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="hero-tag">{tag}</span>
                  ))}
                  <span className="hero-featured-badge">
                    <Star size={14} fill="currentColor" />
                    Featured
                  </span>
                </div>

                <h1 className="hero-title">{listing.title}</h1>

                <div className="hero-meta">
                  <div className="hero-location">
                    <MapPin size={18} />
                    <span>{locationLabel}</span>
                  </div>
                  <div className="hero-rating">
                    <Star size={18} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                    <span className="rating-value">{listing.ratingAverage.toFixed(1)}</span>
                    <span className="rating-count">({listing.ratingCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Image Counter */}
              <div className="image-counter">
                <Camera size={16} />
                <span>{currentImageIndex + 1} / {gallery.length}</span>
              </div>
            </div>

            <button
              className="gallery-nav-btn next"
              onClick={() =>
                setCurrentImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))
              }
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="gallery-thumbnails">
              {gallery.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="thumbnail-image" />
                  <div className="thumbnail-overlay" />
                </button>
              ))}
              {gallery.length > 5 && (
                <div className="thumbnail more-images">
                  <span>+{gallery.length - 5}</span>
                  <span className="more-text">more</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="content-grid-container">
        {/* Left Column - Main Content */}
        <div className="content-main">
          {/* Title & Info Bar */}
          <div className="title-section">
            <h1 className="page-title">{listing.title}</h1>

            <div className="info-bar">
              <div className="location-badge">
                <MapPin size={16} />
                <span>{locationLabel}</span>
              </div>
              <div className="rating-badge">
                <Star size={16} fill="currentColor" />
                <span>{listing.ratingAverage.toFixed(1)} ({listing.ratingCount} reviews)</span>
              </div>
            </div>

            <div className="price-duration-bar">
              <div className="price-display">
                <span className="price-amount">LKR {listing.priceMin}</span>
                <span className="price-unit">/person</span>
              </div>
              <div className="duration-badge">
                <Calendar size={16} />
                <span>3 Hours</span>
              </div>
            </div>
          </div>

          {/* Experience Overview */}
          <section className="overview-section">
            <h2 className="section-title">Experience Overview</h2>
            <p className="section-text">{description}</p>

            <div className="experience-flow">
              <div className="flow-step">
                <div className="flow-icon">
                  <Users size={24} />
                </div>
                <div className="flow-content">
                  <h3>Meet your host</h3>
                  <p>{listing.vendor?.businessName || 'Local Expert'}</p>
                </div>
              </div>

              <ArrowRight size={20} className="flow-arrow" />

              <div className="flow-step">
                <div className="flow-icon">
                  <ShieldCheck size={24} />
                </div>
                <div className="flow-content">
                  <h3>Experience</h3>
                  <p>{listing.category?.categoryName || 'Cultural Activity'}</p>
                </div>
              </div>

              <ArrowRight size={20} className="flow-arrow" />

              <div className="flow-step">
                <div className="flow-icon">
                  <Star size={24} />
                </div>
                <div className="flow-content">
                  <h3>Create memories</h3>
                  <p>Take home your experience</p>
                </div>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="included-section">
            <h2 className="section-title">What's Included</h2>
            <div className="included-grid">
              {inclusions.length > 0 ? (
                inclusions.map((item, idx) => (
                  <div key={idx} className="included-item">
                    <div className="included-icon included">
                      {getInclusionIcon(item.title)}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="included-item">
                    <div className="included-icon included">✓</div>
                    <span>All carving tools</span>
                  </div>
                  <div className="included-item">
                    <div className="included-icon excluded">✕</div>
                    <span>Hotel transport</span>
                  </div>
                  <div className="included-item">
                    <div className="included-icon included">✓</div>
                    <span>Block of wood</span>
                  </div>
                  <div className="included-item">
                    <div className="included-icon excluded">✕</div>
                    <span>Lunch</span>
                  </div>
                  <div className="included-item">
                    <div className="included-icon included">✓</div>
                    <span>Tea & refreshments</span>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Cultural Story */}
          <section className="cultural-story-section">
            <h2 className="section-title">Cultural Story</h2>
            <div className="story-card">
              <p className="story-text">
                Masks are significant in Sri Lankan culture. Sri Lankan culture of masks and renews its even when mask. In mandam significance it is armos it chances and makurs of the culture corune, and the coocurtanity of Sri Lankans are importantlylated as envelopemnt economical traditionalwencommunity and cultural marks.
              </p>
            </div>
          </section>

          {/* Vendor Details Section */}
          <section className="host-section">
            <h2 className="section-title">Vendor Details</h2>
            <div className="host-card">
              <div className="host-avatar">
                <Users size={40} color="#0d9488" />
              </div>
              <div className="host-info">
                <h3>{listing.vendor?.businessName || 'Vendor'}</h3>
                <p className="host-bio">
                  {listing.vendor?.shortTagline || 'Providing authentic Sri Lankan experiences'}
                </p>
                {listing.vendor?.contactEmail && (
                  <div className="host-languages">
                    <span className="language-badge">
                      <Mail size={14} />
                      {listing.vendor.contactEmail}
                    </span>
                  </div>
                )}
                {listing.vendor?.contactPhone && (
                  <div className="host-languages" style={{ marginTop: '0.5rem' }}>
                    <span className="language-badge">
                      <Phone size={14} />
                      {listing.vendor.contactPhone}
                    </span>
                  </div>
                )}
              </div>
              {listing.vendor?.contactPhone ? (
                <>
                  {!showPhone ? (
                    <button
                      onClick={() => setShowPhone(true)}
                      className="btn-message-host"
                    >
                      <Phone size={18} />
                      Contact Vendor
                    </button>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                      <a
                        href={`tel:${listing.vendor.contactPhone}`}
                        className="btn-message-host"
                        style={{ fontSize: '1.1rem', fontWeight: '600' }}
                      >
                        <Phone size={18} />
                        {listing.vendor.contactPhone}
                      </a>
                      <button
                        onClick={() => setShowPhone(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#666',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Hide
                      </button>
                    </div>
                  )}
                </>
              ) : listing.vendor?.contactEmail ? (
                <a
                  href={`mailto:${listing.vendor.contactEmail}`}
                  className="btn-message-host"
                >
                  <Mail size={18} />
                  Email Vendor
                </a>
              ) : (
                <button className="btn-message-host" disabled>
                  No Contact Info
                </button>
              )}
            </div>
          </section>

          {/* Map */}
          <section className="map-section">
            <h2 className="section-title">Location</h2>
            <div className="map-container" style={{ width: '100%', height: '450px', position: 'relative' }}>
              {listing.location?.latitude && listing.location?.longitude ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${listing.location.latitude},${listing.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${listing.location.latitude},${listing.location.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'rgba(13, 148, 136, 0.95)',
                      color: 'white',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      pointerEvents: 'none',
                    }}
                    className="map-click-hint"
                  >
                    <MapPin size={20} />
                    Click to open in Google Maps
                  </div>
                </a>
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '12px',
                }}>
                  <MapPin size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                  <p style={{ color: '#666', fontSize: '1.1rem', fontWeight: '500' }}>
                    {listing.location?.city}, {listing.location?.district}
                  </p>
                </div>
              )}
            </div>
          </section>

          <ReviewSection
            listingId={listing.id}
            ratingAverage={listing.ratingAverage}
            onListingUpdate={setListing}
          />
        </div>

        {/* Right Column - Booking Card */}
        <aside className="booking-sidebar">
          <div className="booking-card">
            <h3 className="booking-title">Booking card</h3>

            <div className="booking-form">
              <div className="form-field">
                <label className="field-label">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="date"
                  className="field-input"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Time slot</label>
                <select
                  className="field-input"
                  defaultValue=""
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (9:00 AM)</option>
                  <option value="afternoon">Afternoon (2:00 PM)</option>
                </select>
              </div>

              <div className="guests-selector">
                <div className="guest-field">
                  <label className="field-label">Adults</label>
                  <select
                    className="field-input"
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) })}
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div className="guest-field">
                  <label className="field-label">Children</label>
                  <select className="field-input" defaultValue="0">
                    {[0, 1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="btn-book-now"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book Now
              </button>



            </div>
          </div>
        </aside>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Reserve your experience</h3>
              <button className="modal-close-btn" onClick={() => setIsBookingModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {isBookingSubmitted ? (
                <div className="success-message py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center text-gray-900">
                    Request Sent!
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    The vendor will confirm your booking within 24 hours.
                  </p>
                  <button
                    className="btn-primary w-full"
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setIsBookingSubmitted(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Special Requests</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function normalizeInclusions(value: unknown): InclusionItem[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item, index) => {
        if (typeof item === 'string') {
          return { title: item, description: '' };
        }
        if (typeof item === 'object' && item) {
          const raw = item as { title?: unknown; description?: unknown };
          const title = raw.title ? String(raw.title) : `Inclusion ${index + 1}`;
          const description = raw.description ? String(raw.description) : '';
          return { title, description };
        }
        return null;
      })
      .filter((item): item is InclusionItem => Boolean(item));
  }
  return [];
}

function getInclusionIcon(title: string) {
  const text = title.toLowerCase();
  if (text.includes('drum') || text.includes('music')) return <Music size={24} />;
  if (text.includes('photo') || text.includes('camera')) return <Camera size={24} />;
  if (text.includes('guide') || text.includes('map')) return <Map size={24} />;
  if (text.includes('tea') || text.includes('coffee')) return <Coffee size={24} />;
  if (text.includes('meal') || text.includes('food') || text.includes('lunch'))
    return <Utensils size={24} />;
  if (text.includes('sun') || text.includes('morning')) return <Sun size={24} />;
  return <Users size={24} />;
}

function isAbortError(err: unknown) {
  return err instanceof DOMException && err.name === 'AbortError';
}
