import { FlightIdOptions, SeatCategoryOptions, SeatsOptions } from '@/common';
import { FormInputProps } from '@/common/ModalInput';
import { IFlightSeatsPost } from '@/interfaces/flightsSeats.interfaces';

export const modalFlightSeatFields: FormInputProps<IFlightSeatsPost>[] = [
  {
    fieldName: 'flightId',
    type: 'select',
    label: 'ID Рейса',
    rules: {},
    children: <FlightIdOptions />,
  },
  {
    fieldName: 'seat.seatNumber',
    type: 'select',
    label: 'Номер сиденья',
    rules: {},
    children: <SeatsOptions id={10} />,
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
    fieldName: 'seat.category',
    label: 'Класс',
    rules: {
      required: 'Введите класс бронирования',
    },
    children: <SeatCategoryOptions />,
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
