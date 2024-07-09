import { useEffect, useState } from 'react';

import { useGetSeatCategoriesQuery } from '@/store/services';
import { seatCategory as constSeatCategoriesArr } from '@/constants';

const useSeatCategories = () => {
  const [seatCategories, setSeatCategories] = useState<
    ({ ru: string; eng: string } | undefined)[]
  >(constSeatCategoriesArr);
  const apiSeatCategoriesArr = useGetSeatCategoriesQuery({});

  useEffect(() => {
    // иф делает вещи, если категории получены:
    if (apiSeatCategoriesArr.data) {
      const newSeatCategoriesArr: ({ ru: string; eng: string } | undefined)[] =
        [];
      // идём по каждому из полученных категорий:
      apiSeatCategoriesArr.data.content.forEach(
        (apiSeatCategory: { categoryType: never }) => {
          // ищем в переводчике категорию и пушим её в результат, если не нашли - пушим название с сервера:
          const fundedCategory = constSeatCategoriesArr.find(
            (constSeatCategory) =>
              constSeatCategory.eng === apiSeatCategory.categoryType
          );
          if (fundedCategory) {
            newSeatCategoriesArr.push(fundedCategory);
          } else {
            newSeatCategoriesArr.push({
              eng: apiSeatCategory.categoryType,
              ru: apiSeatCategory.categoryType,
            });
          }
        }
      );
      // ставим выходной результат, после чего использующий это компонент обновится:
      setSeatCategories(newSeatCategoriesArr);
    }
  }, [apiSeatCategoriesArr]);

  return [seatCategories];
};

export { useSeatCategories };
