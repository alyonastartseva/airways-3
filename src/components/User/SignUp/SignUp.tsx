import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userApi } from '@/services/user/user.service';
import { IFormUserCreate } from '@interfaces/account.interfaces';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Введите email').email('Формат email неверен'),
  securityQuestion: Yup.string(),
  answerQuestion: Yup.string().required('Введите ответ на секретный вопрос'),
  password: Yup.string()
    .required('Введите пароль')
    .min(5, 'Пароль должен быть длиннее 5 символов'),
  repeatPassword: Yup.string()
    .required('Введите пароль')
    .min(5, 'Пароль должен быть длиннее 5 символов')
    .oneOf([Yup.ref('password')], 'Пароль не совпадает'),
  checkbox: Yup.boolean()
    .oneOf([true], 'Примите условия пользовательского соглашения')
    .required('Примите условия пользовательского соглашения'),
});

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit: SubmitHandler<IFormUserCreate> = async (
    data: IFormUserCreate
  ) => {
    try {
      setIsLoading(true);
      const response = await userApi.postUser(data);
      if (response && response.error) {
        setError(response.error);
      } else {
        reset();
        navigate('/login');
      }
    } catch (err) {
      setError('Ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex bg="#EFEFEF" pt="5rem" pb="5rem" justify="center">
      <Box bg="#FFFFFF" w="38rem" h="auto" p="1.5rem 3rem" borderRadius="1rem">
        <form data-testid="form-reg" onSubmit={handleSubmit(handleFormSubmit)}>
          <Text fontSize="2rem" as="b">
            Регистрация
          </Text>
          <FormControl mt="1.75rem" isInvalid={errors?.email !== undefined}>
            <FormLabel htmlFor="email" fontSize="0.8rem" color="#4A4A4A">
              Email
            </FormLabel>
            <Input
              placeholder="Email"
              type="email"
              id="email"
              {...register('email')}
            />
            <FormErrorMessage>
              {errors?.email?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt="1.75rem">
            <FormLabel fontSize="0.8rem" color="#4A4A4A">
              Секретный вопрос
            </FormLabel>
            <Select
              data-testid="securityQuestion"
              {...register('securityQuestion')}
            >
              <option value="Как звали Вашего первого питомца?">
                Как звали Вашего первого питомца?
              </option>
              <option value="Имя Вашей матери?">Имя Вашей матери?</option>
              <option value="Какой Ваш любимый цвет?">
                Какой Ваш любимый цвет?
              </option>
            </Select>
          </FormControl>
          <FormControl
            mt="1.75rem"
            isInvalid={errors?.answerQuestion !== undefined}
          >
            <FormLabel
              fontSize="0.8rem"
              color="#4A4A4A"
              htmlFor="answerQuestion"
            >
              Ответ на секретный вопрос
            </FormLabel>
            <Input
              type="text"
              id="answerQuestion"
              placeholder="Ответ на секретный вопрос"
              {...register('answerQuestion')}
            />
            <FormErrorMessage>
              {errors?.answerQuestion?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt="1.75rem" isInvalid={errors?.password !== undefined}>
            <FormLabel fontSize="0.8rem" color="#4A4A4A" htmlFor="password">
              Пароль
            </FormLabel>
            <InputGroup>
              <Input
                placeholder="Пароль"
                type={show ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,}/,
                })}
              />
              <InputRightElement>
                <Text h="1.75rem" onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Text>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors?.password?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            mt="1.75rem"
            isInvalid={errors?.repeatPassword !== undefined}
          >
            <FormLabel
              fontSize="0.8rem"
              color="#4A4A4A"
              htmlFor="repeatPassword"
            >
              Повторить пароль
            </FormLabel>
            <InputGroup>
              <Input
                placeholder="Повторить пароль"
                type={show ? 'text' : 'password'}
                id="repeatPassword"
                {...register('repeatPassword', {
                  pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,}/,
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.repeatPassword?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt="2rem" isInvalid={errors?.checkbox !== undefined}>
            <Checkbox id="checkbox" {...register('checkbox')}>
              <FormLabel
                htmlFor="checkbox"
                mb="0"
                ml="0.75rem"
                fontSize="0.75rem"
                cursor="pointer"
                whiteSpace="nowrap"
              >
                Я прочитал(-а){' '}
                <Link color="#1DA1F2" textDecoration="underline">
                  условия пользовательского соглашения
                </Link>{' '}
                и согласен(-на) с ними
              </FormLabel>
            </Checkbox>
            <FormErrorMessage>
              {errors?.checkbox?.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          {error && (
            <Alert status="error" mb="1rem">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Flex justifyContent="center" mt="1rem">
            <Button bg="#006FFF" color="#FFFFFF" type="submit">
              {isLoading ? (
                <Spinner size="sm" color="white" />
              ) : (
                'Зарегистрироваться'
              )}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default SignUp;
