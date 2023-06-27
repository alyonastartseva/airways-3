import { adminInstance } from '@/services/axios.service';
import {
  ITickets,
  ITicketsGet,
  ITicketsPost,
} from '@interfaces/tickets.interface';

import ERoutes from './endpoints.service';

const ticketsAPI = {
  getTickets: async () => {
    return await adminInstance
      .get<ITicketsGet>(ERoutes.TICKETS)
      .then((response) => response.data);
  },
};

export const { getTickets } = ticketsAPI;
