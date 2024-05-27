import { ITickets } from '@/interfaces';

export interface ITicketsGet {
  content: ITickets[];
  totalPages?: number;
}
