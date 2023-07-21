import { FieldValues } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';

import { FormInputProps } from '@common/ModalElements/ModalInput/ModalInput';
import {
  EModalButtonTexts,
  EModalNames,
} from '@/constants/modal-constants/modal-names';
import { IFormPassengers } from '@interfaces/passenger.interfaces';
import { IAircraftPost } from '@interfaces/aircraft.interfaces';
import { IDestinationPost } from '@interfaces/destination.interfaces';
import { ISeatForm } from '@interfaces/seat.interfaces';
import { ITicketsForm } from '@interfaces/tickets.interface';
import {
  IFlight,
  IFlightPost,
  IFlightPostFormFields,
} from '@interfaces/flights.interfaces';

export interface IModalProps {
  formName: EModalNames;
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
  IModalSetting<ITicketsForm>
];
