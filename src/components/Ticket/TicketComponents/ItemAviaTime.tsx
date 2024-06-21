import { FC } from 'react';
import { GridItem, Center, Box, Flex, Divider } from '@chakra-ui/react';

import { AirplaneTakeoffIcon, AirplaneLandingIcon } from '@/common/icons';

interface ItemAviaTime {
  depart: string;
  arriv: string;
  timeFotFly: (departure: string, arrival: string) => string;
}

const ItemAviaTime: FC<ItemAviaTime> = ({ depart, arriv, timeFotFly }) => {
  return (
    <GridItem rowSpan={2} colSpan={1}>
      <Center width="100%" height="90%">
        <Box>
          <Flex gap="10px" mb="15px">
            <AirplaneTakeoffIcon color="#808080" size={20} />
            <Box
              fontFamily="Roboto"
              fontSize={14}
              fontWeight="400"
              color="#808080"
            >
              {timeFotFly(depart, arriv)}
            </Box>
            <AirplaneLandingIcon color="#808080" size={20} />
          </Flex>
          <Divider borderColor="#808080" variant="dashed" />
        </Box>
      </Center>
    </GridItem>
  );
};

export default ItemAviaTime;
