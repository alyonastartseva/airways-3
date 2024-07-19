import {
  WarningCircleIcon,
  AirplaneIcon,
  GoToFly,
  FlyForTicket,
  AnimalsIcon,
  MenuIcon,
} from '@/common/icons';

import '../../../styles/variables.scss';
import scss from './TicketFlightInfoFull.module.scss';

const TicketFlightInfoFull = () => (
  <>
    <div className={scss['ticket__details--full__airline-info']}>
      <div className={scss['ticket__carrier']}>
        <span className={scss['ticket__carrier-icon']}>
          <AirplaneIcon size={18} />
        </span>
        <h3 className={scss['ticket__carrier-name']}>QR 338</h3>
      </div>
      <div className={scss['ticket__carrier']}>
        <span className={scss['ticket__carrier-air']}>Boeing 787-8</span>
        <WarningCircleIcon color="var(--primary-color)" />
      </div>
    </div>

    <div className={scss['ticket__details--full__flight-wrap']}>
      <div className={scss['ticket__details--full__flight-icon']}>
        <FlyForTicket />

        <GoToFly />
      </div>

      <div className={scss['ticket__details--full__info']}>
        <div className={scss['ticket__details--full__flight']}>
          <div className={scss['ticket__details--full__flight-block']}>
            <span className={scss['ticket__details--full__flight-time']}>
              19:30
            </span>
            <p className={scss['ticket__details--full__flight-date']}>
              10 июл, Ср
            </p>
          </div>

          <div className={scss['ticket__details--full__flight-block']}>
            <p className={scss['ticket__details--full__flight-location']}>
              Санкт-Петербург, Россия
            </p>
          </div>

          <div className={scss['ticket__details--full__flight-block']}>
            <span className={scss['ticket__details--full__flight-airport']}>
              Домодедово,
            </span>
            <span
              className={scss['ticket__details--full__flight-transfer-code']}
            >
              VKV
            </span>
          </div>
        </div>

        <div className={scss['ticket__details--full__transfer']}>
          <div className={scss['ticket__details--full__transfer-distance']}>
            <div
              className={scss['ticket__details--full__transfer-distance-text']}
            >
              3 563 км
            </div>
            <span
              className={scss['ticket__details--full__transfer-distance-time']}
            >
              В пути 5ч 25мин
            </span>
          </div>

          <div
            className={scss['ticket__details--full__transfer-distance-info']}
          >
            <div
              className={
                scss['ticket__details--full__transfer-distance-info-block']
              }
            >
              <MenuIcon />
              <p
                className={
                  scss['ticket__details--full__transfer-distance-info-text']
                }
              >
                Меню: Горячее питание
              </p>
            </div>

            <div
              className={
                scss['ticket__details--full__transfer-distance-info-block']
              }
            >
              <AnimalsIcon />
              <p
                className={
                  scss['ticket__details--full__transfer-distance-info-text']
                }
              >
                Питомцы: до 23 кг (в салоне)
              </p>
            </div>
          </div>
        </div>

        <div className={scss['ticket__details--full__flight']}>
          <div className={scss['ticket__details--full__flight-block']}>
            <span className={scss['ticket__details--full__flight-time']}>
              19:30
            </span>
            <p className={scss['ticket__details--full__flight-date']}>
              10 июл, Ср
            </p>
          </div>

          <div className={scss['ticket__details--full__flight-block']}>
            <p className={scss['ticket__details--full__flight-location']}>
              Санкт-Петербург, Россия
            </p>
          </div>

          <div className={scss['ticket__details--full__flight-block']}>
            <span className={scss['ticket__details--full__flight-airport']}>
              Домодедово,
            </span>
            <span
              className={scss['ticket__details--full__flight-transfer-code']}
            >
              VKV
            </span>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default TicketFlightInfoFull;
