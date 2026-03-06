"use client";

import React from "react";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import "../login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
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
        <h1 className="main-heading">Login to Ayubowan Connect</h1>
        <p className="hero-description">
          Enter your credentials to access authentic Sri Lankan experiences and
          local craftsmanship
        </p>
      </section>

      {/* Login Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-logo">Logo</div>

          <div className="clerk-form-wrapper">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "shadow-lg",
                },
              }}
              routing="path"
              path="/auth/login"
              signUpUrl="/auth/register"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
