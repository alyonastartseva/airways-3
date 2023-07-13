import { describe, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from './Pagination';

describe('Pagination tests', () => {
  // создание тестовых данных
  const testData = [
    {
      id: 1,
      passport: {
        gender: 'male',
        serialNumberPassport: '00000000',
        passportIssuingDate: '21020202',
      },
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
    },
    {
      id: 2,
      passport: {
        gender: 'male',
        serialNumberPassport: '00000000',
        passportIssuingDate: '21020202',
      },
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
    },
    {
      id: 3,
      passport: {
        gender: 'male',
        serialNumberPassport: '00000000',
        passportIssuingDate: '21020202',
      },
      firstName: 'Иван',
      lastName: 'Иванов',
      middleName: 'Иванович',
    },
  ];
  const setPaginationData = vi.fn();
  const testIndex = 0;
  const testSize = 1;
  it('Pagination renders correctly', () => {
    // рендер компонента пагинации с тестовыми данными
    render(
      <Pagination
        data={testData}
        pageIndex={testIndex}
        // pageSize={testSize}
        setPaginationData={setPaginationData}
        totalPages={testData.length / testSize}
      />
    );
    //ищем данные на экране
    expect(screen.getByText(/<</i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    // 4-й страницы не должно быть, т.к. элементов 3
    expect(screen.queryByRole('button', { name: '4' })).not.toBeInTheDocument();
  });
  it('pagination button leads yo next page properly', async () => {
    // рендер компонента пагинации с тестовыми данными
    render(
      <Pagination
        data={testData}
        pageIndex={testIndex}
        // pageSize={testSize}
        setPaginationData={setPaginationData}
      />
    );
    // ищем кнопку и нажимаем на неё
    const nextButton = screen.getByRole('button', { name: '>' });
    await userEvent.click(nextButton);
    expect(setPaginationData).toBeCalledTimes(1);
    expect(setPaginationData).toBeCalledWith(1);
  });
  it('pagination button leads to previous page'),
    async () => {
      render(
        <Pagination
          data={testData}
          pageIndex={1}
          // pageSize={testSize}
          setPaginationData={setPaginationData}
        />
      );
      const previousButton = screen.getByRole('button', { name: '<' });
      await userEvent.click(previousButton);
      expect(setPaginationData).toBeCalledWith(0);
    };
  it('pagination button leads to first page'),
    async () => {
      render(
        <Pagination
          data={testData}
          pageIndex={2}
          // pageSize={testSize}
          setPaginationData={setPaginationData}
        />
      );
      const firstPageButton = screen.getByRole('button', { name: '<<' });
      await userEvent.click(firstPageButton);
      expect(setPaginationData).toBeCalledWith(0);
    };
  it('pagination button leads to last page'),
    async () => {
      render(
        <Pagination
          data={testData}
          pageIndex={0}
          // pageSize={testSize}
          setPaginationData={setPaginationData}
        />
      );
      const lastPageButton = screen.getByRole('button', { name: '>>' });
      await userEvent.click(lastPageButton);
      expect(setPaginationData).toBeCalledWith(2);
    };
});
