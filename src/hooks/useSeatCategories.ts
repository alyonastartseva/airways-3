import { useEffect, useState } from 'react';

import { useGetSeatCategoriesQuery } from '@/store/services';

const useSeatCategories = () => {
  const [seatCategories, setSeatCategories] = useState<
    { id: number; categoryType: string }[]
  >([]);
  const apiSeatCategoriesArr = useGetSeatCategoriesQuery({});

  useEffect(() => {
    if (apiSeatCategoriesArr.data) {
      setSeatCategories(apiSeatCategoriesArr.data.content);
    }
  }, [apiSeatCategoriesArr]);

  return [seatCategories];
};

export { useSeatCategories };
