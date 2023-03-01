import { Flex, Spinner, Text } from '@chakra-ui/react';

const SpinnerBlock = () => (
  <Flex
    minHeight="81vh"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    margin="auto"
  >
    <Spinner size="xl" color="blue.600" speed="0.8s" thickness="0.2rem" />
    <Text color="blue.700" mt={4} ml={2}>
      Loading...
    </Text>
  </Flex>
);

export default SpinnerBlock;
