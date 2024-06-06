import { useFlightSeatsQuery } from '@/hooks';

import { useStore } from './store/store';

export const SeatsOptions = () => {
  const { id: ids } = useStore();
  const { data } = useFlightSeatsQuery(0, 10, ids);
  if (ids !== 0) {
    if (data) {
      return data.content.map(({ id, seat }) => {
        if (seat)
          return (
            <option key={id} value={id}>
              {seat.seatNumber}
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
