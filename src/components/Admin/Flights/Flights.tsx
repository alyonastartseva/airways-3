import { useCallback, useMemo, useState, memo, useEffect } from 'react';
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
import { useSearchParams } from 'react-router-dom';

import { flightStatuses, EModalNames, scrollTable } from '@/constants';
import { DestinationsInputSelector } from '@/components';
import {
  IAircraft,
  IFlightPostFormFields,
  IFlightPresentation,
  TFlightsStatus,
} from '@/interfaces';
import { useFlightsQuery, useSetCurrentPageInPagination } from '@/hooks';
import { AlertMessage } from '@common/AlertMessage';
import { EditableCell } from '@common/EditableCell';
import { FlexCell } from '@common/FlexCell';
import { FooterTable } from '@common/FooterTable';
import { HeaderTable } from '@/common/HeaderTable';
import { PopoverTable } from '@common/PopoverTable';
import { SpinnerBlock } from '@common/SpinnerBlock';
import { isRowEditing } from '@utils/table.utils';
import { formatDateTime } from '@utils/date.utils';
import {
  useGetAircraftQuery,
  useDeleteFlightMutation,
  usePatchFlightMutation,
} from '@/store/services/apiSlice';
import { EditableSelectCell } from '@/common';

const PAGE_KEY = 'FLIGHTS_CURR_PAGE';

const Flights = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = +(searchParams.get('page') || 1) - 1;
  // индекс и размер пагинации
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    PAGE_KEY,
    Number(pageParam || localStorage.getItem(PAGE_KEY) || 0)
  );

  const { data: airplanesData, isLoading: isAircraftLoading } =
    useGetAircraftQuery({ page: pageIndex });
  const airplanes = airplanesData?.content;

  const { data: flightsData, isError, isFetching } = useFlightsQuery(pageIndex);

  const flights = flightsData?.content;
  const totalPagesFlights = flightsData?.totalPages;

  useEffect(() => {
    setSearchParams({ page: String(pageIndex + 1) });
  }, [pageIndex]);

  useEffect(() => {
    if (!isFetching && !flights && pageIndex > 0)
      setPaginationData(pageIndex - 1);
  }, [flights, pageIndex, setPaginationData, isFetching]);

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] =
    useState<Required<IFlightPresentation> | null>(null);

  const handleEditRow = useCallback(
    (row: Required<IFlightPresentation>, index: number) => {
      setEditableRowState(row);
      setEditableRowIndex(index);
    },
    []
  );

  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

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

  const [deleteFlight] = useDeleteFlightMutation();
  const [patchFlights] = usePatchFlightMutation();

  const patchRow = useCallback(() => {
    patchFlights(editableRowState);
    cancelEditing();
  }, [patchFlights, editableRowState, cancelEditing]);

  const getAircraftModel = useCallback(
    (id: string) => {
      if (airplanes) {
        const aircraftInfo = airplanes.find(
          (el: IAircraft) => el.id.toString() === id
        );
        if (aircraftInfo) {
          return aircraftInfo.model;
        } else return id.toString();
      }
      return '';
    },
    [airplanes]
  );

  const getAircraftSelectOptions = (aircrafts: IAircraft[] | undefined) => {
    if (aircrafts) {
      return aircrafts.map((airplane) => airplane.id.toString());
    }
    return [];
  };

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
          <DestinationsInputSelector
            placeholder="Город откуда"
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue(),
              editableRowState,
              editableRowIndex
            )}
            type="editable"
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
          <DestinationsInputSelector
            placeholder="Город куда"
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue(),
              editableRowState,
              editableRowIndex
            )}
            type="editable"
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
              formatDateTime(info.getValue()),
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
              formatDateTime(info.getValue()),
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

  // TODO: удалить когда будет сортировка на бэке
  const tableData = (data?: Required<IFlightPresentation>[]) => {
    if (Array.isArray(data) && data.length) {
      return [...data].sort((a, b) => a.id - b.id);
    }
    return [];
  };

  const table = useReactTable({
    data: tableData(flights),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isAircraftLoading || isFetching) {
    return <SpinnerBlock />;
  }

  if (Array.isArray(flights) && flights?.length && !isError) {
    return (
      <TableContainer py={45} px={9}>
        <HeaderTable<IFlightPostFormFields>
          heading="Рейсы"
          formName={EModalNames.FLIGHTS}
        />
        <div {...scrollTable}>
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
        </div>
        <FooterTable
          data={tableData(flights)}
          pageIndex={pageIndex}
          setPaginationData={setPaginationData}
          cancelEditing={cancelEditing}
          patchRow={patchRow}
          editableRowIndex={editableRowIndex}
          totalPages={totalPagesFlights}
        />
      </TableContainer>
    );
  } else return <AlertMessage />;
};

const memorizedFlights = memo(Flights);
export default memorizedFlights;
