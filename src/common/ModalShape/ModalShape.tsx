import {
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
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

import { FormAirplanes } from '@/components';
import { modalSettings, EModalNames } from '@/constants';
import { ButtonSubmitAdmin } from '@common/ButtonSubmitAdmin';
import { ButtonAddAdmin } from '@common/ButtonAddAdmin';
import { HeadingAdmin } from '@common/HeadingAdmin';

import { ModalInput } from '../ModalInput';

import { IModalProps, TSettings } from './modal-shape.interfaces';

const ModalShape = <T extends FieldValues>({
  formName,
  initialFormValues,
}: IModalProps) => {
  const [currentModal] = modalSettings.filter(
    (item) => item.formName === formName
  ) as TSettings;
  const { fields, hook, name, mapFieldValuesToRequestData } = currentModal;

  const methods = useForm<T>({
    mode: 'onBlur',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const mutate = hook();

  const onModalClose = () => {
    methods.reset();
    onClose();
  };

  const onSubmit: SubmitHandler<T> = async (data) => {
    const requestData = mapFieldValuesToRequestData
      ? mapFieldValuesToRequestData?.(data)
      : data;

    mutate(requestData);
    onModalClose();
  };

  return (
    <>
      <ButtonAddAdmin name={name} onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onModalClose}
        size="xl"
        blockScrollOnMount
        isCentered
        scrollBehavior="outside"
      >
        {formName === EModalNames.AIRPLANES ? (
          <FormAirplanes<T> formName={formName} onClose={onClose} />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader py={6} px={7}>
                  <HeadingAdmin name={name} />
                </ModalHeader>
                <ModalCloseButton m={3} bg="transparent" border="none" />
                <ModalBody mt={0} px={7}>
                  {fields.map((field) => {
                    const { fieldName, ...fieldRest } = field;
                    const defaultValue =
                      initialFormValues && fieldName in initialFormValues
                        ? initialFormValues[fieldName]
                        : undefined;

                    return (
                      <ModalInput<T>
                        key={fieldName}
                        fieldName={fieldName as Path<T>}
                        value={defaultValue}
                        {...fieldRest}
                      >
                        {field.children}
                      </ModalInput>
                    );
                  })}
                </ModalBody>
                <ModalFooter pt={0} pb={7} px={7}>
                  <ButtonSubmitAdmin />
                </ModalFooter>
              </ModalContent>
            </form>
          </FormProvider>
        )}
      </Modal>
    </>
  );
};

export default ModalShape;
