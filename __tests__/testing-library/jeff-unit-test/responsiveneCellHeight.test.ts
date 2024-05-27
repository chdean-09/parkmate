import { getCellHeightForBreakpoint } from "@/utils/responsiveCellHeight";

describe("getCellHeightForBreakpoint", () => {
  test.each([
    [499.5, 70],
    [499.99, 70],
    [500.01, 100],
    [699.5, 100],
    [699.99, 100],
    [700.01, 140],
    [849.5, 140],
    [849.99, 140],
    [850.01, 180],
    [1099.5, 180],
    [1099.99, 180],
    [1100.01, 220],
  ])(
    "returns correct values for window widths around breakpoints (testing with %p)",
    (input, expected) => {
      expect(getCellHeightForBreakpoint(input)).toBe(expected);
    },
  );

  test.each([
    [10000, 220],
    [100000, 220],
    [1e6, 220],
    [1e7, 220],
    [1e8, 220],
    [1e9, 220],
  ])(
    "handles extremely high window widths (testing with %p)",
    (input, expected) => {
      expect(getCellHeightForBreakpoint(input)).toBe(expected);
    },
  );

  test.each([
    [-100, 70],
    [-1000, 70],
    [-10000, 70],
    [-1e6, 70],
    [-1e7, 70],
    [-1e8, 70],
    [-1e9, 70],
  ])("handles negative window widths (testing with %p)", (input, expected) => {
    expect(getCellHeightForBreakpoint(input)).toBe(expected);
  });

  test.each([
    [500.00000001, 100],
    [699.99999999, 100],
    [700.00000001, 140],
    [849.99999999, 140],
    [850.00000001, 180],
    [1099.99999999, 180],
    [1100.00000001, 220],
  ])(
    "handles floating-point precision around breakpoints (testing with %p)",
    (input, expected) => {
      expect(getCellHeightForBreakpoint(input)).toBe(expected);
    },
  );

  test.each([
    [-Math.random() * 500, 70],
    [-500 - Math.random() * 500, 70],
    [-1000 - Math.random() * 1000, 70],
  ])(
    "returns 70 for random negative inputs (testing with %p)",
    (input, expected) => {
      expect(getCellHeightForBreakpoint(input)).toBe(expected);
    },
  );

  test("verifies consistency over multiple calls", () => {
    const width1 = 550;
    const width2 = 800;
    const width3 = 1000;
    const result1 = getCellHeightForBreakpoint(width1);
    const result2 = getCellHeightForBreakpoint(width2);
    const result3 = getCellHeightForBreakpoint(width3);
    expect(result1).toBe(100);
    expect(result2).toBe(140);
    expect(result3).toBe(180);
    expect(result1).toBe(getCellHeightForBreakpoint(width1));
    expect(result2).toBe(getCellHeightForBreakpoint(width2));
    expect(result3).toBe(getCellHeightForBreakpoint(width3));
  });

  // Special cases potentially overlooked
  test("verifies zero and one-off calculations", () => {
    expect(getCellHeightForBreakpoint(0)).toBe(70); // Test exactly at 0
    expect(getCellHeightForBreakpoint(1)).toBe(70); // Test close to 0
  });
});
