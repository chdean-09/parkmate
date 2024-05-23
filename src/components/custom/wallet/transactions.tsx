import React from "react";
import { convertToPhPesoFormat } from "@/utils/convertToPhPesoFormat";
import { formatTimeToHMS } from "@/utils/timeFormatter";

async function Transaction({
  name,
  amount,
  createdAt,
  slotId,
  userId,
}: TransactionProps) {
  const formattedAmount = convertToPhPesoFormat(amount);
  const isIncomeTransaction = amount >= 0;
  const color = isIncomeTransaction ? "text-green-500" : "text-red-500";
  const icon = isIncomeTransaction ? <span>+</span> : <span>-</span>;

  return (
    <div className="flex justify-between items-center py-1">
      <div className="w-1/3 text-left text-wrap ">
        <p className="font-semibold truncate ">{name}</p>
      </div>
      <div className="w-1/3 text-center truncate">{formatTimeToHMS(createdAt)}</div>
      <div className={`${color} w-1/3 font-semibold text-right`}>
        {icon}
        <span>{formattedAmount.slice(1)}</span>
      </div>
    </div>
  );
}

export default Transaction;
