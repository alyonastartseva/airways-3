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
import { useFlightSeatsQuery, useSetCurrentPageInPagination } from '@/hooks';
import {
  IFSOne,
  IFSoneSeat,
  ISeatCategory,
  ISeatCategoryType,
  IFlightSeatsPost,
} from '@/interfaces/flightsSeats.interfaces';
import { isRowEditing } from '@/utils/table.utils';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@common/FooterTable';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { PopoverTable } from '@/common/PopoverTable';
import { useFlightSeatsDelete, useFlightSeatsPatch } from '@/hooks/flightSeats';
import { EditableSelectCell } from '@/common/EditableSelectCell';
import { SpinnerBlock } from '@/common';

const Seats = () => {
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    'FLIGHTSSEATS_CURR_PAGE'
  );
  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);

  const [editableRowState, setEditableRowState] = useState<Required<
    IFSOne & IFSoneSeat
  > | null>(null);

  const { data: dataFlightSeats, isFetching } = useFlightSeatsQuery(pageIndex);

  const handleUpdateRow = useCallback(
    (id: string, value: string, categor?: boolean) => {
      if (!editableRowState) return;
      if (categor) {
        const seat = { category: value };
        const newState = { ...editableRowState };
        return setEditableRowState({
          ...editableRowState,
          [id as keyof IFSOne]: value,
        });
      }
      setEditableRowState({
        ...editableRowState,
        [id as keyof IFSOne]: value,
      });
    },
    [editableRowState]
  );

  const totalPagesFlights = dataFlightSeats?.totalPages;

  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

  const { mutate: patchFlightSeats } = useFlightSeatsPatch();

  const patchRow = useCallback(() => {
    patchFlightSeats(editableRowState!);
    cancelEditing();
  }, [patchFlightSeats, editableRowState, cancelEditing]);

  const { mutate: deleteFlightSeats } = useFlightSeatsDelete();

  const handleEditRow = useCallback(
    (row: Required<IFSOne & IFSoneSeat>, index: number) => {
      setEditableRowState(row);
      setEditableRowIndex(index);
    },
    []
  );

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

  const flightClassOptions = Object.values(ISeatCategory);
  const columnHelper = createColumnHelper<IFSOne>();

  const columnCreator = (
    fieldName: keyof IFSOne | `seat.${keyof IFSoneSeat}`,
    header: string,
    tableType?: 'EditableCell' | 'EditableSelectCell' | 'Cell',
    tableBool?: boolean
  ) => {
    if (tableType === 'EditableCell') {
      return columnHelper.accessor(fieldName, {
        header,
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
                String(info.getValue()),
                editableRowState,
                editableRowIndex
              )}
              index={info.row.index}
              id={info.column.id}
              editableRowIndex={editableRowIndex}
              updateData={(id, value) =>
                handleUpdateRow(id, value === 'true' ? 'true' : 'false')
              }
              selectOptions={['true', 'false']}
              getRenderValue={(value) => (value === 'true' ? 'Да' : 'Нет')}
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
              updateData={(id, value) => handleUpdateRow(id, value, true)}
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
      columnCreator('seat.seatNumber', 'ID Места', 'EditableCell'),
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

  const tableData = (data?: IFSOne[]) => {
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

  if (isFetching) {
    return <SpinnerBlock />;
  }

  return (
    <TableContainer py={45} px={9}>
      <HeaderTable<IFlightSeatsPost>
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
        totalPages={totalPagesFlights ? totalPagesFlights - 1 : 1}
      />
    </TableContainer>
  );
};

export default Seats;
