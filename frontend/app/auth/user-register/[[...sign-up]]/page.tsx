"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignUp, useUser } from "@clerk/nextjs";
import "../../register/register.css";

export default function UserRegisterPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [userType, setUserType] = useState("TOURIST");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  // After Clerk sign up is complete, show specific form
  useEffect(() => {
    if (isSignedIn && !showDetailsForm) {
      if (user) {
        setFullName(user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim());
      }
      setShowDetailsForm(true);
    }
  }, [isSignedIn, showDetailsForm, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        email: user?.primaryEmailAddress?.emailAddress,
        profilePhotoUrl: user?.imageUrl,
        userType,
        nationality,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
        preferredLanguage,
      };

      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to register user profile on the server.");
      } else {
        console.log("User registration successful");
      }

      await user?.update({
        unsafeMetadata: {
          role: "user",
          touristStatus: "registered",
        },
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("User registration error:", error);
      alert("Failed to complete registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="welcome-text">Welcome</p>
          <h1 className="main-heading">Join the community</h1>
          <p className="hero-description">
            Create your account to discover authentic experiences and support local artisans.
          </p>
          <div className="hero-buttons">
            <Link href="/">
              <button className="btn-secondary">Back to Home</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-logo">Ayubowan Connect</div>
          <div className="form-wrapper bg-white p-8 rounded-lg shadow-lg">
            {!showDetailsForm ? (
              <div className="clerk-form-wrapper">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: "mx-auto",
                      card: "shadow-none p-0",
                    },
                  }}
                  routing="path"
                  path="/auth/user-register"
                  signInUrl="/auth/login"
                  afterSignUpUrl="/auth/user-register"
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="details-form">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Complete Your Profile</h2>
                
                <div className="form-group mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userType">I am a</label>
                  <select
                    id="userType"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="TOURIST">Tourist / Guest</option>
                    <option value="LOCAL">Local Resident</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nationality">Nationality</label>
                  <input
                    type="text"
                    id="nationality"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="e.g. American, British, Sri Lankan"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>

                <div className="form-group mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="preferredLanguage">Preferred Language</label>
                  <select
                    id="preferredLanguage"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 text-white py-3 px-4 rounded hover:bg-teal-700 transition-colors disabled:opacity-50 font-medium"
                  >
                    {isSubmitting ? "Saving..." : "Complete Setup"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Ready to Begin Section */}
      <section className="ready-section">
        <div className="ready-content">
          <h2 className="ready-title">Ready to begin</h2>
          <p className="ready-description">
            Explore Sri Lankan culture as a guest or sign in if you already have an account with us.
          </p>
          <div className="ready-buttons">
            <Link href="/auth/login">
              <button className="btn-login">Login</button>
            </Link>
            <Link href="/">
              <button className="btn-home">Home</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
