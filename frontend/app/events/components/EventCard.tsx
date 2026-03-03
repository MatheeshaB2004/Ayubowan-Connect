"use client";

import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/app/events/types/events";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
  showVendor?: boolean;
}

function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (!endDate || startDate.slice(0, 10) === endDate.slice(0, 10)) {
    return `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;
  }
  const end = new Date(endDate);
  return `${months[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
}

export function EventCard({ event, showVendor = true }: EventCardProps) {
  const router = useRouter();

  return (
    <div
      className="flex-shrink-0 w-64 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#379683]/30 transition-all duration-200 cursor-pointer overflow-hidden bg-white"
      onClick={() => router.push(`/events/${event.id}`)}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-gray-100">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#379683]/20 to-[#379683]/5 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#379683]/30" />
          </div>
        )}

        {/* Live badge */}
        {event.isLive && (
          <div className="absolute top-2 left-2">
            <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping inline-block" />
              Live
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-2 right-2">
          {event.isFree || !event.price ? (
            <Badge className="bg-[#379683] hover:bg-[#379683] text-white text-[10px] px-2 py-0.5">
              Free
            </Badge>
          ) : (
            <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-[10px] px-2 py-0.5">
              Rs. {event.price.toLocaleString()}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
          {event.title}
        </h4>

        {showVendor && event.vendor && (
          <p className="text-xs text-[#379683] mb-2 truncate">
            {event.vendor.businessName}
          </p>
        )}

        <div className="space-y-1 text-xs text-gray-500 mt-1">
          <span className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3 h-3 text-[#379683] flex-shrink-0" />
            {formatEventDate(event.startDate, event.endDate)}
          </span>
          <span className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3 h-3 text-[#379683] flex-shrink-0" />
            {event.location}
          </span>
        </div>
      </div>
    </div>
  );
}
