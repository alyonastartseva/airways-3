import { useSeatCategories } from '@/hooks';

const SeatCategory = () => {
  const [seatCategories] = useSeatCategories();

  return seatCategories?.map((value) => (
    <option key={value?.id} value={value?.categoryType}>
      {value?.categoryType}
    </option>
  ));
};

export default SeatCategory;
