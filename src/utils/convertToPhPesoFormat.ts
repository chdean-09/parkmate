export function convertToPhPesoFormat(value: number) {
  if (isNaN(value)) {
    return "₱0.00";
  }
  let balanceInPesos = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return balanceInPesos.format(value);
}
