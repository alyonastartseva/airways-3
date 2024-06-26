import { Box, Flex, Select } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';

import { ModalShape, HeadingAdmin, SeatCategory } from '@/common';

import { IHeaderAdmin } from './headerTable.interfaces';

const HeaderTable = <T extends FieldValues>({
  heading,
  formName,
  select,
  selectedValue,
  handleSelectChange,
  initialFormValues,
}: IHeaderAdmin) => {
  return (
    <Flex my={5} align="center" justify="space-between">
      <HeadingAdmin name={heading} />
      <Flex align="center" justify="space-between">
        {select ? (
          <Flex align="center" justify="space-between" mr={5}>
            <Box mr={5}>Класс</Box>
            <Select
              placeholder="Выберите класс"
              value={selectedValue} // Привязываем выбранное значение к состоянию
              onChange={handleSelectChange}
            >
              <SeatCategory />
            </Select>
          </Flex>
        ) : null}
        <ModalShape<T>
          formName={formName}
          initialFormValues={initialFormValues}
        />
      </Flex>
    </Flex>
  );
};

export default HeaderTable;
