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
import { useState, useCallback, useMemo } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import dayjs from 'dayjs';

import { HeaderAdmin } from '@common/HeaderAdmin';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { ITickets, ITicketsPost } from '@interfaces/tickets.interface';
import { useTicketsQuery } from '@hooks/useTicketsQuery';
import { FlexCell } from '@common/FlexCell';
import { ticketsSort } from '@utils/sort.utils';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { isRowEditing } from '@utils/table.utils';
import { EditableCell } from '@common/EditableCell';
import { PopoverTable } from '@common/PopoverTable';
import { useTicketsPatch } from '@hooks/useTicketsPatch';
import { useTicketDelete } from '@hooks/useTicketDelete';
import { FooterTable } from '@/common/FooterTable';
import { AlertMessage } from '@/common/AlertMessage';

const Tickets = () => {
  // индекс и размер пагинации
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // изменение пагинации
  const setPaginationData = (pageNumber: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: pageNumber,
    }));
  };

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

  // форматирование даты
  const formatDate = (date: string): string => {
    const dateFormat = 'DD.MM.YYYY HH:mm';
    return dayjs(date).format(dateFormat);
  };

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

  console.log(editableRowState);
  // получение данных
  const { data: ticketsData, isLoading } = useTicketsQuery();
  const tickets = ticketsData?.content;

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
                id={info.column.id}
                editableRowIndex={editableRowIndex}
                updateData={handleUpdateRow}
              />
              <EditableCell
                value={isRowEditing(
                  info.row.index,
                  info.getValue().firstName.id,
                  info.getValue().firstName.value,
                  editableRowState,
                  editableRowIndex
                )}
                index={info.row.index}
                id={info.column.id}
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
              formatDate(info.getValue()),
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
              formatDate(info.getValue()),
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
            row={info.row.original}
            index={info.row.index}
            id={info.row.original.id}
            handleEditRow={handleEditRow}
            deleteRow={deleteTicket}
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
      deleteTicket
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: ITickets[]) => {
    if (Array.isArray(data) && data.length) {
      return ticketsSort(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(tickets).slice(0, pageSize),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (isLoading) {
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
          <HeaderAdmin<ITicketsPost>
            heading="Билеты"
            formName={EModalNames.TICKETS}
          />
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
          <FooterTable
            data={tableData(tickets)}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPaginationData={setPaginationData}
            cancelEditing={cancelEditing}
            patchRow={patchRow}
            editableRowIndex={editableRowIndex}
          />
        </Box>
      </TableContainer>
    );
  } else return <AlertMessage />;
};

export default Tickets;
