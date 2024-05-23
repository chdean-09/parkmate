import React from "react";
import Transaction from "./transactions";
import prisma from "@/lib/db";
import groupTransactionFormatter from "@/utils/groupedTransactionFormatter";

export default async function TransactionHistory({ owner }: UserProps) {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: owner.id,
    },
  });

  const groupedTransactions = await groupTransactionFormatter(transactions);

  if (!transactions || transactions.length === 0) {
    return <h3>No Transaction History</h3>;
  } else {
    return (
      <div className="p-5">
        {(Object.entries(groupedTransactions) as [string, Record<string, TransactionProps[]>][]).map(([year, dates]) => (
          <div key={year} className="mb-8">
            <h1 className="text-2xl font-bold mb-4">{year}</h1>
            {(Object.entries(dates) as [string, TransactionProps[]][]).map(([date, transactions]) => (
              transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((transaction) => (
                <Transaction
                  key={transaction.id}
                  id={transaction.id}
                  createdAt={transaction.createdAt}
                  name={transaction.name}
                  amount={transaction.amount}
                  slotId={transaction.slotId}
                  userId={transaction.userId}
                />
              ))
            ))}
          </div>
        ))}
      </div>
    );
  }
}