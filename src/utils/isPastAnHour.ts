export function isPastAnHour(time: number) {
  const oneHour = 1000 * 60 * 60;
  const timeDifference = Math.floor(time / oneHour);

  return timeDifference >= 1;
}
