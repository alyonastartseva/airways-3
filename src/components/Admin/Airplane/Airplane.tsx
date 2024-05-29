import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Td,
  Tr,
  Th,
  Box,
  useToast,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import {
  ISeatForm,
  ISeatPost,
  TSeatCategory,
} from '@/interfaces/seat.interfaces';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@common/FooterTable';
import { isRowEditing } from '@utils/table.utils';
import { sortById } from '@utils/sort.utils';
import {
  useSeatQuery,
  useSeatDelete,
  useSeatPatch,
  useSetCurrentPageInPagination,
} from '@/hooks';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { ELinks } from '@services/constants';
import { ITEMS_PER_PAGE, seatCategory, yesNo } from '@constants/constants';
import { EditableSelectCell } from '@/common/EditableSelectCell';
import { SeatCategory } from '@/common/SeatCategory';
import { useGetAircraftByIdQuery } from '@/store/services';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';

// получение названия класса билета
const getStatusName = (status: TSeatCategory): string => {
  const obj = seatCategory.find((el) => el.eng === status);
  return obj?.ru || '';
};

const getYesNo = (status: string): string => {
  switch (status) {
    case 'true':
      return 'Да';
    case 'false':
      return 'Нет';
    default:
      return '';
  }
};

const Airplane = () => {
  // получение параметра ID из роута
  const param = useParams();
  const toast = useToast();
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] =
    useSetCurrentPageInPagination('AIRPLANE_CURR_PAGE');

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

  const { data: dataSeat, isLoading } = useSeatQuery(
    Number(airplaneId),
    pageIndex
  );

  const seat = dataSeat?.content;
  const totalPages = dataSeat?.totalPages;

  const {
    data: dataAirplane,
    isError,
    error,
  } = useGetAircraftByIdQuery(Number(airplaneId));
  const planeName = dataAirplane?.model;

  const initialFormValues = { aircraftId: airplaneId };

  // изменение данных НЕ ИСПОЛЬЗУЕТСЯ
  // const { mutate: postSeat } = useSeatPost();

  // удаление данных
  const { mutate: deleteSeat } = useSeatDelete();

  // патч данных
  const { mutate: patchSeat } = useSeatPatch();

  // добавление данных НЕ ИСПОЛЬЗУЕТСЯ
  // const postRow = useCallback(() => {
  //   if (editableRowState) {
  //     postSeat(editableRowState);
  //   }
  //   cancelEditing();
  // }, [postSeat, cancelEditing, editableRowState]);

  // патч данных
  const patchRow = useCallback(() => {
    patchSeat(editableRowState);
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
    if (isError && isFetchBaseQueryError(error))
      toast({
        status: 'error',
        title: error.data.message || 'Something went wrong',
        position: 'top',
      });
  }, [isError, toast, error]);

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
            getRenderValue={getStatusName}
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
      return sortById(data);
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
  if (isLoading) {
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
