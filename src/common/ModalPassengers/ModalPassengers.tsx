import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import { ModalInput } from '@common/ModalInput';
import { ModalSelect } from '@common/ModalSelect';
import { ButtonSubmitAdmin } from '@common/ButtonSubmitAdmin';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { usePassengersPost } from '@hooks/usePassengersPost';
import { IModalFormPage } from '@interfaces/table.interfaces';
import { ERolesPassenger } from '@/interfaces/roles.interfaces';

import { ButtonAddAdmin } from '../ButtonAddAdmin';
interface IFormPassengers extends FieldValues {
  lastName: string;
  firstName: string;
  passport: {
    middleName?: string;
    gender: string;
    serialNumberPassport: string;
    passportIssuingCountry: string;
    passportIssuingDate: string;
  };
  phoneNumber: string;
  birthDate: string;
  email: string;
  securityQuestion: string;
  answerQuestion: string;
  roles: [
    {
      name: ERolesPassenger;
    }[]
  ];
  password: string;
}

const ModalPassengers = ({ name }: IModalFormPage) => {
  const { register, handleSubmit, reset } = useForm<IFormPassengers>({
    mode: 'onBlur',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync: createPassengers } = usePassengersPost();

  const onSubmit: SubmitHandler<IFormPassengers> = async (
    data: IFormPassengers
  ) => {
    const editedData = {
      ...data,
      roles: [data.roles],
    };
    await createPassengers(editedData).then((response) => {
      if (response.status < 400) {
        reset();
        onClose();
      }
    });
  };

  return (
    <>
      <ButtonAddAdmin name={name} onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        blockScrollOnMount
        isCentered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalOverlay />
          <ModalContent mt={1000}>
            <ModalHeader py={6} px={7}>
              <HeadingAdmin name="Добавить пассажира" />
            </ModalHeader>
            <ModalCloseButton m={3} bg="transparent" border="none" />
            <ModalBody mt={0} px={7}>
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="lastName"
                typeInput="text"
                label="Фамилия"
                rules={{
                  required: 'Введите фамилию',
                  minLength: {
                    value: 2,
                    message: 'В названии минимум 2 символа',
                  },
                  maxLength: {
                    value: 16,
                    message: 'Максимальное количество 16 символов',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="firstName"
                typeInput="text"
                label="Имя"
                rules={{
                  required: 'Введите имя',
                  minLength: {
                    value: 3,
                    message: 'В названии минимум 3 символа',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Максимальное количество 15 символов',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="passport.middleName"
                typeInput="text"
                label="Отчество"
                rules={{
                  required: 'Введите отчество',
                  minLength: {
                    value: 4,
                    message: 'В названии минимум 4 символа',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Максимальное количество 15 символов',
                  },
                }}
              />
              <ModalSelect<IFormPassengers>
                fieldName="passport.gender"
                register={register}
                label="Пол"
                rules={{
                  required: 'Выберите пол',
                }}
              >
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </ModalSelect>

              <ModalInput<IFormPassengers>
                register={register}
                fieldName="phoneNumber"
                label="Номер телефона"
                typeInput="tel"
                rules={{
                  required: 'Введите номер телефона',
                  min: {
                    value: 10,
                    message: 'Номер должен иметь 10 символов',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="birthDate"
                label="Дата рождения"
                typeInput="date"
                rules={{
                  required: 'Введите дату рождения',
                  min: {
                    value: 0,
                    message: 'введите дату',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="passport.serialNumberPassport"
                label="Серийный номер"
                typeInput="number"
                rules={{
                  required: 'Введите серийный номер',
                  min: {
                    value: 0,
                    message: 'введите серийный номер',
                  },
                }}
              />
              <ModalSelect<IFormPassengers>
                fieldName="passport.passportIssuingCountry"
                register={register}
                label="Гражданство"
                rules={{
                  required: 'Укажите гражданство',
                }}
              >
                <option value="Rus">Российская Федерация</option>
                <option value="Uzb">Узбекистан</option>
                <option value="Kz">Казахстан</option>
              </ModalSelect>
              <ModalInput<IFormPassengers>
                register={register}
                typeInput="date"
                fieldName="passport.passportIssuingDate"
                label="Дата выдачи паспорта"
                rules={{
                  required: 'Введите Дату выдачи паспорта',
                  min: {
                    value: 0,
                    message: 'Введите Дату выдачи паспорта',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="email"
                label="Электронная почта"
                typeInput="text"
                rules={{
                  required: 'Введите электронную почту',
                  min: {
                    value: 0,
                    message: 'введите электронную почту',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="securityQuestion"
                label="Секретный вопрос"
                typeInput="text"
                rules={{
                  required: 'Введите секретный вопрос',
                  min: {
                    value: 0,
                    message: 'введите секретный вопрос',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="answerQuestion"
                label="Ответ на вопрос"
                typeInput="text"
                rules={{
                  required: 'Введите ответ',
                  min: {
                    value: 0,
                    message: 'введите ответ',
                  },
                }}
              />
              <ModalSelect<IFormPassengers>
                register={register}
                fieldName="roles.name"
                label="Роль"
                rules={{
                  required: 'Укажите роль',
                }}
              >
                <option value="ROLE_ADMIN">Администратор</option>
                <option value="ROLE_PASSENGER">Пассажир</option>
                <option value="ROLE_MANAGER">Менеджер</option>
              </ModalSelect>
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="password"
                label="Пароль"
                typeInput="text"
                rules={{
                  required: 'Введите пароль',
                  min: {
                    value: 0,
                    message: 'введите пароль',
                  },
                }}
              />
            </ModalBody>
            <ModalFooter pt={0} pb={7} px={7}>
              <ButtonSubmitAdmin />
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ModalPassengers;
