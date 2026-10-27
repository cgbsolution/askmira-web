import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about the custom type scale in globals.css,
 * or it reads `text-display-2` as a colour and drops it next to `text-ink-950`.
 */
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["display-1", "display-2", "display-3", "display-4", "lead"] } },
});

/** Merge conditional class names, with later Tailwind utilities winning. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "Priya Ramesh" → "PR". Falls back to "?" so an avatar is never blank. */
export function initials(name?: string | null): string {
  if (!name) return "?";
  return (
    name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

/**
 * A whole-rupee amount grouped the Indian way: 1234567 → "₹12,34,567".
 * Used by the sample-data mockups only; the site handles no real money.
 */
export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
