"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function VendorCTA() {
  const router = useRouter();
  const { role, authReady } = useAuth();
  const [feedback, setFeedback] = useState<string | null>(null);

  const isGuest = authReady && (role === "guest" || !role);
  const isTraveller = role === "traveller";
  const isVendor = role === "vendor";

  const feedbackTone = useMemo(() => {
    if (!feedback) return "";
    return isVendor
      ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
      : "border-amber-400/30 bg-amber-500/10 text-amber-100";
  }, [feedback, isVendor]);

  const handleBecomeVendor = () => {
    if (!authReady) return;

    if (isGuest) {
      router.push("/auth/vendor-register");
      return;
    }

    if (isTraveller) {
      setFeedback("It looks like you're registered as a traveler. Traveler accounts cannot register as vendors.");
      return;
    }

    if (isVendor) {
      setFeedback("Great news! You are already registered as a vendor.");
    }
  };

  return (
    <section className="py-16 bg-[#1a1a2e] text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3">Are You a Local Vendor?</h2>
          <p className="text-gray-300 text-sm mb-5 max-w-md">
            Join our community of artisans and cultural experts. Share your passion, connect with
            travelers, and grow your business.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Reach thousands of interested customers",
              "Easy to use vendor dashboard",
              "Secure and reliable payments",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-[#0d9488]">✓</span> {item}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleBecomeVendor}
            disabled={!authReady}
            className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0b7a6e] disabled:bg-[#0d9488]/50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Become a Vendor
          </button>

          {feedback && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-3 inline-flex items-start gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm ${feedbackTone}`}
            >
              {isVendor ? (
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              <span>{feedback}</span>
            </div>
          )}
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 text-center">
          {[
            { value: "250+", label: "Active Vendors" },
            { value: "95%", label: "Satisfaction Rate" },
            { value: "10K+", label: "Bookings Made" },
            { value: "4.9+", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-4">
              <p className="text-2xl font-extrabold text-[#21a17a]">{s.value}</p>
              <p className="text-xs text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}