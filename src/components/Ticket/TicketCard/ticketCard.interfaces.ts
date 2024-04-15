import { TSeatCategory } from '@/interfaces/seat.interfaces';

type TariffCategory = 'basic' | 'standard' | 'plus';

export type TFacilities = 'luggage' | 'hand-luggage' | 'refund' | 'comfort';

export type TTariffType = {
  name: {
    ru: string;
    eng: TariffCategory;
  };
  facilities: TFacilities[];
  price: number;
  ticketsCount: number;
};

export interface ITicketCardProps {
  agent?: { name: string; logoSrc?: string };
  airportFrom?: string;
  airportTo?: string;
  cityFrom?: string;
  cityTo?: string;
  departureDateTime?: string;
  arrivalDateTime?: string;
  flightTime?: string;
  categoryOfSeats?: TSeatCategory;
  tariffsData?: {
    [key in TariffCategory]: Omit<TTariffType, 'name' | 'facilities'>;
  };
  transfers?: [];
}
