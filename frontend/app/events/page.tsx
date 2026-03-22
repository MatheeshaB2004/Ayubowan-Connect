import { Suspense } from "react";
import { EventsPageContent } from "./components/EventsPageContent";

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
          Loading events...
        </div>
      }
    >
      <EventsPageContent />
    </Suspense>
  );
}

function AllEventsSkeleton() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-24 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div className="h-0.5 bg-gray-200 rounded mb-4" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4 animate-pulse">
            <div className="w-[110px] h-[78px] bg-gray-100 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-5 bg-gray-100 rounded w-2/3" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
              <div className="flex gap-4 mt-3">
                {[...Array(4)].map((_, j) => <div key={j} className="h-3 bg-gray-100 rounded w-20" />)}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end flex-shrink-0">
              <div className="h-7 w-16 bg-gray-100 rounded-md" />
              <div className="h-8 w-24 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
