import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Heading,
  Button,
  Alert,
  Spinner,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useState } from 'react';

import searchService from '@services/searchService';
import { Pagination } from '@components/Pagination';

const Destinations = () => {
  const {
    data: destinations,
    isError,
    isLoading,
  } = useQuery('destination list', searchService.getDestinations);

  const borderColor = '1px solid lightgrey';

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const setPaginationData = (pageNumber: number) => {
    if (destinations?.data.length) {
      const destinationsLength = destinations?.data.length;
      if (pageNumber >= 0 && pageNumber < destinationsLength / pageSize) {
        setPagination((prev) => ({
          ...prev,
          pageNumber,
        }));
      }
    }
  };

  if (isLoading) {
    return (
      <Flex position="absolute" left="50%" my="10%" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (isError) {
    return (
      <Flex position="absolute" left="50%" my="10%" justify="center">
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong</AlertDescription>
        </Alert>
      </Flex>
    );
  }

  return (
    <TableContainer my={10} mx={14}>
      <Flex my={5} align="center" justify="space-between">
        <Box>
          <Heading color="rgba(47,79,79)" as="h4" size="md">
            Место назначения
          </Heading>
        </Box>
        <Box>
          <Button border={borderColor} borderRadius="4">
            Добавить пункт назначения +
          </Button>
        </Box>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th border={borderColor}>ID</Th>
            <Th border={borderColor}>Страна</Th>
            <Th border={borderColor}>Город</Th>
            <Th border={borderColor}>Имя аэропорта</Th>
            <Th border={borderColor}>Код аэропорта</Th>
            <Th border={borderColor}>Часовой пояс</Th>
          </Tr>
        </Thead>
        <Tbody>
          {destinations?.data?.map((item, id) => {
            return (
              <Tr key={id}>
                <Td border={borderColor}>{item.id}</Td>
                <Td border={borderColor}>{item.countryName}</Td>
                <Td border={borderColor}>{item.cityName}</Td>
                <Td border={borderColor}>{item.airportName}</Td>
                <Td border={borderColor}>{item.airportCode}</Td>
                <Td border={borderColor}>{item.timezone}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {destinations?.data.length && (
        <Pagination
          data={destinations?.data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPaginationData={setPaginationData}
        />
      )}
    </TableContainer>
  );
};

export default Destinations;
