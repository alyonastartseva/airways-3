import { FormInputProps } from '@/common/ModalElements/ModalInput';
import { ISeatForm } from '@/interfaces';
import { seatCategory } from '@/constants';

const seatCategoryOptions = seatCategory.map((el) => (
  <option key={el.eng} value={el.eng}>
    {el.ru}
  </option>
));

export const modalFlightSeatFields: FormInputProps<ISeatForm>[] = [
  {
    fieldName: 'code',
    typeInput: 'add',
    label: 'ID Рейса',
    rules: {},
  },
  {
    fieldName: 'seatNumber',
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
    fieldName: 'category',
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