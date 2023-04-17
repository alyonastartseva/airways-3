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
import { TFlightsPost } from '@/interfaces/flights.interfaces';
import useFlightsPost from '@/hooks/useFlightsPost';
import { aircraftList } from '@/services/flights.service';
import { flightStatuses } from '@/constants/constants';

import { ButtonAddAdmin } from '../ButtonAddAdmin';

const ModalFlights = ({ name }: IModalFormPage) => {
  const { register, handleSubmit, reset } = useForm<TFlightsPost>({
    mode: 'onBlur',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutateAsync: createFlight } = useFlightsPost();

  const onSubmit: SubmitHandler<TFlightsPost> = async (data) => {
    await createFlight(data).then((response) => {
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
              <HeadingAdmin name={name} />
            </ModalHeader>
            <ModalCloseButton m={3} bg="transparent" border="none" />
            <ModalBody pt={0} px={7}>
              <ModalInput<TFlightsPost>
                register={register}
                fieldName="code"
                label="Код(Рейс)"
                rules={{
                  required: 'Код(Рейс)',
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
              <ModalInput<TFlightsPost>
                register={register}
                fieldName="from.cityName"
                label="Город откуда"
                typeInput="text"
                rules={{
                  required: 'Введите город',
                  minLength: { value: 2, message: 'Минимум 2 символа' },
                  maxLength: { value: 15, message: 'Максимум 15 символов' },
                }}
              />
              <ModalInput<TFlightsPost>
                register={register}
                fieldName="to.cityName"
                label="Город куда"
                typeInput="text"
                rules={{
                  required: 'Введите город',
                  minLength: { value: 2, message: 'Минимум 2 символа' },
                  maxLength: { value: 15, message: 'Максимум 15 символов' },
                }}
              />
              <ModalInput<TFlightsPost>
                register={register}
                fieldName="departureDateTime"
                label="Дата отбытия"
                typeInput="datetime-local"
                rules={{
                  required: 'Введите дату отбытия',
                  min: String(new Date().getFullYear()),
                }}
              />
              <ModalInput<TFlightsPost>
                register={register}
                fieldName="arrivalDateTime"
                label="Дата прибытия"
                typeInput="datetime-local"
                rules={{
                  required: 'Введите дату прибытия',
                  min: String(new Date().getFullYear()),
                }}
              />
              <ModalInput<TFlightsPost>
                select={true}
                register={register}
                fieldName="aircraftId"
                label="Модель самолета"
                rules={{
                  required: 'Введите модель самолета',
                }}
              >
                {aircraftList.map((el) => (
                  <option key={el.model} value={el.id}>
                    {el.model}
                  </option>
                ))}
              </ModalInput>

              <ModalInput
                select={true}
                register={register}
                fieldName="flightStatus"
                label="Cтатус"
                rules={{
                  required: 'Укажите статус',
                }}
              >
                {flightStatuses.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </ModalInput>
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

export default ModalFlights;
