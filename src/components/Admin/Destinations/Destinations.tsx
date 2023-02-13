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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';

import { Pagination } from '@components/Pagination';
import searchService from '@services/searchService';
import { IDestination } from '@/interfaces/search.interfaces';

const Destinations = () => {
  const { data: destinations, isLoading } = useQuery(
    'destination list',
    searchService.getDestinations
  );

  const columnHelper = createColumnHelper<IDestination>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('countryName', {
      header: 'Страна',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('cityName', {
      header: 'Город',
      cell: (info) => info.getValue<string>(),
    }),
    columnHelper.accessor('airportName', {
      header: 'Имя аэропорта',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('airportCode', {
      header: 'Код аэропорта',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => (
        <Popover>
          <PopoverTrigger>
            <Box
              w="15px"
              h="15px"
              cursor="pointer"
              _after={{ content: '"\\2807"' }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Flex flexDirection="column">
                <Button size="sm" my={1} variant="solid">
                  Редактировать
                </Button>
                <Button size="sm" colorScheme="red">
                  Удалить
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ),
    }),
  ];

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
  if (Array.isArray(destinations?.data) && destinations?.data.length) {
    return (
      <TableContainer my={10} mx={14}>
        <Flex my={5} align="center" justify="space-between">
          <Box>
            <Heading color="rgba(47,79,79)" as="h4" size="md">
              Место назначения
            </Heading>
          </Box>
          <Box>
            <Button
              border={borderColor}
              borderRadius="4"
              rightIcon={<AddIcon boxSize="3" />}
            >
              Добавить пункт назначения
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
            {Array.isArray(destinations?.data) &&
              destinations?.data.map((item, id) => (
                <Tr key={id}>
                  <Td border={borderColor}>{item.id}</Td>
                  <Td border={borderColor}>{item.countryName}</Td>
                  <Td border={borderColor}>{item.cityName}</Td>
                  <Td border={borderColor}>{item.airportName}</Td>
                  <Td border={borderColor}>{item.airportCode}</Td>
                  <Td border={borderColor}>{item.timezone}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        {Array.isArray(destinations?.data) && destinations?.data.length && (
          <Pagination
            data={destinations?.data}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPaginationData={setPaginationData}
          />
        )}
      </TableContainer>
    );
  }

  return (
    <Flex position="absolute" left="50%" my="10%" justify="center">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    </Flex>
  );
};

export default Destinations;
