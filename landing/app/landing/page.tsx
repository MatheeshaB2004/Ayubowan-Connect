'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const typewriterPhrases = [
  'culture and treasures',
  'handmade crafts',
  'authentic experiences',
  'village traditions',
  'local hospitality',
];

const heroStats = [
  { target: 500, suffix: '+', label: 'Verified Vendors' },
  { target: 20, suffix: '+', label: 'Cultural Events' },
  { target: 12, suffix: 'K+', label: 'Happy Travelers' },
  { target: 6, suffix: '', label: 'Passionate Devs' },
];

const testimonials = [
  {
    text: '"I found a cooking class in a family home outside Galle. The vendor answered my call within minutes. That\'s when I knew this was different."',
    name: 'Keiko Tanaka',
    from: 'Traveler, Japan',
    img: '/assets/stories/s1.webp',
  },
  {
    text: '"As a weaver, I was skeptical about online platforms. Ayubowan Connect treated my work with respect and brought me customers who actually care about the craft."',
    name: 'Chaminda Herath',
    from: 'Vendor, Matara',
    img: '/assets/stories/s2.jpg',
  },
  {
    text: '"The AI planner saved me days of research. It understood what I wanted and built an itinerary that felt like it was made just for me."',
    name: 'Marcus Chan',
    from: 'Traveler, Singapore',
    img: '/assets/hero/5.jpg',
  },
];

