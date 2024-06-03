import { FC, Dispatch, SetStateAction } from 'react';
import {
  Flex,
  Center,
  Box,
  Grid,
  GridItem,
  Circle,
  Divider,
} from '@chakra-ui/react';

import {
  ArmchairIcon,
  BackpackIcon,
  ArrowsClockwiseIcon,
  SuitcaseIcon,
  WarningCircleIcon,
  AirplaneIcon,
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
} from '@/common/icons';

interface TiketFlightProps {
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
  stateChoice: boolean;
  setStateChoice: Dispatch<SetStateAction<boolean>>;
}

const TiketFlight: FC<TiketFlightProps> = ({
  flight,
  stateChoice,
  setStateChoice,
}) => {
  const monthArray = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const dayWeekArray = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const time = (dateTime: string) => {
    const timeFly = new Date(dateTime);
    const hours = timeFly.getHours();
    const minute = timeFly.getMinutes();
    return `${hours}:${minute}`;
  };

  const dateFly = (dateTime: string) => {
    const timeFly = new Date(dateTime);
    const day = timeFly.getDate();
    const monthId = timeFly.getMonth();
    const month = monthArray[monthId];
    const dayWeekId = timeFly.getDay();
    const dayWeek = dayWeekArray[dayWeekId];

    return `${day} ${month}, ${dayWeek}`;
  };

  const timeFotFly = (departure: string, arrival: string) => {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);

    const res = departureDate.getTime() - arrivalDate.getTime();
    const days = Math.floor(res / (24 * 60 * 60 * 1000));
    const daysms = res % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = res % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));

    let result;
    if (days > 0) {
      result = `в пути ${days}д ${hours}ч ${minutes}мин`;
    }
    result = `в пути ${hours}ч ${minutes}мин`;
    return result;
  };

  return (
    <Center>
      <Flex
        boxShadow="0 4px 4px rgb(0 0 0 / 0.25)"
        bg="white"
        borderRadius={16}
        padding="12px 12px 12px 24px"
        h={195}
        mb="30px"
        align="center"
        gap="15px"
        justify="center"
        w="100%"
        onClick={() => setStateChoice(!stateChoice)}
        maxW="75rem"
      >
        <Box h={165} w={500}>
          <Grid
            templateColumns="2fr 3fr 2fr"
            templateRows="2fr 3fr"
            width="100%"
            height="100%"
          >
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
                      {timeFotFly(
                        flight.dataTo.departureDateTime,
                        flight.dataTo.arrivalDateTime
                      )}
                    </Box>
                    <AirplaneLandingIcon color="#808080" size={20} />
                  </Flex>
                  <Divider borderColor="#808080" variant="dashed" />
                </Box>
              </Center>
            </GridItem>
            <GridItem>
              <Center w="100%" h="100%">
                <Box
                  color="#4797FF"
                  fontFamily="Roboto"
                  fontSize={16}
                  fontWeight="400"
                  width="130px"
                >
                  Прямой рейс
                </Box>
              </Center>
            </GridItem>
            <GridItem>
              <Center w="100%" h="100%">
                <Box>
                  <Flex align="center" gap="20px">
                    <Box
                      fontFamily="Roboto"
                      fontSize={28}
                      fontWeight="700"
                      color="#2E2E2E"
                    >
                      {time(flight.dataTo.departureDateTime)}
                    </Box>
                    <Box
                      fontFamily="Roboto"
                      fontSize={16}
                      fontWeight="400"
                      color="#2E2E2E"
                    >
                      {flight.dataTo.airportFrom}
                    </Box>
                  </Flex>
                  <Box
                    fontFamily="Roboto"
                    fontSize={14}
                    fontWeight="300"
                    color="#808080"
                  >
                    {flight.dataTo.cityFrom}
                  </Box>
                  <Box
                    fontFamily="Roboto"
                    fontSize={14}
                    fontWeight="300"
                    color="#808080"
                  >
                    {dateFly(flight.dataTo.departureDateTime)}
                  </Box>
                </Box>
              </Center>
            </GridItem>
            <GridItem>
              <Center w="100%" h="100%">
                <Box>
                  <Flex align="center" gap="20px">
                    <Box
                      fontFamily="Roboto"
                      fontSize={16}
                      fontWeight="400"
                      color="#2E2E2E"
                    >
                      {flight.dataTo.airportTo}
                    </Box>
                    <Box
                      fontFamily="Roboto"
                      fontSize={28}
                      fontWeight="700"
                      color="#2E2E2E"
                    >
                      {time(flight.dataTo.arrivalDateTime)}
                    </Box>
                  </Flex>
                  <Flex
                    fontFamily="Roboto"
                    fontSize={14}
                    fontWeight="300"
                    color="#808080"
                    justify="end"
                  >
                    {flight.dataTo.cityTo}
                  </Flex>
                  <Flex
                    fontFamily="Roboto"
                    fontSize={14}
                    fontWeight="300"
                    color="#808080"
                    justify="end"
                  >
                    {dateFly(flight.dataTo.arrivalDateTime)}
                  </Flex>
                </Box>
              </Center>
            </GridItem>
          </Grid>
        </Box>
        <Flex
          direction="column"
          justify="space-between"
          p="30px 10px"
          h={165}
          w={250}
          borderRadius={8}
          boxShadow="0 4px 4px rgb(0 0 0 / 0.25)"
          bgColor="#EBF3FF"
        >
          <Grid templateColumns="repeat(2, auto)" rowGap={5}>
            <Box
              color="#2E2E2E"
              fontFamily="Roboto"
              fontSize={14}
              fontWeight="500"
            >
              Эконом Базовый
            </Box>
            <Flex gap={0.5} justify="center">
              <BackpackIcon size={20} color="#227420" />
              <SuitcaseIcon size={20} color="#808080" />
              <ArrowsClockwiseIcon size={20} color="#808080" />
              <ArmchairIcon size={20} color="#808080" />
            </Flex>
            <Box
              color="#2E2E2E"
              fontFamily="Roboto"
              fontSize={28}
              fontWeight="700"
              gridColumn="1/3"
            >
              3 787 ₽
            </Box>
          </Grid>
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
        </Flex>
        <Box p="30px 10px" h={165} w={250} borderRadius={8} bgColor="#EBF3FF">
          <Grid templateColumns="repeat(2, auto)" rowGap={5}>
            <Box
              fontFamily="Roboto"
              color="#2E2E2E"
              fontSize={14}
              fontWeight="500"
            >
              Эконом Стандарт
            </Box>
            <Flex gap={0.5} justify="center">
              <BackpackIcon size={20} color="#227420" />
              <SuitcaseIcon size={20} color="#227420" />
              <ArrowsClockwiseIcon size={20} color="#808080" />
              <ArmchairIcon size={20} color="#808080" />
            </Flex>
            <Box
              fontFamily="Roboto"
              color="#2E2E2E"
              fontSize={28}
              fontWeight="700"
              gridColumn="1/3"
            >
              5 887 ₽
            </Box>
          </Grid>
        </Box>
        <Box p="30px 10px" w={250} h={165} borderRadius={8} bgColor="#C2DCFF">
          <Grid templateColumns="repeat(2, auto)" rowGap={5}>
            <Box
              fontFamily="Roboto"
              color="#2E2E2E"
              fontSize={14}
              fontWeight="500"
            >
              Эконом Плюс
            </Box>
            <Flex gap={0.5} justify="center">
              <BackpackIcon size={20} color="#227420" />
              <SuitcaseIcon size={20} color="#227420" />
              <ArrowsClockwiseIcon size={20} color="#227420" />
              <ArmchairIcon size={20} color="#227420" />
            </Flex>
            <Box
              fontFamily="Roboto"
              color="#2E2E2E"
              fontSize={28}
              fontWeight="700"
              gridColumn="1/3"
            >
              12 437 ₽
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Center>
  );
};
export default TiketFlight;
