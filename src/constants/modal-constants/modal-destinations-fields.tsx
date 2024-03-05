import React from 'react';
import { FormInputProps } from '../../common/ModalElements/ModalInput/ModalInput';
import { IDestinationPost } from '../../interfaces/destination.interfaces';

import { onlyLettersPattern } from '../validate-patterns';

export const modalDestinationsFields: FormInputProps<IDestinationPost>[] = [
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
    fieldName: 'airportName',
    label: 'Название аэропорта',
    typeInput: 'text',
    rules: {
      required: 'Введите название аэропорта',
    },
  },
  {
    select: true,
    fieldName: 'airportCode',
    label: 'Код аэропорта',
    rules: {
      required: 'Выберите код аэропорта',
    },
    children: (
      // Временно захардкожено
      // Переделать, когда этиданные будут призодить с API
      <>
        <option value="void">Выберите код...</option>,
        <option value="DME">DME</option>,<option value="SVO">SVO</option>,
        <option value="VKO">VKO</option>,
      </>
    ),
  },
  {
    fieldName: 'timezone',
    label: 'Часовой пояс',
    typeInput: 'text',
    rules: {
      required: 'Введите часовой пояс',
    },
  },
];
