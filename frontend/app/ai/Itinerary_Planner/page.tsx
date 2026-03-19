"use client";

import { useState } from "react";
import { Loader2, Calendar, DollarSign, MapPin, Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
    const { isSignedIn } = useUser();
    const router = useRouter();

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
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/ai-services/generate-itinerary`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                },
            );

            if (!res.ok) {
                throw new Error("Failed to generate itinerary");
            }

            const data = await res.json();
            setItinerary(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

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
                                        value={formData.duration}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                duration: parseInt(e.target.value),
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