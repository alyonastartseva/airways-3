import { EnabledIcon, CompanyPoints } from '@/common/icons';

import scss from '../TicketPricing/TicketPricing.module.scss';

type TicketTariffPlusProps = {
  fullCard: boolean;
  handleInternalButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const TicketTariffPlus: React.FC<TicketTariffPlusProps> = ({
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
                    <EnabledIcon size={16} />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Багаж 1 сумка 32 кг</span>
                    </span>
                  </li>

                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Ручная кладь 1 сумка 10 кг, 55x40x23 см</span>
                    </span>
                  </li>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Спортивное снаряжение</span>
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
                      <span>Начислим 4094</span>
                      <CompanyPoints color="var(--color-icon-green)" />
                    </span>
                  </li>

                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Обмен</span>
                    </span>
                  </li>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Возврат</span>
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
                    <EnabledIcon size={16} />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Выбор питания</span>
                    </span>
                  </li>

                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Лучшие места</span>
                    </span>
                  </li>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Приоритет в аэропорту</span>
                    </span>
                  </li>
                  <li className={scss['ticket__tariff-info__item-option']}>
                    <EnabledIcon />
                    <span className={scss['ticket__tariff-info__option']}>
                      <span>Бизнес-зал</span>
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

export default TicketTariffPlus;
