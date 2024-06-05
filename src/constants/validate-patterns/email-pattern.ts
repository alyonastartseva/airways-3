import { IValidatePattern } from '@/interfaces';

const emailPattern: Record<string, IValidatePattern> = {
  email: {
    value: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
    message: 'Введите email в формате example@domen.com',
  },
};

export default emailPattern;
