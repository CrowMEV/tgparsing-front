export const formatMonetaryValue = (value: number) =>
  value.toLocaleString('ru', {
    useGrouping: false,
    minimumFractionDigits: 2,
  });
