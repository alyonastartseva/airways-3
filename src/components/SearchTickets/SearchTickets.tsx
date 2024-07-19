// import { useState, useMemo } from 'react';
// import {
//   Alert,
//   AlertIcon,
//   Box,
//   Flex,
//   Image,
//   Text,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Button,
//   RadioGroup,
//   Radio,
//   Grid,
//   GridItem,
//   Spinner,
//   Select,
// } from '@chakra-ui/react';
// import { formatISO, parseISO, isPast, isToday, compareDesc } from 'date-fns';

// import { ArrowsIcon } from '@common/icons';
// import { mainsearch } from '@/assets';
// import { searchApi } from '@services/searchTickets.service';
// import { getFlights } from '@services/flights/flights.service';
// import { ISearchData, IFlightPresentation } from '@/interfaces';
// import { Calendar, SeatCategory } from '@/common';
// import { DestinationsInputSelector } from '@/components';
// import { ISeatCategoryType } from '@/interfaces/flightsSeats.interfaces';
// import { useTheme } from '@context/:ThemeProvider';

// import { TicketCard } from '../Ticket/TicketCard';
// import { ITicketCardProps } from '../Ticket/TicketCard/ticketCard.interfaces';

// import { DataToType, ISearchRadioData } from './SearchTickets.interfaces';

// interface Props {
//   initialValues?: ISearchData;
//   onSearch?: (searchFormData: ISearchData) => void;
//   showImage?: boolean;
//   alignItems?: string;
//   marginTop?: string;
// }

// const SearchTickets = ({
//   initialValues = {
//     departureDate: '',
//     returnDate: '',
//     airportFrom: '',
//     numberOfPassengers: null,
//     airportTo: '',
//     directFlightsOnly: false,
//     tripType: 'roundTrip',
//     categoryOfSeats: 'Бизнес',
//   },
//   onSearch,
//   showImage = true,
//   alignItems = 'center',
//   marginTop,
// }: Props) => {
//   const [searchParams, setSearchParams] = useState(initialValues);
//   const [passengerWarning, setPassengerWarning] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { theme } = useTheme();
//   const borderColor = theme === 'light' ? '#D3EFFF' : '#444';
//   const [ticketCardProps, setTicketCardProps] = useState<
//     ITicketCardProps & { flightSeatId: number }[]
//   >([]);
//   const [fromToPosition, setFromToPosition] = useState(true);

//   const updateSearchParam = (param: Partial<ISearchData>) => {
//     setSearchParams((prev) => ({ ...prev, ...param }));
//   };

//   const getDates = (day: Date) => {
//     setSearchParams((prev) => {
//       const newDate = formatISO(day, {
//         representation: 'date',
//       });
//       if (isPast(day) && !isToday(day)) {
//         return prev;
//       }
//       if (!prev.departureDate && !prev.returnDate) {
//         return { ...prev, departureDate: newDate };
//       }
//       if (
//         prev.departureDate &&
//         !prev.returnDate &&
//         (day > new Date(prev.departureDate) ||
//           !compareDesc(day.setHours(0, 0, 0, 0), new Date(prev.departureDate)))
//       ) {
//         return { ...prev, returnDate: newDate };
//       } else return { ...prev, departureDate: newDate, returnDate: '' };
//     });
//   };

//   const handleSearch = async () => {
//     if (passengerWarning) {
//       return;
//     }

//     const searchFormData = {
//       numberOfPassengers: searchParams.numberOfPassengers,
//       airportFrom: searchParams.airportFrom,
//       airportTo: searchParams.airportTo,
//       directFlightsOnly: searchParams.directFlightsOnly,
//       tripType: searchParams.tripType,
//       categoryOfSeats: searchParams.categoryOfSeats,
//       departureDate: searchParams.departureDate,
//       returnDate: searchParams.returnDate,
//     };

//     try {
//       setIsLoading(true);

//       if (!searchFormData.airportFrom || !searchFormData.airportTo) {
//         setError('Ошибка поиска');
//         return;
//       }

//       const searchData: ISearchData & ISearchRadioData = {
//         ...searchFormData,
//         departFlight: [],
//         returnFlight: [],
//       };

//       const flights = await getFlights();
//       if (flights) {
//         const departFlight: IFlightPresentation[] = [];
//         const returnFlight: IFlightPresentation[] = [];

