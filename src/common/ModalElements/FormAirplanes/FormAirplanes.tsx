import {
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  Box,
  CloseButton,
  Flex,
  FormLabel,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { ButtonAddAdmin } from '@common/ButtonAddAdmin';
import { EModalButtonTexts } from '@constants/modal-constants/modal-names';
import { modalSettings } from '@constants/modal-constants/modal-settings';
import { ModalInput } from '@common/ModalElements/ModalInput';
import { seatCategory } from '@constants/constants';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { ButtonSubmitAdmin } from '@common/ButtonSubmitAdmin';
import { modalSeatFields } from '@constants/modal-constants/modal-seat-fields';
import {
  IFormAirplanesProps,
  TFormAirplanesValues,
} from '@common/ModalElements/FormAirplanes/form-airplanes.interfaces';
import { usePostAircraftWithSeats } from '@hooks/usePostAircraftWithSeats';

const seatCategoryOptions = seatCategory.map((el) => (
  <option key={el.eng} value={el.eng}>
    {el.ru}
  </option>
));

const seatNumberRules = modalSeatFields.filter(
  (item) => item.fieldName === 'seatNumber'
)[0].rules;

const FormAirplanes = <T extends FieldValues>({
  formName,
  onClose,
}: IFormAirplanesProps) => {
  const methods = useForm<TFormAirplanesValues>({
    mode: 'onBlur',
    defaultValues: {
      seats: [],
    },
  });

  const { control, handleSubmit } = methods;

  const {
    fields: fieldsArray,
    append,
    remove,
  } = useFieldArray({
    name: 'seats',
    control,
  });

  const [{ fields, name }] = useMemo(
    () => modalSettings.filter((item) => item.formName === formName),
    [formName]
  );

  const onAddField = () => {
    append({
      id: 0,
      isLockedBack: true,
      isNearEmergencyExit: false,
      category: 'BUSINESS',
      seatNumber: '',
    });
  };

  const { mutateAsync } = usePostAircraftWithSeats();

  const onSubmit: SubmitHandler<TFormAirplanesValues> = async (data) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={6} px={7}>
            <HeadingAdmin name={name} />
          </ModalHeader>
          <ModalCloseButton m={3} bg="transparent" border="none" />
          <ModalBody mt={0} px={7}>
            <FormLabel
              htmlFor={formName}
              fontSize={14}
              fontStyle="italic"
              w="100%"
              mb={5}
              color="#393939"
              fontWeight="400"
            >
              {fields.map((field) => {
                const { fieldName, typeInput, ...fieldRest } = field;

                if (typeInput === 'add') {
                  return (
                    <FormLabel
                      key={fieldName}
                      htmlFor={formName}
                      fontSize={14}
                      fontStyle="italic"
                      w="100%"
                      mb={5}
                      color="#393939"
                      fontWeight="400"
                    >
                      {field.label}
                      <Box w="100%" mt={2} mb={1}>
                        {fieldsArray.map((fieldArray, id) => {
                          return (
                            <Flex
                              key={id}
                              border="1px solid #cbbaba"
                              p="16px"
                              pb="27px"
                              justifyContent="space-between"
                              mb={4}
                            >
                              <Box w="260px">
                                <ModalInput
                                  label="ID сиденья"
                                  fieldName={`seats.${id}.id`}
                                  typeInput="hidden"
                                />
                                <ModalInput
                                  label="Номер сиденья"
                                  value={fieldArray.seatNumber}
                                  rules={seatNumberRules}
                                  fieldName={`seats.${id}.seatNumber`}
                                />
                                <ModalInput
                                  label="Класс"
                                  type="select"
                                  value={fieldArray.category}
                                  fieldName={`seats.${id}.category`}
                                >
                                  {seatCategoryOptions}
                                </ModalInput>
                                <ModalInput
                                  checkbox={true}
                                  label="Неподвижное сиденье"
                                  fieldName={`seats.${id}.isLockedBack`}
                                />
                                <ModalInput
                                  checkbox={true}
                                  label="Рядом с экстренным выходом"
                                  fieldName={`seats.${id}.isNearEmergencyExit`}
                                />
                              </Box>
                              <CloseButton
                                m={3}
                                bg="transparent"
                                border="none"
                                onClick={() => remove(id)}
                              />
                            </Flex>
                          );
                        })}
                        <ButtonAddAdmin
                          name={EModalButtonTexts.SEAT}
                          onClick={onAddField}
                        />
                      </Box>
                    </FormLabel>
                  );
                }

                return (
                  <ModalInput<T>
                    key={fieldName}
                    fieldName={fieldName as Path<T>}
                    {...fieldRest}
                  >
                    {field.children}
                  </ModalInput>
                );
              })}
            </FormLabel>
          </ModalBody>
          <ModalFooter pt={0} pb={7} px={7}>
            <ButtonSubmitAdmin />
          </ModalFooter>
        </ModalContent>
      </form>
    </FormProvider>
  );
};

export { FormAirplanes };
