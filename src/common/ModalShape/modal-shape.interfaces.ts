import { FieldValues } from 'react-hook-form';

import { FormInputProps } from '@/common/ModalInput';
import { EModalButtonTexts, EModalNames } from '@/constants';
import {
  IFormPassengers,
  IAircraftPost,
  IDestinationPost,
  ISeatForm,
  ITicketsForm,
  TTimeZoneForm,
  IFormBooking,
  IFlightPost,
  IFlightPostFormFields,
} from '@/interfaces';
import {
  useAircraftPost,
  useBookingPost,
  useDestinationPost,
  useFlightsPost,
  usePassengersPost,
  useSeatPost,
  useTicketsPost,
} from '@/hooks';

export interface IModalProps {
  formName: EModalNames;
  initialFormValues?: Record<string, number | string | undefined>;
}

export interface IModalSetting<T extends FieldValues, Q = T> {
  formName: EModalNames;
  fields: FormInputProps<T>[];
  hook: () =>
    | ReturnType<typeof useDestinationPost>
    | ReturnType<typeof usePassengersPost>
    | ReturnType<typeof useFlightsPost>
    | ReturnType<typeof useSeatPost>
    | ReturnType<typeof useTicketsPost>
    | ReturnType<typeof useBookingPost>
    | ReturnType<typeof useAircraftPost>;
  name: EModalButtonTexts;
  mapFieldValuesToRequestData?: (formData: T) => Q;
}

export type TSettings = [
  IModalSetting<IDestinationPost>,
  IModalSetting<IAircraftPost>,
  IModalSetting<IFlightPostFormFields, IFlightPost>,
  IModalSetting<IFormPassengers>,
  IModalSetting<ISeatForm>,
  IModalSetting<ITicketsForm>,
  IModalSetting<TTimeZoneForm>,
  IModalSetting<IFormBooking>,
];
