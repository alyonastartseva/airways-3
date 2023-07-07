const filterPages = (visiblePages: number[], totalPages: number) =>
  visiblePages.filter((page: number) => page <= totalPages);

export const getVisiblePages = (page: number, total: number) => {
  if (total == 2) return [1, 2];
  if (total < 5) {
    return filterPages([1, 2, 3, 4], total);
  }
  if (page % 5 >= 0 && page > 4 && page + 2 < total) {
    return [1, page - 1, page, page + 1];
  }
  if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
    return [1, total - 3, total - 2, total - 1, total];
  }
  return [1, 2, 3, 4, 5];
};
