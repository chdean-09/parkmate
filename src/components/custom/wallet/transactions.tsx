import React from "react";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";

interface TransactionProps {
  title: string;
  amount: number;
  type: "CashIn" | "Pay";
}

async function Transaction({ title, amount, type }: TransactionProps) {
  const formattedAmount = convertToPhPesoFormat(amount);
  const isIncomeTransaction = amount >= 0;
  const color = isIncomeTransaction ? "text-green-500" : "text-red-500";
  const icon = isIncomeTransaction ? <span>+</span> : <span>-</span>;

  return (
    <div className="flex justify-between items-center py-1">
      <div>
        <p className="font-semibold">{title}</p>
      </div>
      <div className={`${color} font-semibold flex items-center`}>
        {icon}
        <span>{formattedAmount.slice(1)}</span>
      </div>
    </div>
  );
}

export default Transaction;
