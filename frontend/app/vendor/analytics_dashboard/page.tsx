// page.tsx  (SERVER COMPONENT)

import DashboardClient from "./DashboardClient";

export default async function Page({
  searchParams,
}: {
  searchParams: { period?: string };
}) {

  const period = searchParams?.period || "thisMonth";

  const summaryRes = await fetch(
    `http://localhost:3001/vendor/dashboard/summary?userId=2`,
    { cache: "no-store" }
  );

  const trendRes = await fetch(
    `http://localhost:3001/vendor/dashboard/booking-trend?userId=2&period=${period}`,
    { cache: "no-store" }
  );

  const summary = await summaryRes.json();
  const bookingTrend = await trendRes.json();

  return (
    <DashboardClient
      summary={summary}
      bookingTrend={bookingTrend}
      period={period}
    />
  );
}