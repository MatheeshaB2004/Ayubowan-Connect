'use client';

import { useAuth } from "@/context/AuthContext";
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/api';
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

const API_BASE = API_BASE_URL;

export default function ProPage() {
  const { user, role } = useAuth();
  const { user: clerkUser } = useUser();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    isProUser: boolean;
    proSubscriptionExpiry: string | null;
    billingCycle: 'monthly' | 'yearly' | null;
  } | null>(null);

  const isVendor = role === 'vendor';
  const selectedPlan: 'user' | 'vendor' = isVendor ? 'vendor' : 'user';

  const isExpired =
    subscriptionStatus?.proSubscriptionExpiry &&
    new Date(subscriptionStatus.proSubscriptionExpiry) < new Date();

  const isActive =
    subscriptionStatus?.isProUser && !isExpired;

  const checkoutHref = isActive
    ? '#'
    : `/payments/checkout?type=subscription&plan=${selectedPlan}&cycle=${billingCycle}`;


  const ctaLabel = isActive
    ? 'Active Plan'
    : isExpired
      ? 'Renew Subscription'
      : 'Upgrade to Pro';

    useEffect(() => {
    if (!user?.id) {
      setSubscriptionStatus(null);
      return;
    }

    const userIdentifier = clerkUser?.primaryEmailAddress?.emailAddress || user.id;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_BASE}/subscriptions/status`, {
          headers: { 'x-user-id': userIdentifier },
        });
        if (!response.ok) return;
        const data = await response.json();
        setSubscriptionStatus({
          isProUser: Boolean(data?.isProUser),
          proSubscriptionExpiry: data?.proSubscriptionExpiry ?? null,
          billingCycle: data?.billingCycle ?? null,
        });
      } catch (error) {
        console.error('Failed to load subscription status:', error);
      }
    };

    fetchStatus();
  }, [user?.id, clerkUser]);


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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl text-center space-y-6">
        {/* Hero Section */}
        <section className="pro-hero-section">
          <h1 className="pro-hero-title">
            Unlock more on<br />Ayubowan Connect
          </h1>
          <p className="pro-hero-subtitle">
            Unlock premium tools, smarter planning, and exclusive features to elevate your experience.
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
                <div className="flex justify-center w-full">
                  <img
                    src="/assets/pro/userpropic.png"
                    alt="User Pro for travelers"
                    className="mx-auto max-w-xs object-contain"
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
                <div className="flex justify-center w-full">
                  <img
                    src="/assets/pro/vendorpropic.png"
                    alt="Vendor Pro for businesses"
                    className="mx-auto max-w-xs object-contain"
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
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  {isActive ? (
                    <>
                      <Check size={16} className="text-[#0d9488]" />
                      {subscriptionStatus?.billingCycle === 'monthly'
                        ? 'Monthly plan active'
                        : 'Yearly plan active'}
                    </>
                  ) : isExpired ? (
                    <>
                      <Zap size={16} className="text-orange-500" />
                      Subscription expired
                    </>
                  ) : (
                    <>
                      <ArrowRight size={16} />
                      Upgrade to Pro
                    </>
                  )}
                </div>
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
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  {isActive ? (
                    <>
                      <Check size={16} className="text-[#0d9488]" />
                      {subscriptionStatus?.billingCycle === 'monthly'
                        ? 'Monthly plan active'
                        : 'Yearly plan active'}
                    </>
                  ) : isExpired ? (
                    <>
                      <Zap size={16} className="text-orange-500" />
                      Subscription expired
                    </>
                  ) : (
                    <>
                      <ArrowRight size={16} />
                      Upgrade to Pro
                    </>
                  )}
                </div>
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
          </div>

          {/* Plan Cards */}
          <div className="space-y-4">
            {/* Monthly Plan */}
            <div className={`border rounded-xl p-6 shadow-md text-center relative ${
              isActive && subscriptionStatus?.billingCycle === 'monthly'
                ? 'border-[#0d9488] ring-2 ring-[#0d9488]/20'
                : ''
            }`}>
              {isActive && subscriptionStatus?.billingCycle === 'monthly' && (
                <div className="absolute top-2 right-2 bg-[#0d9488] text-white text-xs px-3 py-1 rounded-full font-medium">
                  Current Plan
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">Monthly Plan</h3>
              <div className="text-2xl font-bold mb-2">
                LKR {isVendor ? '1500' : '900'}
                <span className="text-sm font-normal text-gray-600">/month</span>
              </div>
              <button
                className={`w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0d9488] text-white hover:bg-[#0b7f78]'
                  }`}
                onClick={() => {
                  if (isActive) return;
                  window.location.href = `/payments/checkout?type=subscription&plan=${isVendor ? 'VENDOR' : 'USER'}&cycle=monthly`;
                }}
                disabled={isActive}
              >
                {isActive && subscriptionStatus?.billingCycle === 'monthly'
                  ? 'You are currently subscribed'
                  : isActive
                  ? 'Available after current plan ends'
                  : 'Choose Monthly Plan'}
              </button>
              {isActive && subscriptionStatus?.billingCycle === 'monthly' && subscriptionStatus?.proSubscriptionExpiry && (
                <p className="text-xs text-gray-500 mt-2">
                  Expires on {new Date(subscriptionStatus.proSubscriptionExpiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>

            {/* Yearly Plan */}
            <div className={`border rounded-xl p-6 shadow-md relative ${
              isActive && subscriptionStatus?.billingCycle === 'yearly'
                ? 'border-[#0d9488] ring-2 ring-[#0d9488]/20'
                : ''
            }`}>
              {isActive && subscriptionStatus?.billingCycle === 'yearly' ? (
                <div className="absolute top-2 right-2 bg-[#0d9488] text-white text-xs px-3 py-1 rounded-full font-medium">
                  Current Plan
                </div>
              ) : (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">Yearly Plan</h3>
              <div className="text-2xl font-bold mb-2">
                LKR {isVendor ? '15000' : '9000'}
                <span className="text-sm font-normal text-gray-600">/year</span>
              </div>
              <div className="text-sm text-green-600 font-medium mb-4">
                Save {isVendor ? '3000' : '1800'} LKR yearly
              </div>
              <button
                className={`w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#0d9488] text-white hover:bg-[#0b7f78]'
                  }`}
                onClick={() => {
                  if (isActive) return;
                  window.location.href = `/payments/checkout?type=subscription&plan=${isVendor ? 'VENDOR' : 'USER'}&cycle=yearly`;
                }}
                disabled={isActive}
              >
                {isActive && subscriptionStatus?.billingCycle === 'yearly'
                  ? 'You are currently subscribed'
                  : isActive
                  ? 'Available after current plan ends'
                  : 'Choose Yearly Plan'}
              </button>
              {isActive && subscriptionStatus?.billingCycle === 'yearly' && subscriptionStatus?.proSubscriptionExpiry && (
                <p className="text-xs text-gray-500 mt-2">
                  Expires on {new Date(subscriptionStatus.proSubscriptionExpiry).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
