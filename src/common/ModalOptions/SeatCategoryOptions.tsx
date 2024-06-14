import { seatCategory } from '@/constants';

export const SeatCategoryOptions = () =>
  seatCategory.map((el) => (
    <option key={el.eng} value={el.eng}>
      {el.ru}
    </option>
  ));
// litle problems заглушки на случай ошибки