//         if (searchFormData.directFlightsOnly) {
//           const directFlightCode =
//             searchFormData.airportFrom + searchFormData.airportTo;
//           const directFlight = flights.content.find(
//             (flight: IFlightPresentation) => flight.code === directFlightCode
//           );

//           if (directFlight) {
//             departFlight.push(directFlight);
//           }
//         } else {
//           const departFlightCode =
//             searchFormData.airportFrom + searchFormData.airportTo;
//           const returnFlightCode =
//             searchFormData.airportTo + searchFormData.airportFrom;

//           const departFlights: IFlightPresentation[] = flights.content.filter(
//             (flight) => flight.code.includes(departFlightCode)
//           );
//           const returnFlights: IFlightPresentation[] = flights.content.filter(
//             (flight) => flight.code.includes(returnFlightCode)
//           );

//           departFlight.push(...departFlights);
//           returnFlight.push(...returnFlights);
//         }
//         searchData.departFlight = departFlight;
//         searchData.returnFlight = returnFlight;
//       }

//       const searchResult = await searchApi.postSearch(searchData);
//       if (searchResult) {
//         // eslint-disable-next-line no-console
//         console.log(searchResult);
//       } else {
//         // eslint-disable-next-line no-console
//         console.log('Нет билетов');
//       }

//       setTicketCardProps([]);
//       if (searchResult) {
//         const {
//           search: { categoryOfSeats },
//           flights: [...rest],
//         } = searchResult;

//         // временное решение для хранения пропсов TicketCard
//         setTicketCardProps(
//           rest.map((data: { dataTo: DataToType; totalPrice: number }) => ({
//             ...data.dataTo,
//             // TODO: заменить значения тарифов, когда будут приходить данные с сервера
//             tariffsData: {
//               basic: { price: data.totalPrice, ticketsCount: 2 },
//               standard: { price: data.totalPrice * 2, ticketsCount: 8 },
//               plus: { price: data.totalPrice * 3, ticketsCount: 10 },
//             },
//             categoryOfSeats,
//           }))
//         );
//       }

//       if (onSearch) {
//         onSearch(searchFormData);
//       }
//     } catch (err) {
//       setError('Ошибка поиска');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const passengers = parseInt(e.target.value);

//     if (passengers < 1) {
//       setPassengerWarning(true);
//     } else {
//       updateSearchParam({ numberOfPassengers: passengers });
//       setPassengerWarning(false);
//     }
//   };

//   const handleReverse = () => {
//     const { airportFrom, airportTo } = searchParams;
//     updateSearchParam({
//       airportFrom: airportTo,
//       airportTo: airportFrom,
//     });
//   };
//   const calendarDates = useMemo(() => {
//     const startDate = searchParams.departureDate
//       ? parseISO(searchParams.departureDate)
//       : null;
//     const endDate = searchParams.returnDate
//       ? parseISO(searchParams.returnDate)
//       : null;

//     return { startDate, endDate };
//   }, [searchParams.departureDate, searchParams.returnDate]);

//   const FirstGridContainter = () => {
//     const From = () => {
//       return (
//         <Flex direction="column">
//           <FormControl>
//             <FormLabel fontSize={14}>Откуда</FormLabel>
//             <DestinationsInputSelector
//               value={searchParams.airportFrom}
//               placeholder="Город отправления"
//               setValue={(value) => updateSearchParam({ airportFrom: value })}
//             />
//           </FormControl>
//         </Flex>
//       );
//     };
//     const To = () => {
//       return (
//         <Flex direction="column">
//           <FormControl>
//             <FormLabel fontSize={14}>Куда</FormLabel>
//             <DestinationsInputSelector
//               value={searchParams.airportTo}
//               placeholder="Город прибытия"
//               setValue={(value) => updateSearchParam({ airportTo: value })}
//             />
//           </FormControl>
//         </Flex>
//       );
//     };
//     const SwitcherFirstContainer = () => {
//       return (
//         <Box
//           data-testid="Reverse"
//           textAlign="center"
//           mt="0.3rem"
//           cursor="pointer"
//           onClick={handleReverse}
//         >
//           <ArrowsIcon />
//         </Box>
//       );
//     };

//     return (
//       <GridItem>
//         {fromToPosition ? <From /> : <To />}
//         <SwitcherFirstContainer />
//         {fromToPosition ? <To /> : <From />}
//       </GridItem>
//     );
//   };

