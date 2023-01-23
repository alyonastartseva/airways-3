export interface IDeparture {
  from: string;
  to: string;
  time: string;
  date: string;
  type: string;
  code: string;
  passenger: number;
  price: number;
}

export interface ITickerReturn {
  from: string;
  to: string;
  time: string;
  date: string;
  type: string;
  code: string;
  passenger: number;
  price: number;
}

export type TAdditionalServices = [string, number][];
