import { FieldValues } from 'react-hook-form';

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
import { TTimeZoneForm } from '@interfaces/time-zone.interfaces';
import { IFormBooking } from '@interfaces/booking.interfaces';
import { useDestinationPost, usePassengersPost } from '@/hooks';

export interface IModalProps {
  formName: EModalNames;
  initialFormValues?: Record<string, number | string | undefined>;
}

export interface IModalSetting<T extends FieldValues, Req = T, Q = T> {
  formName: EModalNames;
  fields: FormInputProps<T>[];
  hook: () =>
    | ReturnType<typeof useDestinationPost>
    | ReturnType<typeof usePassengersPost>;
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
];
