type TicketHeaderProps = {
  carrier: string;
  transfer: boolean;
  fullCard: boolean;
};

import { ArrowTicket, AirplaneIcon } from '@/common/icons';

import scss from './TicketHeader.module.scss';

const TicketHeader: React.FC<TicketHeaderProps> = ({
  carrier,
  transfer,
  fullCard,
}) => (
  <div className={scss['ticket__header']}>
    <div className={scss['ticket__carrier']}>
      <span className={scss['ticket__carrier-logo']}>
        <AirplaneIcon />
      </span>
      <h3 className={scss['ticket__carrier-name']}>{carrier}</h3>
    </div>
    <div className={scss['ticket__stops']}>
      <span className={scss['ticket__stops-text']}>
        {transfer ? '1 пересадка' : 'Прямой рейс'}
      </span>
      {fullCard ? <ArrowTicket rotate="rotate(180deg)" /> : <ArrowTicket />}
    </div>
  </div>
);

export default TicketHeader;
