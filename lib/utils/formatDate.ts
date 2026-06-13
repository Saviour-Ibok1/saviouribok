// Shared date formatter used across blog listing and post pages
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });
}