"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [userType, setUserType] = useState("TOURIST");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Auth guard + populate form from saved Clerk data
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/auth/login");
      return;
    }
    if (user.unsafeMetadata?.role !== "user") {
      router.replace("/auth/register?error=not_registered");
      return;
    }

    const meta = user.unsafeMetadata as Record<string, string>;
    setFullName(user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
    setUserType(meta.userType || "TOURIST");
    setNationality(meta.nationality || "");
    setPreferredLanguage(meta.preferredLanguage || "English");

    if (meta.dateOfBirth) {
      setDateOfBirth(new Date(meta.dateOfBirth).toISOString().split("T")[0]);
    }
  }, [isLoaded, isSignedIn, user, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ");

      await user!.update({
        firstName: firstName || "",
        lastName: lastName || "",
        unsafeMetadata: {
          ...user!.unsafeMetadata,
          userType,
          nationality,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : "",
          preferredLanguage,
        },
      });

      setSuccessMsg("Profile updated successfully.");
    } catch {
      setErrorMsg("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center gap-5">
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="Profile photo"
              className="w-20 h-20 rounded-full object-cover border-2 border-teal-100"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Profile Manager</h1>
            <p className="text-sm text-gray-500 mt-0.5">{user.primaryEmailAddress?.emailAddress}</p>
            <span className="inline-block mt-2 text-xs font-medium bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full">
              {userType === "LOCAL" ? "Local Resident" : "Tourist / Guest"}
            </span>
          </div>
        </div>

        {/* Edit form card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Your Details</h2>

          {successMsg && (
            <div className="mb-5 bg-teal-50 border border-teal-200 text-teal-800 text-sm rounded-lg px-4 py-3">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">
                I am a
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="TOURIST">Tourist / Guest</option>
                <option value="LOCAL">Local Resident</option>
              </select>
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <input
                id="nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="e.g. American, British, Sri Lankan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
