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
    </main>
  );
}