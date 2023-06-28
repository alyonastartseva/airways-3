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

export interface ITicketsGet {
  content: ITickets[];
}

export interface ITicketsPost extends FieldValues {
  id?: number;
  ticketNumber?: string;
  passengerId?: number;
  firstName?: string;
  lastName?: string;
  flightId?: number;
  code?: string;
  from?: string;
  to?: string;
  departureDateTime: string;
  arrivalDateTime?: string;
  flightSeatId?: number;
  seatNumber: string;
}
