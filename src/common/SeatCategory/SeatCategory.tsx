import { useSeatCategories } from '@/hooks';

const SeatCategory = () => {
  const [seatCategories] = useSeatCategories();

  return seatCategories?.map((value) => (
    <option key={value?.eng} value={value?.eng}>
      {value?.ru}
    </option>
  ));
};

export default SeatCategory;
