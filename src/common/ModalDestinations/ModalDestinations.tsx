import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
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

import searchService from '@services/searchService';
import { ModalInput } from '@common/ModalInput';
import { ButtonSubmitAdmin } from '@common/ButtonSubmitAdmin';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { IModalFormPage } from '@interfaces/table.interfaces';

import { ButtonAddAdmin } from '../ButtonAddAdmin';

interface IDestinationForm extends FieldValues {
  countryName: string;
  cityName: string;
  airportName: string;
  airportCode: string;
  timezone: string;
}
const ModalDestinations = ({ name }: IModalFormPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDestinationForm>({ mode: 'onBlur' });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate: createDestination } = useMutation(
    'create destination',
    searchService.postDestinations,
    {
      onSuccess: () => onClose(),
    }
  );

  const onSubmit: SubmitHandler<IDestinationForm> = (data) => {
    createDestination(data);
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
              <ModalInput<IDestinationForm>
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
              <ModalInput<IDestinationForm>
                register={register}
                fieldName="cityName"
                label="Город"
                type="text"
                errorMessage={errors.cityName?.message}
                rules={{
                  required: 'Введите название города',
                  minLength: { value: 1, message: 'Минимум 1 символ' },
                  maxLength: { value: 21, message: 'Максимум 21 символ' },
                }}
              />
              <ModalInput<IDestinationForm>
                register={register}
                fieldName="airportName"
                label="Название аэропорта"
                type="text"
                errorMessage={errors.airportName?.message}
                rules={{
                  required: 'Введите название аэропорта',
                }}
              />
              <ModalInput<IDestinationForm>
                register={register}
                fieldName="airportCode"
                label="Код аэропорта"
                type="text"
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
              <ModalInput<IDestinationForm>
                register={register}
                fieldName="timezone"
                label="Часовой пояс"
                type="text"
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
