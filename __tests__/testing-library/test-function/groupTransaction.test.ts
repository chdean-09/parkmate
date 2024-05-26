import groupTransactionFormatter from "@/utils/groupedTransactionFormatter";
import { Transaction } from "@prisma/client";

const mockTransactions = [
  {
    id: 2,
    createdAt: "2024-05-26T07:54:28.628Z",
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 3,
    createdAt: "2024-05-26T07:54:37.144Z",
    name: "Cash In",
    amount: 17,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 4,
    createdAt: "2024-05-26T07:55:28.616Z",
    name: "Slot reservation at ENGI",
    amount: -10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 5,
    createdAt: "2024-05-26T10:30:50.583Z",
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 6,
    createdAt: "2024-05-26T10:31:41.620Z",
    name: "Cash In",
    amount: 100,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 7,
    createdAt: "2024-05-26T10:31:49.180Z",
    name: "Cash In",
    amount: 10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 8,
    createdAt: "2024-05-26T10:31:59.851Z",
    name: "Cash In",
    amount: 10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 9,
    createdAt: "2024-05-26T10:32:35.808Z",
    name: "Cash In",
    amount: 10,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
  {
    id: 10,
    createdAt: "2024-05-26T10:32:48.266Z",
    name: "Cash In",
    amount: 17,
    slotId: null,
    userId: "n7yu3d6dmhuz5uoz",
  },
];

const transactionsWithDateObjects = mockTransactions.map((transaction) => ({
  ...transaction,
  createdAt: new Date(transaction.createdAt),
}));

describe("groupTransactionFormatter", () => {
  it("format transactions into grouped transactions by year and month-day", () => {
    const formattedTransactions = groupTransactionFormatter(
      transactionsWithDateObjects
    );

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

  it("check if the transactions are sorted by date", () => {
    const formattedTransactions = groupTransactionFormatter(
      transactionsWithDateObjects
    );

    const may26Transactions = formattedTransactions["2024"]["May 26"];
    const sortedTransactions = may26Transactions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    expect(may26Transactions).toEqual(sortedTransactions);
  })

  it("check if a specific object has correct transaction value", () => {
    const formattedTransactions = groupTransactionFormatter(
      transactionsWithDateObjects
    );

    const may26Transactions = formattedTransactions["2024"]["May 26"];
    expect(may26Transactions).toHaveLength(9);
    expect(may26Transactions[0].amount).toBe(100);

    
  })

  it("check if the info per transactions is correct", () => {
    const formattedTransactions = groupTransactionFormatter(transactionsWithDateObjects);
    const may26Transactions = formattedTransactions["2024"]["May 26"];
    expect(may26Transactions).toHaveLength(9);
    expect(may26Transactions[0].amount).toBe(100);
    expect(may26Transactions[0].name).toBe("Cash In");
    expect(may26Transactions[0].slotId).toBeNull();
    expect(may26Transactions[0].userId).toBe("n7yu3d6dmhuz5uoz");
  })

  it("handle empty transactions array", () => {
    const formattedTransactions = groupTransactionFormatter([]);
    expect(formattedTransactions).toEqual({});
  });

  it("handle transactions with the same date but different times", () => {
    const transactionsWithSameDates = [
      ...transactionsWithDateObjects,
      { id: 11, createdAt: new Date("2024-05-26T11:00:00.000Z"), name: "Cash In", amount: 50, slotId: null, userId: "n7yu3d6dmhuz5uoz" },
      { id: 12, createdAt: new Date("2024-05-26T12:00:00.000Z"), name: "Cash In", amount: 60, slotId: null, userId: "n7yu3d6dmhuz5uoz" }
    ];
    const formattedTransactions = groupTransactionFormatter(transactionsWithSameDates);
    expect(formattedTransactions["2024"]["May 26"]).toHaveLength(11);
    expect(formattedTransactions["2024"]["May 26"][9].createdAt).toBeInstanceOf(Date);
    expect(formattedTransactions["2024"]["May 26"][9].userId).toBe("n7yu3d6dmhuz5uoz");
    expect(formattedTransactions["2024"]["May 26"][10].amount).toBe(60);
  });
});
