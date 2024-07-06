import { useEffect, useState } from 'react';
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

  const storedPageIndex = (useSelector(pageIndexValue) as never)[key] || 1;
  const [pageIndex, setPageIndex] = useState<number>(storedPageIndex);

  useEffect(() => {
    const urlPageIndex = +(searchParams.get('page') as never);
    const safePageIndex = Math.max(urlPageIndex || pageIndex, 1);

    setPageIndex(safePageIndex);
    dispatch(setPageIndexInStore({ [key]: safePageIndex }));
    setSearchParams({ page: String(safePageIndex) });
  }, [dispatch, key, pageIndex, searchParams, setSearchParams]);

  const setPaginationData = (pageNumber: number) => {
    setPageIndex(pageNumber);
    dispatch(setPageIndexInStore({ [key]: pageNumber }));
    setSearchParams({ page: String(pageNumber) });
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
