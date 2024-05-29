import { seatCategory } from '@/constants/constants';
import { TSeatCategory } from '@/interfaces/seat.interfaces';

// получение названия класса билета
export const getStatusName = (status: TSeatCategory): string => {
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
