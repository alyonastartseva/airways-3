import { Input, Text } from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';

import { FlexCell, InfiniteScrollSelector } from '@/common';
import { IDestinationList } from '@/interfaces';
import { debounce } from '@utils/debounce.utils';
import { IDestinationGet } from '@services/destinations/destinations.interfaces';
import {
  getDestinationsByPage,
  getDestinationsByParams,
} from '@services/destinations/destinations.service';

import { IInputSelector } from './destinationsInputSelector.interface';
import { normalizeDestinations } from './destinationsInputSelector.utils';

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
  const debouncedGetDestinationsByCityName = useCallback(
    debounce(getDestinationsListByCityName, 500),
    []
  );
  const [value, setInputValue] = useState(initialValue);
  const [previousRequestType, setPreviousRequestType] = useState('page');
  const [destinationsList, setDestinationsList] = useState<IDestinationList[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const [isHasMore, setHasMore] = useState(true);

  useEffect(() => {
    initialValue &&
      setDestinationsList([
        {
          name: '',
          code: String(initialValue),
        },
      ]);
  }, []);

  const addDestinations = (data: IDestinationList[]) => {
    setDestinationsList([...destinationsList, ...data]);
  };

  async function getDestinationsListByCityName(query: string) {
    if (!query.length) {
      getDestinationsListByPage(0);
      return;
    }
    setLoading(true);
    const requestPage = previousRequestType === 'city' ? page : 0;
    const destinations = await getDestinationsByParams({
      cityName: query,
      page: requestPage,
    });
    setPreparedData(destinations, 'city');
  }

  async function getDestinationsListByPage(reqPage = page) {
    if ((isHasMore && !isLoading) || reqPage === 0) {
      setLoading(true);
      const destinations = await getDestinationsByPage(reqPage);
      setPreparedData(destinations, 'page');
    }
  }

  const setPreparedData = (data: IDestinationGet, type: string) => {
    const { airports, last, number } = normalizeDestinations(data);
    if (airports) {
      if (type === 'city') {
        if (previousRequestType === 'page') setDestinationsList(airports);
        else addDestinations(airports);
      } else if (type === 'page') {
        if (!destinationsList || previousRequestType === 'city')
          setDestinationsList(airports);
        else addDestinations(airports);
      }
    } else setDestinationsList([]);
    if (!last) setPage(number + 1);
    setLoading(false);
    setHasMore(!last);
    setPreviousRequestType(type);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    changeValue(newValue);
    debouncedGetDestinationsByCityName(newValue);
  };

  const changeValue = (inputValue: string) => {
    setValue && setValue(inputValue);
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
          {
            <Text as="i" fontSize={14}>
              {label.value}
            </Text>
          }
        </label>
      )}
      <Input
        type="text"
        fontSize={'100%'}
        value={String(value)}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={onBlur}
        onFocus={() => setFocus(true)}
        placeholder={placeholder}
        style={{
          position: 'relative',
        }}
        {...(isFocused && {
          style: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomColor: 'transparent',
          },
        })}
        border={
          inputType === 'editable' ? '1px solid #242424' : '1px solid #e5e7eb'
        }
        backgroundColor={inputType === 'modal' ? '#F9F9F9' : 'inherit'}
        borderRadius={inputType === 'modal' ? 'none' : '0.375rem'}
        _active={{
          borderColor: '#398AEA',
        }}
        _hover={
          inputType === 'editable'
            ? {
                borderColor: '#398AEA',
              }
            : undefined
        }
        autoComplete="off"
      />
      {isFocused && (
        <InfiniteScrollSelector
          hasMore={isHasMore}
          isLoading={isLoading}
          next={() =>
            previousRequestType === 'page'
              ? getDestinationsListByPage()
              : getDestinationsListByCityName(String(value))
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
