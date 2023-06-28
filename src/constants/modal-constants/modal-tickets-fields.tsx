import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { ITicketsForm } from '@/interfaces/tickets.interface';

export const modalTicketsFields: FormInputProps<ITicketsForm>[] = [
  // {
  //   fieldName: 'id',
  //   typeInput: 'text',
  //   label: 'Введите имя',
  //   rules: {
  //     required: 'Введите номер рейса',
  //     minLength: {
  //       value: 2,
  //       message: 'В названии минимум 2 символа',
  //     },
  //     maxLength: {
  //       value: 16,
  //       message: 'Максимальное количество 16 символов',
  //     },
  //   },
  // },
  // {
  //   fieldName: 'arrivalDateTime',
  //   typeInput: 'text',
  //   label: 'Введите фамилию',
  //   rules: {
  //     required: 'Введите номер сиденья',
  //     minLength: {
  //       value: 2,
  //       message: 'В названии минимум 2 символа',
  //     },
  //     maxLength: {
  //       value: 16,
  //       message: 'Максимальное количество 16 символов',
  //     },
  //   },
  // },
  // {
  //   fieldName: 'code',
  //   typeInput: 'text',
  //   label: 'Введите класс',
  //   rules: {
  //     required: 'Введите номер сиденья',
  //     minLength: {
  //       value: 2,
  //       message: 'В названии минимум 2 символа',
  //     },
  //     maxLength: {
  //       value: 16,
  //       message: 'Максимальное количество 16 символов',
  //     },
  //   },
  // },
  // {
  //   fieldName: 'departureDateTime',
  //   typeInput: 'text',
  //   label: 'Введите да или нет',
  //   rules: {
  //     required: 'Введите номер сиденья',
  //     minLength: {
  //       value: 2,
  //       message: 'В названии минимум 2 символа',
  //     },
  //     maxLength: {
  //       value: 16,
  //       message: 'Максимальное количество 16 символов',
  //     },
  //   },
  // },
  // {
  //   fieldName: 'ticketNumber',
  //   typeInput: 'text',
  //   label: 'Введите да или нет',
  //   rules: {
  //     required: 'Введите номер сиденья',
  //     minLength: {
  //       value: 2,
  //       message: 'В названии минимум 2 символа',
  //     },
  //     maxLength: {
  //       value: 16,
  //       message: 'Максимальное количество 16 символов',
  //     },
  //   },
  // },
  {
    fieldName: 'firstName',
    typeInput: 'text',
    label: 'Введите номер сиденья',
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
    fieldName: 'lastName',
    typeInput: 'text',
    label: 'Введите номер сиденья',
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
  // {
  //   fieldName: 'flightId',
  //   typeInput: 'text',
  //   label: 'Введите номер сиденья',
  //   rules: {
  //     required: 'Введите номер сиденья',
  //     minLength: {
  //       value: 2,
  //       message: 'В названии минимум 2 символа',
  //     },
  //     maxLength: {
  //       value: 16,
  //       message: 'Максимальное количество 16 символов',
  //     },
  //   },
  // },
  
];
