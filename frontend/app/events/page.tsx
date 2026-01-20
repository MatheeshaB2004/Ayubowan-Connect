import EventCard from "./components/EventCard";

export default function EventsPage() {
    return (
        <main className = "p-6">
            <h1 className = "text-2xl font-bold">Events</h1>
            <p className = "mt-2 text-gray-600">
                Discover authentic Sri Lankan cultural events happening around you.
            </p>

            <EventCard title = "Kandy Esala Perahera" />
        </main>
    );
}