import dayjs from 'dayjs';

const dateFormat = 'DD.MM.YYYY';
const dateTimeFormat = 'DD.MM.YYYY HH:mm';

export const formatDate = (date?: string, format = dateFormat): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (
  date: string,
  format = dateTimeFormat
): string => {
  return dayjs(date).format(format);
};
