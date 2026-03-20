'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronRight, Linkedin, Twitter, Globe, 
  Calendar, Map, ShoppingBag, MessageCircle, 
  Search, FileText, Phone, CalendarCheck,
  Star, Bot, Code, Database, Server, Component
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
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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
            <a href="https://app.ayubowanconnect.com/" className="btn-hero-primary">Explore</a>
            <button className="btn-hero-secondary">Learn</button>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="steps-section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="section-intro">
          <span className="section-tag tag-waikawa">Technology</span>
          <h2 className="section-title">Our Tech Stack</h2>
          <p className="intro-text">Built with modern, scalable, and robust technologies</p>
        </div>

        <div className="steps-grid" style={{ paddingBottom: '5rem' }}>
          {[
            {
              id: 'frontend',
              icon: <Component className="step-icon" size={32} />,
              title: 'Frontend',
              desc: 'Next.js, React, and Tailwind CSS for a highly responsive and modern user interface.',
              tools: ['Next.js App Router', 'React 18', 'Tailwind CSS', 'Lucide Icons']
            },
            {
              id: 'backend',
              icon: <Server className="step-icon" size={32} />,
              title: 'Backend',
              desc: 'NestJS and Node.js powering a secure, modular, and high-performance API.',
              tools: ['NestJS', 'Node.js', 'RESTful APIs', 'JWT Auth']
            },
            {
              id: 'database',
              icon: <Database className="step-icon" size={32} />,
              title: 'Database',
              desc: 'PostgreSQL and Prisma ORM ensure robust data modeling and reliable transactions.',
              tools: ['PostgreSQL', 'Prisma ORM', 'Supabase', 'Redis Caching']
            },
            {
              id: 'tooling',
              icon: <Code className="step-icon" size={32} />,
              title: 'Language & Tooling',
              desc: 'TypeScript across the entire stack for type safety, plus Cloudinary for media management.',
              tools: ['TypeScript', 'Cloudinary', 'Docker', 'Vercel']
            }
          ].map((tech) => (
            <div 
              key={tech.id} 
              className="step-card"
              onMouseEnter={() => setHoveredTech(tech.id)}
              onMouseLeave={() => setHoveredTech(null)}
              style={{
                transform: hoveredTech === tech.id ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
                boxShadow: hoveredTech === tech.id ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '',
                borderColor: hoveredTech === tech.id ? '#1e293b' : ''
              }}
            >
              <div>
                {tech.icon}
                <h3 className="step-title">{tech.title}</h3>
                <p className="step-desc">{tech.desc}</p>
                
                <div 
                  style={{
                    marginTop: '1.5rem',
                    opacity: hoveredTech === tech.id ? 1 : 0,
                    height: hoveredTech === tech.id ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tech.tools.map((tool, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#e2e8f0',
                        color: '#1e293b',
                        borderRadius: '9999px',
                        fontWeight: '600'
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section className="offer-section" id="offer" style={{ backgroundColor: 'white' }}>
        <div className="section-intro">
          <span className="section-tag tag-lochinvar">Explore</span>
          <h2 className="section-title">What we offer</h2>
          <p className="intro-text">Browse curated experiences and marketplace items</p>
        </div>

        <div className="steps-grid" style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
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
            { name: 'Niveka Wijeratne', role: 'Team Lead / Co-founder & Developer', desc: 'Architected the core platform and developed the comprehensive Vendor Dashboard and Insights features.', image: 'niveka.jpg' },
            { name: 'Dulesini Jayathilaka', role: 'Co-founder & Developer', desc: 'Built the secure Authentication pipeline, User Profile management, and Role-based access control.', image: 'Dulesini.jpg' },
            { name: 'Yenulka De Silva', role: 'Co-founder & Developer', desc: 'Engineered the AI Itinerary Planner and optimized the core database architecture for seamless scaling.', image: 'yenulka.jpg' },
            { name: 'Keerjanapirian Rasakumaran', role: 'Co-founder & Developer', desc: 'Developed the Cultural Events Calendar and implemented the interactive mapping and discovery features.', image: 'priyan.jpg' },
            { name: 'Yeran Srinayaka', role: 'Co-founder & Developer', desc: 'Created the dynamic Booking System, Vendor Registration flow, and secure Checkout pipeline.', image: 'yeran.jpg' },
            { name: 'Matheesha Talagune', role: 'Co-founder & Developer', desc: 'Designed and implemented the main Marketplace, Landing experience, and NLP Chatbot integration.', image: 'matheesha.png' },
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
          <a href="https://app.ayubowanconnect.com/" className="btn-ready-primary">
            Explore
          </a>
          <a href="https://app.ayubowanconnect.com/auth/vendor-register" className="btn-ready-secondary">
            Become a vendor
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

