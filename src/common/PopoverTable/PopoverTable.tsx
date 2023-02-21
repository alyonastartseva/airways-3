import {
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Box,
} from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';

import { IPopoverTable } from '@interfaces/table.interfaces';

const PopoverTable = <Data,>({
  row,
  index,
  id,
  handleEditRow,
  deleteDestination,
}: IPopoverTable<Data>) => (
  <Popover placement="left-start" arrowSize={10}>
    <PopoverTrigger>
      <Box
        w="15px"
        h="15px"
        cursor="pointer"
        _after={{ content: '"\\2807"' }}
        paddingLeft="16px"
      />
    </PopoverTrigger>
    <PopoverContent
      color="#0E153A"
      border="1px solid #2B2B2B"
      borderRadius="6px"
      width="209px"
      height="100px"
    >
      <PopoverArrow border="1px solid #2B2B2B" bgColor="#E2F3F5" />
      <PopoverHeader border="none" borderBottom="1px solid #2B2B2B" p={0}>
        <Button
          leftIcon={<EditIcon height="14px" width="14px" />}
          border="none"
          height="48px"
          width="100%"
          borderRadius="none"
          borderTopLeftRadius="6px"
          borderTopRightRadius="6px"
          fontSize="14px"
          fontWeight="medium"
          justifyContent="flex-start"
          _hover={{
            backgroundColor: '#C5E3F6',
          }}
          bgColor="#E2F3F5"
          onClick={() => handleEditRow(row, index)}
        >
          Редактировать
        </Button>
      </PopoverHeader>
      <PopoverBody border="none" p={0}>
        <Button
          leftIcon={
            <CloseIcon height="10px" width="10px" marginInlineEnd="0.2rem" />
          }
          marginInlineEnd="0.9rem"
          border="none"
          height="49px"
          width="100%"
          borderRadius="none"
          borderBottomLeftRadius="6px"
          borderBottomRightRadius="6px"
          fontSize="14px"
          fontWeight="normal"
          justifyContent="flex-start"
          _hover={{
            backgroundColor: '#C5E3F6',
          }}
          bgColor="#E2F3F5"
          onClick={() => deleteDestination(id)}
        >
          Удалить
        </Button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

export default PopoverTable;
