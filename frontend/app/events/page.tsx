import { getEvents } from "@/lib/api/events";
import CalendarClient from "@/app/events/components/CalendarClient";

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let error = null;

  try {
    events = await getEvents();
  } catch (e) {
    console.error("Failed to fetch events:", e);
    error = "Failed to load events. Please try again later.";
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Unable to Load Calendar
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <CalendarClient initialEvents={events} />;
}