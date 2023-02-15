import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';

import AviasalesService from '@services/flights-service';
import { TPlane } from '@interfaces/plane.interfaces';
import { Pagination } from '@components/Pagination';

const Airplanes = () => {
  const columnHelper = createColumnHelper<TPlane>();
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'ID',
    }),
    columnHelper.accessor('aircraftNumber', {
      cell: (info) => info.getValue(),
      header: 'Номер',
    }),
    columnHelper.accessor('model', {
      header: 'Модель',
      cell: (info) => info.getValue<string>(),
    }),
    columnHelper.accessor('modelYear', {
      header: 'Год модели',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('flightRange', {
      header: 'Дальность полета',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      // eslint-disable-next-line react/no-unstable-nested-components
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
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const avia = new AviasalesService();
  const { isLoading, data } = useQuery('planes', () => avia.getPlanes());

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data:
      data && Array.isArray(data)
        ? data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
        : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (data && Array.isArray(data)) {
    const setPaginationData = (pageNumber: number) => {
      if (pageNumber >= 0 && pageNumber < data.length / pageSize) {
        setPagination((prev) => ({
          ...prev,
          pageNumber,
        }));
      }
    };

    return (
      <Box my={10} mx={10}>
        <Flex my={5} align="center" justify="space-between" w="100%">
          <Box>
            <Heading color="rgba(47,79,79)" as="h4" size="md">
              Самолеты
            </Heading>
          </Box>
          <Box>
            <Button border="1px solid rgba(247, 79, 79, .2)">
              Добавить самолет +
            </Button>
          </Box>
        </Flex>
        <Box ml={5}>
          <Table>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      border="1px solid rgba(247, 79, 79, .2)"
                      color="#28282B"
                      key={header.id}
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
                    <Td border="1px solid rgba(247, 79, 79, .2)" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination
            data={data}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPaginationData={setPaginationData}
          />
        </Box>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Flex position="absolute" left="50%" my="10%" justify="center">
        <Spinner size="xl" />
      </Flex>
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

export default Airplanes;
