export interface FooterProps {
  departure?: Departure;
  return?: Return;
  additional?: Additional;
}

export interface Departure {
  from: string;
  to: string;
  time: string;
  date: string;
  type: string;
  code: string;
  passenger: number;
  price: number;
}

export interface Return {
  from: string;
  to: string;
  time: string;
  date: string;
  type: string;
  code: string;
  passenger: number;
  price: number;
}

export type Additional = [string, number][];
