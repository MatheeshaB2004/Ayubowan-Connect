"use client";

import { useState, useEffect } from "react";
import { Loader2, Calendar, DollarSign, MapPin, Heart, Lock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";
import "./planner.css";

interface Itinerary {
    tripTitle: string;
    summary: string;
    dailyPlan: Array<{
        day: number;
        title: string;
        activities: string[];
        meals: string[];
    }>;
    estimatedTotalCost: string;
}

export default function ItineraryPlanner() {
    const { isSignedIn, user: clerkUser } = useUser();
    const router = useRouter();
    const { user, role, authReady } = useAuth();
    
    const [isPro, setIsPro] = useState<boolean | null>(null);
    const [checkingPro, setCheckingPro] = useState(true);

    useEffect(() => {
        if (!authReady) return;
        const email = clerkUser?.primaryEmailAddress?.emailAddress;
        
        if (!user?.id || !email || role !== "traveller") {
            setCheckingPro(false);
            setIsPro(false);
            return;
        }

        const fetchStatus = async () => {
            try {
                // Add a cache-buster query param and cache: 'no-store' to ensure we get the latest status
                const response = await fetch(`${API_BASE_URL}/payments/status?t=${Date.now()}`, {
                    headers: { 'x-user-id': user.id, 'x-user-email': email },
                    cache: 'no-store'
                });
                if (!response.ok) {
                    setIsPro(false);
                    setCheckingPro(false);
                    return;
                }
                const data = await response.json();
                
                const isProUser = Boolean(data?.isProUser);
                const expiry = data?.proSubscriptionExpiry;
                const isExpired = expiry && new Date(expiry) < new Date();
                
                setIsPro(isProUser && !isExpired);
            } catch (error) {
                console.error('Failed to load subscription status:', error);
                setIsPro(false);
            } finally {
                setCheckingPro(false);
            }
        };

        fetchStatus();

        // Refresh status when page becomes visible 
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchStatus();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [user?.id, role, authReady, clerkUser?.primaryEmailAddress?.emailAddress]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        destination: "",
        duration: 3,
        budget: "Medium",
        interests: [] as string[],
        travelStyle: "Relaxed",
    });
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);

    const interestOptions = [
        "Culture",
        "Nature",
        "Food",
        "Adventure",
        "Relaxation",
        "Shopping",
        "History",
    ];
    const budgetOptions = ["Budget", "Medium", "Luxury"];
    const styleOptions = ["Relaxed", "Packed", "Balanced"];

    const handleInterestToggle = (interest: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter((i) => i !== interest)
                : [...prev.interests, interest],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) {
            router.push("/auth/login");
            return;
        }

        setLoading(true);
        setError(null);
        setItinerary(null);

        try {
            const res = await fetch(
                `${API_BASE_URL}/ai-services/generate-itinerary`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                },
            );

            if (!res.ok) {
                const text = await res.text();
                let errorMsg = "Failed to generate itinerary";
                try {
                    const json = JSON.parse(text);
                    if (json.message) errorMsg = json.message;
                } catch (e) {
                    errorMsg = text || errorMsg;
                }
                throw new Error(errorMsg);
            }

            const data = await res.json();
            setItinerary(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (checkingPro || !authReady) {
        return (
            <div className="planner-container flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="planner-container">
                <div className="planner-content text-center py-20">
                    <div className="flex flex-col items-center justify-center gap-6 max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                            <Lock className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Pro Feature
                        </h1>
                        <p className="text-gray-600 text-lg">
                            The AI Travel Planner is a premium feature. Please log in as a Traveller and upgrade to Pro to unlock smart, AI-driven itinerary planning.
                        </p>
                        <Link 
                            href="/auth/login" 
                            className="mt-4 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (role !== 'traveller' || isPro === false) {
        return (
            <div className="planner-container">
                <div className="planner-content text-center py-20">
                    <div className="flex flex-col items-center justify-center gap-6 max-w-lg mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-2">
                            <Lock className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Pro Feature
                        </h1>
                        <p className="text-gray-600 text-lg">
                            The AI Travel Planner is exclusively available for Pro Travellers. Upgrade your subscription to unlock smart, AI-driven itinerary planning.
                        </p>
                        <Link 
                            href="/pro" 
                            className="mt-4 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                        >
                            Upgrade to Pro
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="planner-container">
            <div className="planner-content">
                <div className="planner-header">
                    <h1 className="planner-title">
                        AI Travel Planner
                        <span className="planner-subtitle">
                            Your Personal Itinerary Assistant
                        </span>
                    </h1>
                    <p className="planner-description">
                        Tell us your preferences, and we&apos;ll craft the perfect Sri Lankan
                        adventure just for you.
                    </p>
                </div>

                <div className="planner-card">
                    <div className="planner-body">
                        <form onSubmit={handleSubmit} className={`planner-form transition-all duration-300 ${loading ? 'opacity-50 blur-[2px] pointer-events-none' : ''}`}>
                            <div className="planner-form-grid">
                                {/* Destination */}
                                <div className="form-group">
                                    <label htmlFor="destination" className="form-label">
                                        <MapPin className="form-icon" /> Destination
                                    </label>
                                    <input
                                        id="destination"
                                        type="text"
                                        required
                                        placeholder="e.g., Kandy, Galle, Ella"
                                        className="form-input"
                                        value={formData.destination}
                                        onChange={(e) =>
                                            setFormData({ ...formData, destination: e.target.value })
                                        }
                                    />
                                </div>

                                {/* Duration */}
                                <div className="form-group">
                                    <label htmlFor="duration" className="form-label">
                                        <Calendar className="form-icon" /> Duration (Days)
                                    </label>
                                    <input
                                        id="duration"
                                        type="number"
                                        min="1"
                                        max="14"
                                        required
                                        className="form-input"
                                        value={formData.duration || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                duration: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>

                                {/* Budget */}
                                <div className="form-group">
                                    <label className="form-label">
                                        <DollarSign className="form-icon" /> Budget Level
                                    </label>
                                    <div className="button-group">
                                        {budgetOptions.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() =>
                                                    setFormData({ ...formData, budget: option })
                                                }
                                                className={`option-button ${formData.budget === option
                                                    ? "option-button-active"
                                                    : "option-button-inactive"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Travel Style */}
                                <div className="form-group">
                                    <label className="form-label">
                                        <Heart className="form-icon" /> Travel Style
                                    </label>
                                    <div className="button-group">
                                        {styleOptions.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() =>
                                                    setFormData({ ...formData, travelStyle: option })
                                                }
                                                className={`option-button ${formData.travelStyle === option
                                                    ? "option-button-active"
                                                    : "option-button-inactive"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Interests */}
                            <div className="interests-container">
                                <label className="interests-label">
                                    Interests & Activities
                                </label>
                                <div className="interests-list">
                                    {interestOptions.map((interest) => (
                                        <button
                                            key={interest}
                                            type="button"
                                            onClick={() => handleInterestToggle(interest)}
                                            className={`interest-tag ${formData.interests.includes(interest)
                                                ? "interest-tag-active"
                                                : "interest-tag-inactive"
                                                }`}
                                        >
                                            {interest}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="submit-container">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submit-button"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Generating Your Dream Trip...
                                        </>
                                    ) : (
                                        "Generate My Itinerary ✨"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {itinerary && (
                    <div className="itinerary-container">
                        <div className="itinerary-header">
                            <h2 className="itinerary-title">
                                {itinerary.tripTitle}
                            </h2>
                            <p className="itinerary-summary">
                                {itinerary.summary}
                            </p>
                            <div className="itinerary-cost">
                                Estimated Cost: {itinerary.estimatedTotalCost}
                            </div>
                        </div>

                        <div className="itinerary-days">
                            {itinerary.dailyPlan.map((day, index) => (
                                <div
                                    key={index}
                                    className="day-card"
                                >
                                    <div className="day-header">
                                        <h3 className="day-title">Day {day.day}</h3>
                                        <span className="day-subtitle">{day.title}</span>
                                    </div>
                                    <div className="day-body">
                                        <div>
                                            <h4 className="day-section-title">
                                                <MapPin className="day-section-title-teal" /> Activities
                                            </h4>
                                            <ul className="day-list">
                                                {day.activities.map((activity, i) => (
                                                    <li
                                                        key={i}
                                                        className="day-list-item"
                                                    >
                                                        <span className="day-list-bullet-teal">•</span>
                                                        {activity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="day-section-title">
                                                <MapPin className="day-section-title-pink" /> Dining
                                            </h4>
                                            <ul className="day-list">
                                                {day.meals.map((meal, i) => (
                                                    <li
                                                        key={i}
                                                        className="day-list-item"
                                                    >
                                                        <span className="day-list-bullet-pink">•</span>
                                                        {meal}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="print-container">
                            <button
                                onClick={() => window.print()}
                                className="print-button"
                            >
                                Save Itinerary
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}