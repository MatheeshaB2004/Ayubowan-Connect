"use client";

import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "@/lib/api";
import "./page.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/nextjs";

const API_BASE = API_BASE_URL;

export default function CreateListingsPage() {

  const { user, isLoaded } = useUser();
  

  const clerkUserId = user?.id;

  console.log("DEBUG USER:", user);
  console.log("DEBUG LOADED:", isLoaded);

  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const listingsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [vendorId, setVendorId] = useState<number | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const SHORT_DESC_MAX = 500;
  const [formError, setFormError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(true);

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
    inclusions: [] as { title: string; description: string }[]
  });

  const [listings, setListings] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<"PUBLISHED" | "DRAFT">("PUBLISHED");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  useEffect(() => {

    if (!isLoaded) return;
    if (!user?.id) return;


    const fetchVendor = async () => {
      const res = await fetch(
        `http://localhost:3001/vendor/profile?userId=${user.id}`
      );

      const data = await res.json();

      console.log("VENDOR RESPONSE:", data);

      if (data?.vendorId) {
        setVendorId(data.vendorId);
      }
    };

    fetchVendor();

  }, [isLoaded, user]);

  useEffect(() => {
    console.log("VENDOR ID:", vendorId);
    if (!vendorId) return;

    fetchListings();
    fetchLocations();

  }, [vendorId]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch(`${API_BASE}/vendor/${vendorId}/listings`);
      const data = await response.json();
      console.log("LISTINGS:", data);
      setListings(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_BASE}/vendor/${vendorId}/locations`);
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error("Location fetch error:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/vendor/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  const [showAll, setShowAll] = useState(false);
  const [listingFilter, setListingFilter] = useState<"EXPERIENCE" | "PRODUCT">("EXPERIENCE");
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
    inclusions: [] as { title: string; description: string }[],
  };

  const wordCount =
    formData.longDescription.trim() === ""
      ? 0
      : formData.longDescription.trim().split(/\s+/).length;

  const filteredListings = listings.filter(
    (l) =>
      l.listingType === listingFilter &&
      l.visibilityStatus === statusFilter
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <main className="listings-page">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <div className="page-container">
        <header className="hero-wrap">
          <div className="hero-bg">
            <div className="hero-content hero-inner">

              <h1 className="hero-title">
                Create &amp; Manage<br />
                <span>Listings</span>
              </h1>

              <p className="hero-subtitle">
                Share authentic Sri Lankan experiences with travelers worldwide.
              </p>
            </div>
          </div>
        </header>
        <div className="hero-tabs-wrapper">
          <div className="hero-tabs-card">
            <button
              className={`hero-tab ${statusFilter === "PUBLISHED" ? "active" : ""}`}
              onClick={() => setStatusFilter("PUBLISHED")}
            >
              Published
            </button>

            <button
              className={`hero-tab ${statusFilter === "DRAFT" ? "active" : ""}`}
              onClick={() => setStatusFilter("DRAFT")}
            >
              Draft
            </button>
          </div>
        </div>

        <div className="bento-grid">
          <section className="create-new-section">
            <h2>Create a new listing or event</h2>
            <p>Capture travelers' interest by offering unique products, services, or activities.</p>

            <div className="create-new-grid">

              <div className="create-card listing">
                <div className="card-overlay"></div>
                <div className="card-content">
                  <div className="card-icon">
                    <i className="fas fa-box"></i>
                  </div>

                  <h3>Create an Experience</h3>
                  <p>Offer unique cultural experiences for travelers to discover and book.</p>

                  
                </div>
              </div>

              <div className="create-card event">
                <div className="card-overlay"></div>
                <div className="card-content">
                  <div className="card-icon">
                    <i className="fas fa-calendar-plus"></i>
                  </div>

                  <h3>Add a product</h3>
                  <p>List products in the marketplace for customers to explore and purchase.</p>

                  
                </div>
              </div>

            </div>
          </section>

          <div className="vendor-tip-bleed">
            <div className="bento-full vendor-tip">
              <div className="vendor-tip-left">
                <div className="vendor-tip-icon">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <div>
                  <span className="vendor-tip-label">VENDOR TIP</span>
                  <p className="vendor-tip-text">
                    Listings with <span className="highlight">photos and a clear description</span> get up to <span className="highlight">3× more inquiries</span> from travelers exploring Sri Lanka.
                  </p>
                </div>
              </div>
              <button className="vendor-tip-btn">View Listings →</button>
            </div>
          </div>

          <div className="create-listing-wrap">
            <section className="bento-create create-listing">
              <div className="create-content">
                <span className="section-label">LISTINGS</span>
                <h2 className="section-title">Create your first listing</h2>
                <p className="section-description">
                  Launch your unique Sri Lankan cultural experience and connect with travelers. Well-detailed listings get more engagement and visibility.
                </p>
                
                <ul className="feature-list">
                  <li><i className="fa-solid fa-check"></i> Title</li>
                  <li><i className="fa-solid fa-check"></i> Category</li>
                  <li><i className="fa-solid fa-check"></i> Location</li>
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
                    Create Listing
                  </button>
                  <span className="text-link">Learn more →</span>
                </div>
              </div>
              <div className="create-listing-image">
                <img src="/vendor_management/Create-listing.png" alt="Create your first listing" />
              </div>
            </section>
          </div>

          <section className="bento-offerings offerings">
            {listings.length === 0 && (
              <div className="empty-state">
                <span className="label">PORTFOLIO</span>
                <h2 className="title">Your current offerings</h2>
                <p className="desc">You haven't created any listings yet. Your listings will appear here once you add one.</p>
              </div>
            )}

            {listings.length > 0 && (
              <>
                <div className="offerings-header">
                  <div className="offerings-left">
                    <h2>Your current offerings</h2>
                    <p>Manage your active listings and drafts</p>
                  </div>
                  <div className="offerings-right">
                    <div className="status-toggle">
                      <button
                        className={`status-btn ${listingFilter === "EXPERIENCE" ? "active" : ""}`}
                        onClick={() => setListingFilter("EXPERIENCE")}
                      >
                        Experiences
                      </button>

                      <button
                        className={`status-btn ${listingFilter === "PRODUCT" ? "active" : ""}`}
                        onClick={() => setListingFilter("PRODUCT")}
                      >
                        Products
                      </button>
                    </div>
                  </div>
                </div>

                {listings.length > 0 && filteredListings.length === 0 && (
                  <div className="empty-filter-state">
                    <i className="fa-solid fa-box-open"></i>

                    {listingFilter === "EXPERIENCE" ? (
                      <>
                        <h3>No experiences yet</h3>
                        <p>Create your first experience to attract travelers.</p>
                      </>
                    ) : (
                      <>
                        <h3>No products yet</h3>
                        <p>Add products to sell in the marketplace.</p>
                      </>
                    )}

                    <button
                      className="primary-button"
                      onClick={() => {
                        setEditingListing(null);
                        setFormData(emptyForm);
                        setShowModal(true);

                      }}
                    >
                      Create Listing
                    </button>
                  </div>
                )}

                <div className="cards-grid" ref={listingsRef}>
                  {(showAll ? filteredListings : filteredListings.slice(0, 2)).map((listing) => (
                    <div className="listing-card-wrap" key={listing.id}>
                      <div className="modern-card">
                        <div className="card-image">
                          <img
                            src={listing.media?.length > 0 ? listing.media[0].mediaUrl : "/vendor_management/card-1.jpeg"}
                            alt={listing.title}
                          />
                          <span className={`status-badge ${listing.visibilityStatus === "DRAFT" ? "draft" : "active"}`}>
                            {listing.visibilityStatus}
                          </span>
                          <span className="category-badge">
                            {listing.category?.categoryName || "Experience"}
                          </span>
                        </div>
                        <div className="card-body">
                          {listing.tags?.length > 0 && (
                            <div className="card-tags">
                              {listing.tags.map((tag: string, i: number) => (
                                <span key={i} className="tag-pill">{tag}</span>
                              ))}
                            </div>
                          )}
                          <h3 className="card-title">{listing.title}</h3>
                          {listing.shortDescription && (
                            <p className="card-description">
                              {listing.shortDescription}
                            </p>
                          )}
                          


                          {listing.listingType === "PRODUCT" && listing.stock !== null && (
                            <div className="card-capacity">
                              <i className="fa-solid fa-box"></i>
                              <span>Stock available: {listing.stock}</span>
                            </div>
                          )}
                          <div className="meta-row light">
                            <div className="meta-item">
                              <i className="fa-regular fa-calendar"></i>
                              <span>Created: {new Date(listing.createdAt).toISOString().split("T")[0]}</span>
                            </div>
                            {listing.updatedAt !== listing.createdAt && (
                              <div className="meta-item">
                                <i className="fa-regular fa-clock"></i>
                                <span>Updated: {new Date(listing.updatedAt).toISOString().split("T")[0]}</span>
                              </div>
                            )}
                          </div>
                          <div className="price-label">PRICE PER PERSON</div>
                          <div className="card-price">LKR {listing.priceMin}</div>
                          <div className="card-actions-row">
                            <button
                              className="edit-btn"
                              onClick={() => {
                                console.log("MEDIA:", listing.media);
                                setEditingListing(listing);
                                setIsPublished(listing.visibilityStatus === "PUBLISHED");
                                const existingImage = listing.media?.length > 0 ? listing.media[0].mediaUrl : "";
                                setFormData({
                                  title: listing.title || "",
                                  categoryId: listing.categoryId?.toString() || "",
                                  listingType: listing.listingType || "EXPERIENCE",
                                  minPrice: listing.priceMin?.toString() || "",
                                  maxPrice: listing.priceMax?.toString() || "",
                                  longDescription: listing.longDescription || "",
                                  shortDescription: listing.shortDescription || "",
                                  capacity: listing.stock?.toString() || "",
                                  imageName: existingImage,
                                  imagePreview: existingImage,
                                  tags: listing.tags || [],
                                  inclusions: listing.inclusions ?? []
                                });
                                setSelectedAddressId(listing.addressId || null);
                                setShowModal(true);
                              }}
                            >
                              Manage
                            </button>
                            <button
                              className="promote-btn"
                              onClick={async () => {
                                await fetch(`${API_BASE}/vendor/${vendorId}/listings/${listing.id}`, { method: "DELETE" });
                                await fetchListings();
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {listings.length > 2 && (
                  <div className="view-all-wrap">
                    <button className="view-all" onClick={() => setShowAll((prev) => !prev)}>
                      {showAll ? "Show less" : "View all listings"}
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingListing ? "Edit Listing" : "Create Listing"}</h2>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-card">
                  <div className="form-title">Images</div>
                  <label className="upload-dropzone">
                    <div className="upload-icon">⬆</div>
                    <p>Drag & drop images here, or <span>browse</span></p>
                    <small>JPG, PNG, WebP · Max 5MB each</small>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleUpload} />
                  </label>
                  {formData.imagePreview && (
                    <div className="preview-grid">
                      <div className="preview-item">
                        <img src={formData.imagePreview} alt="" />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, imagePreview: "", imageName: "" });
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-card premium-card">
                  <div className="form-title">Basic Information</div>
                  <div className="publish-switch-row">
                    <label>Publish listing</label>

                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>

                    <span>{isPublished ? "Published" : "Draft"}</span>
                  </div>
                  <div className="listing-type-toggle">
                    <div
                      className={`type-card ${formData.listingType === "EXPERIENCE" ? "active" : ""}`}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          listingType: "EXPERIENCE",
                          capacity: ""
                        })
                      }
                    >
                      <i className="fa-solid fa-person-walking"></i>
                      <span>Experience</span>
                    </div>
                    <div
                      className={`type-card ${formData.listingType === "PRODUCT" ? "active" : ""}`}
                      onClick={() => setFormData({ ...formData, listingType: "PRODUCT" })}
                    >
                      <i className="fa-solid fa-box"></i>
                      <span>Product</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Listing Title *</label>
                    <input
                      required
                      placeholder="e.g. Traditional Kandyan Dance Workshop"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Category *</label>
                      <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      >
                        <option value="">Select category</option>
                        {categories.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Location *</label>
                      <select
                        required
                        value={selectedAddressId ?? ""}
                        onChange={(e) => setSelectedAddressId(Number(e.target.value))}
                      >
                        <option value="">Select location</option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.id}>{loc.city}, {loc.district}</option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                    <div className="form-group">
                      <label>Product Quantity</label>

                      <input
                        type="number"
                        placeholder="e.g. 50"
                        value={formData.capacity}
                        disabled={formData.listingType === "EXPERIENCE"}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: e.target.value })
                        }
                      />

                      {formData.listingType === "EXPERIENCE" && (
                        <small className="field-note">
                          Quantity is only used for products.
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: 16 }}>
                    <label>Tags (max 3, one word each)</label>
                    <div className="form-group" style={{ marginTop: 20 }}>
                      <label className="form-label">What's Included</label>

                      <div className="inclusions-container">

                        {formData.inclusions.map((item, index) => (
                          <div key={index} className="inclusion-card">

                            <div className="inclusion-icon">
                              ✓
                            </div>

                            <div className="inclusion-inputs">
                              <input
                                placeholder="Title (e.g. Tea & refreshments)"
                                value={item.title}
                                onChange={(e) => {
                                  const updated = [...formData.inclusions];
                                  updated[index].title = e.target.value;
                                  setFormData({ ...formData, inclusions: updated });
                                }}
                              />

                              <input
                                placeholder="Short description"
                                value={item.description}
                                onChange={(e) => {
                                  const updated = [...formData.inclusions];
                                  updated[index].description = e.target.value;
                                  setFormData({ ...formData, inclusions: updated });
                                }}
                              />
                            </div>

                            <button
                              className="remove-inclusion"
                              type="button"
                              onClick={() => {
                                const updated = formData.inclusions.filter((_, i) => i !== index);
                                setFormData({ ...formData, inclusions: updated });
                              }}
                            >
                              ✕
                            </button>

                          </div>
                        ))}

                        <button
                          type="button"
                          className="add-inclusion-button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              inclusions: [...formData.inclusions, { title: "", description: "" }]
                            })
                          }
                        >
                          + Add inclusion
                        </button>

                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Add up to 3 tags (press Enter)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const cleanTag = tagInput.trim();
                          if (cleanTag.includes(" ")) return;
                          if (!cleanTag) return;
                          if (formData.tags.length >= 3) return;
                          if (formData.tags.includes(cleanTag)) return;
                          setFormData({ ...formData, tags: [...formData.tags, cleanTag] });
                          setTagInput("");
                        }
                      }}
                    />
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
                      className="textarea-field"
                    />
                    <div className="text-right text-xs text-gray-500">
                      {formData.shortDescription.length}/{SHORT_DESC_MAX}
                    </div>
                    <div style={{ height: 12 }} />
                    <div className="form-title">Add Cultural Story</div>
                    <textarea
                      rows={6}
                      placeholder="Describe your listing in detail..."
                      value={formData.longDescription}
                      onChange={(e) => {
                        const text = e.target.value;
                        const words = text.trim() === "" ? [] : text.trim().split(/\s+/);
                        if (words.length <= 2000) setFormData({ ...formData, longDescription: text });
                      }}
                    />
                    <div className="description-footer">
                      <small className="helper-text">Be descriptive — great listings get more engagement</small>
                      <small className="char-count">{wordCount}/2000 words</small>
                    </div>
                  </div>
                </div>
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button
                  className="btn-primary"
                  disabled={submitting}
                  onClick={async () => {
                    if (!formData.title || !formData.categoryId || !formData.minPrice || !formData.maxPrice) {
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
                      formDataToSend.append(
                        "tags",
                        JSON.stringify(formData.tags)
                      );
                      if (formData.longDescription) formDataToSend.append("longDescription", formData.longDescription);
                      formDataToSend.append("priceMin", formData.minPrice);
                      formDataToSend.append("priceMax", formData.maxPrice);
                      if (
                        formData.listingType === "PRODUCT" &&
                        formData.capacity &&
                        formData.capacity.trim() !== ""
                      ) {
                        formDataToSend.append("stock", formData.capacity);
                      }

                      formDataToSend.append(
                        "visibilityStatus",
                        isPublished ? "PUBLISHED" : "DRAFT"
                      );
                      formDataToSend.append(
                        "inclusions",
                        JSON.stringify(formData.inclusions)
                      );
                      if (fileInputRef.current?.files?.[0]) formDataToSend.append("image", fileInputRef.current.files[0]);

                      const url = editingListing
                        ? `${API_BASE}/vendor/${vendorId}/listings/${editingListing.id}`
                        : `${API_BASE}/vendor/${vendorId}/listings`;
                      const response = await fetch(url, { method: editingListing ? "PUT" : "POST", body: formDataToSend });
                      const data = await response.json();

                      if (!response.ok) {
                        setFormError(data.message || "Failed to save listing");
                        setSubmitting(false);
                        return;
                      }
                      console.log("Saved:", data);

                      if (isPublished) {
                        toast.success(`"${formData.title}" is now published!`, {
                          className: "publish-toast"
                        });
                      } else {
                        toast.info(`"${formData.title}" saved as draft.`, {
                          className: "publish-toast"
                        });
                      }
                      if (!editingListing) {
                        setListings((prev) => [
                          { ...data, media: formData.imagePreview ? [{ mediaUrl: formData.imagePreview }] : [] },
                          ...prev,
                        ]);
                      } else {
                        setListings((prev) =>
                          prev.map((l) =>
                            l.id === editingListing.id
                              ? { ...data, media: formData.imagePreview ? [{ mediaUrl: formData.imagePreview }] : data.media }
                              : l
                          )
                        );
                      }
                      setFormData(emptyForm);
                      setIsPublished(true);
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
                  {submitting ? "Processing..." : editingListing ? "Update Listing" : "Create Listing"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </main >
  );
}
