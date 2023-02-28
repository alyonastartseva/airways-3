import { Flex } from '@chakra-ui/react';

import { IHeaderAdmin } from '@interfaces/table.interfaces';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { ModalForm } from '@common/ModalForm';

const HeaderAdmin = ({ heading, modal }: IHeaderAdmin) => (
  <Flex my={5} align="center" justify="space-between">
    <HeadingAdmin name={heading} />
    <ModalForm modal={modal} />
  </Flex>
);

export default HeaderAdmin;
