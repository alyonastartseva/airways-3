import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState, memo } from 'react';

import { EditableSelectCell } from '@/common/EditableSelectCell';
import { ITEMS_PER_PAGE, flightStatuses } from '@/constants/constants';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { useAircraftQuery, useFlightsDelete, useFlightsQuery, useFlightsPatch, useSetCurrentPageInPagination } from '@/hooks';
import { IAircraft } from '@/interfaces/aircraft.interfaces';
import {
  IFlightPostFormFields,
  IFlightPresentation,
  TFlightsStatus,
} from '@/interfaces/flights.interfaces';
import { AlertMessage } from '@common/AlertMessage';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { FooterTable } from '@common/FooterTable';
import { HeaderTable } from '@/common/HeaderTable';
import { PopoverTable } from '@common/PopoverTable';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { isRowEditing } from '@utils/table.utils';

const Flights = () => {
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination('FLIGHTS_CURR_PAGE');

  // получение данных
  const { data: airplanesData, isLoading: isAircraftLoading } =
    useAircraftQuery(pageIndex);
  const airplanes = airplanesData?.content;

  const { data: flightsData, isError, isFetching  } = useFlightsQuery(pageIndex);

  const flights = flightsData?.content;
  const totalPages = flightsData?.totalPages;

  // стейт и индекс изменяемой строки
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] =
    useState<Required<IFlightPresentation> | null>(null);

  // установка редактируемой строки
  const handleEditRow = useCallback(
    (row: Required<IFlightPresentation>, index: number) => {
      setEditableRowState(row);
      setEditableRowIndex(index);
    },
    []
  );

  // сброс редактируемой строки
  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

  // обновление редактируемой строки
  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (!editableRowState) return;

      setEditableRowState({
        ...editableRowState,
        [id as keyof IFlightPresentation]: value,
      });
    },
    [editableRowState]
  );

  const { mutate: deleteFlight } = useFlightsDelete();
  const { mutate: patchFlights } = useFlightsPatch();

  const patchRow = useCallback(() => {
    patchFlights(editableRowState);
    cancelEditing();
  }, [patchFlights, editableRowState, cancelEditing]);

  // форматирование даты
  const formatDate = (date: string): string => {
    const dateFormat = 'DD.MM.YYYY HH:mm';
    return dayjs(date).format(dateFormat);
  };

  // получение модели самолета по id
  const getAircraftModel = useCallback(
    (id: string) => {
      if (airplanes) {
        const aircraftInfo = airplanes.find((el) => el.id.toString() === id);
        if (aircraftInfo) {
          return aircraftInfo.model;
        } else return id.toString();
      }
      return '';
    },
    [airplanes]
  );

  // option для поля "модель самолета"
  const getAircraftSelectOptions = (aircrafts: IAircraft[] | undefined) => {
    if (aircrafts) {
      return aircrafts.map((airplane) => airplane.id.toString());
    }
    return [];
  };

  // получение названия статуса по value
  const getStatusName = (status: TFlightsStatus): string => {
    switch (status) {
      case 'DELAYED':
        return 'Отложен';
      case 'DEPARTED':
        return 'Отправлен';
      case 'CANCELED':
        return 'Отменен';
      case 'COMPLETED':
        return 'Завершенный';
      case 'ARRIVED':
        return 'Прибыл';
      case 'ON_TIME':
        return 'В срок';
      default:
        return '';
    }
  };

  // создание столбцов таблицы
  const columnHelper = createColumnHelper<Required<IFlightPresentation>>();
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
      columnHelper.accessor('airportFrom', {
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
      columnHelper.accessor('airportTo', {
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
              formatDate(info.getValue()),
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
              formatDate(info.getValue()),
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
          <EditableSelectCell
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
            selectOptions={getAircraftSelectOptions(airplanes)}
            getRenderValue={getAircraftModel}
          />
        ),
      }),
      columnHelper.accessor('flightStatus', {
        header: 'Статус',
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
            selectOptions={flightStatuses}
            getRenderValue={getStatusName}
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
            deleteRow={deleteFlight}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={flights?.length}
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
      deleteFlight,
      airplanes,
      getAircraftModel,
      setPaginationData,
      pageIndex,
      flights,
    ]
  );

  // сортировка получаемых данных. ВРЕМЕННО, ПОКА ДАННЫЕ С СЕРВЕРА ПРИХОДЯТ БЕЗ СОРТИРОВКИ
  const tableData = (data?: Required<IFlightPresentation>[]) => {
    if (Array.isArray(data) && data.length) {
      return data.sort((a, b) => a.id - b.id);
    }
    return [];
  };

  // создание таблицы
  const table = useReactTable({
    data: tableData(flights),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  // спиннер при загрузке
  if (isAircraftLoading || isFetching ) {
    return <SpinnerBlock />;
  }

  if (Array.isArray(flights) && flights?.length && !isError) {
    return (
      <TableContainer my={10} mx={9}>
        <HeaderTable<IFlightPostFormFields>
          heading="Рейсы"
          formName={EModalNames.FLIGHTS}
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
          setPaginationData={setPaginationData}
          cancelEditing={cancelEditing}
          patchRow={patchRow}
          editableRowIndex={editableRowIndex}
          totalPages={totalPages}
        />
      </TableContainer>
    );
  } else return <AlertMessage />;
};

const memorizedFlights = memo(Flights);
export default memorizedFlights;
