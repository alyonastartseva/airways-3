import {
  Pagination as PaginationAntd,
  PaginationProps as PaginationPropsAntd,
  ConfigProvider,
} from 'antd';

import { ArrowRightIcon, ArrowLeftIcon } from '@common/icons';
import { ITEMS_PER_PAGE } from '@/constants';
import { useTheme } from '@context/:ThemeProvider';

import { IPagination } from './Pagination.interfaces';

// Причина не использования module: пагинация от antd по другому не будет дружить с нашей стилизацией
import './Pagination.scss';

const Pagination = (props: IPagination) => {
  const { setPaginationData, pageIndex, totalPages = 1 } = props;
  const { theme } = useTheme();
  const itemRender: PaginationPropsAntd['itemRender'] = (
    _,
    type,
    originalElement
  ) => {
    if (type === 'prev') {
      return (
        // Документация antd требует теги <a>
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>
          <ArrowLeftIcon color="currentColor" />
          Предыдущая страница
        </a>
      );
    }
    if (type === 'next') {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>
          Следущая страница
          <ArrowRightIcon color="currentColor" />
        </a>
      );
    }
    return originalElement;
  };

  const paginationTotal = totalPages * ITEMS_PER_PAGE;

  if (totalPages === 1) return null;

  return (
    <ConfigProvider theme={{ components: { Pagination: { itemSize: 40 } } }}>
      <PaginationAntd
        className={`paginationAntd ${theme}`}
        showSizeChanger={false}
        total={paginationTotal}
        defaultCurrent={pageIndex}
        onChange={setPaginationData}
        itemRender={itemRender}
      />
    </ConfigProvider>
  );
};

export default Pagination;
