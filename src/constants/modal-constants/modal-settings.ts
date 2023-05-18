import { useAircraftPost } from '@/hooks/useAircraftPost';
import { useDestinationPost } from '@/hooks/useDestinationPost';
import { useFlightsPost } from '@/hooks/useFlightsPost';
import { usePassengersPost } from '@/hooks/usePassengersPost';
import { TSettings } from '@/interfaces/modal-shape.interfaces';

import { EModalNames, EModalButtonTexts } from './modal-names';
import { modalAirplanesFields } from './modal-airplanes-fields';
import { modalDestinationsFields } from './modal-destinations-fields';
import { modalFlightsFields } from './modal-flights-fields';
import { modalPassengersFields } from './modal-passengers-fields';

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
];
