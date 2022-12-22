import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Container
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Person from "@/Interfaces/Person";

function Users({
  data,
  setPaginationData,
  total,
  pageIndex,
  pageSize,
}: {
  data: Person[];
  setPaginationData: Function;
  total: number;
  pageIndex: number;
  pageSize: number;
}) {
  const columnHelper = createColumnHelper<Person>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (props) => props.getValue(),
      header: "ID",
    }),
    columnHelper.accessor(
      (row) => {
        return `${row.firstName ?? ""} ${row.lastName ?? ""} ${
          row.middleName ?? ""
        } `;
      },
      {
        id: "Имя, Фамилия, Отчество",
      }
    ),
    columnHelper.accessor((row) => row.roles, {
      id: "Роль",
      cell: (props) => {
        return (
          <>
            {props
              .getValue()
              .map((role) => {
                return role.name;
              })
              .join(" ")}
          </>
        );
      },
    }),
    columnHelper.accessor("gender", {
      header: "Пол",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("phoneNumber", {
      header: "Телефон",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor("birthDate", {
      header: "Дата рождения",
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor((row) => row.passport?.serialNumberPassport, {
      id: "Серийный номер",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.passport?.passportIssuingCountry, {
      id: "Гражданство",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.passport?.passportIssuingDate, {
      id: "Дата выхода паспорта",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      cell: (props) => {
        // console.log(props.row.original);
        return (
          <>
            <Popover>
              <PopoverTrigger>
                <Box
                  w="15px"
                  h="15px"
                  cursor="pointer"
                  _after={{ content: '"\\2807"' }}
                ></Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Button variant="solid">Редактировать</Button>
                  <Button colorScheme="red">Удалить</Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        );
      },
    }),
  ];

  if (data) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
    });
    return (
      <Container>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
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
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div className="h-2" />
        <div className="flex items-center gap-2">
          <Button
            className="border rounded p-1"
            onClick={() => setPaginationData(0)}
          >
            {"<<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => setPaginationData(pageIndex - 1)}
          >
            {"<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => setPaginationData(pageIndex + 1)}
          >
            {">"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => {
              console.log("a");
              setPaginationData(Math.ceil(total / pageSize - 1));
            }}
          >
            {">>"}
          </Button>
          {Math.ceil(total / pageSize)}
        </div>
      </Container>
    );
  }
  return <div></div>;
}

export default Users;
