// frontend/lib/api/events.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function fetchAllEvents(params?: {
  search?: string;
  category?: string;
  location?: string;
}) {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.category && params.category !== 'all') query.set('category', params.category);
  if (params?.location && params.location !== 'all') query.set('location', params.location);

  const res = await fetch(`${BASE_URL}/events?${query.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function fetchVendorEvents(token: string) {
  const res = await fetch(`${BASE_URL}/events/vendor/mine`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch vendor events');
  return res.json();
}

export async function fetchUserRegisteredEvents(token: string) {
  const res = await fetch(`${BASE_URL}/events/user/registered`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch registered events');
  return res.json();
}

export async function createEvent(token: string, data: Record<string, unknown>) {
  const res = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
}

export async function registerForEvent(token: string, eventId: number) {
  const res = await fetch(`${BASE_URL}/events/${eventId}/register`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to register');
  return res.json();
}
