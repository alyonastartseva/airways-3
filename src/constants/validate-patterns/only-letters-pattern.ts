import { IValidatePattern } from '@/interfaces';

const onlyLettersPattern: Record<string, IValidatePattern> = {
  letters: {
    value: /^[A-Za-zА-Яа-я]+$/u,
    message: 'Используйте только буквы',
  },
};

export default onlyLettersPattern;
