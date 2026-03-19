'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { API_BASE_URL } from '@/lib/api';
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
import VendorLocationMap from '@/components/maps/VendorLocationMap';
import { useUser } from '@clerk/nextjs';
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
    id?: number;
    businessName: string;
    shortTagline?: string | null;
    contactEmail?: string | null;
    contactPhone?: string | null;
  };
  vendorId?: number;
  availability?: string;
};

type AvailabilitySlot = {
  id: number;
  startTime: string; // "09:00"
  endTime: string;   // "12:00"
  maxGuests: number;
  bookedGuests: number;
};

type AvailabilityDate = {
  date: string; // "2026-03-20"
  slots: AvailabilitySlot[];
};

type InclusionItem = {
  title: string;
  description: string;
};

const API_BASE = API_BASE_URL;
const FALLBACK_IMAGE = '/assets/photos/B4.webp';

export default function ExperienceDetailPage() {
  const { isSignedIn, user } = useUser();
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const [listing, setListing] = useState<ApiListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  // Availability State
  const [listingAvailability, setListingAvailability] = useState<AvailabilityDate[]>([]);

  // Booking Sidebar State
  const [bookingForm, setBookingForm] = useState({
    date: '',
    slotId: null as number | null,
    participants: 1,
  });
  const [isBookingSubmitted, setIsBookingSubmitted] = useState(false);
  const viewLogged = React.useRef(false);

  // Gallery State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
     if (!idStr) return;

    viewLogged.current = true;

    const url = user?.id
      ? `${API_BASE}/dashboard/vendor/simulate-view/${idStr}?userId=${user.id}`
      : `${API_BASE}/dashboard/vendor/simulate-view/${idStr}`;

    fetch(url, { method: "POST" });

  }, [idStr,user]);


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

  // Fetch listing-specific availability
  useEffect(() => {
    if (!listing) return;
    if (!listing.id) return;

    const controller = new AbortController();
    fetch(`${API_BASE}/bookings/availability/listing/${listing.id}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: AvailabilityDate[]) => {
        if (!controller.signal.aborted) setListingAvailability(data ?? []);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [listing]);

  // Available dates that have at least one slot with remaining capacity
  const availableDates = React.useMemo(
    () => listingAvailability.filter((d) => d.slots.some((s) => s.maxGuests - s.bookedGuests > 0)),
    [listingAvailability],
  );

  // Slots for the currently selected date
  const slotsForSelectedDate = React.useMemo(() => {
    if (!bookingForm.date) return [];
    const dayData = listingAvailability.find((d) => d.date === bookingForm.date);
    return dayData?.slots ?? [];
  }, [listingAvailability, bookingForm.date]);

  const formatSlotTime = (dateString: string) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      const match = dateString.match(/^(\d{1,2}):(\d{2})/);
      if (!match) return null;
      const h = String(Number(match[1])).padStart(2, '0');
      const m = String(Number(match[2])).padStart(2, '0');
      return `${h}:${m}`;
    }
    const h = String(date.getUTCHours()).padStart(2, '0');
    const m = String(date.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  const formatSlotRange = (start?: string, end?: string) => {
    const s = start ? formatSlotTime(start) : null;
    const e = end ? formatSlotTime(end) : null;
    if (!s || !e) return '-';
    return `${s} – ${e}`;
  };

  const handleBookingSubmit = async () => {
    setIsBookingSubmitted(false);
    if (!isSignedIn || !user) {
      toast.error("Please log in to book this experience");
      return;
    }

    if (!bookingForm.date) {
      toast.error('Please select a date');
      return;
    }

    if (!bookingForm.slotId) {
      toast.error('Please select a time slot');
      return;
    }

    if (bookingForm.participants < 1) {
      toast.error('At least 1 participant is required');
      return;
    }

    const selectedSlot = slotsForSelectedDate.find((s) => s.id === bookingForm.slotId);
    if (!selectedSlot) {
      toast.error('Invalid time slot selected');
      return;
    }

    const remaining = selectedSlot.maxGuests - selectedSlot.bookedGuests;
    if (bookingForm.participants > remaining) {
      toast.error(`Only ${remaining} spots available for this time slot.`);
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
          date: bookingForm.date,
          participants: bookingForm.participants,
          slotId: bookingForm.slotId,
        }),
      });

      if (response.ok) {
        toast.success('Booking request sent!');
        setIsBookingSubmitted(true);
      } else {
        const errorText = await response.text();
        console.error("Booking API error:", response.status, errorText);
        toast.error('Failed to submit booking request.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred. Please try again.');
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
  const overview = listing.shortDescription ?? '';
  const locationLabel = listing.location
    ? `${listing.location.city}, ${listing.location.district}, ${listing.location.province}`
    : 'Sri Lanka';
  const inclusions = normalizeInclusions(listing.inclusions);

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
            <p className="section-text">{overview}</p>

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
          {inclusions.length > 0 && (
            <section className="included-section">
              <h2 className="section-title">What's Included</h2>

              <div className="included-grid">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="included-item">
                    <div className="included-icon included">
                      {getInclusionIcon(item.title)}
                    </div>

                    <div>
                      <h4>{item.title}</h4>
                      {item.description && <p>{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Cultural Story */}
          {listing.longDescription && (
            <section className="cultural-story-section">
              <h2 className="section-title">Cultural Story</h2>

              <div className="story-card">
                <p className="story-text">
                  {listing.longDescription}
                </p>
              </div>
            </section>
          )}

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
                <VendorLocationMap
                  latitude={listing.location.latitude}
                  longitude={listing.location.longitude}
                  businessName={listing.vendor?.businessName || 'Vendor Location'}
                />
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
                {/* Date picker — only show dates that have available slots */}
                <div className="form-field">
                  <label className="field-label" htmlFor="booking-date">
                    <Calendar size={16} />
                    Date
                  </label>
                  {availableDates.length > 0 ? (
                    <select
                      id="booking-date"
                      title="Booking Date"
                      className="field-input"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value, slotId: null, participants: 1 })}
                    >
                      <option value="">Select a date</option>
                      {availableDates.map((d) => (
                        <option key={d.date} value={d.date}>
                          {new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 mt-1 bg-gray-50 border border-gray-200 rounded text-gray-500 italic text-sm">
                      No availability set by vendor
                    </div>
                  )}
                </div>

                {/* Time slot — show slots for the selected date */}
                {bookingForm.date && slotsForSelectedDate.length > 0 && (
                  <div className="form-field">
                    <label className="field-label" htmlFor="time-slot">Time Slot</label>
                    <select
                      id="time-slot"
                      title="Time Slot"
                      className="field-input"
                      value={bookingForm.slotId ?? ''}
                      onChange={(e) => setBookingForm({ ...bookingForm, slotId: Number(e.target.value) || null, participants: 1 })}
                    >
                      <option value="">Select a time slot</option>
                      {slotsForSelectedDate.map((slot) => {
                        const timeLabel = formatSlotRange(slot.startTime, slot.endTime);
                        const remaining = slot.maxGuests - slot.bookedGuests;
                        const isFull = remaining <= 0;
                        const label = timeLabel === '-'
                          ? '-'
                          : `${timeLabel} (${remaining > 0 ? `${remaining} spots left` : 'Full'})`;
                        return (
                          <option key={slot.id} value={slot.id} disabled={isFull}>
                            {label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}

                {/* Participants with increment controls */}
                <div className="form-field">
                  <label className="field-label" htmlFor="booking-participants">
                    <Users size={16} />
                    Participants
                  </label>
                  <div className="flex items-center gap-4 mt-1">
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                      disabled={bookingForm.participants <= 1 || !bookingForm.slotId}
                      onClick={() => setBookingForm((prev) => ({ ...prev, participants: prev.participants - 1 }))}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{bookingForm.participants}</span>
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                      disabled={
                        !bookingForm.slotId ||
                        bookingForm.participants >= (slotsForSelectedDate.find((s) => s.id === bookingForm.slotId)?.maxGuests ?? 0) - (slotsForSelectedDate.find((s) => s.id === bookingForm.slotId)?.bookedGuests ?? 0)
                      }
                      onClick={() => setBookingForm((prev) => ({ ...prev, participants: prev.participants + 1 }))}
                    >
                      +
                    </button>
                  </div>
                  {bookingForm.slotId && (() => {
                    const sel = slotsForSelectedDate.find((s) => s.id === bookingForm.slotId);
                    const rem = sel ? sel.maxGuests - sel.bookedGuests : 0;
                    return (
                      <p className="text-xs text-gray-500 mt-2">
                        Max {rem} available
                      </p>
                    );
                  })()}
                </div>

                {isBookingSubmitted && (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={18} className="text-green-600 shrink-0" />
                      <p className="text-sm font-semibold text-green-800">Booking request sent successfully.</p>
                    </div>
                    <p className="text-sm text-green-700 mb-3">
                      Your booking request has been sent to the vendor. You can track its status in Pending Bookings.
                    </p>
                    <Link href="/dashboard/bookings">
                      <button className="w-full rounded-lg bg-[#0d9488] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7f78]">
                        View Pending Bookings
                      </button>
                    </Link>
                  </div>
                )}

                <button
                  className="btn-book-now mt-4"
                  disabled={
                    !bookingForm.date ||
                    !bookingForm.slotId ||
                    bookingForm.participants < 1 ||
                    (slotsForSelectedDate.find((s) => s.id === bookingForm.slotId)
                      ? bookingForm.participants > (slotsForSelectedDate.find((s) => s.id === bookingForm.slotId)!.maxGuests - slotsForSelectedDate.find((s) => s.id === bookingForm.slotId)!.bookedGuests)
                      : false)
                  }
                  onClick={handleBookingSubmit}
                >
                  Book Experience
                </button>

              </div>
          </div>
        </aside>
      </div>

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
