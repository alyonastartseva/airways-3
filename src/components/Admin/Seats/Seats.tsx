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
import { IFlightSeatsPresentation } from '@/interfaces/flightsSeats.interfaces';
import { isRowEditing } from '@/utils/table.utils';
import {
  IFlightSeat,
  IFlightSeatsQuery,
} from '@/services/flightSeats/flightSeats.interfaces';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@common/FooterTable';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import { IFlightPostFormFields } from '@/interfaces/flights.interfaces';

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

  const out: IFlightSeatsQuery | undefined = dataFlightSeats;
  // if (out === undefined) {
  //     return <div>Loading...</div>;
  // }
  const columnHelper = createColumnHelper<IFlightSeat>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <FlexCell padding={24} value={info.getValue()} />,
        size: 41,
      }),
      columnHelper.accessor('seat.aircraftId', {
        header: 'ID рейса',
        cell: (info) => (
          <EditableCell
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
          />
        ),
      }),
      columnHelper.accessor('seat.id', {
        header: 'ID места',
        cell: (info) => (
          <EditableCell
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
          />
        ),
      }),
      columnHelper.accessor('fare', {
        header: 'цена',
        cell: (info) => (
          <EditableCell
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
          />
        ),
      }),
      columnHelper.accessor('seat.category', {
        header: 'Класс',
        cell: (info) => (
          <EditableCell
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
          />
        ),
      }),
      columnHelper.accessor('isSold', {
        header: 'продано',
        cell: (info) => (
          <EditableCell
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
          />
        ),
      }),
      columnHelper.accessor('isRegistered', {
        header: 'Зарегистрировано',
        cell: (info) => (
          <EditableCell
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
          />
        ),
      }),
    ],
    [columnHelper, editableRowIndex, editableRowState, handleUpdateRow]
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
      {/* <HeaderTable<IFlightPostFormFields>
                heading="Посадочные Места"
                formName={EModalNames.FLIGHTS_SEATS}
            /> */}
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
