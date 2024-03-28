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
import { useCallback, useMemo, useState } from 'react';

import {
  IDestination,
  IDestinationPost,
} from '@interfaces/destination.interfaces';
import { EditableCell } from '@common/EditableCell';
import { EditableSelectCell } from '@/common/EditableSelectCell';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@common/FooterTable';
import { isRowEditing } from '@utils/table.utils';
import { sortDestinations } from '@utils/sort.utils';
import {
  useDestinationQuery,
  useDestinationQueryByPage,
  useDestinationPatch,
  useDestinationDelete,
  useSetCurrentPageInPagination,
} from '@/hooks';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import onlyLettersPattern from '@/constants/validate-patterns/only-letters-pattern';
import { ITEMS_PER_PAGE } from '@/constants/constants';

const Destinations = () => {
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    'DESTINATIONS_CURR_PAGE'
  );

  // получение данных
  const { data: destinationsByPageData, isFetching } =
    useDestinationQueryByPage(pageIndex);
  const { data: destinationsAllList } = useDestinationQuery();

  const destinationsByPage = destinationsByPageData?.content;
  const totalPages = destinationsByPageData?.totalPages;
  const destinationsAll = useMemo(
    () => destinationsAllList?.content.map((el) => el?.airportCode ?? '') || [],
    [destinationsAllList?.content]
  );

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IDestination | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = useCallback((row: IDestination, index: number) => {
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

  // изменение данных
  const { mutate: patchDestination } = useDestinationPatch();

  // удаление данных
  const { mutate: deleteDestination } = useDestinationDelete();

  // патч данных
  const patchRow = useCallback(() => {
    patchDestination(editableRowState);
    cancelEditing();
  }, [patchDestination, editableRowState, cancelEditing]);

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<IDestination>();
  const columns = useMemo(
    () => [
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
            info={info}
            fieldName="Страна"
            isDisabled={true}
          />
        ),
        meta: {
          type: 'text',
          required: true,
          validate: (value: string) => {
            const regex = new RegExp(onlyLettersPattern.letters.message);
            return regex.test(value);
          },
          validationMessage: onlyLettersPattern.letters.message,
        },
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
            info={info}
            fieldName="Город"
            isDisabled={true}
          />
        ),
        meta: {
          type: 'text',
          required: true,
          validate: (value: string) => {
            const regex = new RegExp(onlyLettersPattern.letters.message);
            return regex.test(value);
          },
          validationMessage: onlyLettersPattern.letters.message,
        },
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
            info={info}
            fieldName="Имя аэропорта"
            isDisabled={true}
          />
        ),
      }),
      columnHelper.accessor('airportCode', {
        header: 'Код аэропорта',
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
            selectOptions={destinationsAll}
            getRenderValue={(code: string) => code.toUpperCase()}
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
            info={info}
            fieldName="Часовой пояс"
          />
        ),
      }),
      columnHelper.display({
        id: 'actions',
        size: 41,
        cell: (info) => (
          <PopoverTable
            hasDetailsButton={false}
            row={info.row.original}
            index={info.row.index}
            id={info.row.original.id}
            handleEditRow={handleEditRow}
            deleteRow={deleteDestination}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={destinationsByPage?.length}
          />
        ),
      }),
    ],
    [
      columnHelper,
      deleteDestination,
      editableRowIndex,
      editableRowState,
      handleUpdateRow,
      handleEditRow,
      setPaginationData,
      pageIndex,
      destinationsByPage,
      destinationsAll,
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: IDestination[]) => {
    if (Array.isArray(data) && data.length) {
      return sortDestinations(data);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(destinationsByPage).slice(0, ITEMS_PER_PAGE),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (isFetching) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(destinationsByPage) && destinationsByPage?.length) {
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
          <HeaderTable<IDestinationPost>
            heading="Места назначения"
            formName={EModalNames.DESTINATIONS}
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
          data={tableData(destinationsByPage)}
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

export default Destinations;
