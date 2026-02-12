"use client";

import { useState } from "react";
import { useRef } from "react";
import "./page.css";

export default function CreateListingsPage() {
  
  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const listingsRef = useRef<HTMLDivElement>(null);


  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  // FINAL TEST
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];

    setUploading(true);

    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
        imageName: file.name,
      }));

      setUploading(false);
    }, 1000);
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    tagline: "",
    description: "",
    imageName: "",
    imagePreview: "",
    tags: "", 
  });


const [listings, setListings] = useState<any[]>([]);
const [showAll, setShowAll] = useState(false);

const categories = ["Experience", "Try Out", "Marketplace"];

const sriLankaDistricts = [
  "Ampara","Anuradhapura","Badulla","Batticaloa","Colombo",
  "Galle","Gampaha","Hambantota","Jaffna","Kalutara",
  "Kandy","Kegalle","Kilinochchi","Kurunegala","Mannar",
  "Matale","Matara","Monaragala","Mullaitivu","Nuwara Eliya",
  "Polonnaruwa","Puttalam","Ratnapura","Trincomalee",
  "Vavuniya"
];

const emptyForm = {
  title: "",
  category: "",
  district: "",
  minPrice: "",
  maxPrice: "",
  tagline: "",
  description: "",
  imageName: "",
  imagePreview: "",
  tags: "",     
};



  return (
    <main>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

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
              onClick={() =>{
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

            <div ref={listingsRef}>
              {(showAll ? listings : listings.slice(0, 1)).map((listing) => (
              <div className="offer-card" key={listing.id}>
                <div className="offer">
                  <div className="offer-image">
                    <img
                      src={listing.imagePreview || "/placeholder.jpg"}
                      alt={listing.title}
                    />

                    <div className="offer-button">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingListing(listing);
                          setFormData({
                            title: listing.title,
                            category:listing.category,
                            minPrice:listing.minPrice,
                            maxPrice: listing.maxPrice,
                            district: listing.district,
                            description: listing.description,
                            tagline:listing.tagline,
                            imageName: listing.imageName,
                            imagePreview: listing.imagePreview,
                            tags: listing.tags?.join(",") || "",
                          });
                          setShowModal(true);
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          setListings(listings.filter(i => i.id !== listing.id))
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>

                  <div className="offer-text">
                    {listing.tags?.length > 0 && (
                      <div className="tags">
                        {listing.tags.map((tag: string, i: number) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    )}
                    <h3>{listing.title}</h3>

                    {listing.tagline && (
                      <p style={{ fontWeight: 600, marginBottom: "6px" }}>
                        {listing.tagline}
                      </p>
                    )}
                    // test changes
                    <p>{listing.description}</p>

                    <div className="price-inline">
                      <span className="price-inline-amount">
                        LKR {listing.minPrice} - {listing.maxPrice}
                      </span>
                      <span className="price-inline-meta">· per person</span>
                    </div>

                    <div className="location-tags">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{listing.district}</span>
                      <span>Sri Lanka</span>
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
              <h2>
                {editingListing ? "Edit Listing" : "Create Listing"}
              </h2>

              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
              ✕
              </button>
            </div>

            {/* FORM */}
            <div className="modal-body">
              {/* IMAGES */}
              <div className="form-card">
                <div className="form-title">Images</div>
                <label className="upload-dropzone">
                  {uploading ? (
                    <>
                      <div className="spinner"></div>
                      <p>Uploading images...</p>
                    </>
                  ) : (
                    <>
                      <div className="upload-icon">⬆</div>
                      <p>Drag & drop images here, or <span>browse</span></p>
                      <small>JPG, PNG, WebP · Max 5MB each</small>
                    </>
                  )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                    />
                </label>

                {formData.imagePreview && (
                  <div className="preview-grid">
                    <div className="preview-item">
                      <img src={formData.imagePreview} />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            imagePreview: "",
                            imageName: "",
                          })
                        }
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div> 

              {/* BASIC INFO */}
              <div className="form-card">
                <div className="form-title">Basic Information</div>
                <div className="form-group">
                  <label>Listing Title *</label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e)=>setFormData({...formData,title:e.target.value})}
                  />
                </div>

                <div className="grid-2">
                  <div className = "form-group">
                    <label>Category</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e)=>setFormData({...formData,category:e.target.value})}
                    >
                      <option value="">Select category</option>
                      {categories.map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className = "form-group">
                    <label>Location (District)</label>
                    <select
                      required
                      value={formData.district}
                      onChange={(e)=>setFormData({...formData,district:e.target.value})}
                    >
                      <option value="">Select district</option>
                      {sriLankaDistricts.map(d=><option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid-2">
                  <div className = "form-group">
                    <label>Minimum Price</label>
                    <input placeholder="0"
                      required
                      value={formData.minPrice}
                      type="number"
                      onChange={(e)=>setFormData({...formData,minPrice:e.target.value})}
                    />
                  </div>
                
                  <div className = "form-group">
                    <label>Maximum Price</label>
                    <input placeholder="0"
                      required
                      value={formData.maxPrice}
                      type="number"
                      onChange={(e)=>setFormData({...formData,maxPrice:e.target.value})}
                    />
                  </div>
                
                </div>

                <div className = "form-group">
                  <input
                    placeholder="Short tagline"
                    value={formData.tagline}
                    onChange={(e)=>setFormData({...formData,tagline:e.target.value})}
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="form-card">
                <div className="form-group">
                  <div className = "form-title">Full Listing Description *</div>
                    <textarea
                      rows={6}
                      placeholder="Describe your listing in detail. Include what makes it special, what visitors can expect, and any important information they should know..."
                      value={formData.description}
                      onChange={(e)=>setFormData({...formData,description:e.target.value})}
                    />
                    <small className="helper-text">
                      Be descriptive — great listings get more engagement
                    </small>
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
              onClick={() => {
                if (
                  !formData.title ||
                  !formData.category ||
                  !formData.district ||
                  !formData.minPrice ||
                  !formData.maxPrice
                ) {
                  setFormError("Please fill all required fields");
                  return;

                }
                setFormError(""); // clear error if valid
                if (editingListing) {
                  setListings(
                    listings.map((item) =>
                      item.id === editingListing.id
                        ? {
                            ...item,
                            title: formData.title,
                            category: formData.category,
                            district: formData.district,
                            minPrice: formData.minPrice,
                            maxPrice: formData.maxPrice,
                            tagline: formData.tagline,
                            description: formData.description,
                            imageName: formData.imageName,
                            imagePreview: formData.imagePreview
                          }
                        : item
                    )
                  );

                } else{
                  
                  // Create New Listing
                  const newListing = {
                    id: Date.now(),
                    title: formData.title,
                    category: formData.category,
                    district: formData.district,
                    minPrice: formData.minPrice,
                    maxPrice: formData.maxPrice,
                    tagline: formData.tagline,
                    description: formData.description,
                    imageName: formData.imageName,
                    imagePreview: formData.imagePreview,
                    tags: formData.tags
                      ? formData.tags.split(",").map(tag => tag.trim())
                      : ["New"],


                  };
                  setListings([...listings, newListing]);
                  setFormData(emptyForm);
                  setEditingListing(null);
                  setShowAll(true);

                }
                setShowModal(false);
              }}
            >
              {editingListing ? "Update Listing" : "Create Listing"}
            </button>

          </div>
        </div>
        </div>
      )}


    </main>
)}
