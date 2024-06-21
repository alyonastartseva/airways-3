/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfigProvider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { ProfileIcon, HumburgerIcon } from '@common/icons';

import styles from './UserHeader.module.scss';

const UserHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const items: MenuProps['items'] = [
    {
      label: 'menu-item',
      key: 'other',
    },

    {
      label: 'menu-item2',
      key: 'other2',
    },

    {
      label: 'Выход',
      key: 'signOut',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'signOut') {
      // Реализовать выход из юсера, когда будет авторизация
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.profile}>
        <span>--Name--</span>

        <ProfileIcon />
      </Link>

      <ConfigProvider
        theme={{
          components: {
            Dropdown: { fontSize: 16, controlItemBgHover: '#445ebd7e' },
          },
        }}
      >
        <Dropdown
          menu={{ items, onClick }}
          trigger={['click']}
          open={isOpenMenu}
          onOpenChange={setIsOpenMenu}
          placement="bottom"
        >
          <a className={isOpenMenu ? styles['menu-active'] : styles.menu}>
            <HumburgerIcon />
          </a>
        </Dropdown>
      </ConfigProvider>
    </div>
  );
};

export default UserHeader;
