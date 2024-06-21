import { FC } from 'react';
import { GridItem, Center, Circle, Box } from '@chakra-ui/react';

import { AirplaneIcon } from '@/common/icons';

const ItemAviaCompany: FC = () => {
  return (
    <GridItem>
      <Center width="100%" height="100%">
        <Circle size="40px" bg="#4797FF" color="white">
          <AirplaneIcon />
        </Circle>
        <Box
          ml="10px"
          color="#808080"
          fontFamily="Roboto"
          fontSize={16}
          fontWeight="400"
        >
          Globus LLC
        </Box>
      </Center>
    </GridItem>
  );
};

export default ItemAviaCompany;
