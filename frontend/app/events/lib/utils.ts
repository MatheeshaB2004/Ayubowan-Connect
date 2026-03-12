// frontend/app/events/lib/utils.ts

/**
 * "Mar 5, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

/**
 * Same day  → "Feb 28, 2026"
 * Same month → "Mar 8 – 10, 2026"
 * Diff month  → "Mar 8 – Apr 2, 2026"
 */
export function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  if (!endDate || startDate.slice(0, 10) === endDate.slice(0, 10)) {
    return `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;
  }
  const end = new Date(endDate);
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${months[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${months[start.getMonth()]} ${start.getDate()} – ${months[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

/**
 * null / 0 / isFree → "Free"
 * otherwise → "LKR 3,500"   ← LKR (not Rs.)
 */
export function formatPrice(price?: number | null, isFree?: boolean): string {
  if (isFree || price == null || price === 0) return "Free";
  return `LKR ${price.toLocaleString("en-LK")}`;
}

/**
 * "March 2026" — used by sticky month header
 */
export function getMonthYear(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long", year: "numeric",
  });
}

/**
 * Day name + date: "Saturday, Feb 28, 2026"
 */
export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long", month: "short", day: "numeric", year: "numeric",
  });
}
