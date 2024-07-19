import { FieldValues } from 'react-hook-form';

export interface ITickets {
  id: number;
  ticketNumber?: string;
  firstName?: string;
  lastName?: string;
  code?: string;
  departureDateTime: string;
  arrivalDateTime: string;
  flightId: string;
}

export interface ITicketsPost extends FieldValues {
  id?: number;
  ticketNumber?: string;
  passengerId?: string;
  firstName?: string;
  lastName?: string;
  flightId?: number;
  code?: string;
  from?: string;
  to?: string;
  departureDateTime?: string;
  arrivalDateTime?: string;
  flightSeatId?: number;
  seatNumber?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITicketsForm extends FieldValues {
  firstName?: string;
  lastName?: string;
  code?: string;
  departureDateTime?: string;
  arrivalDateTime?: string;
  seatNumber?: string;
}

export interface ITicketsGet {
  content: ITickets[];
  totalPages?: number;
}
