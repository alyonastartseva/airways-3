import { Box, Flex, Select } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';

import { IHeaderAdmin } from '@interfaces/table.interfaces';
import { ModalShape } from '@common/ModalElements/ModalShape';
import { HeadingAdmin } from '@common/HeadingAdmin';
// import { ModalInput } from '@common/ModalElements/ModalInput';

const HeaderAdmin = <T extends FieldValues>({
  heading,
  formName,
  select,
  selectedValue,
  handleSelectChange,
}: IHeaderAdmin) => {
  return (
    <Flex my={5} align="center" justify="space-between">
      <HeadingAdmin name={heading} />
      <Flex align="center" justify="space-between">
        {select ? (
          <Flex align="center" justify="space-between" mr={5}>
            <Box mr={5}>Класс</Box>
            <Select
              placeholder="Выбирете класс"
              value={selectedValue} // Привязываем выбранное значение к состоянию
              onChange={handleSelectChange}
            >
              <option value="BUSINESS">BUSINESS</option>
              <option value="ECONOMY">ECONOMY</option>
              <option value="FIRST">FIRST</option>
              <option value="PREMIUM_ECONOMY">PREMIUM_ECONOMY</option>
            </Select>
          </Flex>
        ) : null}
        <ModalShape<T> formName={formName} />
      </Flex>
    </Flex>
  );
};

export default HeaderAdmin;
