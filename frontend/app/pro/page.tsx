'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowRight,
  Globe,
  Map,
  BarChart3,
  Eye,
  Check,
  Image as ImageIcon,
  Box,
  Zap,
  Search
} from 'lucide-react';

export default function ProPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pro-page-container">
      {/* Hero Section */}
      <section className="pro-hero-section">
        <h1 className="pro-hero-title">
          Unlock more on<br />Ayubowan Connect
        </h1>
        <p className="pro-hero-subtitle">
          Choose your Pro experience and access premium features designed for deeper exploration and greater reach
        </p>
      </section>

      {/* Path Selection Section */}
      <section className="pro-path-section">
        <div className="pro-section-header">
          <span className="pro-section-tag">Plans</span>
          <h2 className="pro-section-title">Pick your path forward</h2>
          <p className="pro-section-desc">Select the plan that matches your journey</p>
        </div>

        <div className="pro-cards-grid">
          {/* Traveler Card */}
          <div className="pro-card group">
            <div className="pro-card-image-container">
              <Image
                src="/assets/pro/userpropic.png"
                alt="User Pro for travelers"
                fill
                className="object-cover"
              />
            </div>
            <div className="pro-card-content">
              <span className="pro-card-tag">Explorers</span>
              <h3 className="pro-card-title">User Pro for travelers</h3>
              <p className="pro-card-desc">Plan trips with AI</p>
              <button className="pro-card-btn" onClick={scrollToPricing}>
                Choose <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Vendor Card */}
          <div className="pro-card group">
            <div className="pro-card-image-container">
              <Image
                src="/assets/pro/vendorpropic.png"
                alt="Vendor Pro for businesses"
                fill
                className="object-cover"
              />
            </div>
            <div className="pro-card-content">
              <span className="pro-card-tag">Creators</span>
              <h3 className="pro-card-title">Vendor Pro for businesses</h3>
              <p className="pro-card-desc">Track performance and reach more visitors</p>
              <button className="pro-card-btn" onClick={scrollToPricing}>
                Choose <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Traveler Features Section */}
      <section className="pro-feature-section">
        <div className="pro-feature-grid">
          <div className="pro-feature-header-col">
            <span className="pro-section-tag">Explore</span>
            <h2 className="pro-feature-title">
              Travel smarter with User Pro
            </h2>
            <button className="pro-feature-btn">
              Upgrade <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          <div className="pro-feature-list-col">
            <div className="pro-feature-item">
              <div className="pro-feature-icon">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="pro-feature-item-title">Plan with intelligence</h3>
                <p className="pro-feature-item-desc">Let AI craft itineraries matched to your interests and time.</p>
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-feature-icon">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="pro-feature-item-title">Explore without limits</h3>
                <p className="pro-feature-item-desc">Access all features and unlock the full Ayubowan Connect experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Features Section */}
      <section className="pro-feature-section pro-feature-section-border">
        <div className="pro-feature-grid">
          <div className="pro-feature-header-col">
            <span className="pro-section-tag">Growth</span>
            <h2 className="pro-feature-title">
              Build your business stronger
            </h2>
            <button className="pro-feature-btn">
              Upgrade <ArrowRight size={16} className="ml-2" />
            </button>
          </div>

          <div className="pro-feature-list-col">
            <div className="pro-feature-item">
              <div className="pro-feature-icon">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="pro-feature-item-title">Analytics dashboard for your listings</h3>
                <p className="pro-feature-item-desc">Watch views, inquiries and bookings in real time</p>
              </div>
            </div>

            <div className="pro-feature-item">
              <div className="pro-feature-icon">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="pro-feature-item-title">Visibility boost for your business</h3>
                <p className="pro-feature-item-desc">Stand out first in search results and get noticed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pro-pricing-section" id="pricing">
        <div className="pro-pricing-header">
          <span className="pro-section-tag">Pricing</span>
          <h2 className="pro-section-title">Choose your plan</h2>
          <p className="pro-section-desc mb-8">Pick monthly or yearly billing and start exploring today</p>

          <div className="pro-pricing-toggle-container">
            <button
              className={`pro-pricing-toggle-btn ${billingCycle === 'monthly' ? 'pro-pricing-toggle-btn-active' : 'pro-pricing-toggle-btn-inactive'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`pro-pricing-toggle-btn ${billingCycle === 'yearly' ? 'pro-pricing-toggle-btn-active' : 'pro-pricing-toggle-btn-inactive'}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="pro-pricing-grid">
          {/* User Pro Pricing */}
          <div className="pro-pricing-card">
            <div className="pro-pricing-card-header">
              <h3 className="pro-pricing-card-title">User Pro</h3>
              <p className="pro-pricing-card-subtitle">For travelers</p>
            </div>

            <div className="pro-pricing-price-container">
              <span className="pro-pricing-price">LKR {billingCycle === 'monthly' ? '900' : '9000'}</span>
              <span className="pro-pricing-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>

            <button className="pro-pricing-cta-btn">
              Upgrade now
            </button>

            <ul className="pro-pricing-features-list">
              <li className="pro-pricing-feature-item">
                <Check size={18} className="pro-pricing-check-icon" />
                <span>AI itinerary planner</span>
              </li>

            </ul>
          </div>

          {/* Vendor Pro Pricing */}
          <div className="pro-pricing-card">
            <div className="pro-pricing-card-header">
              <h3 className="pro-pricing-card-title">Vendor Pro</h3>
              <p className="pro-pricing-card-subtitle">For businesses</p>
            </div>

            <div className="pro-pricing-price-container">
              <span className="pro-pricing-price">LKR {billingCycle === 'monthly' ? '2500' : '25000'}</span>
              <span className="pro-pricing-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>

            <button className="pro-pricing-cta-btn">
              Upgrade now
            </button>

            <ul className="pro-pricing-features-list">
              <li className="pro-pricing-feature-item">
                <Check size={18} className="pro-pricing-check-icon" />
                <span>Vendor analytics dashboard</span>
              </li>

              <li className="pro-pricing-feature-item">
                <Check size={18} className="pro-pricing-check-icon" />
                <span>Priority listing placement</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
