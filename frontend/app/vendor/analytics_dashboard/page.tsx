// page.tsx  (SERVER COMPONENT)

import DashboardClient from "./DashboardClient";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {

  const params = await searchParams;
  const period = params.period || "thisMonth";

  const summaryRes = await fetch(
    `http://localhost:3001/vendor/dashboard/summary?userId=2&period=${period}`,
    { cache: "no-store" }
  );

  const trendRes = await fetch(
    `http://localhost:3001/vendor/dashboard/booking-trend?userId=2&period=${period}`,
    { cache: "no-store" }
  );

  const topListingsRes = await fetch(
    `http://localhost:3001/vendor/dashboard/top-listings?userId=2&period=${period}`,
    { cache: "no-store" }
  );

  const ratingRes = await fetch(
    `http://localhost:3001/vendor/dashboard/ratings?userId=2&period=${period}`,
    { cache: "no-store" }
  );

  const topListings = await topListingsRes.json();
  const summary = await summaryRes.json();
  const bookingTrend = await trendRes.json();
  const ratings = await ratingRes.json();


  return (
    <DashboardClient
      summary={summary}
      bookingTrend={bookingTrend}
      topListings={topListings}
      ratings={ratings}
      period={period}
    />
  );
}