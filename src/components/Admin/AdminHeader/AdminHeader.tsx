import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

import { ELinks } from '@/services';
import { PhoneNumber } from '@/common';

import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const tabs = [
    {
      tabName: 'Пассажиры',
      tabPath: ELinks.ADMIN_PASSENGERS,
    },
    {
      tabName: 'Самолёты',
      tabPath: ELinks.ADMIN_AIRPLANES,
    },
    {
      tabName: 'Места назначения',
      tabPath: ELinks.ADMIN_DESTINATIONS,
    },
    {
      tabName: 'Часовые пояса',
      tabPath: ELinks.ADMIN_HOURS,
    },
    {
      tabName: 'Рейсы',
      tabPath: ELinks.ADMIN_FLIGHTS,
    },
    {
      tabName: 'Билеты',
      tabPath: ELinks.ADMIN_TICKETS,
    },
    {
      tabName: 'Бронирование',
      tabPath: ELinks.ADMIN_BOOKING,
    },
  ];

  const checkActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : undefined;

  const handleSignOut = () => {
    // Когда будет авторизация, реализовать выход из админа
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map(
          ({ tabName, tabPath }: { tabName: string; tabPath: string }) => {
            return (
              <NavLink
                key={tabName}
                to={tabPath}
                className={(v) => checkActive(v)}
              >
                {tabName}
              </NavLink>
            );
          }
        )}
      </div>

      <div className={styles.actions}>
        <PhoneNumber />

        <Button
          className={styles.buttonAntd}
          size="large"
          onClick={handleSignOut}
        >
          Выход
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
