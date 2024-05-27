import { ChangeEvent, useMemo, useState } from 'react';
import { Empty, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { debounce } from '@utils/debounce.utils';

import { IDebounceSelectProps } from './debounceSelect.interface';

const DebounceSelect = ({
  getOptions,
  debounceTimeout = 800,
  ...props
}: IDebounceSelectProps) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [options, setOptions] = useState<DefaultOptionType[]>([]);

  const setListData = async (query = { page, searchValue }) => {
    const { optionsPart, last } = await getOptions(query);
    setOptions([...options, ...optionsPart]);
    setIsLast(last);
    setIsFetching(false);
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      setIsFetching(true);
      setSearchValue(value);
      setPage(0);
      setOptions([]);

      getOptions({ page: 0, searchValue: value })
        .then(({ optionsPart, last }) => {
          setOptions(optionsPart);
          setIsLast(last);
        })
        .finally(() => {
          setIsFetching(false);
        });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, getOptions]);

  const onScroll = (e: React.UIEvent & ChangeEvent<HTMLDivElement>) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom && !isLast) {
      setPage(page + 1);
      setListData({ page: page + 1, searchValue });
    }
  };

  const onDropdownVisibleChange = () => {
    if (!options.length) {
      setIsFetching(true);
      setListData();
    }
  };

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      listItemHeight={41}
      listHeight={200}
      style={{ width: '100%' }}
      dropdownStyle={{ border: '1px solid #DEDEDE', fontStyle: 'italic' }}
      notFoundContent={
        isFetching ? (
          <Spin size="small" />
        ) : (
          <Empty style={{ margin: 0 }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      onDropdownVisibleChange={onDropdownVisibleChange}
      onPopupScroll={onScroll}
      onSearch={debounceFetcher}
      {...props}
      options={options}
    />
  );
};

export default DebounceSelect;
