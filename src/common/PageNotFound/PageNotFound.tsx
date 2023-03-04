import { Flex, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const PageNotFound = () => (
  <Flex minHeight="81vh" justifyContent="center" alignItems="center">
    <Alert status="error" justifyContent="center" width="20rem" height="6rem">
      <AlertIcon />
      <AlertTitle>PAGE NOT FOUND</AlertTitle>
    </Alert>
  </Flex>
);

export default PageNotFound;
