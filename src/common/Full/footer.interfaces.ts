interface IDeparture {
  from: string;
  to: string;
  time: string;
  date: string;
  type: string;
  code: string;
  passenger: number;
  price: number;
}

interface ITicketReturn {
  from: string;
  to: string;
  time: string;
  date: string;
  type: string;
  code: string;
  passenger: number;
  price: number;
}

type TAdditionalServices = [string, number][];

interface IFullProps {
  departure?: IDeparture;
  ticketReturn?: ITicketReturn;
  additional?: TAdditionalServices;
}

export type { IDeparture, ITicketReturn, TAdditionalServices, IFullProps };
