import { Heading } from '@chakra-ui/react';

import { IHeadingAdmin } from './headingAdmin.interfaces';

const HeadingAdmin = ({ name }: IHeadingAdmin) => (
  <Heading color="#818080" fontWeight="600" size="md">
    {name}
  </Heading>
);

export default HeadingAdmin;
