import dayjs from 'dayjs';

const defaultDateTimeFormat = 'DD.MM.YYYY HH:mm';

export const formatDateTime = (
  date: string | undefined,
  dateTimeFormat: string = defaultDateTimeFormat
): string => {
  return dayjs(date).format(dateTimeFormat);
};
