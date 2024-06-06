import { useState } from 'react';

import { UseSetCurrentPageInPagination } from '@/interfaces';

const useSetCurrentPageInPagination: UseSetCurrentPageInPagination = (
  key,
  initialPage = 0
) => {
  const [pageIndex, setPageIndex] = useState<number>(Math.max(initialPage, 0));

  const setPaginationData = (pageNumber: number) => {
    const maxPageNumber = Math.max(pageNumber, 0);
    setPageIndex(maxPageNumber);
    localStorage.setItem(key, String(maxPageNumber));
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
