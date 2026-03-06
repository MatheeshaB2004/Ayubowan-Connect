"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignUp, useUser } from "@clerk/nextjs";
import "./vendor-register.css";

export default function VendorRegisterPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Craft Details
  const [craftName, setCraftName] = useState("");
  const [craftType, setCraftType] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [portfolio, setPortfolio] = useState<File[]>([]);

  // Step 2: Identity Verification
  const [businessRegistration, setBusinessRegistration] = useState("");
  const [identityDocument, setIdentityDocument] = useState<File | null>(null);
  const [taxId, setTaxId] = useState("");

  // After Clerk sign up is complete, show vendor-specific form
  React.useEffect(() => {
    if (isSignedIn && !showVendorForm) {
      setShowVendorForm(true);
    }
  }, [isSignedIn, showVendorForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission - Send vendor details to backend
      setIsSubmitting(true);

      try {
        const formData = new FormData();

        // Add vendor details
        formData.append("userId", user?.id || "");
        formData.append("craftName", craftName);
        formData.append("craftType", craftType);
        formData.append("experience", experience);
        formData.append("description", description);
        formData.append("businessRegistration", businessRegistration);
        formData.append("taxId", taxId);

        // Add portfolio images
        portfolio.forEach((file, index) => {
          formData.append(`portfolio_${index}`, file);
        });

        // Add identity document
        if (identityDocument) {
          formData.append("identityDocument", identityDocument);
        }

        // Send to backend
        const response = await fetch("http://localhost:3000/vendor/register", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Vendor registration failed");
        }

        const data = await response.json();
        console.log("Vendor registration successful:", data);

        // Update user metadata to reflect vendor status
        // Note: The backend should update Clerk publicMetadata via API
        await user?.update({
          unsafeMetadata: {
            role: "vendor",
            vendorStatus: "pending_approval",
            vendorApplicationDate: new Date().toISOString(),
          },
        });

        // Redirect to vendor dashboard or success page
        router.push("/vendor/dashboard");
      } catch (error) {
        console.error("Vendor registration error:", error);
        alert("Failed to complete vendor registration. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="vendor-register-container">
      {/* Header */}
      <header className="vendor-header">
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
      <section className="vendor-hero">
        <h1>Become a vendor</h1>
        <p className="hero-subtitle">
          Join our marketplace and share your expertise to visitors.
          <br />
          Join now and grow your business with us.
        </p>
        <div className="hero-buttons">
          <button className="btn-vendor-primary">Join</button>
          <Link href="/">
            <button className="btn-vendor-secondary">Back</button>
          </Link>
        </div>
      </section>

      {/* Why Vendors Choose Us */}
      <section className="benefits-section">
        <h2>Why vendors choose us</h2>
        <p className="section-subtitle">
          Build meaningful connections with eco-conscious travelers and showcase
          <br />
          your Sri Lankan hospitality. Start your journey in responsible tourism
          today.
        </p>
        <div className="benefits-buttons">
          <button className="btn-outline">Learn</button>
          <button className="btn-outline">Benefits</button>
        </div>
      </section>

      {/* Info Sections */}
      <section className="info-grid">
        <div className="info-item">
          <div className="info-image-placeholder"></div>
          <div className="info-content">
            <h3>Connect with real buyers</h3>
            <p>
              To capture visiting families or those exploring other vendors and
              different backgrounds. However, the connection is built through
              the community experience.
            </p>
          </div>
        </div>

        <div className="info-item reverse">
          <div className="info-content">
            <h3>Build your story</h3>
            <p>
              Share your craftsmanship journey, build trust with visitors, and
              establish your expertise as a valued artisan within our growing
              community of creators.
            </p>
          </div>
          <div className="info-image-placeholder"></div>
        </div>

        <div className="info-item">
          <div className="info-image-placeholder"></div>
          <div className="info-content">
            <h3>Grow sustainably</h3>
            <p>
              Experience pricing tools and market insight to help you progress
              and make balanced decisions. Use your work to showcase Sri Lankan
              heritage in a way that respects tradition and environment.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="form-section">
        <div className="form-wrapper">
          <div className="form-logo">Logo</div>

          {!showVendorForm ? (
            // Clerk Sign Up Component
            <div className="clerk-form-wrapper">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "shadow-lg",
                  },
                }}
                routing="path"
                path="/auth/vendor-register"
                signInUrl="/auth/login"
                afterSignUpUrl="/auth/vendor-register"
              />
            </div>
          ) : (
            // Vendor-Specific Information Form
            <>
              {/* Progress Indicators */}
              <div className="progress-dots">
                <span className={currentStep >= 1 ? "dot active" : "dot"}>
                  1
                </span>
                <span className={currentStep >= 2 ? "dot active" : "dot"}>
                  2
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Tell About Craft */}
                {currentStep === 1 && (
                  <div className="form-step">
                    <h2>Tell us about your craft</h2>
                    <p className="step-subtitle">
                      What's your style? What makes you unique?
                    </p>

                    <div className="form-group">
                      <label htmlFor="craftName">Craft name</label>
                      <input
                        type="text"
                        id="craftName"
                        value={craftName}
                        onChange={(e) => setCraftName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="craftType">Craft type</label>
                      <select
                        id="craftType"
                        value={craftType}
                        onChange={(e) => setCraftType(e.target.value)}
                        required
                      >
                        <option value="">Select craft type</option>
                        <option value="handicrafts">Handicrafts</option>
                        <option value="textiles">Textiles</option>
                        <option value="pottery">Pottery</option>
                        <option value="woodwork">Woodwork</option>
                        <option value="jewelry">Jewelry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="experience">Years of experience</label>
                      <input
                        type="number"
                        id="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Craft description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Tell us about your craft and what makes it special"
                        required
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label htmlFor="portfolio">Upload portfolio images</label>
                      <input
                        type="file"
                        id="portfolio"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            setPortfolio(Array.from(e.target.files));
                          }
                        }}
                      />
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-back"
                        onClick={handleBack}
                      >
                        Back
                      </button>
                      <button type="submit" className="btn-next">
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Verify Identity */}
                {currentStep === 2 && (
                  <div className="form-step">
                    <h2>Verify your identity</h2>
                    <p className="step-subtitle">
                      We require this information to verify vendor identity
                    </p>

                    <div className="form-group">
                      <label htmlFor="businessReg">
                        Business registration number
                      </label>
                      <input
                        type="text"
                        id="businessReg"
                        value={businessRegistration}
                        onChange={(e) =>
                          setBusinessRegistration(e.target.value)
                        }
                        placeholder="Optional"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="identityDoc">
                        Upload your national ID or passport
                      </label>
                      <input
                        type="file"
                        id="identityDoc"
                        accept=".pdf,image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setIdentityDocument(e.target.files[0]);
                          }
                        }}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="taxId">Tax identification number</label>
                      <input
                        type="text"
                        id="taxId"
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="Optional"
                      />
                    </div>

                    <p className="info-note">
                      Your identity details are kept secure and private
                    </p>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-back"
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn-create-account"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Complete Registration"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Questions</h2>
        <p className="faq-subtitle">
          Fast answers to common questions about becoming a vendor
        </p>

        <div className="faq-list">
          <details className="faq-item">
            <summary>
              How long is it approved? <span className="arrow">▼</span>
            </summary>
            <p>
              Most vendor applications are reviewed within 2-3 business days
              from our team. We'll send you an email once the review is
              complete. If we need any additional information, we'll reach out
              to you directly.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              What documents do I need? <span className="arrow">▼</span>
            </summary>
            <p>
              You'll need a valid government ID (national ID or passport), and
              optionally your business registration number and tax
              identification number if applicable.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Is there a vendor fee? <span className="arrow">▼</span>
            </summary>
            <p>
              There's no upfront fee to join. We charge a small commission on
              each sale made through the platform.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              Can I sell multiple products? <span className="arrow">▼</span>
            </summary>
            <p>
              Yes! You can list as many products and experiences as you'd like
              once your vendor account is approved.
            </p>
          </details>

          <details className="faq-item">
            <summary>
              What are vendor standards? <span className="arrow">▼</span>
            </summary>
            <p>
              We expect high-quality photos, accurate descriptions, timely
              communication, and authentic Sri Lankan experiences or products.
            </p>
          </details>
        </div>

        <div className="help-section">
          <h3>Need more help?</h3>
          <p>Reach out to our vendor support team</p>
          <button className="btn-contact">Contact</button>
        </div>
      </section>

      {/* Already Registered Section */}
      <section className="already-registered">
        <h2>Already registered as a vendor?</h2>
        <p>Sign in to your vendor account and start listing</p>
        <div className="registered-buttons">
          <button className="btn-signin-vendor">Sign in</button>
          <button className="btn-back-vendor">Back</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="vendor-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">Logo</div>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <h3>Vendors</h3>
              <ul>
                <li>
                  <Link href="/vendor/benefits">Benefits</Link>
                </li>
                <li>
                  <Link href="/vendor/success">Success Stories</Link>
                </li>
                <li>
                  <Link href="/vendor/resources">Resources</Link>
                </li>
                <li>
                  <Link href="/vendor/support">Support</Link>
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
                  <Link href="/community">Community</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Account</h3>
              <ul>
                <li>
                  <Link href="/vendor/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/vendor/listings">My Listings</Link>
                </li>
                <li>
                  <Link href="/vendor/analytics">Analytics</Link>
                </li>
                <li>
                  <Link href="/vendor/settings">Settings</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column newsletter">
              <h3>Updates</h3>
              <p>
                Get vendor tips, market trends and platform news. Join our
                growing community today.
              </p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" />
                <button className="btn-join">Join</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>© 2026 Ayubowan Connect</p>
            <div className="footer-links">
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms of service</Link>
              <Link href="/cookies">Cookie settings</Link>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="YouTube">
                ▶
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
