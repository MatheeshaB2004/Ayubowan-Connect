const rawApiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

export const API_BASE_URL = rawApiBaseUrl.trim().replace(/\/+$/, "");

export function getApiUrl(path: string) {
  if (!API_BASE_URL) {
    return null;
  }

  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function requireApiUrl(path: string) {
  const url = getApiUrl(path);

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_URL must be configured.",
    );
  }

  return url;
}
