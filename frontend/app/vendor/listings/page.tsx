import "./page.css"
export default function CreateListingsPage() {
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
            <button className="primary-button">Create Listing</button>
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

        <div className="offer-card">
          <div className="offer">
            <div className="offer-image">
              <img src="/vendor_management/listing-1.jpeg" alt="Village cooking class"/>

              <div className="offer-button">
                <button className="edit-btn" title="Edit">✎</button>
                <button className="delete-btn" title="Delete">🗑</button>
              </div>
            </div>

            <div className="offer-text">
              <h3>Village cooking class</h3>

              <div className="tags">
                <span>Cultural</span>
                <span>Authentic</span>
                <span>Hands-on</span>
              </div>

              <p>
              Learn traditional recipes in a family kitchen. Includes ingredients
              and a communal meal together.Cook alongside locals and enjoy an authentic cultural exchange beyond recipes.</p>

              <div className="location-tags">
                <i className="fa-solid fa-location-dot"></i>
                <span>Kandy </span>
                <span>Central Province</span>
                <span>Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="offer-card">
          <div className="offer">
            <div className="offer-image">
              <img src="/vendor_management/listing-2.jpeg" alt="Temple Art Workshop"/>

              <div className="offer-button">
                <button className="edit-btn" title="Edit">✎</button>
                <button className="delete-btn" title="Delete">🗑</button>
              </div>
            </div>

            <div className="offer-text">
              <h3>Temple art workshop</h3>

              <div className="tags">
                <span>Workshop</span>
                <span>Authentic</span>
                <span>Art</span>
              </div>

              <p>
              Learn traditional recipes in a family kitchen. Includes ingredients
              and a communal meal together.Understand symbolism, history, and cultural meaning behind each artistic style.</p>

              <div className="location-tags">
                <i className="fa-solid fa-location-dot"></i>
                <span>Galle </span>
                <span>Southern Province</span>
                <span>Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        

        <div className="view-all-wrap">
          <button className="view-all">
            View all listings 
          </button>
        </div>
      </section>

    </main>
  );
}