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
import isoWeek from 'dayjs/plugin/isoWeek';
import ruRU from 'antd/es/locale/ru_RU';

import { ArrowsIcon } from '@common/icons';
import { mainsearch } from '@/assets';
import { searchApi } from '@services/searchTickets.service';
import { getFlights } from '@services/flights/flights.service';
import { ISearchData, IFlightPresentation } from '@/interfaces';
import { useTheme } from '@context/:ThemeProvider';
import { SeatCategory } from '@/common';
import { DestinationsInputSelector } from '@/components';
import { ISeatCategoryType } from '@/interfaces/flightsSeats.interfaces';

import { TicketCard } from '../Ticket/TicketCard';
import { ITicketCardProps } from '../Ticket/TicketCard/ticketCard.interfaces';

import { DataToType, ISearchRadioData } from './SearchTickets.interfaces';
import './SearchTickets.scss';

const { Title, Text } = Typography;
const { Item: FormItem } = Form;

dayjs.extend(isoWeek);

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
  const { theme } = useTheme();
  const [ticketCardProps, setTicketCardProps] = useState<
    ITicketCardProps & { flightSeatId: number }[]
  >([]);
  const [fromToPosition] = useState(true);

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
          <FormItem
            className={`formItem ${
              theme === 'dark' ? 'formItem-dark' : 'formItem-light'
            }`}
            label="Откуда"
            style={{
              color: theme === 'dark' ? '#f5f5f5' : '#000000',
            }}
          >
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
          <FormItem
            className={`formItem ${
              theme === 'dark' ? 'formItem-dark' : 'formItem-light'
            }`}
            label="Куда"
          >
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
          className="div-arrows"
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
            <Image
              src={mainsearch}
              alt="Main-search"
              className={
                theme === 'dark' ? 'ant-image image-dark' : 'ant-image'
              }
            />
          </Row>
        )}

        <div
          style={{
            border:
              theme === 'dark'
                ? '0.9rem solid #464646'
                : '0.9rem solid #D3EFFF',
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
                  <FormItem
                    className={`formItem ${
                      theme === 'dark' ? 'formItem-dark' : 'formItem-light'
                    }`}
                    label="Количество пассажиров"
                  >
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
                        backgroundColor:
                          theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
                        color: theme === 'dark' ? '#d9d9d9' : '#000000',
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
                      <span
                        style={{
                          display: 'block',
                          color: theme === 'dark' ? '#7f7f7f' : '#000000',
                        }}
                      >
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
                    <FormItem
                      className={`formItem ${
                        theme === 'dark' ? 'formItem-dark' : 'formItem-light'
                      }`}
                      label="Дата"
                    >
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
                        className={
                          theme === 'dark'
                            ? 'date-picker-dark'
                            : 'date-picker-light'
                        }
                        style={{
                          padding: '5px 5px',
                          backgroundColor:
                            theme === 'dark' ? '#1a1a1a' : '#F5F5F5',
                          color: theme === 'dark' ? '#7f7f7f' : '#464646',
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
                        color: theme === 'dark' ? '#FFFFFF' : '#000000',
                        backgroundColor:
                          theme === 'dark' ? '#333333' : '#ffe5e5',
                        borderColor: theme === 'dark' ? '#555555' : '#DDDDDD',
                      }}
                    />
                  )}
                  <Checkbox
                    className={
                      theme === 'dark'
                        ? 'checkboxSearch dark-theme'
                        : 'checkboxSearch light-theme '
                    }
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
                      <Radio
                        value="roundTrip"
                        className={
                          theme === 'dark'
                            ? 'tripType-radioButton dark-theme'
                            : 'tripType-radioButton'
                        }
                      >
                        Туда и обратно
                      </Radio>
                      <Radio
                        value="oneWay"
                        className={
                          theme === 'dark'
                            ? 'tripType-radioButton dark-theme'
                            : 'tripType-radioButton'
                        }
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
