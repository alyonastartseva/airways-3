import { FieldValues } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { AxiosResponse } from 'axios';

import { FormInputProps } from '@/common/ModalElements/ModalInput/ModalInput';
import {
  EModalButtonTexts,
  EModalNames,
} from '@/constants/modal-constants/modal-names';

import { IFormPassengers } from './passenger.interfaces';
import { IAircraftPost } from './aircraft.interfaces';
import { IDestinationPost } from './destination.interfaces';
import { ISeatForm } from './seat.interfaces';
import { ITicketsForm } from './tickets.interface';
import {
  IFlight,
  IFlightPost,
  IFlightPostFormFields,
} from './flights.interfaces';


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
