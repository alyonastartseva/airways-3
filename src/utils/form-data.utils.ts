const days = Array.from({ length: 31 }, (_, i) => i);
const months = Array.from({ length: 12 }, (_, i) => i);

const years = Array.from(
  { length: 71 },
  (_, i) => new Date().getFullYear() - i
);

export { months, years, days };
