import { adminInstance } from '@/services/axios.service';
import {
  ITickets,
  ITicketsGet,
  ITicketsPost,
} from '@interfaces/tickets.interface';
import { ERoutes } from '@services/constants';

const ticketsAPI = {
  getTickets: async (pageIndex?: number) => {
    return await adminInstance
      .get<ITicketsGet>(ERoutes.TICKETS + `?page=${String(pageIndex)}&size=10`)
      .then((response) => response.data);
  },

  deleteTicket: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<ITickets>(ERoutes.TICKETS + id);
    }
  },

  patchTickets: async (data: ITickets | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await adminInstance.patch<ITickets>(ERoutes.TICKETS + id, rest);
    }
  },

  postTickets: async (data: ITicketsPost) => {
    return await adminInstance.post<ITicketsPost>(ERoutes.TICKETS, data);
  },
};

export const { getTickets, deleteTicket, patchTickets, postTickets } =
  ticketsAPI;
