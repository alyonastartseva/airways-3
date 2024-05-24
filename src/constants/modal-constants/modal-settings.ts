import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';

import { TSettings } from '@common/ModalElements/ModalShape/modal-shape.interfaces';
import {
  IDestinationPost,
  IDestination,
  IFlightPost,
  IFlightPostFormFields,
  TTimeZoneForm,
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
  modalSeatFields,
  modalTicketsFields,
  modalTimezonesFields,
  modalBookingFields,
} from '@/constants';
import // useDestinationPost,
// useAircraftPost,
// useFlightsPost,
// usePassengersPost,
// useSeatPost,
// useTicketsPost,
// useTimezonePost,
// useBookingPost,
'@/hooks';
import { useDestinationPost } from '@hooks/destination/useDestinationPost';
import { useAircraftPost } from '@hooks/aircraft/useAircraftPost';
import { useFlightsPost } from '@hooks/flight/useFlightsPost';
import { usePassengersPost } from '@hooks/passenger/usePassengersPost';
import { useSeatPost } from '@hooks/seat/useSeatPost';
import { useTicketsPost } from '@hooks/ticket/useTicketPost';
import { useTimezonePost } from '@hooks/timezone/useTimezonePost';
import { useBookingPost } from '@hooks/booking/useBookingPost'; //  Cannot access before initialization at "modal-settings"
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
