'use client';

import React, { useState, useEffect } from 'react';
import "../../styles/pages/Landing.css";
import { ChevronRight, Linkedin, Twitter, Globe, Package, Users, Palette } from 'lucide-react';

const heroImages = [
  "/assets/hero/1.jpg",
  "/assets/hero/2.jpg",
  "/assets/hero/3.jpg",
  "/assets/hero/5.jpg",
  "/assets/hero/6.jpeg",
  "/assets/hero/7.jpeg",
  "/assets/hero/8.jpg",
  "/assets/hero/9.jpg",
  "/assets/hero/10.jpg"
];

const storyImages = [
  "/assets/stories/s1.webp",
  "/assets/stories/s2.jpg",
];

const LandingPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    const storyInterval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % storyImages.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(storyInterval);
    };
  }, []);

  return (
    <div className="bg-white w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="landing-hero">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`hero-bg-img ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Discover the heart of <br /> Sri Lanka
          </h1>
          <p className="hero-text">
            Connect with authentic local experiences that transform travel into a deep cultural journey. Explore hidden stories, traditions, and connections that go beyond typical tourism.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary">Explore</button>
            <button className="btn-hero-secondary">Learn</button>
          </div>
        </div>
      </section>

      {/* INTRO TEXT */}
      <section className="section-intro">
        <span className="section-tag tag-lochinvar">Connect</span>
        <h2 className="section-title">
          Authentic experiences at <br /> your fingertips
        </h2>
        <p className="intro-text">Discover unique cultural journeys across Sri Lanka</p>
      </section>

      {/* THREE CARDS SECTION */}
      <section className="container mx-auto cards-section">
        <div className="cards-grid">
          {/* Card 1 - Lochinvar (Main Green) */}
          <div className="feature-card bg-lochinvar">
            <img src="/assets/hero/5.jpg" className="card-img" alt="Explore" />
            <div className="card-gradient"></div>
            <div className="card-content">
              <span className="card-tag">Explore</span>
              <h3 className="card-title">Connecting travelers with local traditions</h3>
              <p className="card-desc">Immerse yourself in genuine Sri Lankan experiences through personal connections</p>
              <a href="#" className="card-link">
                Discover <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Card 2 - Waikawa (Blue-ish Gray) */}
          <div className="feature-card bg-waikawa">
            <img src="/assets/hero/6.jpeg" className="card-img" alt="Engage" />
            <div className="card-gradient"></div>
            <div className="card-content">
              <span className="card-tag">Engage</span>
              <h3 className="card-title">Empowering local communities through cultural exchange</h3>
              <p className="card-desc">Support small vendors and artisans while creating meaningful travel memories</p>
              <a href="#" className="card-link">
                Connect <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Card 3 - Trendy (Purple/Pink) */}
          <div className="feature-card bg-trendy">
            <img src="/assets/hero/7.jpeg" className="card-img" alt="Transform" />
            <div className="card-gradient"></div>
            <div className="card-content">
              <span className="card-tag">Transform</span>
              <h3 className="card-title">Technology bridging cultural understanding</h3>
              <p className="card-desc">Seamless platform connecting travelers with authentic local experiences and stories</p>
              <a href="#" className="card-link">
                Learn <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="section-intro section-intro-mission">
        <div className="mission-icon-wrapper">
          <Users size={48} strokeWidth={1} />
        </div>
        <span className="section-tag tag-waikawa">Mission</span>
        <h2 className="section-title">Our journey of cultural connection</h2>
        <p className="mission-text">
          Ayubowan Connect was born from a deep passion to preserve and share Sri Lanka's rich cultural heritage. We believe authentic experiences create lasting memories and meaningful connections.
        </p>
        <div className="mission-actions">
          <button className="mission-btn-story">Our story</button>
          <button className="mission-btn-learn">
            Learn more <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </section>

      {/* LARGE IMAGE PLACEHOLDER 1 */}
      <section className="container mx-auto large-image-section">
        <div className="large-image-container ratio-16-7">
          <img src="/assets/hero/8.jpg" className="large-image-bg" alt="Traditional Craftsmanship" />
          <div className="large-image-overlay">
            <div className="large-image-icon-box">
              <Palette className="large-image-icon" />
            </div>
            <div className="large-image-text">
              <h3>Preserving Heritage</h3>
              <p>Witness the intricate art of traditional craftsmanship passed down through generations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="benefits-section">
        <div className="section-intro">
          <span className="section-tag tag-lochinvar">Benefits</span>
          <h2 className="section-title">Why choose Ayubowan Connect</h2>
          <p className="intro-text">Transform your travel experience with genuine cultural interactions</p>
        </div>

        <div className="benefits-grid">
          {/* Box 1 - Waikawa */}
          <div className="benefit-box bg-waikawa">
            <img src="/assets/hero/9.jpg" className="benefit-img-overlay" alt="Travelers" />
            <div className="benefit-content">
              <Package size={32} className="benefit-icon" />
              <h3>For travelers</h3>
              <p>Discover unique experiences curated by local experts that go beyond traditional tourism</p>
              <div className="benefit-actions">
                <button className="btn-hero-secondary">Explore</button>
                <button className="benefit-btn-dive">
                  Dive deeper <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Box 2 - Lochinvar */}
          <div className="benefit-box bg-lochinvar">
            <img src="/assets/hero/10.jpg" className="benefit-img-overlay" alt="Vendors" />
            <div className="benefit-content">
              <Users size={32} className="benefit-icon" />
              <h3>For local vendors</h3>
              <p>Expand your reach and share your craft with a global audience of curious travelers</p>
              <div className="benefit-actions">
                <button className="btn-hero-secondary">Join now</button>
                <button className="benefit-btn-dive">
                  Connect <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section">
        <div className="section-intro">
          <span className="section-tag tag-lochinvar">Team</span>
          <h2 className="section-title">Our passionate team</h2>
          <p className="intro-text">The heart and soul behind Ayubowan Connect's cultural mission</p>
        </div>

        <div className="team-grid">
          {[
            { name: 'Niveka', role: 'Team Lead / Backend Developer', desc: 'Leads the team, manages project structure, and oversees API integration.', image: 'niveka.jpg' },
            { name: 'Dulasini', role: 'Backend Developer', desc: 'Develops authentication APIs, manages user data, and handles security logic.', image: 'dulasini.jpg' },
            { name: 'Yenulka', role: 'Backend Developer', desc: 'Creates CRUD APIs, manages database schemas, and handles server-side validation.', image: 'yenulka.jpg' },
            { name: 'Priyan', role: 'Frontend Developer', desc: 'Focuses on styling, responsiveness, and improving overall visual design.', image: 'priyan.jpg' },
            { name: 'Yeran', role: 'Frontend Developer', desc: 'Handles form pages, user input validation, and connecting UI forms to APIs.', image: 'yeran.jpg' },
            { name: 'Matheesha', role: 'Frontend Developer', desc: 'Responsible for building main page layouts and core UI components.', image: 'matheesha.jpg' },
          ].map((member, i) => (
            <div key={i} className="team-member">
              <div className="team-img-wrapper">
                <img 
                  src={`/assets/team/${member.image}`} 
                  className="team-img" 
                  alt={member.name}
                  onError={(e) => {
                    // Fallback to a placeholder if image is missing
                    (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + member.name + '&background=random';
                  }}
                />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-desc">{member.desc}</p>
              <div className="team-socials">
                <Linkedin size={14} />
                <Twitter size={14} />
                <Globe size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="team-footer">
          <h3>Join our team</h3>
          <p>Help us build bridges between cultures and create meaningful experiences</p>
          <button className="btn-view-positions">View positions</button>
        </div>
      </section>

      {/* STORIES SPLIT SECTION */}
      <section className="stories-section">
        <div className="container mx-auto stories-split">
          <div className="stories-content">
            <span className="section-tag tag-white">Stories</span>
            <h2 className="section-title text-white">Real experiences from travelers and local vendors</h2>
            <p className="mission-text text-white-opacity">Our platform connects people through authentic cultural journeys</p>

            <div className="stories-grid">
              <div>
                <h4 className="story-header text-white">Traveler insights</h4>
                <p className="story-desc text-white-opacity">Transformative moments that go beyond typical tourism</p>
              </div>
              <div>
                <h4 className="story-header text-white">Vendor perspectives</h4>
                <p className="story-desc text-white-opacity">Local artisans sharing their craft and traditions with the world</p>
              </div>
            </div>

            <div className="stories-actions">
              <button className="btn-hero-secondary">Explore</button>
              <button className="btn-read-more text-white">
                Read more <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          <div className="stories-image-container">
            {storyImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                className={`stories-img ${index === currentStoryIndex ? 'active' : ''}`} 
                alt="Stories" 
                onError={(e) => {
                  // Fallback if image is missing
                  (e.target as HTMLImageElement).src = `https://picsum.photos/800/800?random=${30 + index}&grayscale`;
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <div className="container mx-auto cta-content">
          <h2 className="section-title">Start your cultural journey today</h2>
          <p className="mission-text" style={{ marginBottom: '2rem' }}>
            Connect with authentic experiences and support local communities across Sri Lanka
          </p>
          <div className="cta-actions">
            <button className="cta-btn-signup">Sign up</button>
            <button className="cta-btn-learn">Learn more</button>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section">
        <div className="container mx-auto">
          <div className="gallery-grid-top">
            <div className="gallery-large-left">
              <img 
                src="/assets/photos/B1.jpeg" 
                alt="Gallery 1" 
                className="gallery-img" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/236356/FFF?text=Gallery+1'; }}
              />
            </div>
            <div className="gallery-grid-right">
              <img 
                src="/assets/photos/B2.webp" 
                alt="Gallery 2" 
                className="gallery-img" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/3C5578/FFF?text=Gallery+2'; }}
              />
              <img 
                src="/assets/photos/B3.jpg" 
                alt="Gallery 3" 
                className="gallery-img" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/6E3C78/FFF?text=Gallery+3'; }}
              />
              <img 
                src="/assets/photos/B4.webp" 
                alt="Gallery 4" 
                className="gallery-img" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/1A2E29/FFF?text=Gallery+4'; }}
              />
              <img 
                src="/assets/photos/b5.jpg" 
                alt="Gallery 5" 
                className="gallery-img" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/1E293B/FFF?text=Gallery+5'; }}
              />
            </div>
          </div>
          <div className="gallery-grid-bottom">
            <img 
              src="/assets/photos/B6.jpg" 
              alt="Gallery 6" 
              className="gallery-img" 
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/3B1E3B/FFF?text=Gallery+6'; }}
            />
            <img 
              src="/assets/photos/B7.jpg" 
              alt="Gallery 7" 
              className="gallery-img" 
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/236356/FFF?text=Gallery+7'; }}
            />
            <img 
              src="/assets/photos/B8.jpg" 
              alt="Gallery 8" 
              className="gallery-img" 
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/3C5578/FFF?text=Gallery+8'; }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
