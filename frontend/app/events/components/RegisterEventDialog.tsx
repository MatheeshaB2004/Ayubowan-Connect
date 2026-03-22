"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, Loader2, Calendar, MapPin, CheckCircle } from "lucide-react";
import { registerForEvent } from "../lib/api/events";
import { Event } from "../types/events";
import { formatDateRange, formatPrice } from "../lib/utils";

interface Props {
  event: Event | null;
  token: string;
  userId?: string;
  onClose: () => void;
  onRegistered: () => void;
}

export function RegisterEventDialog({ event, token, userId, onClose, onRegistered }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!event) return null;

  const handleRegister = async () => {
    setError(null); setLoading(true);
    try {
      await registerForEvent(token, event.id);
      setSuccess(true);
      setTimeout(() => { onRegistered(); onClose(); setSuccess(false); }, 1800);
    } catch {
      setError("Registration failed. You may already be registered for this event.");
    } finally { setLoading(false); }
  };

  const isFree = event.isFree || !event.price;
  const spotsLeft = event.maxParticipants
    ? event.maxParticipants - event.participantCount
    : null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Register for Event</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {success ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#e8f5f2] flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-[#0d9488]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">You&apos;re registered!</h3>
              <p className="text-sm text-gray-500">See you at <strong>{event.title}</strong>.</p>
            </div>
          ) : (
            <>
              {/* Event summary card */}
              <div className="bg-[#f9fafb] rounded-xl border border-gray-200 p-4 mb-4">
                {event.imageUrl && (
                  <Image src={event.imageUrl} alt={event.title} width={400} height={112} className="w-full h-28 object-cover rounded-lg mb-3" />
                )}
                <h3 className="font-semibold text-gray-900 text-[15px] mb-1">{event.title}</h3>
                {event.vendor && (
                  <p className="text-[13px] text-[#21a17a] font-medium mb-2">{event.vendor.businessName}</p>
                )}
                <div className="space-y-1 text-[12px] text-gray-500">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {formatDateRange(event.startDate, event.endDate)}
                    {event.time && <span className="text-gray-400">· {event.time}</span>}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {event.location}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <span className="text-[12px] text-gray-500">
                    {event.participantCount}{event.maxParticipants ? `/${event.maxParticipants}` : ""} registered
                    {spotsLeft != null && spotsLeft <= 5 && (
                      <span className="text-amber-600 font-medium ml-1">· Only {spotsLeft} left!</span>
                    )}
                  </span>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${isFree ? "bg-[#0d9488] text-white" : "bg-[#f59e0b] text-white"}`}>
                    {formatPrice(event.price, event.isFree)}
                  </span>
                </div>
              </div>

              {event.description && (
                <p className="text-[13px] text-gray-600 leading-relaxed mb-4">{event.description}</p>
              )}

              {error && (
                <p className="text-[13px] text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">{error}</p>
              )}

              <p className="text-[11px] text-gray-400 mb-4">
                By registering you confirm your interest in attending this event.
              </p>

              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 h-10 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleRegister} disabled={loading} className="flex-1 h-10 rounded-lg bg-[#0d9488] hover:bg-[#0b7a70] text-white text-sm font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Registering...</> : "Confirm Registration"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
