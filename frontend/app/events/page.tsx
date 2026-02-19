interface Event {
  id: number;
  title: string;
  description?: string | null;
  location: string;
  startDate: string;
  endDate?: string | null;
}

export default async function EventsPage() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }

    const events: Event[] = await res.json();

    return (
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">Event Calendar</h1>

        {events.length === 0 ? (
          <p className="text-gray-500">No events scheduled yet.</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{event.title}</h3>
                {event.description && (
                  <p className="text-gray-600 mt-2">{event.description}</p>
                )}
                <p className="text-gray-500 mt-2">📍 {event.location}</p>
                <p className="text-gray-500">
                  📅 {new Date(event.startDate).toLocaleDateString()}
                  {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    return (
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">Event Calendar</h1>
        <p className="text-red-500">Failed to load events. Please try again later.</p>
      </div>
    );
  }
}