// ─── Custom hooks ──────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function AnimatedStat({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(target, 1600, start);
  return (
    <div className="hero-stat-item">
      <span className="hero-stat-number">{count}{suffix}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const LandingPage: React.FC = () => {
  // Hero slideshow
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Typewriter
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  // Stats
  const [statsStarted, setStatsStarted] = useState(false);
  // Tech section hover
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  // Testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialAutoRef = useRef<NodeJS.Timeout | null>(null);

  // Activate scroll reveal
  useScrollReveal();

  // Hero image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Start counters after a short delay on mount
  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = typewriterPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 45);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  // Testimonial auto-scroll
  const goToTestimonial = useCallback((index: number) => {
    setActiveTestimonial(index);
  }, []);

  const startTestimonialAuto = useCallback(() => {
    testimonialAutoRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
  }, []);

  useEffect(() => {
    startTestimonialAuto();
    return () => { if (testimonialAutoRef.current) clearInterval(testimonialAutoRef.current); };
  }, [startTestimonialAuto]);

  const handleTestimonialDotClick = (i: number) => {
    if (testimonialAutoRef.current) clearInterval(testimonialAutoRef.current);
    goToTestimonial(i);
    startTestimonialAuto();
  };

  return (
    <div className="bg-white w-full overflow-hidden font-sans text-gray-900">

      {/* ── HERO SECTION ── */}
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
          {/* Live pill */}
          <div className="hero-pill">
            <span className="hero-pill-dot"></span>
            Discover Sri Lanka
          </div>

          <h1 className="hero-title">
            Discover authentic Sri Lankan <br />
            <span style={{ color: 'rgba(55,150,131,0.9)' }}>{displayText}</span>
            <span className="typewriter-cursor" aria-hidden="true"></span>
          </h1>
          <p className="hero-text">
            Connect with real people, real stories, and real crafts from the island. Experience the warmth of Sri Lankan hospitality through cultural activities and handmade goods that tell generations of tradition.
          </p>
          <div className="hero-actions">
            <a href="https://app.ayubowanconnect.com/" className="btn-hero-primary">Explore</a>
            <button className="btn-hero-secondary">Learn More</button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats-bar">
          {heroStats.map((s) => (
            <AnimatedStat key={s.label} target={s.target} suffix={s.suffix} label={s.label} start={statsStarted} />
          ))}
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="offer-section-light" id="offer">
        {/* Anchor targets for header nav */}
        <span id="experiences" className="absolute -mt-20" aria-hidden="true" />
        <span id="events" className="absolute -mt-20" aria-hidden="true" />
        <span id="marketplace" className="absolute -mt-20" aria-hidden="true" />
        <div className="section-intro fade-in-up">
          <span className="section-tag">Explore</span>
          <h2 className="section-title">What we offer</h2>
          <p className="intro-text">Browse curated experiences and marketplace items</p>
        </div>

        <div className="steps-grid stagger-children max-w-[80rem] mx-auto px-4">
          {[
            { id: 'events',      cls: 'offer-card-light-events',      icon: <Calendar size={24} />,    tag: 'Calendar',    title: 'Cultural event calendar', desc: 'Find festivals, workshops and gatherings', link: 'View Events', url: 'https://app.ayubowanconnect.com/events' },
            { id: 'experiences', cls: 'offer-card-light-experiences', icon: <Map size={24} />,         tag: 'Experiences', title: 'Village tours, cooking classes and traditions', desc: 'Immersive authentic cultural journeys', link: 'Explore', url: 'https://app.ayubowanconnect.com/marketplace' },
            { id: 'marketplace', cls: 'offer-card-light-marketplace', icon: <ShoppingBag size={24} />, tag: 'Shop',        title: 'Handmade crafts and authentic local goods', desc: 'Support artisans and take home a piece of Sri Lanka', link: 'Shop Now', url: 'https://app.ayubowanconnect.com/marketplace' },
            { id: 'assistant',   cls: 'offer-card-light-assistant',   icon: <Bot size={24} />,         tag: 'Assistant',   title: 'AI Itinerary Planner', desc: 'Smart travel planning powered by AI — build your perfect Sri Lanka trip', link: 'Plan My Trip', url: 'https://app.ayubowanconnect.com/Itinerary_Planner' },
          ].map((card) => (
            <div className={`offer-card-light ${card.cls} fade-in-up`} id={card.id} key={card.id}>
              <div className="offer-icon-wrapper-light">
                {card.icon}
              </div>
              <h3 className="offer-card-title">{card.title}</h3>
              <p className="offer-card-desc">{card.desc}</p>
              <a href={card.url} target="_blank" rel="noopener noreferrer" className="offer-link-light mt-auto pt-4">
                {card.link} <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="hiw-section">
        <div className="section-intro fade-in-up">
          <span className="section-tag">Simple</span>
          <h2 className="section-title">How it works</h2>
          <p className="intro-text">Four steps from discovery to connection</p>
        </div>

        <div className="hiw-steps-grid stagger-children">
          {[
            { icon: <Search size={20} />, title: 'Browse authentic listings and real stories', desc: 'Scroll through experiences and crafts that matter', link: 'Browse', badge: '01', cls: 'hiw-card-1' },
            { icon: <FileText size={20} />, title: 'Read details, see photos and cultural background', desc: 'Every listing tells you what to expect', link: 'Discover', badge: '02', cls: 'hiw-card-2' },
            { icon: <Phone size={20} />, title: 'Contact the vendor directly by phone', desc: 'Speak with them, ask questions, build trust', link: 'Connect', badge: '03', cls: 'hiw-card-3' },
            { icon: <CalendarCheck size={20} />, title: 'Request a booking through the platform', desc: 'Confirm dates and details with confidence', link: 'Book', badge: '04', cls: 'hiw-card-4' },
          ].map((step, i) => (
            <div className={`hiw-card ${step.cls} fade-in-up`} key={i}>
              <span className="hiw-badge">{step.badge}</span>
              <div>
                <div className="hiw-icon-wrap">{step.icon}</div>
                <h3 className="hiw-title">{step.title}</h3>
                <p className="hiw-desc">{step.desc}</p>
              </div>
              <span className="hiw-link cursor-default">
                {step.link} <ChevronRight size={13} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="tech-section">
        <div className="section-intro fade-in-up">
          <span className="section-tag">Technology</span>
          <h2 className="section-title">Our Tech Stack</h2>
          <p className="intro-text">Built with modern, scalable, and robust technologies</p>
        </div>

        <div className="tech-grid stagger-children">
          {[
            { id: 'frontend', cls: 'tech-card-frontend', icon: <Component size={22} />, title: 'Frontend', desc: 'Next.js, React, and Tailwind CSS for a highly responsive and modern user interface.', tools: ['Next.js App Router', 'React 18', 'Tailwind CSS', 'Lucide Icons'] },
            { id: 'backend',  cls: 'tech-card-backend',  icon: <Server size={22} />,    title: 'Backend',  desc: 'NestJS and Node.js powering a secure, modular, and high-performance API.',              tools: ['NestJS', 'Node.js', 'RESTful APIs', 'JWT Auth'] },
            { id: 'database', cls: 'tech-card-database', icon: <Database size={22} />,  title: 'Database', desc: 'PostgreSQL and Prisma ORM ensure robust data modeling and reliable transactions.',      tools: ['PostgreSQL', 'Prisma ORM'] },
            { id: 'tooling',  cls: 'tech-card-tooling',  icon: <Code size={22} />,      title: 'Language & Tooling', desc: 'TypeScript across the entire stack, Cloudinary for media, and OpenAI for AI features.', tools: ['TypeScript', 'Cloudinary', 'OpenAI', 'Vercel'] },
          ].map((tech) => (
            <div key={tech.id} className={`tech-card ${tech.cls} fade-in-up`}>
              <div>
                <div className="tech-icon-box">{tech.icon}</div>
                <h3 className="tech-card-title">{tech.title}</h3>
                <p className="tech-card-desc">{tech.desc}</p>
              </div>
              <div className="tech-tools-wrap">
                {tech.tools.map((tool, idx) => (
                  <span key={idx} className="tech-tool-pill">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="team-section" id="team">
        <div className="section-intro fade-in-up">
          <span className="section-tag tag-lochinvar">Team</span>
          <h2 className="section-title">Our passionate team</h2>
          <p className="intro-text">The heart and soul behind Ayubowan Connect's cultural mission</p>
        </div>

        <div className="team-grid stagger-children">
          {[
            { name: 'Niveka Wijeratne', role: 'Team Lead / Co-founder & Developer', desc: 'Architected the core platform and developed the comprehensive Vendor Dashboard and Insights features.', image: 'niveka.jpg' },
            { name: 'Dulesini Jayathilaka', role: 'Co-founder & Developer', desc: 'Built the secure Authentication pipeline, User Profile management, and Role-based access control.', image: 'Dulesini.jpg' },
            { name: 'Yenulka De Silva', role: 'Co-founder & Developer', desc: 'Engineered the AI Itinerary Planner and optimized the core database architecture for seamless scaling.', image: 'yenulka.jpg' },
            { name: 'Keerjanapirian Rasakumaran', role: 'Co-founder & Developer', desc: 'Developed the Cultural Events Calendar and implemented the interactive mapping and discovery features.', image: 'priyan.jpg' },
            { name: 'Yeran Srinayaka', role: 'Co-founder & Developer', desc: 'Created the dynamic Booking System, Vendor Registration flow, and secure Checkout pipeline.', image: 'yeran.jpg' },
            { name: 'Matheesha Talagune', role: 'Co-founder & Developer', desc: 'Designed and implemented the main Marketplace, Landing experience, and NLP Chatbot integration.', image: 'matheesha.png' },
          ].map((member, i) => (
            <div key={i} className="team-member fade-in-up">
              <div className="team-img-wrapper">
                <img
                  src={`/assets/team/${member.image}`}
                  className="team-img"
                  alt={member.name}
                  onError={(e) => {
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

        <div className="team-footer fade-in-up">
          <h3>Join our team</h3>
          <p>Help us build bridges between cultures and create meaningful experiences</p>
          <button className="btn-view-positions">View positions</button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-intro fade-in-up">
          <h2 className="section-title">What people say</h2>
          <p className="intro-text">Real stories from travelers and vendors</p>
        </div>

        <div
          className="testimonials-carousel-wrapper"
          onMouseEnter={() => { if (testimonialAutoRef.current) clearInterval(testimonialAutoRef.current); }}
          onMouseLeave={startTestimonialAuto}
        >
          <div
            className="testimonials-track"
            ref={testimonialRef}
            style={{ transform: `translateX(calc(-${activeTestimonial * 100}% - ${activeTestimonial * 2}rem))` }}
          >
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i} style={{ minWidth: '100%' }}>
                <div className="testimonial-stars">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="#111827" />)}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img src={t.img} alt={t.name} onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${t.name}&background=random`; }} />
                  </div>
                  <div className="author-info">
                    <h4>{t.name}</h4>
                    <span>{t.from}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="testimonials-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`}
              onClick={() => handleTestimonialDotClick(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── READY TO BEGIN ── */}
      <section className="ready-section">
        <h2 className="ready-title fade-in-up">
          Ready to begin <br />
          Your journey starts now
        </h2>
        <p className="ready-text fade-in-up delay-200">
          Step into stories that matter. Support real people. Own something with soul.
        </p>
        <div className="ready-actions fade-in-up delay-400">
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
