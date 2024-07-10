import { FieldValues } from 'react-hook-form';
import { UseMutateAsyncFunction } from 'react-query';
import { AxiosResponse } from 'axios';

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
  TFormFlightSeats,
  IFlightSeatsPost,
} from '@/interfaces/flightsSeats.interfaces';
import {
  useAircraftPost,
  useDestinationPost,
  useFlightSeatPost,
  usePassengersPost,
  useSeatPost,
  useTimezonePost,
  useBookingPost,
} from '@/hooks';

// удалить при миграции на RTK query
export type UseQueryPostHook = UseMutateAsyncFunction<
  AxiosResponse<any, any>,
  unknown,
  any,
  unknown
>;

export interface IModalProps {
  formName: EModalNames;
  initialFormValues?: Record<string, number | string | undefined>;
}

export interface IModalSetting<T extends FieldValues, Q = T> {
  formName: EModalNames;
  fields: FormInputProps<T>[];
  hook: () =>
    | ReturnType<typeof useAircraftPost>
    | ReturnType<typeof useDestinationPost>
    | ReturnType<typeof usePassengersPost>
    | ReturnType<typeof useSeatPost>
    | ReturnType<typeof useTimezonePost>
    | ReturnType<typeof useFlightSeatPost>
    | ReturnType<typeof useBookingPost>
    | UseQueryPostHook;
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
  IModalSetting<IFlightSeatsPost, TFormFlightSeats>,
];
