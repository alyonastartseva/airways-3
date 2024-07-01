import {
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
  ArmchairIcon,
  ArrowsClockwiseIcon,
  ArrowTicket,
  BackpackIcon,
  SuitcaseIcon,
  WarningCircleIcon,
  AirplaneIcon,
} from '@/common/icons';
import { ITicketsPost } from 'src/interfaces/tickets.interface';

import scss from './CardTicket.module.scss';

const CardTicket: React.FC<ITicketsPost> = ({ ticket }) => {
  return (
    <li className={scss.ticket}>
      <div className={`${scss['ticket__tag']} ${scss['ticket__tag--fastest']}`}>
        Самый быстрый
      </div>
      <div className={scss['ticket__details']}>
        <div className={scss['ticket__header']}>
          <div className={scss['ticket__carrier']}>
            <span className={scss['ticket__carrier-logo']}>
              {/* Самолёт  icon */}
              <AirplaneIcon />
            </span>
            <h3 className={scss['ticket__carrier-name']}>S7 Airlines</h3>
          </div>
          <div className={scss['ticket__stops']}>
            <span className={scss['ticket__stops-text']}>Прямой рейс</span>
            {/* стрелка вниз icon */}
            <ArrowTicket />
          </div>
        </div>

        <div className={scss['ticket__info']}>
          <div className={scss['ticket__segments']}>
            <div className={scss['ticket__info-block-time']}>
              <span className={scss['ticket__time']}>19:30</span>
              <span className={scss['ticket__airport-code']}>
                {ticket.from}
              </span>
            </div>
            <div className={scss['ticket__info-block-location']}>
              <p className={scss['ticket__location']}>Санк-Петербург</p>
              <p className={scss['ticket__date']}>10 июл, Ср</p>
            </div>
          </div>

          <div className={scss['ticket__duration']}>
            <AirplaneTakeoffIcon color="#808080" size={20} />
            <p className={scss['ticket__duration-text']}>в пути 2ч 45мин</p>
            <AirplaneLandingIcon color="#808080" size={20} />
          </div>

          <div className={scss['ticket__segments']}>
            <div className={scss['ticket__info-block-time']}>
              <span className={scss['ticket__time']}>23:30</span>
              <span className={scss['ticket__airport-code']}>{ticket.to}</span>
            </div>
            <div className={scss['ticket__info-block-location']}>
              <p className={scss['ticket__location']}>Москва</p>
              <p className={scss['ticket__date']}>10 июл, Ср</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={scss['ticket__pricing']}>
        <div className={scss['ticket__tariff']}>
          <div className={scss['ticket__tariff-header']}>
            <h3 className={scss['ticket__tariff-title']}>Эконом Базовый</h3>
            <div className={scss['ticket__tariff-icon']}>
              {/* портфель icon */}
              <BackpackIcon color="green" size={20} />
              {/* Чемодан icon */}
              <SuitcaseIcon color="#808080" size={20} />
              {/* стрелки по кругу icon */}
              <ArrowsClockwiseIcon color="#808080" size={20} />
              {/* кресло icon */}
              <ArmchairIcon color="#808080" size={20} />
            </div>
          </div>

          <p className={scss['ticket__price']}>3 787 ₽</p>
          <div
            className={`${scss['ticket__availability']} ${scss['ticket__availability--active']}`}
          >
            {/* Кругляшок предупреждение icon */}
            <WarningCircleIcon color="#F55B51" size={20} />
            <p className={scss['ticket__availability-text']}>Осталось 2</p>
          </div>
        </div>

        <div className={scss['ticket__tariff']}>
          <div className={scss['ticket__tariff-header']}>
            <h3 className={scss['ticket__tariff-title']}>Эконом Стандарт</h3>
            <div className={scss['ticket__tariff-icon']}>
              {/* портфель icon */}
              <BackpackIcon color="green" size={20} />
              {/* Чемодан icon */}
              <SuitcaseIcon color="green" size={20} />
              {/* стрелки по кругу icon */}
              <ArrowsClockwiseIcon color="#808080" size={20} />
              {/* кресло icon */}
              <ArmchairIcon color="#808080" size={20} />
            </div>
          </div>

          <p className={scss['ticket__price']}>5 887 ₽</p>
          <div className={`${scss['ticket__availability']} `}>
            {/* Кругляшок предупреждение icon */}
            <WarningCircleIcon color="#F55B51" size={20} />
            <p className={scss['ticket__availability-text']}>Осталось 2</p>
          </div>
        </div>

        <div
          className={`${scss['ticket__tariff']} ${scss['ticket__tariff--active']}`}
        >
          <div className={scss['ticket__tariff-header']}>
            <h3 className={scss['ticket__tariff-title']}>Эконом Плюс</h3>
            <div className={scss['ticket__tariff-icon']}>
              {/* портфель icon */}
              <BackpackIcon color="green" size={20} />
              {/* Чемодан icon */}
              <SuitcaseIcon color="green" size={20} />
              {/* стрелки по кругу icon */}
              <ArrowsClockwiseIcon color="green" size={20} />
              {/* кресло icon */}
              <ArmchairIcon color="green" size={20} />
            </div>
          </div>

          <p className={scss['ticket__price']}>12 437 ₽</p>
          <div className={`${scss['ticket__availability']} `}>
            {/* Кругляшок предупреждение icon */}
            <WarningCircleIcon color="#F55B51" size={20} />
            <p className={scss['ticket__availability-text']}>Осталось 2</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardTicket;
