"use client";

import React from "react";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import "../register.css";

export default function RegisterPage() {
  return (
    <div className="register-container">
      {/* Header */}
      <header className="register-header">
        <div className="logo">Logo</div>
        <nav className="nav-menu">
          <Link href="/experiences">Experiences</Link>
          <Link href="/products">Products</Link>
          <Link href="/events">Events</Link>
          <div className="more-dropdown">
            More <span className="dropdown-arrow">▼</span>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="welcome-text">Welcome</p>
          <h1 className="main-heading">Join the community</h1>
          <p className="hero-description">
            Create your account to discover authentic experiences and support
            local artisans
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Register</button>
            <Link href="/">
              <button className="btn-secondary">Back</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-logo">Logo</div>
          <div className="clerk-form-wrapper">
            <SignUp
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg",
                },
              }}
              routing="path"
              path="/auth/register"
              signInUrl="/auth/login"
            />
          </div>
        </div>
      </section>

      {/* Ready to Begin Section */}
      <section className="ready-section">
        <div className="ready-content">
          <h2 className="ready-title">Ready to begin</h2>
          <p className="ready-description">
            Explore Sri Lankan culture as a guest or sign in if you already have
            an account with us.
          </p>
          <div className="ready-buttons">
            <button className="btn-login">Login</button>
            <button className="btn-home">Home</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="register-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">Logo</div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h3>Explore</h3>
              <ul>
                <li>
                  <Link href="/experiences">Experiences</Link>
                </li>
                <li>
                  <Link href="/marketplace">Marketplace</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/plans">Plans</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Connect</h3>
              <ul>
                <li>
                  <Link href="/experiences">Experiences</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/events">Events</Link>
                </li>
                <li>
                  <Link href="/calendar">Calendar</Link>
                </li>
                <li>
                  <Link href="/bookings">Bookings</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Account</h3>
              <ul>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li>
                  <Link href="/security">Security</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
                <li>
                  <Link href="/feedback">Feedback</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column newsletter">
              <h3>Updates</h3>
              <p>
                Get news about new experiences and makers joining our community.
              </p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button className="btn-join">Join</button>
              </div>
              <p className="newsletter-note">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
