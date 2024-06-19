import { TFlightsStatus } from '@/interfaces';

export const flightStatuses = [
  'DELAYED',
  'DEPARTED',
  'CANCELED',
  'COMPLETED',
  'ARRIVED',
  'ON_TIME',
] as TFlightsStatus[];

export const statusNames = {
  DELAYED: 'Отложен',
  DEPARTED: 'Отправлен',
  CANCELED: 'Отменен',
  COMPLETED: 'Завершенный',
  ARRIVED: 'Прибыл',
  ON_TIME: 'В срок',
};

export const bookingStatuses = [
  'NOT_PAID',
  'PAID',
  'OVERDUE',
  'CANCELED',
] as const;

export const yesNo = ['true', 'false'];

export const seatCategory = [
  { ru: 'Бизнес', eng: 'BUSINESS' },
  { ru: 'Эконом', eng: 'ECONOMY' },
  { ru: 'Первый', eng: 'FIRST' },
  { ru: 'Премиум', eng: 'PREMIUM_ECONOMY' },
];

export const ITEMS_PER_PAGE = 10;

export const objFlight = {
  flights: [
    {
      totalPrice: 0,
      dataTo: {
        airportFrom: 'AAQ',
        airportTo: 'AAQ',
        cityFrom: 'string',
        cityTo: 'string',
        departureDateTime: '2024-05-27T20:27:18.746Z',
        arrivalDateTime: '2024-05-27T20:27:18.746Z',
        flightTime: 'string',
        flightSeatId: 0,
      },
      dataBack: {
        airportFrom: 'AAQ',
        airportTo: 'AAQ',
        cityFrom: 'string',
        cityTo: 'string',
        departureDateTime: '2024-05-27T20:27:18.746Z',
        arrivalDateTime: '2024-05-27T20:27:18.746Z',
        flightTime: 'string',
        flightSeatId: 0,
      },
    },
  ],
  search: {
    from: 'AAQ',
    to: 'AAQ',
    departureDate: '2024-05-27',
    returnDate: '2024-05-27',
    numberOfPassengers: 0,
    categoryOfSeats: 'FIRST',
  },
};
