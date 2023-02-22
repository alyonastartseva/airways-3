import { TableContainer } from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMutation, useQuery } from 'react-query';
import { useState } from 'react';

import searchService from '@services/searchService';
import { IDestination } from '@interfaces/search.interfaces';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { AlertMessage } from '@common/AlertMessage';
import { TableCreator } from '@common/TableCreator';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { HeaderAdmin } from '@/common/HeaderAdmin';
import { FooterTable } from '@/common/FooterTable';
import { ModalFormDestinations } from '@/common/ModalFormDestinations';
import { isRowEditing } from '@utils/table.utils';

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

  // получение данных
  const { data: destinations, isLoading } = useQuery(
    'destination list',
    searchService.getDestinations
  );

  // изменение данных
  const { mutate: patchDestination } = useMutation('destination patch', () =>
    searchService.patchDestinations(editableRowState)
  );

  // удаление данных
  const { mutate: deleteDestination } = useMutation(
    'destination delete',
    searchService.deleteDestination
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
    setEditableRowState({ ...editableRowState, [id]: value });
  };

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
          deleteDestination={deleteDestination}
        />
      ),
    }),
  ];

  // создание таблицы
  const table = useReactTable({
    data:
      Array.isArray(destinations?.data) && destinations?.data.length
        ? destinations?.data.slice(
            pageIndex * pageSize,
            pageIndex * pageSize + pageSize
          )
        : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  //функция для обновления пагинации. НЕ РАБОТАЕТ
  const setPaginationData = (pageNumber: number) => {
    if (destinations?.data.length) {
      const destinationsLength = destinations?.data.length;
      if (pageNumber >= 0 && pageNumber < destinationsLength / pageSize) {
        setPagination((prev) => ({
          ...prev,
          pageNumber,
        }));
      }
    }
  };

  // спиннер при загрузке
  if (isLoading) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(destinations?.data) && destinations?.data.length) {
    return (
      <TableContainer my={10} mx={14}>
        <HeaderAdmin
          heading="Место назначения"
          modal={<ModalFormDestinations name="Добавить пункт назначения" />}
        />
        <TableCreator table={table} />
        <FooterTable
          data={destinations?.data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPaginationData={setPaginationData}
          cancelEditing={cancelEditing}
          patchDestination={patchDestination}
          editableRowIndex={editableRowIndex}
        />
      </TableContainer>
    );
  }

  // алерт при ошбике
  return <AlertMessage />;
};

export default Destinations;
