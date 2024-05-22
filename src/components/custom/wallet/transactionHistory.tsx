import { fetchDataMap } from "@/lib/mapData";
import React from "react";
import Transaction from "./transactions";
import { formatDate } from "@/utils/formatDate";

interface TransactionProps {
  id: number;
  dateMs: number;
  title: string;
  amount: number;
  type: "CashIn" | "Pay";
}

const transactions: TransactionProps[] = [
  {
    id: 1,
    dateMs: 1685205600000,
    title: "Fly Airways",
    amount: 10.34,
    type: "CashIn",
  },
  {
    id: 2,
    dateMs: 1685292000000,
    title: "Uber",
    amount: 21.06,
    type: "Pay",
  },
  {
    id: 3,
    dateMs: 1685119200000,
    title: "Tech Invest",
    amount: -18750.0,
    type: "Pay",
  },
  {
    id: 4,
    dateMs: 1685119200000,
    title: "Clean Energy",
    amount: -147.0,
    type: "Pay",
  },
  {
    id: 5,
    dateMs: 1715962577371,
    title: "Parking Space",
    amount: -147.0,
    type: "Pay",
  },
  {
    id: 6,
    dateMs: 1715962577371,
    title: "Parking Space",
    amount: -147.0,
    type: "Pay",
  },
  {
    id: 7,
    dateMs: 1715962577371,
    title: "Parking Space",
    amount: -147.0,
    type: "Pay",
  },
  {
    id: 8,
    dateMs: 1715962577371,
    title: "Parking Space",
    amount: -147.0,
    type: "Pay",
  },
];

const groupedTransactions = transactions.reduce<
  Record<string, TransactionProps[]>
>((acc, transaction) => {
  const date = formatDate(transaction.dateMs);
  if (!acc[date]) {
    acc[date] = [];
  }

  acc[date].push(transaction);
  return acc;
}, {});

export default async function TransactionHistory({ owner }: UserProps) {
  const map = await fetchDataMap();

  return (
    <div className="p-5">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{date}</h2>
          {transactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              title={transaction.title}
              amount={transaction.amount}
              type={transaction.type}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
