import { FC } from 'react';
import { Flex, Divider } from '@chakra-ui/react';

import { GoToFly, FlyForTicket } from '@/common/icons';
import { ITicketFlightProps } from '@/interfaces';

import ItemFlight from './ItemFlight';

interface IItemFlightBoxProps {
  time: (dateTime: string) => string;
  dateFly: (dateTime: string) => string;
  flight: ITicketFlightProps;
  timeFotFly: (departure: string, arrival: string) => string;
}

const ItemFlightBox: FC<IItemFlightBoxProps> = ({
  flight,
  dateFly,
  timeFotFly,
  time,
}) => {
  return (
    <Flex mt="20px" gap="10px" align="center">
      <Flex flexDirection="column" align="center" gap="20px">
        <FlyForTicket />
        <Divider
          orientation="vertical"
          borderColor="#4797FF"
          variant="dashed"
          h="250px"
        />
        <GoToFly />
      </Flex>
      <ItemFlight
        flight={flight}
        dateFly={dateFly}
        time={time}
        timeFotFly={timeFotFly}
      />
    </Flex>
  );
};

export default ItemFlightBox;
