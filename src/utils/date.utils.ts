import dayjs from 'dayjs';
import { format } from 'date-fns';

import { capitalize } from './string.utils';

const dateFormatDefault = 'DD.MM.YYYY';
const dateTimeFormatDefault = 'DD.MM.YYYY HH:mm';

export const formatDate = (
  date?: string,
  dateFormat = dateFormatDefault
): string => {
  return dayjs(date).format(dateFormat);
};

export const formatDateTime = (
  date: string,
  dateTimeFormat = dateTimeFormatDefault
): string => {
  return dayjs(date).format(dateTimeFormat);
};

export const getFormattedDateTime = (
  date: string,
  timeFormat = 'HH:mm',
  dateFormat = 'd MMM EEEEEE'
): [string, string] => {
  const parsedDate = new Date(date);
  return [
    format(parsedDate, timeFormat),
    format(parsedDate, dateFormat)
      .split(' ')
      .map((word) => capitalize(word).replace('.', ','))
      .join(' '),
  ];
};
