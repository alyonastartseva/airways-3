import { useState, FC } from 'react';

import { ITicketFlightProps } from '@/interfaces';

import { TicketFlight } from '../TiketFlight';
import { TicketFlightAll } from '../TicketFlightAll';

interface TiketChoiceProps {
  flight: ITicketFlightProps;
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
