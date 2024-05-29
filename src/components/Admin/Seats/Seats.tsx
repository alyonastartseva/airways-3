import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { EditableCell } from '@/common/EditableCell';
import { FlexCell } from '@/common/FlexCell';
import {
  useFlightSeatsQuery,
  useFlightsPatch,
  useSetCurrentPageInPagination,
} from '@/hooks';
import {
  IFlightSeatsPresentation,
  ISeatCategory,
  ISeatCategoryType,
} from '@/interfaces/flightsSeats.interfaces';
import { isRowEditing } from '@/utils/table.utils';
import { IFlightSeat } from '@/services/flightSeats/flightSeats.interfaces';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@common/FooterTable';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { IFlightPostFormFields } from '@/interfaces/flights.interfaces';
import { PopoverTable } from '@/common/PopoverTable';
import { useFlightSeatsDelete } from '@/hooks/flightSeats';
import { EditableSelectCell } from '@/common/EditableSelectCell';

const Seats = () => {
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    'FLIGHTSSEATS_CURR_PAGE'
  );
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);

  const [editableRowState, setEditableRowState] =
    useState<Required<IFlightSeatsPresentation> | null>(null);

  const { data: dataFlightSeats } = useFlightSeatsQuery(pageIndex);

  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (!editableRowState) return;

      setEditableRowState({
        ...editableRowState,
        [id as keyof IFlightSeatsPresentation]: value,
      });
    },
    [editableRowState]
  );

  const totalPagesFlights = dataFlightSeats?.totalPages;

  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

  const { mutate: patchFlights } = useFlightsPatch();

  const patchRow = useCallback(() => {
    patchFlights(editableRowState);
    cancelEditing();
  }, [patchFlights, editableRowState, cancelEditing]);

  const { mutate: deleteFlightSeats } = useFlightSeatsDelete();

  const handleEditRow = useCallback(
    (row: IFlightSeatsPresentation, index: number) => {
      setEditableRowState(row);
      setEditableRowIndex(index);
    },
    []
  );

  const columnHelper = createColumnHelper<IFlightSeat>();

  type columnType =
    | 'id'
    | 'seat.aircraftId'
    | 'seat.id'
    | 'fare'
    | 'seat.category'
    | 'isSold'
    | 'isRegistered'
    | 'isBooked';

  const columnCreator = (
    fieldName: columnType,
    header: string,
    tableType?: 'EditableCell' | 'EditableSelectCell' | 'Cell',
    tableBool?: boolean
  ) => {
    const flightClass = (value: ISeatCategory): ISeatCategoryType => {
      switch (value) {
        case ISeatCategory.BUSINESS:
          return 'Бизнес';
        case ISeatCategory.ECONOM:
          return 'Эконом';
        case ISeatCategory.FIRST:
          return 'Первый класс';
        case ISeatCategory.PREMIUM_ECONOMY:
          return 'Премиум';
      }
    };

    const boolCheck = (str: string): string => (str === 'Да' ? 'Да' : 'Нет');

    const flightClassOptions = Object.values(ISeatCategory);

    if (tableType === 'EditableCell') {
      return columnHelper.accessor(fieldName, {
        header,
        cell: (info) => (
          <EditableCell
            value={isRowEditing(
              info.row.index,
              info.column.id,
              info.getValue()!.toString(),
              editableRowState,
              editableRowIndex
            )}
            index={info.row.index}
            id={info.column.id}
            editableRowIndex={editableRowIndex}
            updateData={handleUpdateRow}
          />
        ),
      });
    }
    if (tableType === 'EditableSelectCell') {
      if (tableBool) {
        return columnHelper.accessor(fieldName, {
          header,
          cell: (info) => (
            <EditableSelectCell
              value={isRowEditing(
                info.row.index,
                info.column.id,
                info.getValue() ? 'Да' : 'Нет',
                editableRowState,
                editableRowIndex
              )}
              index={info.row.index}
              id={info.column.id}
              editableRowIndex={editableRowIndex}
              updateData={handleUpdateRow}
              selectOptions={['Да', 'Нет']}
              getRenderValue={boolCheck}
            />
          ),
        });
      } else {
        return columnHelper.accessor(fieldName, {
          header,
          cell: (info) => (
            <EditableSelectCell
              value={isRowEditing(
                info.row.index,
                info.column.id,
                info.getValue()?.toString(),
                editableRowState,
                editableRowIndex
              )}
              index={info.row.index}
              id={info.column.id}
              editableRowIndex={editableRowIndex}
              updateData={handleUpdateRow}
              selectOptions={flightClassOptions}
              getRenderValue={flightClass}
            />
          ),
        });
      }
    }

    return columnHelper.accessor('id', {
      header,
      cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
      size: 41,
    });
  };

  const columns = useMemo(
    () => [
      columnCreator('id', 'ID', 'Cell'),
      columnCreator('seat.aircraftId', 'ID рейса', 'EditableCell'),
      columnCreator('seat.id', 'ID Места', 'EditableCell'),
      columnCreator('fare', 'Цена', 'EditableCell'),
      columnCreator('seat.category', 'Класс', 'EditableSelectCell', false),
      columnCreator('isSold', 'Продано', 'EditableSelectCell', true),
      columnCreator(
        'isRegistered',
        'Зарегестрировано',
        'EditableSelectCell',
        true
      ),
      columnCreator('isBooked', 'Забронировано', 'EditableSelectCell', true),
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
            deleteRow={deleteFlightSeats}
            setPaginationIndex={setPaginationData}
            indexPage={pageIndex}
            numberElem={dataFlightSeats?.content.length}
          />
        ),
      }),
    ],
    [
      columnHelper,
      editableRowIndex,
      editableRowState,
      handleUpdateRow,
      columnCreator,
      dataFlightSeats?.content.length,
      deleteFlightSeats,
      handleEditRow,
      pageIndex,
      setPaginationData,
    ]
  );

  const tableData = (data?: IFlightSeat[]) => {
    if (Array.isArray(data) && data.length) {
      return data.sort((a, b) => a.id - b.id);
    }
    return [];
  };
  const table = useReactTable({
    data: tableData(dataFlightSeats?.content),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <TableContainer py={45} px={9}>
      <HeaderTable<IFlightPostFormFields>
        heading="Посадочные Места"
        formName={EModalNames.FLIGHTS_SEATS}
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
        data={tableData(dataFlightSeats?.content)}
        pageIndex={pageIndex}
        setPaginationData={setPaginationData}
        cancelEditing={cancelEditing}
        patchRow={patchRow}
        editableRowIndex={editableRowIndex}
        totalPages={totalPagesFlights}
      />
    </TableContainer>
  );
};

export default Seats;
