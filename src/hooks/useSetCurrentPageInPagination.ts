import { useState } from 'react';

import { UseSetCurrentPageInPagination } from '@/interfaces';

const useSetCurrentPageInPagination: UseSetCurrentPageInPagination = (key) => {
  const [pageIndex, setPageIndex] = useState<number>(1);

  const setPaginationData = (pageNumber: number) => {
    setPageIndex(pageNumber);
    localStorage.setItem(key, String(pageNumber));
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
