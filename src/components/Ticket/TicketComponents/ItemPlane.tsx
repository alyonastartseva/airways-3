import { FC } from 'react';
import { Flex, Circle, Box } from '@chakra-ui/react';

import { AirplaneIcon, WarningCircleIcon } from '@/common/icons';

interface IItemPlaneProps {
  numberPlane: string;
  typePlane: string;
}

const ItemPlane: FC<IItemPlaneProps> = ({ numberPlane, typePlane }) => {
  return (
    <Flex
      mt="10px"
      align="center"
      justify="space-between"
      p="12px"
      border="1px solid #f1f3f8"
      borderRadius="8px"
    >
      <Flex align="center" gap="15px">
        <Circle size="40px" bg="#4797FF" color="white">
          <AirplaneIcon />
        </Circle>
        <Box color="#2E2E2E" fontFamily="Roboto" fontSize={16} fontWeight="700">
          {numberPlane}
        </Box>
      </Flex>
      <Flex align="center" gap="10px">
        <Box color="#4797FF" fontFamily="Roboto" fontSize={16} fontWeight="500">
          {typePlane}
        </Box>
        <WarningCircleIcon color="#4797FF" size={20} />
      </Flex>
    </Flex>
  );
};

export default ItemPlane;
