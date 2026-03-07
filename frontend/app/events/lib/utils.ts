import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Used by shadcn/ui components throughout the project.
 *
 * Example:
 *   cn("px-4 py-2", isActive && "bg-green-500", "px-6")
 *   // → "py-2 bg-green-500 px-6"  (px-6 wins over px-4)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Sri Lankan Rupees.
 * Example: formatPrice(3500) → "Rs. 3,500"
 */
export function formatPrice(amount: number | null | undefined): string {
  if (amount == null) return "Free";
  return `Rs. ${amount.toLocaleString("en-LK")}`;
}

/**
 * Format an ISO date string to a readable date.
 * Example: formatDate("2026-03-05") → "Mar 5, 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a date range. If same day, returns single date.
 * Example: formatDateRange("2026-03-08", "2026-03-10") → "Mar 8 – 10, 2026"
 */
export function formatDateRange(
  startDate: string,
  endDate?: string | null
): string {
  const start = new Date(startDate);
  if (!endDate || startDate.slice(0, 10) === endDate.slice(0, 10)) {
    return formatDate(startDate);
  }
  const end = new Date(endDate);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${months[start.getMonth()]} ${start.getDate()} – ${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Check if a value is a non-empty string.
 */
export function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
