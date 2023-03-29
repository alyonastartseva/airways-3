import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import AviasalesService from '@/services/flights.service';
import { TPerson } from '@interfaces/person.interfaces';
import { IFormPassenger } from '@interfaces/form-passenger.interfaces';
import { Pagination } from '@components/Pagination';
import ELinks from '@services/adminRouterLinks.service';

import { UserInput } from '../UserInput';

const Users = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register } = useForm();
  function onSubmit(values: IFormPassenger) {
    const avia = new AviasalesService();
    avia.createUserAsPassenger(values);
    onClose();
  }

  const columnHelper = createColumnHelper<TPerson>();
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'ID',
    }),
    columnHelper.accessor(
      (row) =>
        `${row.firstName ?? ''} ${row.lastName ?? ''} ${row.middleName ?? ''} `,
      {
        id: 'Имя, Фамилия, Отчество',
      }
    ),
    columnHelper.accessor((row) => row.roles, {
      id: 'Роль',
      cell: (info) =>
        info
          .getValue()
          .map((role) => role.name)
          .join(' '),
    }),
    columnHelper.accessor((row) => row.passport?.gender, {
      header: 'Пол',
      cell: (info) => info.getValue<string>(),
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Телефон',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('birthDate', {
      header: 'Дата рождения',
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: () => (
        <Popover>
          <PopoverTrigger>
            <Box
              w="0.9375rem"
              h="0.9375rem"
              cursor="pointer"
              _after={{ content: '"\\2807"' }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Flex flexDirection="column">
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
      ),
    }),
  ];
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const avia = new AviasalesService();
  const { isLoading, data } = useQuery('users', () => avia.getUsers());
  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data:
      data && Array.isArray(data)
        ? data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
        : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  if (data && Array.isArray(data)) {
    const setPaginationData = (pageNumber: number) => {
      if (pageNumber >= 0 && pageNumber < data.length / pageSize) {
        setPagination((prev) => ({
          ...prev,
          pageIndex: pageNumber,
        }));
      }
    };
    interface IInputProps {
      name: string;
      regValue: string;
      typeField?: string;
    }

    const InputsStorage: IInputProps[] = [
      { name: 'Имя', regValue: 'firstname' },
      { name: 'Фамилия', regValue: 'lastName' },
      { name: 'Пароль', regValue: 'password', typeField: 'password' },
      { name: 'Секретный вопрос', regValue: 'question' },
      { name: 'Телефон', regValue: 'phoneNumber', typeField: 'tel' },
      { name: 'Дата рождения', regValue: 'birthDate', typeField: 'date' },
      { name: 'Электронная почта', regValue: 'email', typeField: 'email' },
      {
        name: 'Гражданство вопрос',
        regValue: 'passport.passportIssuingCountry',
      },
    ];

    // если нет токена авторизации, перебрасываем на форму логина
    if (!localStorage.getItem('adminToken'))
      return <Navigate to={ELinks.ADMIN_LOGIN} />;

    return (
      <Box my={10} mx={10}>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Создание пользователя</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={0}>
                {InputsStorage.map((item: IInputProps) => (
                  <UserInput
                    register={register}
                    name={item.name}
                    key={`${item.name} ${item.regValue}`}
                    regValue={item.regValue}
                    typeField={item.typeField}
                  />
                ))}
              </ModalBody>

              <ModalFooter display="flex" flexDirection="column">
                <Button
                  type="submit"
                  mr={3}
                  margin="auto"
                  width="100%"
                  marginBottom={5}
                >
                  Сохранить
                </Button>
                <Button onClick={onClose} width="100%">
                  Отменить
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        <Flex my={5} align="center" justify="space-between" w="100%">
          <Box>
            <Heading color="rgba(47,79,79)" as="h4" size="md">
              Пользователи
            </Heading>
          </Box>
          <Box>
            <Button
              onClick={() => {
                onOpen();
              }}
              border="0.0625rem solid rgba(247, 79, 79, .2)"
            >
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
                      border="0.0625rem solid rgba(247, 79, 79, .2)"
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
                    <Td
                      border="0.0625rem solid rgba(247, 79, 79, .2)"
                      key={cell.id}
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
          <Pagination
            data={data}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPaginationData={setPaginationData}
          />
        </Box>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Flex position="absolute" left="50%" my="10%" justify="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Flex position="absolute" left="50%" my="10%" justify="center">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    </Flex>
  );
};

export default Users;