//   return (
//     <Flex
//       justify="center"
//       maxWidth="90rem"
//       w="100%"
//       alignItems={alignItems}
//       m="auto"
//       mb="30px"
//       marginTop={marginTop}
//     >
//       <Box>
//         {showImage && (
//           <Flex justify="center" h="31.25rem" mb="0.7rem" alignItems="center">
//             <Image
//               src={mainsearch}
//               alt="mainsearch"
//               borderRadius="0.5rem"
//               filter={theme === 'dark' ? 'brightness(60%)' : 'none'}
//             />
//           </Flex>
//         )}
//         <Box
//           border="0.9rem solid "
//           borderColor={borderColor}
//           borderRadius="1rem"
//           w="100%"
//           maxWidth="75rem"
//           h="18.75rem"
//           p="0.9rem 3.1rem 2.2rem"
//         >
//           <Text
//             color={theme === 'light' ? '#445EBD' : '#FFFFFF'}
//             fontWeight="700"
//             fontSize={36}
//           >
//             Найти билеты
//           </Text>
//           <Box>
//             <Grid templateColumns="17rem 17rem 17rem 9rem" gap="2rem">
//               <FirstGridContainter />
//               <GridItem position="relative">
//                 <Flex direction="column" height="100%">
//                   <FormControl>
//                     <FormLabel fontSize={14}>Количество пассажиров</FormLabel>
//                     <Input
//                       type="number"
//                       value={searchParams.numberOfPassengers ?? ''}
//                       onChange={handlePassengerChange}
//                       placeholder="Количество пассажиров"
//                       isInvalid={
//                         passengerWarning &&
//                         (!searchParams.numberOfPassengers ||
//                           searchParams.numberOfPassengers < 1)
//                       }
//                     />
//                     {passengerWarning && (
//                       <Text color="red" fontSize={12} mt={1}>
//                         Количество пассажиров должно быть больше 0
//                       </Text>
//                     )}
//                   </FormControl>
//                   <FormControl mt="auto">
//                     <FormLabel fontSize={14}>Категория сиденья</FormLabel>
//                     <Select
//                       value={searchParams.categoryOfSeats}
//                       onChange={(e) =>
//                         updateSearchParam({
//                           categoryOfSeats: e.target.value as ISeatCategoryType,
//                         })
//                       }
//                       fontSize="0.87rem"
//                       _hover={{
//                         borderColor: '#cbd5e0',
//                       }}
//                       _active={{
//                         borderColor: '#398AEA',
//                       }}
//                     >
//                       <SeatCategory />
//                     </Select>
//                   </FormControl>
//                 </Flex>
//               </GridItem>

//               <GridItem>
//                 <Flex direction="column" height="100%" position="relative">
//                   <FormControl>
//                     <FormLabel fontSize={14}>Дата</FormLabel>
//                     <Calendar
//                       select={(day: Date) => getDates(day)}
//                       startDate={calendarDates.startDate}
//                       endDate={calendarDates.endDate}
//                       calendarFormat={2}
//                     />
//                   </FormControl>
//                   {error && (
//                     <Alert
//                       data-testid="alert-error"
//                       status="error"
//                       colorScheme={theme === 'dark' ? 'red' : 'white'}
//                       bg={theme === 'dark' ? 'gray.700' : 'red'}
//                       color={theme === 'dark' ? 'white' : 'black'}
//                       fontSize={15}
//                       mt="2.75rem"
//                       position="absolute"
//                       top="35px"
//                     >
//                       <AlertIcon mr={1} />
//                       {error}
//                     </Alert>
//                   )}
//                   <Checkbox
//                     py="8px"
//                     mt="auto"
//                     isChecked={searchParams.directFlightsOnly}
//                     onChange={(e) =>
//                       updateSearchParam({ directFlightsOnly: e.target.checked })
//                     }
//                   >
//                     Искать билеты без пересадок
//                   </Checkbox>
//                 </Flex>
//               </GridItem>

//               <GridItem>
//                 <Flex direction="column">
//                   <FormControl>
//                     <RadioGroup
//                       value={searchParams.tripType}
//                       onChange={(value) =>
//                         updateSearchParam({ tripType: value })
//                       }
//                     >
//                       <Radio value="roundTrip">Туда и обратно</Radio>
//                       <Radio value="oneWay" mt="1rem">
//                         В одну сторону
//                       </Radio>
//                     </RadioGroup>
//                   </FormControl>
//                 </Flex>

