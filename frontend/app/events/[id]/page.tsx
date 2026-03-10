"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft, Calendar, Clock, MapPin, Users,
  LogIn, UserCheck, Building2, Tag,
} from "lucide-react";
import { fetchEventById } from "../lib/api/events";
import { RegisterEventDialog } from "../components/RegisterEventDialog";
import { Event } from "../types/events";
import { formatDateRange, formatPrice } from "../lib/utils";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();
  const { role } = useAuth();

  const [event, setEvent]         = useState<Event | null>(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [showReg, setShowReg]     = useState(false);

  const isGuest  = role === "guest" || !role;
  const isUser   = role === "traveller";
  const isVendor = role === "vendor";

  const getToken = () =>
    typeof window !== "undefined" ? (localStorage.getItem("accessToken") ?? "") : "";

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchEventById(Number(id));
        setEvent(data);
      } catch { setNotFound(true); }
      finally   { setLoading(false); }
    })();
  }, [id]);

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#0d9488] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading event...</p>
      </div>
    </div>
  );

  // ── Not found ───────────────────────────────────────────────────────────────
  if (notFound || !event) return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl font-bold text-gray-200 mb-2">404</p>
        <p className="text-gray-500 mb-5">Event not found</p>
        <button onClick={() => router.push("/events")} className="text-sm text-[#0d9488] underline">
          ← Back to Events
        </button>
      </div>
    </div>
  );

  const isFree    = event.isFree || !event.price;
  const spotsLeft = event.maxParticipants ? event.maxParticipants - event.participantCount : null;
  const almostFull = spotsLeft != null && spotsLeft <= 5;

  return (
    <>
      <div className="min-h-screen bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

          {/* Back button */}
          <button
            onClick={() => router.push("/events")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Events
          </button>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Hero */}
            <div className="relative">
              {event.imageUrl ? (
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image src={event.imageUrl} alt={event.title} fill className="w-full h-full object-cover" />
                  {/* Gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              ) : (
                <div className="h-44 bg-[#e8f5f2]" />
              )}

              {/* Floating badges on image */}
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                {event.isLive && (
                  <span className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping inline-block" />
                    Live Now
                  </span>
                )}
                {event.category && (
                  <span className="text-xs font-medium text-[#0d9488] bg-white border border-[#0d9488]/30 px-2.5 py-1 rounded-full">
                    {event.category}
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4">
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-lg shadow ${isFree ? "bg-[#0d9488] text-white" : "bg-[#f59e0b] text-white"}`}>
                  {formatPrice(event.price, event.isFree)}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                {event.title}
              </h1>

              {/* Vendor */}
              {event.vendor && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-[#e8f5f2] flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5 text-[#0d9488]" />
                  </div>
                  <p className="text-sm text-[#21a17a] font-semibold">{event.vendor.businessName}</p>
                </div>
              )}

              {/* Meta grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                <MetaTile icon={<Calendar className="w-4 h-4 text-[#0d9488]" />} label="Date">
                  {formatDateRange(event.startDate, event.endDate)}
                </MetaTile>
                {event.time && (
                  <MetaTile icon={<Clock className="w-4 h-4 text-[#0d9488]" />} label="Time">
                    {event.time}
                  </MetaTile>
                )}
                <MetaTile icon={<MapPin className="w-4 h-4 text-[#0d9488]" />} label="Location">
                  {event.location}{event.district && event.district !== event.location ? `, ${event.district}` : ""}
                </MetaTile>
                <MetaTile icon={<Users className="w-4 h-4 text-[#0d9488]" />} label="Participants">
                  <span>{event.participantCount} registered</span>
                  {event.maxParticipants && (
                    <span className={`ml-1 font-medium ${almostFull ? "text-amber-600" : "text-gray-500"}`}>
                      · {almostFull ? `Only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left!` : `${spotsLeft} spots left`}
                    </span>
                  )}
                </MetaTile>
                {event.category && (
                  <MetaTile icon={<Tag className="w-4 h-4 text-[#0d9488]" />} label="Category">
                    {event.category}
                  </MetaTile>
                )}
              </div>

              {/* Description */}
              {event.description && (
                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About this Event</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-100 pt-6">

                {/* ── Guest CTA ── */}
                {isGuest && (
                  <div className="rounded-xl bg-[#e8f5f2] border border-[#0d9488]/20 px-5 py-5">
                    <p className="font-semibold text-gray-800 mb-1">Want to attend this event?</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a free account or log in to register for this event and explore more.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => router.push("/auth/register")}
                        className="flex-1 h-10 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white text-sm font-semibold transition-colors"
                      >
                        Sign up — it&apos;s free
                      </button>
                      <button
                        onClick={() => router.push("/auth/login")}
                        className="flex-1 h-10 rounded-lg border border-[#0d9488] text-[#0d9488] text-sm font-semibold hover:bg-[#0d9488] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                      >
                        <LogIn className="w-4 h-4" />
                        Log in
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Vendor info ── */}
                {isVendor && (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Viewing as Vendor</p>
                      <p className="text-sm text-amber-700 mt-0.5">
                        Switch to a traveller account to register for events.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Traveller CTA ── */}
                {isUser && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Ready to join?</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {almostFull
                          ? `Hurry — only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} remaining!`
                          : "Secure your spot for this experience today."}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowReg(true)}
                      className="flex items-center gap-2 text-sm font-semibold text-white bg-[#0d9488] hover:bg-[#0b7a70] active:scale-95 transition-all rounded-lg px-6 h-11"
                    >
                      <UserCheck className="w-4 h-4" />
                      Register for this Event
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration popup */}
      {isUser && (
        <RegisterEventDialog
          event={showReg ? event : null}
          token={getToken()}
          onClose={() => setShowReg(false)}
          onRegistered={() => setShowReg(false)}
        />
      )}
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function MetaTile({ icon, label, children }: {
  icon: React.ReactNode; label: string; children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 bg-[#f9fafb] rounded-xl p-3.5 border border-gray-100">
      <div className="w-8 h-8 rounded-lg bg-[#e8f5f2] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm text-gray-800 font-medium leading-snug">{children}</p>
      </div>
    </div>
  );
}
