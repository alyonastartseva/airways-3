import {
  WarningCircleIcon,
  AirplaneIcon,
  GoToFly,
  FlyForTicket,
} from '@/common/icons';
import { ITicketsPost } from 'src/interfaces/tickets.interface';

import scss from './TicketInfoFull.module.scss';

const TicketInfoFull = () => (
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
        <WarningCircleIcon color="#4797ff" />
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
              {/* вынести в отдельный компонент */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className=""
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.25 0A.75.75 0 018 .75V4c0 1.741-.834 3.38-2 3.996V15a1 1 0 11-2 0V7.996C2.835 7.381 2 5.742 2 4V.75a.75.75 0 01.648-.743L2.75 0a.75.75 0 01.75.75V4.5c0 .276.168.5.375.5.184 0 .337-.177.369-.41l.006-.09V.75a.75.75 0 111.5 0V4.5c0 .276.168.5.375.5.184 0 .337-.177.369-.41L6.5 4.5V.75A.75.75 0 017.25 0zm6.25 0a.5.5 0 01.5.5V15a1 1 0 11-2 0V9.661a1 1 0 00-.248-.658l-.505-.577A1 1 0 0111 7.767V4.65c0-.052.004-.105.012-.156.233-1.475.563-2.592.988-3.35.176-.303.355-.553.535-.751A1.2 1.2 0 0113.422 0h.078z"
                  fill="#4797ff"
                ></path>
              </svg>
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
              {/* вынести в отдельный компонент */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className=""
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.092 1.012c.94-.132 1.936.87 2.223 2.253.287 1.376-.231 2.604-1.171 2.744-.933.14-1.936-.863-2.231-2.246-.295-1.376.239-2.604 1.179-2.751zm5.697 0c.948.147 1.474 1.375 1.195 2.75-.303 1.384-1.299 2.386-2.24 2.247-.947-.14-1.465-1.368-1.17-2.744C8.86 1.882 9.856.88 10.789 1.012zM.829 4.586c.909-.38 2.144.311 2.789 1.516C4.223 7.33 4.016 8.62 3.116 9c-.9.381-2.127-.303-2.757-1.523-.63-1.22-.406-2.518.47-2.89zm14.342 0c.876.373 1.1 1.671.47 2.891-.63 1.22-1.857 1.904-2.757 1.523-.9-.38-1.107-1.67-.502-2.898.645-1.205 1.88-1.896 2.789-1.516zm-1.33 8.378c.031.73-.543 1.538-1.228 1.841-1.426.638-3.115-.683-4.7-.683-1.586 0-3.291 1.375-4.693.684-.797-.381-1.347-1.391-1.243-2.23.143-1.159 1.57-1.78 2.414-2.627 1.123-1.096 1.92-3.156 3.521-3.156 1.594 0 2.438 2.029 3.514 3.156.884.948 2.358 1.748 2.414 3.015z"
                  fill="#4797ff"
                ></path>
              </svg>
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

export default TicketInfoFull;
