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
import { useCallback, useMemo, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { ISeat, ISeatForm } from '@/interfaces/seat.interfaces';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { HeaderAdmin } from '@common/HeaderAdmin';
import { FooterTable } from '@common/FooterTable';
import { isRowEditing } from '@utils/table.utils';
import { sortSeat } from '@utils/sort.utils';
import { useSeatGet } from '@hooks/useSeatGet';
import { useSeatPost } from '@hooks/useSeatPost';
import { useSeatDelete } from '@hooks/useSeatDelete';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import ELinks from '@services/admin-router-links.service';

const Airplane = () => {
  // индекс и размер пагинации
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<ISeat | null>(null);

  // установка редактируемой строки
  const handleEditRow = useCallback((row: ISeat, index: number) => {
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
  const { data: seat, isLoading } = useSeatGet();

  // изменение данных
  const { mutate: postSeat } = useSeatPost();

  // удаление данных
  const { mutate: deleteSeat } = useSeatDelete();

  // патч данных
  const postRow = useCallback(() => {
    if (editableRowState) {
      postSeat(editableRowState);
    }
    cancelEditing();
  }, [postSeat, cancelEditing, editableRowState]);

  // Состояние для хранения выбранного класса для фильтра
  const [selectedValue, setSelectedValue] = useState('');

  // Обновляем выбранное значение и фильтруем данные
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    filterData(value);
  };

  const [filteredSeat, setFilteredSeat] = useState<ISeat[]>([]);

  // функция для фильтрации данных
  const filterData = useCallback(
    (value: string) => {
      if (seat) {
        const filteredData =
          selectedValue !== ''
            ? seat.filter((item) => item.category.categoryType === value)
            : seat;
        setFilteredSeat(filteredData);
      }
    },
    [seat, selectedValue]
  );

  // Вызываем функцию filterData с текущим выбранным значением
  useEffect(() => {
    filterData(selectedValue);
  }, [selectedValue, filterData]);

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<ISeat>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID Сиденья',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),
      columnHelper.accessor('seatNumber', {
        header: 'Номер сиденье',
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
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              String(info.row.original.category.categoryType),
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
      columnHelper.accessor('isLockedBack', {
        header: 'Неподвижное сидень',
        cell: (info) => (
          <EditableCell
            value={
              isRowEditing(
                info.row.index,
                info.column.id,
                String(info.getValue()),
                editableRowState,
                editableRowIndex
              ) === 'true'
                ? 'Да'
                : 'Нет'
            }
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
          />
        ),
      }),
      columnHelper.accessor('isNearEmergencyExit', {
        header: 'Близко к экстренному выходу',
        cell: (info) => (
          <EditableCell
            value={
              isRowEditing(
                info.row.index,
                info.column.id,
                String(info.getValue()),
                editableRowState,
                editableRowIndex
              ) === 'true'
                ? 'Да'
                : 'Нет'
            }
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
  const tableData = (data?: ISeat[]) => {
    if (Array.isArray(data) && data.length) {
      return sortSeat(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data:
      selectedValue !== ''
        ? tableData(filteredSeat).slice(
            pageIndex * pageSize,
            pageIndex * pageSize + pageSize
          )
        : tableData(seat).slice(
            pageIndex * pageSize,
            pageIndex * pageSize + pageSize
          ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // функция для обновления пагинации
  const setPaginationData = useCallback(
    (pageNumber: number) => {
      if (filteredSeat.length) {
        const seatLength = filteredSeat.length;
        if (pageNumber >= 0 && pageNumber < seatLength / pageSize) {
          setPagination((prev) => ({
            ...prev,
            pageIndex: pageNumber,
          }));
        }
      }
    },
    [filteredSeat.length, pageSize]
  );

  // спиннер при загрузке
  if (isLoading) {
    return <SpinnerBlock />;
  }

  // если нет токена авторизации, перебрасываем на форму логина
  if (!localStorage.getItem('adminToken')) {
    return <Navigate to={ELinks.ADMIN_LOGIN} />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(seat) && seat?.length) {
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
          <HeaderAdmin<ISeatForm>
            heading="Имя самолета"
            formName={EModalNames.SEAT}
            select
            selectedValue={selectedValue}
            handleSelectChange={handleSelectChange}
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
          data={tableData(seat)}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPaginationData={setPaginationData}
          cancelEditing={cancelEditing}
          patchRow={postRow}
          editableRowIndex={editableRowIndex}
        />
      </TableContainer>
    );
  }

  // алерт при ошибке
  return <AlertMessage />;
};

export default Airplane;
