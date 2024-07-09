import { useRef, useState, useEffect } from 'react';

import {
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
  ArrowsClockwiseIcon,
  ArrowTicket,
} from '@/common/icons';
import { ITicketsPost } from 'src/interfaces/tickets.interface';
import '../../../styles/variables.scss';

import { TicketFlightInfoFull } from '../TicketFlightInfoFull';

import scss from './TicketFlightInfo.module.scss';

type TicketFlightInforProps = {
  ticket: ITicketsPost[];
  transfer: boolean;
  fullCard: boolean;
};

const TicketFlightInfo: React.FC<TicketFlightInforProps> = ({
  transfer,
  fullCard,
}) => {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState<
    'up' | 'down' | null
  >(null);

  const scrollUp = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollTo({
        top: detailsRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (detailsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = detailsRef.current;
      if (scrollTop === 0) {
        setShowScrollButton('down');
      } else if (scrollTop + clientHeight >= scrollHeight) {
        setShowScrollButton('up');
      } else {
        setShowScrollButton(null);
      }
    }
  };

  const handleInternalButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (detailsRef.current) {
        detailsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
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
              Санкт-Петербург
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
              <AirplaneTakeoffIcon color="var(--color-text-grey)" size={20} />
              <p className={scss['ticket__duration-text']}>в пути 2ч 45мин</p>
              <AirplaneLandingIcon color="#var(--color-text-grey)" size={20} />
            </>
          )}

          {transfer && (
            <>
              {!fullCard && (
                <AirplaneTakeoffIcon color="var(--color-text-grey)" size={20} />
              )}
              {fullCard ? (
                <div>
                  <span
                    className={`${scss['ticket__duration-text--transfer']} ${scss['ticket__duration-text--transfer--full']}`}
                  >
                    VKV
                  </span>
                  <p className={scss['ticket__duration-text-full']}>
                    в пути 2ч 45мин
                  </p>
                </div>
              ) : (
                <div>
                  <p className={scss['ticket__duration-text']}>
                    в пути 2ч 45мин
                  </p>
                  <span className={scss['ticket__duration-text--transfer']}>
                    VKV
                  </span>
                </div>
              )}
              {!fullCard && (
                <AirplaneLandingIcon color="var(--color-text-grey)" size={20} />
              )}
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
        ref={detailsRef}
      >
        <TicketFlightInfoFull />
        {transfer ? (
          <div className={scss['ticket__details--transfer']}>
            <ArrowsClockwiseIcon color="var(--primary-color)" size={20} />
            <span>Пересадка: 2 ч 25мин</span>
          </div>
        ) : (
          ''
        )}

        {transfer ? <TicketFlightInfoFull /> : ''}
      </div>

      {fullCard && (
        <div className={scss['scroll-buttons']}>
          {showScrollButton === 'up' && (
            <button
              onClick={(e) => {
                handleInternalButtonClick(e);
                scrollUp();
              }}
              className={scss['scroll-button']}
            >
              <ArrowTicket
                rotate="rotate(180deg)"
                color="var(--dark-arrow-color)"
              />
            </button>
          )}
          {showScrollButton === 'down' && (
            <button
              onClick={(e) => {
                handleInternalButtonClick(e);
                scrollDown();
              }}
              className={scss['scroll-button']}
            >
              <ArrowTicket color="var(--dark-arrow-color)" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default TicketFlightInfo;
