import { ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  Link,
  Select,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useCountryQuery } from '@/hooks';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import InputField from '@common/InputField/InputField';
import SelectField from '@common/SelectField/SelectField';
import { IFormValuesRegisterUser } from '@interfaces/form-values-register-user.interfaces';
import { months, years, days } from '@utils/form-data.utils';

interface IRegisterForm {
  onSubmit: SubmitHandler<IFormValuesRegisterUser>;
}

const yupSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required().min(3, 'Password must be at 3 char long'),
    repeatPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Passwords does not match'),
    yearOfBirth: yup.number().required(),
    monthOfBirth: yup.number().required(),
    dayOfBirth: yup.number().required(),
    telNumber: yup.string().required(),
    telCode: yup.string().required(),
    country: yup.string().required(),
    email: yup.string().required().email(),
    question: yup.string().required(),
    answer: yup.string().required(),
  })
  .required();

const RegisterForm = ({ onSubmit }: IRegisterForm) => {
  const [show, setShow] = useState(false);

  const { data: countries, isLoading, isError } = useCountryQuery();

  const methods = useForm<IFormValuesRegisterUser>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      yearOfBirth: 0,
      monthOfBirth: 0,
      dayOfBirth: 0,
    },
  });

  const handleViewClick = () => setShow(!show);

  const monthsOptions = months.map((i) => (
    <option value={i + 1} key={i + 1}>
      {new Date(0, i + 1, 0).toLocaleDateString('en', { month: 'long' })}
    </option>
  ));

  const yearsOptions = years.map((year) => (
    <option style={{ marginLeft: '2rem' }} key={year} value={year}>
      {year}
    </option>
  ));

  const daysOptions = days.map((i) => (
    <option style={{ marginLeft: '2rem' }} key={i} value={i + 1}>
      {i + 1}
    </option>
  ));

  if (isLoading) {
    return <SpinnerBlock />;
  }

  if (!Array.isArray(countries) || countries.length == 0 || isError) {
    return <AlertMessage />;
  }

  return (
    <FormProvider {...methods}>
      <form
        data-testid="register-form"
        onSubmit={() => methods.handleSubmit(onSubmit)}
        name="register"
      >
        <Flex columnGap={2}>
          <InputField name="firstName" label="First name" />
          <InputField name="lastName" label="Last name" />
        </Flex>
        <Grid gridColumnGap={2} gridTemplateColumns="2fr 3fr 2fr" my={4}>
          <SelectField name="dayOfBirth" label="Day" options={daysOptions} />
          <SelectField
            name="monthOfBirth"
            label="Month"
            options={monthsOptions}
          />
          <SelectField name="yearOfBirth" label="Year" options={yearsOptions} />
        </Grid>
        <Divider border={1} />
        <Box my={4} position="relative" width={200}>
          <FormLabel
            color="#716f6f"
            fontWeight="400"
            fontSize="0.8rem"
            htmlFor="country"
          >
            Country of Residence
          </FormLabel>
          <Select
            border="0.0625rem solid #D9D9D9"
            boxShadow="0rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)"
            borderRadius="0.25rem"
            id="country"
            aria-label="country"
            {...methods.register('country')}
          >
            {countries &&
              countries.map(({ name }) => <option key={name}>{name}</option>)}
          </Select>
          {methods.formState.errors?.country && (
            <Text
              aria-label=""
              color="#E32E22"
              fontWeight="400"
              fontSize="0.75rem"
            >
              {methods.formState.errors.country.message}
            </Text>
          )}
        </Box>
        <Flex columnGap={2}>
          <InputField name="email" label="E-mail Address" typeField="email" />
          <Box width="100%">
            <FormLabel
              color="#716f6f"
              fontWeight="400"
              fontSize="0.8rem"
              htmlFor="tel"
              m={0}
            >
              Mobile Number
            </FormLabel>
            <Flex position="relative">
              <FormLabel
                display="inline-block"
                position="absolute"
                left="0.3rem"
                top="0.3rem"
                color="#0A66C2"
                fontWeight="400"
                fontSize="0.6rem"
                textAlign="center"
              >
                Code
              </FormLabel>
              <Select
                border="0.0625rem solid #D9D9D9"
                boxShadow="0rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)"
                borderRadius="0.25rem 0rem 0rem 0.25rem"
                width="40%"
                aria-label="telCode"
                id="telCode"
                {...methods.register('telCode')}
              >
                {countries &&
                  countries.map(({ callingCodes }) =>
                    callingCodes.map((code: string) => (
                      <option value={`+${code}`} key={code}>
                        +{code}
                      </option>
                    ))
                  )}
              </Select>
              <Input
                border="0.0625rem solid #D9D9D9"
                boxShadow="0rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)"
                borderRadius="0rem 0.25rem 0.25rem 0rem"
                id="tel"
                type="tel"
                placeholder="(xxx) XXX XX  XX"
                aria-label="tel"
                {...methods.register('telNumber')}
              />
            </Flex>
            {methods.formState.errors?.telNumber && (
              <Text color="#E32E22" fontWeight="400" fontSize="1rem">
                {methods.formState.errors.telNumber.message}
              </Text>
            )}
            {methods.formState.errors?.telCode && (
              <Text color="#E32E22" fontWeight="400" fontSize="1rem">
                {methods.formState.errors.telCode.message}
              </Text>
            )}
          </Box>
        </Flex>
        <Divider my={5} />
        <Flex>
          <Box mr={2} width="100%">
            <FormLabel
              color="#716f6f"
              fontWeight="400"
              fontSize="0.8rem"
              htmlFor="password"
            >
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                position="relative"
                border="0.0625rem solid #D9D9D9"
                boxShadow="0rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)"
                borderRadius="0.25rem"
                id="password"
                aria-label="password"
                type={show ? 'text' : 'password'}
                {...methods.register('password')}
              />
              <ViewIcon
                onClick={() => handleViewClick()}
                color="#BDBDBD"
                cursor="pointer"
                position="absolute"
                right="0.5rem"
                top="0.8rem"
                _hover={{ color: '#0A66C2' }}
              />
            </InputGroup>
            {methods.formState.errors?.password && (
              <Text color="#E32E22" fontWeight="400" fontSize="1rem">
                {methods.formState.errors.password.message}
              </Text>
            )}
          </Box>
          <Box width="100%">
            <FormLabel
              color="#716f6f"
              fontWeight="400"
              fontSize="0.8rem"
              htmlFor="repeatPassword"
            >
              Repeat Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                position="relative"
                border="0.0625rem solid #D9D9D9"
                boxShadow="0rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)"
                borderRadius="0.25rem"
                aria-label="repeatPassword"
                id="repeatPassword"
                type={show ? 'text' : 'password'}
                {...methods.register('repeatPassword')}
              />
              <ViewIcon
                onClick={handleViewClick}
                color="#BDBDBD"
                cursor="pointer"
                position="absolute"
                right="0.5rem"
                top="0.8rem"
                _hover={{ color: '#0A66C2' }}
              />
            </InputGroup>
            {methods.formState.errors?.repeatPassword && (
              <Text color="#E32E22" fontWeight="400" fontSize="1rem">
                {methods.formState.errors.repeatPassword.message}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex />
        <Flex columnGap={2} my={5}>
          <Box width="100%">
            <FormLabel
              color="#716f6f"
              fontWeight="400"
              fontSize="0.8rem"
              htmlFor="question"
              m={0}
            >
              Security question
            </FormLabel>
            <Select
              border="0.0625rem solid #D9D9D9"
              boxShadow="0rem 0.125rem 0.125rem rgba(0, 0, 0, 0.25)"
              borderRadius="0.25rem"
              id="question"
              aria-label="question"
              {...methods.register('question')}
            >
              {/* {countries &&
                countries.map(({ callingCodes }) =>
                  callingCodes.map((code) => (
                    <option value={`+${code}`} key={code}>
                      +{code}
                    </option>
                  ))
                )} */}
            </Select>
            {methods.formState.errors?.question && (
              <Text color="#E32E22" fontWeight="400" fontSize="1rem">
                {methods.formState.errors.question.message}
              </Text>
            )}
          </Box>
          <Box width="100%">
            <InputField name="answer" label="Answer Security Question" />
          </Box>
        </Flex>
        <Flex align="flex-end" flexDirection="column">
          <Button
            data-testid="register-agree"
            color="#0A66C2"
            fontSize="1.2rem"
          >
            By clicking “Create Account”, I agree to
            <Link
              data-testid="register-agree-link"
              href="/terms-and-conditions"
              target="_blank"
            >
              <u>Terms and Conditions.</u>
            </Link>
          </Button>
          <Button
            data-testid="register-submit-btn"
            mt={4}
            colorScheme="teal"
            isLoading={methods.formState.isSubmitting}
            type="submit"
            id="submit"
            background="#E32E22"
            boxShadow="0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)"
          >
            Create Account
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
