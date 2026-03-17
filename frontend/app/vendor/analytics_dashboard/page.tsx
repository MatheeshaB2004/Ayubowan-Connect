import DashboardClient from "./DashboardClient";
import { auth } from "@clerk/nextjs/server";
import { getApiUrl } from "@/lib/api";

const emptySummary = {
  experiences: 0,
  bookings: 0,
  products: 0,
  events: 0,
};

const emptyRatings = {
  avgRating: 0,
  totalReviews: 0,
  satisfaction: 0,
  breakdown: [],
};

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  const url = getApiUrl(path);

  if (!url) {
    return fallback;
  }

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Failed to load ${path}`, error);
    return fallback;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {

  const { userId } = await auth();
  if (!userId) return null;
  const params = await searchParams;
  const period = params.period || "thisMonth";
  const [
    summary,
    bookingTrend,
    topListings,
    ratings,
    insights,
    viewsVsBookingsJson,
    ratingTrend
  ] = await Promise.all([
    fetchJson(`/dashboard/vendor/summary?userId=${userId}&period=${period}`, emptySummary),
    fetchJson(`/dashboard/vendor/booking-trend?userId=${userId}&period=${period}`, []),
    fetchJson(`/dashboard/vendor/top-listings?userId=${userId}&period=${period}`, []),
    fetchJson(`/dashboard/vendor/ratings?userId=${userId}&period=${period}`, emptyRatings),
    fetchJson(`/dashboard/vendor/insights?userId=${userId}&period=${period}`, []),
    fetchJson(`/dashboard/vendor/views-vs-bookings?userId=${userId}&period=${period}`, {
      data: [],
      conversionRate: 0,
    }),
    fetchJson(`/dashboard/vendor/ratings-trend?userId=${userId}&period=${period}`, [])
  ]);
  const viewsVsBookings = viewsVsBookingsJson.data;
  const conversionRate = viewsVsBookingsJson.conversionRate;

  return (
    <DashboardClient
      summary={summary}
      bookingTrend={bookingTrend}
      topListings={topListings}
      ratings={ratings}
      insights={insights}
      viewsVsBookings={viewsVsBookings}
      conversionRate={conversionRate}
      period={period}
      ratingTrend={ratingTrend}
    />
  );
}
