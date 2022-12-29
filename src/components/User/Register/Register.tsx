import {
  useDisclosure,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  Link,
  AlertIcon,
  CloseButton,
  AlertTitle,
  AlertDescription,
  Alert,
  SlideFade,
} from "@chakra-ui/react";

import penIcon from "@images/svg/pen.svg";
import chevronIcon from "@images/svg/chevron.svg";

import { RegisterForm } from "../RegisterForm";
import { IFormValuesRegisterUser } from "@interfaces/form-values-register-user";
import flightsService from "@services/flights-service";
import { prepareFormData } from "@utils/form-data";

function Register() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  const onSubmit = async (values: IFormValuesRegisterUser) => {
    const data = prepareFormData(values);
    await flightsService.createUserAsPassenger(data).then(() => onOpen());
  };

  return (
    <Box>
      <Grid my={5} gridTemplateColumns={"7fr 6fr"}>
        <Box>
          <Box mx={10}>
            {isVisible && (
              <SlideFade in={isVisible} offsetY="20px">
                <Alert status="success" background="none">
                  <AlertIcon />
                  <Box w="100%">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                    You have been registered
                    </AlertDescription>
                  </Box>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={onClose}
                  />
                </Alert>
              </SlideFade>
            )}
            <Heading fontWeight="400" fontSize="24px" color="#0A66C2">
              Member Profile Details
            </Heading>
            <Box>
              <Flex justify="flex-end">
                <Image src={penIcon} />
                <Text fontSize="sm" textAlign="end" color="#0A66C2">
                  Edit
                </Text>
              </Flex>
            </Box>
            <RegisterForm onSubmit={onSubmit}/>
          </Box>
        </Box>
        <Box my="2rem" p="3rem 5rem">
          <Flex flexDirection="column">
            <Heading
              color="#0A66C2"
              fontFamily="Open Sans"
              fontStyle="normal"
              fontWeight="400"
              fontSize="24px"
              lineHeight="33px"
              mb={12}
            >
              Enjoy your Benefits with your UX AIR account.
            </Heading>
          </Flex>
          <Flex mb={10} columnGap={5} align="flex-start">
            <Image w={10} src={chevronIcon} />
            <Flex flexDirection="column" rowGap={6}>
              <Text fontSize="md">
                Create Your Account <b>free of charge</b>
              </Text>
              <Text fontSize="md">
                Save your personal information for <b>faster booking</b>
              </Text>
              <Text fontSize="md">
                <b>Receive special offers and deals</b> if you wish
              </Text>
              <Text fontSize="md">
                <b>Earn miles</b> as you Fly
              </Text>
              <Text fontSize="md">
                <b>Use your miles</b> for award tickets and ticket upgrades
              </Text>
              <Text fontSize="md">
                <b>Redeem Your miles</b> to purchase extra baggage and seat
              </Text>
            </Flex>
          </Flex>
          <Box mt="3rem">
            <Text>
              For more details, please visit:
              <Link color="#0A66C2" href="#">
                Membership Guide
              </Link>
            </Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Register;
