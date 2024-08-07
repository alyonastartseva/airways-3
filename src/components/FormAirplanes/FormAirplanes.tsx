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
import { useEffect, useMemo } from 'react';

import { EModalButtonTexts, modalSettings } from '@/constants';
import { modalSeatFields } from '@/constants/modal-constants/modal-seat-fields';
import {
  ButtonAddAdmin,
  ModalInput,
  HeadingAdmin,
  ButtonSubmitAdmin,
  SeatCategory,
} from '@/common';
import { ISeatCategory } from '@/interfaces/flightsSeats.interfaces';
import { useToastHandler } from '@/hooks/useToastHandler';
import { useAddAircraftWithSeatsMutation } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

import {
  IFormAirplanesProps,
  TFormAirplanesValues,
} from './form-airplanes.interfaces';

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
      category: ISeatCategory.BUSINESS,
      seatNumber: '',
    });
  };
  const toast = useToastHandler();
  const [addAircraft, { isError, error, isSuccess }] =
    useAddAircraftWithSeatsMutation();

  const onSubmit: SubmitHandler<TFormAirplanesValues> = (data) => {
    addAircraft(data);
    onClose();
  };

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toast({ status: 'error', title: error.data.message });
  }, [isError, toast, error]);

  useEffect(() => {
    if (isSuccess)
      toast({ status: 'success', title: 'Самолёт успешно добавлен' });
  }, [isSuccess, toast]);

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
                                  <SeatCategory />
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

export default FormAirplanes;
