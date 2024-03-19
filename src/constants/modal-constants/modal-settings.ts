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
} from '@/hooks';
import { TSettings } from '@/common/ModalElements/ModalShape/modal-shape.interfaces';
import { ISeatForm } from '@/interfaces/seat.interfaces';
import { mapFlightFormToRequestData } from '@/utils/form-flights.utils';
import { mapTicketsFormData } from '@/utils/form-tickets.utils';
import { mapEditAircraftFormData } from '@/utils/edit-aircraft.utils';
import { mapTimezonesFormData } from '@/utils/form-timezone.utils';

import { modalAirplanesFields } from './modal-airplanes-fields';
import { modalDestinationsFields } from './modal-destinations-fields';
import { modalFlightsFields } from './modal-flights-fields';
import { EModalButtonTexts, EModalNames } from './modal-names';
import { modalPassengersFields } from './modal-passengers-fields';
import { modalSeatFields } from './modal-seat-fields';
import { modalTicketsFields } from './modal-tickets-fields';
import { modalTimezonesFields } from './modal-timezones-fields';

export const modalSettings: TSettings = [
  {
    formName: EModalNames.DESTINATIONS,
    fields: modalDestinationsFields,
    hook: useDestinationPost,
    name: EModalButtonTexts.DESTINATIONS,
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
];
