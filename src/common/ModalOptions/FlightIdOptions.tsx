import { useFlightsQuery } from '@/hooks';

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
