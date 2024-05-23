import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Pagination } from '@components/Pagination';
import { Gear } from '@common/icons';
import { IBooking, IFormBooking } from '@/interfaces/booking.interfaces';
import { EModalNames } from '@constants/modal-constants/modal-names';
import { isRowEditing } from '@utils/table.utils';
import { formatDateTime } from '@utils/date.utils';
import {
  useSetCurrentPageInPagination,
  useBookingDelete,
  useBookingQuery,
} from '@/hooks';
import {
  SpinnerBlock,
  HeaderTable,
  FlexCell,
  EditableCell,
  PopoverTable,
  ConfirmCancelModal,
} from '@/common';

const Booking = () => {
  const [pageIndex, setPaginationData] =
    useSetCurrentPageInPagination('BOOKING_CURR_PAGE');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(
    null
  );

  const { mutate: deleteBooking } = useBookingDelete();

  const handleDeleteBooking = useCallback(() => {
    if (deletingBookingId) {
      deleteBooking(deletingBookingId);
      setIsModalOpen(false);
      setDeletingBookingId(null);
    }
  }, [deletingBookingId, deleteBooking, setIsModalOpen, setDeletingBookingId]);

  const toggleModal = useCallback(
    (id?: number) => {
      setIsModalOpen(!isModalOpen);
      setDeletingBookingId(id ?? null);
    },
    [isModalOpen]
  );

  const { data: dataQuery, isFetching } = useBookingQuery(pageIndex);

  const bookingData = useMemo(() => {
    return dataQuery?.content ? dataQuery.content : [];
  }, [dataQuery]);

  const totalPages = dataQuery?.totalPages;

  useEffect(() => {
    if (!bookingData && pageIndex > 0) setPaginationData(pageIndex - 1);
  }, [bookingData, pageIndex, setPaginationData]);

  useEffect(() => {
    const currPage = Number(localStorage.getItem('BOOKING_CURR_PAGE'));
    if (currPage > 0) setPaginationData(currPage);
  }, [setPaginationData]);

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IBooking | null>(
    null
  );

  const handleEditRow = useCallback((row: IBooking, index: number) => {
    setEditableRowState(row);
    setEditableRowIndex(index);
  }, []);

  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (!editableRowState) return;

      setEditableRowState({
        ...editableRowState,
        [id as keyof IBooking]: value,
      });
    },
    [editableRowState]
  );

  const columnHelper = createColumnHelper<IBooking>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),

      columnHelper.accessor('bookingDate', {
        header: 'Дата бронирования',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              formatDateTime(info.getValue(), 'DD.MM.YYYY, HH:mm'),
              editableRowState,
              editableRowIndex
            )}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
          />
        ),
      }),
      columnHelper.accessor('passengerId', {
        header: 'Идентификатор пассажира',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              String(info.getValue()),
              editableRowState,
              editableRowIndex
            )}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
          />
        ),
      }),
      columnHelper.accessor('flightSeatId', {
        header: 'Номер сиденья',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              String(info.getValue()),
              editableRowState,
              editableRowIndex
            )}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
          />
        ),
      }),
      columnHelper.display({
        header: () => <Gear />,
        id: 'actions',
        size: 41,
        cell: (info) => (
          <PopoverTable
            hasDetailsButton={false}
            row={info.row.original}
            index={info.row.index}
            id={info.row.original.id}
            handleEditRow={handleEditRow}
            deleteRow={toggleModal}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={bookingData?.length}
          />
        ),
      }),
    ],
    [
      columnHelper,
      setPaginationData,
      handleEditRow,
      pageIndex,
      bookingData,
      handleUpdateRow,
      editableRowIndex,
      editableRowState,
      toggleModal,
    ]
  );

  const table = useReactTable({
    data: bookingData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isFetching) {
    return <SpinnerBlock />;
  }

  return (
    <Box pt="50px" pb="121px">
      <Container maxW="1372px">
        <HeaderTable<IFormBooking>
          heading="Бронирование"
          formName={EModalNames.BOOKING}
        />
        {
          // если полученные данные в порядке выводим таблицу
          Array.isArray(bookingData) && bookingData?.length ? (
            <>
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
                              headerGroup.headers.length === i + 1
                                ? 'center'
                                : 'left'
                            }
                            textTransform="none"
                            border="1px solid #dedede"
                            py="18px"
                            key={header.id}
                          >
                            {header.isPlaceholder &&
                              flexRender(
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

              <ConfirmCancelModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                onDelete={handleDeleteBooking}
                modalText={'Вы действительно хотите удалить бронирование?'}
              />

              <Pagination
                data={bookingData}
                pageIndex={pageIndex}
                totalPages={totalPages}
                setPaginationData={setPaginationData}
              />
            </>
          ) : null
        }
      </Container>
    </Box>
  );
};

export default Booking;
