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

import { IAirplane } from '@interfaces/plane.interfaces';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { HeaderAdmin } from '@common/HeaderAdmin';
import { FooterTable } from '@common/FooterTable';
import { ModalAirplanes } from '@common/ModalAirplanes';
import { isRowEditing } from '@utils/table.utils';
import { sortAirplanes } from '@utils/sort.utils';
import { useAirplanesQuery } from '@hooks/useAirplanesQuery';
import { useAirplanePatch } from '@hooks/useAirplanePatch';
import { useAirplaneDelete } from '@hooks/useAirplaneDelete';

const Airplanes = () => {
  // индекс и размер пагинации
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IAirplane | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = (row: IAirplane, index: number) => {
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
    patchAircraft();
    cancelEditing();
  };

  // получение данных
  const { data: airplanes, isLoading } = useAirplanesQuery();

  // изменение данных
  const { mutate: patchAircraft } = useAirplanePatch(editableRowState);

  // удаление данных
  const { mutate: deleteAircraft } = useAirplaneDelete();

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<IAirplane>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
      size: 41,
    }),
    columnHelper.accessor('model', {
      header: 'Модель',
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
    columnHelper.accessor('aircraftNumber', {
      header: 'Номер',
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
    columnHelper.accessor('modelYear', {
      header: 'Год выпуска',
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
    columnHelper.accessor('flightRange', {
      header: 'Дальность полёта (км)',
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
      id: 'actions',
      size: 41,
      cell: (info) => (
        <PopoverTable<IAirplane>
          row={info.row.original}
          index={info.row.index}
          id={info.row.original.id}
          handleEditRow={handleEditRow}
          deleteRow={deleteAircraft}
        />
      ),
    }),
  ];

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: IAirplane[]) => {
    if (Array.isArray(data) && data.length) {
      return sortAirplanes(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(airplanes).slice(
      pageIndex * pageSize,
      pageIndex * pageSize + pageSize
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  //функция для обновления пагинациb
  const setPaginationData = (pageNumber: number) => {
    if (airplanes?.length) {
      const airplanesLength = airplanes?.length;
      if (pageNumber >= 0 && pageNumber < airplanesLength / pageSize) {
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
  if (Array.isArray(airplanes) && airplanes?.length) {
    return (
      airplanes && (
        <TableContainer my={10} mx={14}>
          <HeaderAdmin
            heading="Самолеты"
            modal={<ModalAirplanes name="Добавить самолет" />}
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
            data={tableData(airplanes)}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPaginationData={setPaginationData}
            cancelEditing={cancelEditing}
            patchRow={patchRow}
            editableRowIndex={editableRowIndex}
          />
        </TableContainer>
      )
    );
  }

  // алерт при ошбике
  return <AlertMessage />;
};

export default Airplanes;
