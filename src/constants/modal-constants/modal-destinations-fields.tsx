import { FormInputProps } from '@common/ModalElements/ModalInput';
import { IDestinationPost } from '@/interfaces';
import { airportCodePattern, onlyLettersPattern } from '@/constants';

export const modalDestinationsFields: FormInputProps<IDestinationPost>[] = [
  {
    fieldName: 'countryName',
    label: 'Страна',
    rules: {
      disabled: true,
      required: 'Введите название страны',
      minLength: { value: 3, message: 'Минимум 3 символа' },
      maxLength: { value: 58, message: 'Максимум 58 символов' },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    fieldName: 'cityName',
    label: 'Город',
    typeInput: 'text',
    rules: {
      disabled: true,
      required: 'Введите название города',
      minLength: { value: 1, message: 'Минимум 1 символ' },
      maxLength: { value: 21, message: 'Максимум 21 символ' },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    fieldName: 'airportName',
    label: 'Название аэропорта',
    typeInput: 'text',
    rules: {
      disabled: true,
      required: 'Введите название аэропорта',
    },
  },
  {
    fieldName: 'airportCode',
    label: 'Код аэропорта',
    rules: {
      required: 'Введите код аэропорта',
      minLength: { value: 1, message: 'Минимум 1 символ' },
      maxLength: { value: 3, message: 'Максимум 3 символа' },
      pattern: airportCodePattern.letters,
    },
  },
  {
    mask: 'GMT',
    fieldName: 'timezone',
    label: 'Среднее время по Гринвичу (GMT)',
    typeInput: 'text',
    rules: {
      required: 'Введите часовой пояс',
      minLength: { value: 2, message: 'Минимум 2 символа' },
      maxLength: { value: 3, message: 'Максимум 3 символа' },
      pattern: {
        value: /^[-+][ 0-9]+$/u,
        message: 'Используйте только знак + или - и цифры',
      },
    },
  },
];
