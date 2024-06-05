import { seatCategory } from '@/constants';
import { useFlightSeatsQuery, useFlightsQuery } from '@/hooks';

export const FlightIdOptions = () => {
  const { data } = useFlightsQuery();
  if (data) {
    return data.content.map(({ id, aircraftId }) => {
      return (
        <option key={id} value={id}>
          aircraftId{aircraftId} flight: {id}
        </option>
      );
    });
  }
  return (
    <option key={66} value={66}>
      little problems
    </option>
  );
};

export const SeatsOptions = (props: { id: number }) => {
  const { data } = useFlightSeatsQuery(0, 10, props.id);
  if (data) {
    return data.content.map(({ id, seat }) => {
      return (
        <option key={id} value={id}>
          {seat!.seatNumber}
        </option>
      );
    });
  }
  return (
    <option key={66} value={66}>
      little problems
    </option>
  );
};

export const SeatCategoryOptions = () =>
  seatCategory.map((el) => (
    <option key={el.eng} value={el.eng}>
      {el.ru}
    </option>
  ));
// litle problems заглушки на случай ошибки
