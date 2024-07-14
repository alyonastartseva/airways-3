import { useEffect, useState } from 'react';

import { useGetSeatCategoriesQuery } from '@/store/services';
import { seatCategory as constSeatCategoriesArr } from '@/constants';

const useSeatCategories = () => {
  const [seatCategories, setSeatCategories] = useState<
    ({ ru: string; eng: string } | undefined)[]
  >(constSeatCategoriesArr);
  const apiSeatCategoriesArr = useGetSeatCategoriesQuery({});

  useEffect(() => {
    if (apiSeatCategoriesArr.data) {
      const newSeatCategoriesArr: ({ ru: string; eng: string } | undefined)[] = apiSeatCategoriesArr.data.content.map(
        (apiSeatCategory: { categoryType: never }) => {
          const fundedCategory = constSeatCategoriesArr.find(
            (constSeatCategory) =>
              constSeatCategory.eng === apiSeatCategory.categoryType
          );
          if (fundedCategory) {
            return fundedCategory;
          } else {
            return {
              eng: apiSeatCategory.categoryType,
              ru: apiSeatCategory.categoryType,
            };
          }
        }
      );
      setSeatCategories(newSeatCategoriesArr);
    }
  }, [apiSeatCategoriesArr]);

  return [seatCategories];
};

export { useSeatCategories };
