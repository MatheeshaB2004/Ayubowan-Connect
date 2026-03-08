/**
 * Format an ISO date string to "Mar 5, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a date range.
 * Same day  → "Mar 5, 2026"
 * Same month → "Mar 8 – 10, 2026"
 * Diff month → "Mar 8 – Apr 2, 2026"
 */
export function formatDateRange(
  startDate: string,
  endDate?: string | null
): string {
  const start = new Date(startDate);
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  if (!endDate || startDate.slice(0, 10) === endDate.slice(0, 10)) {
    return `${months[start.getMonth()]} ${start.getDate()}, ${start.getFullYear()}`;
  }

  const end = new Date(endDate);
  if (
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${months[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }

  return `${months[start.getMonth()]} ${start.getDate()} – ${months[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
}

/**
 * Format a price: null/0 → "Free", otherwise "Rs. 3,500"
 */
export function formatPrice(price?: number | null, isFree?: boolean): string {
  if (isFree || price == null || price === 0) return "Free";
  return `Rs. ${price.toLocaleString("en-LK")}`;
}

/**
 * Get "March 2026" from an ISO date string (for the sticky month header)
 */
export function getMonthYear(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
