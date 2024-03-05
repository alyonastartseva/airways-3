import { AddIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
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
import { IModalProps } from '@/common/ModalElements/ModalShape/modal-shape.interfaces';

import { ModalInput } from '../ModalInput';

const ModalShape = <T extends FieldValues>({ formName }: IModalProps) => {
  const [currentModal] = modalSettings.filter(
    (item) => item.formName === formName
  );
  const { fields, hook, name, mapFieldValuesToRequestData } = currentModal;

  const methods = useForm<T>({
    mode: 'onBlur',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutateAsync } = hook();

  const onSubmit: SubmitHandler<T> = async (data) => {
    const requestData = mapFieldValuesToRequestData
      ? mapFieldValuesToRequestData?.(data)
      : data;
    await mutateAsync(requestData).then((response: { status: number }) => {
      if (response.status < 400) {
        methods.reset();
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
        scrollBehavior="outside"
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
                {name === 'Добавить самолет' ? (
                  <Button
                    rightIcon={<AddIcon boxSize="3" />}
                    border="1px solid #DEDEDE"
                    borderRadius="2"
                    boxShadow="0px 5px 5px rgba(0, 0, 0, 0.06)"
                    bgColor="#F9F9F9"
                    fontSize="14px"
                    fontWeight="500"
                    _hover={{
                      backgroundColor: '#398AEA',
                      borderColor: '#398AEA',
                      color: '#FFFFFF',
                    }}
                  >
                    Добавить сиденье
                  </Button>
                ) : null}
              </ModalBody>
              <ModalFooter pt={0} pb={7} px={7}>
                <ButtonSubmitAdmin />
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default ModalShape;
