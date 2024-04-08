import { ITEMS_PER_PAGE } from '@/constants/constants';

export const getQueryString = <T>(params?: T) => {
  const defaultParams = {
    page: 0,
    size: ITEMS_PER_PAGE,
  };
  const entries = Object.entries({ ...defaultParams, ...params });

  return entries.reduce((acc, [name, value], index) => {
    const separator = index === 0 ? '?' : '&';
    const isValueExist = value || value === 0;
    return isValueExist ? `${acc}${separator}${name}=${value}` : acc;
  }, '');
};
