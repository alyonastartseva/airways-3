import {
  Box,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Flex,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import { useSetCurrentPageInPagination } from '@hooks/useSetCurrentPageInPagination';
import { DetailsFilling } from '@common/icons';
import { HeaderTable } from '@/common/HeaderTable';
import { FooterTable } from '@/common/FooterTable';
import { ITimeZone } from '@interfaces/time-zone.interfaces';
import { EModalNames } from '@/constants/modal-constants/modal-names';

const timeZonesData: ITimeZone[] = [
  {
    id: 1,
    countryName: 'Россия',
    cityName: 'Москва',
    gmt: 'GMT+3',
    gmtWinter: 'GMT+4',
  },
  {
    id: 2,
    countryName: 'Мальдивы',
    cityName: 'Мале',
    gmt: 'GMT+5',
    gmtWinter: 'GMT+5',
  },
  {
    id: 3,
    countryName: 'Мальта',
    cityName: 'Валлетта',
    gmt: 'GMT+1',
    gmtWinter: 'GMT+1',
  },
  {
    id: 4,
    countryName: 'Албания',
    cityName: 'Тирана',
    gmt: 'GMT+1',
    gmtWinter: 'GMT+1',
  },
  {
    id: 5,
    countryName: 'Афганистан',
    cityName: 'Кабул',
    gmt: 'GMT+4:30',
    gmtWinter: 'GMT+4:30',
  },
  {
    id: 6,
    countryName: 'Андорра',
    cityName: 'Андорре-Ле-Вьехе',
    gmt: 'GMT+1',
    gmtWinter: 'GMT+1',
  },
  {
    id: 7,
    countryName: 'Ангола',
    cityName: 'Луанда',
    gmt: 'GMT+1',
    gmtWinter: 'GMT+1',
  },
  {
    id: 8,
    countryName: 'Ангилья',
    cityName: 'Вэлли',
    gmt: 'GMT-4',
    gmtWinter: 'GMT-3',
  },
  {
    id: 9,
    countryName: 'Люксембург',
    cityName: 'Люксенбург',
    gmt: 'GMT+1',
    gmtWinter: 'GMT+1',
  },
  {
    id: 10,
    countryName: 'Антигуа и Барбуда',
    cityName: 'Сент-Джонс (Антигуа)',
    gmt: 'GMT-4',
    gmtWinter: 'GMT-3',
  },
];

const TimeZones = () => {
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(
    'TIME_ZONE_CURR_PAGE'
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
            {info.getValue()}
          </Flex>
        ),
      }),
      columnHelper.accessor('cityName', {
        header: 'Город',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
            {info.getValue()}
          </Flex>
        ),
      }),
      columnHelper.accessor('gmt', {
        header: 'Среднее время по Гринвичу (GMT)',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
            {info.getValue()}
          </Flex>
        ),
      }),
      columnHelper.accessor('gmtWinter', {
        header: 'Зимнее среднее время по Гринвичу (GMT)',
        cell: (info) => (
          <Flex paddingLeft="1rem" height="2.5rem" alignItems="center">
            {info.getValue()}
          </Flex>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        size: 41,
        cell: () => (
          <IconButton
            margin="auto"
            bg="none"
            border="none"
            aria-label="Редактировать"
            icon={<DetailsFilling />}
            _hover={{ backgroundColor: 'transparent' }}
          />
        ),
        enableSorting: false,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: timeZonesData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });
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
        <HeaderTable
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
          cancelEditing={() => {}}
          patchRow={() => {}}
          editableRowIndex={null}
          totalPages={10}
        />
      </Box>
    </TableContainer>
  );
};

export default TimeZones;
