import IValidatePattern from '@/interfaces/validate-ptterns.interface';

const passwordPattern: Record<string, IValidatePattern> = {
  pass: {
    value:
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/,
    message:
      'Пароль должен быть минимум 8 символов, содержать как минимум по одной латинской заглавной и строчной букве, а также иметь спецсимволы',
  },
};

export default passwordPattern;
