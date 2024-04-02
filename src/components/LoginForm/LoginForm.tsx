import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

import EmptyPasswordIcon from '@/common/icons/EmptyPasswordIcon';
import { ELinks } from '@services/constants';
import emailPattern from '@constants/validate-patterns/email-pattern';

interface IUserForm {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    formState: { errors },
  } = useForm<IUserForm>({
    mode: 'onBlur',
  });

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Flex
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="#efefef"
      >
        <Box
          width="550px"
          p={10}
          pb={4}
          backgroundColor="white"
          borderRadius="xl"
          boxShadow="md"
        >
          <Heading mb={4} size="lg">
            Вход
          </Heading>
          <form>
            <FormControl id="email" mb={4} isInvalid={errors.username != null}>
              <FormLabel>Email</FormLabel>
              <Input
                borderColor="blue.500"
                size="md"
                type="email"
                id="username"
                {...register('username', {
                  pattern: emailPattern.email,
                  required: 'Поле обязательно к заполнению',
                })}
              />
              {errors.username && (
                <Text color="red.500" marginTop="0.25rem" fontSize="sm">
                  Введите email
                </Text>
              )}
            </FormControl>

            <FormControl
              id="password"
              mb={6}
              isInvalid={errors.password != null}
            >
              <FormLabel>Пароль</FormLabel>
              <InputGroup>
                <Input
                  borderColor="blue.500"
                  type={show ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'Поле обязательно к заполнению',
                  })}
                />
                <InputRightElement width="3rem">
                  <Text h="1.75rem" onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Text>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Flex>
                  <EmptyPasswordIcon />
                  <Text
                    color="red.500"
                    marginTop="0.25rem"
                    marginLeft="-0.5rem"
                    fontSize="sm"
                  >
                    Введите пароль
                  </Text>
                </Flex>
              )}
            </FormControl>

            <Text mb={4} textAlign="center">
              Ещё нет аккаунта?{' '}
              <Link color="gray.700" href={ELinks.REGISTRATION}>
                Зарегистрируйтесь
              </Link>
            </Text>

            <Flex justifyContent="center">
              <Button
                colorScheme="blue"
                width="70px"
                backgroundColor="#006FFF"
                type="submit"
              >
                Войти
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default LoginForm;
