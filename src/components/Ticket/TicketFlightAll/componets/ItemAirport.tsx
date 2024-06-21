import { FC } from 'react';
import { Flex, Box } from '@chakra-ui/react';

import { ITicketFlightProps } from '@/interfaces';

interface IItemAirportProps {
  time: (dateTime: string) => string;
  dateFly: (dateTime: string) => string;
  flight: ITicketFlightProps;
  where: string;
}

const ItemAirport: FC<IItemAirportProps> = ({
  where,
  time,
  dateFly,
  flight,
}) => {
  return (
    <Flex gap="8px" flexDirection="column">
      <Flex align="center" gap="5px">
        <Box fontFamily="Roboto" fontSize="16px" fontWeight="500">
          {where === 'From'
            ? time(flight.dataTo.departureDateTime)
            : time(flight.dataTo.arrivalDateTime)}
        </Box>
        <Box fontFamily="Roboto" fontSize="14px" fontWeight="400">
          {where === 'From'
            ? dateFly(flight.dataTo.departureDateTime)
            : dateFly(flight.dataTo.arrivalDateTime)}
        </Box>
      </Flex>
      <Box fontFamily="Roboto" fontSize="16px" fontWeight="500">
        {where === 'From' ? flight.dataTo.cityFrom : flight.dataTo.cityTo}
      </Box>
      <Box
        fontFamily="Roboto"
        fontSize="14px"
        fontWeight="400"
      >{`Аэропорт, терминал, ${
        where === 'From' ? flight.dataTo.airportFrom : flight.dataTo.cityTo
      }`}</Box>
    </Flex>
  );
};

export default ItemAirport;
