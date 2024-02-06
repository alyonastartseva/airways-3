import IValidatePattern from '@/interfaces/validate-ptterns.interface';

const passportPattern: Record<string, IValidatePattern> = {
  numeric: {
    value: /^([0-9]{4}\s{1}[0-9]{6})?$/,
    message: 'Введите серию и номер паспорта в формате: 1234 567890',
  },
};

export default passportPattern;
