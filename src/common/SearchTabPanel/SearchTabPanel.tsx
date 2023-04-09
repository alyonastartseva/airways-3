import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  TabPanel,
  Text,
  Divider,
  Center,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { formatISO, format, isPast, isToday, compareDesc } from 'date-fns';

import {
  ArrowDownIcon,
  ResetIcon,
  ArrowsIcon,
  CalendarIcon,
} from '@common/icons';
import { DestinationInput } from '@common/DestinationInput';
import searchService from '@/services/search.service';
import {
  IFromTo,
  TDestQuery,
  ISearchQuery,
} from '@interfaces/search.interfaces';

import CalendarPopover from '../CalendarPopover';

const SearchTabPanel: React.FC = () => {
  const today = formatISO(new Date());

  const initialSearchQuery: ISearchQuery = {
    departureDate: today,
    from: {},
    numberOfPassengers: 0,
    returnDate: today,
    to: {},
  };

  const [searchParams, setSearchParams] = useState(initialSearchQuery);

  const submitDisabled =
    !searchParams.departureDate ||
    Object.keys(searchParams.from).length < 1 ||
    searchParams.numberOfPassengers < 1 ||
    Object.keys(searchParams.to).length < 1;

  const { refetch } = useQuery(
    'search',
    () => searchService.getSearchResult(searchParams),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
      enabled: false,
      retry: false,
    }
  );

  const onSetDestination = (fromOrTo: string, destination: TDestQuery) => {
    if (fromOrTo === 'From') {
      setSearchParams({
        ...searchParams,
        from: destination,
      });
    } else if (fromOrTo === 'To') {
      setSearchParams({
        ...searchParams,
        to: destination,
      });
    }
  };

  const onChangeFromTo = (params: ISearchQuery) => {
    const newFrom = params.to;
    const newTo = params.from;
    setSearchParams({
      ...params,
      from: newFrom,
      to: newTo,
    });
  };

  const onSetTravelDates = (day: Date) => {
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

  const onChangePassengers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      numberOfPassengers: Number(event.target.value),
    });
  };

  const onReset = () => {
    setSearchParams({
      departureDate: '',
      from: {},
      numberOfPassengers: 0,
      returnDate: '',
      to: {},
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit>', searchParams);
    refetch();
  };

  const fromTo: IFromTo = {
    from: searchParams.from,
    to: searchParams.to,
  };

  return (
    <TabPanel p="0">
      <Box
        width="64.625rem"
        height="16.875rem"
        backgroundColor="#FFFFFF"
        blur="0.125rem"
        borderRadius="0rem 0.375rem 0.375rem 0.375rem"
        border={'solid 0.0625rem white'}
      >
        <form onSubmit={(event) => onSubmit(event)}>
          {/*///////////////////RADIO INPUTS//////////////////*/}
          <RadioGroup defaultValue="1" mt={'3.3125rem'} ml={'1.25rem'}>
            <Stack spacing={'2.1875rem'} direction="row">
              <Radio spacing={'0.0625rem'} value="1">
                <Text
                  ml={'0rem'}
                  fontSize={'0.6875rem'}
                  fontWeight={'400'}
                  color="rgba(0, 0, 0, 0.71)"
                >
                  {' '}
                  Round trip{' '}
                </Text>
              </Radio>
              <Radio spacing={'0.0625rem'} value="2">
                <Text
                  ml={'0rem'}
                  fontSize={'0.6875rem'}
                  fontWeight={'400'}
                  color="rgba(0, 0, 0, 0.71)"
                >
                  One way
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
          {/*///////////////////DESTINATION//////////////////*/}
          <Flex gap={'0.9375rem'} alignItems={'flex-end'}>
            <Flex
              ml={'1.3125rem'}
              mt={'1.6875rem'}
              gap={'0.75rem'}
              pos="relative"
            >
              <DestinationInput
                onSetDestination={onSetDestination}
                fromOrTo={'From'}
                fromTo={fromTo}
              />
              <Box
                mt="1.5rem"
                cursor="pointer"
                onClick={() => onChangeFromTo(searchParams)}
              >
                <ArrowsIcon />
              </Box>

              <DestinationInput
                onSetDestination={onSetDestination}
                fromOrTo={'To'}
                fromTo={fromTo}
              />
            </Flex>
            {/*///////////////////TRAVEL DATES//////////////////*/}

            <CalendarPopover
              select={(day: Date) => onSetTravelDates(day)}
              startDate={
                searchParams.departureDate
                  ? new Date(searchParams.departureDate)
                  : null
              }
              endDate={
                searchParams.returnDate
                  ? new Date(searchParams.returnDate)
                  : null
              }
            >
              <Text fontSize={'0.6875rem'} fontWeight={'400'}>
                Travel Dates
              </Text>
              <Flex
                boxShadow={'0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'}
                outline={'solid 1px rgb(227, 232, 239)'}
                outlineOffset="-1px"
                w={'19rem'}
                rounded="md"
                borderColor="grey.100"
              >
                <InputGroup>
                  <InputLeftElement>
                    <CalendarIcon />
                  </InputLeftElement>
                  <Input
                    fontSize="sm"
                    borderRightRadius="0"
                    border="none"
                    readOnly
                    cursor="pointer"
                    value={
                      searchParams.departureDate
                        ? format(
                            new Date(searchParams.departureDate),
                            'dd MMM, EEE'
                          )
                        : ''
                    }
                  />
                </InputGroup>
                <Center height="7" alignSelf="center" pl="2px" pr="2px">
                  <Divider
                    orientation="vertical"
                    border="1px"
                    borderColor="gray.300"
                  />
                </Center>
                <InputGroup>
                  <InputRightElement>
                    <CalendarIcon />
                  </InputRightElement>
                  <Input
                    borderLeftRadius="0"
                    border="none"
                    fontSize="sm"
                    readOnly
                    cursor="pointer"
                    value={
                      searchParams.returnDate
                        ? format(
                            new Date(searchParams.returnDate),
                            'dd MMM, EEE'
                          )
                        : ''
                    }
                  />
                </InputGroup>
              </Flex>
            </CalendarPopover>

            {/*///////////////////PASSENGERS//////////////////*/}
            <Box>
              <Text fontSize={'0.6875rem'} fontWeight={'400'}>
                Passengers
              </Text>
              <InputGroup w="12.5rem">
                <InputRightElement right="-0.375rem">
                  <ArrowDownIcon />
                </InputRightElement>
                <Input
                  boxShadow={'0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'}
                  value={
                    searchParams.numberOfPassengers > 0
                      ? String(searchParams.numberOfPassengers)
                      : ''
                  }
                  onChange={(event) => onChangePassengers(event)}
                />
              </InputGroup>
            </Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex flexDirection="column" alignItems={'flex-start'}>
              <Flex
                ml="1.375rem"
                mt="4.1875rem"
                align="center"
                _hover={{ cursor: 'pointer' }}
                onClick={onReset}
              >
                <Box fill="#0A66C2" ml="0.25rem" fontSize="0.6875rem">
                  <ResetIcon />
                </Box>
                <Text ml="0.25rem" fontSize="0.6875rem" color="#0A66C2">
                  Reset
                </Text>
              </Flex>
            </Flex>

            <Button
              disabled={submitDisabled}
              type="submit"
              p="0.5rem 0.8125rem 0.375rem"
              bgColor="#E32E22"
              mt="2.75rem"
              mr="2.8125rem"
              boxShadow="0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);"
            >
              <Text fontSize="0.875rem" color="#FFF">
                Search Flights
              </Text>
            </Button>
          </Flex>
        </form>
      </Box>
    </TabPanel>
  );
};

export default SearchTabPanel;
