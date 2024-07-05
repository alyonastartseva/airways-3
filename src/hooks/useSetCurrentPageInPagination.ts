import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UseSetCurrentPageInPagination } from '@/interfaces';
import {
  setPageIndex as setPageIndexInStore,
  pageIndexValue,
} from '@/store/slices/pageIndexesSlice';

const useSetCurrentPageInPagination: UseSetCurrentPageInPagination = (key) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initPageIndex = (useSelector(pageIndexValue) as never)[key] || 1;
  const [pageIndex, setPageIndex] = useState<number>(initPageIndex);

  const setPaginationData = (pageNumber: number | undefined) => {
    const savePage = Math.max(
      pageNumber || +(searchParams.get('page') as never) || pageIndex,
      1
    );
    setPageIndex(savePage);
    dispatch(setPageIndexInStore({ [key]: savePage }));
    setSearchParams({ page: String(savePage) });
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
