import { FC, Dispatch, SetStateAction } from 'react';
import { Flex, Center, Box, Grid, GridItem, Circle } from '@chakra-ui/react';

import { ITicketFlightProps } from '@/interfaces';
import ArrowTicket from '@/common/icons/Ticket/ArrowTicket';

import {
  TicketEconomBox,
  ItemAviaCompany,
  ItemAviaTime,
  ItemTicketFromGo,
} from '../TicketComponents';

interface TiketFlightProps {
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

const TiketFlight: FC<TiketFlightProps> = ({
  flight,
  stateChoice,
  setStateChoice,
}) => {
  const time = (dateTime: string): string => {
    const timeFly = new Date(dateTime);
    const hours = timeFly.getHours();
    const minute = timeFly.getMinutes();
    return `${hours}:${minute}`;
  };

  const dateFly = (dateTime: string): string => {
    const timeFly = new Date(dateTime);
    const day = timeFly.getDate();
    const monthId = timeFly.getMonth();
    const month = monthArray[monthId];
    const dayWeekId = timeFly.getDay();
    const dayWeek = dayWeekArray[dayWeekId];

    return `${day} ${month}, ${dayWeek}`;
  };

  const timeFotFly = (departure: string, arrival: string): string => {
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
        <Grid
          templateColumns="2fr 3fr 2fr"
          templateRows="2fr 3fr"
          width="100%"
          height="100%"
          h={165}
          w={500}
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
                  <ArrowTicket />
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
        <TicketEconomBox
          icon={[true, false, false, false]}
          price="3 787 ₽"
          title="Эконом Базовый"
          remains={true}
          color="#EBF3FF"
          shadow={true}
        />
        <TicketEconomBox
          icon={[true, true, false, false]}
          price="5 887 ₽"
          title="Эконом Стандарт"
          remains={false}
          color="#EBF3FF"
          shadow={false}
        />
        <TicketEconomBox
          icon={[true, true, true, true]}
          price="12 437 ₽"
          title="Эконом Плюс"
          remains={false}
          color="#C2DCFF"
          shadow={false}
        />
      </Flex>
    </Center>
  );
};
export default TiketFlight;
