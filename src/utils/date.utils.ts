import dayjs from 'dayjs';

const dateFormat = 'DD.MM.YYYY';
const dateTimeFormat = 'DD.MM.YYYY HH:mm';

export const formatDate = (date?: string): string => {
  return dayjs(date).format(dateFormat);
};

export const formatDateTime = (date: string): string => {
  return dayjs(date).format(dateTimeFormat);
};