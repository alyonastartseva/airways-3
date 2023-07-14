import { FormTicketsPost, ITicketsPost } from '@/interfaces/tickets.interface';

export const mapTicketsFormData = (data: ITicketsPost): FormTicketsPost => {
  const { passengerId, flightId, flightSeatId, from, to } = data;

  if (passengerId) {
    const passenger = JSON.parse(passengerId);
    // eslint-disable-next-line no-param-reassign
    data = { ...data, passengerId: passenger.id };
  }
  if (from) {
    const fromCity = JSON.parse(from);
    // eslint-disable-next-line no-param-reassign
    data = { ...data, from: fromCity.cityName };
  }
  if (to) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const toCity = JSON.parse(to);
    // eslint-disable-next-line no-param-reassign
    data = { ...data, to: toCity.cityName };
  }
  if (flightId) {
    // eslint-disable-next-line no-param-reassign
    data = { ...data, flightId: Number(flightId) };
  }
  if (flightSeatId) {
    // eslint-disable-next-line no-param-reassign
    data = { ...data, flightSeatId: Number(flightSeatId) };
  }

  return data;
};
