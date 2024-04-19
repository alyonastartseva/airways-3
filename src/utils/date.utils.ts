import dayjs from 'dayjs';
import { format } from 'date-fns';

import { capitalize } from '@/utils/string.utils';

const defaultDateTimeFormat = 'DD.MM.YYYY HH:mm';

export const formatDateTime = (
  date: string | undefined,
  dateTimeFormat: string = defaultDateTimeFormat
): string => {
  return dayjs(date).format(dateTimeFormat);
};

export const getFormattedDateTime = (
  date: string,
  timeFormat = 'HH:mm',
  customDateFormat = 'd MMM EEEEEE'
): [string, string] => {
  const parsedDate = new Date(date);
  return [
    format(parsedDate, timeFormat),
    format(parsedDate, customDateFormat)
      .split(' ')
      .map((word) => capitalize(word).replace('.', ','))
      .join(' '),
  ];
};
