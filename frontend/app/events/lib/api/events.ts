import { requireApiUrl } from "@/lib/api";

function authHeaders(token?: string, rawUserId?: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (rawUserId) {
    headers["x-user-id"] = rawUserId;
  }

  return headers;
}

//  Public
export async function fetchAllEvents(params?: {
  search?: string;
  category?: string;
  location?: string;
}) {
  const q = new URLSearchParams();
  if (params?.search)   q.set("search",   params.search);
  if (params?.category) q.set("category", params.category);
  if (params?.location) q.set("location", params.location);

  const res = await fetch(requireApiUrl(`/events?${q.toString()}`), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchEventById(id: number) {
  const res = await fetch(requireApiUrl(`/events/${id}`), { cache: "no-store" });
  if (!res.ok) throw new Error("Event not found");
  return res.json();
}

// Vendor

export async function fetchVendorEvents(token: string) {
  const res = await fetch(requireApiUrl("/events/vendor/mine"), {
    headers: authHeaders(token),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch vendor events");
  return res.json();
}

export async function createEvent(
  token: string,
  data: Record<string, unknown>
) {
  const res = await fetch(requireApiUrl("/events"), {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

/**
 * Upload an image file to Cloudinary via the NestJS backend.
 *
 * Backend endpoint: POST /events/upload-image
 * Accepts: multipart/form-data, field name = "file"
 * Returns: { url: string }  — the Cloudinary secure_url
 *
 * NOTE: Do NOT set Content-Type header manually.
 * The browser sets "multipart/form-data; boundary=..." automatically.
 */
export async function uploadEventImage(
  token: string,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(requireApiUrl("/events/upload-image"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "Image upload failed");
    throw new Error(msg);
  }

  const data = await res.json();
  return data.url as string;
}

// User

export async function fetchUserRegisteredEvents(token: string, rawUserId?: string) {
  const res = await fetch(requireApiUrl("/events/user/registered"), {
    headers: authHeaders(token, rawUserId),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch registered events");
  return res.json();
}

export async function registerForEvent(token: string, eventId: number, rawUserId?: string) {
  const res = await fetch(requireApiUrl(`/events/${eventId}/register`), {
    method: "POST",
    headers: authHeaders(token, rawUserId),
  });
  if (!res.ok) throw new Error("Failed to register for event");
  return res.json();
}

export async function unregisterFromEvent(token: string, eventId: number, rawUserId?: string) {
  const res = await fetch(requireApiUrl(`/events/${eventId}/register`), {
    method: "DELETE",
    headers: authHeaders(token, rawUserId),
  });
  if (!res.ok) throw new Error("Failed to unregister from event");
  return res.json();
}
