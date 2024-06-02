import { FormInputProps } from '@/common/ModalElements/ModalInput';
import { ISeatForm } from '@/interfaces';
import { seatCategory } from '@/constants';

const seatCategoryOptions = seatCategory.map((el) => (
  <option key={el.eng} value={el.eng}>
    {el.ru}
  </option>
));

export const modalSeatFields: FormInputProps<ISeatForm>[] = [
  {
    fieldName: 'aircraftId',
    typeInput: 'hidden',
    label: 'ID самолёта',
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
    fieldName: 'isLockedBack',
    label: 'Неподвижное сиденье',
    rules: {},
  },
  {
    checkbox: true,
    fieldName: 'isNearEmergencyExit',
    label: 'Рядом с экстренным выходом',
    rules: {},
  },
];
