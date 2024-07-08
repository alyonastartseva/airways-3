import { useState } from 'react';

import { ITicketsPost } from 'src/interfaces/tickets.interface';

import TicketHeader from '../TicketHeader/TicketHeader';
import TicketPricing from '../TicketPricing/TicketPricing';
import TicketFlightInfo from '../TicketFlightInfo/TicketFlightInfo';

import scss from './CardTicket.module.scss';

const CardTicket: React.FC<ITicketsPost> = ({ ticket }) => {
  const [fullCard, setFullCard] = useState(false);
  const [transfer] = useState(!false);

  const handleClick = () => {
    setFullCard(!fullCard);
  };
  return (
    <li>
      <button
        className={
          fullCard ? `${scss.ticket} ${scss['ticket__full']}` : scss.ticket
        }
        onClick={handleClick}
      >
        <div
          className={fullCard ? `${scss['ticket__tag']}` : scss['ticket__none']}
        >
          Самый быстрый
        </div>
        <div className={scss['ticket__details']}>
          <TicketHeader
            carrier="S7 Airlines"
            transfer={transfer}
            fullCard={fullCard}
          />
          <TicketFlightInfo
            ticket={ticket}
            transfer={transfer}
            fullCard={fullCard}
          />
        </div>

        {/* Прайсs */}
        <TicketPricing fullCard={fullCard} />
      </button>
    </li>
  );
};

export default CardTicket;
