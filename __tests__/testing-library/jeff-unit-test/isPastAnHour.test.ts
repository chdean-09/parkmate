import { isPastAnHour } from "@/utils/isPastAnHour";

describe("isPastAnHour function", () => {
  test("should return true if the time is past an hour", () => {
    expect(isPastAnHour(1000 * 60 * 60)).toBe(true);

    expect(isPastAnHour(1000 * 60 * 61)).toBe(true);

    expect(isPastAnHour(1000 * 60 * 70)).toBe(true);
  });

  test("should return false if the time is not past an hour", () => {
    expect(isPastAnHour(1000 * 60 * 59)).toBe(false);

    expect(isPastAnHour(0)).toBe(false);
  });
});
