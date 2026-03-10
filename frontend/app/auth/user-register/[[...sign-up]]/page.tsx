"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp, useUser } from "@clerk/nextjs";
import "../../login/login.css";

export default function UserRegisterPage() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn, user } = useUser();
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign up form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  // Profile Form Fields
  const [fullName, setFullName] = useState("");
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
      setPendingVerification(false); // Clear verification state
    }
  }, [isSignedIn, showDetailsForm, user]);

  // Redirect if already signed in and profile is complete
  useEffect(() => {
    if (isSignedIn && user?.unsafeMetadata?.role) {
      router.replace("/auth/post-login");
    }
  }, [isSignedIn, user, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.errors?.[0]?.message || "Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Will trigger useEffect to show details form
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        userId: user?.id,
        fullName: fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
        email: user?.primaryEmailAddress?.emailAddress,
        profilePhotoUrl: user?.imageUrl,
        userType,
        nationality,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
        preferredLanguage,
      };

      // In a real app, send to an actual endpoint
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn("Backend registration endpoint might not be ready yet.");
      } else {
        console.log("User registration successful");
      }

      await user?.update({
        unsafeMetadata: {
          role: "user",
          touristStatus: "registered",
          userType,
          nationality,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : "",
          preferredLanguage,
        },
      });

      router.push("/User_profile_manager");
    } catch (error) {
      console.error("User registration error:", error);
      alert("Failed to complete registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-heading">Create Your Traveler Account</h1>
        <p className="hero-description">
          Join Ayubowan Connect to discover authentic Sri Lankan experiences and
          local craftsmanship
        </p>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-logo flex justify-center">
            <img src="/logo.png" alt="Ayubowan Connect Logo" className="h-24 w-auto object-contain" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
            {!showDetailsForm && !pendingVerification && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign Up</h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-5">
                  {/* Clerk CAPTCHA Widget Container */}
                  <div id="clerk-captcha"></div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
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
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
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
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
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

            {pendingVerification && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Verify Email</h2>

                <p className="text-sm text-gray-600 mb-6 text-center">
                  We sent a verification code to <strong>{email}</strong>
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

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
                    onClick={() => setPendingVerification(false)}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Back to sign up
                  </button>
                </div>
              </>
            )}

            {showDetailsForm && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Complete Your Profile</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userType">
                    I am a
                  </label>
                  <select
                    id="userType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    required
                  >
                    <option value="TOURIST">Tourist / Guest</option>
                    <option value="LOCAL">Local Resident</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nationality">
                    Nationality
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="e.g. American, British, Sri Lankan"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dateOfBirth">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="preferredLanguage">
                    Preferred Language
                  </label>
                  <select
                    id="preferredLanguage"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? "Saving..." : "Complete Setup"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
