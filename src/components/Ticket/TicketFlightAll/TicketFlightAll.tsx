import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Circle,
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
  PaidIcon,
  EnabledIcon,
  UnavailableIcon,
  CompanyPoints,
  SpinerIconTicket,
  ArrowTicket,
} from '@/common/icons';
import { ITicketFlightProps } from '@/interfaces';

import {
  ItemAviaCompany,
  ItemAviaTime,
  ItemPlane,
  ItemTicketFromGo,
} from '../TicketComponents';

import ItemFlightBox from './componets/ItemFlightBox';

interface TiketFlightAllProps {
  flight: ITicketFlightProps;
  stateChoice: boolean;
  setStateChoice: Dispatch<SetStateAction<boolean>>;
}

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

const TicketFlightAll: FC<TiketFlightAllProps> = ({
  stateChoice,
  setStateChoice,
  flight,
}) => {
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
        h="100%"
        maxH="700px"
        alignItems="stretch"
      >
        <Flex flexDirection="column" w="500px">
          <Grid
            templateColumns="2fr 3fr 2fr"
            templateRows="2fr 3fr"
            width="100%"
            height="auto"
          >
            <ItemAviaCompany />
            <ItemAviaTime
              timeFotFly={timeFotFly}
              depart={flight.dataTo.departureDateTime}
              arriv={flight.dataTo.arrivalDateTime}
            />
            <GridItem>
              <Center w="100%" h="100%">
                <Flex align="center" gap="10px">
                  <Box
                    color="#4797FF"
                    fontFamily="Roboto"
                    fontSize={14}
                    fontWeight="600"
                  >
                    1 пересадка
                  </Box>
                  <Circle size="16px" backgroundColor="#D6E8FF">
                    <ArrowTicket rotate="rotate(180deg)" />
                  </Circle>
                </Flex>
              </Center>
            </GridItem>
            <ItemTicketFromGo
              where="From"
              flight={flight}
              time={time}
              dateFly={dateFly}
            />
            <ItemTicketFromGo
              where="To"
              flight={flight}
              time={time}
              dateFly={dateFly}
            />
          </Grid>
          <Box
            overflow="scroll"
            css={{
              '&::-webkit-scrollbar': {
                background: 'none',
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
            }}
            _hover={{
              '&::-webkit-scrollbar-thumb': {
                background: '#aaa',
                borderRadius: '24px',
              },
            }}
          >
            <ItemPlane numberPlane="S7 1004" typePlane="Airbus A319" />
            <ItemFlightBox
              flight={flight}
              dateFly={dateFly}
              time={time}
              timeFotFly={timeFotFly}
            />
            <Flex
              align="center"
              backgroundColor="#fff4e9"
              borderRadius="8px"
              width="100%"
              h="60px"
              gap="15px"
              pl="20px"
              m="30px 0"
            >
              <SpinerIconTicket />
              <Box fontFamily="Roboto" fontSize="16px" fontWeight="600">
                Пересадка 4ч 00мин
              </Box>
            </Flex>
            <ItemPlane numberPlane="S7 1004" typePlane="Airbus A319" />
            <ItemFlightBox
              flight={flight}
              dateFly={dateFly}
              time={time}
              timeFotFly={timeFotFly}
            />
          </Box>
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
                    <Flex align="center" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Начислим 400
                      <CompanyPoints color="#4797FF" />
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
                    <Flex align="center" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Начислим 800
                      <CompanyPoints color="#4797FF" />
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
                    <Flex align="center" gap="7px">
                      <EnabledIcon color="#006FFF" />
                      Начислим 1200
                      <CompanyPoints color="#4797FF" />
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
