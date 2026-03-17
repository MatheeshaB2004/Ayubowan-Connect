'use client';

import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Pro.css';

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

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

export default function ProPage() {
  const { user, role } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isProUser: boolean;
    proSubscriptionExpiry: string | null;
  } | null>(null);

  const isVendor = role === 'vendor';
  const selectedPlan: 'user' | 'vendor' = isVendor ? 'vendor' : 'user';
  const checkoutHref = `/payments/checkout?type=subscription&plan=${selectedPlan}&cycle=${billingCycle}`;
  const ctaLabel = subscriptionStatus?.isProUser ? 'Renew Subscription' : 'Upgrade now';

  useEffect(() => {
    if (!user?.id) {
      setSubscriptionStatus(null);
      return;
    }

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/subscriptions/status`, {
          headers: { 'x-user-id': user.id },
        });
        if (!response.ok) return;
        const data = await response.json();
        setSubscriptionStatus({
          isProUser: Boolean(data?.isProUser),
          proSubscriptionExpiry: data?.proSubscriptionExpiry ?? null,
        });
      } catch (error) {
        console.error('Failed to load subscription status:', error);
      }
    };

    fetchStatus();
  }, [user?.id]);

  const formattedExpiry = useMemo(() => {
    const expiry = subscriptionStatus?.proSubscriptionExpiry;
    if (!expiry) return null;
    const parsed = new Date(expiry);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }, [subscriptionStatus?.proSubscriptionExpiry]);

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
          {!isVendor && (
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
                <button className="pro-card-btn" onClick={scrollToPricing} suppressHydrationWarning>
                  Choose <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}

          {isVendor && (
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
                <button className="pro-card-btn" onClick={scrollToPricing} suppressHydrationWarning>
                  Choose <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {!isVendor && (
        <section className="pro-feature-section">
          <div className="pro-feature-grid">
            <div className="pro-feature-header-col">
              <span className="pro-section-tag">Explore</span>
              <h2 className="pro-feature-title">
                Travel smarter with User Pro
              </h2>
              <Link href={checkoutHref} className="pro-feature-btn" suppressHydrationWarning>
                {ctaLabel} <ArrowRight size={16} className="ml-2" />
              </Link>
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
      )}

      {isVendor && (
        <section className="pro-feature-section pro-feature-section-border">
          <div className="pro-feature-grid">
            <div className="pro-feature-header-col">
              <span className="pro-section-tag">Growth</span>
              <h2 className="pro-feature-title">
                Build your business stronger
              </h2>
              <Link href={checkoutHref} className="pro-feature-btn" suppressHydrationWarning>
                {ctaLabel} <ArrowRight size={16} className="ml-2" />
              </Link>
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
      )}

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
              suppressHydrationWarning
            >
              Monthly
            </button>
            <button
              className={`pro-pricing-toggle-btn ${billingCycle === 'yearly' ? 'pro-pricing-toggle-btn-active' : 'pro-pricing-toggle-btn-inactive'}`}
              onClick={() => setBillingCycle('yearly')}
              suppressHydrationWarning
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="pro-pricing-grid">
          {!isVendor && (
            <div className="pro-pricing-card">
              <div className="pro-pricing-card-header">
                <h3 className="pro-pricing-card-title">User Pro</h3>
                <p className="pro-pricing-card-subtitle">For travelers</p>
              </div>

              <div className="pro-pricing-price-container">
                <span className="pro-pricing-price">LKR {billingCycle === 'monthly' ? '900' : '9000'}</span>
                <span className="pro-pricing-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>

              {subscriptionStatus?.isProUser && formattedExpiry && (
                <div className="mb-4 text-sm text-gray-600">
                  <p>You are currently a Pro member</p>
                  <p>Valid until: {formattedExpiry}</p>
                </div>
              )}

              <Link href={checkoutHref} className="pro-pricing-cta-btn" suppressHydrationWarning>
                {ctaLabel}
              </Link>

              <ul className="pro-pricing-features-list">
                <li className="pro-pricing-feature-item">
                  <Check size={18} className="pro-pricing-check-icon" />
                  <span>AI itinerary planner</span>
                </li>

              </ul>
            </div>
          )}

          {isVendor && (
            <div className="pro-pricing-card">
              <div className="pro-pricing-card-header">
                <h3 className="pro-pricing-card-title">Vendor Pro</h3>
                <p className="pro-pricing-card-subtitle">For businesses</p>
              </div>

              <div className="pro-pricing-price-container">
                <span className="pro-pricing-price">LKR {billingCycle === 'monthly' ? '2500' : '25000'}</span>
                <span className="pro-pricing-period">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>

              {subscriptionStatus?.isProUser && formattedExpiry && (
                <div className="mb-4 text-sm text-gray-600">
                  <p>You are currently a Pro member</p>
                  <p>Valid until: {formattedExpiry}</p>
                </div>
              )}

              <Link href={checkoutHref} className="pro-pricing-cta-btn" suppressHydrationWarning>
                {ctaLabel}
              </Link>

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
          )}
        </div>
      </section>
    </div>
  );
}
