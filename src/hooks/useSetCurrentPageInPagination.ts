import { useState } from 'react';

import { UseSetCurrentPageInPagination } from '@interfaces/pagination.interfaces';

const useSetCurrentPageInPagination: UseSetCurrentPageInPagination = (key) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const setPaginationData = (pageNumber: number) => {
    setPageIndex(pageNumber);
    localStorage.setItem(key, String(pageNumber));
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
