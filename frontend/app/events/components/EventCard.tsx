"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Event } from "../types/events";
import { formatDateRange, formatPrice } from "../lib/utils";

interface EventCardProps {
  event: Event;
  showVendor?: boolean;
  muted?: boolean;
}

export function EventCard({ event, showVendor = true, muted = false }: EventCardProps) {
  const router = useRouter();
  const isFree = event.isFree || !event.price;

  return (
    <div
      onClick={() => router.push(`/events/${event.id}`)}
      className={`flex-shrink-0 w-60 rounded-xl border border-gray-200 hover:border-[#0d9488]/40 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden bg-white ${muted ? "opacity-55" : ""}`}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-[#e8f5f2]">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#0d9488]/25" />
          </div>
        )}

        {event.isLive && (
          <div className="absolute top-2 left-2">
            <span className="flex items-center gap-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
              <span className="w-1 h-1 bg-white rounded-full animate-ping inline-block" />
              Live
            </span>
          </div>
        )}

        <div className="absolute top-2 right-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${isFree ? "bg-[#0d9488] text-white" : "bg-[#f59e0b] text-white"}`}>
            {formatPrice(event.price, event.isFree)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-[13px] leading-snug line-clamp-2 mb-1">
          {event.title}
        </h4>
        {showVendor && event.vendor && (
          <p className="text-[11px] text-[#21a17a] font-medium mb-1.5 truncate">
            {event.vendor.businessName}
          </p>
        )}
        <div className="space-y-1 text-[11px] text-gray-500 mt-1">
          <span className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3 h-3 text-gray-400 flex-shrink-0" />
            {formatDateRange(event.startDate, event.endDate)}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
            {event.location}
          </span>
        </div>
      </div>
    </div>
  );
}
