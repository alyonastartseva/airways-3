import { useState } from "react";
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
  Flex,
  Heading,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IPerson } from "@interfaces/person";
import { getVisiblePages } from "@utils/pagination";
import { useQuery } from "react-query";
import flightsService from "@services/flights-service";
function Users() {
  const columnHelper = createColumnHelper<IPerson>();
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
                  <Flex flexDirection={"column"}>
                    <Button size="sm" my={1} variant="solid">
                      Редактировать
                    </Button>
                    <Button size="sm" colorScheme="red">
                      Удалить
                    </Button>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </>
        );
      },
    }),
  ];
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  });

  const { isLoading, data } = useQuery("users", () =>
    flightsService.getUsers()
  );

  const table = useReactTable({
    data: data
      ? data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
      : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (data) {
    const setPaginationData = (pageIndex: number) => {
      if (pageIndex >= 0 && pageIndex < data.length / pageSize) {
        setPagination((prev) => ({
          ...prev,
          pageIndex,
        }));
      }
    };

    return (
      <Box my={10} mx={10}>
        <Flex my={5} align="center" justify="space-between" w={"100%"}>
          <Box>
            <Heading color="rgba(47,79,79)" as="h4" size="md">
              Пользователи
            </Heading>
          </Box>
          <Box>
            <Button border="1px solid rgba(247, 79, 79, .2)">
              Добавить пользователя
            </Button>
          </Box>
        </Flex>
        <Box ml={5}>
          <Table>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      border="1px solid rgba(247, 79, 79, .2)"
                      color="#28282B"
                      key={header.id}
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
                    <Td border="1px solid rgba(247, 79, 79, .2)" key={cell.id}>
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
          <Flex my={8}>
            <Button
              mx={1}
              className="border rounded p-1"
              onClick={() => setPaginationData(0)}
            >
              {"<<"}
            </Button>
            <Button
              mx={1}
              className="border rounded p-1"
              onClick={() => setPaginationData(pageIndex - 1)}
            >
              {"<"}
            </Button>
            <Box display={"inline-flex"}>
              {getVisiblePages(
                pageIndex,
                Math.ceil(data.length / pageSize)
              ).map((page, index) => (
                <Button
                  mx={1}
                  key={index}
                  onClick={() => setPaginationData(page - 1)}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Button
              mx={1}
              className="border rounded p-1"
              onClick={() => setPaginationData(pageIndex + 1)}
            >
              {">"}
            </Button>
            <Button
              mx={1}
              className="border rounded p-1"
              onClick={() => {
                setPaginationData(Math.ceil(data.length / pageSize - 1));
              }}
            >
              {">>"}
            </Button>
          </Flex>
        </Box>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Flex position={"absolute"} left="50%" my={"10%"} justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Flex position={"absolute"} left="50%" my={"10%"} justify="center">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    </Flex>
  );
}

export default Users;
