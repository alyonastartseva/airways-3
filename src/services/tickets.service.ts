import { adminInstance } from '@/services/axios.service';
import {
  ITickets,
  ITicketsGet,
  ITicketsPost,
} from '@interfaces/tickets.interface';
import { IFlight, IFlightPost } from '@/interfaces/flights.interfaces';

import ERoutes from './endpoints.service';



const ticketsAPI = {
  getTickets: async () => {
    return await adminInstance
      .get<ITicketsGet>(ERoutes.TICKETS)
      .then((response) => response.data);
  },

  deleteTicket: async (id: number | undefined) => {
    if (id) {
      return await adminInstance.delete<ITickets>(ERoutes.TICKETS + id);
    }
  },

  patchTickets: async(data: ITickets | null) => {
    if(data){
      const {id, ...rest} = data;
      return await adminInstance.put<ITickets>(ERoutes.TICKETS + id, rest);
    }
  },

  postTickets: async (data: ITicketsPost) => {
    return await adminInstance.post<ITickets>(ERoutes.TICKETS, data);
  },
};

export const { getTickets, deleteTicket, patchTickets, postTickets } = ticketsAPI;
