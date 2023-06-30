import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { ITicketsForm } from '@/interfaces/tickets.interface';

export const modalTicketsFields: FormInputProps<ITicketsForm>[] = [
  {
    fieldName: 'lastName',
    typeInput: 'text',
    label: 'Введите Фамилию',
    rules: {
      required: 'Введите Фамилию',
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
    fieldName: 'firstName',
    typeInput: 'text',
    label: 'Введите имя',
    rules: {
      required: 'Введите имя',
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
    fieldName: 'code',
    typeInput: 'text',
    label: 'Введите код рейса',
    rules: {
      required: 'Введите код рейса',
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
    fieldName: 'departureDateTime',
    typeInput: 'text',
    label: 'Введите дату и время вылета',
    rules: {
      required: 'Введите время вылета',
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
    fieldName: 'arrivalDateTime',
    typeInput: 'text',
    label: 'Введите дату и время время прилета',
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
    fieldName: 'seatNumber',
    typeInput: 'text',
    label: 'Введите номер посадки',
    rules: {
      required: 'Введите номер посадки',
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
];
