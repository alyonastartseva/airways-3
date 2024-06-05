import { useFlightSeatsQuery } from '@/hooks';

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
