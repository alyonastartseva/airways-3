import { format } from 'date-fns';

import { capitalizeFirst } from '@/utils/capitalize-first.utils';

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
      .map((word) => capitalizeFirst(word).replace('.', ','))
      .join(' '),
  ];
};
