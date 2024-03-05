import { Flex } from '@chakra-ui/react';

import { IFlexCell } from '@common/FlexCell/flex.interfaces';

const FlexCell = ({ padding, value }: IFlexCell) => (
  <Flex paddingLeft={`${padding / 16}rem`} height="2.5rem" alignItems="center">
    {value}
  </Flex>
);

export default FlexCell;
