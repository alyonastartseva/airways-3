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
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverHeader,
  Spinner,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { AddIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

import { Pagination } from '@components/Pagination';
import searchService from '@services/searchService';
import { IDestination } from '@interfaces/search.interfaces';

const Destinations = () => {
  const { data: destinations, isLoading } = useQuery(
    'destination list',
    searchService.getDestinations
  );

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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
    columnHelper.accessor('timezone', {
      header: 'Часовой пояс',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => (
        <Popover placement="left-start" arrowSize={10}>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Box
                  w="15px"
                  h="15px"
                  cursor="pointer"
                  _after={{ content: '"\\2807"' }}
                />
              </PopoverTrigger>
              <PopoverContent
                color="#0E153A"
                border="1px solid #2B2B2B"
                borderRadius="6px"
                width="209px"
                height="100px"
              >
                <PopoverArrow border="1px solid #2B2B2B" bgColor="#E2F3F5" />
                <PopoverHeader
                  border="none"
                  borderBottom="1px solid #2B2B2B"
                  p={0}
                >
                  <Button
                    leftIcon={<EditIcon height="14px" width="14px" />}
                    border="none"
                    height="48px"
                    width="100%"
                    borderRadius="none"
                    borderTopLeftRadius="6px"
                    borderTopRightRadius="6px"
                    fontSize="14px"
                    justifyContent="flex-start"
                    _hover={{
                      backgroundColor: '#C5E3F6',
                    }}
                    bgColor="#E2F3F5"
                    onClick={onClose}
                  >
                    Редактировать
                  </Button>
                </PopoverHeader>
                <PopoverBody border="none" p={0}>
                  <Button
                    leftIcon={
                      <CloseIcon
                        height="10px"
                        width="10px"
                        marginInlineEnd="0.2rem"
                      />
                    }
                    marginInlineEnd="0.9rem"
                    border="none"
                    height="49px"
                    width="100%"
                    borderRadius="none"
                    borderBottomLeftRadius="6px"
                    borderBottomRightRadius="6px"
                    fontSize="14px"
                    justifyContent="flex-start"
                    _hover={{
                      backgroundColor: '#C5E3F6',
                    }}
                    bgColor="#E2F3F5"
                    onClick={onClose}
                  >
                    Удалить
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
      ),
    }),
  ];

  const table = useReactTable({
    data:
      destinations?.data.length && Array.isArray(destinations?.data)
        ? destinations?.data.slice(
            pageIndex * pageSize,
            pageIndex * pageSize + pageSize
          )
        : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const borderColor = '1px solid #DEDEDE';

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
            <Heading color="#818080" fontWeight="600" size="md">
              Место назначения
            </Heading>
          </Box>
          <Box>
            <Button
              border={borderColor}
              borderRadius="2"
              bgColor="#F9F9F9"
              fontSize="14px"
              rightIcon={<AddIcon boxSize="3" />}
              _hover={{
                border: `${borderColor}`,
                boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.06)',
              }}
            >
              Добавить пункт назначения
            </Button>
          </Box>
        </Flex>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    border={borderColor}
                    color="#000000"
                    key={header.id}
                    fontSize="14px"
                    lineHeight="18px"
                    textTransform="none"
                    fontWeight="semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    border={borderColor}
                    color="#393939"
                    fontSize="14px"
                    lineHeight="18px"
                    key={cell.id}
                    textTransform="none"
                    fontWeight="normal"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
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
