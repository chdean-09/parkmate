import groupTransactionFormatter from "@/utils/groupedTransactionFormatter";
import { Transaction } from "@prisma/client";

const mockTransactions = [
  {
    id: 11,
    createdAt: new Date("2024-05-27T08:16:52.102Z"),
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 10,
    createdAt: new Date("2024-05-26T10:32:48.266Z"),
    name: "Cash In",
    amount: 17,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 9,
    createdAt: new Date("2024-05-26T10:32:35.808Z"),
    name: "Cash In",
    amount: 10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 8,
    createdAt: new Date("2024-05-26T10:31:59.851Z"),
    name: "Cash In",
    amount: 10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 7,
    createdAt: new Date("2024-05-26T10:31:49.180Z"),
    name: "Cash In",
    amount: 10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 6,
    createdAt: new Date("2024-05-26T10:31:41.620Z"),
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 5,
    createdAt: new Date("2024-05-26T10:30:50.583Z"),
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 4,
    createdAt: new Date("2024-05-26T07:55:28.616Z"),
    name: "Slot reservation at ENGI",
    amount: -10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 3,
    createdAt: new Date("2024-05-26T07:54:37.144Z"),
    name: "Cash In",
    amount: 17,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 2,
    createdAt: new Date("2024-05-26T07:54:28.628Z"),
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
];

describe("groupTransactionFormatter", () => {
  it("formats transactions into grouped transactions by year and month-day", () => {
    const formattedTransactions = groupTransactionFormatter(mockTransactions);

    expect(formattedTransactions).toHaveProperty("2024");
    expect(formattedTransactions["2024"]).toHaveProperty("May 26");
    expect(formattedTransactions["2024"]["May 26"]).toHaveLength(9);
    expect(formattedTransactions["2024"]["May 26"][0].createdAt).toBeInstanceOf(
      Date
    );
    expect(formattedTransactions["2024"]["May 26"][1].createdAt).toBeInstanceOf(
      Date
    );
  });

  it("checks if the transactions are sorted by date", () => {
    const formattedTransactions = groupTransactionFormatter(mockTransactions);

    const may26Transactions = formattedTransactions["2024"]["May 26"];
    const sortedTransactions = [...may26Transactions].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    expect(may26Transactions).toEqual(sortedTransactions);
  });

  it("checks if a specific object has correct transaction value", () => {
    const formattedTransactions = groupTransactionFormatter(mockTransactions);

    const may26Transactions = formattedTransactions["2024"]["May 26"];
    expect(may26Transactions).toHaveLength(9);
    expect(may26Transactions[1].amount).toBe(10);
  });

  it("checks if the info per transaction is correct", () => {
    const formattedTransactions = groupTransactionFormatter(mockTransactions);
    const may26Transactions = formattedTransactions["2024"]["May 26"];
    expect(may26Transactions).toHaveLength(9);
    expect(may26Transactions[0].amount).toBe(17);
    expect(may26Transactions[0].name).toBe("Cash In");
    expect(may26Transactions[0].slotId).toBeNull();
    expect(may26Transactions[0].userId).toBe("n7yu3d6dmhuz5uoz");
  });

  it("handles empty transactions array", () => {
    const formattedTransactions = groupTransactionFormatter([]);
    expect(formattedTransactions).toEqual({});
  });

  it("handles transactions with the same date but different times", () => {
    const transactionsWithSameDates = [
      ...mockTransactions,
      {
        id: 12,
        createdAt: new Date("2024-05-26T11:00:00.000Z"),
        name: "Cash In",
        amount: 50,
        slotId: null,
        userId: "n7yu3d6dmhuz5uoz",
      },
      {
        id: 13,
        createdAt: new Date("2024-05-26T12:00:00.000Z"),
        name: "Cash In",
        amount: 60,
        slotId: null,
        userId: "n7yu3d6dmhuz5uoz",
      },
    ];
    const formattedTransactions = groupTransactionFormatter(
      transactionsWithSameDates
    );
    expect(formattedTransactions["2024"]["May 26"]).toHaveLength(11);
    expect(formattedTransactions["2024"]["May 26"][9].createdAt).toBeInstanceOf(
      Date
    );
    expect(formattedTransactions["2024"]["May 26"][9].userId).toBe(
      "n7yu3d6dmhuz5uoz"
    );
    expect(formattedTransactions["2024"]["May 26"][10].amount).toBe(60);
  });

  it("handles transactions from different years", () => {
    const transactionsFromDifferentYears = [
      ...mockTransactions,
      {
        id: 14,
        createdAt: new Date("2023-12-31T23:59:59.999Z"),
        name: "Year End Cash In",
        amount: 100,
        slotId: null,
        userId: "n7yu3d6dmhuz5uoz",
      },
      {
        id: 15,
        createdAt: new Date("2025-01-01T00:00:00.000Z"),
        name: "New Year Cash In",
        amount: 200,
        slotId: null,
        userId: "n7yu3d6dmhuz5uoz",
      },
    ];
    const formattedTransactions = groupTransactionFormatter(
      transactionsFromDifferentYears
    );
    expect(formattedTransactions).toHaveProperty("2024");
    expect(formattedTransactions).toHaveProperty("2025");
  });

  it("handles transactions on non-consecutive dates", () => {
    const transactionsOnNonConsecutiveDates = [
      ...mockTransactions,
      {
        id: 16,
        createdAt: new Date("2024-05-24T10:30:00.000Z"),
        name: "Non-consecutive Date Cash In",
        amount: 50,
        slotId: null,
        userId: "n7yu3d6dmhuz5uoz",
      },
      {
        id: 17,
        createdAt: new Date("2024-05-25T12:45:00.000Z"),
        name: "Non-consecutive Date Cash In",
        amount: 75,
        slotId: null,
        userId: "n7yu3d6dmhuz5uoz",
      },
    ];
    const formattedTransactions = groupTransactionFormatter(
      transactionsOnNonConsecutiveDates
    );
    expect(formattedTransactions["2024"]).toHaveProperty("May 24");
    expect(formattedTransactions["2024"]).toHaveProperty("May 25");
    expect(formattedTransactions["2024"]["May 24"]).toHaveLength(1);
    expect(formattedTransactions["2024"]["May 25"]).toHaveLength(1);
  });
});
