import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  IconButton,
  Flex,
} from '@chakra-ui/react';

import { TrashCanIcon, WarningCircleIcon } from '@/common/icons';

import { IConfirmCancelModal } from './confirmCancelModal.interface';

const ConfirmCancelModal = ({
  isOpen,
  onClose,
  onDelete,
  modalText,
}: IConfirmCancelModal) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent
      width="406px"
      height="216px"
      borderRadius="16px"
      boxShadow="0 4px 4px 0 rgba(0, 0, 0, 0.25)"
      background="white"
      margin="auto"
      padding="12px"
    >
      <Flex direction="column" alignItems="center" margin="0 auto">
        <ModalHeader
          fontWeight="600"
          fontSize="16px"
          lineHeight="125%"
          marginBottom="14px"
          padding="0"
          color="black"
        >
          Подтвердите действие
        </ModalHeader>
        <IconButton
          position="absolute"
          right="8px"
          top="8px"
          aria-label="Подробнее о предупреждении"
          icon={<WarningCircleIcon />}
          variant="unstyled"
          border="none"
          _focus={{
            outline: 'none',
            boxShadow: 'none',
          }}
          onClick={() => {
            /* обработчик клика */
          }}
        />
        <ModalBody
          width="200px"
          fontSize="12px"
          lineHeight="117%"
          fontWeight="400"
          textAlign="center"
          marginBottom="45px"
          padding="0"
          color="#808080"
        >
          {modalText}
        </ModalBody>
      </Flex>
      <ModalFooter flexDirection="column" padding="0">
        <Button
          width="100%"
          height="40px"
          padding="10px 0"
          border="1px solid #F55B51"
          borderRadius="4px"
          background="#F55B51"
          colorScheme="red"
          color="white"
          boxShadow="0 4px 4px 0 rgba(0, 0, 0, 0.25)"
          marginBottom="6px"
          fontWeight="600"
          fontSize="14px"
          rightIcon={<TrashCanIcon />}
          onClick={onDelete}
        >
          Удалить
        </Button>
        <Button
          width="100%"
          height="40px"
          border="1px solid #A3A3A3"
          borderRadius="4px"
          background="white"
          padding="10px 0"
          fontWeight="600"
          fontSize="14px"
          color="black"
          onClick={onClose}
        >
          Отменить
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmCancelModal;
