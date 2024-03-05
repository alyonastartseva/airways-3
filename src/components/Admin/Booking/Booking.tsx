import {
  Box,
  Container,
  Heading,
  Flex,
  Button,
  VStack,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from '@chakra-ui/react';
import { AddIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useMemo } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';

import { useSetCurrentPageInPagination } from '@/hooks';
import { Pagination } from '@components/Pagination';
import { Gear, DetailsFilling } from '@common/icons';
import { IBooking } from '@/components/Admin/Booking/booking.interfaces';

const bookingData: IBooking[] = [
  {
    id: 1,
    bookingNumber: 'SV-221122',
    bookingData: '2022-11-21T21:00:00',
    passengerId: 4,
    flightId: 1,
    categoryType: 'BUSINESS',
  },
  {
    id: 2,
    bookingNumber: 'CK-231122',
    bookingData: '2022-11-22T21:00:00',
    passengerId: 5,
    flightId: 1,
    categoryType: 'PREMIUM_ECONOMY',
  },
  {
    id: 3,
    bookingNumber: 'BK-00001',
    bookingData: '2022-11-23T21:00:00',
    passengerId: 4,
    flightId: 1,
    categoryType: 'BUSINESS',
  },
];

const Booking = () => {
  const [pageIndex, setPaginationData] =
    useSetCurrentPageInPagination('BOOKING_CURR_PAGE');

  const columnHelper = createColumnHelper<IBooking>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
      }),
      columnHelper.accessor('bookingNumber', {
        header: 'Номер бронирования',
      }),
      columnHelper.accessor('bookingData', {
        header: 'Дата бронирования',
      }),
      columnHelper.accessor('categoryType', {
        header: 'Категория',
      }),
      columnHelper.accessor('passengerId', {
        header: 'Идентификатор пассажира',
      }),
      columnHelper.accessor('flightId', {
        header: 'Идентификатор рейса',
      }),
      columnHelper.display({
        header: () => <Gear />,
        id: 'editing',
        cell: () => (
          <IconButton
            minW={0}
            h="auto"
            bg="none"
            border="none"
            aria-label="Редактировать"
            icon={<DetailsFilling />}
            _hover={{ backgroundColor: 'transparent' }}
          />
        ),
        enableSorting: false,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: bookingData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <Box pt="50px" pb="121px">
      <Container maxW="1372px">
        <Flex alignItems="center" justifyContent="space-between" py="20px">
          <Heading as="h1" fontSize="20px" fontWeight={600} color="#000">
            Бронирование
          </Heading>
          <Button
            rightIcon={<AddIcon boxSize="3" />}
            pl="19px"
            pr="19px"
            border="1px solid #006FFF"
            borderRadius="4"
            bgColor="#006FFF"
            fontSize="14px"
            fontWeight="600"
            color="#FFFFFF"
            _hover={{
              backgroundColor: 'transparent',
              borderColor: '#398AEA',
              color: '#006FFF',
            }}
          >
            Забронировать
          </Button>
        </Flex>
        <TableContainer mb="22px">
          <Table variant="unstyled" border="1px solid #dedede" bg="#fff">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr
                  key={headerGroup.id}
                  bg="#F5F5F5"
                  border="1px solid #dedede"
                >
                  {headerGroup.headers.map((header, i) => (
                    <Th
                      textAlign={
                        headerGroup.headers.length === i + 1 ? 'center' : 'left'
                      }
                      textTransform="none"
                      border="1px solid #dedede"
                      py="18px"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <VStack gap={0} ml="6px" display="inline-flex">
                          <IconButton
                            w="20px"
                            h="10px"
                            px="4px"
                            minW={0}
                            border="none"
                            borderRadius={0}
                            bg="none"
                            color="#808080"
                            aria-label="Сортировка по возростанию"
                            icon={<ChevronUpIcon />}
                            _focus={{ outline: 0, bg: '#e2e8f0' }}
                          />
                          <IconButton
                            w="20px"
                            h="10px"
                            px="4px"
                            minW={0}
                            border="none"
                            borderRadius={0}
                            bg="none"
                            color="#808080"
                            aria-label="Сортировка по убыванию"
                            icon={<ChevronDownIcon />}
                            _focus={{ outline: 0, bg: '#e2e8f0' }}
                          />
                        </VStack>
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody fontSize="14px" fontWeight={600}>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell, i) => (
                    <Td
                      key={cell.id}
                      borderRight="1px solid #dedede"
                      py="13px"
                      textAlign={
                        row.getVisibleCells().length === i + 1
                          ? 'center'
                          : 'left'
                      }
                    >
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
        </TableContainer>

        <Pagination
          data={bookingData}
          pageIndex={pageIndex}
          totalPages={10}
          setPaginationData={setPaginationData}
        />
      </Container>
    </Box>
  );
};

export default Booking;
