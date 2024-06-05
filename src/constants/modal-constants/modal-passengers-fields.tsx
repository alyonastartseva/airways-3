import { FormInputProps } from '@/common/ModalInput';
import { IFormPassengers } from '@/interfaces';
import {
  onlyLettersPattern,
  phonePattern,
  emailPattern,
  passportPattern,
} from '@/constants';

export const modalPassengersFields: FormInputProps<IFormPassengers>[] = [
  {
    fieldName: 'lastName',
    typeInput: 'text',
    label: 'Фамилия',
    rules: {
      required: 'Введите фамилию',
      minLength: {
        value: 2,
        message: 'Минимум 2 символа',
      },
      maxLength: {
        value: 16,
        message: 'Максимальное количество 16 символов',
      },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    fieldName: 'firstName',
    typeInput: 'text',
    label: 'Имя',
    rules: {
      required: 'Введите имя',
      minLength: {
        value: 3,
        message: 'Минимум 2 символа',
      },
      maxLength: {
        value: 15,
        message: 'Максимальное количество 15 символов',
      },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    fieldName: 'middleName',
    typeInput: 'text',
    label: 'Отчество',
    rules: {
      required: 'Введите отчество',
      minLength: {
        value: 4,
        message: 'В названии минимум 4 символа',
      },
      maxLength: {
        value: 15,
        message: 'Максимальное количество 15 символов',
      },
      pattern: onlyLettersPattern.letters,
    },
  },
  {
    type: 'select',
    fieldName: 'gender',
    label: 'Пол',
    rules: {
      required: 'Выберите пол',
    },
    children: (
      <>
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </>
    ),
  },
  {
    fieldName: 'phoneNumber',
    label: 'Номер телефона',
    typeInput: 'tel',
    rules: {
      required: 'Введите номер телефона в формате +7111 222 33 44',
      pattern: phonePattern.numeric,
    },
  },
  {
    fieldName: 'birthDate',
    label: 'Дата рождения',
    typeInput: 'date',
    rules: {
      required: 'Введите дату рождения',
    },
  },
  {
    fieldName: 'serialNumberPassport',
    label: 'Серийный номер',
    typeInput: 'text',
    rules: {
      required: 'Введите серийный номер в формате 1234 567890',
      pattern: passportPattern.numeric,
    },
  },
  {
    type: 'select',
    fieldName: 'passportIssuingCountry',
    label: 'Гражданство',
    rules: {
      required: 'Укажите гражданство',
    },
    children: (
      <>
        <option value="Rus">Российская Федерация</option>
        <option value="Uzb">Узбекистан</option>
        <option value="Kz">Казахстан</option>
      </>
    ),
  },
  {
    fieldName: 'passportIssuingDate',
    typeInput: 'date',
    label: 'Дата выдачи паспорта',
    rules: {
      required: 'Введите дату выдачи паспорта',
    },
  },
  {
    fieldName: 'email',
    label: 'Электронная почта',
    typeInput: 'text',
    rules: {
      required: 'Введите электронную почту в формате example@domen.ru',
      pattern: emailPattern.email,
    },
  },
];
