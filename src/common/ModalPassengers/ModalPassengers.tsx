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
import { ButtonSubmitAdmin } from '@common/ButtonSubmitAdmin';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { usePassengersPost } from '@hooks/usePassengersPost';
import { IModalFormPage } from '@interfaces/table.interfaces';

import { ButtonAddAdmin } from '../ButtonAddAdmin';

interface IFormPassengers extends FieldValues {
  middleName?: string;
  lastName: string;
  firstName: string;
  passport: {
    gender: string;
    serialNumberPassport: string;
    passportIssuingCountry: string;
    passportIssuingDate: string;
  };
  phoneNumber: string;
  birthDate: string;
}

const ModalPassengers = ({ name }: IModalFormPage) => {
  const { register, handleSubmit, reset } = useForm<IFormPassengers>({
    mode: 'onBlur',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync: createPassengers } = usePassengersPost();

  const onSubmit: SubmitHandler<IFormPassengers> = async (data) => {
    await createPassengers(data).then((response) => {
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
          <ModalContent>
            <ModalHeader py={6} px={7}>
              <HeadingAdmin name="Добавить пассажира" />
            </ModalHeader>
            <ModalCloseButton m={3} bg="transparent" border="none" />
            <ModalBody pt={0} px={7}>
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="firstName"
                label="Имя, Фамилия, Отчество"
                rules={{
                  required: 'Введите Имя, Фамилия, Отчество',
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
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="passport.gender"
                label="Пол"
                rules={{
                  required: 'Введите пол',
                  minLength: { value: 4, message: 'Минимум 4 символа' },
                  maxLength: { value: 30, message: 'Максимум 30 символов' },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="phoneNumber"
                label="Номер телефона"
                type="number"
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
                type="number"
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
                type="number"
                rules={{
                  required: 'Введите дату рождения',
                  min: {
                    value: 0,
                    message: 'введите серийный номер',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
                fieldName="passport.passportIssuingCountry"
                label="Гражданство"
                rules={{
                  required: 'Введите Гражданство',
                  min: {
                    value: 0,
                    message: 'Введите Гражданство',
                  },
                }}
              />
              <ModalInput<IFormPassengers>
                register={register}
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
