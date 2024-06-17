import { HeaderTable } from '@/common';
import { EModalNames } from '@/constants';
import { IFlightSeatsPost } from '@/interfaces/flightsSeats.interfaces';

export const SeatTableHeader = () => {
  return (
    <HeaderTable<IFlightSeatsPost>
      heading="Посадочные Места"
      formName={EModalNames.FLIGHTS_SEATS}
    />
  );
};
