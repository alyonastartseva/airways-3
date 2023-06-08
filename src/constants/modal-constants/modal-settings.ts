import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';

import { useAircraftPost } from '@/hooks/useAircraftPost';
import { useDestinationPost } from '@/hooks/useDestinationPost';
import { useFlightsPost } from '@/hooks/useFlightsPost';
import { usePassengersPost } from '@/hooks/usePassengersPost';
import { useSeatPost } from '@/hooks/useSeatPost';
import { TSettings } from '@/interfaces/modal-shape.interfaces';
import { ISeatForm } from '@/interfaces/seat.interfaces';

import { EModalNames, EModalButtonTexts } from './modal-names';
import { modalAirplanesFields } from './modal-airplanes-fields';
import { modalDestinationsFields } from './modal-destinations-fields';
import { modalFlightsFields } from './modal-flights-fields';
import { modalPassengersFields } from './modal-passengers-fields';
import { modalSeatFields } from './modal-seat-fields';

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
  },
];
