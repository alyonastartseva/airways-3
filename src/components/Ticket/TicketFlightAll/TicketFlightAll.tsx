import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Circle,
  Divider,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';
import { FC, Dispatch, SetStateAction } from 'react';

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
import PaidIcon from '@/common/icons/Ticket/PaidIcon';

interface TiketFlightAllProps {
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

const TicketFlightAll: FC<TiketFlightAllProps> = ({
  stateChoice,
  setStateChoice,
  flight,
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
        onClick={() => setStateChoice(!stateChoice)}
        boxShadow="0 4px 4px rgb(0 0 0 / 0.25)"
        bg="white"
        borderRadius={16}
        w="90%"
        mb="30px"
        padding="12px 12px 12px 24px"
        align="start"
        gap="15px"
        justify="center"
      >
        <Box h="calc(100% - 170px)">
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
          <Box mt="10px">
            <Flex
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
                <Box
                  color="#2E2E2E"
                  fontFamily="Roboto"
                  fontSize={16}
                  fontWeight="700"
                >
                  S7 1004
                </Box>
              </Flex>
              <Flex align="center" gap="10px">
                <Box
                  color="#4797FF"
                  fontFamily="Roboto"
                  fontSize={16}
                  fontWeight="500"
                >
                  Airbus A319
                </Box>
                <WarningCircleIcon color="#4797FF" size={20} />
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box>
          <Flex align="start" gap="15px" justify="center">
            <Box
              w={260}
              borderRadius={8}
              bgColor="#EBF3FF"
              p="40px 15px 30px 15px"
            >
              <Flex direction="column" justify="space-between">
                <Grid templateColumns="repeat(2, auto)" rowGap={5}>
                  <Box
                    color="#2E2E2E"
                    fontFamily="Roboto"
                    fontSize={16}
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
              <Box mt={10}>
                <Button
                  fontFamily="Roboto"
                  backgroundColor="#006FFF"
                  height="50px"
                  w="100%"
                  borderRadius="8px"
                  color="white"
                  fontSize={14}
                  fontWeight="400"
                >
                  Выбрать
                </Button>
                <Box>
                  <List>
                    <Box>Багаж:</Box>
                    <ListItem>
                      <Flex align="center" gap="10px">
                        <Circle size="16px" bg="#ff991f">
                          <PaidIcon color="white" />
                        </Circle>
                        Багаж платный
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex align="center" gap="10px">
                        <Circle size="16px" bg="#ff991f">
                          <PaidIcon color="white" />
                        </Circle>
                        Ручная кладь 1 сумка 10 кг, 55x40x23 см
                      </Flex>
                    </ListItem>
                  </List>
                  <List>
                    <Box>Условия:</Box>
                    <ListItem></ListItem>
                  </List>
                  <List>
                    <Box>Услуги:</Box>
                    <ListItem></ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
            <Box
              w={260}
              borderRadius={8}
              bgColor="#EBF3FF"
              p="40px 15px 30px 15px"
            >
              <Box>
                <Grid templateColumns="repeat(2, auto)" rowGap={5}>
                  <Box
                    fontFamily="Roboto"
                    color="#2E2E2E"
                    fontSize={16}
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
                  >
                    5 887 ₽
                  </Box>
                </Grid>
              </Box>
            </Box>
            <Box
              w={260}
              borderRadius={8}
              bgColor="#C2DCFF"
              p="40px 15px 30px 15px"
            >
              <Box>
                <Grid templateColumns="repeat(2, auto)" rowGap={5}>
                  <Box
                    fontFamily="Roboto"
                    color="#2E2E2E"
                    fontSize={16}
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
                  >
                    12 437 ₽
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
};

export default TicketFlightAll;
