import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';

import { ArrowRightIcon } from '@common/icons';

const CovidCard = () => {
  return (
    <Card
      mt="6.3125rem"
      ml="3.5625rem"
      borderRadius="0.25rem"
      boxShadow="0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);"
      bgColor="#FFF"
      w="30.6875rem"
      h="5.625rem"
    >
      <CardHeader p="0" pl="0.4375rem">
        <Flex justifyContent="space-between">
          <Heading>
            <Text mt="0.6875rem" fontSize="0.75rem" color="#0A66C2">
              Travel Regulations
            </Text>
          </Heading>
          <Box mr=".5rem">
            <ArrowRightIcon />
          </Box>
        </Flex>
        <Box mt="0.125rem" h="0.0625rem" w="29.25rem" bgColor="#D9D9D9" />
      </CardHeader>
      <CardBody p="0.5625rem">
        <Text fontSize="0.625rem">Dear Passengers,</Text>
        <Text fontSize="0.625rem">
          We recommend that you review our{' '}
          <Link color="#0A66C2" textDecor="underline" href="#">
            Travel Regulations Page
          </Link>{' '}
          for all updates and recent developments of country-specific travel
          restrictions and travel requirements due to{' '}
          <Link color="#E32E22" fontWeight="600">
            COVID-19
          </Link>
          .
        </Text>
      </CardBody>
    </Card>
  );
};

export default CovidCard;
