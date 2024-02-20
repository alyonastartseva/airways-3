import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Flex,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useState, useMemo, useEffect, memo } from 'react';

import { AlertMessage } from '@common/AlertMessage';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { IPassenger } from '@interfaces/search.interfaces';
import { PersonGenders } from '@/interfaces/person.interfaces';
import { EditableCell } from '@common/EditableCell';
import { EditableSelectCell } from '@/common/EditableSelectCell';
import { isRowEditing } from '@utils/table.utils';
import { FlexCell } from '@common/FlexCell';
import { PopoverTable } from '@common/PopoverTable';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@common/FooterTable';
import { usePassengersDelete, usePassengersPatch, usePassengersQuery, useSetCurrentPageInPagination } from '@/hooks';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { IFormPassengers } from '@/interfaces/passenger.interfaces';
import { ITEMS_PER_PAGE } from '@/constants/constants';

const Passengers = () => {
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination('PASSENGERS_CURR_PAGE');

  // получение данных
  const { data: dataQuery, isLoading } = usePassengersQuery(pageIndex);

  const passengers = dataQuery?.content;
  const totalPages = dataQuery?.totalPages;

  // если удален последняя строка текущей страницы, то открываем предыдущую страницу
  useEffect(() => {
    if (!passengers && pageIndex > 0) setPaginationData(pageIndex - 1);
  }, [passengers, pageIndex]);

  useEffect(() => {
    const currPage = Number(localStorage.getItem('PASSENGERS_CURR_PAGE'));
    if (currPage > 0) setPaginationData(currPage);
  }, []);

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IPassenger | null>(
    null
  );

  // установка редактируемой строки
  const handleEditRow = useCallback((row: IPassenger, index: number) => {
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
      if (editableRowState) {
        // если id ссылается на свойство вложенного объекта
        if (id.indexOf('_') !== -1) {
          const key1 = id.slice(0, id.indexOf('_'));
          const key2 = id.slice(id.indexOf('_') + 1);
          const nestedObject = editableRowState[key1 as keyof IPassenger];

          if (nestedObject && typeof nestedObject === 'object') {
            setEditableRowState({
              ...editableRowState,
              [key1 as keyof IPassenger]: {
                ...nestedObject,
                [key2 as keyof typeof nestedObject]: value,
              },
            });
          }
        } else {
          setEditableRowState({
            ...editableRowState,
            [id as keyof IPassenger]: value,
          });
        }
      }
    },
    [editableRowState]
  );

  // изменение данных
  const { mutate: patchPassengers } = usePassengersPatch();

  // удаление данных
  const { mutate: deletePassengers } = usePassengersDelete();
  // патч данных
  const patchRow = useCallback(() => {
    patchPassengers(editableRowState);
    cancelEditing();
  }, [patchPassengers, editableRowState, cancelEditing]);

  // получение названия пола по value
  const getGenderName = (value: PersonGenders): 'Муж.' | 'Жен.' => {
    switch (value) {
      case PersonGenders.FEMALE:
        return 'Жен.';
      case PersonGenders.MALE:
        return 'Муж.';
    }
  };

  // value для select колонки 'Пол'
  const genderSelectOptions = Object.values(PersonGenders);

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<IPassenger>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),
      columnHelper.accessor(
        (row) => ({
          firstName: {
            value: row.firstName,
            id: 'firstName',
          },
          lastName: {
            value: row.lastName,
            id: 'lastName',
          },
          middleName: {
            value: row.passport?.middleName,
            id: 'passport_middleName',
          },
        }),
        {
          header: 'Имя, Фамилия, Отчество',
          cell: (info) => (
            <Flex>
              <EditableCell
                value={isRowEditing(
                  info.row.index,
                  info.getValue().firstName.id,
                  info.getValue().firstName.value,
                  editableRowState,
                  editableRowIndex
                )}
                index={info.row.index}
                id={info.getValue().firstName.id}
                editableRowIndex={editableRowIndex}
                updateData={handleUpdateRow}
              />
              <EditableCell
                value={isRowEditing(
                  info.row.index,
                  info.getValue().lastName.id,
                  info.getValue().lastName.value,
                  editableRowState,
                  editableRowIndex
                )}
                index={info.row.index}
                id={info.getValue().lastName.id}
                editableRowIndex={editableRowIndex}
                updateData={handleUpdateRow}
              />
              <EditableCell
                value={isRowEditing(
                  info.row.index,
                  info.getValue().middleName.id,
                  info.getValue().middleName.value,
                  editableRowState,
                  editableRowIndex
                )}
                index={info.row.index}
                id={info.getValue().middleName.id}
                editableRowIndex={editableRowIndex}
                updateData={handleUpdateRow}
              />
            </Flex>
          ),
        }
      ),
      columnHelper.accessor('passport.gender', {
        header: 'Пол',
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
            selectOptions={genderSelectOptions}
            getRenderValue={getGenderName}
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
    ],
    [
      columnHelper,
      editableRowState,
      editableRowIndex,
      handleEditRow,
      handleUpdateRow,
      deletePassengers,
      genderSelectOptions,
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: IPassenger[]) => {
    if (Array.isArray(data) && data.length) {
      return data;
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(passengers).slice(0, ITEMS_PER_PAGE),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (isLoading) {
    return <SpinnerBlock />;
  }

  // если полученные данные в порядке выводим таблицу
  if (Array.isArray(passengers) && passengers?.length) {
    return (
      <TableContainer my={10} mx={14}>
        <HeaderTable<IFormPassengers>
          heading="Пассажиры"
          formName={EModalNames.PASSENGERS}
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
          setPaginationData={setPaginationData}
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

const memorizedPassengers = memo(Passengers);
export default memorizedPassengers;
