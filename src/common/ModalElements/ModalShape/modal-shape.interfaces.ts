import { UseMutationResult } from 'react-query';
import { FieldValues } from 'react-hook-form';
import { AxiosResponse } from 'axios';

import { FormInputProps } from '@common/ModalElements/ModalInput';
import { EModalButtonTexts, EModalNames } from '@/constants';
import {
  IFormPassengers,
  IAircraftPost,
  IDestinationPost,
  ISeatForm,
  ITicketsForm,
  TTimeZoneForm,
  IFormBooking,
  IFlight,
  IFlightPost,
  IFlightPostFormFields,
} from '@/interfaces';
import { IFSForm, IFSpostField } from '@/interfaces/flightsSeats.interfaces';

export interface IModalProps {
  formName: EModalNames;
  initialFormValues?: Record<string, number | string | undefined>;
}

// AxiosResponse<T, any> - требуемый тип в библиотеке
export interface IModalSetting<T extends FieldValues, Req = T, Q = T> {
  formName: EModalNames;
  fields: FormInputProps<T>[];
  hook: () => UseMutationResult<
    AxiosResponse<Req, unknown>,
    unknown,
    Q,
    unknown
  >;
  name: EModalButtonTexts;
  mapFieldValuesToRequestData?: (formData: T) => Q;
}

export type TSettings = [
  IModalSetting<IDestinationPost>,
  IModalSetting<IAircraftPost>,
  IModalSetting<IFlightPostFormFields, IFlight, IFlightPost>,
  IModalSetting<IFormPassengers>,
  IModalSetting<ISeatForm>,
  IModalSetting<ITicketsForm>,
  IModalSetting<TTimeZoneForm>,
  IModalSetting<IFormBooking>,
  IModalSetting<IFSForm>,
];
