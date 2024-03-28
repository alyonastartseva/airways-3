import { AlertMessage } from '@/common/AlertMessage';
import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { SpinnerBlock } from '@/common/SpinnerBlock';
import { usePassengersQuery, useDestinationQuery } from '@/hooks';
import { ITicketsForm } from '@/interfaces/tickets.interface';
import { IAircraftPost } from '@interfaces/aircraft.interfaces';

import { onlyLettersPattern } from '../validate-patterns';

const PassengerNameOptions = () => {
  const { data: passengersList, isLoading: isPassengerListLoading } =
    usePassengersQuery(1);

  if (isPassengerListLoading) return <SpinnerBlock />;

  if (passengersList) {
    return (
      <>
        {passengersList.content.map((el) => (
          <option key={el.id} value={JSON.stringify(el)}>
            {`${el.firstName}, ${el.lastName}`}
          </option>
        ))}
      </>
    );
  }
  return <AlertMessage />;
};

const CityNameOptions = () => {
  const { data: destinationsList, isLoading: isDestinationsLoading } =
    useDestinationQuery();

  if (isDestinationsLoading) return <SpinnerBlock />;

  if (destinationsList)
    return (
      <>
        {destinationsList.content.map((el: IAircraftPost) => (
          <option key={el.id} value={JSON.stringify(el)}>
            {`${el.airportName}, ${el.airportCode}`}
          </option>
        ))}
      </>
    );

  return <AlertMessage />;
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
    select: true,
    fieldName: 'passengerId',
    typeInput: 'number',
    label: 'ID Пассажира',
    rules: {
      required: 'Выберите пассажира',
    },
    children: <PassengerNameOptions />,
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
    select: true,
    fieldName: 'from',
    typeInput: 'text',
    label: 'Выберите место назначения',
    rules: {
      required: 'Выберите место назначения',
    },
    children: <CityNameOptions />,
  },
  {
    select: true,
    fieldName: 'to',
    typeInput: 'text',
    label: 'Выберите место отправления',
    rules: {
      required: 'Выберите место отправления',
    },
    children: <CityNameOptions />,
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
