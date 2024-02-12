import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { IFlightPostFormFields } from '@/interfaces/flights.interfaces';
import { SpinnerBlock } from '@/common/SpinnerBlock';
import { useAircraftQuery } from '@/hooks/useAircraftQuery';
import { useDestinationQuery } from '@/hooks/useDestinationQuery';
import { AlertMessage } from '@/common/AlertMessage';
import {IAircraftPost} from '@interfaces/aircraft.interfaces';

import { flightStatuses } from '../constants';

const AircraftIdOptions = () => {
  const { data: aircraftList, isLoading: isAircraftLoading } =
    useAircraftQuery();

  if (isAircraftLoading) return <SpinnerBlock />;

  if (aircraftList)
    return (
      <>
        {aircraftList.content.map((el: IAircraftPost) => (
          <option key={el.model} value={el.id}>
            {el.model}
          </option>
        ))}
      </>
    );

  return <AlertMessage />;
};

const CityNameOptions = () => {
  const { data: destinationsList, isLoading: isDestinationsLoading } =
    useDestinationQuery();

  if (isDestinationsLoading) return <SpinnerBlock />;

  if (destinationsList)
    return (
      <>
        {/* {destinationsList.content.map((el) => ( */}
        {destinationsList.content.map((el: IAircraftPost) => (
          <option key={el.id} value={JSON.stringify(el)}>
            {`${el.airportName}, ${el.airportCode}`}
          </option>
        ))}
      </>
    );

  return <AlertMessage />;
};

const flightStatusesOptions = flightStatuses.map((el) => (
  <option key={el} value={el}>
    {el}
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
