"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignUp, useUser } from "@clerk/nextjs";
import "../vendor-register.css";

export default function VendorRegisterPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Business Details (Vendor)
  const [businessName, setBusinessName] = useState("");
  const [shortTagline, setShortTagline] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");

  // Step 2: Location Details (Vendor Location)
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

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
        const payload = {
          userId: user?.id,
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
            postalCode
          }
        };

        const response = await fetch("http://localhost:3000/vendor/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.warn("Backend vendor registration endpoint might not be ready yet.");
        } else {
          console.log("Vendor registration successful");
        }

        // Update user metadata to reflect vendor status
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
    <div className="flex-1 bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Ayubowan Connect Logo" className="h-20 w-auto object-contain" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create your Vendor account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Welcome! Please fill in the details to get started.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!showVendorForm ? (
            <div className="clerk-form-wrapper flex justify-center">
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none p-0 w-full max-w-md mx-auto",
                  },
                }}
                routing="path"
                path="/auth/vendor-register"
                signInUrl="/auth/login"
                afterSignUpUrl="/auth/vendor-register"
              />
            </div>
          ) : (
            <>
              {/* Progress Indicators */}
              <div className="progress-dots mb-8 flex justify-center gap-3">
                <span className={`w-3 h-3 rounded-full ${currentStep >= 1 ? "bg-teal-600" : "bg-gray-300"}`}></span>
                <span className={`w-3 h-3 rounded-full ${currentStep >= 2 ? "bg-teal-600" : "bg-gray-300"}`}></span>
              </div>

              <form onSubmit={handleSubmit} className="vendor-details-form">
                {/* Step 1: Business Details */}
                {currentStep === 1 && (
                  <div className="form-step animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Business Details</h2>
                    <p className="text-gray-600 mb-8 text-center">Tell us about your business or craft.</p>

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

                    <div className="form-actions mt-8 flex justify-end">
                      <button type="submit" className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 font-medium transition-colors w-full md:w-auto">
                        Next: Location Details
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Location Details */}
                {currentStep === 2 && (
                  <div className="form-step animate-fadeIn">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Primary Location</h2>
                    <p className="text-gray-600 mb-8 text-center">Where is your business located?</p>

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
                        <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                        <input
                          type="text"
                          id="district"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                        <input
                          type="text"
                          id="province"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          required
                        />
                      </div>
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
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Complete Vendor Setup"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
