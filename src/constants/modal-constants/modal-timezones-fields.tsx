import { FormInputProps } from '@common/ModalElements/ModalInput';
import { TTimeZoneForm } from '@/interfaces';
import { onlyLettersPattern } from '@/constants';

export const modalTimezonesFields: FormInputProps<TTimeZoneForm>[] = [
  {
    fieldName: 'countryName',
    label: 'Страна',
    rules: {
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
      required: 'Введите название города',
      minLength: { value: 1, message: 'Минимум 1 символ' },
      maxLength: { value: 21, message: 'Максимум 21 символ' },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    mask: 'GMT+',
    fieldName: 'gmt',
    label: 'Среднее время по Гринвичу (GMT)',
    typeInput: 'text',
    rules: {
      required: 'Введите часовой пояс',
      pattern: {
        value: /^[ 0-9]+$/u,
        message: 'Используйте только цифры',
      },
    },
  },
  {
    mask: 'GMT+',
    fieldName: 'gmtWinter',
    label: 'Зимнее среднее время по Гринвичу (GMT)',
    typeInput: 'text',
    rules: {
      required: 'Введите часовой пояс',
      pattern: {
        value: /^[ 0-9]+$/u,
        message: 'Используйте только цифры',
      },
    },
  },
];
