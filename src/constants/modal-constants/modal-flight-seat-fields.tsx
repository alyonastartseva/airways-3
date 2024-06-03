import { FormInputProps } from '@/common/ModalElements/ModalInput';
import { seatCategory } from '@/constants';
import {
  IFSForm,
  IFSpostField,
  IFSpostField as IFlightSeatPost,
} from '@/interfaces/flightsSeats.interfaces';

const seatCategoryOptions = seatCategory.map((el) => (
  <option key={el.eng} value={el.eng}>
    {el.ru}
  </option>
));

export const modalFlightSeatFields: FormInputProps<IFSForm>[] = [
  {
    fieldName: 'flightId',
    typeInput: 'text',
    label: 'ID Рейса',
    rules: {},
  },
  {
    fieldName: 'seat.seatNumber',
    typeInput: 'text',
    label: 'Номер сиденья',
    rules: {
      required: 'Введите номер сиденья',
      minLength: {
        value: 2,
        message: 'В названии минимум 2 символа',
      },
      maxLength: {
        value: 16,
        message: 'Максимальное количество 16 символов',
      },
    },
  },
  {
    fieldName: 'fare',
    typeInput: 'number',
    label: 'Цена',
    rules: {
      required: 'Введите цену',
    },
  },
  {
    type: 'select',
    fieldName: 'seat.category',
    label: 'Класс',
    rules: {
      required: 'Введите класс бронирования',
    },
    children: seatCategoryOptions,
  },
  {
    checkbox: true,
    fieldName: 'isSold',
    label: 'Продано',
    rules: {},
  },
  {
    checkbox: true,
    fieldName: 'isRegistered',
    label: 'Зарегистрировано',
    rules: {},
  },
  {
    checkbox: true,
    fieldName: 'isBooked',
    label: 'Забронировано',
    rules: {},
  },
];
