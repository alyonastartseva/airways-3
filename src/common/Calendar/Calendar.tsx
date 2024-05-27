import { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import {
  getDay,
  startOfMonth,
  getDaysInMonth,
  addDays,
  format,
  compareDesc,
  addMonths,
  getMonth,
  isPast,
  isToday,
} from 'date-fns';

import { ITravelDates } from './calendar.interfaces';

export interface PropsCalendar {
  startDate: Date | null;
  endDate: Date | null;
  select: (day: Date) => void;
  calendarFormat: number;
}

export const calendarHeadingFormat = 'yyyy MMMM';

const Calendar = ({
  startDate,
  endDate,
  select,
  calendarFormat,
}: PropsCalendar) => {
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const selectedDates = {
    departureDate: startDate,
    returnDate: endDate,
  };

  const [shownDate, setShownDate] = useState(
    startDate ? startDate : new Date().setHours(0, 0, 0, 0)
  );

  const oldDate = getMonth(new Date()) >= getMonth(shownDate) ? true : false;

  const handleOnChange = (value: 'add' | 'delete') => {
    setShownDate((prev) => {
      if (value === 'add') {
        return addMonths(prev, 1);
      } else {
        return addMonths(prev, -1);
      }
    });
  };

  type CalendarData = Array<Array<Date | undefined>>;

  const getMonthDays = (date: Date) => {
    const result: CalendarData = [];
    const daysInMonth = getDaysInMonth(date) - 1;
    const monthStartsOn = getDay(startOfMonth(date)) - 1;
    let day = 0;

    for (let i = 0; i < (daysInMonth + monthStartsOn) / 7; i++) {
      result[i] = [];

      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
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
      arrayOfCalendars.push(getMonthDays(addMonths(shownDate, i)));
    }
    return arrayOfCalendars;
  };

  const calendar = createCalendarsAmount();

  //styles

  const setColorOnHover = (dates: ITravelDates, day: Date) => {
    if (isPast(day) && !isToday(day)) {
      return 'white';
    }
    if (
      (dates.departureDate &&
        !compareDesc(dates.departureDate.setHours(0, 0, 0, 0), day)) ||
      (dates.returnDate &&
        !compareDesc(dates.returnDate.setHours(0, 0, 0, 0), day))
    ) {
      return '#E32E22';
    } else return '#E2E8F0';
  };

  const setTextColor = (dates: ITravelDates, day: Date) => {
    if (isPast(day) && !isToday(day)) {
      return 'gray.500';
    }

    if (
      (dates.departureDate &&
        !compareDesc(dates.departureDate.setHours(0, 0, 0, 0), day)) ||
      (dates.returnDate &&
        !compareDesc(dates.returnDate.setHours(0, 0, 0, 0), day))
    ) {
      return 'white';
    } else return 'black.800';
  };

  const setCellBgColor = (dates: ITravelDates, day: Date) => {
    if (
      (dates.departureDate &&
        !compareDesc(dates.departureDate.setHours(0, 0, 0, 0), day)) ||
      (dates.returnDate &&
        !compareDesc(dates.returnDate.setHours(0, 0, 0, 0), day))
    ) {
      return '#E32E22';
    }
    if (dates.departureDate && dates.returnDate) {
      if (
        compareDesc(dates.departureDate, day) === 1 &&
        compareDesc(day, dates.returnDate) === 1
      ) {
        return '#E2E8F0';
      } else return 'white';
    }
  };
  let key = 0;
  return (
    <Box>
      <Flex mb="1" align="center" justify="space-between">
        <Button
          id="prev-date"
          bgColor="transparent"
          isDisabled={oldDate}
          size="md"
          onClick={() => handleOnChange('delete')}
        >
          {'<'}
        </Button>

        <Button
          id="next-date"
          bgColor="transparent"
          size="md"
          onClick={() => handleOnChange('add')}
        >
          {'>'}
        </Button>
      </Flex>

      <Flex p={1} mt="-12">
        {calendar.map((table, ind) => (
          <Box p={3} pb={0} key={(key += 1)}>
            <Heading
              data-testid="heading"
              as="h3"
              fontSize="md"
              textAlign="center"
              pb="5"
              fontWeight="medium"
            >
              {format(
                addMonths(new Date(shownDate), ind),
                calendarHeadingFormat
              )}
            </Heading>
            <TableContainer>
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    {weekDays.map((name) => (
                      <Th
                        color={
                          name === 'Su' || name === 'Sa'
                            ? 'rgb(110,150,210)'
                            : 'blackAlpha.800'
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
                            color={setTextColor(selectedDates, day)}
                            cursor={
                              isPast(day) && !isToday(day)
                                ? 'default'
                                : 'pointer'
                            }
                            _hover={{
                              background: setColorOnHover(selectedDates, day),
                            }}
                            onClick={() => select(day)}
                            backgroundColor={setCellBgColor(selectedDates, day)}
                            border="none"
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
    </Box>
  );
};

export default Calendar;
