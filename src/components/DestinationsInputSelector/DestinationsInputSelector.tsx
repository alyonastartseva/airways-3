import { Input, Typography } from 'antd';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useColorMode } from '@chakra-ui/react';

import { debounce } from '@/utils/debounce.utils';
import {
  IDestinationGet,
  IDestinationList,
} from '@/interfaces/destination.interfaces';
import { useTheme } from '@context/:ThemeProvider';
import { useLazyGetDestionationsQuery } from '@/store/services';
import { InfiniteScrollSelector, FlexCell } from '@/common';

import { IInputSelector } from './destinationsInputSelector.interface';
import { normalizeDestinations } from './destinationsInputSelector.utils';

const { Text } = Typography;

const InputSelector = ({
  value: initialValue,
  setValue,
  index,
  id,
  updateData,
  editableRowIndex,
  placeholder = 'Value',
  type: inputType = 'default',
  label,
}: IInputSelector) => {
  const { colorMode } = useColorMode();
  const { theme } = useTheme();

  const [value, setInputValue] = useState(initialValue);
  const [previousRequestType, setPreviousRequestType] = useState('page');
  const [destinationsList, setDestinationsList] = useState<IDestinationList[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [isFocused, setFocus] = useState(false);
  const [isHasMore, setHasMore] = useState(true);
  const [getDestinations, { data: destinationsData, isLoading }] =
    useLazyGetDestionationsQuery();
  const requestType = useRef('');

  const debouncedGetDestinationsByCityName = useCallback(
    debounce((query: string) => {
      if (!query.length) {
        getDestinationsListByPage(0);
        return;
      }

      const requestPage = previousRequestType === 'city' ? page : 0;

      getDestinations({
        cityName: query,
        page: requestPage,
      });

      requestType.current = 'city';
    }, 500),
    [previousRequestType, page, getDestinations]
  );

  useEffect(() => {
    if (initialValue) {
      setDestinationsList([
        {
          name: '',
          code: String(initialValue),
        },
      ]);
    }
  }, [initialValue]);

  useEffect(() => {
    if (destinationsData) setPreparedData(destinationsData);
  }, [destinationsData]);

  const addDestinations = (data: IDestinationList[]) => {
    setDestinationsList([...destinationsList, ...data]);
  };

  const getDestinationsListByPage = async (reqPage = page) => {
    if ((isHasMore && !isLoading) || reqPage === 0) {
      getDestinations({ page: reqPage });
      requestType.current = 'page';
    }
  };

  const setPreparedData = useCallback(
    (data: IDestinationGet) => {
      const { airports, last, number } = normalizeDestinations(data);
      if (airports) {
        if (requestType.current === 'city') {
          if (previousRequestType === 'page') setDestinationsList(airports);
          else addDestinations(airports);
        } else if (requestType.current === 'page') {
          if (!destinationsList || previousRequestType === 'city')
            setDestinationsList(airports);
          else addDestinations(airports);
        }
      } else setDestinationsList([]);
      if (!last) setPage(number + 1);
      setHasMore(!last);
      setPreviousRequestType(requestType.current);
    },
    [previousRequestType, destinationsList]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    changeValue(newValue);
    debouncedGetDestinationsByCityName(newValue);
  };

  const changeValue = (inputValue: string) => {
    if (setValue) setValue(inputValue);
    setInputValue(inputValue);
  };

  const handleClick = (e: React.BaseSyntheticEvent) => {
    if (!isLoading && !destinationsList.length && !e.target.value.length)
      getDestinationsListByPage();
  };

  const onBlur = () => {
    setFocus(false);
    if (inputType === 'editable' && updateData && id && value)
      updateData(id, value.toString());
  };

  return inputType !== 'editable' ||
    (inputType === 'editable' && index === editableRowIndex) ? (
    <div
      style={{
        position: 'relative',
      }}
      {...(label && {
        style: { marginBottom: '1.25rem', position: 'relative' },
      })}
    >
      {label && (
        <label
          htmlFor={label.name}
          style={{ marginBottom: '0.5rem', display: 'block' }}
        >
          <Text italic style={{ fontSize: 14 }}>
            {label.value}
          </Text>
        </label>
      )}
      <Input
        type="text"
        value={String(value)}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={onBlur}
        onFocus={() => setFocus(true)}
        placeholder={placeholder}
        style={{
          position: 'relative',
          backgroundColor: colorMode === 'dark' ? '#333' : 'inherit',
          color: theme === 'dark' ? '#d9d9d9' : '#333333',
          ...(isFocused && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomColor: 'transparent',
          }),
        }}
      />
      {isFocused && (
        <InfiniteScrollSelector
          hasMore={isHasMore}
          isLoading={isLoading}
          next={() =>
            previousRequestType === 'page'
              ? getDestinationsListByPage()
              : debouncedGetDestinationsByCityName(String(value))
          }
          onClick={changeValue}
          targetList={destinationsList}
        />
      )}
    </div>
  ) : (
    <FlexCell padding={16} value={String(value)} />
  );
};

export default InputSelector;
