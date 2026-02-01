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
    </main>
  );
}