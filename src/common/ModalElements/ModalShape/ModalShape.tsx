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
import {
  SubmitHandler,
  useForm,
  FormProvider,
  Path,
  FieldValues,
} from 'react-hook-form';

import { modalSettings } from '@/constants/modal-constants/modal-settings';
import { ButtonSubmitAdmin } from '@common/ButtonSubmitAdmin';
import { ButtonAddAdmin } from '@common/ButtonAddAdmin';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { IModalProps } from '@/interfaces/modal-shape.interfaces';

import { ModalInput } from '../ModalInput';

const ModalShape = <T extends FieldValues>({ formName }: IModalProps) => {
  const [currentModal] = modalSettings.filter(
    (item) => item.formName === formName
  );
  const { fields, hook, name } = currentModal;

  const methods = useForm<T>({
    mode: 'onBlur',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync } = hook();

  const onSubmit: SubmitHandler<T> = async (data) => {
    await mutateAsync(data).then((response: { status: number }) => {
      if (response.status < 400) {
        methods.reset();
        onClose();
      }
    });
  };

  return (
    <div>
      <ButtonAddAdmin name={name} onClick={onOpen} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        blockScrollOnMount
        isCentered
        scrollBehavior="inside"
      >
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
              </ModalBody>
              <ModalFooter pt={0} pb={7} px={7}>
                <ButtonSubmitAdmin />
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default ModalShape;