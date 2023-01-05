import { useState, useEffect } from "react";
import { IFormValuesRegisterUser } from "@interfaces/form-values-register-user";
import { ICountry } from "@interfaces/country";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  Input,
  Select,
  Divider,
  InputGroup,
  Link,
  Text,
} from "@chakra-ui/react";

import { ViewIcon } from "@chakra-ui/icons";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@common/Form/Input";
import SelectField from "@common/Form/Select";
import { years, months, getAllDaysInMonth } from "@utils/form-data";

const yupSchema = yup
  .object()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    password: yup.string().required().min(3, "Password must be at 3 char long"),
    repeatPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords does not match"),
    yearOfBirth: yup.string().required(),
    monthOfBirth: yup.string().required(),
    dayOfBirth: yup.string().required(),
    telNumber: yup.string().required(),
    telCode: yup.string().required(),
  })
  .required();

function RegisterForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<IFormValuesRegisterUser>;
}) {
  const fetchCountries = async () => {
    const countriesRequest = await fetch("https://restcountries.com/v2/all");
    const countriesData = await countriesRequest.json();

    const countriesList = countriesData.map(
      ({ name, callingCodes }: ICountry) => {
        return { name, callingCodes };
      }
    );
    setCountries(countriesList);
  };

  const [countries, setCountries] = useState<ICountry[]>();

  useEffect(() => {
    fetchCountries();
  }, []);

  const methods = useForm<IFormValuesRegisterUser>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      yearOfBirth: 0,
      monthOfBirth: 0,
      dayOfBirth: 0,
    },
  });

  const [show, setShow] = useState(false);
  const handleViewClick = () => setShow(!show);

  const monthsOptions = months.map((i) => {
    return (
      <option value={i + 1} key={i + 1}>
        {new Date(0, i + 1, 0).toLocaleDateString("en", { month: "long" })}
      </option>
    );
  });

  const yearsOptions = years.map((year) => (
    <option style={{ marginLeft: "2rem" }} key={year} value={year}>
      {year}
    </option>
  ));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} name="register">
        <Flex columnGap={2}>
          <InputField name="firstName" label="First name" />
          <InputField name="lastName" label="Last name" />
        </Flex>
        <Grid gridColumnGap={2} gridTemplateColumns="2fr 3fr 2fr" my={4}>
          <SelectField
            name="dayOfBirth"
            label="Day"
            options={getAllDaysInMonth(
              methods.watch("monthOfBirth"),
              methods.watch("yearOfBirth")
            ).map((day, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          />
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
            border="1px solid #D9D9D9"
            boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
            borderRadius="4px"
            id="country"
            aria-label="country"
            {...methods.register("country")}
          >
            <option value=""></option>
            {countries &&
              countries.map(({ name }) => <option key={name}>{name}</option>)}
          </Select>
          {methods.formState.errors?.country && (
            <Text
              aria-label=""
              color="#E32E22"
              fontWeight="400"
              fontSize="12px"
            >
              {methods.formState.errors.country.message}
            </Text>
          )}
        </Box>
        <Flex columnGap={2}>
          <InputField name="email" label="E-mail Adress" type="email" />
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
                border="1px solid #D9D9D9"
                boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
                borderRadius="4px 0px 0px 4px"
                width="40%"
                aria-label="telCode"
                id="telCode"
                {...methods.register("telCode")}
              >
                <option value=""></option>
                {countries &&
                  countries.map(({ callingCodes }) => {
                    return callingCodes.map((code) => {
                      return (
                        <option value={`+${code}`} key={code}>
                          +{code}
                        </option>
                      );
                    });
                  })}
              </Select>
              <Input
                border="1px solid #D9D9D9"
                boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
                borderRadius="0px 4px 4px 0px"
                id="tel"
                type="tel"
                placeholder="(xxx) XXX XX  XX"
                aria-label="tel"
                {...methods.register("telNumber")}
              ></Input>
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
                border="1px solid #D9D9D9"
                boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
                borderRadius="4px"
                id="password"
                aria-label="password"
                type={show ? "text" : "password"}
                {...methods.register("password")}
              />
              <ViewIcon
                onClick={() => handleViewClick()}
                color="#BDBDBD"
                cursor="pointer"
                position="absolute"
                right="0.5rem"
                top="0.8rem"
                _hover={{ color: "#0A66C2" }}
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
                border="1px solid #D9D9D9"
                boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
                borderRadius="0.25rem"
                aria-label="repeatPassword"
                id="repeatPassword"
                type={show ? "text" : "password"}
                {...methods.register("repeatPassword")}
              />
              <ViewIcon
                onClick={handleViewClick}
                color="#BDBDBD"
                cursor="pointer"
                position="absolute"
                right="0.5rem"
                top="0.8rem"
                _hover={{ color: "#0A66C2" }}
              />
            </InputGroup>
            {methods.formState.errors?.repeatPassword && (
              <Text color="#E32E22" fontWeight="400" fontSize="1rem">
                {methods.formState.errors.repeatPassword.message}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex></Flex>
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
              border="1px solid #D9D9D9"
              boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
              borderRadius="4px"
              id="question"
              aria-label="question"
              {...methods.register("question")}
            >
              <option></option>
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
          <Link color="#0A66C2" href="#" fontSize="1.2rem">
            By clicking “Create Account”, I agree to{" "}
            <u>Terms and Conditions.</u>
          </Link>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={methods.formState.isSubmitting}
            type="submit"
            id="submit"
            background="#E32E22"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          >
            Create Account
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}

export default RegisterForm;
