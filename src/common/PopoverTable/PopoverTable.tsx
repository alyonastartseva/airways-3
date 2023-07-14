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
import { Link } from 'react-router-dom';

import { IPopoverTable } from '@interfaces/table.interfaces';
import { Details } from '@common/icons';
import ELinks from '@services/admin-router-links.service';
import { mapRoutesFormData } from '@utils/form-routes.utils';

const PopoverTable = <Data,>({
  row,
  index,
  id,
  handleEditRow,
  deleteRow,
}: IPopoverTable<Data>) => (
  <Popover placement="left-start" arrowSize={10}>
    <PopoverTrigger>
      <Box
        w="1rem"
        h="1rem"
        cursor="pointer"
        _after={{ content: '"\\2807"' }}
        paddingLeft="1rem"
      />
    </PopoverTrigger>
    <PopoverContent
      color="#0E153A"
      border="0.1rem solid #2B2B2B"
      borderRadius="0.4rem"
      width="13rem"
      height="9.3rem"
    >
      <PopoverArrow border="1px solid #2B2B2B" bgColor="#E2F3F5" />
      <PopoverHeader border="none" borderBottom="1px solid #2B2B2B" p={0}>
        <Link
          // Условие для самолетов, когда будут другие страницы, можно расширить / убрать
          to={`${ELinks.ADMIN_AIRPLANES}${
            ELinks.ADMIN_SEAT
          }/${mapRoutesFormData(row)}`}
        >
          <Button
            leftIcon={<Details />}
            border="none"
            height="3rem"
            width="100%"
            borderRadius="none"
            borderTopLeftRadius="0.4rem"
            borderTopRightRadius="0.4rem"
            fontSize="0.9rem"
            fontWeight="medium"
            justifyContent="flex-start"
            _hover={{
              backgroundColor: '#C5E3F6',
            }}
            bgColor="#E2F3F5"
          >
            Подробности
          </Button>
        </Link>
      </PopoverHeader>
      <PopoverHeader border="none" borderBottom="1px solid #2B2B2B" p={0}>
        <Button
          leftIcon={<EditIcon height="0.67rem" width="0.67rem" />}
          border="none"
          height="3rem"
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
            <CloseIcon
              height="0.625rem"
              width="0.625rem"
              marginInlineEnd="0.2rem"
              marginTop="0.0625rem"
            />
          }
          marginInlineEnd="0.9rem"
          border="none"
          height="3.063rem"
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
          onClick={() => deleteRow(id)}
        >
          Удалить
        </Button>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

export default PopoverTable;
