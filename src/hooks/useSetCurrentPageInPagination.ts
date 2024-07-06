import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { UseSetCurrentPageInPagination } from '@/interfaces';
import { setPageIndex as setPageIndexInStore, pageIndexValue } from '@/store/slices/pageIndexesSlice';


const useSetCurrentPageInPagination: UseSetCurrentPageInPagination = (
  key,
) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const savedPageIndex = +(useSelector(pageIndexValue) as never)[key] || (searchParams.get('page') as never);
  const initPageIndex= isNaN(savedPageIndex) ? 1 : Math.max(savedPageIndex, 1);
  const [pageIndex, setPageIndex] = useState<number>(initPageIndex);

  // при первом запуске:
  // открыли по ссылке page=2 - запишет в стор
  // вернулись на страницу где уже лазали по page=2 - запишет в адресную строку
  // открыли страницу с нуля - добавит page=1 к адресу и запишет в стор
  // выглядит маленьким, но тут много импортов, поэтому всё в хуке, чтобы не засорять компоненты
  useEffect(() => {
    dispatch(setPageIndexInStore({ [key]: pageIndex }));
    setSearchParams({ page: String(pageIndex) });
  }, [dispatch, key, pageIndex, setSearchParams]);

  const setPaginationData = (pageNumber: number) => {
    setPageIndex(pageNumber);
    dispatch(setPageIndexInStore({ [key]: pageNumber }));
    setSearchParams({ page: String(pageNumber) });
  };

  return [pageIndex, setPaginationData];
};

export { useSetCurrentPageInPagination };
