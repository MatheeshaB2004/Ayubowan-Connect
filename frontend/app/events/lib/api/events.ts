import { requireApiUrl, API_BASE_URL } from "@/lib/api";

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

  const queryString = q.toString();
  const url = queryString ? `/events?${queryString}` : '/events';

  const res = await fetch(requireApiUrl(url), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchEventById(id: number) {
  const res = await fetch(requireApiUrl(`/events/${id}`), { cache: "no-store" });
  if (!res.ok) throw new Error("Event not found");
  return res.json();
}

// Vendor

export async function fetchVendorEvents(token: string, rawUserId?: string) {
  const res = await fetch(requireApiUrl("/events/vendor/mine"), {
    headers: authHeaders(token, rawUserId),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch vendor events");
  return res.json();
}

export async function createEvent(
  token: string,
  data: Record<string, unknown>,
  rawUserId?: string
) {
  const res = await fetch(requireApiUrl("/events"), {
    method: "POST",
    headers: authHeaders(token, rawUserId),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event");
  return res.json();
}

export async function deleteEvent(
  token: string,
  eventId: number,
  rawUserId?: string
) {
  const res = await fetch(requireApiUrl(`/events/${eventId}`), {
    method: "DELETE",
    headers: authHeaders(token, rawUserId),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "Failed to delete event");
    throw new Error(msg);
  }

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

export async function fetchUserRegisteredEvents(user: any) {
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress;

  console.log("USER OBJECT:", user);

  if (!user?.id || !email) {
    console.warn("User/email missing for events API");
    return [];
  }

  const res = await fetch(`${API_BASE_URL}/events/user/registered`, {
    headers: {
      'x-user-id': user.id,
      'x-user-email': email,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("EVENT ERROR:", err);
    throw new Error("Failed to fetch registered events");
  }

  return res.json();
}

export async function registerForEvent(user: any, eventId: number) {
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress;

  console.log("REGISTER USER:", user);
  console.log("REGISTER EMAIL:", email);

  if (!user?.id || !email) {
    throw new Error("User/email missing");
  }

  const res = await fetch(`${API_BASE_URL}/events/${eventId}/register`, {
    method: "POST",
    headers: {
      'x-user-id': user.id,
      'x-user-email': email,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("REGISTER ERROR:", err);
    throw new Error("Failed to register");
  }

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

// Event Gallery

export async function fetchEventGallery(eventId: number) {
  const res = await fetch(requireApiUrl(`/events/${eventId}/gallery`), {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch event gallery");
  return res.json();
}

export async function uploadEventGalleryImage(
  token: string,
  eventId: number,
  file: File,
  rawUserId?: string
): Promise<{ id: number; imageUrl: string; displayOrder: number; uploadedAt: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const headers: HeadersInit = { Authorization: `Bearer ${token}` };
  if (rawUserId) {
    headers["x-user-id"] = rawUserId;
  }

  const res = await fetch(requireApiUrl(`/events/${eventId}/gallery`), {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "Gallery image upload failed");
    throw new Error(msg);
  }

  return res.json();
}

export async function deleteEventGalleryImage(
  token: string,
  eventId: number,
  imageId: number,
  rawUserId?: string
) {
  const res = await fetch(requireApiUrl(`/events/${eventId}/gallery/${imageId}`), {
    method: "DELETE",
    headers: authHeaders(token, rawUserId),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "Failed to delete gallery image");
    throw new Error(msg);
  }

  return res.json();
}
