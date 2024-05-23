import { seatCategory } from '@constants/constants';

const SeatCategory = () =>
  seatCategory.map((value) => (
    <option key={value.eng} value={value.eng}>
      {value.ru}
    </option>
  ));

export default SeatCategory;
