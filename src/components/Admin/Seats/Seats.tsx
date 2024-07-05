import { TableContainer } from '@chakra-ui/react';

import { useSetCurrentPageInPagination } from '@/hooks';
import { SpinnerBlock } from '@/common';
import { useGetFlightSeatsQuery } from '@/store/services';

import { SeatTableHeader } from './SeatsTableHeader';
import { SeatsTable } from './SeatsTable';
import { useEffect } from 'react';

const PAGE_KEY = 'FLIGHTSSEATS_CURR_PAGE';

const Seats = () => {
  const [pageIndex, setPaginationData] = useSetCurrentPageInPagination(PAGE_KEY);

  useEffect(() => {
    setPaginationData(undefined)
  }, []);

  const { data: dataFlightSeats, isFetching } = useGetFlightSeatsQuery({
    page: pageIndex - 1,
  });

  if (isFetching || dataFlightSeats === undefined) {
    return <SpinnerBlock />;
  }

  return (
    <TableContainer py={45} px={9}>
      <SeatTableHeader />
      <SeatsTable
        data={dataFlightSeats.content}
        page={pageIndex}
        totalPages={dataFlightSeats.totalPages}
        setPaginationData={setPaginationData}
      />
    </TableContainer>
  );
};

export default Seats;
