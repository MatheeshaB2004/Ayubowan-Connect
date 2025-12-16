'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Linkedin, Twitter, Globe, 
  Calendar, Map, ShoppingBag, MessageCircle, 
  Search, FileText, Phone, CalendarCheck,
  Star, Bot
} from 'lucide-react';
import '../../styles/pages/Landing.css';

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

const LandingPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeProTab, setActiveProTab] = useState<'planning' | 'translation' | 'insights'>('planning');

  const proFeatures = {
    planning: {
      tag: 'Plan',
      title: 'AI itinerary planner builds your journey',
      desc: 'Tell the system your interests and days available. Get a personalized itinerary that flows like a story, not a checklist.',
      image: '/assets/pro/planner.jpg',
      ctaPrimary: 'Start',
      ctaSecondary: 'Explore'
    },
    translation: {
      tag: 'Connect',
      title: 'Chat like a local, instantly',
      desc: 'Real-time translation for chat. Ask questions, bargain respectfully, and make friends without the language barrier.',
      image: '/assets/photos/B4.webp',
      ctaPrimary: 'Translate',
      ctaSecondary: 'Learn how'
    },
    insights: {
      tag: 'Grow',
      title: 'Insights that power your business',
      desc: 'For vendors: track views, understand traveler trends, and optimize your listings to reach the right audience.',
      image: '/assets/photos/B6.jpg',
      ctaPrimary: 'Dashboard',
      ctaSecondary: 'View demo'
    }
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-white w-full overflow-hidden font-sans text-gray-900">
      {/* HERO SECTION - KEPT AS IS */}
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
            Discover authentic Sri Lankan <br /> culture and treasures
          </h1>
          <p className="hero-text">
            Connect with real people, real stories, and real crafts from the island. Experience the warmth of Sri Lankan hospitality through cultural activities and handmade goods that tell generations of tradition.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary">Explore</button>
            <button className="btn-hero-secondary">Learn</button>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section className="offer-section" id="offer">
        <div className="section-intro">
          <span className="section-tag tag-lochinvar">Explore</span>
          <h2 className="section-title">What we offer</h2>
          <p className="intro-text">Browse curated experiences and marketplace items</p>
        </div>

        <div className="offer-grid">
          {/* Left Column - 2x2 Grid */}
          <div className="offer-grid-left">
            {/* Card 1 */}
            <div className="offer-card" id="events">
              <div className="offer-icon-wrapper">
                <Calendar size={24} />
              </div>
              <span className="section-tag tag-waikawa" style={{marginBottom: '0.5rem'}}>Calendar</span>
              <h3 className="offer-card-title">Cultural event calendar</h3>
              <p className="offer-card-desc">Find festivals, workshops and gatherings</p>
              <a href="#" className="offer-link">
                View <ChevronRight size={14} className="ml-1" />
              </a>
            </div>

            {/* Card 2 */}
            <div className="offer-card" id="experiences">
              <div className="offer-icon-wrapper">
                <Map size={24} />
              </div>
              <span className="section-tag tag-waikawa" style={{marginBottom: '0.5rem'}}>Experiences</span>
              <h3 className="offer-card-title">Village tours, cooking classes and traditions</h3>
              <p className="offer-card-desc">Browse</p>
              <a href="#" className="offer-link">
                Marketplace <ChevronRight size={14} className="ml-1" />
              </a>
            </div>

            {/* Card 3 */}
            <div className="offer-card" id="marketplace">
              <div className="offer-icon-wrapper">
                <ShoppingBag size={24} />
              </div>
              <span className="section-tag tag-waikawa" style={{marginBottom: '0.5rem'}}>Shop</span>
              <h3 className="offer-card-title">Handmade crafts and authentic local goods</h3>
              <p className="offer-card-desc">Assistant</p>
              <a href="#" className="offer-link">
                Get personalized recommendations <ChevronRight size={14} className="ml-1" />
              </a>
            </div>

            {/* Card 4 */}
            <div className="offer-card">
              <div className="offer-icon-wrapper">
                <Bot size={24} />
              </div>
              <span className="section-tag tag-waikawa" style={{marginBottom: '0.5rem'}}>Assistant</span>
              <h3 className="offer-card-title">NLP Chatbot</h3>
              <p className="offer-card-desc">Smart travel assistance powered by natural language processing</p>
              <a href="#" className="offer-link">
                Chat now <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Right Column - Large Card */}
          <div className="offer-card-large">
            <div className="offer-large-img">
              <img src="/assets/pro/pro.jpg" alt="Pro Features" />
            </div>
            <div className="text-left">
              <span className="section-tag tag-lochinvar">Pro</span>
              <h3 className="section-title" style={{fontSize: '1.75rem', marginBottom: '1rem'}}>Unlock premium features for deeper discovery</h3>
              <p className="intro-text" style={{marginBottom: '2rem', textAlign: 'left'}}>Upgrade your journey with AI planning and translation</p>
              <div className="flex gap-4">
                <button className="btn-hero-primary">Upgrade</button>
                <button className="mission-btn-learn">
                  Learn <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* GO DEEPER WITH PRO SECTION */}
      <section className="pro-section" id="pro">
        <div className="pro-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag tag-trendy">Premium</span>
            <h2 className="section-title">Go deeper with Pro</h2>
            <p className="intro-text mb-8">
              Unlock tools built for serious travelers and vendors. Plan smarter, translate freely, and track what matters.
            </p>
            <div className="flex justify-center items-center gap-4">
              <button className="btn-hero-primary">Upgrade</button>
              <button className="mission-btn-learn">
                Learn <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="pro-tabs">
            <button 
              className={`pro-tab-btn ${activeProTab === 'planning' ? 'active' : ''}`}
              onClick={() => setActiveProTab('planning')}
            >
              AI planning
            </button>
            <button 
              className={`pro-tab-btn ${activeProTab === 'translation' ? 'active' : ''}`}
              onClick={() => setActiveProTab('translation')}
            >
              Smart translation
            </button>
            <button 
              className={`pro-tab-btn ${activeProTab === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveProTab('insights')}
            >
              Vendor insights
            </button>
          </div>

          {/* Tab Content */}
          <div className="pro-content-box">
            <div className="pro-image-wrapper">
              <img src={proFeatures[activeProTab].image} alt={proFeatures[activeProTab].title} />
            </div>
            <div className="pro-text-content">
              <span className="section-tag tag-lochinvar">{proFeatures[activeProTab].tag}</span>
              <h3 className="section-title" style={{fontSize: '2rem', marginBottom: '1rem'}}>{proFeatures[activeProTab].title}</h3>
              <p className="intro-text" style={{textAlign: 'left', marginBottom: '2rem'}}>
                {proFeatures[activeProTab].desc}
              </p>
              <div className="flex gap-4">
                <button className="btn-hero-primary">{proFeatures[activeProTab].ctaPrimary}</button>
                <button className="mission-btn-learn">
                  {proFeatures[activeProTab].ctaSecondary} <ChevronRight size={14} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="steps-section">
        <div className="section-intro">
          <span className="section-tag tag-waikawa">Simple</span>
          <h2 className="section-title">How it works</h2>
          <p className="intro-text">Four steps from discovery to connection</p>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <div>
              <Search className="step-icon" size={32} />
              <h3 className="step-title">Browse authentic listings and real stories</h3>
              <p className="step-desc">Scroll through experiences and crafts that matter</p>
            </div>
            <a href="#" className="step-link">
              Browse <ChevronRight size={14} className="ml-1" />
            </a>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div>
              <FileText className="step-icon" size={32} />
              <h3 className="step-title">Read details, see photos and cultural background</h3>
              <p className="step-desc">Every listing tells you what to expect</p>
            </div>
            <a href="#" className="step-link">
              Discover <ChevronRight size={14} className="ml-1" />
            </a>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div>
              <Phone className="step-icon" size={32} />
              <h3 className="step-title">Contact the vendor directly by phone</h3>
              <p className="step-desc">Speak with them, ask questions, build trust</p>
            </div>
            <a href="#" className="step-link">
              Connect <ChevronRight size={14} className="ml-1" />
            </a>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div>
              <CalendarCheck className="step-icon" size={32} />
              <h3 className="step-title">Request a booking through the platform</h3>
              <p className="step-desc">Confirm dates and details with confidence</p>
            </div>
            <a href="#" className="step-link">
              Book <ChevronRight size={14} className="ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section" id="team">
        <div className="section-intro">
          <span className="section-tag tag-lochinvar">Team</span>
          <h2 className="section-title">Our passionate team</h2>
          <p className="intro-text">The heart and soul behind Ayubowan Connect's cultural mission</p>
        </div>

        <div className="team-grid">
          {[
            { name: 'Niveka Wijeratne', role: 'Team Lead / Backend Developer', desc: 'Leads the team, manages project structure, and oversees API integration.', image: 'niveka.jpg' },
            { name: 'Dulesini Jayathilaka', role: 'Backend Developer', desc: 'Develops authentication APIs, manages user data, and handles security logic.', image: 'Dulesini.jpg' },
            { name: 'Yenulka De Silva', role: 'Backend Developer', desc: 'Creates CRUD APIs, manages database schemas, and handles server-side validation.', image: 'yenulka.jpg' },
            { name: 'Keerjanapirian Rasakumaran', role: 'Frontend Developer', desc: 'Focuses on styling, responsiveness, and improving overall visual design.', image: 'priyan.jpg' },
            { name: 'Yeran Srinayaka', role: 'Frontend Developer', desc: 'Handles form pages, user input validation, and connecting UI forms to APIs.', image: 'yeran.jpg' },
            { name: 'Matheesha Talagune', role: 'Frontend Developer', desc: 'Responsible for building main page layouts and core UI components.', image: 'matheesha.jpg' },
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

      {/* WHAT PEOPLE SAY SECTION */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-intro">
          <h2 className="section-title">What people say</h2>
          <p className="intro-text">Real stories from travelers and vendors</p>
        </div>

        <div className="testimonials-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="#111827" />
              ))}
            </div>
            <p className="testimonial-text">
              "I found a cooking class in a family home outside Galle. The vendor answered my call within minutes. That's when I knew this was different."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/assets/stories/s1.webp" alt="Keiko Tanaka" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Keiko+Tanaka&background=random'; }} />
              </div>
              <div className="author-info">
                <h4>Keiko Tanaka</h4>
                <span>Traveler, Japan</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="#111827" />
              ))}
            </div>
            <p className="testimonial-text">
              "As a weaver, I was skeptical about online platforms. Ayubowan Connect treated my work with respect and brought me customers who actually care about the craft."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/assets/stories/s2.jpg" alt="Chaminda Herath" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Chaminda+Herath&background=random'; }} />
              </div>
              <div className="author-info">
                <h4>Chaminda Herath</h4>
                <span>Vendor, Matara</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} fill="#111827" />
              ))}
            </div>
            <p className="testimonial-text">
              "The AI planner saved me days of research. It understood what I wanted and built an itinerary that felt like it was made just for me."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">
                <img src="/assets/hero/5.jpg" alt="Marcus Chan" onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Marcus+Chan&background=random'; }} />
              </div>
              <div className="author-info">
                <h4>Marcus Chan</h4>
                <span>Traveler, Singapore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO BEGIN SECTION */}
      <section className="ready-section">
        <h2 className="ready-title">
          Ready to begin <br />
          Your journey starts now
        </h2>
        <p className="ready-text">
          Step into stories that matter. Support real people. Own something with soul.
        </p>
        <div className="ready-actions">
          <button className="btn-ready-primary">
            Explore
          </button>
          <button className="btn-ready-secondary">
            Become a vendor
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

