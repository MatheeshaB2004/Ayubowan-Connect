import { Event, CreateEventInput } from '@/types/event';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`, {
    cache: 'no-store',
  });
  
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function createEvent(data: CreateEventInput): Promise<Event> {
  const res = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'DELETE',
  });
  
  if (!res.ok) throw new Error('Failed to delete event');
}