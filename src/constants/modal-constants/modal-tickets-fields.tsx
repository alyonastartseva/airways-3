import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { ITicketsForm } from '@/interfaces/tickets.interface';
import { getDestinationsByParams } from '@/services/destinations/destinations.service';

import { onlyLettersPattern } from '../validate-patterns';

const getCityNameOptions = async (query = { page: 0, searchValue: '' }) => {
  const { page, searchValue: cityName } = query;

  return getDestinationsByParams({ page, cityName }).then((data) => ({
    optionsPart: data
      ? data.content.map((el) => ({
          key: el.id,
          label: `${el.airportCode}, ${el.timezone}`,
          value: JSON.stringify(el),
        }))
      : [],
    last: !!data?.last,
  }));
};

export const modalTicketsFields: FormInputProps<ITicketsForm>[] = [
  {
    fieldName: 'ticketNumber',
    typeInput: 'text',
    label: 'Введите номер билета',
    rules: {
      required: 'Введите номер билета',
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
      pattern: onlyLettersPattern.letters,
    },
  },
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
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    fieldName: 'middleName',
    typeInput: 'text',
    label: 'Введите Отчество',
    rules: {
      minLength: {
        value: 2,
        message: 'В названии минимум 2 символа',
      },
      maxLength: {
        value: 16,
        message: 'Максимальное количество 16 символов',
      },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    fieldName: 'flightId',
    typeInput: 'number',
    label: 'Введите ID рейса',
    rules: {
      required: 'Введите номер билета',
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
    type: 'input-with-select',
    fieldName: 'from',
    typeInput: 'text',
    label: 'Выберите место назначения',
    rules: {
      required: 'Выберите место назначения',
    },
    getOptions: getCityNameOptions,
  },
  {
    type: 'input-with-select',
    fieldName: 'to',
    typeInput: 'text',
    label: 'Выберите место отправления',
    rules: {
      required: 'Выберите место отправления',
    },
    getOptions: getCityNameOptions,
  },
  {
    fieldName: 'departureDateTime',
    typeInput: 'datetime-local',
    label: 'Выберите дату и время вылета',
    rules: {
      required: 'Выберите дату и время вылета',
      min: String(new Date().getFullYear()),
    },
  },
  {
    fieldName: 'arrivalDateTime',
    typeInput: 'datetime-local',
    label: 'Введите дату и время время прибытия',
    rules: {
      required: 'Введите дату и время время прибытия',
      min: String(new Date().getFullYear()),
    },
  },
  {
    fieldName: 'flightSeatId',
    typeInput: 'number',
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
  {
    fieldName: 'seatNumber',
    typeInput: 'text',
    label: 'Введите номер места',
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
