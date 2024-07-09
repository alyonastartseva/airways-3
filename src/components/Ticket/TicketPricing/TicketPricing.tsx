import {
  ArmchairIcon,
  ArrowsClockwiseIcon,
  BackpackIcon,
  SuitcaseIcon,
  WarningCircleIcon,
  PaidIcon,
  EnabledIcon,
  UnavailableIcon,
  CompanyPoints,
} from '@/common/icons';
type TicketPricingProps = {
  fullCard: boolean;
};

import scss from './TicketPricing.module.scss';

const TicketPricing: React.FC<TicketPricingProps> = ({ fullCard }) => {
  const handleInternalButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
  };

  return (
    <div className={scss['ticket__pricing']}>
      <div className={scss['ticket__tariff']}>
        <div className={scss['ticket__tariff-header']}>
          <h3 className={scss['ticket__tariff-title']}>Эконом Базовый</h3>
          <div className={scss['ticket__tariff-icon']}>
            <BackpackIcon color="var(--color-green)" size={20} />
            <SuitcaseIcon color="var(--color-grey)" size={20} />
            {fullCard ? (
              ''
            ) : (
              <ArrowsClockwiseIcon color="var(--color-grey)" size={20} />
            )}
            <ArmchairIcon color="var(--color-grey)" size={20} />
          </div>
        </div>

        <p className={scss['ticket__price']}>3 787 ₽</p>
        <div
          className={`${scss['ticket__availability']} `}
          // className={`${scss['ticket__availability']} ${scss['ticket__availability--active']}`}
        >
          <WarningCircleIcon color="var(--color-red)" size={20} />
          <p className={scss['ticket__availability-text']}>Осталось 2</p>
        </div>

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
      </div>

      <div className={scss['ticket__tariff']}>
        <div className={scss['ticket__tariff-header']}>
          <h3 className={scss['ticket__tariff-title']}>Эконом Стандарт</h3>
          <div className={scss['ticket__tariff-icon']}>
            <BackpackIcon color="var(--color-green)" size={20} />
            <SuitcaseIcon color="var(--color-green)" size={20} />
            {fullCard ? (
              ''
            ) : (
              <ArrowsClockwiseIcon color="var(--color-grey)" size={20} />
            )}
            <ArmchairIcon color="var(--color-grey)" size={20} />
          </div>
        </div>

        <p className={scss['ticket__price']}>5 887 ₽</p>
        <div className={`${scss['ticket__availability']} `}>
          <WarningCircleIcon color="var(--color-red)" size={20} />
          <p className={scss['ticket__availability-text']}>Осталось 2</p>
        </div>

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
                        <span>Багаж 1 сумка 23 кг</span>
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
                        <span>Начислим 3276</span>
                        <CompanyPoints color="var(--color-green)" />
                      </span>
                    </li>

                    <li className={scss['ticket__tariff-info__item-option']}>
                      <span className={scss['paid-wrap']}>
                        <PaidIcon />
                      </span>
                      <span className={scss['ticket__tariff-info__option']}>
                        <span>Обмен платный 2300</span>
                      </span>
                    </li>
                    <li className={scss['ticket__tariff-info__item-option']}>
                      <span className={scss['paid-wrap']}>
                        <PaidIcon />
                      </span>
                      <span className={scss['ticket__tariff-info__option']}>
                        <span>Возврат платный 3500</span>
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
                        <span>Выбор места на регистрации</span>
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
      </div>

      <div
        className={`${scss['ticket__tariff']} ${scss['ticket__tariff--active']}`}
      >
        <div className={scss['ticket__tariff-header']}>
          <h3 className={scss['ticket__tariff-title']}>Эконом Плюс</h3>
          <div className={scss['ticket__tariff-icon']}>
            <BackpackIcon color="var(--color-green)" size={20} />
            <SuitcaseIcon color="var(--color-green)" size={20} />
            {fullCard ? (
              ''
            ) : (
              <ArrowsClockwiseIcon color="var(--color-grey)" size={20} />
            )}
            <ArmchairIcon color="var(--color-green)" size={20} />
          </div>
        </div>

        <p className={scss['ticket__price']}>12 437 ₽</p>
        <div className={`${scss['ticket__availability']} `}>
          <WarningCircleIcon color="var(--color-red)" size={20} />
          <p className={scss['ticket__availability-text']}>Осталось 2</p>
        </div>

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
                        <CompanyPoints color="var(--color-green)" />
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
      </div>
    </div>
  );
};

export default TicketPricing;
