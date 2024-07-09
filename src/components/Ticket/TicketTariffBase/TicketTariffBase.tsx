import {
  EnabledIcon,
  PaidIcon,
  UnavailableIcon,
  CompanyPoints,
} from '@/common/icons';

import scss from '../TicketPricing/TicketPricing.module.scss';

type TicketTariffBaseProps = {
  fullCard: boolean;
  handleInternalButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const TicketTariffBase: React.FC<TicketTariffBaseProps> = ({
  fullCard,
  handleInternalButtonClick,
}) => {
  return (
    <>
      {fullCard ? (
        <div className={scss['ticket__tariff--full']}>
          <button
            className={scss['ticket__tariff-button']}
            onClick={handleInternalButtonClick}
          >
            Выбрать
          </button>
          <div className={scss['ticket__tariff-info']}>
            <ul className={scss['ticket__tariff-info__facilities']}>
              <li className={scss['ticket__tariff-info__facilities-item']}>
                <p className={scss['ticket__tariff-info__item-title']}>
                  Багаж:
                </p>
                <ul>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <span className={scss['paid-wrap']}>
                      <PaidIcon size={16} />
                    </span>
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Багаж платныйг</span>
                    </span>
                  </li>

                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Ручная кладь 1 сумка 10 кг, 55x40x23 см</span>
                    </span>
                  </li>
                </ul>
              </li>

              <li className={scss['ticket__tariff-info__facilities-item']}>
                <p className={scss['ticket__tariff-info__item-title']}>
                  Условия:
                </p>
                <ul>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon size={16} />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Начислим 16354</span>
                      <CompanyPoints color="var(--color-green)" />
                    </span>
                  </li>

                  <li className={scss['ticket__tariff-info__item-option']}>
                    <span className={scss['paid-wrap']}>
                      <PaidIcon />
                    </span>
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Обмен платный 4000</span>
                    </span>
                  </li>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <UnavailableIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Возврат недоступен</span>
                    </span>
                  </li>
                </ul>
              </li>

              <li className={scss['ticket__tariff-info__facilities-item']}>
                <p className={scss['ticket__tariff-info__item-title']}>
                  Услуги:
                </p>
                <ul>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <span className={scss['paid-wrap']}>
                      <PaidIcon size={16} />
                    </span>
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Выбор мест платный</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default TicketTariffBase;
