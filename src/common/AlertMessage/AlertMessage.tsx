import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const AlertMessage = () => (
  <Flex position="absolute" left="40%" my="10%" justify="center">
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong</AlertDescription>
    </Alert>
  </Flex>
);

export default AlertMessage;
