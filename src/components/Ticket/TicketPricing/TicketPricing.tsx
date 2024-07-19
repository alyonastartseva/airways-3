import {
  ArmchairIcon,
  ArrowsClockwiseIcon,
  BackpackIcon,
  SuitcaseIcon,
  WarningCircleIcon,
} from '@/common/icons';

type TicketPricingProps = {
  fullCard: boolean;
};
import TicketTariffStandard from '../TicketTariffStandard/TicketTariffStandard';
import TicketTariffBase from '../TicketTariffBase/TicketTariffBase';
import TicketTariffPlus from '../TicketTariffPlus/TicketTariffPlus';

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
        <div className={scss['ticket__tariff--top']}>
          <div className={scss['ticket__tariff-header']}>
            <h3 className={scss['ticket__tariff-title']}>Эконом Базовый</h3>
            <div className={scss['ticket__tariff-icon']}>
              <BackpackIcon color="var(--color-icon-green)" size={20} />
              <SuitcaseIcon color="var(--color-text-grey)" size={20} />

              {fullCard ? (
                ''
              ) : (
                <ArrowsClockwiseIcon color="var(--color-text-grey)" size={20} />
              )}
              <ArmchairIcon color="var(--color-text-grey)" size={20} />
            </div>
          </div>

          <p className={scss['ticket__price']}>3 787 ₽</p>
          <div
            // className={`${scss['ticket__availability']} `}
            className={`${scss['ticket__availability']} ${scss['ticket__availability--active']}`}
          >
            <WarningCircleIcon color="var(--color-icon-red)" size={20} />
            <p className={scss['ticket__availability-text']}>Осталось 2</p>
          </div>
        </div>

        <div className={scss['ticket__tariff--bottom']}>
          <TicketTariffBase
            fullCard={fullCard}
            handleInternalButtonClick={handleInternalButtonClick}
          />
        </div>
      </div>

      <div className={scss['ticket__tariff']}>
        <div className={scss['ticket__tariff--top']}>
          <div className={scss['ticket__tariff-header']}>
            <h3 className={scss['ticket__tariff-title']}>Эконом Стандарт</h3>
            <div className={scss['ticket__tariff-icon']}>
              <BackpackIcon color="var(--color-icon-green)" size={20} />
              <SuitcaseIcon color="var(--color-icon-green)" size={20} />
              {fullCard ? (
                ''
              ) : (
                <ArrowsClockwiseIcon color="var(--color-text-grey)" size={20} />
              )}
              <ArmchairIcon color="var(--color-text-grey)" size={20} />
            </div>
          </div>

          <p className={scss['ticket__price']}>5 887 ₽</p>
          <div className={`${scss['ticket__availability']} `}>
            <WarningCircleIcon color="var(--color-icon-red)" size={20} />
            <p className={scss['ticket__availability-text']}>Осталось 2</p>
          </div>
        </div>

        <div className={scss['ticket__tariff--bottom']}>
          <TicketTariffStandard
            fullCard={fullCard}
            handleInternalButtonClick={handleInternalButtonClick}
          />
        </div>
      </div>

      <div
        className={`${scss['ticket__tariff']} ${scss['ticket__tariff--active']}`}
      >
        <div className={scss['ticket__tariff--top']}>
          <div className={scss['ticket__tariff-header']}>
            <h3 className={scss['ticket__tariff-title']}>Эконом Плюс</h3>
            <div className={scss['ticket__tariff-icon']}>
              <BackpackIcon color="var(--color-icon-green)" size={20} />
              <SuitcaseIcon color="var(--color-icon-green)" size={20} />
              {fullCard ? (
                ''
              ) : (
                <ArrowsClockwiseIcon color="var(--color-text-grey)" size={20} />
              )}
              <ArmchairIcon color="var(--color-icon-green)" size={20} />
            </div>
          </div>

          <p className={scss['ticket__price']}>12 437 ₽</p>
          <div className={`${scss['ticket__availability']} `}>
            <WarningCircleIcon color="var(--color-icon-red)" size={20} />
            <p className={scss['ticket__availability-text']}>Осталось 2</p>
          </div>
        </div>
        <div className={scss['ticket__tariff--bottom']}>
          <TicketTariffPlus
            fullCard={fullCard}
            handleInternalButtonClick={handleInternalButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPricing;
