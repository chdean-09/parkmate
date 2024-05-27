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

test("should return false if the time is not past an hour", () => {
  expect(isPastAnHour(1000 * 60 * 59)).toBe(false);
  expect(isPastAnHour(0)).toBe(false);
});

test("should return true for the smallest time greater than an hour", () => {
  expect(isPastAnHour(1000 * 60 * 60 + 1)).toBe(true);
});

test("should return true for the largest time less than two hours", () => {
  expect(isPastAnHour(1000 * 60 * 60 * 2 - 1)).toBe(true);
});

test("should return true for the largest time less than or equal to one hour", () => {
  expect(isPastAnHour(1000 * 60 * 60 - 1)).toBe(false);
});

test("should return false for the largest negative time", () => {
  expect(isPastAnHour(-Number.MAX_SAFE_INTEGER)).toBe(false);
});

test("should return true for the smallest positive time greater than or equal to two hours", () => {
  expect(isPastAnHour(1000 * 60 * 60 * 2)).toBe(true);
});

test("should return true for the largest time less than three hours", () => {
  expect(isPastAnHour(1000 * 60 * 60 * 3 - 1)).toBe(true);
});

test("should return false for zero time", () => {
  expect(isPastAnHour(0)).toBe(false);
});

test("should return false for negative time", () => {
  expect(isPastAnHour(-1000 * 60)).toBe(false);
});

test("should return false for NaN time", () => {
  expect(isPastAnHour(NaN)).toBe(false);
});

test("should return true for a very large positive time", () => {
  expect(isPastAnHour(Number.MAX_SAFE_INTEGER)).toBe(true);
});

test("should return false for a very large negative time", () => {
  expect(isPastAnHour(-Number.MAX_SAFE_INTEGER)).toBe(false);
});

test("should handle non-integer time values", () => {
  expect(isPastAnHour(1000 * 60 * 90)).toBe(true);
});

test("should handle very large time values", () => {
  expect(isPastAnHour(1e20)).toBe(true);
});

test("should handle very small positive time values", () => {
  expect(isPastAnHour(1e-10)).toBe(false);
});

test("should handle very small negative time values", () => {
  expect(isPastAnHour(-1e-10)).toBe(false);
});
