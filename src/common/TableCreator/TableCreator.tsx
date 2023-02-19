import { Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';

import { ITableCreator } from '@interfaces/table.interfaces';

const TableCreator = <Data,>({ table }: ITableCreator<Data>) => (
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
);

export default TableCreator;
