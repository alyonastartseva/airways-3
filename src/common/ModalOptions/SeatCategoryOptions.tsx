import { useSeatCategories } from '@/hooks';

export const SeatCategoryOptions = () =>{
  const [seatCategories] =
    useSeatCategories();

  return seatCategories.map((value: any) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));
}