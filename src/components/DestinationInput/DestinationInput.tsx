import { Box, Flex, Input, Text, InputGroup } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { TDestQuery } from '@interfaces/search.interfaces';
import { IDestination } from '@interfaces/destination.interfaces';
import { useGetDestionationsQuery } from '@/store/services';
import { useTheme } from '@context/:ThemeProvider';

import { IDestProps } from './destination.interfaces';
const DestinationInput: React.FC<IDestProps> = (props: IDestProps) => {
  const { fromOrTo, onSetDestination, fromTo } = props;

  const [inputValue, setInputValue] = useState<string>('');

  const { data } = useGetDestionationsQuery();
  const destinationList = data?.content || [];

  const [destInputFocus, setDestInputFocus] = useState(false);

  const destInputInfo = fromOrTo === 'From' ? fromTo.from : fromTo.to;
  const { theme } = useTheme();
  const onchangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    destInputFocus && destInputRef.current?.focus();
  }, [destInputFocus]);

  const destInputRef = useRef<HTMLInputElement>(null);

  const destinationClickHandle = (item: IDestination) => {
    const destination: TDestQuery = {
      airportCode: item.airportCode,
      airportName: item.airportName,
      cityName: item.cityName,
      countryName: item.countryName,
      timezone: item.timezone,
    };
    onSetDestination(fromOrTo, destination);
    setDestInputFocus(false);
    setInputValue('');
  };

  return (
    <Box>
      <Box pos="relative">
        <Text fontSize={'0.6875rem'} fontWeight={'400'}>
          {fromOrTo}
        </Text>
        <InputGroup onClick={() => setDestInputFocus(true)}>
          <Input
            ref={destInputRef}
            value={inputValue}
            onChange={(event) => onchangeInput(event)}
            cursor="pointer"
            w="12.5rem"
            boxShadow={'0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'}
            color={theme === 'dark' ? 'white' : 'black'}
          />
          {!destInputFocus && Object.keys(destInputInfo).length > 0 && (
            <Box
              pos="absolute"
              bottom="0.125rem"
              left="0.75rem"
              cursor="pointer"
            >
              <Text fontSize="0.8125rem">
                {destInputInfo.cityName} ({destInputInfo.airportCode})
              </Text>
              <Text fontSize="0.6875rem">
                {destInputInfo.airportName}, {destInputInfo.countryName}
              </Text>
            </Box>
          )}
        </InputGroup>
      </Box>
      <Flex
        flexDir="column"
        borderRadius="0.375rem"
        pos="absolute"
        top="3.75rem"
        maxH="7.5rem"
        overflowY="scroll"
        boxShadow={'0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25)'}
      >
        {destInputFocus &&
          destinationList &&
          destinationList
            .filter((item) =>
              item.cityName?.toLowerCase()?.includes(inputValue.toLowerCase())
            )
            .map((item) => (
              <Box
                key={item.id}
                onClick={() => destinationClickHandle(item)}
                w="12.5rem"
                h="2.5rem"
                p="0 1rem"
                borderBottom="0.0625rem solid #CCC"
                bgColor="#FFF"
                zIndex="1"
                cursor="pointer"
              >
                <Text fontSize="0.8125rem">
                  {item.cityName} ({item.airportCode})
                </Text>
                <Text fontSize="0.6875rem">
                  {item.airportName}, {item.countryName}
                </Text>
              </Box>
            ))}
      </Flex>
    </Box>
  );
};

export default DestinationInput;
