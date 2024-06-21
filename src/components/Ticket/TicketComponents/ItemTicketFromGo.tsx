import { FC } from 'react';
import { GridItem, Center, Box, Flex } from '@chakra-ui/react';

interface ItemTicketFromGoProps {
  time: (dateTime: string) => string;
  dateFly: (dateTime: string) => string;
  where: string;
  flight: {
    totalPrice: number;
    dataTo: {
      airportFrom: string;
      airportTo: string;
      cityFrom: string;
      cityTo: string;
      departureDateTime: string;
      arrivalDateTime: string;
      flightTime: string;
      flightSeatId: number;
    };
    dataBack: {
      airportFrom: string;
      airportTo: string;
      cityFrom: string;
      cityTo: string;
      departureDateTime: string;
      arrivalDateTime: string;
      flightTime: string;
      flightSeatId: number;
    };
  };
}

const ItemTicketFromGo: FC<ItemTicketFromGoProps> = ({
  time,
  dateFly,
  flight,
  where,
}) => {
  return (
    <GridItem>
      <Center w="100%" h="100%">
        <Box>
          <Flex align="center" gap="20px">
            <Box
              fontFamily="Roboto"
              fontSize={28}
              fontWeight="700"
              color="#2E2E2E"
              order={where === 'From' ? 0 : 1}
            >
              {time(flight.dataTo.departureDateTime)}
            </Box>
            <Box
              fontFamily="Roboto"
              fontSize={16}
              fontWeight="400"
              color="#2E2E2E"
              order={where === 'From' ? 1 : 0}
            >
              {where === 'From'
                ? flight.dataTo.airportFrom
                : flight.dataTo.airportTo}
            </Box>
          </Flex>
          <Flex
            fontFamily="Roboto"
            fontSize={14}
            fontWeight="300"
            color="#808080"
            justify={where === 'To' ? 'end' : ''}
          >
            {where === 'From' ? flight.dataTo.cityFrom : flight.dataTo.cityTo}
          </Flex>
          <Flex
            fontFamily="Roboto"
            fontSize={14}
            fontWeight="300"
            color="#808080"
            justify={where === 'To' ? 'end' : ''}
          >
            {dateFly(flight.dataTo.departureDateTime)}
          </Flex>
        </Box>
      </Center>
    </GridItem>
  );
};

export default ItemTicketFromGo;
