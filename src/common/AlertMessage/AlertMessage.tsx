import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const AlertMessage = () => (
  <Flex minHeight="81vh" justifyContent="center" alignItems="center">
    <Alert status="error" justifyContent="center" width="20rem" height="6rem">
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong</AlertDescription>
    </Alert>
  </Flex>
);

export default AlertMessage;
