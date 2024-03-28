import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { ISeatForm } from '@/interfaces/seat.interfaces';

import { seatCategory } from '../constants';

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
    select: true,
    fieldName: 'category',
    label: 'Класс',
    rules: {
      required: 'Ввеите класс бронирования',
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
    label: 'Близко к экстренному выходу',
    rules: {},
  },
];
