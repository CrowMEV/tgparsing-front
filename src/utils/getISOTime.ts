export const getISOTime = (date: Date) => {
  const timezone = -date.getTimezoneOffset(),
    dif = timezone >= 0 ? '+' : '-',
    pad = (num: number) => {
      return (num < 10 ? '0' : '') + num;
    };

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(timezone) / 60)) +
    ':' +
    pad(Math.abs(timezone) % 60)
  );
};
