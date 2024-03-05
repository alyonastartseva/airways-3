import { ITickets } from '@/interfaces/tickets.interface';

export interface ITicketsGet {
  content: ITickets[];
  totalPages?: number;
}
