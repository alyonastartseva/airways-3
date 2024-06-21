import { Table, Tbody, Th, Td, Thead, Tr } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import {
  EditableCell,
  EditableSelectCell,
  FlexCell,
  FooterTable,
  PopoverTable,
} from '@/common';
import {
  IFSOne,
  IFSoneSeat,
  ISeatCategory,
} from '@/interfaces/flightsSeats.interfaces';
import { isRowEditing } from '@/utils/table.utils';
import {
  useDeleteFlightSeatsMutation,
  usePatchFlightSeatsMutation,
} from '@/store/services';
import { scrollTable } from '@/constants';

import { gitTicketClassName } from '../Airplane/Airplane.utils';

interface SeatsTableProps {
  data: IFSOne[];
  page: number;
  totalPages: number;
  setPaginationData: (v: number) => void;
}

export const SeatsTable: React.FC<SeatsTableProps> = ({
  data,
  page,
  totalPages,
  setPaginationData,
}: {
  data: IFSOne[];
  page: number;
  totalPages: number;
  setPaginationData: (v: number) => void;
}) => {
  const [patchFlightSeats] = usePatchFlightSeatsMutation();
  const [deleteFlightSeats] = useDeleteFlightSeatsMutation();

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<Required<
    IFSOne & IFSoneSeat
  > | null>(null);

  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (editableRowState) {
        if (id.indexOf('_') !== -1) {
          const key1 = id.slice(0, id.indexOf('_'));
          const key2 = id.slice(id.indexOf('_') + 1);
          const nestedObject = editableRowState[key1 as keyof IFSOne];

          if (nestedObject && typeof nestedObject === 'object') {
            setEditableRowState({
              ...editableRowState,
              [key1 as keyof IFSOne]: {
                ...nestedObject,
                [key2 as keyof typeof nestedObject]: value,
              },
            });
          }
        } else {
          setEditableRowState({
            ...editableRowState,
            [id as keyof IFSOne]: value,
          });
        }
      }
    },
    [editableRowState]
  );

  const cancelEditing = useCallback(() => {
    setEditableRowIndex(null);
    setEditableRowState(null);
  }, []);

  const patchRow = useCallback(() => {
    patchFlightSeats(editableRowState!);
    cancelEditing();
  }, [patchFlightSeats, editableRowState, cancelEditing]);

  const handleEditRow = useCallback(
    (row: Required<IFSOne & IFSoneSeat>, index: number) => {
      setEditableRowState(row);
      setEditableRowIndex(index);
    },
    []
  );

  const flightClassOptions = Object.values(ISeatCategory);
  const columnHelper = createColumnHelper<IFSOne>();

  const columnCreator = (
    fieldName: keyof IFSOne | `seat.${keyof IFSoneSeat}`,
    header?: string,
    tableType?: 'EditableCell' | 'EditableSelectCell' | 'Cell' | 'actions',
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
              updateData={(id, value) => handleUpdateRow(id, value)}
              selectOptions={flightClassOptions}
              getRenderValue={gitTicketClassName}
            />
          ),
        });
      }
    }

    if (tableType === 'actions') {
      return columnHelper.display({
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
            indexPage={page}
            numberElem={data.length}
          />
        ),
      });
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
      columnCreator('id', 'настройки', 'actions'),
    ],
    [
      columnHelper,
      editableRowIndex,
      editableRowState,
      handleUpdateRow,
      columnCreator,
      data.length,
      deleteFlightSeats,
      handleEditRow,
      page,
      setPaginationData,
    ]
  );

  const tableData = (seat?: IFSOne[]) => {
    if (Array.isArray(seat) && seat.length) {
      return seat;
    }
    return [];
  };
  const table = useReactTable({
    data: tableData(data),
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      <FooterTable
        data={tableData(data)}
        pageIndex={page}
        setPaginationData={setPaginationData}
        cancelEditing={cancelEditing}
        patchRow={patchRow}
        editableRowIndex={editableRowIndex}
        totalPages={totalPages ? totalPages - 1 : 1}
      />
    </div>
  );
};
