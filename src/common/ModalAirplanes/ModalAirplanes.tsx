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
import { IModalFormPage } from '@interfaces/table.interfaces';
import { useAirplanePost } from '@hooks/useAirplanePost';

import { ButtonAddAdmin } from '../ButtonAddAdmin';

interface IAirplanesForm extends FieldValues {
  model: string;
  aircraftNumber: number;
  modelYear: number;
  flightRange: number;
}

const ModalAirplanes = ({ name }: IModalFormPage) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAirplanesForm>({ mode: 'onBlur' });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync: createAircraft } = useAirplanePost();

  const onSubmit: SubmitHandler<IAirplanesForm> = async (data) => {
    await createAircraft(data).then((response) => {
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
              <HeadingAdmin name="Добавить самолет" />
            </ModalHeader>
            <ModalCloseButton m={3} bg="transparent" border="none" />
            <ModalBody pt={0} px={7}>
              <ModalInput<IAirplanesForm>
                register={register}
                fieldName="model"
                label="Модель"
                errorMessage={errors.model?.message}
                rules={{
                  required: 'Введите модель самолёта',
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
              <ModalInput<IAirplanesForm>
                register={register}
                fieldName="aircraftNumber"
                label="Номер самолёта"
                type="number"
                errorMessage={errors.aircraftNumber?.message}
                rules={{
                  required: 'Введите модель самолёта',
                  minLength: { value: 4, message: 'Минимум 4 символа' },
                  maxLength: { value: 30, message: 'Максимум 30 символов' },
                }}
              />
              <ModalInput<IAirplanesForm>
                register={register}
                fieldName="modelYear"
                label="Год выпуска"
                type="number"
                errorMessage={errors.modelYear?.message}
                rules={{
                  required: 'Введите год выпуска самолёта',
                  min: {
                    value: 1920,
                    message: 'Дата должна быть выше или равна 1920 году',
                  },
                  max: {
                    value: new Date().getFullYear(),
                    message: `Год выпуска не может быть новее ${new Date().getFullYear()} года`,
                  },
                }}
              />
              <ModalInput<IAirplanesForm>
                register={register}
                fieldName="flightRange"
                label="Дальность полёта (км)"
                type="number"
                errorMessage={errors.flightRange?.message}
                rules={{
                  required: 'Введите длину полёта',
                  min: {
                    value: 0,
                    message: 'Длина полета не может быть отрицательной',
                  },
                  max: {
                    value: 41467,
                    message: 'Ваше значение выше рекорда 41 467км',
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

export default ModalAirplanes;
