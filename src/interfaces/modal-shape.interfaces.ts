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
import { IFlightsForm } from './flights.interfaces';
import { IDestinationPost } from './destination.interfaces';

export interface IModalProps {
  formName: EModalNames;
}

// AxiosResponse<T, any> - требуемый тип в библиотеке
export interface IModalSetting<T extends FieldValues> {
  formName: EModalNames;
  fields: FormInputProps<T>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hook: () => UseMutationResult<AxiosResponse<T, any>, unknown, T, unknown>;
  name: EModalButtonTexts;
}

export type TSettings = [
  IModalSetting<IDestinationPost>,
  IModalSetting<IAircraftPost>,
  IModalSetting<IFlightsForm>,
  IModalSetting<IFormPassengers>
];
