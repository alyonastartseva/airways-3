import {
  Button,
  FormControl,
  FormLabel,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  Input,
  Text,
  Box,
  Checkbox,
  Flex,
  Link,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAuthAdmin } from '@services/auth';

export interface IUserForm {
  username: string;
  password: string;
  checkbox: boolean;
}

export default function LoginAdminForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginAdmin } = useAuthAdmin();
  const mutation = useMutation(['login'], loginAdmin);

  const { register, handleSubmit, reset } = useForm<IUserForm>({
    mode: 'onBlur',
  });
  const handleFormSubmit: SubmitHandler<IUserForm> = (data, e) => {
    reset();
    const { username, password } = data;
    e?.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <>
      {!isOpen && (
        <Button onClick={onOpen} data-testid="modal-open">
          Sign in
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} data-testid="modal">
        <div data-testid="modal">
          <ModalOverlay />
          <ModalContent
            maxW="400px"
            m="2em auto"
            border="1px solid gray"
            borderRadius="5px"
            p="1em"
            pt="2em"
          >
            <ModalHeader display="flex" justifyContent="flex-end" p="0">
              <ModalCloseButton
                bg="none"
                w="fit-content"
                h="fit-content"
                p="0"
                data-testid="modal-close"
              />
            </ModalHeader>
            <ModalBody mt="1em">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Text fontSize="xl">Sign in to your account</Text>
                <FormControl w="100%" mt="1em">
                  <FormLabel htmlFor="username" mb="0">
                    Email address
                  </FormLabel>
                  <Input
                    w="100%"
                    h="30px"
                    type="email"
                    id="username"
                    {...register('username', { required: true })}
                  />
                </FormControl>
                <FormControl w="100%" mt="1em">
                  <FormLabel htmlFor="password" mb="0">
                    Password
                  </FormLabel>
                  <Input
                    w="100%"
                    type="password"
                    id="password"
                    h="30px"
                    {...register('password', { required: true })}
                  />
                </FormControl>
                <Flex mt="1em" w="100%" justifyContent="space-between">
                  <FormControl>
                    <Checkbox {...register('checkbox')}>Remember me</Checkbox>
                  </FormControl>
                  <Box w="fit-content">
                    <Link color="red" whiteSpace="nowrap">
                      Forgot password?
                    </Link>
                  </Box>
                </Flex>
                <Flex justifyContent="flex-end">
                  <Button color="white" mt="1.5em" type="submit" bg="red">
                    Sign in
                  </Button>
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </div>
      </Modal>
    </>
  );
}
