import { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  Grid,
  GridItem,
  Spinner,
} from '@chakra-ui/react';
import { formatISO, isPast, isToday, compareDesc } from 'date-fns';

import { ArrowsIcon } from '@common/icons';
import mainsearch from '@assets/images/main-search.webp';
import { CalendarTickets } from '@common/CalendarTickets';
import { searchApi } from '@services/searchTickets.service';
import {
  ISearchData,
  ISearchRadioData,
} from '@/interfaces/search-tickets.interfaces';
import { getDestinations } from '@services/destinations.service';
import { getFlights } from '@services/flights.service';
import { IFlightPresentation } from '@/interfaces/flights.interfaces';
import {IDestination} from '@interfaces/destination.interfaces';

interface Props {
  startDate: Date | null;
  endDate: Date | null;
}

const MainSearch = ({ startDate, endDate }: Props) => {
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [passengerWarning, setPassengerWarning] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [tripType, setTripType] = useState('roundTrip');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialSearchQuery: ISearchData = {
    departureDate: '',
    from: {},
    numberOfPassengers: 0,
    returnDate: '',
    to: {},
  };

  const [searchParams, setSearchParams] =
    useState<ISearchData>(initialSearchQuery);

  const getAirportCode = async (city: string) => {
    const destinations = await getDestinations();
    const destination = destinations.content.find((item: IDestination) => item.cityName === city);
    return destination ? destination.airportCode : null;
  };

  const getDates = (day: Date) => {
    setSearchParams((prev) => {
      const newDate = formatISO(day, {
        representation: 'date',
      });
      if (isPast(day) && !isToday(day)) {
        return prev;
      }
      if (!prev.departureDate && !prev.returnDate) {
        return { ...prev, departureDate: newDate };
      }
      if (
        prev.departureDate &&
        !prev.returnDate &&
        (day > new Date(prev.departureDate) ||
          !compareDesc(day.setHours(0, 0, 0, 0), new Date(prev.departureDate)))
      ) {
        return { ...prev, returnDate: newDate };
      } else return { ...prev, departureDate: newDate, returnDate: '' };
    });
  };

  const handleSearch = async () => {
    if (passengerWarning) {
      return;
    }
    try {
      setIsLoading(true);
      const fromAirportCode = await getAirportCode(from);
      const toAirportCode = await getAirportCode(to);

      if (!fromAirportCode || !toAirportCode) {
        setError('Ошибка поиска');
        return;
      }

      const searchData: ISearchData & ISearchRadioData = {
        departureDate: searchParams.departureDate,
        from: {
          cityName: from,
          airportCode: fromAirportCode,
        },
        numberOfPassengers: numberOfPassengers,
        returnDate: searchParams.returnDate,
        to: {
          cityName: to,
          airportCode: toAirportCode,
        },
        departFlight: [],
        returnFlight: [],
      };

      const flights = await getFlights();
      if (flights) {
        const departFlight: IFlightPresentation[] = [];
        const returnFlight: IFlightPresentation[] = [];

        if (directFlightsOnly) {
          const directFlightCode = fromAirportCode + toAirportCode;
          const directFlight = flights.content.find(
            (flight: IFlightPresentation) => flight.code === directFlightCode
          );

          if (directFlight) {
            departFlight.push(directFlight);
          }
        } else {
          const departFlightCode = fromAirportCode + toAirportCode;
          const returnFlightCode = toAirportCode + fromAirportCode;

          const departFlights: IFlightPresentation[] = flights.content.filter(
            (flight) => flight.code.includes(departFlightCode)
          );
          const returnFlights: IFlightPresentation[] = flights.content.filter(
            (flight) => flight.code.includes(returnFlightCode)
          );

          departFlight.push(...departFlights);
          returnFlight.push(...returnFlights);
        }
        searchData.departFlight = departFlight;
        searchData.returnFlight = returnFlight;
      }

      await searchApi.postSearch(searchData);
      setNumberOfPassengers(1);
      setFrom('');
      setTo('');
      setDirectFlightsOnly(false);
      setTripType('roundTrip');
    } catch (err) {
      setError('Ошибка поиска');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passengers = parseInt(e.target.value);

    if (passengers < 1) {
      setPassengerWarning(true);
    } else {
      setNumberOfPassengers(passengers);
      setPassengerWarning(false);
    }
  };

  const handleReverse = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Flex
      justify="center"
      minHeight="54rem"
      minWidth="90rem"
      alignItems="center"
    >
      <Box>
        <Flex justify="center" h="31.25rem" mb="0.7rem" alignItems="center">
          <Image src={mainsearch} alt="Main-search" />
        </Flex>
        <Box
          border="0.9rem solid #D3EFFF"
          borderRadius="1rem"
          w="75rem"
          h="18.75rem"
          p="0.9rem 3.1rem 2.2rem"
        >
          <Text color="#445EBD" fontWeight="700" fontSize={36}>
            Найти билеты
          </Text>
          <Box>
            <Grid
              templateColumns="17rem 17rem 17rem 9rem"
              gap="2rem" 
              overflow="hidden"
            >
              <GridItem>
                <Flex direction="column">
                  <FormControl>
                    <FormLabel fontSize={14}>Откуда</FormLabel>
                    <Input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Город отправления"
                    />
                  </FormControl>
                </Flex>

                <Box
                  data-testid="Reverse"
                  textAlign="center"
                  mt="0.3rem"
                  cursor="pointer"
                  onClick={handleReverse}
                >
                  <ArrowsIcon />
                </Box>

                <Flex direction="column">
                  <FormControl>
                    <FormLabel fontSize={14}>Куда</FormLabel>
                    <Input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Город прибытия"
                    />
                  </FormControl>
                </Flex>
              </GridItem>

              <GridItem position="relative">
                <Flex direction="column">
                  <FormControl>
                    <FormLabel fontSize={14}>Количество пассажиров</FormLabel>
                    <Input
                      type="number"
                      onChange={handlePassengerChange}
                      placeholder="Количество пассажиров"
                      isInvalid={passengerWarning && numberOfPassengers < 1}
                    />
                    {passengerWarning && (
                      <Text color="red" fontSize={12} mt={1}>
                        Количество пассажиров должно быть больше 0
                      </Text>
                    )}
                  </FormControl>

                  <Flex position="absolute" left="0" bottom="2.5" mt={58}>
                    <Checkbox
                      isChecked={directFlightsOnly}
                      onChange={(e) => setDirectFlightsOnly(e.target.checked)}
                    >
                      Искать билеты без пересадок
                    </Checkbox>
                  </Flex>
                </Flex>
              </GridItem>

              <GridItem>
                <Flex direction="column">
                  <FormControl>
                    <FormLabel fontSize={14}>Дата</FormLabel>
                    <CalendarTickets
                      select={(day: Date) => getDates(day)}
                      startDate={startDate}
                      endDate={endDate}
                      calendarFormat={2}
                    />
                  </FormControl>
                  {error && (
                    <Alert
                      data-testid="alert-error"
                      status="error"
                      color="red"
                      fontSize={15}
                      mt="2.75rem"
                    >
                      <AlertIcon mr={1} />
                      {error}
                    </Alert>
                  )}
                </Flex>
              </GridItem>

              <GridItem>
                <Flex direction="column">
                  <FormControl>
                    <RadioGroup
                      value={tripType}
                      onChange={(value) => setTripType(value)}
                    >
                      <Radio value="roundTrip">Туда и обратно</Radio>
                      <Radio value="oneWay" mt="1rem">
                        В одну сторону
                      </Radio>
                    </RadioGroup>
                  </FormControl>
                </Flex>

                <Flex justify="center" mt="3rem">
                  <Button
                    w="8rem"
                    h="3rem"
                    bg="#006FFF"
                    color="#FFFFFF"
                    onClick={handleSearch}
                  >
                    {isLoading ? <Spinner size="sm" color="white" /> : 'Найти'}
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default MainSearch;
