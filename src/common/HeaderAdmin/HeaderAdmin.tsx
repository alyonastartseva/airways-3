import { Flex } from '@chakra-ui/react';

import { IHeaderAdmin } from '@interfaces/table.interfaces';
import { HeadingAdmin } from '@common/HeadingAdmin';
import { ButtonAddAdmin } from '@common/ButtonAddAdmin';

const HeaderAdmin = ({ heading, buttonName }: IHeaderAdmin) => (
  <Flex my={5} align="center" justify="space-between">
    <HeadingAdmin name={heading} />
    <ButtonAddAdmin name={buttonName} />
  </Flex>
);

export default HeaderAdmin;
