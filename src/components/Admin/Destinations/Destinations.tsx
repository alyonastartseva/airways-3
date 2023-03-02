import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { useState } from 'react';

import { IDestination } from '@interfaces/search.interfaces';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { HeaderAdmin } from '@common/HeaderAdmin';
import { FooterTable } from '@common/FooterTable';
import { ModalDestinations } from '@common/ModalDestinations';
import { isRowEditing } from '@utils/table.utils';
import { sortDestinations } from '@utils/sort.utils';
import { useDestinationQuery } from '@hooks/useDestinationQuery';
import { useDestinationPatch } from '@/hooks/useDestinationPatch';
import { useDestinationDelete } from '@/hooks/useDestinationDelete';

const Destinations = () => {
  // индекс и размер пагинации
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IDestination | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = (row: IDestination, index: number) => {
    setEditableRowState(row);
    setEditableRowIndex(index);
  };

  // сброс редактируемой строки
  const cancelEditing = () => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  };

  // обновление редактируемой строки
  const handleUpdateRow = (id: string, value: string) => {
    if (editableRowState)
      setEditableRowState({ ...editableRowState, [id]: value });
  };

  // патч данных
  const patchRow = () => {
    patchDestination();
    cancelEditing();
  };

  // получение данных
  const { data: destinations, isLoading } = useDestinationQuery();

  // изменение данных
  const { mutate: patchDestination } = useDestinationPatch(editableRowState);

  // удаление данных
  const { mutate: deleteDestination } = useDestinationDelete();

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<IDestination>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
      size: 41,
    }),
    columnHelper.accessor('countryName', {
      header: 'Страна',
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
    columnHelper.accessor('cityName', {
      header: 'Город',
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
    columnHelper.accessor('airportName', {
      header: 'Имя аэропорта',
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
    columnHelper.accessor('airportCode', {
      header: 'Код аэропорта',
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
    columnHelper.accessor('timezone', {
      header: 'Часовой пояс',
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
          deleteRow={deleteDestination}
        />
      ),
    }),
  ];

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: IDestination[]) => {
    if (Array.isArray(data) && data.length) {
      return sortDestinations(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(destinations).slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  //функция для обновления пагинациb
  const setPaginationData = (pageNumber: number) => {
    if (destinations?.length) {
      const destinationsLength = destinations?.length;
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
  if (Array.isArray(destinations) && destinations?.length) {
    return (
      <TableContainer my={10} mx={14}>
        <HeaderAdmin
          heading="Место назначения"
          modal={<ModalDestinations name="Добавить пункт назначения" />}
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
          data={tableData(destinations)}
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

  // алерт при ошбике
  return <AlertMessage />;
};

export default Destinations;
