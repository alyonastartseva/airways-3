import { useForm, SubmitHandler } from 'react-hook-form';
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
import { IModalFormPage } from '@interfaces/table.interfaces';
import { IDestinationPost } from '@interfaces/destination.interfaces';
import { useDestinationPost } from '@hooks/useDestinationPost';

import { ButtonAddAdmin } from '../ButtonAddAdmin';

const ModalDestinations = ({ name }: IModalFormPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDestinationPost>({ mode: 'onBlur' });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync: createDestination } = useDestinationPost();

  const onSubmit: SubmitHandler<IDestinationPost> = async (data) => {
    await createDestination(data).then((response) => {
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
              <HeadingAdmin name="Добавить пункт назначения" />
            </ModalHeader>
            <ModalCloseButton m={3} bg="transparent" border="none" />
            <ModalBody pt={0} px={7}>
              <ModalInput<IDestinationPost>
                register={register}
                fieldName="countryName"
                label="Страна"
                errorMessage={errors.countryName?.message}
                rules={{
                  required: 'Введите название страны',
                  minLength: { value: 3, message: 'Минимум 3 символа' },
                  maxLength: { value: 58, message: 'Максимум 58 символов' },
                }}
              />
              <ModalInput<IDestinationPost>
                register={register}
                fieldName="cityName"
                label="Город"
                typeInput="text"
                errorMessage={errors.cityName?.message}
                rules={{
                  required: 'Введите название города',
                  minLength: { value: 1, message: 'Минимум 1 символ' },
                  maxLength: { value: 21, message: 'Максимум 21 символ' },
                }}
              />
              <ModalInput<IDestinationPost>
                register={register}
                fieldName="airportName"
                label="Название аэропорта"
                typeInput="text"
                errorMessage={errors.airportName?.message}
                rules={{
                  required: 'Введите название аэропорта',
                }}
              />
              <ModalInput<IDestinationPost>
                register={register}
                fieldName="airportCode"
                label="Код аэропорта"
                typeInput="text"
                errorMessage={errors.airportCode?.message}
                rules={{
                  required: 'Введите код аэропорта',
                  minLength: {
                    value: 3,
                    message: 'Код аэропорта должен состоять из 3 символов',
                  },
                  maxLength: {
                    value: 3,
                    message: 'Код аэропорта должен состоять из 3 символов',
                  },
                }}
              />
              <ModalInput<IDestinationPost>
                register={register}
                fieldName="timezone"
                label="Часовой пояс"
                typeInput="text"
                errorMessage={errors.timezone?.message}
                rules={{
                  required: 'Введите часовой пояс',
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

export default ModalDestinations;
