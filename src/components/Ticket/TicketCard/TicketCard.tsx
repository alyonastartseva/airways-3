import {
  Card,
  CardBody,
  Flex,
  Link,
  Text,
  Image,
  CardFooter,
  Divider,
  Box,
} from '@chakra-ui/react';

import {
  AirplaneTakeoffIcon,
  AirplaneLandingIcon,
  CaretDownIcon,
  AirplaneIcon,
} from '@common/icons';
import { pluralize } from '@utils/string.utils';
import { getFormattedDateTime } from '@utils/date.utils';

import { TicketTariff } from '../TicketTariff';

import { ITicketCardProps, TTariffType } from './ticketCard.interfaces';

const tariffsInitial: Omit<TTariffType, 'price' | 'ticketsCount'>[] = [
  {
    name: { ru: 'Базовый', eng: 'basic' },
    facilities: ['luggage'],
  },
  {
    name: { ru: 'Стандарт', eng: 'standard' },
    facilities: ['luggage', 'hand-luggage'],
  },
  {
    name: { ru: 'Плюс', eng: 'plus' },
    facilities: ['luggage', 'hand-luggage', 'refund', 'comfort'],
  },
];

const TicketCard = ({
  agent: { name, logoSrc } = {
    name: 'Globus LLC',
  },
  airportFrom = 'LED',
  airportTo = 'DME',
  cityFrom = 'Санкт-Петербург',
  cityTo = 'Москва',
  departureDateTime = '2024-04-20T20:15:00',
  arrivalDateTime = '2024-04-20T21:20:00',
  flightTime = '1ч 5м',
  categoryOfSeats = 'FIRST',
  transfers,
  tariffsData = {
    basic: {
      price: 3787,
      ticketsCount: 2,
    },
    standard: {
      price: 5887,
      ticketsCount: 8,
    },
    plus: {
      price: 12437,
      ticketsCount: 10,
    },
  },
}: ITicketCardProps) => {
  const [departureTime, departureDate] =
    getFormattedDateTime(departureDateTime);
  const [arrivalTime, arrivalDate] = getFormattedDateTime(arrivalDateTime);

  const tariffs = tariffsInitial.map((item) => ({
    ...item,
    ...tariffsData[item.name.eng],
  }));

  const linkText = transfers
    ? `${transfers.length} ${pluralize(transfers.length, [
        'пересадка',
        'пересадки',
        'пересадок',
      ])}`
    : 'Прямой рейс';

  return (
    <Card
      direction="row"
      boxShadow="0 0 20px 0 rgba(0, 0, 0, 0.25)"
      justifyContent="space-between"
      maxW="1356px"
      p="15px"
    >
      <CardBody minW="320px" maxW="500px" width="100%" p="10px 22px">
        <Flex alignItems="center" justifyContent="space-between" mb="10px">
          <Flex alignItems="center">
            <Flex
              borderRadius="full"
              alignItems="center"
              justifyContent="center"
              backgroundColor="#c4d600"
              w="40px"
              h="40px"
            >
              {logoSrc ? (
                <Image
                  boxSize="40px"
                  borderRadius="full"
                  objectFit="cover"
                  src={logoSrc}
                />
              ) : (
                <AirplaneIcon />
              )}
            </Flex>

            <Text color="#808080" fontSize={16} fontWeight="medium" pl="10px">
              {name}
            </Text>
          </Flex>

          <Link color="#4797ff" _hover={{ color: '#296fca' }}>
            {linkText} <CaretDownIcon size={16} />
          </Link>
        </Flex>

        <Text color="#808080" fontWeight="medium" textAlign="center">
          <AirplaneTakeoffIcon size={20} /> в пути {flightTime}{' '}
          <AirplaneLandingIcon size={20} />
        </Text>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="28px" fontWeight="semibold" mr={2}>
            {departureTime}
          </Text>
          <Text fontWeight="medium">{airportFrom}</Text>

          <Divider
            borderWidth={1}
            opacity={1}
            variant="dashed"
            borderColor="#c2c2c2"
            mx={3}
          />

          <Text fontWeight="medium" mr={2}>
            {airportTo}
          </Text>
          <Text fontSize="28px" fontWeight="semibold">
            {arrivalTime}
          </Text>
        </Flex>

        <Flex
          justifyContent="space-between"
          fontWeight="medium"
          color="#808080"
        >
          <Box>
            <Text>{cityFrom}</Text>
            <Text>{departureDate}</Text>
          </Box>
          <Box textAlign="right">
            <Text>{cityTo}</Text>
            <Text>{arrivalDate}</Text>
          </Box>
        </Flex>
      </CardBody>

      <CardFooter maxW="810px" width="100%" p={0} gap="15px">
        {tariffs.map((tariff) => (
          <TicketTariff
            key={tariff.name.eng}
            tariff={tariff}
            categoryOfSeats={categoryOfSeats}
          />
        ))}
      </CardFooter>
    </Card>
  );
};

export default TicketCard;
