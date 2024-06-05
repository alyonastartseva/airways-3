import { TFormAirplanesValues } from '@/components/FormAirplanes/form-airplanes.interfaces';
import { postAircraft } from '@services/aircraft/aircrafts.service';
import { postSeat } from '@services/seat/seat.service';

const postAircraftWithSeats = async (data: TFormAirplanesValues) => {
  const { seats, ...rest } = data;
  const responseAircraft = await postAircraft(rest);

  if (seats.length > 0) {
    const aircraftId = responseAircraft.data.id;

    for (const seat of seats) {
      if (aircraftId) {
        const seatWithID = { aircraftId, ...seat };
        await postSeat(seatWithID);
      }
    }
  }
};

export { postAircraftWithSeats };
