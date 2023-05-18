import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { IFormPassengers } from '@/interfaces/passenger.interfaces';
import { ERolesPassenger } from '@/interfaces/roles.interfaces';

export const modalPassengersFields: FormInputProps<IFormPassengers>[] = [
  {
    fieldName: 'lastName',
    typeInput: 'text',
    label: 'Фамилия',
    rules: {
      required: 'Введите фамилию',
      minLength: {
        value: 2,
        message: 'В названии минимум 2 символа',
      },
      maxLength: {
        value: 16,
        message: 'Максимальное количество 16 символов',
      },
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
        message: 'В названии минимум 3 символа',
      },
      maxLength: {
        value: 15,
        message: 'Максимальное количество 15 символов',
      },
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
    },
  },
  {
    select: true,
    fieldName: 'gender',
    label: 'Пол',
    rules: {
      required: 'Выберите пол',
    },
    children: (
      <>
        <option value="male\">Мужской</option>
        <option value="female\">Женский</option>
      </>
    ),
  },
  {
    fieldName: 'phoneNumber',
    label: 'Номер телефона',
    typeInput: 'tel',
    rules: {
      required: 'Введите номер телефона',
      minLength: {
        value: 10,
        message: 'Номер должен иметь 10 символов',
      },
      maxLength: {
        value: 10,
        message: 'Номер должен иметь 10 символов',
      },
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
      required: 'Введите серийный номер',
      pattern: {
        value: /^([0-9]{4}\s{1}[0-9]{6})?$/,
        message: 'Введите корректный серийный номер',
      },
    },
  },
  {
    select: true,
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
      required: 'Введите электронную почту',
      pattern: {
        value: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        message: 'Введите корректный email',
      },
    },
  },
  {
    fieldName: 'securityQuestion',
    label: 'Секретный вопрос',
    typeInput: 'text',
    rules: {
      required: 'Введите секретный вопрос',
    },
  },
  {
    fieldName: 'answerQuestion',
    label: 'Ответ на вопрос',
    typeInput: 'text',
    rules: {
      required: 'Введите ответ',
    },
  },
  {
    select: true,
    fieldName: 'rolesName',
    label: 'Роль',
    rules: {
      required: 'Укажите роль',
    },
    children: (
      <>
        <option value={ERolesPassenger.ROLE_ADMIN}>Администратор</option>
        <option value={ERolesPassenger.ROLE_PASSENGER}>Пассажир</option>
        <option value={ERolesPassenger.ROLE_MANAGER}>Менеджер</option>
      </>
    ),
  },
  {
    fieldName: 'password',
    label: 'Пароль',
    typeInput: 'text',
    rules: {
      required: 'Введите пароль',
      pattern: {
        value:
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/,
        message:
          'Пароль должен быть минимум 8 символов, содержать как минимум по одной латинской заглавной и строчной букве, а также иметь спецсимволы',
      },
    },
  },
];
