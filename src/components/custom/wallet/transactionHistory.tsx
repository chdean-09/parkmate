import React from "react";
import TransactionPage from "./transactions";
import { User } from "lucia";
import groupTransactionFormatter from "@/utils/groupedTransactionFormatter";
import { Transaction } from "@prisma/client";
import prisma from "@/lib/db";

type GroupedTransactions = {
  [year: string]: {
    [monthDay: string]: Transaction[];
  };
};

export default async function TransactionHistory({ owner }: { owner?: User }) {
  if (!owner) {
    return <h3>Loading...</h3>;
  }

  console.log(owner.id);

  const transactions: Transaction[] = await prisma.transaction.findMany({
    where: {
      userId: owner.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (transactions.length === 0 || !Array.isArray(transactions)) {
    return <h3>No Transaction History</h3>;
  }

  console.log(transactions);

  if (!transactions.length) {
    return <h3>No Transaction History</h3>;
  }

  console.log(transactions);

  const groupedTransactions: GroupedTransactions =
    groupTransactionFormatter(transactions);

  return (
    <div className="p-5">
      {Object.entries(groupedTransactions).map(([year, monthDays]) => (
        <div key={year} className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{year}</h1>
          {Object.entries(monthDays).map(([monthDay, transactions]) => (
            <div key={monthDay} className="mb-6">
              <h2 className="text-xl font-semibold mb-3">{monthDay}</h2>
              {transactions
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((transaction) => (
                  <TransactionPage
                    key={transaction.id}
                    id={transaction.id}
                    createdAt={transaction.createdAt}
                    name={transaction.name}
                    amount={transaction.amount}
                    slotId={transaction.slotId}
                    userId={transaction.userId}
                  />
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
