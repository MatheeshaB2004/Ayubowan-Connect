"use client";

import { useState } from "react";
import { Loader2, Calendar, DollarSign, MapPin, Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

export default function AIPlannerPage() {
  const { isLoaded, isSignedIn, user } = useUser();
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
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Travel Planner
            <span className="text-teal-600 block text-2xl mt-2 font-normal">
              Your Personal Itinerary Assistant
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Tell us your preferences, and we'll craft the perfect Sri Lankan
            adventure just for you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Destination */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Destination
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Kandy, Galle, Ella"
                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    required
                    className="w-full px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
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
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Budget Level
                  </label>
                  <div className="flex gap-2">
                    {budgetOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, budget: option })
                        }
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                          formData.budget === option
                            ? "bg-teal-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Travel Style
                  </label>
                  <div className="flex gap-2">
                    {styleOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, travelStyle: option })
                        }
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                          formData.travelStyle === option
                            ? "bg-teal-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Interests & Activities
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        formData.interests.includes(interest)
                          ? "bg-teal-100 text-teal-800 border-teal-500"
                          : "bg-white border-gray-200 text-gray-600 hover:border-teal-300"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
            {error}
          </div>
        )}

        {itinerary && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                {itinerary.tripTitle}
              </h2>
              <p className="text-xl text-gray-600 italic">
                {itinerary.summary}
              </p>
              <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full font-medium">
                Estimated Cost: {itinerary.estimatedTotalCost}
              </div>
            </div>

            <div className="space-y-6">
              {itinerary.dailyPlan.map((day, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-teal-600 px-6 py-4 flex justify-between items-center text-white">
                    <h3 className="text-lg font-bold">Day {day.day}</h3>
                    <span className="opacity-90">{day.title}</span>
                  </div>
                  <div className="p-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-600" /> Activities
                      </h4>
                      <ul className="space-y-2">
                        {day.activities.map((activity, i) => (
                          <li
                            key={i}
                            className="text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-teal-500 mt-1.5">•</span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-pink-500" /> Dining
                      </h4>
                      <ul className="space-y-2">
                        {day.meals.map((meal, i) => (
                          <li
                            key={i}
                            className="text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-pink-400 mt-1.5">•</span>
                            {meal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8 pb-12">
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
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
