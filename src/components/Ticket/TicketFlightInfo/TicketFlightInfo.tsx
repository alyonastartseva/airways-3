import {
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
  ArrowsClockwiseIcon,
} from '@/common/icons';
import { ITicketsPost } from 'src/interfaces/tickets.interface';

import { TicketInfoFull } from '../TicketInfoFull';

import scss from './TicketFlightInfo.module.scss';
type TicketFlightInforProps = {
  ticket: ITicketsPost[];
  transfer: boolean;
  fullCard: boolean;
};

const TicketFlightInfo: React.FC<TicketFlightInforProps> = ({
  transfer,
  fullCard,
}) => (
  <>
    <div className={scss['ticket__info']}>
      <div className={scss['ticket__segments']}>
        <div className={scss['ticket__info-block-time']}>
          <span className={scss['ticket__time']}>19:30</span>
          <span className={scss['ticket__airport-code']}>FSF</span>
        </div>
        <div className={scss['ticket__info-block-location']}>
          <p
            className={
              fullCard ? scss['ticket__none'] : scss['ticket__location']
            }
          >
            Санк-Петербург
          </p>
          <p className={scss['ticket__date']}>10 июл, Ср</p>
        </div>
      </div>

      <div
        className={`${scss['ticket__duration']} ${
          transfer ? scss['ticket__duration--transfer'] : ''
        }`}
      >
        {!transfer && (
          <>
            <AirplaneTakeoffIcon color="#808080" size={20} />
            <p className={scss['ticket__duration-text']}>в пути 2ч 45мин</p>
            <AirplaneLandingIcon color="#808080" size={20} />
          </>
        )}

        {transfer && (
          <>
            {!fullCard && <AirplaneTakeoffIcon color="#808080" size={20} />}
            {fullCard ? (
              <div>
                <span className={scss['ticket__duration-text--transfer']}>
                  VKV
                </span>
                <p className={scss['ticket__duration-text-full']}>
                  в пути 2ч 45мин
                </p>
              </div>
            ) : (
              <div>
                <p className={scss['ticket__duration-text']}>в пути 2ч 45мин</p>
                <span className={scss['ticket__duration-text--transfer']}>
                  VKV
                </span>
              </div>
            )}
            {!fullCard && <AirplaneLandingIcon color="#808080" size={20} />}
          </>
        )}
      </div>

      <div className={scss['ticket__segments']}>
        <div className={scss['ticket__info-block-time']}>
          <span className={scss['ticket__airport-code']}>THD</span>
          <span className={scss['ticket__time']}>23:30</span>
        </div>
        <div className={scss['ticket__info-block-location']}>
          <p
            className={
              fullCard ? scss['ticket__none'] : scss['ticket__location']
            }
          >
            Москва
          </p>
          <p className={scss['ticket__date']}>10 июл, Ср</p>
        </div>
      </div>
    </div>

    <div
      className={
        fullCard ? scss['ticket__details--full'] : scss['ticket__none']
      }
    >
      <TicketInfoFull />
      {transfer ? (
        <div className={scss['ticket__details--transfer']}>
          <ArrowsClockwiseIcon color="#4797ff" size={20} />
          <span>Пересадка: 2 ч 25мин</span>
        </div>
      ) : (
        ''
      )}

      {transfer ? <TicketInfoFull /> : ''}
    </div>
  </>
);

export default TicketFlightInfo;
