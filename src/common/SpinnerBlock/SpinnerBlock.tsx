import { Flex, Spinner } from '@chakra-ui/react';

const SpinnerBlock = () => (
  <Flex position="absolute" left="50%" my="10%" justify="center">
    <Spinner size="xl" />
  </Flex>
);

export default SpinnerBlock;
