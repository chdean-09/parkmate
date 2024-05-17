export const formatDate = (dateMs: number) => {
  const date = new Date(dateMs);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
  });
  return formatter.format(date);
};
