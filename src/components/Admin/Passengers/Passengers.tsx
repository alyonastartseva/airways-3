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
import { useCallback, useState } from 'react';

import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { FormPassengers } from '@interfaces/search.interfaces';
import { EditableCell } from '@common/EditableCell';
import { isRowEditing } from '@utils/table.utils';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { HeaderAdmin } from '@common/HeaderAdmin';
import { FooterTable } from '@common/FooterTable';
import { usePassengersDelete } from '@hooks/usePassengersDelete';
import { usePassengersPatch } from '@hooks/usePassengersPatch';
import { usePassengersQuery } from '@hooks/usePassengersQuery';
import { ModalPassengers } from '@common/ModalPassengers';

const Passengers = () => {
  // индекс и размер пагинации
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] =
    useState<FormPassengers | null>(null);

  // установка редактируемой строки
  const handleEditRow = (row: FormPassengers, index: number) => {
    setEditableRowState(row);
    setEditableRowIndex(index);
  };

  // сброс редактируемой строки
  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

  // обновление редактируемой строки
  const handleUpdateRow = (id: string, value: string) => {
    if (editableRowState)
      setEditableRowState({ ...editableRowState, [id]: value });
  };

  // получение данных
  const { data: passengers, isLoading } = usePassengersQuery();
  // изменение данных
  const { mutate: patchPassengers } = usePassengersPatch();

  // удаление данных
  const { mutate: deletePassengers } = usePassengersDelete();
  // патч данных
  const patchRow = useCallback(() => {
    patchPassengers(editableRowState);
    cancelEditing();
  }, [patchPassengers, editableRowState, cancelEditing]);
  // создание столбцов таблицы
  const columnHelper = createColumnHelper<FormPassengers>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
      size: 41,
    }),
    columnHelper.accessor(
      (row) =>
        `${row.firstName ?? ''} ${row.lastName ?? ''} ${row.middleName ?? ''} `,
      {
        header: 'Имя, Фамилия, Отчество',
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
      }
    ),
    columnHelper.accessor('passport.gender', {
      header: 'Пол',
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
    columnHelper.accessor('phoneNumber', {
      header: 'Телефон',
      cell: (info) => (
        <EditableCell
          value={isRowEditing(
            info.row.index,
            info.column.id,
            `+${info.getValue()}`,
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
    columnHelper.accessor('birthDate', {
      header: 'Дата рождения',
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
    columnHelper.accessor('passport.serialNumberPassport', {
      header: 'Серийный номер',
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
    columnHelper.accessor('passport.passportIssuingCountry', {
      header: 'Гражданство',
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
    columnHelper.accessor('passport.passportIssuingDate', {
      header: 'Дата выдачи паспорта',
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
          deleteRow={deletePassengers}
        />
      ),
    }),
  ];

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: FormPassengers[]) => {
    if (Array.isArray(data) && data.length) {
      return data;
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(passengers).slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  //функция для обновления пагинации
  const setPaginationData = (pageNumber: number) => {
    if (passengers?.length) {
      const destinationsLength = passengers?.length;
      if (pageNumber >= 0 && pageNumber < destinationsLength / pageSize) {
        setPagination((prev) => ({
          ...prev,
          pageIndex: pageNumber,
        }));
      }
    }
  };

  // спиннер при загрузке
  if (isLoading) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(passengers) && passengers?.length) {
    return (
      <TableContainer my={10} mx={14}>
        <HeaderAdmin
          heading="Пассажиры"
          modal={<ModalPassengers name="Добавить пассажира" />}
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
              <Tr key={row.id}>
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
          data={tableData(passengers)}
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

export default Passengers;
