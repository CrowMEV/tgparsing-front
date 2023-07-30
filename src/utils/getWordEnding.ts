export const DAY_ENDINGS = ['день', 'дня', 'дней'];
export const PARSER_ENDINGS = ['парсер', 'парсера', 'парсеров'];

export const getWordEnding = (count: number, endings: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return endings[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ];
};
