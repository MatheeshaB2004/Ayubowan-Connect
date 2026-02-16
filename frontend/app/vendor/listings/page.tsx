"use client";

import { useState, useEffect, useRef } from "react";
import "./page.css";

export default function CreateListingsPage() {

  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const SHORT_DESC_MAX = 500;
  const [formError, setFormError] = useState("");
  const [tagInput, setTagInput] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      imagePreview: URL.createObjectURL(file),
      imageName: file.name,
    }));
  };

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    listingType: "EXPERIENCE",
    minPrice: "",
    maxPrice: "",
    capacity: "",
    shortDescription: "",
    longDescription: "",
    imageName: "",
    imagePreview: "",
    tags: [] as string[],
  });


  const [listings, setListings] = useState<any[]>([]);
  const vendorId = 2;
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);


  useEffect(() => {
    fetchListings();
    fetchLocations();
    fetchCategories();
  }, []);


  const fetchListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/vendor/${vendorId}/listings`
      );

      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/vendor/${vendorId}/locations`
      );

      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Location fetch error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/vendor/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };


  const [showAll, setShowAll] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);

  const sriLankaDistricts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee",
    "Vavuniya"
  ];

  const emptyForm = {
    title: "",
    categoryId: "",
    listingType: "EXPERIENCE",
    minPrice: "",
    maxPrice: "",
    capacity: "",
    shortDescription: "",
    longDescription: "",
    imageName: "",
    imagePreview: "",
    tags: [] as string[],
  };

  const wordCount =
    formData.longDescription.trim() === ""
      ? 0
      : formData.longDescription.trim().split(/\s+/).length;


  return (
    <main>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">Manage Listings and Events</h1>
          <p className="hero-description">
            Curate and organize your cultural offerings with our intuitive
            dashboard designed for artisans and hosts.
          </p>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="tabs-section">
        <h2 className="tabs-title">Two tabs for complete control</h2>
        <p className="tabs-subtitle">
          Manage your active listings and upcoming events with ease
        </p>

        <div className="tabs-grid">
          <div className="tab-card">
            <img src="/vendor_management/card-1.jpeg" />

            <h3>Active Listings</h3>
            <p>View, edit, and manage all your current business listings</p>

            <span className="tab-count">12 Active Listings</span>
          </div>

          <div className="tab-card">
            <img src="/vendor_management/card-2.jpeg" />

            <h3>Upcoming Events</h3>
            <p>Schedule and promote your special events and activities</p>

            <span className="tab-count">5 Upcoming Events</span>
          </div>
        </div>
      </section>

      {/* CREATE FIRST LISTING SECTION */}
      <section className="create-listing">
        <div>
          <span className="section-label">Listings</span>
          <h2 className="section-title">Create your first listing</h2>

          <p className="section-description">
            Fill in the details below and share what you offer. Your listing appears
            in the marketplace once submitted.
          </p>

          <ul className="feature-list">
            <li>Title</li>
            <li>Category</li>
            <li>Location</li>
          </ul>

          <div className="action-row">
            <button
              className="primary-button"
              onClick={() => {
                setEditingListing(null);
                setFormData(emptyForm);
                setShowModal(true);
              }}
            >
              Create
            </button>

            <a href="#" className="text-link">View →</a>
          </div>
        </div>

        <div className="create-listing-image">
          <img src="/vendor_management/card-1.jpeg" />
        </div>
      </section>


      {/* CURRENT OFFERINGS */}
      <section className="offerings">
        {listings.length === 0 && (
          <div className="empty-state">
            <span className="label">PORTFOLIO</span>
            <h2 className="title">Your current offerings</h2>

            <p className="desc">You haven’t created any listings yet.
              Your listings will appear here once you add one.
            </p>
          </div>
        )}

        {/* LISTINGS VIEW */}
        {listings.length > 0 && (
          <>
            <div className="offerings-head">
              <span className="label">PORTFOLIO</span>
              <h2 className="title">Your current offerings</h2>
              <p className="desc">Manage what travelers can discover and book</p>
            </div>

            <div className="cards-grid" ref={listingsRef}>
              {(showAll ? listings : listings.slice(0, 1)).map((listing) => (
                <div key={listing.id}>
                  <div className="modern-card">
                    <div className="card-image">
                      <img
                        src={
                          listing.media?.length > 0
                            ? listing.media[0].mediaUrl
                            : "/vendor_management/card-1.jpeg"
                        }
                        alt={listing.title}
                      />
                      <div className="card-actions">
                        <button
                          className="edit-btn"
                          onClick={() => {
                            console.log("MEDIA:", listing.media);
                            setEditingListing(listing);

                            const existingImage =
                              listing.media?.length > 0
                                ? listing.media[0].mediaUrl
                                : "";

                            setFormData({
                              title: listing.title || "",
                              categoryId: listing.categoryId?.toString() || "",
                              listingType: listing.listingType || "EXPERIENCE",
                              minPrice: listing.priceMin?.toString() || "",
                              maxPrice: listing.priceMax?.toString() || "",
                              capacity: listing.capacity?.toString() || "",
                              longDescription: listing.longDescription || "",
                              shortDescription: listing.shortDescription || "",
                              imageName: existingImage,
                              imagePreview: existingImage,
                              tags: listing.tags || [],
                            });

                            setSelectedAddressId(listing.addressId || null);
                            setShowModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>

                        <button
                          className="delete-btn"
                          onClick={async () => {

                            await fetch(
                              `http://localhost:3001/vendor/${vendorId}/listings/${listing.id}`,
                              {
                                method: "DELETE",
                              }
                            );

                            await fetchListings();
                          }}

                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      {listing.tags?.length > 0 && (
                        <div className="card-tags">
                          {listing.tags.map((tag: string, i: number) => (
                            <span key={i} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="card-title">{listing.title}</h3>
                      <p className="card-description">
                        {listing.longDescription || listing.shortDescription}
                      </p>

                      <div className="card-location">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>
                          {listing.location.city}, {listing.location.district}
                        </span>

                      </div>
                      {listing.capacity > 0 && (
                        <div className="card-capacity">
                          <i className="fa-solid fa-users"></i>
                          <span>Up to {listing.capacity} people</span>
                        </div>
                      )}

                      <div className="meta-row light">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Created: {new Date(listing.createdAt).toISOString().split("T")[0]}</span>


                        {listing.updatedAt !== listing.createdAt && (
                          <>
                            <span className="meta-row light"></span>
                            <i className="fa-regular fa-clock"></i>
                            <span>Updated: {new Date(listing.updatedAt).toISOString().split("T")[0]}</span>
                          </>
                        )}
                      </div>

                      <hr className="card-divider" />

                      <div className="card-footer">
                        <div className="card-price">
                          LKR {listing.priceMin} - {listing.priceMax}
                          <span>/ person</span>
                        </div>

                        <button className="view-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {listings.length > 1 && (
              <div className="view-all-wrap">
                <button
                  className="view-all"
                  onClick={() => setShowAll(prev => !prev)}
                >
                  {showAll ? "Show less" : "View all listings"}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">

            {/* HEADER */}
            <div className="modal-header">
              <h2>{editingListing ? "Edit Listing" : "Create Listing"}</h2>

              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="modal-body">
              {/* IMAGES */}
              <div className="form-card">
                <div className="form-title">Images</div>
                <label className="upload-dropzone">
                  <>
                    <div className="upload-icon">⬆</div>
                    <p>Drag & drop images here, or <span>browse</span></p>
                    <small>JPG, PNG, WebP · Max 5MB each</small>
                  </>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleUpload}
                  />

                </label>

                {formData.imagePreview && (
                  <div className="preview-grid">
                    <div className="preview-item">
                      <img src={formData.imagePreview} />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            imagePreview: "",
                            imageName: "",
                          })
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                          }
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* BASIC INFO */}
              <div className="form-card premium-card">
                <div className="form-title">Basic Information</div>

                {/* LISTING TYPE */}
                <div className="listing-type-toggle">
                  <div
                    className={`type-card ${formData.listingType === "EXPERIENCE" ? "active" : ""
                      }`}
                    onClick={() =>
                      setFormData({ ...formData, listingType: "EXPERIENCE" })
                    }
                  >
                    <i className="fa-solid fa-person-walking"></i>
                    <span>Experience</span>
                  </div>

                  <div
                    className={`type-card ${formData.listingType === "PRODUCT" ? "active" : ""
                      }`}
                    onClick={() =>
                      setFormData({ ...formData, listingType: "PRODUCT" })
                    }
                  >
                    <i className="fa-solid fa-box"></i>
                    <span>Product</span>
                  </div>
                </div>

                {/* TITLE */}
                <div className="form-group">
                  <label>Listing Title *</label>
                  <input
                    required
                    placeholder="e.g. Traditional Kandyan Dance Workshop"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                {/* CATEGORY + LOCATION */}
                <div className="grid-2">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                    >
                      <option value="">Select category</option>
                      {categories.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Location *</label>
                    <select
                      required
                      value={selectedAddressId || ""}
                      onChange={(e) => setSelectedAddressId(Number(e.target.value))}
                    >
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.city}, {loc.district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* PRICE FIELDS */}
                <div className="grid-2">
                  <div className="form-group">
                    <label>Minimum Price</label>
                    <input
                      placeholder="0"
                      required
                      value={formData.minPrice}
                      type="number"
                      onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Maximum Price</label>
                    <input
                      placeholder="0"
                      required
                      value={formData.maxPrice}
                      type="number"
                      onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    />
                  </div>
                </div>

                {/* CAPACITY FIELD */}
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label>Capacity (max people)</label>
                  <input
                    type="number"
                    placeholder="e.g. 10"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                  />
                </div>

                {/* TAG INPUT */}
                <div className="form-group" style={{ marginTop: 16 }}>
                  <label>Tags (max 3, one word each)</label>

                  <input
                    type="text"
                    placeholder="Add up to 3 tags (press Enter)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();

                        const cleanTag = tagInput.trim();

                        // Prevent spaces (only one word)
                        if (cleanTag.includes(" ")) {
                          return;
                        }

                        // Prevent empty
                        if (!cleanTag) return;

                        // Max 3 tags
                        if (formData.tags.length >= 3) return;

                        // Prevent duplicates
                        if (formData.tags.includes(cleanTag)) return;

                        setFormData({
                          ...formData,
                          tags: [...formData.tags, cleanTag],
                        });

                        setTagInput("");
                      }
                    }}
                  />

                  {/* Display added tags */}
                  <div className="tag-preview-row">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag-pill">
                        {tag}
                        <button
                          type="button"
                          onClick={() => {
                            const newTags = formData.tags.filter((_, i) => i !== index);
                            setFormData({ ...formData, tags: newTags });
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-card">
                <div className="form-group">
                  <label>Short Description *</label>
                  <textarea
                    rows={3}
                    placeholder="Short summary (max 500 characters)"
                    value={formData.shortDescription}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, SHORT_DESC_MAX);
                      setFormData({ ...formData, shortDescription: val });
                    }}
                    maxLength={SHORT_DESC_MAX}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                  <div className="text-right text-xs text-gray-500">
                    {formData.shortDescription.length}/{SHORT_DESC_MAX}
                  </div>

                  <div style={{ height: 12 }} />

                  <div className="form-title">Full Listing Description *</div>
                  <textarea
                    rows={6}
                    placeholder="Describe your listing in detail..."
                    value={formData.longDescription}
                    onChange={(e) => {
                      const text = e.target.value;
                      const words = text.trim() === "" ? [] : text.trim().split(/\s+/);

                      if (words.length <= 2000) {
                        setFormData({ ...formData, longDescription: text });
                      }
                    }}
                  />

                  <div className="description-footer">
                    <small className="helper-text">
                      Be descriptive — great listings get more engagement
                    </small>

                    <small className="char-count">
                      {wordCount}/2000 words
                    </small>

                  </div>
                </div>
              </div>
            </div>

            {formError && (
              <p className="form-error">{formError}</p>
            )}

            {/* ACTIONS */}
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                disabled={submitting}
                onClick={async () => {
                  if (
                    !formData.title ||
                    !formData.categoryId ||
                    !formData.minPrice ||
                    !formData.maxPrice
                  ) {
                    setFormError("Please fill all required fields");
                    return;
                  }
                  if (!formData.shortDescription || formData.shortDescription.trim() === "") {
                    setFormError("Please provide a short description");
                    return;
                  }
                  if (!selectedAddressId) {
                    setFormError("Please select a location");
                    return;
                  }
                  setFormError("");
                  setSubmitting(true);

                  try {
                    const formDataToSend = new FormData();
                    formDataToSend.append("categoryId", formData.categoryId);
                    formDataToSend.append("addressId", Number(selectedAddressId).toString());
                    formDataToSend.append("listingType", formData.listingType);

                    formDataToSend.append("title", formData.title);
                    formDataToSend.append("shortDescription", formData.shortDescription);
                    if (formData.longDescription) {
                      formDataToSend.append("longDescription", formData.longDescription);
                    }

                    formDataToSend.append("priceMin", formData.minPrice);
                    formDataToSend.append("priceMax", formData.maxPrice);

                    if (formData.capacity && formData.capacity.trim() !== "") {
                      formDataToSend.append("capacity", formData.capacity);
                    }

                    formDataToSend.append("tags", JSON.stringify(formData.tags));


                    if (fileInputRef.current?.files?.[0]) {
                      formDataToSend.append("image", fileInputRef.current.files[0]);
                    }

                    const url = editingListing
                      ? `http://localhost:3001/vendor/${vendorId}/listings/${editingListing.id}`
                      : `http://localhost:3001/vendor/${vendorId}/listings`;

                    const response = await fetch(url, {
                      method: editingListing ? "PUT" : "POST",
                      body: formDataToSend,
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      setFormError(data.message || "Failed to save listing");
                      setSubmitting(false);
                      return;
                    }

                    console.log("Saved:", data);

                    // Show new listing immediately with preview image
                    if (!editingListing) {
                      setListings(prev => [
                        {
                          ...data,
                          media: formData.imagePreview
                            ? [{ mediaUrl: formData.imagePreview }]
                            : [],
                        },
                        ...prev,
                      ]);
                    } else {
                      // If editing, update the listing locally for immediate feedback
                      setListings(prev =>
                        prev.map(l =>
                          l.id === editingListing.id
                            ? {
                              ...data,
                              media: formData.imagePreview
                                ? [{ mediaUrl: formData.imagePreview }]
                                : data.media,
                            }
                            : l
                        )
                      );
                    }

                    setFormData(emptyForm);
                    setEditingListing(null);
                    setShowModal(false);

                  } catch (error) {
                    console.error("Error:", error);
                    setFormError("An error occurred. Please try again.");
                  } finally {
                    setSubmitting(false);
                  }

                }}
              >
                {submitting ? "Processing..." : (editingListing ? "Update Listing" : "Create Listing")}
              </button>

            </div> {/* modal-actions */}
          </div> {/* modal */}
        </div>
      )}

    </main>
  );
}
