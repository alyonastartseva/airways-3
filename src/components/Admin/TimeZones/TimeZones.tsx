import { useMemo, useCallback, useState, memo } from 'react';
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Flex,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import { isRowEditing } from '@utils/table.utils';
import { EModalNames } from '@/constants';
import { ITimeZone, TTimeZoneForm } from '@interfaces/time-zone.interfaces';
import {
  useTimezonesQuery,
  useTimezonesDelete,
  useTimezonesPatch,
  useSetCurrentPageInPagination,
} from '@/hooks';
import {
  AlertMessage,
  FooterTable,
  HeaderTable,
  EditableCell,
  PopoverTable,
  SpinnerBlock,
} from '@/common';

const TimeZones = () => {
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    'TIME_ZONE_CURR_PAGE'
  );

  const { data: dataQuery, isFetching, isError } = useTimezonesQuery(pageIndex);

  const timeZonesData = useMemo(() => dataQuery?.content ?? [], [dataQuery]);
  const totalPages = dataQuery?.totalPages;

  const { mutate: patchTimezones } = useTimezonesPatch();
  const { mutate: deleteTimezones } = useTimezonesDelete();

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<ITimeZone | null>(
    null
  );

  const handleEditRow = useCallback((row = null, index = -1) => {
    if (index >= 0) {
      setEditableRowState(row);
      setEditableRowIndex(index);
    } else {
      setEditableRowState(null);
      setEditableRowIndex(null);
    }
  }, []);

  const patchRow = useCallback(() => {
    patchTimezones(editableRowState);
    handleEditRow();
  }, [patchTimezones, editableRowState, handleEditRow]);

  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (editableRowState) {
        setEditableRowState({
          ...editableRowState,
          [id as keyof ITimeZone]: value,
        });
      }
    },
    [editableRowState]
  );

  const columnHelper = createColumnHelper<ITimeZone>();
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => (
          <Flex paddingLeft="1.5rem" height="2.5rem" alignItems="center">
            {info.getValue()}
          </Flex>
        ),
      }),
      columnHelper.accessor('countryName', {
        header: 'Страна',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
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
          </Flex>
        ),
      }),
      columnHelper.accessor('cityName', {
        header: 'Город',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
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
          </Flex>
        ),
      }),
      columnHelper.accessor('gmt', {
        header: 'Среднее время по Гринвичу (GMT)',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
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
          </Flex>
        ),
      }),
      columnHelper.accessor('gmtWinter', {
        header: 'Зимнее среднее время по Гринвичу (GMT)',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
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
          </Flex>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        size: 41,
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
            <PopoverTable
              hasDetailsButton={false}
              row={info.row.original}
              index={info.row.index}
              id={info.row.original.id}
              handleEditRow={handleEditRow}
              deleteRow={deleteTimezones}
              setPaginationIndex={setPaginationData}
              indexPage={pageIndex}
              numberElem={timeZonesData?.length}
            />
          </Flex>
        ),
        enableSorting: false,
      }),
    ],
    [
      columnHelper,
      timeZonesData?.length,
      setPaginationData,
      pageIndex,
      handleEditRow,
      deleteTimezones,
      editableRowIndex,
      editableRowState,
      handleUpdateRow,
    ]
  );

  const table = useReactTable({
    data: timeZonesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (isFetching) {
    return <SpinnerBlock />;
  }
  if (!isError) {
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
          <HeaderTable<TTimeZoneForm>
            heading="Часовые пояса"
            formName={EModalNames.TIME_ZONES}
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
                      width="42px"
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
                      <Flex height="2.5rem">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Flex>
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
          <FooterTable
            data={timeZonesData}
            pageIndex={pageIndex}
            setPaginationData={setPaginationData}
            cancelEditing={handleEditRow}
            patchRow={patchRow}
            editableRowIndex={editableRowIndex}
            totalPages={totalPages}
          />
        </Box>
      </TableContainer>
    );
  }
  return <AlertMessage />;
};

const memorizedTimezones = memo(TimeZones);
export default memorizedTimezones;
