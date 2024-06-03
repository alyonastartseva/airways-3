import { FC } from 'react';

import { TicketChoice } from '../TicketChoice';

import { TiketDataProps } from './TiketData.interfaces';

const TiketData: FC<TiketDataProps> = ({ flights }) => {
  return flights.flights.map((flight) => {
    return <TicketChoice flight={flight} key={1} />;
  });
};

export default TiketData;
