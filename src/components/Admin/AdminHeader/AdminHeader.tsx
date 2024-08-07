import { NavLink } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';

import { ELinks } from '@/services';
import { PhoneNumber } from '@/common';
import { useTheme } from '@/context/ThemeProvider';

import styles from './AdminHeader.module.scss';

const AdminHeader = () => {
  const { theme } = useTheme();
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
    {
      tabName: 'Посадочные места',
      tabPath: ELinks.ADMIN_FLIGHTS_SEATS,
    },
  ];
  const items: MenuProps['items'] = tabs.map((tab, index) => ({
    label: <a href={tab.tabPath}>{tab.tabName}</a>,
    key: index.toString(),
  }));
  const checkActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : undefined;
  const handleSignOut = () => {
    // Когда будет авторизация, реализовать выход из админа
  };

  return (
    <div
      className={`${styles.container} ${
        theme === 'dark' ? styles.dark : styles.light
      }`}
    >
      <div className={styles.tabs}>
        {tabs.map(({ tabName, tabPath }) => (
          <NavLink key={tabName} to={tabPath} className={checkActive}>
            {tabName}
          </NavLink>
        ))}
      </div>

      <Dropdown
        className={styles.dropdownMenu}
        overlay={<Menu items={items} />}
        trigger={['click']}
      >
        <Button
          className={`${styles.buttonAntd} ${
            theme === 'dark' ? styles.darkButton : styles.lightButton
          }`}
          onClick={(e) => e.preventDefault()}
          icon={<DownOutlined />}
          aria-label="Open menu"
          style={{ color: 'white' }}
        ></Button>
      </Dropdown>

      <div className={styles.actions}>
        <PhoneNumber />
        <Button
          className={`${styles.buttonAntd} ${
            theme === 'dark' ? styles.darkButton : styles.lightButton
          }`}
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
