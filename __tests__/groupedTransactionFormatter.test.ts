import groupTransactionFormatter from "@/utils/groupedTransactionFormatter";

// type TransactionProps = {
//     id: number;
//     createdAt: Date;
//     name: string;
//     amount: number;
//     slotId: number | null;
//     userId: string;
// };

// const transactions: TransactionProps[] = [
//     { id: 1, createdAt: new Date('2023-01-01T12:00:00Z'), name: 'Transaction 1', amount: 100, slotId: null, userId: 'u1' },
//     { id: 2, createdAt: new Date('2023-01-02T12:00:00Z'), name: 'Transaction 2', amount: 200, slotId: null, userId: 'u2' },
// ];

describe("groupTransactionFormatter", () => {
  const generateTransactions = (count: number, startDate: string) => {
    const transactions: TransactionProps[] = [];
    for (let i = 0; i < count; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      transactions.push({
        id: i + 1,
        createdAt: date.toISOString(),
        name: `Transaction ${i + 1}`,
        amount: (i + 1) * 100,
        slotId: `${i + 1}`,
        userId: `u${i + 1}`,
      });
    }
    return transactions;
  };

  it("should group transactions by year, month, and day correctly", async () => {
    const transactions = generateTransactions(10, "2023-01-01T12:00:00Z");
    const grouped = await groupTransactionFormatter(transactions);
    expect(Object.keys(grouped)).toEqual(["2023"]);
    for (let i = 0; i < 10; i++) {
      const date = new Date("2023-01-01T12:00:00Z");
      date.setDate(date.getDate() + i);
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      const key = `${month} ${day}`;
      expect(grouped["2023"][key]).toHaveLength(1);
    }
  });

  it("should handle an empty array of transactions", async () => {
    const grouped = await groupTransactionFormatter([]);
    expect(grouped).toEqual({});
  });

  it("should handle transactions on boundary days", async () => {
    const transactions = [
      {
        id: 1,
        createdAt: "2022-12-31T23:59:59Z",
        name: "End of Year",
        amount: 100,
        slotId: "s1",
        userId: "u1",
      },
      {
        id: 2,
        createdAt: "2023-01-01T00:00:00Z",
        name: "Start of Year",
        amount: 200,
        slotId: "s2",
        userId: "u2",
      },
      {
        id: 3,
        createdAt: "2023-01-31T11:59:59Z",
        name: "End of Month",
        amount: 300,
        slotId: "s3",
        userId: "u3",
      },
      {
        id: 4,
        createdAt: "2023-02-01T00:00:00Z",
        name: "Start of Month",
        amount: 400,
        slotId: "s4",
        userId: "u4",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
    expect(grouped["2022"]).toBeTruthy();
    expect(grouped["2023"]).toBeTruthy();
    expect(grouped["2022"]["Dec 31"]).toHaveLength(1);
    expect(grouped["2023"]["Jan 1"]).toHaveLength(2);
    expect(grouped["2023"]["Jan 31"]).toHaveLength(1);
    expect(grouped["2023"]["Feb 1"]).toHaveLength(1);
  });

  it("should handle transactions on leap days", async () => {
    const transactions = [
      {
        id: 5,
        createdAt: "2024-02-29T12:00:00Z",
        name: "Leap Day",
        amount: 500,
        slotId: "s5",
        userId: "u5",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
    expect(grouped["2024"]["Feb 29"]).toHaveLength(1);
  });

  it("should group multiple transactions at the same exact time correctly", async () => {
    const transactions = [
      {
        id: 6,
        createdAt: "2023-04-01T09:00:00Z",
        name: "First April Morning",
        amount: 600,
        slotId: "s6",
        userId: "u6",
      },
      {
        id: 7,
        createdAt: "2023-04-01T09:00:00Z",
        name: "Second April Morning",
        amount: 700,
        slotId: "s7",
        userId: "u7",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
    expect(grouped["2023"]["Apr 1"]).toHaveLength(2);
  });

  it("should perform efficiently under high volume", async () => {
    const transactions = generateTransactions(10000, "2023-01-01T00:00:00Z");
    const start = performance.now();
    const grouped = await groupTransactionFormatter(transactions);
    const end = performance.now();
    expect(end - start).toBeLessThan(2000);
    expect(Object.keys(grouped["2023"]).length).toBeGreaterThan(300);
  });

  it("should handle transactions with future dates", async () => {
    const transactions = [
      {
        id: 11,
        createdAt: "2025-01-01T12:00:00Z",
        name: "Future Transaction",
        amount: 1100,
        slotId: "s11",
        userId: "u11",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
  });

  it("should handle transactions with past dates", async () => {
    const transactions = [
      {
        id: 12,
        createdAt: "2021-01-01T12:00:00Z",
        name: "Past Transaction",
        amount: 1200,
        slotId: "s12",
        userId: "u12",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
  });

  it("should handle transactions with the same date but different times", async () => {
    const transactions = [
      {
        id: 13,
        createdAt: "2023-01-01T12:00:00Z",
        name: "Morning Transaction",
        amount: 1300,
        slotId: "s13",
        userId: "u13",
      },
      {
        id: 14,
        createdAt: "2023-01-01T18:00:00Z",
        name: "Evening Transaction",
        amount: 1400,
        slotId: "s14",
        userId: "u14",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
  });

  it("should handle transactions with the same date and time but different users", async () => {
    const transactions = [
      {
        id: 15,
        createdAt: "2023-01-01T12:00:00Z",
        name: "User A Transaction",
        amount: 1500,
        slotId: "s15",
        userId: "u15",
      },
      {
        id: 16,
        createdAt: "2023-01-01T12:00:00Z",
        name: "User B Transaction",
        amount: 1600,
        slotId: "s16",
        userId: "u16",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
  });

  it("should handle transactions with the same date, time, and user but different slot IDs", async () => {
    const transactions = [
      {
        id: 17,
        createdAt: "2023-01-01T12:00:00Z",
        name: "Slot A Transaction",
        amount: 1700,
        slotId: "s17",
        userId: "u17",
      },
      {
        id: 18,
        createdAt: "2023-01-01T12:00:00Z",
        name: "Slot B Transaction",
        amount: 1800,
        slotId: "s18",
        userId: "u17",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
  });

  it("should handle transactions with various combinations of dates, times, users, and slot IDs", async () => {
    const transactions = [
      {
        id: 19,
        createdAt: "2023-01-01T12:00:00Z",
        name: "Combination 1",
        amount: 1900,
        slotId: "s19",
        userId: "u19",
      },
      {
        id: 20,
        createdAt: "2023-01-02T18:00:00Z",
        name: "Combination 2",
        amount: 2000,
        slotId: "s20",
        userId: "u20",
      },
      {
        id: 21,
        createdAt: "2023-01-03T12:00:00Z",
        name: "Combination 3",
        amount: 2100,
        slotId: "s21",
        userId: "u21",
      },
      {
        id: 22,
        createdAt: "2023-01-01T18:00:00Z",
        name: "Combination 4",
        amount: 2200,
        slotId: "s19",
        userId: "u19",
      },
      {
        id: 23,
        createdAt: "2023-01-02T12:00:00Z",
        name: "Combination 5",
        amount: 2300,
        slotId: "s20",
        userId: "u20",
      },
      {
        id: 24,
        createdAt: "2023-01-01T12:00:00Z",
        name: "Combination 6",
        amount: 2400,
        slotId: "s21",
        userId: "u21",
      },
    ];
    const grouped = await groupTransactionFormatter(transactions);
  });
});
