import { useEffect, useState } from 'react';

import { useGetSeatCategoriesQuery } from '@/store/services';
import { seatCategory as constSeatCategoriesArr } from '@/constants';

const useSeatCategories = () => {
  const [seatCategories, setSeatCategories] = useState([[constSeatCategoriesArr[0].ru]] ?? '');
  const apiSeatCategoriesArr=useGetSeatCategoriesQuery({})

  useEffect(() => {
    if (apiSeatCategoriesArr.data){
      const newSeatCategoriesArr: any[]=[]
      apiSeatCategoriesArr.data.content.forEach((apiSeatCategory: { categoryType: any; })=>{
        constSeatCategoriesArr.find(constSeatCategory=>{
          if (constSeatCategory.eng===apiSeatCategory.categoryType){
            newSeatCategoriesArr.push(constSeatCategory.ru)
          }
        })
      })
      setSeatCategories(newSeatCategoriesArr)
    }
  }, [apiSeatCategoriesArr]);

  return [seatCategories];
};

export { useSeatCategories };
