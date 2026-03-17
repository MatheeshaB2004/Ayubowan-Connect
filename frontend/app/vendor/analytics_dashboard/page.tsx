import DashboardClient from "./DashboardClient";
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

  const params = await searchParams;
  const period = params.period || "thisMonth";
  const [
    summary,
    bookingTrend,
    topListings,
    ratings,
    insights,
    viewsVsBookingsJson,
  ] = await Promise.all([
    fetchJson(`/dashboard/vendor/summary?userId=2&period=${period}`, emptySummary),
    fetchJson(`/dashboard/vendor/booking-trend?userId=2&period=${period}`, []),
    fetchJson(`/dashboard/vendor/top-listings?userId=2&period=${period}`, []),
    fetchJson(`/dashboard/vendor/ratings?userId=2&period=${period}`, emptyRatings),
    fetchJson(`/dashboard/vendor/insights?userId=2&period=${period}`, []),
    fetchJson(`/dashboard/vendor/views-vs-bookings?userId=2&period=${period}`, {
      data: [],
      conversionRate: 0,
    }),
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
    />
  );
}
