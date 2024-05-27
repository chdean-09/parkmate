import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";

describe("convertToPhPesoFormat", () => {
  it("should correctly format positive values", () => {
    expect(convertToPhPesoFormat(100)).toBe("₱100.00");
    expect(convertToPhPesoFormat(1000)).toBe("₱1,000.00");
    expect(convertToPhPesoFormat(1234567.89)).toBe("₱1,234,567.89");
  });

  it("should correctly format negative values", () => {
    expect(convertToPhPesoFormat(-100)).toBe("-₱100.00");
    expect(convertToPhPesoFormat(-1000)).toBe("-₱1,000.00");
    expect(convertToPhPesoFormat(-1234567.89)).toBe("-₱1,234,567.89");
  });

  it("should correctly format zero", () => {
    expect(convertToPhPesoFormat(0)).toBe("₱0.00");
  });

  it("should handle NaN gracefully", () => {
    expect(convertToPhPesoFormat(NaN)).toBe("₱NaN");
  });

  it("should handle Infinity gracefully", () => {
    expect(convertToPhPesoFormat(Infinity)).toBe("₱∞");
  });

  it("should handle negative Infinity gracefully", () => {
    expect(convertToPhPesoFormat(-Infinity)).toBe("-₱∞");
  });

  it("should handle large numbers", () => {
    expect(convertToPhPesoFormat(1e15)).toBe("₱1,000,000,000,000,000.00");
    expect(convertToPhPesoFormat(-1e15)).toBe("-₱1,000,000,000,000,000.00");
  });

  it("should handle fractional values", () => {
    expect(convertToPhPesoFormat(1234.567)).toBe("₱1,234.57");
    expect(convertToPhPesoFormat(-9876.54321)).toBe("-₱9,876.54");
  });

  it("should handle values with many decimal places", () => {
    expect(convertToPhPesoFormat(0.123456789)).toBe("₱0.12");
    expect(convertToPhPesoFormat(-0.987654321)).toBe("-₱0.99");
  });

  it("should handle values with trailing zeros", () => {
    expect(convertToPhPesoFormat(123.4)).toBe("₱123.40");
    expect(convertToPhPesoFormat(-456.0)).toBe("-₱456.00");
  });
});
