import { useState, useCallback, useMemo, memo, useEffect } from 'react';
import {
  Box,
  Flex,
  Thead,
  Table,
  TableContainer,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

import { sortById } from '@utils/sort.utils';
import { formatDateTime } from '@utils/date.utils';
import { isRowEditing } from '@utils/table.utils';
import { ITEMS_PER_PAGE, EModalNames, scrollTable } from '@/constants';
import { ITickets, ITicketsPost } from '@/interfaces';
import {
  useTicketsQuery,
  useTicketsPatch,
  useTicketDelete,
  useSetCurrentPageInPagination,
} from '@/hooks';
import {
  AlertMessage,
  FooterTable,
  PopoverTable,
  EditableCell,
  SpinnerBlock,
  FlexCell,
  HeaderTable,
} from '@/common';

const PAGE_KEY = 'TICKETS_CURR_PAGE';

const Tickets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = +(searchParams.get('page') || 1) - 1;
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    PAGE_KEY,
    Number(pageParam || localStorage.getItem(PAGE_KEY) || 0)
  );

  // получение данных
  const { data: ticketsData, isFetching } = useTicketsQuery(pageIndex);
  const tickets = ticketsData?.content;
  const totalPages = ticketsData?.totalPages;

  useEffect(() => {
    setSearchParams({ page: String(pageIndex + 1) });
  }, [pageIndex]);

  // если удален последняя строка текущей страницы, то открываем предыдущую страницу
  useEffect(() => {
    if (!isFetching && !tickets && pageIndex > 0)
      setPaginationData(pageIndex - 1);
  }, [isFetching, tickets, pageIndex, setPaginationData]);

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<ITickets | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = useCallback((row: ITickets, index: number) => {
    setEditableRowState(row);
    setEditableRowIndex(index);
  }, []);

  // сброс редактируемой строки
  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

  // обновление редактируемой строки
  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (!editableRowState) return;

      setEditableRowState({
        ...editableRowState,
        [id as keyof ITickets]: value,
      });
    },
    [editableRowState]
  );

  // изменение данных
  const { mutate: patchTickets } = useTicketsPatch();

  // удаление данных
  const { mutate: deleteTicket } = useTicketDelete();

  // патч данных
  const patchRow = useCallback(() => {
    patchTickets(editableRowState);
    cancelEditing();
  }, [patchTickets, editableRowState, cancelEditing]);

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<ITickets>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),
      columnHelper.accessor(
        (row) => ({
          firstName: {
            value: row.firstName,
            id: 'firstName',
          },
          lastName: {
            value: row.lastName,
            id: 'lastName',
          },
        }),
        {
          header: 'ФИО',
          cell: (info) => (
            <Flex>
              <EditableCell
                value={isRowEditing(
                  info.row.index,
                  info.getValue().firstName.id,
                  info.getValue().firstName.value,
                  editableRowState,
                  editableRowIndex
                )}
                index={info.row.index}
                id={info.getValue().firstName.id}
                editableRowIndex={editableRowIndex}
                updateData={handleUpdateRow}
              />
              <EditableCell
                value={isRowEditing(
                  info.row.index,
                  info.getValue().lastName.id,
                  info.getValue().lastName.value,
                  editableRowState,
                  editableRowIndex
                )}
                index={info.row.index}
                id={info.getValue().lastName.id}
                editableRowIndex={editableRowIndex}
                updateData={handleUpdateRow}
              />
            </Flex>
          ),
        }
      ),
      columnHelper.accessor('ticketNumber', {
        header: 'Номер билета',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue(),
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
      columnHelper.accessor('code', {
        header: 'Код',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue(),
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
      columnHelper.accessor('departureDateTime', {
        header: 'Отлет',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              formatDateTime(info.getValue()),
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
      columnHelper.accessor('arrivalDateTime', {
        header: 'Прилет',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              formatDateTime(info.getValue()),
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
      columnHelper.accessor('flightId', {
        header: 'Номер посадки',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue(),
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
        id: 'actions',
        size: 41,
        cell: (info) => (
          <PopoverTable
            hasDetailsButton={false}
            row={info.row.original}
            index={info.row.index}
            id={info.row.original.id}
            handleEditRow={handleEditRow}
            deleteRow={deleteTicket}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={tickets?.length}
          />
        ),
      }),
    ],
    [
      columnHelper,
      editableRowIndex,
      editableRowState,
      handleUpdateRow,
      handleEditRow,
      deleteTicket,
      setPaginationData,
      pageIndex,
      tickets,
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: ITickets[]) => {
    if (Array.isArray(data) && data.length) {
      return sortById(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(tickets).slice(0, ITEMS_PER_PAGE),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (isFetching) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(tickets) && tickets?.length) {
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
          <HeaderTable<ITicketsPost>
            heading="Билеты"
            formName={EModalNames.TICKETS}
          />
          <div {...scrollTable}>
            <Table>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        border="0.0625rem solid #DEDEDE"
                        color="#000000"
                        key={header.id}
                        fontSize="0.875rem"
                        lineHeight="1.125rem"
                        textTransform="none"
                        fontWeight="semibold"
                        width={header.getSize()}
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
                        color="#393939"
                        fontSize="0.875rem"
                        lineHeight="1.125rem"
                        key={cell.id}
                        textTransform="none"
                        fontWeight="normal"
                        paddingX="0.25rem"
                        paddingY="0.125rem"
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
          </div>
          <FooterTable
            data={tableData(tickets)}
            pageIndex={pageIndex}
            setPaginationData={setPaginationData}
            cancelEditing={cancelEditing}
            patchRow={patchRow}
            editableRowIndex={editableRowIndex}
            totalPages={totalPages}
          />
        </Box>
      </TableContainer>
    );
  }

  // алерт при ошибке
  return <AlertMessage />;
};

const memorizeTickets = memo(Tickets);
export default memorizeTickets;
