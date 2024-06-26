import { useState } from 'react';
import { useMutation } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react';
import { CloseIcon, ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

import { ELinks, useAuthAdmin } from '@/services';
import { SpinnerBlock } from '@/common';
import { useAuth } from '@/hooks';

interface IUserForm {
  username: string;
  password: string;
  checkbox: boolean;
}

const LoginAdminForm = () => {
  const { loginAdmin } = useAuthAdmin();
  const { isAdmin, setIsAdmin } = useAuth();

  const navigate = useNavigate();

  const mutation = useMutation(['login'], loginAdmin, {
    onSuccess: () => {
      reset();
      navigate(ELinks.ADMIN_PASSENGERS, { replace: true });
      setIsAdmin(true);
    },
    onError: () => {
      setIsAdmin(false);
    },
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { register, handleSubmit, reset } = useForm<IUserForm>({
    mode: 'onBlur',
  });

  if (mutation.isLoading) return <SpinnerBlock />;

  const handleFormSubmit: SubmitHandler<IUserForm> = (data) => {
    // e?.preventDefault();
    const { username, password } = data;
    mutation.mutate({ username, password });
  };

  if (isAdmin) return <Navigate to={ELinks.ADMIN_PASSENGERS} />;

  return (
    <>
      <Box mt="5.05rem" mb="8.05rem">
        <Box
          w="27rem"
          m="0 auto"
          border="0.0625rem solid"
          py="3rem"
          px="3rem"
          borderColor="#D9D9D9"
          borderRadius={2}
          boxShadow="lg"
          color="rgba(78, 76, 76, 0.71);"
          pos="relative"
        >
          <CloseIcon
            data-testid="modal-close"
            color="blue"
            float="right"
            pos="absolute"
            right="1rem"
            top="1rem"
            cursor="pointer"
            onClick={() => !isAdmin && navigate(-1)}
          />
          <div>
            <form data-testid="modal" onSubmit={handleSubmit(handleFormSubmit)}>
              <Text fontSize="md" mb="3rem" mt="2rem">
                Зайти как админ
              </Text>
              <Text fontSize="md" color="red">
                {mutation.isError ? 'Ошибка при Авторизации' : null}
              </Text>

              <FormControl w="100%" mt="1em">
                <FormLabel
                  htmlFor="username"
                  mb="0"
                  fontSize="0.75rem"
                  color="rgba(78, 76, 76, 0.71);"
                >
                  Email address
                </FormLabel>
                <Input
                  borderColor={mutation.isError ? 'red' : 'inherit'}
                  boxShadow="md"
                  size="md"
                  type="email"
                  id="username"
                  {...register('username', { required: true })}
                />
              </FormControl>
              <FormControl w="100%" mt="1em">
                <FormLabel htmlFor="password" mb="0" fontSize="0.75rem">
                  Пароль
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    borderColor={mutation.isError ? 'red' : 'inherit'}
                    boxShadow="md"
                    type={show ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: true })}
                  />
                  <InputRightElement width="2.5rem">
                    <Text h="1.75rem" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Text>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex
                mt="2.5rem"
                mb="2rem"
                w="100%"
                justifyContent="space-between"
                fontSize="0.75rem"
              >
                <FormLabel fontSize="0.75rem" htmlFor="checkbox">
                  <Checkbox
                    borderColor="#7F82C9"
                    id="checkbox"
                    {...register('checkbox')}
                  >
                    <FormLabel
                      htmlFor="checkbox"
                      mb="0"
                      fontSize="0.75rem"
                      cursor="pointer"
                    >
                      Запомни меня таким какой я есть
                    </FormLabel>
                  </Checkbox>
                </FormLabel>
                <Box w="fit-content">
                  <Link color="red" whiteSpace="nowrap">
                    Забыл меня?
                  </Link>
                </Box>
              </Flex>
              <Flex justifyContent="flex-end">
                <Button
                  boxShadow="md"
                  color="white"
                  mt="1.5em"
                  type="submit"
                  bg="red"
                  w="7rem"
                >
                  Войти
                </Button>
              </Flex>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default LoginAdminForm;
