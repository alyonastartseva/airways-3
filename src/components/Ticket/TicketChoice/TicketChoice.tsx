import { useState, FC } from 'react';

import { TicketFlight } from '../TiketFlight';
import { TicketFlightAll } from '../TicketFlightAll';

interface TiketChoiceProps {
  flight: {
    totalPrice: number;
    dataTo: {
      airportFrom: string;
      airportTo: string;
      cityFrom: string;
      cityTo: string;
      departureDateTime: string;
      arrivalDateTime: string;
      flightTime: string;
      flightSeatId: number;
    };
    dataBack: {
      airportFrom: string;
      airportTo: string;
      cityFrom: string;
      cityTo: string;
      departureDateTime: string;
      arrivalDateTime: string;
      flightTime: string;
      flightSeatId: number;
    };
  };
}

const TicketChoice: FC<TiketChoiceProps> = ({ flight }) => {
  const [stateChoice, setStateChoice] = useState(false);

  if (!stateChoice) {
    return (
      <TicketFlight
        flight={flight}
        stateChoice={stateChoice}
        setStateChoice={setStateChoice}
      />
    );
  } else {
    return (
      <TicketFlightAll
        flight={flight}
        stateChoice={stateChoice}
        setStateChoice={setStateChoice}
      />
    );
  }
};

export default TicketChoice;
