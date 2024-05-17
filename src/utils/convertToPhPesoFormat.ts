export function convertToPhPesoFormat(value: number) {
  let balanceInPesos = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return balanceInPesos.format(value);
}