//                 <Flex justify="center" mt="3rem">
//                   <Button
//                     w="8rem"
//                     h="3rem"
//                     bg="#006FFF"
//                     color="#FFFFFF"
//                     onClick={handleSearch}
//                   >
//                     {isLoading ? <Spinner size="sm" color="white" /> : 'Найти'}
//                   </Button>
//                 </Flex>
//               </GridItem>
//             </Grid>
//           </Box>
//         </Box>
//         {ticketCardProps &&
//           ticketCardProps.map(({ flightSeatId, ...ticketProps }) => (
//             <Box key={flightSeatId} my={8}>
//               <TicketCard {...ticketProps} />
//             </Box>
//           ))}
//       </Box>
//     </Flex>
//   );
// };

// export default SearchTickets;

import { useState, useMemo } from 'react';
import {
  Alert,
  Row,
  Col,
  Image,
  Typography,
  Form,
  Input,
  Checkbox,
  Button,
  Radio,
  Spin,
  DatePicker,
  ConfigProvider,
} from 'antd';
import { formatISO, isPast, isToday, compareDesc } from 'date-fns';
import dayjs from 'dayjs';
import ruRU from 'antd/es/locale/ru_RU';

import { ArrowsIcon } from '@common/icons';
import { mainsearch } from '@/assets';
import { searchApi } from '@services/searchTickets.service';
import { getFlights } from '@services/flights/flights.service';
import { ISearchData, IFlightPresentation } from '@/interfaces';
import { SeatCategory } from '@/common';
import { DestinationsInputSelector } from '@/components';
import { ISeatCategoryType } from '@/interfaces/flightsSeats.interfaces';

import { TicketCard } from '../Ticket/TicketCard';
import { ITicketCardProps } from '../Ticket/TicketCard/ticketCard.interfaces';

import { DataToType, ISearchRadioData } from './SearchTickets.interfaces';
import './SearchTickets.scss';

const { Title, Text } = Typography;
const { Item: FormItem } = Form;

interface Props {
  initialValues?: ISearchData;
  onSearch?: (searchFormData: ISearchData) => void;
  showImage?: boolean;
  alignItems?: string;
  marginTop?: string;
}

