import { memo, useCallback, useMemo, useState, useEffect } from 'react';
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
import { useSearchParams } from 'react-router-dom';

import { isRowEditing } from '@utils/table.utils';
import { sortById } from '@utils/sort.utils';
import { useSetCurrentPageInPagination } from '@/hooks';
import { EModalNames } from '@/constants/modal-constants/modal-names';
import onlyLettersPattern from '@/constants/validate-patterns/only-letters-pattern';
import { ITEMS_PER_PAGE } from '@/constants/constants';
import {
  useDeleteDestinationMutation,
  useGetDestionationsQuery,
  usePatchDestinationMutation,
} from '@/store/services/destinations';
import { isFetchBaseQueryError } from '@/utils/fetch-error.utils';
import { useToastHandler } from '@/hooks/useToastHandler';
import {
  FlexCell,
  EditableCell,
  PopoverTable,
  SpinnerBlock,
  HeaderTable,
  FooterTable,
  AlertMessage,
} from '@/common';
import { IDestination, IDestinationPost } from '@/interfaces';
import { DestinationsInputSelector } from '@/components/DestinationsInputSelector';
import { scrollTable } from '@/constants';

const PAGE_KEY = 'DESTINATIONS_CURR_PAGE';

const Destinations = () => {
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(PAGE_KEY);

  useEffect(() => {
    setPaginationData(undefined)
  }, []);

  const toastHandler = useToastHandler();
  const {
    data: destinationsByPageData,
    isFetching,
    isError,
    error,
  } = useGetDestionationsQuery({ page: pageIndex - 1 });

  const destinationsByPage = useMemo(
    () => destinationsByPageData?.content || [],
    [destinationsByPageData]
  );
  const totalPages = useMemo(
    () => destinationsByPageData?.totalPages || 0,
    [destinationsByPageData]
  );

  useEffect(() => {
    if (!isFetching && !destinationsByPage && pageIndex > 0)
      setPaginationData(pageIndex - 1);
  }, [destinationsByPage]);

  const [editableRowIndex, setEditableRowIndex] = useState<number | null>(null);
  const [editableRowState, setEditableRowState] = useState<IDestination | null>(
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

  const handleUpdateRow = useCallback(
    (id: string, value: string) => {
      if (editableRowState)
        setEditableRowState({ ...editableRowState, [id]: value });
    },
    [editableRowState]
  );

  const [patchDestination] = usePatchDestinationMutation();

  const [deleteDestination] = useDeleteDestinationMutation();

  useEffect(() => {
    if (isError && isFetchBaseQueryError(error))
      toastHandler({ status: 'error', title: error.data.message });
  }, [isError, toastHandler, error]);

  const patchRow = useCallback(() => {
    if (editableRowState) patchDestination(editableRowState);

    handleEditRow();
  }, [patchDestination, editableRowState, handleEditRow]);

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
          />
        ),
        meta: {
          type: 'text',
          required: true,
          validate: (value: string) => {
            const regex = new RegExp(onlyLettersPattern.letters.value);
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
          />
        ),
        meta: {
          type: 'text',
          required: true,
          validate: (value: string) => {
            const regex = new RegExp(onlyLettersPattern.letters.value);
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
          />
        ),
      }),
      columnHelper.accessor('airportCode', {
        header: 'Код аэропорта',
        cell: (info) => (
          <DestinationsInputSelector
            value={isRowEditing(
              info.row.index,
              info.column.id,
              String(info.getValue()),
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
    ]
  );

  const tableData = (data?: IDestination[]) => {
    if (Array.isArray(data) && data.length) {
      return sortById(data.slice());
    }
    return [];
  };

  const table = useReactTable({
    data: tableData(destinationsByPage).slice(0, ITEMS_PER_PAGE),
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
          <HeaderTable<IDestinationPost>
            heading="Места назначения"
            formName={EModalNames.DESTINATIONS}
          />
          <div {...scrollTable}>
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
          </div>
        </Box>
        <FooterTable
          data={tableData(destinationsByPage)}
          pageIndex={pageIndex}
          setPaginationData={setPaginationData}
          cancelEditing={handleEditRow}
          patchRow={patchRow}
          editableRowIndex={editableRowIndex}
          totalPages={totalPages}
        />
      </TableContainer>
    );
  }

  return <AlertMessage />;
};

const memoizedDestinations = memo(Destinations);
export default memoizedDestinations;
