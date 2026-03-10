"use client";

import { Calendar, Clock, MapPin, Users, LogIn } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Event } from "../types/events";
import { formatDateRange, formatPrice } from "../lib/utils";

interface EventBarProps {
  event: Event;
  isGuest: boolean;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export function EventBar({ event, isGuest, innerRef }: EventBarProps) {
  const router = useRouter();
  const isFree = event.isFree || !event.price;
  const priceLabel = formatPrice(event.price, event.isFree);

  const goToDetail = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/events/${event.id}`);
  };

  return (
    <div
      ref={innerRef}
      onClick={goToDetail}
      className="bg-white rounded-xl border border-gray-200 hover:border-[#0d9488]/40 hover:shadow-md transition-all duration-200 cursor-pointer p-4 mb-3"
    >
      <div className="flex items-center gap-4">

        {/* Thumbnail */}
        <div className="relative w-[110px] h-[78px] flex-shrink-0 rounded-lg overflow-hidden bg-[#e8f5f2]">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={110}
              height={78}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#0d9488]/30" />
            </div>
          )}
          {/* Live badge */}
          {event.isLive && (
            <div className="absolute top-1.5 left-1.5">
              <span className="flex items-center gap-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm leading-tight">
                <span className="w-1 h-1 bg-white rounded-full animate-ping inline-block" />
                Live
              </span>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* Top row: title + category badge */}
          <div className="flex items-start gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-[15px] leading-tight truncate">
                {event.title}
              </h3>
              {event.vendor && (
                <p className="text-[13px] text-[#21a17a] font-medium mt-0.5 truncate">
                  {event.vendor.businessName}
                </p>
              )}
            </div>

            {/* Category pill — matches screenshot style */}
            {event.category && (
              <span className="flex-shrink-0 text-[11px] text-[#0d9488] border border-[#0d9488]/50 rounded-full px-2.5 py-0.5 bg-white whitespace-nowrap">
                {event.category}
              </span>
            )}
          </div>

          {/* Meta row: date · time · location · participants */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-0.5 mt-2 text-[12px] text-gray-500">
            <span className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              {formatDateRange(event.startDate, event.endDate)}
            </span>
            {event.time && (
              <span className="flex items-center gap-1.5 truncate">
                <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              {event.location}
            </span>
            {event.maxParticipants != null && (
              <span className="flex items-center gap-1.5 truncate">
                <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                {event.participantCount}/{event.maxParticipants} participants
              </span>
            )}
          </div>
        </div>

        {/* Right side: price badge + button */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
          {/* Price badge */}
          <span
            className={`text-[12px] font-semibold px-3 py-1 rounded-md ${
              isFree
                ? "bg-[#0d9488] text-white"
                : "bg-[#f59e0b] text-white"
            }`}
          >
            {priceLabel}
          </span>

          {/* CTA button */}
          {isGuest ? (
            <button
              onClick={goToDetail}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0d9488] border border-[#0d9488] rounded-lg px-3 py-[7px] hover:bg-[#0d9488] hover:text-white transition-colors whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in to view
            </button>
          ) : (
            <button
              onClick={goToDetail}
              className="text-[12px] font-semibold text-white bg-[#0d9488] rounded-lg px-4 py-[7px] hover:bg-[#0b7a70] active:scale-95 transition-all whitespace-nowrap"
            >
              View Details
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
