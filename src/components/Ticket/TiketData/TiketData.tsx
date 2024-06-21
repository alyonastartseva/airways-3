import { FC } from 'react';

import { TiketDataProps } from '@/interfaces';

import { TicketChoice } from '../TicketChoice';

const TiketData: FC<TiketDataProps> = ({ flights }) => {
  return flights.flights.map((flight) => {
    return <TicketChoice flight={flight} key={1} />;
  });
};

export default TiketData;
