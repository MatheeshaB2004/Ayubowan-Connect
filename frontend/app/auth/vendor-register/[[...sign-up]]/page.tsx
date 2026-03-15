"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp, useUser } from "@clerk/nextjs";
import LocationPicker from "@/components/maps/LocationPicker";
import "../../login/login.css";

// Sri Lankan Provinces
const PROVINCES = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa"
];

// Sri Lankan Districts by Province
const DISTRICTS_BY_PROVINCE: { [key: string]: string[] } = {
  "Western": ["Colombo", "Gampaha", "Kalutara"],
  "Central": ["Kandy", "Matale", "Nuwara Eliya"],
  "Southern": ["Galle", "Matara", "Hambantota"],
  "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  "Eastern": ["Ampara", "Batticaloa", "Trincomalee"],
  "North Western": ["Kurunegala", "Puttalam"],
  "North Central": ["Anuradhapura", "Polonnaruwa"],
  "Uva": ["Badulla", "Monaragala"],
  "Sabaragamuwa": ["Ratnapura", "Kegalle"]
};

export default function VendorRegisterPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn, user } = useUser();
  
  // currentStep: 1 = Account, 2 = Business, 3 = Location, 4 = Verification
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Account Details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  // Step 2: Business Details
  const [businessName, setBusinessName] = useState("");
  const [shortTagline, setShortTagline] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");

  // Step 3: Location Details
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  // Step 4: Verification
  const [verificationCode, setVerificationCode] = useState("");

  // Available districts based on selected province
  const availableDistricts = province ? DISTRICTS_BY_PROVINCE[province] || [] : [];

  // Reset district when province changes
  React.useEffect(() => {
    if (province && district && !availableDistricts.includes(district)) {
      setDistrict("");
    }
  }, [province, district, availableDistricts]);

  // Redirect if already signed in and profile is complete
  React.useEffect(() => {
    if (isSignedIn && user?.unsafeMetadata?.role) {
      router.replace("/");
    }
  }, [isSignedIn, user, router]);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");
    setCurrentStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate if necessary. All required fields are handled by input 'required' attr
    setCurrentStep(3);
  };

  // Submission handles Clerk User Create + Verification Code Email Send
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || isSubmitting) return;
    
    // Ensure map is selected
    if (!latitude || !longitude) {
      setError("Please select a location on the map.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        unsafeMetadata: {
          role: "vendor",
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setCurrentStep(4); // Move to verification
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.errors?.[0]?.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        const sessionId = completeSignUp.createdSessionId;
        const userId = completeSignUp.createdUserId;
        
        // After successful verification, register vendor in backend
        const payload = {
          userId: userId,
          businessName,
          shortTagline,
          contactPhone,
          establishedYear: establishedYear ? parseInt(establishedYear) : null,
          location: {
            addressLine1,
            addressLine2,
            city,
            district,
            province,
            postalCode,
            latitude,
            longitude
          }
        };

        const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";
        const response = await fetch(`${API_BASE}/vendor/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.warn("Backend vendor registration endpoint failed or might not be ready yet.");
        } else {
          console.log("Vendor registration successful");
        }

        // Set session active to login the user
        await setActive({ session: sessionId });

        // User metadata updating has to happen from backend ideally or client if permitted
        // We'll update it inside the post-login if required, or update it here.
        // *Note*: Clerk client SDK cannot update unsafeMetadata unless permitted via webhook or specific endpoints.
        // We proceed with redirect.
        router.push("/vendor/dashboard");

      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-heading">Create Your Vendor Account</h1>
        <p className="hero-description">
          Join Ayubowan Connect and showcase your authentic Sri Lankan crafts
          and experiences to travelers worldwide
        </p>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-container" style={{ maxWidth: currentStep > 1 && currentStep < 4 ? '800px' : '500px' }}>
          <div className="form-logo flex justify-center">
            <img src="/logo.png" alt="Ayubowan Connect Logo" className="h-24 w-auto object-contain" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mx-auto">
            {currentStep < 4 && (
              <div className="progress-dots mb-8 flex justify-center gap-3">
                <span className={`w-3 h-3 rounded-full ${currentStep >= 1 ? "bg-teal-600" : "bg-gray-300"}`}></span>
                <span className={`w-3 h-3 rounded-full ${currentStep >= 2 ? "bg-teal-600" : "bg-gray-300"}`}></span>
                <span className={`w-3 h-3 rounded-full ${currentStep >= 3 ? "bg-teal-600" : "bg-gray-300"}`}></span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Step 1: Account Details */}
            {currentStep === 1 && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Account Details</h2>
                <p className="text-gray-600 mb-8 text-center">Set up your login details.</p>

                <form onSubmit={handleNextStep1} className="space-y-5">
                  <div id="clerk-captcha"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Re-enter password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Next: Business Details
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-semibold text-teal-600 hover:text-teal-700">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}

            {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Business Details</h2>
                <p className="text-gray-600 mb-8 text-center">Tell us about your business or craft.</p>

                <form onSubmit={handleNextStep2}>
                  <div className="form-group mb-5">
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                    <input
                      type="text"
                      id="businessName"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-5">
                    <label htmlFor="shortTagline" className="block text-sm font-medium text-gray-700 mb-1">Short Tagline</label>
                    <input
                      type="text"
                      id="shortTagline"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      value={shortTagline}
                      onChange={(e) => setShortTagline(e.target.value)}
                      placeholder="e.g. Authentic Handcrafted Pottery"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="form-group">
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        id="contactPhone"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="establishedYear" className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                      <input
                        type="number"
                        id="establishedYear"
                        min="1800"
                        max={new Date().getFullYear()}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={establishedYear}
                        onChange={(e) => setEstablishedYear(e.target.value)}
                        placeholder="e.g. 2015"
                      />
                    </div>
                  </div>

                  <div className="form-actions mt-8 flex flex-col-reverse md:flex-row justify-between gap-4">
                    <button
                      type="button"
                      className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors w-full md:w-auto"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                    <button type="submit" className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 font-medium transition-colors w-full md:w-auto">
                      Next: Location Details
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Location Details */}
            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Primary Location</h2>
                <p className="text-gray-600 mb-8 text-center">Where is your business located?</p>

                <form onSubmit={handleSignUpSubmit}>
                  <div id="clerk-captcha"></div>

                  <div className="form-group mb-5">
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                    <input
                      type="text"
                      id="addressLine1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-5">
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                    <input
                      type="text"
                      id="addressLine2"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div className="form-group">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        id="city"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                      <input
                        type="text"
                        id="postalCode"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    <div className="form-group">
                      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                      <select
                        id="province"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      >
                        <option value="">Select Province</option>
                        {PROVINCES.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                      <select
                        id="district"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                        disabled={!province}
                      >
                        <option value="">{province ? "Select District" : "Select Province First"}</option>
                        {availableDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pinpoint Exact Location *</label>
                    <LocationPicker
                      onLocationSelect={(lat: number, lng: number) => {
                        setLatitude(lat);
                        setLongitude(lng);
                      }}
                    />
                    {latitude && longitude ? (
                      <p className="text-sm text-teal-600 mt-2 font-medium">
                        ✓ Location selected: {latitude.toFixed(5)}, {longitude.toFixed(5)}
                      </p>
                    ) : (
                      <p className="text-sm text-red-500 mt-2">
                        Please select your location on the map.
                      </p>
                    )}
                  </div>

                  <div className="form-actions flex flex-col-reverse md:flex-row justify-between gap-4">
                    <button
                      type="button"
                      className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 font-medium transition-colors w-full md:w-auto"
                      onClick={handleBack}
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 font-medium transition-colors disabled:opacity-50 w-full md:w-auto"
                      disabled={isSubmitting || !latitude || !longitude}
                    >
                      {isSubmitting ? "Submitting..." : "Complete Setup"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Verify Email</h2>

                <p className="text-sm text-gray-600 mb-6 text-center">
                  We sent a verification code to <strong>{email}</strong>
                </p>

                <form onSubmit={handleVerification} className="space-y-5">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Code
                    </label>
                    <input
                      id="code"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter 6-digit code"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Verifying..." : "Verify Email"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      // Note: Restarting requires re-creating the signup object or starting a new clerk session,
                      // usually going back here might just re-submit, but we'll drop them to step 3.
                      setCurrentStep(3);
                    }}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
            
          </div>
        </div>
      </section>
    </div>
  );
}

