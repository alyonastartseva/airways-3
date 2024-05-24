import { IValidatePattern } from '@/interfaces';

const phonePattern: Record<string, IValidatePattern> = {
  numeric: {
    value: /^\+\d{4}\s\d{3}\s\d{2}\s\d{2}$/,
    message: 'Введите номер телефона в формате: +7111 222 33 44',
  },
};

export default phonePattern;