const SearchTickets = ({
  initialValues = {
    departureDate: '',
    returnDate: '',
    airportFrom: '',
    numberOfPassengers: null,
    airportTo: '',
    directFlightsOnly: false,
    tripType: 'roundTrip',
    categoryOfSeats: 'Бизнес',
  },
  onSearch,
  showImage = true,
  marginTop,
}: Props) => {
  const [searchParams, setSearchParams] = useState(initialValues);
  const [passengerWarning, setPassengerWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [ticketCardProps, setTicketCardProps] = useState<
    ITicketCardProps & { flightSeatId: number }[]
  >([]);
  const [fromToPosition, setFromToPosition] = useState(true);

  const updateSearchParam = (param: Partial<ISearchData>) => {
    setSearchParams((prev) => ({ ...prev, ...param }));
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

    const searchFormData = {
      numberOfPassengers: searchParams.numberOfPassengers,
      airportFrom: searchParams.airportFrom,
      airportTo: searchParams.airportTo,
      directFlightsOnly: searchParams.directFlightsOnly,
      tripType: searchParams.tripType,
      categoryOfSeats: searchParams.categoryOfSeats,
      departureDate: searchParams.departureDate,
      returnDate: searchParams.returnDate,
    };

    try {
      setIsLoading(true);

      if (!searchFormData.airportFrom || !searchFormData.airportTo) {
        setError('Ошибка поиска');
        return;
      }

      const searchData: ISearchData & ISearchRadioData = {
        ...searchFormData,
        departFlight: [],
        returnFlight: [],
      };

      const flights = await getFlights();
      if (flights) {
        const departFlight: IFlightPresentation[] = [];
        const returnFlight: IFlightPresentation[] = [];

        if (searchFormData.directFlightsOnly) {
          const directFlightCode =
            searchFormData.airportFrom + searchFormData.airportTo;
          const directFlight = flights.content.find(
            (flight: IFlightPresentation) => flight.code === directFlightCode
          );

          if (directFlight) {
            departFlight.push(directFlight);
          }
        } else {
          const departFlightCode =
            searchFormData.airportFrom + searchFormData.airportTo;
          const returnFlightCode =
            searchFormData.airportTo + searchFormData.airportFrom;

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

      const searchResult = await searchApi.postSearch(searchData);
      if (searchResult) {
        // eslint-disable-next-line no-console
        console.log(searchResult);
      } else {
        // eslint-disable-next-line no-console
        console.log('Нет билетов');
      }

      setTicketCardProps([]);
      if (searchResult) {
        const {
          search: { categoryOfSeats },
          flights: [...rest],
        } = searchResult;

        // временное решение для хранения пропсов TicketCard
        setTicketCardProps(
          rest.map((data: { dataTo: DataToType; totalPrice: number }) => ({
            ...data.dataTo,
            // TODO: заменить значения тарифов, когда будут приходить данные с сервера
            tariffsData: {
              basic: { price: data.totalPrice, ticketsCount: 2 },
              standard: { price: data.totalPrice * 2, ticketsCount: 8 },
              plus: { price: data.totalPrice * 3, ticketsCount: 10 },
            },
            categoryOfSeats,
          }))
        );
      }

      if (onSearch) {
        onSearch(searchFormData);
      }
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
      updateSearchParam({ numberOfPassengers: passengers });
      setPassengerWarning(false);
    }
  };

  // const handleReverse = () => {
  //   updateSearchParam({
  //     airportTo: searchParams.airportFrom,
  //     airportFrom: searchParams.airportTo,
  //   });
  //   setFromToPosition(!fromToPosition);
  // };
  const handleReverse = () => {
    const { airportFrom, airportTo } = searchParams;
    updateSearchParam({
      airportFrom: airportTo,
      airportTo: airportFrom,
    });
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleReverse();
    }
  };

  const calendarDates: {
    startDate: dayjs.Dayjs | null;
    endDate: dayjs.Dayjs | null;
  } = useMemo(() => {
    const startDate = searchParams.departureDate
      ? dayjs(searchParams.departureDate)
      : null;
    const endDate = searchParams.returnDate
      ? dayjs(searchParams.returnDate)
      : null;

    return { startDate, endDate };
  }, [searchParams.departureDate, searchParams.returnDate]);

  const FirstGridContainter = () => {
    const From = () => {
      return (
        <FormItem className="formItem-wrapper">
          <FormItem className="formItem" label="Откуда">
            <DestinationsInputSelector
              value={searchParams.airportFrom}
              placeholder="Город отправления"
              setValue={(value) => updateSearchParam({ airportFrom: value })}
            />
          </FormItem>
        </FormItem>
      );
    };
    const To = () => {
      return (
        <FormItem className="formItem-wrapper">
          <FormItem className="formItem" label="Куда">
            <DestinationsInputSelector
              value={searchParams.airportTo}
              placeholder="Город прибытия"
              setValue={(value) => updateSearchParam({ airportTo: value })}
            />
          </FormItem>
        </FormItem>
      );
    };
    const SwitcherFirstContainer = () => {
      return (
        <div
          data-testid="Reverse"
          onClick={handleReverse}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          style={{
            textAlign: 'center',
            marginTop: '0.3rem',
            cursor: 'pointer',
          }}
        >
          <ArrowsIcon />
        </div>
      );
    };

    return (
      <Col span={6}>
        {fromToPosition ? <From /> : <To />}
        <SwitcherFirstContainer />
        {fromToPosition ? <To /> : <From />}
      </Col>
    );
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        maxWidth: '90rem',
        width: '100%',
        margin: 'auto',
        marginBottom: '30px',
        marginTop,
      }}
    >
      <Col>
        {showImage && (
          <Row
            justify="center"
            style={{ height: '31.25rem', marginBottom: '0.7rem' }}
            align="middle"
          >
            <Image src={mainsearch} alt="Main-search" />
          </Row>
        )}

        <div
          className="searchTickets-block"
          style={{
            border: '0.9rem solid #D3EFFF',
            borderRadius: '1rem',
            width: '100%',
            maxWidth: '75rem',
            height: '18.75rem',
            padding: '0.9rem 3.1rem 2.2rem',
          }}
        >
          <Title level={2} style={{ color: '#445EBD', fontWeight: 'bold' }}>
            Найти билеты
          </Title>
          <div>
            <Row gutter={32} justify="space-between">
              <FirstGridContainter />
              <Col span={6}>
                <FormItem>
                  <FormItem className="formItem" label="Количество пассажиров">
                    <Input
                      type="number"
                      value={searchParams.numberOfPassengers ?? ''}
                      onChange={handlePassengerChange}
                      placeholder="Количество пассажиров"
                      status={
                        passengerWarning &&
                        (!searchParams.numberOfPassengers ||
                          searchParams.numberOfPassengers < 1)
                          ? 'error'
                          : ''
                      }
                      style={{
                        padding: '5px 5px',
                        backgroundColor: '#f5f5f5',
                      }}
                    />
                    {passengerWarning && (
                      <Text
                        type="danger"
                        style={{
                          position: 'absolute',
                          fontSize: 12,
                          left: 0,
                          top: '100%',
                        }}
                      >
                        Количество пассажиров должно быть больше 0
                      </Text>
                    )}
                  </FormItem>

                  <FormItem
                    className="formItem-seatCategory"
                    label={
                      <span style={{ display: 'block' }}>
                        Категория сиденья
                      </span>
                    }
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    <SeatCategory
                      value={searchParams.categoryOfSeats as ISeatCategoryType}
                      onChange={(value) =>
                        updateSearchParam({ categoryOfSeats: value })
                      }
                    />
                  </FormItem>
                </FormItem>
              </Col>

              <Col span={6}>
                <FormItem>
                  <ConfigProvider locale={ruRU}>
                    <FormItem className="formItem" label="Дата">
                      <DatePicker.RangePicker
                        value={[
                          calendarDates.startDate
                            ? dayjs(calendarDates.startDate)
                            : null,
                          calendarDates.endDate
                            ? dayjs(calendarDates.endDate)
                            : null,
                        ]}
                        onChange={(dates) => {
                          const [start, end] = dates ?? [null, null];
                          if (start) getDates(start.toDate());
                          if (end) getDates(end.toDate());
                        }}
                        format="YYYY-MM-DD"
                        style={{
                          padding: '5px 5px',
                          backgroundColor: '#F5F5F5',
                        }}
                        placeholder={['Туда', 'Обратно']}
                      />
                    </FormItem>
                  </ConfigProvider>
                  {error && (
                    <Alert
                      data-testid="alert-error"
                      type="error"
                      message={error}
                      showIcon
                      style={{
                        fontSize: 15,
                        marginTop: '2.75rem',
                        position: 'absolute',
                        top: 35,
                      }}
                    />
                  )}
                  <Checkbox
                    className="checkboxSearch"
                    checked={searchParams.directFlightsOnly}
                    onChange={(e) =>
                      updateSearchParam({ directFlightsOnly: e.target.checked })
                    }
                  >
                    Искать билеты без пересадок
                  </Checkbox>
                </FormItem>
              </Col>

              <Col className="colSearch" span={4}>
                <FormItem>
                  <FormItem className="formItem">
                    <Radio.Group
                      className="radioGroup"
                      value={searchParams.tripType}
                      onChange={(e) =>
                        updateSearchParam({ tripType: e.target.value })
                      }
                    >
                      <Radio value="roundTrip" className="tripType-radioButton">
                        Туда и обратно
                      </Radio>
                      <Radio
                        value="oneWay"
                        className="tripType-radioButton"
                        style={{
                          marginTop: '1rem',
                        }}
                      >
                        В одну сторону
                      </Radio>
                    </Radio.Group>
                  </FormItem>
                </FormItem>
                <Row justify="center" style={{ marginTop: '3rem' }}>
                  <Button
                    className="searchTIcketsButton"
                    onClick={handleSearch}
                    style={{
                      backgroundColor: '#006fff',
                      border: 'none',
                      width: '8rem',
                      height: '3rem',
                      marginTop: '-3.5rem',
                    }}
                  >
                    {isLoading ? (
                      <Spin
                        size="small"
                        style={{ color: 'white', zIndex: '99' }}
                      />
                    ) : (
                      'Найти'
                    )}
                  </Button>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
        {ticketCardProps &&
          ticketCardProps.map(({ flightSeatId, ...ticketProps }) => (
            <div key={flightSeatId} style={{ margin: '8px 0' }}>
              <TicketCard {...ticketProps} />
            </div>
          ))}
      </Col>
    </Row>
  );
};

export default SearchTickets;
