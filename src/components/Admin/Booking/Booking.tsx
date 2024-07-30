import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { IBooking, IFormBooking } from '@/interfaces';
import { EModalNames, scrollTable } from '@/constants';
import { Gear } from '@common/icons';
import { isRowEditing } from '@utils/table.utils';
import { formatDateTime } from '@utils/date.utils';
import { useSetCurrentPageInPagination } from '@/hooks';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';
import { useToastHandler } from '@/hooks/useToastHandler';
import { useTheme } from '@context/:ThemeProvider';
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  usePatchBookingMutation,
} from '@/store/services';
import {
  SpinnerBlock,
  HeaderTable,
  FlexCell,
  EditableCell,
  PopoverTable,
  AlertMessage,
  FooterTable,
} from '@/common';

const PAGE_KEY = 'BOOKING_CURR_PAGE';

const Booking = () => {
  const { theme } = useTheme();
  const [pageIndex, setPaginationData] =
    useSetCurrentPageInPagination(PAGE_KEY);
  const toastHandler = useToastHandler();
  const [deleteBooking] = useDeleteBookingMutation();
  const [patchBooking] = usePatchBookingMutation();
  const {
    data: bookingData,
    isFetching,
    isError,
    error,
  } = useGetBookingsQuery({
    page: pageIndex - 1,
  });
  const bookingDataContent = useMemo(
    () => bookingData?.content ?? [],
    [bookingData]
  );
  const totalPages = bookingData?.totalPages;

  useEffect(() => {
    if (!isFetching && !bookingDataContent && pageIndex > 0)
      setPaginationData(pageIndex - 1);
  }, [isFetching, pageIndex, setPaginationData, bookingDataContent]);

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toastHandler({
        status: 'error',
        title: error.data.message,
      });
  }, [isError, toastHandler, error]);

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IBooking | null>(
    null
  );
  const handleEditRow = useCallback((row = null, index = -1) => {
    if (index >= 0) {
      setEditableRowState(row);
      setEditableRowIndex(index);
    } else {
      setEditableRowState(null);
      setEditableRowIndex(null);
    }
  }, []);
  const patchRow = useCallback(() => {
    if (editableRowState) patchBooking(editableRowState);
    handleEditRow();
  }, [patchBooking, editableRowState, handleEditRow]);
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
        cell: (info) => (
          <PopoverTable
            hasDetailsButton={false}
            row={info.row.original}
            index={info.row.index}
            id={info.row.original.id}
            handleEditRow={handleEditRow}
            deleteRow={deleteBooking}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={bookingDataContent?.length}
          />
        ),
      }),
    ],
    [
      columnHelper,
      setPaginationData,
      handleEditRow,
      pageIndex,
      bookingDataContent?.length,
      handleUpdateRow,
      editableRowIndex,
      editableRowState,
      deleteBooking,
    ]
  );
  const table = useReactTable({
    data: bookingDataContent,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isFetching) {
    return <SpinnerBlock />;
  }

  if (!isError) {
    return (
      <TableContainer
        my={10}
        mx={14}
        minHeight="70.9vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <HeaderTable<IFormBooking>
            heading="Бронирование"
            formName={EModalNames.BOOKING}
          />
          <div {...scrollTable}>
            <Table>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        border="0.0625rem solid #DEDEDE"
                        color={theme === 'dark' ? '#FFFFFF' : '#000000'}
                        key={header.id}
                        fontSize="0.875rem"
                        lineHeight="1.125rem"
                        textTransform="none"
                        fontWeight="semibold"
                        width="42px"
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
                        border="0.0625rem solid #DEDEDE"
                        color={theme === 'dark' ? '#FFFFFF' : '#393939'}
                        fontSize="0.875rem"
                        lineHeight="1.125rem"
                        key={cell.id}
                        textTransform="none"
                        fontWeight="normal"
                        paddingX="0.25rem"
                        paddingY="0.125rem"
                      >
                        <Flex height="2.5rem">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Flex>
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          <FooterTable
            data={bookingDataContent}
            pageIndex={pageIndex}
            setPaginationData={setPaginationData}
            cancelEditing={handleEditRow}
            patchRow={patchRow}
            editableRowIndex={editableRowIndex}
            totalPages={totalPages}
          />
        </Box>
      </TableContainer>
    );
  }

  if (bookingDataContent?.length) {
    return <AlertMessage status="info" message="No bookings were found" />;
  }

  return <AlertMessage />;
};

export default Booking;
