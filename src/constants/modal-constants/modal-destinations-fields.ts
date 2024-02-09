import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import { IDestinationPost } from '@/interfaces/destination.interfaces';

export const modalDestinationsFields: FormInputProps<IDestinationPost>[] = [
  {
    fieldName: 'countryName',
    label: 'Страна',
    rules: {
      required: 'Введите название страны',
      minLength: { value: 3, message: 'Минимум 3 символа' },
      maxLength: { value: 58, message: 'Максимум 58 символов' },
      pattern: {
        value: /^[A-Za-zА-Яа-я]+$/u,
        message: 'Используйте только буквы',
      },
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
      pattern: {
        value: /^[A-Za-zА-Яа-я]+$/u,
        message: 'Используйте только буквы',
      },
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
  // инпут надо убрать
  // {
  //   fieldName: 'airportCode',
  //   label: 'Код аэропорта',
  //   typeInput: 'text',
  //   rules: {
  //     required: 'Введите код аэропорта',
  //     minLength: {
  //       value: 3,
  //       message: 'Код аэропорта должен состоять из 3 символов',
  //     },
  //     maxLength: {
  //       value: 3,
  //       message: 'Код аэропорта должен состоять из 3 символов',
  //     },
  //   },
  // },

  // Селект вставлен вместо инпута
  // Сам селект работает, проблема имеено а чилдренах
  {
    select: true,
    fieldName: 'airportCode',
    label: 'Код аэропорта',
    rules: {
      required: 'Выберите код аэропорта',
    },
    // Если это расскоментировать
    // children: (
    //   <>           // тут будет ошибка
    //     <option value="DME">DME</option>,
    //     <option value="SVO">SVO</option>,
    //     <option value="VKO">VKO</option>,
    //   </>
    // ),
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
