import { IAircraftPost } from '@/interfaces';
import { FormInputProps } from '@common/ModalElements/ModalInput';

export const modalAirplanesFields: FormInputProps<IAircraftPost>[] = [
  {
    fieldName: 'model',
    label: 'Модель',
    typeInput: 'text',
    rules: {
      required: 'Введите модель самолёта',
      minLength: {
        value: 4,
        message: 'В названии минимум 4 символа',
      },
      maxLength: {
        value: 15,
        message: 'Максимальное количество 15 символов',
      },
    },
  },
  {
    fieldName: 'aircraftNumber',
    label: 'Номер самолёта',
    typeInput: 'number',
    rules: {
      required: 'Введите номер самолёта',
      minLength: { value: 4, message: 'Минимум 4 символа' },
      maxLength: { value: 15, message: 'Максимум 15 символов' },
    },
  },
  {
    fieldName: 'modelYear',
    label: 'Год выпуска',
    typeInput: 'number',
    rules: {
      required: 'Введите год выпуска самолёта',
      min: {
        value: 2000,
        message: 'Дата должна быть выше или равна 2000 году',
      },
      max: {
        value: new Date().getFullYear(),
        message: `Год выпуска не может быть новее ${new Date().getFullYear()} года`,
      },
    },
  },
  {
    fieldName: 'flightRange',
    label: 'Дальность полёта (км)',
    typeInput: 'number',
    rules: {
      required: 'Введите длину полёта',
      min: {
        value: 0,
        message: 'Длина полета не может быть отрицательной',
      },
      max: {
        value: 41467,
        message: 'Ваше значение выше рекорда 41 467км',
      },
    },
  },
  {
    label: 'Сиденья',
    fieldName: 'seats',
    typeInput: 'add',
  },
];
