import dayjs from 'dayjs';

import { TTimeZoneForm } from '@/interfaces/time-zone.interfaces';
import {
  IDestinationPost,
  IDestination,
  IFlightPost,
  IFlightPostFormFields,
  ITicketsPost,
  ISeatForm,
} from '@/interfaces';
import {
  EModalButtonTexts,
  EModalNames,
  modalAirplanesFields,
  modalDestinationsFields,
  modalFlightsFields,
  modalPassengersFields,
  modalFlightSeatFields,
  modalSeatFields,
  modalTicketsFields,
  modalTimezonesFields,
  modalBookingFields,
} from '@/constants';
import { TSettings } from '@/common/ModalShape/modal-shape.interfaces';
import {
  useDestinationPost,
  useAircraftPost,
  useFlightsPost,
  usePassengersPost,
  useSeatPost,
  useTicketsPost,
  useTimezonePost,
  useBookingPost,
  useFlightSeatPost,
} from '@/hooks';

interface FormTicketsPost {
  ticketNumber?: string;
  passengerId?: string;
  firstName?: string;
  lastName?: string;
  flightId?: number;
  code?: string;
  from?: string;
  to?: string;
  departureDateTime?: string;
  arrivalDateTime?: string;
  flightSeatId?: number;
  seatNumber?: string;
}

const mapEditAircraftFormData = (formData: ISeatForm) => {
  const aircraftId = Number(formData.aircraftId);
  return { aircraftId, ...formData } as ISeatForm;
};

const mapTimezonesFormData = (data: TTimeZoneForm): TTimeZoneForm => {
  const { gmt, gmtWinter } = data;
  const timezone = { ...data };

  if (gmt) {
    timezone.gmt = `GMT+${gmt}`;
  }
  if (gmtWinter) {
    timezone.gmtWinter = `GMT+${gmtWinter}`;
  }

  return timezone;
};

const mapDestinationFormData = (data: IDestinationPost): IDestinationPost => {
  return {
    ...data,
    airportCode: data.airportCode?.toUpperCase(),
    timezone: `GMT${data.timezone}`,
  };
};

const mapFlightFormToRequestData = (
  formData: IFlightPostFormFields
): IFlightPost => {
  const { from, to, departureDateTime, arrivalDateTime, ...rest } = formData;

  const airportFrom = (JSON.parse(from || '') as IDestination).airportCode;
  const airportTo = (JSON.parse(to || '') as IDestination).airportCode;

  return {
    airportFrom,
    airportTo,
    departureDateTime: dayjs(departureDateTime).format('YYYY-MM-DDTHH:mm:ss'),
    arrivalDateTime: dayjs(arrivalDateTime).format('YYYY-MM-DDTHH:mm:ss'),
    ...rest,
  };
};

const mapTicketsFormData = (data: ITicketsPost): FormTicketsPost => {
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

export const modalSettings: TSettings = [
  {
    formName: EModalNames.DESTINATIONS,
    fields: modalDestinationsFields,
    hook: useDestinationPost,
    name: EModalButtonTexts.DESTINATIONS,
    mapFieldValuesToRequestData: mapDestinationFormData,
  },
  {
    formName: EModalNames.AIRPLANES,
    fields: modalAirplanesFields,
    hook: useAircraftPost,
    name: EModalButtonTexts.AIRPLANES,
  },
  {
    formName: EModalNames.FLIGHTS,
    fields: modalFlightsFields,
    hook: useFlightsPost,
    name: EModalButtonTexts.FLIGHTS,
    mapFieldValuesToRequestData: mapFlightFormToRequestData,
  },
  {
    formName: EModalNames.PASSENGERS,
    fields: modalPassengersFields,
    hook: usePassengersPost,
    name: EModalButtonTexts.PASSENGERS,
  },
  {
    formName: EModalNames.SEAT,
    fields: modalSeatFields,
    hook: useSeatPost,
    name: EModalButtonTexts.SEAT,
    mapFieldValuesToRequestData: mapEditAircraftFormData,
  },
  {
    formName: EModalNames.TICKETS,
    fields: modalTicketsFields,
    hook: useTicketsPost,
    name: EModalButtonTexts.TICKETS,
    mapFieldValuesToRequestData: mapTicketsFormData,
  },
  {
    formName: EModalNames.TIME_ZONES,
    fields: modalTimezonesFields,
    hook: useTimezonePost,
    name: EModalButtonTexts.TIME_ZONES,
    mapFieldValuesToRequestData: mapTimezonesFormData,
  },
  {
    formName: EModalNames.BOOKING,
    fields: modalBookingFields,
    hook: useBookingPost,
    name: EModalButtonTexts.BOOKING,
  },
  {
    formName: EModalNames.FLIGHTS_SEATS,
    fields: modalFlightSeatFields,
    hook: useFlightSeatPost,
    name: EModalButtonTexts.FLIGHTS_SEATS,
  },
];
