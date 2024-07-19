import { useCallback, useMemo, useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
  Box,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';

import {
  EditableCell,
  FlexCell,
  PopoverTable,
  AlertMessage,
  SpinnerBlock,
  HeaderTable,
  FooterTable,
  EditableSelectCell,
  SeatCategory,
} from '@/common';
import { useSetCurrentPageInPagination } from '@/hooks';
import {
  useDeleteSeatMutation,
  useGetAircraftByIdQuery,
  useGetSeatQuery,
  usePatchSeatMutation,
} from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';
import { useToastHandler } from '@/hooks/useToastHandler';
import { ELinks } from '@/services';
import { EModalNames, ITEMS_PER_PAGE, scrollTable, yesNo } from '@/constants';
import { ISeatForm, ISeatPost } from '@/interfaces';
import { isRowEditing } from '@/utils/table.utils';
import { sortById } from '@/utils/sort.utils';

import { getYesNo, gitTicketClassName } from './Airplane.utils';

const PAGE_KEY = 'AIRPLANE_CURR_PAGE';

const Airplane = () => {
  const [pageIndex, setPaginationData] =
    useSetCurrentPageInPagination(PAGE_KEY);
  // получение параметра ID из роута
  const param = useParams();
  const toastHandler = useToastHandler();

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<ISeatPost | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = useCallback((row: ISeatPost, index: number) => {
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
    (id: string, value: string | object) => {
      if (editableRowState)
        setEditableRowState({
          ...editableRowState,
          [id as keyof ISeatPost]: value,
        });
    },
    [editableRowState]
  );

  // получение данных
  const airplaneId = param.airplane;

  const seatQuery = useGetSeatQuery({
    page: pageIndex - 1,
    id: Number(airplaneId),
  });

  const seat = seatQuery.data?.content;
  const totalPages = seatQuery.data?.totalPages;

  const seatIdQuery = useGetAircraftByIdQuery(Number(airplaneId));
  const planeName = seatIdQuery.data?.model;

  const initialFormValues = { aircraftId: airplaneId };

  // удаление данных
  const [deleteSeat, deleteSeatQuery] = useDeleteSeatMutation();

  // патч данных
  const [patchSeat, patchSeatQuery] = usePatchSeatMutation();

  // патч данных
  const patchRow = useCallback(() => {
    if (editableRowState) patchSeat(editableRowState);

    cancelEditing();
  }, [patchSeat, editableRowState, cancelEditing]);

  // Состояние для хранения выбранного класса для фильтра
  const [selectedValue, setSelectedValue] = useState('');
  // Обновляем выбранное значение и фильтруем данные
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    filterData(value);
  };

  const [filteredSeat, setFilteredSeat] = useState<ISeatPost[]>([]);

  // функция для фильтрации данных
  const filterData = useCallback(
    (value: string) => {
      if (seat) {
        const filteredData =
          selectedValue !== ''
            ? seat.filter((item: ISeatPost) => item.category === value)
            : seat;
        setFilteredSeat(filteredData);
      }
    },
    [seat, selectedValue]
  );

  useEffect(() => {
    if (seatQuery.isError && isFetchBaseQueryError(seatQuery.error))
      toastHandler({ status: 'error', title: seatQuery.error.data.message });
  }, [seatQuery.isError, toastHandler, seatQuery.error]);

  useEffect(() => {
    if (seatIdQuery.isError && isFetchBaseQueryError(seatIdQuery.error))
      toastHandler({ status: 'error', title: seatIdQuery.error.data.message });
  }, [seatIdQuery.isError, toastHandler, seatIdQuery.error]);

  useEffect(() => {
    if (deleteSeatQuery.isError && isFetchBaseQueryError(deleteSeatQuery.error))
      toastHandler({
        status: 'error',
        title: deleteSeatQuery.error.data.message,
      });
  }, [deleteSeatQuery.isError, deleteSeatQuery.error, toastHandler]);

  useEffect(() => {
    if (patchSeatQuery.isError && isFetchBaseQueryError(patchSeatQuery.error))
      toastHandler({
        status: 'error',
        title: patchSeatQuery.error.data.message,
      });
  }, [patchSeatQuery.isError, patchSeatQuery.error, toastHandler]);

  // Вызываем функцию filterData с текущим выбранным значением
  useEffect(() => {
    filterData(selectedValue);
  }, [selectedValue, filterData]);

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<ISeatPost>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID Сиденья',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),
      columnHelper.accessor('seatNumber', {
        header: 'Номер сиденья',
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
        size: 250,
      }),
      columnHelper.accessor('category', {
        header: 'Класс',
        cell: (info) => (
          <EditableSelectCell
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
            selectOptions={<SeatCategory />}
            getRenderValue={gitTicketClassName}
          />
        ),
      }),
      columnHelper.accessor('isLockedBack', {
        header: 'Неподвижное сиденье',
        cell: (info) => (
          <EditableSelectCell
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
            selectOptions={yesNo}
            getRenderValue={getYesNo}
          />
        ),
      }),
      columnHelper.accessor('isNearEmergencyExit', {
        header: 'Близко к экстренному выходу',
        cell: (info) => (
          <EditableSelectCell
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
            selectOptions={yesNo}
            getRenderValue={getYesNo}
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
            deleteRow={deleteSeat}
          />
        ),
      }),
    ],
    [
      columnHelper,
      deleteSeat,
      editableRowState,
      editableRowIndex,
      handleEditRow,
      handleUpdateRow,
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: ISeatPost[]) => {
    if (Array.isArray(data) && data.length) {
      return sortById(data.slice());
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data:
      selectedValue !== ''
        ? tableData(filteredSeat).slice(0, ITEMS_PER_PAGE)
        : tableData(seat).slice(0, ITEMS_PER_PAGE),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (seatQuery.isLoading || seatIdQuery.isLoading) {
    return <SpinnerBlock />;
  }

  // если нет токена авторизации, перебрасываем на форму логина
  if (!localStorage.getItem('adminToken')) {
    return <Navigate to={ELinks.ADMIN_LOGIN} />;
  }

  // если полученные данные в порядке выводим таблицу
  if (seat !== undefined) {
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
          <HeaderTable<ISeatForm>
            heading={planeName ? planeName : ''}
            formName={EModalNames.SEAT}
            select
            selectedValue={selectedValue}
            handleSelectChange={handleSelectChange}
            initialFormValues={initialFormValues}
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
        </Box>
        <FooterTable
          data={tableData(seat)}
          pageIndex={pageIndex}
          setPaginationData={(page) => setPaginationData(page)}
          cancelEditing={cancelEditing}
          patchRow={patchRow}
          editableRowIndex={editableRowIndex}
          totalPages={totalPages}
        />
      </TableContainer>
    );
  }

  // алерт при ошибке
  return <AlertMessage />;
};

export default Airplane;
