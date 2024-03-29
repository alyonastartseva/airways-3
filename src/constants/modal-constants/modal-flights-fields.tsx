import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { IFlightPostFormFields } from '@/interfaces/flights.interfaces';
import { useDestinationQuery, useAircraftQuery } from '@/hooks';
import { IAircraftPost } from '@interfaces/aircraft.interfaces';

import { flightStatuses, statusNames } from '../constants';

const AircraftIdOptions = () => {
  const { data: aircraftList } = useAircraftQuery();

  if (aircraftList)
    return (
      <>
        {aircraftList.content.map((el: IAircraftPost, i) => (
          <option key={`${el.model}${i}`} value={el.id}>
            {el.model}
          </option>
        ))}
      </>
    );
};

const CityNameOptions = () => {
  const { data: destinationsList } = useDestinationQuery();

  if (destinationsList)
    return (
      <>
        {destinationsList.content.map((el: IAircraftPost) => (
          <option key={el.id} value={JSON.stringify(el)}>
            {`${el.airportCode}, ${el.timezone}`}
          </option>
        ))}
      </>
    );
};

const flightStatusesOptions = flightStatuses.map((el) => (
  <option key={el} value={el}>
    {statusNames[el]}
  </option>
));

export const modalFlightsFields: FormInputProps<IFlightPostFormFields>[] = [
  {
    fieldName: 'code',
    label: 'Код (Рейс)',
    rules: {
      required: 'Введите код (рейс)',
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
    select: true,
    fieldName: 'from',
    label: 'Город откуда',
    typeInput: 'text',
    rules: {
      required: 'Введите город',
    },
    children: <CityNameOptions />,
  },
  {
    select: true,
    fieldName: 'to',
    label: 'Город куда',
    typeInput: 'text',
    rules: {
      required: 'Введите город',
    },
    children: <CityNameOptions />,
  },
  {
    fieldName: 'departureDateTime',
    label: 'Дата отбытия',
    typeInput: 'datetime-local',
    rules: {
      required: 'Введите дату отбытия',
      min: String(new Date().getFullYear()),
    },
  },
  {
    fieldName: 'arrivalDateTime',
    label: 'Дата прибытия',
    typeInput: 'datetime-local',
    rules: {
      required: 'Введите дату прибытия',
      min: String(new Date().getFullYear()),
    },
  },
  {
    select: true,
    fieldName: 'aircraftId',
    label: 'Модель самолета',
    rules: {
      required: 'Введите модель самолета',
    },
    children: <AircraftIdOptions />,
  },
  {
    select: true,
    fieldName: 'flightStatus',
    label: 'Статус',
    rules: {
      required: 'Укажите статус',
    },
    children: flightStatusesOptions,
  },
];
