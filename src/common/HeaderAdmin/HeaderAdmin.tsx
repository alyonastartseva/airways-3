import { Flex } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';

import { IHeaderAdmin } from '@interfaces/table.interfaces';
import { ModalShape } from '@common/ModalElements/ModalShape';
import { HeadingAdmin } from '@common/HeadingAdmin';

const HeaderAdmin = <T extends FieldValues>({
  heading,
  formName,
}: IHeaderAdmin) => (
  <Flex my={5} align="center" justify="space-between">
    <HeadingAdmin name={heading} />
    <ModalShape<T> formName={formName} />
  </Flex>
);

export default HeaderAdmin;
