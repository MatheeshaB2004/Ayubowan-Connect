"use client";

import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/app/events/types/events";
import { useRouter } from "next/navigation";

interface EventBarProps {
  event: Event;
  innerRef?: (el: HTMLDivElement | null) => void;
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

export function EventBar({ event, innerRef }: EventBarProps) {
  const router = useRouter();

  return (
    <div
      ref={innerRef}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#379683]/30 transition-all duration-200 cursor-pointer p-4 mb-3"
      onClick={() => router.push(`/events/${event.id}`)}
    >
      <div className="flex items-center gap-5">
        {/* Thumbnail */}
        <div className="relative w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#379683]/20 to-[#379683]/5 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#379683]/40" />
            </div>
          )}
          {event.isLive && (
            <div className="absolute top-1.5 left-1.5">
              <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping inline-block" />
                Live
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-base leading-snug truncate">
                {event.title}
              </h3>
              {event.vendor && (
                <p className="text-sm text-[#379683] mt-0.5 truncate">
                  {event.vendor.businessName}
                </p>
              )}
            </div>
            {event.category && (
              <Badge
                variant="outline"
                className="border-[#379683]/50 text-[#379683] text-xs flex-shrink-0 font-normal"
              >
                {event.category}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-[#379683] flex-shrink-0" />
              {formatEventDate(event.startDate, event.endDate)}
            </span>
            {event.time && (
              <span className="flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-[#379683] flex-shrink-0" />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#379683] flex-shrink-0" />
              {event.location}
            </span>
            {event.maxParticipants != null && (
              <span className="flex items-center gap-1.5 truncate">
                <Users className="w-3.5 h-3.5 text-[#379683] flex-shrink-0" />
                {event.participantCount}/{event.maxParticipants} participants
              </span>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {event.isFree || !event.price ? (
            <Badge className="bg-[#379683] hover:bg-[#379683] text-white text-xs px-2.5 py-0.5">
              Free
            </Badge>
          ) : (
            <Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs px-2.5 py-0.5">
              Rs. {event.price.toLocaleString()}
            </Badge>
          )}
          <Button
            size="sm"
            className="bg-[#379683] hover:bg-[#2d7a6a] text-white text-xs h-8 px-3 whitespace-nowrap"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/events/${event.id}`);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
