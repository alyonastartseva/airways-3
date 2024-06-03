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
import EnabledIcon from '@/common/icons/Ticket/EnabledIcon';
import UnavailableIcon from '@/common/icons/Ticket/UnavailableIcon';

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
  // eslint-disable-next-line no-console
  console.log(flight);

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
        w="100%"
        mb="30px"
        padding="12px 12px 12px 24px"
        align="start"
        gap="15px"
        maxW="75rem"
      >
        <Flex flexDirection="column" w="500px" h="auto">
          <Box>
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
          <Flex mt="20px" gap={10} flexDirection="column">
            <Flex gap="8px" flexDirection="column">
              <Flex align="center" gap="5px">
                <Box fontFamily="Roboto" fontSize="16px" fontWeight="500">
                  {time(flight.dataTo.departureDateTime)}
                </Box>
                <Box fontFamily="Roboto" fontSize="14px" fontWeight="400">
                  {dateFly(flight.dataTo.departureDateTime)}
                </Box>
              </Flex>
              <Box fontFamily="Roboto" fontSize="16px" fontWeight="500">
                {flight.dataTo.cityFrom}
              </Box>
              <Box
                fontFamily="Roboto"
                fontSize="14px"
                fontWeight="400"
              >{`Аэропорт, терминал, ${flight.dataTo.airportFrom}`}</Box>
            </Flex>
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
            <Flex gap="8px" flexDirection="column">
              <Flex align="center" gap="5px">
                <Box fontFamily="Roboto" fontSize="16px" fontWeight="500">
                  {time(flight.dataTo.arrivalDateTime)}
                </Box>
                <Box fontFamily="Roboto" fontSize="14px" fontWeight="400">
                  {dateFly(flight.dataTo.arrivalDateTime)}
                </Box>
              </Flex>
              <Box fontFamily="Roboto" fontSize="16px" fontWeight="500">
                {flight.dataTo.cityTo}
              </Box>
              <Box
                fontFamily="Roboto"
                fontSize="14px"
                fontWeight="400"
              >{`Аэропорт, терминал, ${flight.dataTo.cityTo}`}</Box>
            </Flex>
          </Flex>
        </Flex>
        <Flex gap="15px" justify="center">
          <Box w={225} borderRadius={8} bgColor="#EBF3FF" p="30px 10px">
            <Flex direction="column" justify="space-between">
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
              <Flex id="remainedTicket" align="center" gap="5px">
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
            <Box mt="18px">
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
              <Box mt="20px">
                <List spacing="10px">
                  <Box fontFamily="Roboto" fontSize="14px" fontWeight="500">
                    Багаж:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <Circle size="16px" bg="#F55B51">
                        <PaidIcon color="white" />
                      </Circle>
                      Багаж платный
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Ручная кладь 1 сумка 10 кг, 55x40x23 см
                    </Flex>
                  </ListItem>
                </List>
                <List spacing="10px">
                  <Box
                    mt="20px"
                    fontFamily="Roboto"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Условия:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Начислим 400
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <Circle size="16px" bg="#F55B51">
                        <PaidIcon color="white" />
                      </Circle>
                      Обмен платный 4000₽
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <UnavailableIcon color="#95a0b3" />
                      Обмен платный 4000₽
                    </Flex>
                  </ListItem>
                </List>
                <List spacing="10px">
                  <Box
                    mt="20px"
                    fontFamily="Roboto"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Услуги:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <Circle size="16px" bg="#F55B51">
                        <PaidIcon color="white" />
                      </Circle>
                      Выбор мест платный
                    </Flex>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
          <Box w={225} borderRadius={8} bgColor="#EBF3FF" p="30px 10px">
            <Box>
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
              <Box mt="20px">
                <List spacing="10px">
                  <Box fontFamily="Roboto" fontSize="14px" fontWeight="500">
                    Багаж:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Багаж 1 сумка 23 кг
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Ручная кладь 1 сумка 10 кг, 55x40x23 см
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Спортивное снаряжение
                    </Flex>
                  </ListItem>
                </List>
                <List spacing="10px">
                  <Box
                    mt="20px"
                    fontFamily="Roboto"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Условия:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Начислим 800
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <Circle size="16px" bg="#F55B51">
                        <PaidIcon color="white" />
                      </Circle>
                      Обмен платный 2300₽
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <Circle size="16px" bg="#F55B51">
                        <PaidIcon color="white" />
                      </Circle>
                      Возврат платный 3500₽
                    </Flex>
                  </ListItem>
                </List>
                <List spacing="10px">
                  <Box
                    mt="20px"
                    fontFamily="Roboto"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Услуги:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Выбор места на регистрации
                    </Flex>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
          <Box w={225} borderRadius={8} bgColor="#C2DCFF" p="30px 10px">
            <Box>
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
              <Box mt="20px">
                <List spacing="10px">
                  <Box fontFamily="Roboto" fontSize="14px" fontWeight="500">
                    Багаж:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Багаж 1 сумка 32 кг
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Ручная кладь 1 сумка 10 кг, 55x40x23 см
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="center" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Спортивное снаряжение
                    </Flex>
                  </ListItem>
                </List>
                <List spacing="10px">
                  <Box
                    mt="20px"
                    fontFamily="Roboto"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Условия:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Начислим 1200
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Обмен
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Возврат
                    </Flex>
                  </ListItem>
                </List>
                <List spacing="10px">
                  <Box
                    mt="20px"
                    fontFamily="Roboto"
                    fontSize="14px"
                    fontWeight="500"
                  >
                    Услуги:
                  </Box>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Выбор питания
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Лучшие места
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Приоритет в аэропорту
                    </Flex>
                  </ListItem>
                  <ListItem
                    fontFamily="Roboto"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    <Flex align="start" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Бизнес-зал
                    </Flex>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Center>
  );
};

export default TicketFlightAll;
