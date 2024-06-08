import { seatCategory } from '@/constants/constants';
import { ISeatCategory } from '@/interfaces/flightsSeats.interfaces';

// получение названия класса билета
export const getStatusName = (status: ISeatCategory): string => {
  const obj = seatCategory.find((el) => el.eng === status);
  return obj?.ru || '';
};

export const getYesNo = (status: string): string => {
  switch (status) {
    case 'true':
      return 'Да';
    case 'false':
      return 'Нет';
    default:
      return '';
  }
};
