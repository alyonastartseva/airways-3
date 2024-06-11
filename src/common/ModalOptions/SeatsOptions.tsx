import { useSelector } from 'react-redux';

import { useFlightSeatsQuery } from '@/hooks';
import { selectedId } from '@/store/slices/flightSeatsSlice';
import { IFSOne } from '@/interfaces/flightsSeats.interfaces';

export const SeatsOptions = () => {
  const ids = useSelector(selectedId);
  const { data } = useFlightSeatsQuery(0, 10, ids);
  // eslint-disable-next-line
  console.log(data);
  // const {content} = data;
  if (ids !== 0) {
    if (data) {
      return data.content.map((item: IFSOne) => {
        if (item.seat)
          return (
            <option key={item.id} value={item.id}>
              {item.seat.seatNumber}
            </option>
          );
      });
    }
  }
  return (
    <option key={66} value={66}>
      little problems
    </option>
  );
};
