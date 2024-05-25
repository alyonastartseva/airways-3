import { useCallback, useMemo, useState } from 'react';
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

import { IAircraft, IAircraftPost } from '@/interfaces';
import { ITEMS_PER_PAGE, EModalNames } from '@/constants';
import { sortById } from '@utils/sort.utils';
import { isRowEditing } from '@utils/table.utils';
import {
  EditableCell,
  FlexCell,
  PopoverTable,
  AlertMessage,
  SpinnerBlock,
  HeaderTable,
  FooterTable,
} from '@/common';
import {
  useAircraftQuery,
  useAircraftPatch,
  useAircraftDelete,
  useSetCurrentPageInPagination,
} from '@/hooks';

const Airplanes = () => {
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    'AIRPLANES_CURR_PAGE'
  );

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IAircraft | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = useCallback((row: IAircraft, index: number) => {
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
  const { data: airplanesData, isFetching } = useAircraftQuery(pageIndex - 1);

  const airplanes = airplanesData?.content;
  const totalPages = airplanesData?.totalPages;

  // изменение данных
  const { mutate: patchAircraft } = useAircraftPatch();

  // удаление данных
  const { mutate: deleteAircraft } = useAircraftDelete();

  // патч данных
  const patchRow = useCallback(() => {
    patchAircraft(editableRowState);
    cancelEditing();
  }, [patchAircraft, cancelEditing, editableRowState]);

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<IAircraft>();
  const columns = useMemo(
    () => [
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
            info={info}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
            fieldName="Модель"
          />
        ),
        size: 250,
        meta: {
          type: 'text',
          required: true,
          validate: (value: string) => value.trim(),
          validationMessage: 'Поле должно быть заполнено',
        },
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
            info={info}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
            fieldName="Номер"
          />
        ),
        meta: {
          required: true,
          validate: (value: string) => {
            const regex = new RegExp('^[1-9]+[0-9]*$');
            const isValidLength = value.length >= 4 && value.length <= 15;
            return regex.test(value) && isValidLength;
          },
          validationMessage:
            'Номер должен состоять из цифр, длина от 4 до 16 символов',
        },
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
            info={info}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
            fieldName="Год выпуска"
          />
        ),
        meta: {
          type: 'number',
          required: true,
          validate: (value: string) => {
            const currentYear = new Date().getFullYear();
            return Number(value) >= 2000 && Number(value) <= currentYear;
          },
          validationMessage: `Год выпуска должен быть не ранее 2000 года и не позднее текущего (${new Date().getFullYear()})`,
        },
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
            info={info}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
            fieldName="Дальность полёта"
          />
        ),
        meta: {
          type: 'number',
          required: true,
          validate: (value: string) => {
            const regex = new RegExp('^[1-9]+[0-9]*$');
            return regex.test(value);
          },
          validationMessage:
            'Дальность полёта должна быть положительным числом',
        },
      }),
      columnHelper.display({
        id: 'actions',
        size: 41,
        cell: (info) => (
          <PopoverTable
            hasDetailsButton={true}
            row={info.row.original}
            index={info.row.index}
            id={info.row.original.id}
            handleEditRow={handleEditRow}
            deleteRow={deleteAircraft}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={airplanes?.length}
          />
        ),
      }),
    ],
    [
      columnHelper,
      deleteAircraft,
      editableRowState,
      editableRowIndex,
      handleEditRow,
      handleUpdateRow,
      setPaginationData,
      pageIndex,
      airplanes,
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: IAircraft[]) => {
    if (Array.isArray(data) && data.length) {
      return sortById(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(airplanes).slice(0, ITEMS_PER_PAGE),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (isFetching) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(airplanes) && airplanes?.length) {
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
          <HeaderTable<IAircraftPost>
            heading="Самолеты"
            formName={EModalNames.AIRPLANES}
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
        </Box>
        <FooterTable
          data={tableData(airplanes)}
          pageIndex={pageIndex}
          setPaginationData={setPaginationData}
          cancelEditing={cancelEditing}
          patchRow={patchRow}
          editableRowIndex={editableRowIndex}
          totalPages={totalPages}
        />
      </TableContainer>
    );
  }

  // алерт при ошбике
  return <AlertMessage />;
};

export default Airplanes;
