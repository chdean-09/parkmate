export default async function groupTransactionFormatter(transactions: TransactionProps[]) {
  const groupedData = transactions.reduce<Record<string, Record<string, TransactionProps[]>>>(
    (acc, transaction) => {
      const dateObj = new Date(transaction.createdAt);
      const year = dateObj.getFullYear().toString();
      const months: string[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = months[dateObj.getMonth()];
      const day = dateObj.getDate();
      const formattedDate = `${month} ${day}`;

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][formattedDate]) {
        acc[year][formattedDate] = [];
      }

      acc[year][formattedDate].push({
        id: transaction.id,
        createdAt: transaction.createdAt,
        name: transaction.name,
        amount: transaction.amount,
        slotId: transaction.slotId,
        userId: transaction.userId,
      });

      return acc;
    },
    {}
  );

  return groupedData
}
