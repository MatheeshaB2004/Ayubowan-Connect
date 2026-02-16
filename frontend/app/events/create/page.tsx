export default function CreateEventPage() {
    return (
        <main className = "p-6">
            <h1 className = "text-xl font-semibold">Create New Event</h1>

            <form className="mt-4 space-y-4">
                <input
                    type = "text"
                    placeholder = "Event name"
                    className = "border p-2 w-full"
                />

                <textarea
                    placeholder = "Event description"
                    className = "border p-2 w-full"
                />

                <button className = "bg-black text-white px-4 py-2rounded">
                    Create Event
                </button>
            </form>
        </main>
    );
}