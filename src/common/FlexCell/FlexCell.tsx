import { Flex } from '@chakra-ui/react';

import { IFlexCell } from '@/interfaces/table.interfaces';

const FlexCell = ({ padding, value }: IFlexCell) => (
  <Flex paddingLeft={`${padding}px`} height="40px" alignItems="center">
    {value}
  </Flex>
);

export default FlexCell;
