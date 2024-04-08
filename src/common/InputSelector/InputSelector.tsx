import { Input } from '@chakra-ui/react';
import { useState, useCallback } from 'react';

import { debounce } from '@/utils/debounce.utils';
import { IDestinationGet } from '@/services/destinations/destinations.interfaces';
import { IDestinationList } from '@/interfaces/destination.interfaces';
import {
  getDestinationsByPage,
  getDestinationsByParams,
} from '@/services/destinations/destinations.service';

import { InfiniteScrollSelector } from '../InfiniteScrollSelector';

import { IInputSelector } from './inputSelector.interface';
import { normalizeDestinations } from './inputSelector.utils';

const InputSelector = ({
  value,
  setValue,
  placeholder = 'Value',
}: IInputSelector) => {
  const debouncedGetDestinationsByCityName = useCallback(
    debounce(getDestinationsListByCityName, 500),
    []
  );
  const [previousRequestType, setPreviousRequestType] = useState('page');
  const [destinationsList, setDestinationsList] = useState<IDestinationList[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isFocused, setFocus] = useState(false);
  const [isHasMore, setHasMore] = useState(true);

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
    setValue(newValue);
    debouncedGetDestinationsByCityName(newValue);
  };

  const handleClick = (e: React.BaseSyntheticEvent) => {
    if (!isLoading && !destinationsList.length && !e.target.value.length)
      getDestinationsListByPage();
  };

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={() => setFocus(false)}
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
        autoComplete="off"
      />
      {isFocused && (
        <InfiniteScrollSelector
          hasMore={isHasMore}
          isLoading={isLoading}
          next={() =>
            previousRequestType === 'page'
              ? getDestinationsListByPage()
              : getDestinationsListByCityName(value)
          }
          onClick={setValue}
          targetList={destinationsList}
        />
      )}
    </>
  );
};

export default InputSelector;
