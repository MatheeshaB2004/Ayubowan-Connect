"use client";

import { useState } from "react";
import "./page.css";

export default function CreateListingsPage() {
  
  const [showModal, setShowModal] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const [listings, setListings] = useState<any[]>([]);

  const [formData, setFormData] = useState({
  title: "",
  description: "",
  location: "",
  price: "",
});


  if (listings.length === 0) {
  setListings([
    {
      id: 1,
      title: "Village cooking class",
      description:
        "Learn traditional recipes in a family kitchen. Includes ingredients and a communal meal together.",
      location: "Kandy",
      price: "LKR 3000 – 5000",
      image: "/vendor_management/listing-1.jpeg",
      tags: ["Cultural", "Authentic", "Hands-on"],
    },
    {
      id: 2,
      title: "Temple art workshop",
      description:
        "Understand symbolism, history, and cultural meaning behind each artistic style.",
      location: "Galle",
      price: "LKR 2500 – 4500",
      image: "/vendor_management/listing-2.jpeg",
      tags: ["Workshop", "Authentic", "Art"],
    },
  ]);
}

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
      <section className="actions">
        <div className="action-card">

          <div className="action-image">
            <img src="/vendor_management/card-1.jpeg" alt="Listings preview" />
          </div>

          <div className="action-content">
            <span className="action-label">LISTINGS</span>
            <h3 className="action-title">Add and manage your experiences</h3>
            <p className="action-text">
              Create new offerings or edit existing ones for your storefront.
            </p>
            <span className="action-link">Go to listings →</span>
          </div>

        </div>

        <div className="action-card">

          <div className="action-image">
            <img src="/vendor_management/card-2.jpeg" alt="Events preview" />
          </div>

          <div className="action-content">
            <span className="action-label">EVENTS</span>
            <h3 className="action-title">Schedule cultural events and gatherings</h3>
            <p className="action-text">
              Build your calendar of upcoming activities and workshops.
            </p>
            <span className="action-link">Manage events →</span>
          </div>

        </div>
      </section>

      {/* CREATE FIRST LISTING SECTION */}
      <section className="create-listing">
        <div className="create-listing-content">
          <h2 className="section-title">Create your first listing</h2>
          <p className="section-description">
          Fill in the details below and share what you offer. Your listing appears
          in the marketplace once submitted for review.
          </p>

          <ul className="feature-list">
            <li>Captivating title</li>
            <li>High-quality imagery</li>
            <li>Accurate location tags</li>
          </ul>

          <div className="action-row">
            <button
               className="primary-button"
               onClick={() => {
                setEditingListing(null);
                setFormData({
                  title: "",
                  description: "",
                  location: "",
                  price: "",
                });
                setShowModal(true);
               }}
            >
              Create Listing
            </button>

            <a href="#" className="text-link">View Listing →</a>
          </div>
        </div>

        <div className="create-listing-image">
          <img src="/vendor_management/card-1.jpeg" alt="Artisan creating a listing"/>
        </div>
      </section>

      {/* CURRENT OFFERINGS */}
      <section className="offerings">
        <div className="offerings-head">
          <span className="label">PORTFOLIO</span>
          <h2 className="title">Your current offerings</h2>
          <p className="desc">Manage what travelers can discover and book</p>
        </div>

        {listings.map((listing) => (
          <div className="offer-card" key={listing.id}>
            <div className="offer">
              <div className="offer-image">
                <img src={listing.image} alt={listing.title} />

                <div className="offer-button">
                  <button 
                    className="edit-btn"
                    title="Edit"
                    onClick={() => {
                      setEditingListing(listing);
                      setFormData({
                        title: listing.title,
                        description: listing.description,
                        location: listing.location,
                        price: listing.price,
                      });
                      setShowModal(true);
                    }}
                  > <i className="fa-solid fa-pen"></i>
                  </button>

                  <button className="delete-btn" title="Delete"> 
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

              <div className="offer-text">
                <h3>{listing.title}</h3>

                <div className="tags">
                  {listing.tags.map((tag: string) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <p>{listing.description}</p>

                <div className="price-inline">
                  <span className="price-inline-amount">{listing.price}</span>
                  <span className="price-inline-meta">· per person</span>
                </div>


                <div className="location-tags">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{listing.location}</span>
                  <span>Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>
        ))}


        <div className="view-all-wrap">
          <button className="view-all">View all listings</button>
        </div>
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
              <div className="form-group">
                <label>Title</label>
                <input 
                  placeholder="Village cooking experience"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Describe what guests will do"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    placeholder="Kandy"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

              <div className="form-group">
                <label>Price Range</label>
                <input 
                  placeholder="LKR 3000 – 5000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />

              </div>
            </div>

            <div className="form-group">
              <label>Images</label>
              <input type="file" />
            </div>
          </div>

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
                if (editingListing) {
                  setListings(
                    listings.map((item) =>
                      item.id === editingListing.id
                        ? { ...item, ...formData }
                        : item
                    )
                  );
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
  );
}