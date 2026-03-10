"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import LocationPicker from "@/components/maps/LocationPicker";

interface VendorProfile {
    businessName: string;
    shortTagline: string;
    contactPhone: string;
    establishedYear: string;
    location: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        district: string;
        province: string;
        postalCode: string;
        latitude: number | null;
        longitude: number | null;
    } | null;
}

export default function VendorProfilePage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [notFound, setNotFound] = useState(false);

    const [profile, setProfile] = useState<VendorProfile>({
        businessName: "",
        shortTagline: "",
        contactPhone: "",
        establishedYear: "",
        location: null,
    });

    // Edit form state (separate from displayed profile)
    const [editForm, setEditForm] = useState<VendorProfile>(profile);
    const [editLat, setEditLat] = useState<number | null>(null);
    const [editLng, setEditLng] = useState<number | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

    useEffect(() => {
        if (!isLoaded) return;
        if (!isSignedIn) { router.push("/auth/login"); return; }
        if (user?.unsafeMetadata?.role !== "vendor") { router.push("/User_profile_manager"); return; }

        const clerkUserId = user.id;

        fetch(`${API_BASE}/vendor/profile?userId=${clerkUserId}`)
            .then(async (res) => {
                if (res.status === 404) { setNotFound(true); setIsLoading(false); return; }
                if (!res.ok) throw new Error("Failed to load profile");
                const data = await res.json();
                const loaded: VendorProfile = {
                    businessName: data.businessName || "",
                    shortTagline: data.shortTagline || "",
                    contactPhone: data.contactPhone || "",
                    establishedYear: data.establishedYear ? String(data.establishedYear) : "",
                    location: data.location ? {
                        addressLine1: data.location.addressLine1 || "",
                        addressLine2: data.location.addressLine2 || "",
                        city: data.location.city || "",
                        district: data.location.district || "",
                        province: data.location.province || "",
                        postalCode: data.location.postalCode || "",
                        latitude: data.location.latitude || null,
                        longitude: data.location.longitude || null,
                    } : null,
                };
                setProfile(loaded);
                setEditForm(loaded);
                setEditLat(data.location?.latitude || null);
                setEditLng(data.location?.longitude || null);
                setIsLoading(false);
            })
            .catch(() => { setIsLoading(false); });
    }, [isLoaded, isSignedIn, user]);

    const startEditing = () => {
        setEditForm(profile);
        setEditLat(profile.location?.latitude || null);
        setEditLng(profile.location?.longitude || null);
        setSuccessMsg("");
        setErrorMsg("");
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setErrorMsg("");
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const payload = {
                clerkUserId: user?.id,
                businessName: editForm.businessName,
                shortTagline: editForm.shortTagline,
                contactPhone: editForm.contactPhone,
                establishedYear: editForm.establishedYear,
                location: {
                    addressLine1: editForm.location?.addressLine1 || "",
                    addressLine2: editForm.location?.addressLine2 || "",
                    city: editForm.location?.city || "",
                    district: editForm.location?.district || "",
                    province: editForm.location?.province || "",
                    postalCode: editForm.location?.postalCode || "",
                    latitude: editLat,
                    longitude: editLng,
                },
            };

            const res = await fetch(`${API_BASE}/vendor/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                // Update displayed profile with saved values
                const saved: VendorProfile = {
                    ...editForm,
                    location: {
                        addressLine1: editForm.location?.addressLine1 || "",
                        addressLine2: editForm.location?.addressLine2 || "",
                        city: editForm.location?.city || "",
                        district: editForm.location?.district || "",
                        province: editForm.location?.province || "",
                        postalCode: editForm.location?.postalCode || "",
                        latitude: editLat,
                        longitude: editLng,
                    },
                };
                setProfile(saved);
                setIsEditing(false);
                setSuccessMsg("Profile updated successfully!");
            } else {
                const err = await res.json().catch(() => ({}));
                setErrorMsg(err.message || "Failed to save. Please try again.");
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const setField = (field: keyof Omit<VendorProfile, "location">, val: string) => {
        setEditForm((f) => ({ ...f, [field]: val }));
    };
    const setLocField = (field: string, val: string) => {
        setEditForm((f) => ({
            ...f,
            location: { ...(f.location || { addressLine1: "", addressLine2: "", city: "", district: "", province: "", postalCode: "", latitude: null, longitude: null }), [field]: val },
        }));
    };

    if (!isLoaded || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Business Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {isEditing ? "Edit your business details below." : "Your business details as shown to travellers."}
                        </p>
                    </div>
                    {!isEditing && !notFound && (
                        <button
                            onClick={startEditing}
                            className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 font-medium transition-colors text-sm"
                        >
                            ✏️ Edit Profile
                        </button>
                    )}
                </div>

                {/* Messages */}
                {successMsg && (
                    <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-2">
                        ✅ {successMsg}
                    </div>
                )}
                {errorMsg && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                        ❌ {errorMsg}
                    </div>
                )}

                {/* Not found state */}
                {notFound ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                        <p className="text-yellow-800 font-medium mb-2">⚠️ Vendor profile not found</p>
                        <p className="text-yellow-700 text-sm">
                            Your vendor account is registered with Clerk, but no matching record was found in our database.
                            Please complete your vendor registration again.
                        </p>
                        <a
                            href="/auth/vendor-register"
                            className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 text-sm font-medium"
                        >
                            Complete Registration
                        </a>
                    </div>
                ) : !isEditing ? (
                    /* ─── VIEW MODE ─── */
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-5">Business Details</h2>
                            <div className="space-y-4">
                                <ProfileField label="Business Name" value={profile.businessName} />
                                <ProfileField label="Short Tagline" value={profile.shortTagline} placeholder="Not set" />
                                <ProfileField label="Contact Phone" value={profile.contactPhone} />
                                <ProfileField label="Established Year" value={profile.establishedYear} placeholder="Not set" />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-5">Business Location</h2>
                            {profile.location ? (
                                <div className="space-y-4">
                                    <ProfileField label="Address Line 1" value={profile.location.addressLine1} />
                                    {profile.location.addressLine2 && <ProfileField label="Address Line 2" value={profile.location.addressLine2} />}
                                    <div className="grid grid-cols-2 gap-4">
                                        <ProfileField label="City" value={profile.location.city} />
                                        <ProfileField label="Postal Code" value={profile.location.postalCode} placeholder="Not set" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ProfileField label="District" value={profile.location.district} />
                                        <ProfileField label="Province" value={profile.location.province} />
                                    </div>
                                    {profile.location.latitude && profile.location.longitude && (
                                        <div className="mt-2 p-3 bg-teal-50 rounded-lg text-sm text-teal-700">
                                            📍 Map location: {profile.location.latitude.toFixed(5)}, {profile.location.longitude.toFixed(5)}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm italic">No location set yet.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    /* ─── EDIT MODE ─── */
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">Business Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="businessName">Business Name *</label>
                                <input id="businessName" type="text" required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    value={editForm.businessName}
                                    onChange={(e) => setField("businessName", e.target.value)} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="shortTagline">Short Tagline</label>
                                <input id="shortTagline" type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    value={editForm.shortTagline}
                                    onChange={(e) => setField("shortTagline", e.target.value)}
                                    placeholder="e.g. Authentic Handcrafted Pottery" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactPhone">Contact Phone *</label>
                                    <input id="contactPhone" type="tel" required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={editForm.contactPhone}
                                        onChange={(e) => setField("contactPhone", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="establishedYear">Established Year</label>
                                    <input id="establishedYear" type="number" min="1800" max={new Date().getFullYear()}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={editForm.establishedYear}
                                        onChange={(e) => setField("establishedYear", e.target.value)}
                                        placeholder="e.g. 2015" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-3">Business Location</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="addressLine1">Address Line 1 *</label>
                                <input id="addressLine1" type="text" required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    value={editForm.location?.addressLine1 || ""}
                                    onChange={(e) => setLocField("addressLine1", e.target.value)} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="addressLine2">Address Line 2</label>
                                <input id="addressLine2" type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                    value={editForm.location?.addressLine2 || ""}
                                    onChange={(e) => setLocField("addressLine2", e.target.value)}
                                    placeholder="Apartment, suite, etc." />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">City *</label>
                                    <input id="city" type="text" required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={editForm.location?.city || ""}
                                        onChange={(e) => setLocField("city", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="postalCode">Postal Code</label>
                                    <input id="postalCode" type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={editForm.location?.postalCode || ""}
                                        onChange={(e) => setLocField("postalCode", e.target.value)} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="district">District *</label>
                                    <input id="district" type="text" required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={editForm.location?.district || ""}
                                        onChange={(e) => setLocField("district", e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="province">Province *</label>
                                    <input id="province" type="text" required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                                        value={editForm.location?.province || ""}
                                        onChange={(e) => setLocField("province", e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pinpoint Location on Map</label>
                                <LocationPicker
                                    onLocationSelect={(lat: number, lng: number) => {
                                        setEditLat(lat);
                                        setEditLng(lng);
                                    }}
                                />
                                {editLat && editLng ? (
                                    <p className="text-sm text-teal-600 mt-2 font-medium">
                                        ✓ Location: {editLat.toFixed(5)}, {editLng.toFixed(5)}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-400 mt-2">Click on the map to set your location.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-teal-600 text-white px-8 py-2.5 rounded-lg hover:bg-teal-700 font-medium transition-colors disabled:opacity-50 text-sm"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

function ProfileField({ label, value, placeholder = "—" }: { label: string; value: string; placeholder?: string }) {
    return (
        <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className={`text-sm font-medium ${value ? "text-gray-900" : "text-gray-400 italic"}`}>
                {value || placeholder}
            </p>
        </div>
    );
}
