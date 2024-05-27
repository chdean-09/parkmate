export function formatTimeToHMS(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  let formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const ampm = hours < 12 ? "AM" : "PM";

  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
}
