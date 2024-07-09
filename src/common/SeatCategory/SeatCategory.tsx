import { useSeatCategories } from '@/hooks';
import { seatCategory } from '@/constants';

const SeatCategory = () =>{
  const [seatCategories] =
    useSeatCategories();

  const seatCategoryOptions = seatCategory.map((el) => (
    <option key={el.eng} value={el.eng}>
      {el.ru}
    </option>
  ));

  return seatCategories.map((value: any) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));
}

export default SeatCategory;
