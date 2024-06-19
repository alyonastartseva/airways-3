import { FC } from 'react';
import { Box, Grid, Flex } from '@chakra-ui/react';

import {
  ArmchairIcon,
  BackpackIcon,
  SuitcaseIcon,
  ArrowsClockwiseIcon,
  WarningCircleIcon,
} from '@/common/icons';

interface TicketEconomBoxProps {
  price: string;
  title: string;
  remains: boolean;
  icon: boolean[];
  color: string;
  shadow: boolean;
}

const TicketEconomBox: FC<TicketEconomBoxProps> = ({
  icon,
  price,
  title,
  remains,
  color,
  shadow,
}) => {
  return (
    <Box
      p="30px 10px"
      h={165}
      w={250}
      borderRadius={8}
      bgColor={color}
      boxShadow={shadow ? '0 4px 4px rgb(0 0 0 / 0.25)' : ''}
    >
      <Grid templateColumns="repeat(2, auto)" rowGap={5}>
        <Box fontFamily="Roboto" color="#2E2E2E" fontSize={14} fontWeight="500">
          {title}
        </Box>
        <Flex gap={0.5} justify="center">
          <BackpackIcon size={20} color={icon[0] ? '#227420' : '#808080'} />
          <SuitcaseIcon size={20} color={icon[1] ? '#227420' : '#808080'} />
          <ArrowsClockwiseIcon
            size={20}
            color={icon[2] ? '#227420' : '#808080'}
          />
          <ArmchairIcon size={20} color={icon[3] ? '#227420' : '#808080'} />
        </Flex>
        <Box
          fontFamily="Roboto"
          color="#2E2E2E"
          fontSize={28}
          fontWeight="700"
          gridColumn="1/3"
        >
          {price}
        </Box>
      </Grid>
      {remains ? (
        <Flex align="center" gap="5px">
          <WarningCircleIcon size={20} color="#F55B51" />
          <Box
            color="#808080"
            fontFamily="Roboto"
            fontSize={14}
            fontWeight="500"
          >
            Осталось 2
          </Box>
        </Flex>
      ) : (
        ''
      )}
    </Box>
  );
};

export default TicketEconomBox;
