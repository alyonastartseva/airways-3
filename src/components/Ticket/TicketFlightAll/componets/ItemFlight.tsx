import { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { ITicketFlightProps } from '@/interfaces';

import ItemAirport from './ItemAirport';

interface IItemFlightProps {
  time: (dateTime: string) => string;
  dateFly: (dateTime: string) => string;
  flight: ITicketFlightProps;
  timeFotFly: (departure: string, arrival: string) => string;
}

const ItemFlight: FC<IItemFlightProps> = ({
  time,
  dateFly,
  flight,
  timeFotFly,
}) => {
  return (
    <Flex gap="40px" justify="space-between" flexDirection="column">
      <ItemAirport where="From" time={time} dateFly={dateFly} flight={flight} />
      <Flex gap="8px" flexDirection="column">
        <Flex align="center" gap="5px">
          <Box
            color="#7a869a"
            fontFamily="Roboto"
            fontSize="14px"
            fontWeight="400"
          >
            637 км
          </Box>
          <Box
            w="4px"
            h="4px"
            borderRadius="50%"
            backgroundColor="#7a869a"
          ></Box>
          <Box
            color="#7a869a"
            fontFamily="Roboto"
            fontSize="14px"
            fontWeight="400"
          >
            {timeFotFly(
              flight.dataTo.departureDateTime,
              flight.dataTo.arrivalDateTime
            )}
          </Box>
        </Flex>
        <Flex>
          <Box></Box>
          <Box
            fontFamily="Roboto"
            color="#4797FF"
            fontSize="14px"
            fontWeight="600"
          >
            Меню: Напитки
          </Box>
        </Flex>
        <Flex>
          <Box></Box>
          <Box
            fontFamily="Roboto"
            color="#4797FF"
            fontSize="14px"
            fontWeight="600"
          >
            Питомцы: до 50 кг
          </Box>
        </Flex>
      </Flex>
      <ItemAirport where="To" time={time} dateFly={dateFly} flight={flight} />
    </Flex>
  );
};

export default ItemFlight;
