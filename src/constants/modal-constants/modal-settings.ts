import { AxiosResponse } from 'axios';
import { UseMutationResult } from 'react-query';

import {
  useTicketsPost,
  useSeatPost,
  usePassengersPost,
  useFlightsPost,
  useDestinationPost,
  useAircraftPost,
  useTimezonePost,
  useBookingPost,
} from '@/hooks';
import { TSettings } from '@/common/ModalElements/ModalShape/modal-shape.interfaces';
import { ISeatForm } from '@/interfaces/seat.interfaces';
import { TTimeZoneForm } from '@/interfaces/time-zone.interfaces';
import {
  IDestinationPost,
  IDestination,
} from '@/interfaces/destination.interfaces';
import {
  IFlightPost,
  IFlightPostFormFields,
} from '@/interfaces/flights.interfaces';
import { ITicketsPost } from '@/interfaces/tickets.interface';

import { modalAirplanesFields } from './modal-airplanes-fields';
import { modalDestinationsFields } from './modal-destinations-fields';
import { modalFlightsFields } from './modal-flights-fields';
import { EModalButtonTexts, EModalNames } from './modal-names';
import { modalPassengersFields } from './modal-passengers-fields';
import { modalSeatFields } from './modal-seat-fields';
import { modalTicketsFields } from './modal-tickets-fields';
import { modalTimezonesFields } from './modal-timezones-fields';
import { modalBookingFields } from './modal-booking-fields';

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

export const mapEditAircraftFormData = (formData: ISeatForm) => {
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
  const { from, to, ...rest } = formData;
  const airportFrom = (JSON.parse(from || '') as IDestination).airportCode;
  const airportTo = (JSON.parse(to || '') as IDestination).airportCode;

  return {
    id: 0,
    airportFrom,
    airportTo,
    ...rest,
  } as IFlightPost;
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
    hook: useSeatPost as () => UseMutationResult<
      AxiosResponse<ISeatForm, unknown>,
      unknown,
      ISeatForm,
      unknown
    >,
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
];
