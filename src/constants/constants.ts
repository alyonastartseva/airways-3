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

export const secretQuestions = [
  { value: 1, question: 'Как звали вашего первого питона?' },
  { value: 2, question: 'Любовь = ?' },
  { value: 3, question: 'Ваш первый учитель?' },
];

export const ITEMS_PER_PAGE = 10;
