import { useState } from 'react';
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
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuthAdmin } from '@services/auth.service';
import { useAuth } from '@/hooks/useAuth';
import ELinks from '@services/adminRouterLinks.service';
import { SpinnerBlock } from '@/common/SpinnerBlock';

interface IUserForm {
  username: string;
  password: string;
  checkbox: boolean;
}

const LoginAdminForm = () => {
  const { loginAdmin } = useAuthAdmin();
  const { isAdmin, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation(['login'], loginAdmin);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { register, handleSubmit, reset } = useForm<IUserForm>({
    mode: 'onBlur',
  });

  if (mutation.isLoading) return <SpinnerBlock />;

  const handleFormSubmit: SubmitHandler<IUserForm> = (data) => {
    // e?.preventDefault();
    reset();

    const { username, password } = data;
    mutation.mutate({ username, password });

    if (!mutation.isError) {
      navigate(ELinks.ADMIN_PASSENGERS, { replace: true });
      setIsAdmin(true);
    }
  };

  if (isAdmin) return <Navigate to={ELinks.ADMIN_PASSENGERS} />;

  return (
    <>
      <Box mt="12.05rem" mb="12.05rem">
        <Box
          w="25rem"
          m="0 auto"
          border="0.0625rem solid"
          py="1rem"
          px="3rem"
          borderColor="#D9D9D9"
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
            onClick={() =>
              !isAdmin && <Navigate to={ELinks.ADMIN_PASSENGERS} />
            }
          />
          <div>
            <form data-testid="modal" onSubmit={handleSubmit(handleFormSubmit)}>
              <Text fontSize="md" mb="3rem" mt="2rem">
                Sign in to your account
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
                  size="md"
                  type="email"
                  id="username"
                  {...register('username', { required: true })}
                />
              </FormControl>
              <FormControl w="100%" mt="1em">
                <FormLabel htmlFor="password" mb="0" fontSize="0.75rem">
                  Password
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    borderColor={mutation.isError ? 'red' : 'inherit'}
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
                  <Checkbox id="checkbox" {...register('checkbox')}>
                    <FormLabel
                      htmlFor="checkbox"
                      mb="0"
                      fontSize="0.75rem"
                      cursor="pointer"
                    >
                      Remember me
                    </FormLabel>
                  </Checkbox>
                </FormLabel>
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
          </div>
        </Box>
      </Box>
    </>
  );
};

export default LoginAdminForm;
