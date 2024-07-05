import { useState } from 'react';

import { UseSetCurrentPageInPagination } from '@/interfaces';

import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageIndex as setPageIndexInStore, setPageIndex } from '@/store/slices/pageIndexesSlice';
import { pageIndexValue } from '@/store/slices/pageIndexesSlice';

const useSetCurrentPageInPagination: UseSetCurrentPageInPagination = (
  key,
  initialPage
) => {
  // const [pageIndex, setPageIndex] = useState<number>(Math.max(initialPage, 0));

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initPageIndex = initialPage || (useSelector(pageIndexValue) as any)[key] || 1
  const [pageIndex, setPageIndex] = useState<number>(initPageIndex);

  const setPaginationData = (pageNumber: number | undefined) => {
    const savePage= Math.max(pageNumber || + (searchParams.get('page') as any) || pageIndex, 1);
    setPageIndex(savePage);
    dispatch(setPageIndexInStore({ [key]: savePage }));
    setSearchParams({ page: String(savePage) });
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
