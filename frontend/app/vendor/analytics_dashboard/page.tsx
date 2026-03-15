import DashboardClient from "./DashboardClient";
import { auth } from "@clerk/nextjs/server";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {

  const { userId } = await auth();
  if (!userId) return null;
  const params = await searchParams;
  const period = params.period || "thisMonth";

  const summaryRes = await fetch(
    `http://localhost:3001/dashboard/vendor/summary?userId=${userId}&period=${period}`,
    { cache: "no-store" }
  );

  const trendRes = await fetch(
    `http://localhost:3001/dashboard/vendor/booking-trend?userId=${userId}&period=${period}`,
    { cache: "no-store" }
  );

  const topListingsRes = await fetch(
    `http://localhost:3001/dashboard/vendor/top-listings?userId=${userId}&period=${period}`,
    { cache: "no-store" }
  );

  const ratingRes = await fetch(
    `http://localhost:3001/dashboard/vendor/ratings?userId=${userId}&period=${period}`,
    { cache: "no-store" }
  );

  const insightsRes = await fetch(
    `http://localhost:3001/dashboard/vendor/insights?userId=${userId}&period=${period}`,
    { cache: "no-store" }
  );

  const viewsVsBookingsRes = await fetch(
    `http://localhost:3001/dashboard/vendor/views-vs-bookings?userId=${userId}&period=${period}`,
    { cache: "no-store" }
  );

  const viewsVsBookingsJson = await viewsVsBookingsRes.json();
  const viewsVsBookings = viewsVsBookingsJson.data;
  const conversionRate = viewsVsBookingsJson.conversionRate;
  const insights = await insightsRes.json();
  const topListings = await topListingsRes.json();
  console.log("TOP LISTINGS RESPONSE:", topListings);
  const summary = await summaryRes.json();
  const bookingTrend = await trendRes.json();
  const ratings = await ratingRes.json();


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