// Function to determine cellHeight based on window width
export function getCellHeightForBreakpoint(windowWidth: number) {
  if (windowWidth < 500) return 70; // smallest
  if (windowWidth >= 500 && windowWidth < 700) return 100;
  if (windowWidth >= 700 && windowWidth < 850) return 140;
  if (windowWidth >= 850 && windowWidth < 1100) return 180;
  return 220; // default
}
