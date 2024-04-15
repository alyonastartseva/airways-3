export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const pluralize = (
  num: number,
  words: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  ];
};
