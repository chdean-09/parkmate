import { formatTimeToHMS } from "@/utils/timeFormatter";

describe("formatTimeToHMS", () => {
  test("should format midnight correctly", () => {
    const date = new Date("2021-01-01T00:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 AM");
  });

  test("should format noon correctly", () => {
    const date = new Date("2021-01-01T12:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 PM");
  });

  test("should format morning time correctly", () => {
    const date = new Date("2021-01-01T09:05:05");
    expect(formatTimeToHMS(date)).toBe("09:05:05 AM");
  });

  test("should format afternoon time correctly", () => {
    const date = new Date("2021-01-01T15:15:15");
    expect(formatTimeToHMS(date)).toBe("03:15:15 PM");
  });

  test("should format evening time correctly", () => {
    const date = new Date("2021-01-01T21:45:45");
    expect(formatTimeToHMS(date)).toBe("09:45:45 PM");
  });

  test("should format single digit hours correctly in AM", () => {
    const date = new Date("2021-01-01T01:01:01");
    expect(formatTimeToHMS(date)).toBe("01:01:01 AM");
  });

  test("should format single digit hours correctly in PM", () => {
    const date = new Date("2021-01-01T13:13:13");
    expect(formatTimeToHMS(date)).toBe("01:13:13 PM");
  });

  test("should handle single digit minutes correctly", () => {
    const date = new Date("2021-01-01T10:05:45");
    expect(formatTimeToHMS(date)).toBe("10:05:45 AM");
  });

  test("should handle single digit seconds correctly", () => {
    const date = new Date("2021-01-01T10:45:05");
    expect(formatTimeToHMS(date)).toBe("10:45:05 AM");
  });

  test("should handle times just before noon correctly", () => {
    const date = new Date("2021-01-01T11:59:59");
    expect(formatTimeToHMS(date)).toBe("11:59:59 AM");
  });

  test("should handle times just before midnight correctly", () => {
    const date = new Date("2021-01-01T23:59:59");
    expect(formatTimeToHMS(date)).toBe("11:59:59 PM");
  });

  test("should handle times just after midnight correctly", () => {
    const date = new Date("2021-01-01T00:01:01");
    expect(formatTimeToHMS(date)).toBe("12:01:01 AM");
  });

  test("should handle times just after noon correctly", () => {
    const date = new Date("2021-01-01T12:01:01");
    expect(formatTimeToHMS(date)).toBe("12:01:01 PM");
  });

  test("should format leading zero hours in AM correctly", () => {
    const date = new Date("2021-01-01T06:06:06");
    expect(formatTimeToHMS(date)).toBe("06:06:06 AM");
  });

  test("should format leading zero hours in PM correctly", () => {
    const date = new Date("2021-01-01T18:18:18");
    expect(formatTimeToHMS(date)).toBe("06:18:18 PM");
  });

  test("should correctly pad single digit minutes", () => {
    const date = new Date("2021-01-01T10:09:09");
    expect(formatTimeToHMS(date)).toBe("10:09:09 AM");
  });

  test("should correctly pad single digit seconds", () => {
    const date = new Date("2021-01-01T10:10:07");
    expect(formatTimeToHMS(date)).toBe("10:10:07 AM");
  });

  test("should handle the time exactly at noon", () => {
    const date = new Date("2021-01-01T12:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 PM");
  });

  test("should handle the time exactly at midnight", () => {
    const date = new Date("2021-01-01T00:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 AM");
  });

  test("should correctly convert times around midnight", () => {
    const date1 = new Date("2021-01-01T23:59:59");
    const date2 = new Date("2021-01-02T00:00:00");
    expect(formatTimeToHMS(date1)).toBe("11:59:59 PM");
    expect(formatTimeToHMS(date2)).toBe("12:00:00 AM");
  });

  test("should correctly convert times around noon", () => {
    const date1 = new Date("2021-01-01T11:59:59");
    const date2 = new Date("2021-01-01T12:00:00");
    expect(formatTimeToHMS(date1)).toBe("11:59:59 AM");
    expect(formatTimeToHMS(date2)).toBe("12:00:00 PM");
  });

  test("should correctly pad hours, minutes, and seconds", () => {
    const date = new Date("2021-01-01T09:09:09");
    expect(formatTimeToHMS(date)).toBe("09:09:09 AM");
  });

  test("should handle edge case of 00:00:00 correctly", () => {
    const date = new Date("2021-01-01T00:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 AM");
  });

  test("should handle edge case of 12:00:00 correctly", () => {
    const date = new Date("2021-01-01T12:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 PM");
  });

  test("should format different seconds values correctly", () => {
    const date1 = new Date("2021-01-01T10:10:01");
    const date2 = new Date("2021-01-01T10:10:22");
    const date3 = new Date("2021-01-01T10:10:45");
    expect(formatTimeToHMS(date1)).toBe("10:10:01 AM");
    expect(formatTimeToHMS(date2)).toBe("10:10:22 AM");
    expect(formatTimeToHMS(date3)).toBe("10:10:45 AM");
  });

  test("should handle various minute values correctly", () => {
    const date1 = new Date("2021-01-01T10:01:01");
    const date2 = new Date("2021-01-01T10:22:01");
    const date3 = new Date("2021-01-01T10:45:01");
    expect(formatTimeToHMS(date1)).toBe("10:01:01 AM");
    expect(formatTimeToHMS(date2)).toBe("10:22:01 AM");
    expect(formatTimeToHMS(date3)).toBe("10:45:01 AM");
  });

  test("should handle various hour values correctly", () => {
    const date1 = new Date("2021-01-01T01:10:10");
    const date2 = new Date("2021-01-01T13:10:10");
    const date3 = new Date("2021-01-01T23:10:10");
    expect(formatTimeToHMS(date1)).toBe("01:10:10 AM");
    expect(formatTimeToHMS(date2)).toBe("01:10:10 PM");
    expect(formatTimeToHMS(date3)).toBe("11:10:10 PM");
  });

  test("should handle single digit times correctly", () => {
    const date1 = new Date("2021-01-01T01:01:01");
    const date2 = new Date("2021-01-01T09:09:09");
    expect(formatTimeToHMS(date1)).toBe("01:01:01 AM");
    expect(formatTimeToHMS(date2)).toBe("09:09:09 AM");
  });

  test("should handle times just before a new hour correctly", () => {
    const date1 = new Date("2021-01-01T10:59:59");
    const date2 = new Date("2021-01-01T11:59:59");
    expect(formatTimeToHMS(date1)).toBe("10:59:59 AM");
    expect(formatTimeToHMS(date2)).toBe("11:59:59 AM");
  });

  test("should handle times just before a new minute correctly", () => {
    const date1 = new Date("2021-01-01T10:10:59");
    const date2 = new Date("2021-01-01T11:11:59");
    expect(formatTimeToHMS(date1)).toBe("10:10:59 AM");
    expect(formatTimeToHMS(date2)).toBe("11:11:59 AM");
  });

  test("should handle times just before a new second correctly", () => {
    const date1 = new Date("2021-01-01T10:10:59");
    const date2 = new Date("2021-01-01T11:11:59");
    expect(formatTimeToHMS(date1)).toBe("10:10:59 AM");
    expect(formatTimeToHMS(date2)).toBe("11:11:59 AM");
  });

  test("should handle edge case of 11:59:59 AM correctly", () => {
    const date = new Date("2021-01-01T11:59:59");
    expect(formatTimeToHMS(date)).toBe("11:59:59 AM");
  });

  test("should handle edge case of 11:59:59 PM correctly", () => {
    const date = new Date("2021-01-01T23:59:59");
    expect(formatTimeToHMS(date)).toBe("11:59:59 PM");
  });

  test("should handle leap year date correctly", () => {
    const date = new Date("2020-02-29T10:10:10");
    expect(formatTimeToHMS(date)).toBe("10:10:10 AM");
  });

  test("should handle date with single digit day correctly", () => {
    const date = new Date("2021-01-09T10:10:10");
    expect(formatTimeToHMS(date)).toBe("10:10:10 AM");
  });

  test("should handle date with single digit month correctly", () => {
    const date = new Date("2021-09-01T10:10:10");
    expect(formatTimeToHMS(date)).toBe("10:10:10 AM");
  });

  test("should handle date with double digit day correctly", () => {
    const date = new Date("2021-01-10T10:10:10");
    expect(formatTimeToHMS(date)).toBe("10:10:10 AM");
  });

  test("should handle date with double digit month correctly", () => {
    const date = new Date("2021-10-01T10:10:10");
    expect(formatTimeToHMS(date)).toBe("10:10:10 AM");
  });

  test("should format 24-hour times correctly", () => {
    const date1 = new Date("2021-01-01T13:00:00");
    const date2 = new Date("2021-01-01T14:30:30");
    const date3 = new Date("2021-01-01T15:45:45");
    const date4 = new Date("2021-01-01T16:59:59");
    const date5 = new Date("2021-01-01T23:59:59");
    expect(formatTimeToHMS(date1)).toBe("01:00:00 PM");
    expect(formatTimeToHMS(date2)).toBe("02:30:30 PM");
    expect(formatTimeToHMS(date3)).toBe("03:45:45 PM");
    expect(formatTimeToHMS(date4)).toBe("04:59:59 PM");
    expect(formatTimeToHMS(date5)).toBe("11:59:59 PM");
  });

  test("should format 12-hour times correctly", () => {
    const date1 = new Date("2021-01-01T01:00:00");
    const date2 = new Date("2021-01-01T02:30:30");
    const date3 = new Date("2021-01-01T03:45:45");
    const date4 = new Date("2021-01-01T04:59:59");
    const date5 = new Date("2021-01-01T11:59:59");
    expect(formatTimeToHMS(date1)).toBe("01:00:00 AM");
    expect(formatTimeToHMS(date2)).toBe("02:30:30 AM");
    expect(formatTimeToHMS(date3)).toBe("03:45:45 AM");
    expect(formatTimeToHMS(date4)).toBe("04:59:59 AM");
    expect(formatTimeToHMS(date5)).toBe("11:59:59 AM");
  });

  test("should handle edge case of 12:01:01 PM correctly", () => {
    const date = new Date("2021-01-01T12:01:01");
    expect(formatTimeToHMS(date)).toBe("12:01:01 PM");
  });

  test("should handle edge case of 12:01:01 AM correctly", () => {
    const date = new Date("2021-01-01T00:01:01");
    expect(formatTimeToHMS(date)).toBe("12:01:01 AM");
  });

  test("should handle single digit hour with single digit minute and second correctly", () => {
    const date = new Date("2021-01-01T05:05:05");
    expect(formatTimeToHMS(date)).toBe("05:05:05 AM");
  });

  test("should handle double digit hour with double digit minute and second correctly", () => {
    const date = new Date("2021-01-01T10:10:10");
    expect(formatTimeToHMS(date)).toBe("10:10:10 AM");
  });

  test("should handle edge case of exactly 12 PM", () => {
    const date = new Date("2021-01-01T12:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 PM");
  });

  test("should handle edge case of exactly 12 AM", () => {
    const date = new Date("2021-01-01T00:00:00");
    expect(formatTimeToHMS(date)).toBe("12:00:00 AM");
  });
});
