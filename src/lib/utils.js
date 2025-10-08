import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str) {
  const lowerWords = ["and", "of", "the"];
  return str
    ?.trim()
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      lowerWords?.includes(word) && index !== 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
