import { useState } from 'react';
import {
  addDays,
  addMonths,
  compareDesc,
  format,
  getDaysInMonth,
  getDay,
  isPast,
  isToday,
  startOfMonth,
} from 'date-fns';
import {
  Box,
  Button,
  IconButton,
  Input,
  Flex,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';

import { IDates } from '@/interfaces/search-tickets.interfaces';
import monthNames from '@data/month.data.json';

export interface PropsCalendar {
  startDate: Date | null;
  endDate: Date | null;
  select: (day: Date) => void;
  calendarFormat: number;
}

const CalendarTickets = ({
  startDate,
  endDate,
  select,
  calendarFormat,
}: PropsCalendar) => {
  const [showDate, setShowDate] = useState(
    startDate ? startDate : new Date().setHours(0, 0, 0, 0)
  );
  const [selectedDates, setSelectedDates] = useState<IDates>({
    departureDate: startDate,
    returnDate: endDate,
  });

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const oldDate = isPast(new Date(showDate));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePopoverClose = () => {
    setShowDate(new Date().setHours(0, 0, 0, 0));
    onClose();
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleMonthChange = (change: 'previous' | 'next') => {
    setShowDate((prevShowDate) => {
      if (change === 'previous') {
        return addMonths(prevShowDate, -1);
      } else {
        return addMonths(prevShowDate, 1);
      }
    });
  };

  type CalendarData = Array<Array<Date | undefined>>;

  const getMonthDays = (date: Date) => {
    const result: CalendarData = [];
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDay(startOfMonth(date)) - 1;
    let day = 0;

    const totalRows = Math.ceil((daysInMonth + monthStartsOn) / 7);

    for (let i = 0; i < totalRows; i++) {
      result[i] = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < monthStartsOn) || day >= daysInMonth) {
          result[i][j] = undefined;
        } else {
          result[i][j] = addDays(startOfMonth(date), day);
          day += 1;
        }
      }
    }
    return result;
  };

  const createCalendarsAmount = () => {
    const arrayOfCalendars: Array<CalendarData> = [];
    for (let i = 0; i < calendarFormat; i++) {
      arrayOfCalendars.push(getMonthDays(addMonths(showDate, i)));
    }
    return arrayOfCalendars;
  };

  const calendar = createCalendarsAmount();

  const getColorOnHover = (dates: IDates, day: Date) => {
    if (isPast(day) && !isToday(day)) {
      return '#FFFFFF';
    }
    if (
      (dates.departureDate &&
        !compareDesc(dates.departureDate.setHours(0, 0, 0, 0), day)) ||
      (dates.returnDate &&
        !compareDesc(dates.returnDate.setHours(0, 0, 0, 0), day))
    ) {
      return '#006FFF';
    } else return '#E2E8F0';
  };

  const getTextColor = (dates: IDates, day: Date) => {
    if (isPast(day) && !isToday(day)) {
      return '#868484';
    }

    if (
      (dates.departureDate &&
        !compareDesc(dates.departureDate.setHours(0, 0, 0, 0), day)) ||
      (dates.returnDate &&
        !compareDesc(dates.returnDate.setHours(0, 0, 0, 0), day))
    ) {
      return '#FFFFFF';
    } else return '#000000';
  };

  const getCellBgColor = (dates: IDates, day: Date) => {
    if (
      (dates.departureDate &&
        !compareDesc(dates.departureDate.setHours(0, 0, 0, 0), day)) ||
      (dates.returnDate &&
        !compareDesc(dates.returnDate.setHours(0, 0, 0, 0), day))
    ) {
      return '#006FFF';
    }
    if (dates.departureDate && dates.returnDate) {
      if (
        compareDesc(dates.departureDate, day) === 1 &&
        compareDesc(day, dates.returnDate) === 1
      ) {
        return '#E2E8F0';
      } else return '#FFFFFF';
    }
  };

  let key = 0;

  const handleSelect = (day: Date) => {
    if (isPast(day) && !isToday(day)) {
      return;
    }
    if (!selectedDates.departureDate) {
      setSelectedDates({
        departureDate: day,
        returnDate: null,
      });
    } else if (!selectedDates.returnDate) {
      if (day < selectedDates.departureDate) {
        setSelectedDates({
          departureDate: day,
          returnDate: selectedDates.departureDate,
        });
      } else {
        setSelectedDates({
          departureDate: selectedDates.departureDate,
          returnDate: day,
        });
      }
    } else {
      setSelectedDates({
        departureDate: day,
        returnDate: null,
      });
    }
    select(day);
  };

  const formatSelectedDates = () => {
    if (selectedDates.departureDate && selectedDates.returnDate) {
      return `${format(selectedDates.departureDate, 'dd.MM.yyyy')} - ${format(
        selectedDates.returnDate,
        'dd.MM.yyyy'
      )}`;
    } else if (selectedDates.departureDate) {
      return format(selectedDates.departureDate, 'dd.MM.yyyy');
    } else {
      return '';
    }
  };

  return (
    <Box>
      <Popover isOpen={isOpen} onClose={handlePopoverClose}>
        <PopoverTrigger>
          <Input
            type="text"
            placeholder="Дата поездки"
            value={formatSelectedDates()}
            readOnly
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent
          p="25px 53px 23px 53px"
          w="53rem"
          h="410px"
          position="relative"
          data-testid="popover-content"
        >
          <PopoverHeader p={0} border="none" mb={3}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading fontSize={15} size="sm" color="#0A66C2">
                Выберите даты поездки
              </Heading>
              <IconButton
                icon={<CloseIcon />}
                variant="ghost"
                size="sm"
                aria-label="Закрыть"
                onClick={handlePopoverClose}
              />
            </Flex>
          </PopoverHeader>
          <PopoverBody p={0} height="100%">
            <Flex flexDirection="column" mb={0}>
              <Flex justifyContent="space-between">
                <IconButton
                  icon={<ChevronLeftIcon />}
                  variant="ghost"
                  isDisabled={oldDate}
                  onClick={() => handleMonthChange('previous')}
                  aria-label="Предыдущий месяц"
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  variant="ghost"
                  onClick={() => handleMonthChange('next')}
                  aria-label="Следующий месяц"
                />
              </Flex>
              <Flex p={1} mt="-2.75rem">
                {calendar.map((table, ind) => (
                  <Box p={3} pb={0} key={(key += 1)}>
                    <Heading
                      data-testid="heading"
                      fontSize={15}
                      size="md"
                      textAlign="center"
                      pb="5"
                    >
                      {capitalize(
                        `${
                          monthNames[
                            addMonths(new Date(showDate), ind).getMonth()
                          ]
                        } ${addMonths(new Date(showDate), ind).getFullYear()}`
                      )}
                    </Heading>
                    <TableContainer>
                      <Table size="sm" variant="simple">
                        <Thead>
                          <Tr>
                            {weekDays.map((name) => (
                              <Th
                                color={
                                  name === 'Сб' || name === 'Вс'
                                    ? '#0A66C2'
                                    : '#000000'
                                }
                                border="none"
                                key={name}
                              >
                                {name}
                              </Th>
                            ))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {table.map((week, index) => (
                            <Tr key={index}>
                              {week.map((day, i) =>
                                day ? (
                                  <Td
                                    data-testid="table-td"
                                    color={getTextColor(selectedDates, day)}
                                    cursor={
                                      isPast(day) && !isToday(day)
                                        ? 'default'
                                        : 'pointer'
                                    }
                                    _hover={{
                                      background: getColorOnHover(
                                        selectedDates,
                                        day
                                      ),
                                    }}
                                    onClick={() => handleSelect(day)}
                                    backgroundColor={getCellBgColor(
                                      selectedDates,
                                      day
                                    )}
                                    border="none"
                                    textAlign="center"
                                    key={i}
                                  >
                                    {day.getDate()}
                                  </Td>
                                ) : (
                                  <Td border="none" key={i} />
                                )
                              )}
                            </Tr>
                          ))}
                        </Tbody>
                        <Tfoot></Tfoot>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </PopoverBody>
          <PopoverFooter
            textAlign="right"
            border="none"
            position="absolute"
            bottom={3}
            right={10}
            left={0}
          >
            <Button
              bg="#006FFF"
              color="#FFFFFF"
              size="sm"
              onClick={handlePopoverClose}
            >
              Выбрать
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default CalendarTickets;
