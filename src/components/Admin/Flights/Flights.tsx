import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import useFlightsQuery from '@/hooks/useFlightsQuery';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { EditableCell } from '@common/EditableCell';
import { isRowEditing } from '@utils/table.utils';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { HeaderAdmin } from '@common/HeaderAdmin';
import { FooterTable } from '@common/FooterTable';
import ELinks from '@services/adminRouterLinks.service';
import { IFlights } from '@/interfaces/flights.interfaces';
import { ModalFlights } from '@/common/ModalFlights';

const Flights = () => {
  // индекс и размер пагинации
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IFlights | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = useCallback((row: IFlights, index: number) => {
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
      if (editableRowState)
        setEditableRowState({ ...editableRowState, [id]: value });
    },
    [editableRowState]
  );

  // получение данных
  const { data: flights, isLoading } = useFlightsQuery();

  const patchRow = () => console.log();

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<IFlights>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),
      columnHelper.accessor('code', {
        header: 'Код(Рейс)',
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
      columnHelper.accessor((row) => `${row.from.cityName}`, {
        header: 'Город откуда',
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
      columnHelper.accessor((row) => row.to.cityName, {
        header: 'Город куда',
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
        header: 'Дата отбытия',
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
      columnHelper.accessor('arrivalDateTime', {
        header: 'Дата прибытия',
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
      columnHelper.accessor('aircraftId', {
        header: 'Модель самолета',
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue().toString(),
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
      columnHelper.accessor('flightStatus', {
        header: 'Статус',
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
            deleteRow={() => console.log()}
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
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: IFlights[]) => {
    if (Array.isArray(data) && data.length) {
      return data;
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(flights).slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  //функция для обновления пагинации
  const setPaginationData = useCallback(
    (pageNumber: number) => {
      if (flights?.length) {
        const flightsLength = flights?.length;
        if (pageNumber >= 0 && pageNumber < flightsLength / pageSize) {
          setPagination((prev) => ({
            ...prev,
            pageIndex: pageNumber,
          }));
        }
      }
    },
    [flights?.length, pageSize]
  );

  // если нет токена авторизации, перебрасываем на форму логина
  if (!localStorage.getItem('adminToken'))
    return <Navigate to={ELinks.ADMIN_LOGIN} />;

  // спиннер при загрузке
  if (isLoading) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(flights) && flights?.length) {
    return (
      <TableContainer my={10} mx={9}>
        <HeaderAdmin
          heading="Рейсы"
          modal={<ModalFlights name="Добавить рейс" />}
        />
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    border="1px solid #DEDEDE"
                    color="#000000"
                    key={header.id}
                    fontSize="14px"
                    lineHeight="18px"
                    textTransform="none"
                    fontWeight="semibold"
                    w={header.getSize()}
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
              <Tr
                bgColor={row.index % 2 ? 'blackAlpha.50' : 'white'}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <Td
                    border="1px solid #DEDEDE"
                    color="#393939"
                    fontSize="14px"
                    lineHeight="18px"
                    key={cell.id}
                    textTransform="none"
                    fontWeight="normal"
                    paddingX="4px"
                    paddingY="2px"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <FooterTable
          data={tableData(flights)}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPaginationData={setPaginationData}
          cancelEditing={cancelEditing}
          patchRow={patchRow}
          editableRowIndex={editableRowIndex}
        />
      </TableContainer>
    );
  }

  // алерт при ошибке
  return <AlertMessage />;
};

export default Flights;
