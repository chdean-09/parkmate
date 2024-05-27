import { Transaction } from "@prisma/client";

type GroupedTransactions = {
  [year: string]: {
    [monthDay: string]: Transaction[];
  };
};

const groupTransactionFormatter = (
  transactions: Transaction[],
): GroupedTransactions => {

  const transactionsWithDateObjects: Transaction[] = transactions.map(
    (transaction: Transaction) => ({
      ...transaction,
      createdAt: new Date(transaction.createdAt),
    })
  );

  return transactionsWithDateObjects.reduce((acc, transaction) => {
    const date = new Date(transaction.createdAt);
    const year = date.getFullYear().toString();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate().toString().padStart(2, "0");
    const monthDay = `${month} ${day}`;

    if (!acc[year]) acc[year] = {};
    if (!acc[year][monthDay]) acc[year][monthDay] = [];

    acc[year][monthDay].push(transaction);

    return acc;
  }, {} as GroupedTransactions);
};

export default groupTransactionFormatter;
